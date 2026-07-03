# Stage 4 Production SOP — Script to Finished Upload

This runs after a script is approved and saved to `03-scripts/[slug].md`. It covers
both halves of production: the physical b-roll shoot and the digital assembly
pipeline (ElevenLabs narration → CapCut edit → soundscape → export).

Fill in the `[FILL IN]` markers once with your real settings/gear — after that this
becomes a fixed checklist you run per video instead of re-deciding each time.

## Part 1 — B-roll shoot (nature/ambient, no people)

- [ ] Pull the visual metaphor from the approved thumbnail concept
      (`02-packaging/thumbnails/[slug].md`) — that's what you're shooting for.
- [ ] Location: [FILL IN: where you shoot — home setup, specific outdoor spots, etc.]
- [ ] Gear: [FILL IN: camera/phone, lens, tripod, any stabilizer]
- [ ] Shot list convention: [FILL IN: e.g. always get a wide establishing shot, a slow
      push-in, and one static "hold" shot per location, minimum X seconds each]
- [ ] No people, no faces, no identifiable locations (matches jn-holy-trifecta /
      jn-settings brand guardrails) — check every clip before it leaves the shoot.
- [ ] Save raw footage to `04-recording-assets/raw-footage/[slug]/`
- [ ] Any supplemental b-roll needed beyond what you shot (stock or AI-generated) goes
      in `04-recording-assets/b-roll/[slug]/` — tag its source in a filename or note.

## Part 2 — Narration (ElevenLabs)

- [ ] Voice ID: [FILL IN]
- [ ] Stability / similarity / style settings: [FILL IN]
- [ ] Paste the approved script from `03-scripts/[slug].md` — generate narration in
      chunks that match natural pause points in the script, not the whole script as
      one block, so silence-gap editing in Part 3 is clean.
- [ ] Save raw narration audio to `04-recording-assets/audio/[slug]/narration/`

## Part 3 — Edit (CapCut)

- [ ] Project template: [FILL IN: name/location of your reusable CapCut template]
- [ ] Silence-gap process: [FILL IN: your method for spacing narration lines with
      silence for the sleep-journey pacing]
- [ ] Lay b-roll under narration per the shot list — slow cuts only, nothing jarring.
- [ ] Layer the ambient soundscape (rain/forest/water/etc. matching the theme) under
      the full narration + into the extended silent/soundscape-only tail.
- [ ] Mid-roll ad placement (if applicable): follow `jn-settings` Task 5 — only within
      the spoken portion, never into the silent tail.
- [ ] Thumbnail: build the final image from the approved concept in
      `02-packaging/thumbnails/[slug].md`.

## Part 4 — Export & QC

- [ ] Export settings: [FILL IN: resolution, format, bitrate]
- [ ] QC pass: opening 60-90 seconds actually settles the listener (per jn-settings
      Task 1) — watch/listen start to finish once before upload.
- [ ] Save final export + thumbnail to `04-recording-assets/[slug]/` (or wherever your
      upload staging lives) and note the file location before moving to Stage 5.

## Handoff to Stage 5

Once exported and QC'd, move to the post-upload checklist (`jn-settings`) per
`SOP.md`. Keep the video Private for 24-48 hours first per Task 1.
