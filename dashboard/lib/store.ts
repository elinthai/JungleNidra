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
  publishUrl?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const PROJECTS_PATH = "data/projects.json";

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

export function stageIndex(stage: string): number {
  const idx = STAGES.indexOf(stage);
  return idx === -1 ? 0 : idx;
}

export async function getProjects(): Promise<Project[]> {
  try {
    const info = await head(PROJECTS_PATH);
    const res = await fetch(info.url, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as Project[];
  } catch {
    return [];
  }
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await put(PROJECTS_PATH, JSON.stringify(projects, null, 2), {
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

// --- Location library ---
// Lazy-seeded from the original 40-site list (04-recording-assets/location-library.md)
// on first read. That markdown file stays in git as the original snapshot;
// data/locations.json in Blob becomes the live, upload-connected record.

export interface LocationSite {
  name: string;
  shot: boolean;
  notes?: string;
}

export interface LocationCategory {
  category: string;
  sites: LocationSite[];
}

const LOCATIONS_PATH = "data/locations.json";

function seedSite(name: string): LocationSite {
  return { name, shot: false };
}

const DEFAULT_LOCATIONS: LocationCategory[] = [
  {
    category: "Beach",
    sites: [
      "Choengmon",
      "Taling Ngam",
      "Silver Beach",
      "Bang Por",
      "Lipa Noi",
      "Thongson Bay",
      "Coral Cove",
      "Maenam",
      "Laem Yai",
      "Lamai Beach",
    ].map(seedSite),
  },
  {
    category: "Temple",
    sites: [
      "Wat Tee (Watt Tee)",
      "Wat Plai Laem",
      "Big Buddha (Wat Phra Yai)",
      "Kunaram (Wat Khunaram)",
      "Hin Lad (temple)",
      "Khao Hua Jook",
      "Bo Putharam",
      "Wat Taling Ngam",
      "Wat Sam Ret",
      "Sala Thai",
    ].map(seedSite),
  },
  {
    category: "Waterfall",
    sites: [
      "Na Muang 1",
      "Na Muang 2",
      "Hin Lad (waterfall)",
      "Tan Rua",
      "Wang Sao",
      "Khun Si",
      "Khao Yai",
      "Lat Wanon",
      "Tartain",
      "Siva Tara",
    ].map(seedSite),
  },
  {
    category: "Jungle",
    sites: [
      "Magic Garden (Secret Buddha Garden)",
      "Overlap Stone",
      "Lad Koh",
      "Coconut Plantation",
      "Rubber Tree Farm",
      "Khao Pom Peak",
    ].map(seedSite),
  },
];

export async function getLocations(): Promise<LocationCategory[]> {
  try {
    const info = await head(LOCATIONS_PATH);
    const res = await fetch(info.url, { cache: "no-store" });
    if (!res.ok) return DEFAULT_LOCATIONS;
    return (await res.json()) as LocationCategory[];
  } catch {
    return DEFAULT_LOCATIONS;
  }
}

export async function saveLocations(locations: LocationCategory[]): Promise<void> {
  await put(LOCATIONS_PATH, JSON.stringify(locations, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/** Case-insensitive match against a site name; marks it shot if found. Returns true if a match was made. */
export function markSiteShot(locations: LocationCategory[], siteName: string): boolean {
  const needle = siteName.trim().toLowerCase();
  if (!needle) return false;
  for (const category of locations) {
    for (const site of category.sites) {
      if (site.name.toLowerCase().includes(needle) || needle.includes(site.name.toLowerCase())) {
        site.shot = true;
        return true;
      }
    }
  }
  return false;
}
