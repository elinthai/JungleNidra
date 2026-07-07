import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "../../../../../lib/auth";
import { getProjects, saveProjects } from "../../../../../lib/store";
import { getChannel } from "../../../../../lib/channels";
import { readContentFile } from "../../../../../lib/content";

interface PackageDraft {
  titleOptions: string[];
  thumbnailConcept: string;
  openingLines: string;
}

export async function POST(_req: NextRequest, { params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.slug === params.slug);
  if (idx === -1) return NextResponse.json({ error: "not found" }, { status: 404 });

  const project = projects[idx];
  const channel = getChannel(project.channel);
  if (channel.slug !== "jungle-nidra") {
    return NextResponse.json(
      { error: "package generation is only available for Jungle Nidra right now" },
      { status: 400 },
    );
  }

  const seed = [project.title, project.notes].filter(Boolean).join("\n\n");
  if (!seed.trim()) {
    return NextResponse.json({ error: "add a title or notes before generating a package" }, { status: 400 });
  }

  const systemPrompt = [
    readContentFile("skills/jn-holy-trifecta.md"),
    "",
    "Respond with ONLY valid JSON, no prose before or after, matching exactly this shape:",
    '{"titleOptions": ["option 1", "option 2"], "thumbnailConcept": "...", "openingLines": "..."}',
  ].join("\n");

  let draft: PackageDraft;
  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: "user", content: `Build the package for this input:\n\n${seed}` }],
    });
    const block = response.content.find((b) => b.type === "text");
    const text = block && block.type === "text" ? block.text : "";
    draft = JSON.parse(text) as PackageDraft;
    if (!Array.isArray(draft.titleOptions) || !draft.thumbnailConcept || !draft.openingLines) {
      throw new Error("malformed package response");
    }
  } catch (error) {
    console.error("generate-package failed:", error);
    return NextResponse.json({ error: "package generation failed" }, { status: 500 });
  }

  project.titleOptions = draft.titleOptions;
  project.thumbnailConcept = draft.thumbnailConcept;
  project.openingLines = draft.openingLines;
  project.packageStatus = "draft";
  project.updatedAt = new Date().toISOString();
  projects[idx] = project;
  await saveProjects(projects);

  return NextResponse.json(project);
}
