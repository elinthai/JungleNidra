import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { getProjects, saveProjects, isStageComplete, nextStage } from "../../../../lib/store";

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
  if (typeof body.script === "string") project.script = body.script;
  if (typeof body.targetDay === "string") project.targetDay = body.targetDay;
  if (typeof body.publishUrl === "string") {
    if (body.publishUrl.trim()) {
      project.publishUrl = body.publishUrl.trim();
      if (!project.publishedAt) project.publishedAt = new Date().toISOString();
      project.stage = "Publish to YouTube";
    } else {
      // Explicit empty string clears a mistaken publish.
      delete project.publishUrl;
      delete project.publishedAt;
    }
  }
  if (body.toggleStep && typeof body.toggleStep === "object") {
    const { stage, itemId, checked } = body.toggleStep as {
      stage: string;
      itemId: string;
      checked: boolean;
    };
    const done = new Set(project.completedSteps[stage] || []);
    if (checked) done.add(itemId);
    else done.delete(itemId);
    project.completedSteps[stage] = Array.from(done);
  }
  if (Array.isArray(body.scoutedSites)) {
    project.scoutedSites = body.scoutedSites.map((s: unknown) => String(s));
  }
  if (body.toggleStep || Array.isArray(body.scoutedSites)) {
    if (isStageComplete(project, project.stage)) {
      const next = nextStage(project.stage);
      if (next) project.stage = next;
    }
  }
  project.updatedAt = new Date().toISOString();
  projects[idx] = project;

  await saveProjects(projects);
  return NextResponse.json(project);
}

export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.slug === params.slug);
  if (idx === -1) return NextResponse.json({ error: "not found" }, { status: 404 });

  projects.splice(idx, 1);
  await saveProjects(projects);
  return NextResponse.json({ ok: true });
}
