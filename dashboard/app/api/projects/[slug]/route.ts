import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { getProjects, saveProjects } from "../../../../lib/store";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(request: NextRequest, { params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json();
  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.slug === params.slug);
  if (idx === -1) return NextResponse.json({ error: "not found" }, { status: 404 });

  const project = projects[idx];
  if (typeof body.stage === "string") project.stage = body.stage;
  if (typeof body.notes === "string") project.notes = body.notes;
  if (typeof body.targetDay === "string") project.targetDay = body.targetDay;
  project.updatedAt = new Date().toISOString();
  projects[idx] = project;

  await saveProjects(projects);
  return NextResponse.json(project);
}
