# Jungle Nidra — System Build Todo

Branch 1 (single-video production pipeline) is live: `SOP.md` + stage folders `01-ideas` → `06-performance-review`.
This tracks what's left to wire up, plus the next branches of the system.

## Branch 0 — Fix the active pipeline (do first)

- [x] Point the SOP at `jn_skills/` instead of the generic `.claude/skills/lite-cge-*` — the jn_ versions
      are the real, anonymized Jungle Nidra versions (no face, no cross-brand links, calm tone).
- [x] Replaced `.claude/skills/lite-cge-*` with `jn_skills/*` (2026-07-03) — jn skills now trigger
      automatically as project skills.
- [x] Starting clean from the next upload — no retro-fit needed for prior generic outputs.
- [x] Repo pushed to GitHub: github.com/elinthai/JungleNidra (2026-07-03). Vercel deferred until
      there's an actual UI to host (e.g. content calendar dashboard).

## Branch 0.5 — Manufacturing line (input populator + production SOP) — built 2026-07-03

- [x] `jn-production-line` skill: takes one input → packages it (title/thumbnail/opening lines) →
      pauses for approval → writes the full script → auto-saves both under a shared filename slug
      across `02-packaging/` and `03-scripts/`. This is now the default Stage 2+3 entry point in `SOP.md`.
- [x] `PRODUCTION-SOP.md`: Stage 4 runbook covering the b-roll shoot (nature/ambient, no people) and the
      digital pipeline (ElevenLabs narration → CapCut edit → soundscape → export/QC).
- [ ] Fill in the `[FILL IN]` markers in `PRODUCTION-SOP.md`: shoot location, camera gear, shot-list
      convention, ElevenLabs voice ID + stability/style settings, CapCut template location, silence-gap
      method, export settings. Once filled, this becomes a fixed per-video checklist.
- [ ] Run one real input through `/jn-production-line` end to end to sanity-check the approval pause
      and file-saving behavior before relying on it for the next Tue/Thu upload.

## Branch 2 — Repurposing / distribution

- [ ] New folder: `07-repurposing/shorts/`, `07-repurposing/clips/`
- [ ] Define a "cut list" step: after a long-form video is scripted, pull 2-3 short, self-contained
      moments (a single technique, a single opening line) as Shorts — must still pass the anonymity
      guardrail (no face).
- [ ] Decide if Jungle Nidra cross-posts anywhere else (Spotify/Insight Timer for audio-only sleep
      tracks is common for this niche) — if yes, add a distribution checklist per platform.

## Branch 3 — Content calendar

- [ ] New file: `content-calendar.md` or a simple CSV/table — columns: working title, stage
      (idea/scripted/recording/uploaded), target day (Tue/Thu), status.
- [ ] Seed it from whatever is already sitting in `01-ideas/` and `03-scripts/`.
- [ ] Decide cadence rule: does every Tue/Thu slot need an idea locked 1 week ahead?

## Branch 4 — Brand asset library

- [ ] New folder: `brand-assets/` — visual identity reference (color palette, imagery style: jungle/water/
      night-sky/soft-light), reusable thumbnail template, intro/outro audio bed, channel art.
- [ ] Document the ElevenLabs voice settings (voice ID, stability/style params) and CapCut project
      template so narration/editing stays consistent across videos without re-deriving it each time.

## Branch 5 — Revenue / financials tracking

- [ ] New file: `06-performance-review/revenue-log.md` — actuals vs. the plan from `jn-monetization`
      (ad revenue, affiliate, any other layer), updated monthly.

## Later (once channel has traction — not now)

- [ ] Community/comment management branch (recurring engagement pass beyond the pinned comment).
- [ ] Competitor/trend tracking branch — recurring version of `jn-video-idea-finder`, run weekly instead
      of per-video, to catch new sleep-content trends early.
- [ ] Sponsorship pipeline — only relevant once inbound interest starts; rate card + outreach tracker.

## Open questions for Eli

- Does Jungle Nidra publish audio-only versions anywhere (Spotify, Insight Timer)? Affects Branch 2 scope.
- Any videos already produced that should be retro-fitted through the new pipeline/folders, or do we
  start clean from the next upload?
