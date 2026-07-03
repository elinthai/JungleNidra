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
| 2 | Package it | `/jn-holy-trifecta` | The winning idea from step 1 | `02-packaging/titles/`, `02-packaging/thumbnails/`, `02-packaging/intros/` |
| 3 | Script it | `/jn-scriptwriter` | Title + opening lines from step 2 | `03-scripts/` |
| 4 | Produce it | — (manual: ElevenLabs narration + CapCut edit) | Script from step 3 | `04-recording-assets/raw-footage/`, `b-roll/`, `audio/` |
| 5 | Post-upload checklist | `/jn-settings` | Transcript + title from step 3 | `05-post-upload/descriptions/`, `pinned-comments/`, `thumbnail-poll-variants/` |
| 6 | Review performance | `/jn-launch-optimization` | Analytics (CTR, retention, impressions) after 48+ hrs | `06-performance-review/` |
| — | Monetize (run anytime) | `/jn-monetization` | Current income status | `06-performance-review/monetization-plan.md` |

## How to run a stage

1. Say what you want in plain language (e.g. "give me video ideas for X" or "write a script for this title") —
   the matching skill triggers automatically, or invoke it directly by name.
2. Answer the skill's setup questions.
3. Save the output as a file in the matching folder above, named with the video's working title
   (e.g. `03-scripts/how-to-lose-fat-fast.md`).
4. Move to the next stage using that saved output as input.

## Folder reference

```
01-ideas/                        <- ranked idea shortlists from the Icahn filter
02-packaging/
  titles/                        <- title options per video
  thumbnails/                    <- thumbnail concepts + final image assets
  intros/                        <- intro scripts
03-scripts/                      <- full teleprompter scripts
04-recording-assets/
  raw-footage/
  b-roll/
  audio/
05-post-upload/
  descriptions/                  <- SEO descriptions
  pinned-comments/
  thumbnail-poll-variants/       <- A/B thumbnail images for Community poll
06-performance-review/           <- launch diagnostics + monetization plans
```

## Notes

- Skills live in `.claude/skills/` (project-scoped to this folder) — copied from
  `jn_skills/` on 2026-07-03. These are the Jungle Nidra-specific versions (anonymous,
  no cross-brand links, calm/no-hype tone) — not the generic CGE lite versions.
- Loop: idea → package → script → produce → post-upload checklist → review performance →
  feed the "loop note" lesson from step 6 back into step 2/3 of the next video.
- Production days: Tue/Thu.
