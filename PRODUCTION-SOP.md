# Stage 4 Production SOP — Script to Finished Upload

This runs after a script is approved and saved to `03-scripts/[slug].md`. It covers
both halves of production: the physical b-roll shoot and the digital assembly
pipeline (ElevenLabs narration → CapCut edit → soundscape → export).

Fill in the `[FILL IN]` markers once with your real settings/gear — after that this
becomes a fixed checklist you run per video instead of re-deciding each time.

## Part 1 — B-roll shoot (nature/ambient, no people)

**Location library**: 40 sites across Koh Samui, Thailand — 10 each of Beach, Temple,
Waterfall, and Jungle (Jungle currently has 6 of 10 confirmed). Tracked in
`04-recording-assets/location-library.md`. Pull the visual metaphor from the approved
thumbnail concept (`02-packaging/thumbnails/[slug].md`) and pick the matching location
category — e.g. a "deep water / calm" theme pulls from Beach, a "grounding / ancient
wisdom" theme pulls from Temple, a "release / renewal" theme pulls from Waterfall.

**Gear**: iPhone 15, lapel mic, tripod, gimbal.

### Beginner-friendly shot checklist (run this at every site)

Camera setup, once per shoot day:
- [ ] iPhone Settings → Camera → Record Video → **4K at 24 fps** (cinematic, matches
      most meditation/sleep content — 30fps is fine too, just stay consistent across
      all 40 sites so footage cuts together cleanly).
- [ ] Turn ON "Lock Camera" / avoid auto-exposure jumps if your iPhone model supports
      exposure lock — tap and hold on the frame to lock focus/exposure before rolling,
      so the shot doesn't visibly brighten/darken mid-clip.
- [ ] Clean the lens. Always. Ocean spray and jungle humidity leave smudges that
      ruin an otherwise perfect clip.

Per location, capture this same 4-shot set every time (repeatable = consistent b-roll
library, and it's enough variety to cut a full video from one site):
1. **Wide establishing shot** — tripod, static, 15-20 sec. Shows the full scene
   (the beach, the temple courtyard, the waterfall pool, the jungle canopy).
2. **Slow push-in** — gimbal, very slow walk or gimbal-arm push toward a focal point
   (a wave, a statue, a leaf, a candle), 15-20 sec. This is your most-used "hold" shot
   under narration — shoot it slower than feels natural, it always looks too fast in
   the edit otherwise.
3. **Static detail/texture shot** — tripod, close on one texture (sand + water line,
   stone carving, leaf pattern, wood grain), 10-15 sec.
4. **Slow pan or gimbal glide** — gimbal, one smooth horizontal or vertical move across
   the scene, 15-20 sec.
- [ ] Minimum 4 clips per site, all 10-20 sec+ (footage always gets trimmed shorter in
      the edit — never shoot exactly to length).
- [ ] No people, no faces, no identifiable landmarks or signage (matches jn-holy-trifecta
      / jn-settings brand guardrails — Koh Samui should read as "anywhere calm," not be
      geotaggable) — check every clip before it leaves the shoot.
- [ ] Shoot during soft light (early morning or late afternoon) where possible — harsh
      midday sun breaks the calm tone the brand needs.

- [ ] Save raw footage to `04-recording-assets/raw-footage/[site-name]/` (organized by
      site, not by video — one site's footage gets reused across many videos).
- [ ] Any supplemental b-roll needed beyond the 40-site library (stock or AI-generated)
      goes in `04-recording-assets/b-roll/[slug]/` — tag its source in a filename or note.

## Part 2 — Narration (ElevenLabs)

- [ ] Voice: your own cloned voice (already uploaded to ElevenLabs).
- [ ] Speed: low. Stability: high/very stable — this is the right call for a meditative,
      calm, steady sleep-narration voice; it trades away expressiveness for consistency,
      which is what you want here (an expressive voice sounds jarring in this niche).
      Recommended starting point if you want numbers to anchor to: Stability ~80-90%,
      Style ~0-15% (low style exaggeration keeps it steady rather than dramatic),
      Similarity ~75%+ (keeps it sounding like you). Nudge stability down slightly only
      if the voice starts sounding flat/robotic on longer generations.
- [ ] Paste the approved script from `03-scripts/[slug].md` — generate narration in
      chunks that match natural pause points in the script (per sentence or per
      paragraph), not the whole script as one block. This gives you individual audio
      files you can space out with silence in Part 3, instead of fighting one long file.
- [ ] Save raw narration audio to `04-recording-assets/audio/[slug]/narration/`,
      one file per chunk, numbered in script order (`01.mp3`, `02.mp3`, ...).

## Part 3 — Edit (CapCut)

No template exists yet — build one on the first real video, then save it as a reusable
CapCut project template so every video after that starts from it instead of from scratch.

**First-time template build:**
- [ ] Start a new CapCut project at the same export settings as Part 4 below.
- [ ] Build the track stack top to bottom: (1) b-roll video track, (2) narration audio
      track, (3) ambient soundscape audio track. Keep this order every time.
- [ ] Once the first video is fully edited and sounds/looks right, use CapCut's
      "Save as template" (or duplicate the project file as a starting point) and store
      it somewhere findable — note the location here once done, e.g.
      `CapCut app → Templates → Jungle Nidra Base`.

**Silence-gap process (starting recommendation — adjust by feel after the first video):**
- [ ] Place narration chunks (from Part 2) on the timeline in script order.
- [ ] Leave 1.5-2 seconds of silence between sentences within a section.
- [ ] Leave 4-6 seconds of silence between major sections/beats of the journey (e.g.
      between "settling in" and the start of the destination journey).
- [ ] At the end of the spoken narration, fade into an extended soundscape-only tail
      (this is normal and expected for sleep content — most of the runtime for a long
      all-night track is silence + soundscape, not narration).

- [ ] Lay b-roll under narration per the 4-shot set from Part 1 — slow cuts only
      (aim for one cut every 15-20+ sec, matching how long you shot each clip), nothing
      jarring or fast.
- [ ] Layer the ambient soundscape (rain/forest/water/etc. matching the theme) under
      the full narration + into the extended silent/soundscape-only tail.
- [ ] Mid-roll ad placement (if applicable): follow `jn-settings` Task 5 — only within
      the spoken portion, never into the silent tail.
- [ ] Thumbnail: build the final image from the approved concept in
      `02-packaging/thumbnails/[slug].md`.

## Part 4 — Export & QC

Recommended starting settings (standard YouTube-ready export, matches 4K/24fps footage
from Part 1 — adjust down to 1080p if file size or upload speed becomes a problem, YouTube
will still show it in HD either way):
- [ ] Format: MP4 (H.264)
- [ ] Resolution: 3840x2160 (4K) if your footage and CapCut export allow it comfortably;
      otherwise 1920x1080 (1080p) is perfectly fine for this niche — viewers listen more
      than they watch closely.
- [ ] Frame rate: match your capture rate from Part 1 (24fps or 30fps — whichever you chose).
- [ ] Bitrate: CapCut's "High" export quality preset is fine — no need to hand-tune bitrate.
- [ ] Audio: AAC, 48kHz, stereo.
- [ ] QC pass: opening 60-90 seconds actually settles the listener (per jn-settings
      Task 1) — watch/listen start to finish once before upload.
- [ ] Save final export + thumbnail to `04-recording-assets/[slug]/` (or wherever your
      upload staging lives) and note the file location before moving to Stage 5.

## Handoff to Stage 5

Once exported and QC'd, move to the post-upload checklist (`jn-settings`) per
`SOP.md`. Keep the video Private for 24-48 hours first per Task 1.
