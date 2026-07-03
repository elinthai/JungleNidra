---
name: jn-repurposing
description: "Turn a Jungle Nidra video's raw footage/stills and its approved script into short-form deliverables: standalone Shorts/Reels and a feeder reel that teases the long-form video. Use whenever Eli says he's back from filming and has raw footage or stills for a video, asks to repurpose a video into Shorts/Reels, or wants clips that point back to the full long-form upload."
---

JN-REPURPOSING (Short-form from raw assets)

ROLE
You turn one video's raw footage/stills plus its approved script into short-form
deliverables — self-contained Shorts/Reels, and one feeder reel that connects back to
the long-form video. This runs once Eli is back from filming, after Stage 4's shoot
step (`PRODUCTION-SOP.md` Part 1) but doesn't require the long-form CapCut edit to be
finished first — feeder reels are often useful before the full video is even released,
to build anticipation.

INPUT
- The video's slug (so you can pull `03-scripts/[slug].md` and
  `02-packaging/thumbnails/[slug].md`).
- Confirmation that raw footage/stills exist. Ask: "Which folder did you save the raw
  assets to?" if not given — expected locations are
  `04-recording-assets/raw-footage/[site-name]/` (video) and
  `04-recording-assets/stills/[slug]/` (photos), per site name or slug.
- If the script or thumbnail doesn't exist yet for this slug, tell Eli to run
  `/jn-production-line` first — this skill repurposes existing content, it doesn't
  create new ideas.

BRAND GUARDRAILS (same as the rest of the system — never relaxed for short-form)
- No face, no name, no cross-brand references, calm tone — even though Shorts/Reels
  algorithms reward fast hooks elsewhere, Jungle Nidra's hook is stillness and calm,
  not urgency. Never write a jarring or hype-driven short-form hook just because
  "that's what works on Shorts" — it breaks the brand's core promise on first contact.
- No spoken narration invented that wasn't in the original script — pull lines
  verbatim or lightly trim them, don't write new dialogue.

STEP 1 — IDENTIFY THE CUT LIST
Read the approved script (`03-scripts/[slug].md`). Find 2-3 self-contained moments
that work without the full journey around them — usually:
- One line/passage from Section 3 ("The Journey") with strong sensory imagery
- One line/passage from Section 2 (a breath or body-scan cue) that stands alone as a
  15-30 second calming moment
- The opening lines from Section 1, if not already used as the feeder reel (Step 2)

For each: note the exact script lines to use as narration (already recorded in Part 2
of the video's production checklist — reuse that audio, don't regenerate), and which
raw clip(s) from the shoot location fit as the visual.

STEP 2 — BUILD THE FEEDER REEL
This is the one piece whose job is explicitly to drive traffic to the long-form video —
distinct from the standalone shorts in Step 1.
- Pull the single most striking visual moment from the raw footage/stills (often the
  same still-pool/focal shot used for the thumbnail).
- Pair it with the calmest, most inviting line from the script's opening or journey
  section — not a cut-off cliffhanger, just a genuine short taste of the experience.
- Add one soft, on-brand closing line pointing to the full video, e.g. "The full
  journey is up now — link in the caption" or "Full 8-hour version live now."
  No urgency, no hard sell, matches jn-settings' existing CTA tone.

STEP 3 — OUTPUT
For each short (feeder reel + standalone shorts), produce:
- Working title/slug: `[video-slug]-feeder` or `[video-slug]-short-1`, `-short-2`
- Script lines used (verbatim from the source script, with the [PAUSE] markers kept)
- Visual: which raw clip(s) or stills to use, referencing the folder/site name
- On-screen text (if any) — same 3-4 word max, calm-tone rules as thumbnails
- Caption text (1-3 sentences, calm tone, feeder reel includes the pointer line to
  the long-form video; standalone shorts don't need one)

Save each to `07-repurposing/feeder-reels/[video-slug]-feeder.md` or
`07-repurposing/shorts/[video-slug]-short-N.md`.

STEP 4 — CONFIRM
List the saved file paths. Remind Eli that actual clipping/export still happens
manually in CapCut using these as the cut sheet — this skill plans the shorts, it
doesn't render video.

HARD RULES
- Never invent new spoken lines — reuse or lightly trim the original script.
- Never break the no-face/no-name/no-cross-brand guardrail for the sake of a
  "stronger" short-form hook.
- If the raw footage doesn't have a clip that fits a moment well, say so and mark
  [FILL IN: need footage of X] rather than forcing a mismatched clip.
