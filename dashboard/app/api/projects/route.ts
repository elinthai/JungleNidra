import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { getProjects, saveProjects, slugify, Project } from "../../../lib/store";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json();
  const slug = slugify(String(body.slug || body.title || ""));
  if (!slug) return NextResponse.json({ error: "title or slug required" }, { status: 400 });

  const projects = await getProjects();
  if (projects.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: "a project with this slug already exists" }, { status: 409 });
  }

  const now = new Date().toISOString();
  const project: Project = {
    slug,
    title: String(body.title || slug),
    stage: "Idea",
    targetDay: body.targetDay ? String(body.targetDay) : undefined,
    notes: body.notes ? String(body.notes) : undefined,
    assets: [],
    createdAt: now,
    updatedAt: now,
    completedSteps: {},
  };
  projects.push(project);
  try {
    await saveProjects(projects);
  } catch (error) {
    console.error("saveProjects failed:", error);
    return NextResponse.json({ error: "failed to save project" }, { status: 500 });
  }
  return NextResponse.json(project, { status: 201 });
}
