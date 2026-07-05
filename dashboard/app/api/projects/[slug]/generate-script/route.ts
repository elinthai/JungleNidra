import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "../../../../../lib/auth";
import { getProjects, saveProjects } from "../../../../../lib/store";
import { getChannel } from "../../../../../lib/channels";

export async function POST(_req: NextRequest, { params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.slug === params.slug);
  if (idx === -1) return NextResponse.json({ error: "not found" }, { status: 404 });

  const project = projects[idx];
  const channel = getChannel(project.channel);

  const systemPrompt = [
    `You write scripts for the "${channel.name}" YouTube channel.`,
    channel.identity.anonymityRules ? `Identity guardrail: ${channel.identity.anonymityRules}` : null,
    channel.voice.type === "elevenlabs-cloned"
      ? "Narration will be read aloud by a cloned voice via ElevenLabs — write for a calm, steady, spoken delivery, not for reading on a page."
      : channel.voice.type === "live-on-camera"
        ? "This will be delivered live on camera — write in a natural spoken voice."
        : "Voice/delivery style for this channel is not yet defined — write in a clear, calm spoken voice as a safe default.",
    channel.voice.notes || null,
  ]
    .filter(Boolean)
    .join("\n");

  const seed = [project.title, project.notes].filter(Boolean).join("\n\n");
  if (!seed.trim()) {
    return NextResponse.json({ error: "add a title or notes before generating a script" }, { status: 400 });
  }

  let text: string;
  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: `Write a full script based on this seed:\n\n${seed}` }],
    });
    const block = response.content.find((b) => b.type === "text");
    text = block && block.type === "text" ? block.text : "";
  } catch (error) {
    console.error("generate-script failed:", error);
    return NextResponse.json({ error: "script generation failed" }, { status: 500 });
  }

  project.script = text;
  project.updatedAt = new Date().toISOString();
  projects[idx] = project;
  await saveProjects(projects);

  return NextResponse.json(project);
}
