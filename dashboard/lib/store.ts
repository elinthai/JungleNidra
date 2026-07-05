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
  completedSteps: Record<string, string[]>;
  scoutedSites?: string[];
}

const PROJECTS_PATH = "data/projects.json";

export const STAGES = [
  "Idea",
  "Packaged",
  "Scripted",
  "Location Scouted",
  "Filmed",
  "Voice Recorded",
  "Assembled",
  "Soundscape Added",
  "QC Reviewed",
  "Exported",
  "Repurposing",
  "Uploaded",
  "Scheduled/Live",
  "Performance Reviewed",
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
    { id: "run-idea-finder", text: "Run /jn-video-idea-finder (or note the winning idea/theme)" },
    { id: "save-idea", text: "Save the idea/shortlist to 01-ideas/" },
  ],
  Packaged: [
    { id: "run-packaging", text: "Run /jn-production-line packaging step (title/thumbnail/opening lines)" },
    { id: "approve-packaging", text: "Approve the packaging output" },
    { id: "save-packaging", text: "Saved to 02-packaging/titles, thumbnails, intros" },
  ],
  Scripted: [
    { id: "generate-script", text: "Full script generated via /jn-production-line" },
    { id: "save-script", text: "Script saved to 03-scripts/[slug].md" },
    { id: "approve-script", text: "Script approved" },
  ],
  "Location Scouted": [
    { id: "pick-category", text: "Pick location category matching the approved thumbnail concept" },
    { id: "gear-ready", text: "Gear ready: iPhone 15, lapel mic, tripod, gimbal" },
  ],
  Filmed: [
    { id: "camera-settings", text: "4K at 24fps (or 30fps, stay consistent), exposure locked" },
    { id: "lens-clean", text: "Lens cleaned before shooting" },
    { id: "four-shot-set", text: "4-shot set per site: wide establishing, slow push-in, static detail, slow pan/glide" },
    { id: "no-people", text: "No people/faces/identifiable landmarks in any clip" },
    { id: "soft-light", text: "Shot during soft light (early morning/late afternoon) where possible" },
    { id: "save-footage", text: "Raw footage saved to 04-recording-assets/raw-footage/[site-name]/" },
  ],
  "Voice Recorded": [
    { id: "voice-clone", text: "Using cloned voice already uploaded to ElevenLabs" },
    { id: "voice-settings", text: "Speed low, Stability ~80-90%, Style ~0-15%, Similarity ~75%+" },
    { id: "generate-chunks", text: "Script generated in chunks at natural pause points (not one block)" },
    { id: "save-audio", text: "Narration saved to 04-recording-assets/audio/[slug]/narration/, numbered in order" },
  ],
  Assembled: [
    { id: "capcut-project", text: "CapCut project started at Export-stage settings" },
    { id: "track-stack", text: "Track stack built: b-roll video, narration audio, soundscape audio (in that order)" },
    { id: "silence-gaps", text: "1.5-2s silence between sentences, 4-6s between major beats" },
    { id: "broll-cuts", text: "B-roll laid under narration, slow cuts only (~every 15-20s+)" },
  ],
  "Soundscape Added": [
    { id: "layer-soundscape", text: "Ambient soundscape layered under narration + into the silent tail" },
    { id: "midroll-ads", text: "Mid-roll ad placement (if applicable) — only within spoken portion" },
    { id: "thumbnail-built", text: "Final thumbnail image built from the approved concept" },
  ],
  "QC Reviewed": [
    { id: "watch-full", text: "Watch/listen to the full edit start to finish" },
    { id: "opening-settles", text: "Opening 60-90 seconds actually settles the listener (jn-settings Task 1)" },
  ],
  Exported: [
    { id: "export-format", text: "Format: MP4 (H.264)" },
    { id: "export-resolution", text: "Resolution: 4K (or 1080p), matching capture" },
    { id: "export-framerate", text: "Frame rate matches capture rate (24fps or 30fps)" },
    { id: "export-audio", text: "Audio: AAC, 48kHz, stereo" },
    { id: "save-export", text: "Final export + thumbnail saved, file location noted" },
  ],
  Repurposing: [
    { id: "run-repurposing", text: "Run /jn-repurposing using raw footage/stills + the approved script" },
    { id: "feeder-reel", text: "One feeder reel produced, bridging to the long-form upload" },
    { id: "standalone-shorts", text: "1-2 standalone Shorts/Reels cut" },
    { id: "save-repurposing", text: "Saved to 07-repurposing/feeder-reels and /shorts" },
  ],
  Uploaded: [
    { id: "run-settings", text: "Run /jn-settings post-upload checklist" },
    { id: "seo-description", text: "SEO description written" },
    { id: "pinned-comment", text: "Pinned comment posted" },
    { id: "keep-private", text: "Kept Private for 24-48 hours before going live" },
  ],
  "Scheduled/Live": [
    { id: "set-publish-date", text: "Scheduled publish date/time set" },
    { id: "confirm-live", text: "Flipped to Public / confirmed live" },
  ],
  "Performance Reviewed": [
    { id: "wait-analytics", text: "Waited 48+ hrs for analytics (CTR, retention, impressions)" },
    { id: "run-optimization", text: "Run /jn-launch-optimization" },
    { id: "save-review", text: "Diagnosis saved to 06-performance-review/" },
    { id: "loop-note", text: "Loop-note lesson fed back into the next video's packaging" },
  ],
};

/** True when every checklist item for the given stage is checked, plus any stage-specific extra requirement. */
export function isStageComplete(project: Project, stage: string): boolean {
  const items = STAGE_CHECKLISTS[stage] || [];
  const done = project.completedSteps[stage] || [];
  const allChecked = items.every((item) => done.includes(item.id));
  if (!allChecked) return false;
  if (stage === "Location Scouted") return (project.scoutedSites?.length ?? 0) > 0;
  if (stage === "Scheduled/Live") return !!project.targetDay;
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
    if (stage === "Location Scouted" && (project.scoutedSites?.length ?? 0) === 0) {
      steps.push({ slug: project.slug, title: project.title, stage, text: "Pick site(s) from the location library" });
    }
    if (stage === "Scheduled/Live" && !project.targetDay) {
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
