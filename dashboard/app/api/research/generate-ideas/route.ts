import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "../../../../lib/auth";
import { getProjects, saveProjects, slugify, Project } from "../../../../lib/store";
import { readContentFile } from "../../../../lib/content";

interface RawIdea {
  title: string;
  notes?: string;
  targetDay?: string;
}

function uniqueSlug(base: string, taken: Set<string>): string {
  let slug = base;
  let n = 2;
  while (taken.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  taken.add(slug);
  return slug;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const angle = typeof body.angle === "string" ? body.angle.trim() : "";

  const systemPrompt = [
    readContentFile("skills/jn-research-agent.md"),
    "",
    "After your normal 5-block output, end your response with a fenced code block labeled",
    "ideas-json containing ONLY a JSON array (no comments) of the calendar-ready rows, shaped",
    'exactly like: [{"title": "...", "notes": "...", "targetDay": "Tue"}]. "targetDay" is optional.',
  ].join("\n");

  let reportText: string;
  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 4096,
      system: systemPrompt,
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 8 }],
      messages: [
        {
          role: "user",
          content: angle ? `Focus this batch on: ${angle}` : "Find what's working broadly right now.",
        },
      ],
    });
    reportText = response.content
      .filter((b) => b.type === "text")
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n");
  } catch (error) {
    console.error("generate-ideas failed:", error);
    const detail = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "research agent call failed", detail }, { status: 500 });
  }

  const match = reportText.match(/```ideas-json\s*([\s\S]*?)```/);
  if (!match) {
    return NextResponse.json(
      { error: "research agent did not return a parseable ideas-json block", reportText },
      { status: 500 },
    );
  }

  let ideas: RawIdea[];
  try {
    ideas = JSON.parse(match[1]) as RawIdea[];
    if (!Array.isArray(ideas)) throw new Error("not an array");
  } catch (error) {
    console.error("generate-ideas parse failed:", error);
    return NextResponse.json(
      { error: "research agent's ideas-json block was malformed", reportText },
      { status: 500 },
    );
  }

  const projects = await getProjects();
  const taken = new Set(projects.map((p) => p.slug));
  const now = new Date().toISOString();

  const created: Project[] = ideas
    .filter((idea) => idea.title && idea.title.trim())
    .map((idea) => {
      const slug = uniqueSlug(slugify(idea.title), taken);
      return {
        slug,
        title: idea.title.trim(),
        stage: "Idea",
        channel: "jungle-nidra",
        targetDay: idea.targetDay ? String(idea.targetDay) : undefined,
        notes: idea.notes ? String(idea.notes) : undefined,
        assets: [],
        createdAt: now,
        updatedAt: now,
        completedSteps: {},
      };
    });

  projects.push(...created);
  try {
    await saveProjects(projects);
  } catch (error) {
    console.error("saveProjects failed:", error);
    return NextResponse.json({ error: "failed to save new ideas" }, { status: 500 });
  }

  return NextResponse.json({ created, reportText });
}
