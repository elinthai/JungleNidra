import { put, head } from "@vercel/blob";

export interface Asset {
  id: string;
  filename: string;
  url: string;
  kind: "raw-footage" | "still";
  siteName?: string;
  uploadedAt: string;
}

export interface Project {
  slug: string;
  title: string;
  stage: string;
  targetDay?: string;
  notes?: string;
  assets: Asset[];
  createdAt: string;
  updatedAt: string;
}

const STORE_PATH = "data/projects.json";

export const STAGES = [
  "Idea",
  "Packaged",
  "Scripted",
  "Shooting",
  "Editing",
  "Repurposing",
  "Uploaded",
  "Reviewed",
];

export async function getProjects(): Promise<Project[]> {
  try {
    const info = await head(STORE_PATH);
    const res = await fetch(info.url, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as Project[];
  } catch {
    return [];
  }
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await put(STORE_PATH, JSON.stringify(projects, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
