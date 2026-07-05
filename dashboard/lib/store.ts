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
  channel: string;
  targetDay?: string;
  notes?: string;
  script?: string;
  assets: Asset[];
  publishUrl?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  completedSteps: Record<string, string[]>;
  scoutedSites?: string[];
}

const PROJECTS_PATH = "data/projects.json";

// One 10-stage pipeline shared by every channel.
export const STAGES = [
  "Idea",
  "Script Generated",
  "Authenticity Check",
  "Record/Create Media",
  "Insert Media",
  "Add Voiced Script",
  "Thumbnail + Title",
  "Export",
  "Review",
  "Publish to YouTube",
];

export function stageIndex(stage: string): number {
  const idx = STAGES.indexOf(stage);
  return idx === -1 ? 0 : idx;
}

export function nextStage(stage: string): string | null {
  const idx = stageIndex(stage);
  return idx === -1 || idx >= STAGES.length - 1 ? null : STAGES[idx + 1];
}

export function previousStage(stage: string): string | null {
  const idx = stageIndex(stage);
  return idx <= 0 ? null : STAGES[idx - 1];
}

// --- Per-stage SOP checklists ---
// Seeded from SOP.md (rows 1-2+3, 4.5, 5, 6) and PRODUCTION-SOP.md (Parts 1-4).
// Each stage's checklist is what shows when a project sits at that stage — the
// project page IS the SOP, so there's no separate doc to remember to check.

export interface StageChecklistItem {
  id: string;
  text: string;
}

export const STAGE_CHECKLISTS: Record<string, StageChecklistItem[]> = {
  Idea: [
    { id: "seed-written", text: "Seed idea/prompt written down" },
    { id: "seed-saved", text: "Seed saved to the project (title or notes)" },
  ],
  "Script Generated": [
    { id: "script-generated", text: "Script generated (via the Generate script button, or written manually) from the seed" },
    { id: "script-reviewed", text: "First draft read through and edited for accuracy/tone" },
  ],
  "Authenticity Check": [
    { id: "materially-varied", text: "Script/theme is materially varied from this channel's other videos — not a reskinned template (YouTube inauthentic-content policy)" },
    { id: "authentic-insight", text: "Adds this channel's own authentic framing, not a generic AI-template feel" },
    { id: "not-reused-reading", text: "Not exclusively a reading/reuse of material not originally created for this channel" },
    { id: "disclosure-check", text: "Considered whether the \"Altered or synthetic content\" disclosure toggle applies (usually not — script/narration generation is exempted) and noted the call" },
    { id: "intro-outro-ok", text: "Confirmed: same intro/outro reuse is fine, but this video's bulk content differs from prior uploads" },
  ],
  "Record/Create Media": [
    { id: "plan-decided", text: "Location, set, or generation approach decided" },
    { id: "media-captured", text: "Media recorded (b-roll/on-camera) or generated" },
    { id: "quality-check", text: "Reviewed footage/visuals for quality and continuity" },
  ],
  "Insert Media": [
    { id: "media-uploaded", text: "Media uploaded into the project" },
    { id: "media-organized", text: "Assets reviewed and organized (correct kind/site/labels)" },
  ],
  "Add Voiced Script": [
    { id: "narration-recorded", text: "Narration recorded — real voice or ElevenLabs clone, per this channel's voice type" },
    { id: "narration-synced", text: "Narration laid over/synced with the media" },
  ],
  "Thumbnail + Title": [
    { id: "title-finalized", text: "Title finalized" },
    { id: "thumbnail-built", text: "Thumbnail built using this channel's brand palette/imagery" },
    { id: "brand-check", text: "Both checked against this channel's brand guardrails" },
  ],
  Export: [
    { id: "export-settings", text: "Export settings correct (resolution/format/audio)" },
    { id: "export-saved", text: "Final export file saved" },
  ],
  Review: [
    { id: "full-watch", text: "Full watch-through by a human before publishing" },
    { id: "opening-check", text: "Opening segment checked (hook/settle, per channel style)" },
    { id: "compliance-recheck", text: "Authenticity/compliance re-confirmed if anything changed since the gate" },
  ],
  "Publish to YouTube": [
    { id: "uploaded-youtube", text: "Uploaded to YouTube" },
    { id: "scheduled-or-live", text: "Scheduled or published live" },
    { id: "url-recorded", text: "Publish URL recorded" },
  ],
};

/** True when every checklist item for the given stage is checked, plus any stage-specific extra requirement. */
export function isStageComplete(project: Project, stage: string): boolean {
  const items = STAGE_CHECKLISTS[stage] || [];
  const done = project.completedSteps[stage] || [];
  const allChecked = items.every((item) => done.includes(item.id));
  if (!allChecked) return false;
  if (stage === "Record/Create Media" && project.channel === "jungle-nidra") {
    return (project.scoutedSites?.length ?? 0) > 0;
  }
  if (stage === "Publish to YouTube") return !!project.targetDay;
  return true;
}

export interface OpenStep {
  slug: string;
  title: string;
  stage: string;
  text: string;
}

/** Rollup of every unchecked checklist item across all projects, grouped by current stage. */
export function getOpenSteps(projects: Project[]): OpenStep[] {
  const steps: OpenStep[] = [];
  for (const project of projects) {
    const stage = project.stage;
    const items = STAGE_CHECKLISTS[stage] || [];
    const done = project.completedSteps[stage] || [];
    for (const item of items) {
      if (!done.includes(item.id)) {
        steps.push({ slug: project.slug, title: project.title, stage, text: item.text });
      }
    }
    if (stage === "Record/Create Media" && project.channel === "jungle-nidra" && (project.scoutedSites?.length ?? 0) === 0) {
      steps.push({ slug: project.slug, title: project.title, stage, text: "Pick site(s) from the location library" });
    }
    if (stage === "Publish to YouTube" && !project.targetDay) {
      steps.push({ slug: project.slug, title: project.title, stage, text: "Set a target publish day" });
    }
  }
  return steps.sort((a, b) => stageIndex(a.stage) - stageIndex(b.stage));
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
