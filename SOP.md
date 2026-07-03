# Production SOP — Jungle Nidra

This is the standard workflow for turning a raw input (a theme, destination, or sleep
problem) into a published, optimized Jungle Nidra video. Each stage maps to one skill
and one folder. Run the skill, save its output in the matching folder, then move to
the next stage. Every skill enforces the channel's anonymity guardrails automatically
(no face, no name, no cross-links to Eli's other brands).

## Workflow

| # | Stage | Skill to invoke | Input | Save output to |
|---|-------|------------------|-------|-----------------|
| 1 | Find the idea | `/jn-video-idea-finder` | Angle/destination theme (or "find what's working") | `01-ideas/` |
| 2+3 | Package it, then script it | `/jn-production-line` | An input (topic/theme/problem) | `02-packaging/titles/`, `thumbnails/`, `intros/`, then `03-scripts/` |
| 4 | Produce it | See `PRODUCTION-SOP.md` (b-roll shoot + ElevenLabs narration + CapCut edit + export/QC) | Script from step 2+3 | `04-recording-assets/raw-footage/`, `stills/`, `b-roll/`, `audio/` |
| 4.5 | Repurpose it | `/jn-repurposing` | Raw footage/stills back from the shoot + the approved script | `07-repurposing/feeder-reels/`, `07-repurposing/shorts/` |
| 5 | Post-upload checklist | `/jn-settings` | Final export + title | `05-post-upload/descriptions/`, `pinned-comments/`, `thumbnail-poll-variants/` |
| 6 | Review performance | `/jn-launch-optimization` | Analytics (CTR, retention, impressions) after 48+ hrs | `06-performance-review/` |
| — | Monetize (run anytime) | `/jn-monetization` | Current income status | `06-performance-review/monetization-plan.md` |

Stage 4.5 runs as soon as raw footage/stills are back from filming — it doesn't wait
for the long-form CapCut edit to finish. It produces one **feeder reel** (a short
teaser built from the most striking shot + a calm line from the script, closing with a
soft pointer to the full long-form video) plus 1-2 standalone Shorts/Reels cut from
other self-contained moments in the script. This is what connects the long-form video
to its short-form distribution — the feeder reel is the explicit bridge between the two.

## How to run a stage

1. Have an idea already? Hand it straight to `/jn-production-line` — it builds the
   package (title/thumbnail/opening lines), pauses for your approval, then writes and
   saves the full script. One input in, package + script out, everything auto-saved
   with a matching filename slug across `02-packaging/` and `03-scripts/`.
2. No idea yet? Start at `/jn-video-idea-finder`, then feed the winning idea into
   `/jn-production-line`.
3. Stage 4 (production) is manual — follow `PRODUCTION-SOP.md` step by step.
4. As soon as raw footage/stills are back from the shoot, hand the video's slug to
   `/jn-repurposing` — it plans the feeder reel and standalone shorts from the raw
   assets and the already-approved script. Actual clipping still happens manually in
   CapCut, using its output as the cut sheet.
5. Move to the next stage using the previous stage's saved output as input.

## Folder reference

```
01-ideas/                        <- ranked idea shortlists from the Icahn filter
02-packaging/
  titles/                        <- title options per video
  thumbnails/                    <- thumbnail concepts + final image assets
  intros/                        <- intro scripts
03-scripts/                      <- full teleprompter scripts
04-recording-assets/
  raw-footage/                   <- organized by site name, reused across videos
  stills/                        <- organized by video slug
  b-roll/                        <- supplemental stock/AI-generated footage
  audio/
05-post-upload/
  descriptions/                  <- SEO descriptions
  pinned-comments/
  thumbnail-poll-variants/       <- A/B thumbnail images for Community poll
06-performance-review/           <- launch diagnostics + monetization plans
07-repurposing/
  feeder-reels/                  <- one per video, teases the long-form upload
  shorts/                        <- standalone self-contained Shorts/Reels
```

## Notes

- Skills live in `.claude/skills/` (project-scoped to this folder) — copied from
  `jn_skills/` on 2026-07-03. These are the Jungle Nidra-specific versions (anonymous,
  no cross-brand links, calm/no-hype tone) — not the generic CGE lite versions.
- Loop: idea → package → script → produce → post-upload checklist → review performance →
  feed the "loop note" lesson from step 6 back into step 2/3 of the next video.
- Production days: Tue/Thu.
