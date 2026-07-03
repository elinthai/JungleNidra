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
- [x] Filled in `PRODUCTION-SOP.md` (2026-07-03): beginner-friendly 4-shot filming checklist for the
      40-site Koh Samui location library (iPhone 15 + lapel mic + tripod + gimbal), ElevenLabs setting
      guidance for the cloned/stable voice, CapCut silence-gap + template-build plan (first video builds
      the template), and recommended export settings.
- [x] Populated `04-recording-assets/location-library.md` with Eli's real site list (2026-07-03) —
      categories are actually Beach/Temple/Waterfall/Jungle, not Beach/Temple/Jungle/Shala as originally
      planned; updated `PRODUCTION-SOP.md` to match.
- [ ] Jungle category is 6 of 10 — need 4 more jungle sites from Eli to complete the library.
- [x] Test run completed 2026-07-03: input "a Na Muang waterfall journey for anxiety relief, long
      all-night track" → `/jn-production-line` produced and saved package + script under
      `anxiety-relief-waterfall-journey`, plus a per-video production checklist
      (`04-recording-assets/anxiety-relief-waterfall-journey-checklist.md`) mapping the script's exact
      pause timings and the Na Muang 1/2 shoot list onto `PRODUCTION-SOP.md`. Approval pause worked as
      designed. Eli will shoot/produce this as the actual first video and report back.

## Branch 2 — Repurposing / distribution — built 2026-07-03

- [x] New folders: `07-repurposing/shorts/`, `07-repurposing/feeder-reels/`, plus
      `04-recording-assets/stills/` as the intake folder for photo assets from the shoot.
- [x] `jn-repurposing` skill: takes a video's slug once raw footage/stills are back from filming,
      finds 2-3 self-contained moments in the approved script, and builds one **feeder reel**
      (best shot + calmest line + soft pointer back to the long-form video) plus standalone shorts.
      Wired into `SOP.md` as Stage 4.5, running right after the shoot (doesn't wait on the full
      CapCut edit). Output is a planning/cut-sheet doc — actual clip export is still manual in CapCut.
- [ ] Run `/jn-repurposing` for real once raw footage exists for `anxiety-relief-waterfall-journey`
      to sanity-check it the same way we tested `/jn-production-line`.
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
