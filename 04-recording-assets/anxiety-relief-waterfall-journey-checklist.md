# Production Checklist — anxiety-relief-waterfall-journey

This is `PRODUCTION-SOP.md` applied to this specific video. Work top to bottom.
Source files: `03-scripts/anxiety-relief-waterfall-journey.md`,
`02-packaging/thumbnails/anxiety-relief-waterfall-journey.md`.

## Part 1 — Shoot

Category: **Waterfall**. Shoot the 4-shot set (wide, slow push-in, static detail, slow
pan/glide — see `PRODUCTION-SOP.md` Part 1) at:

- [ ] **Na Muang 1** — 4 clips minimum, all 15-20s+
- [ ] **Na Muang 2** — 4 clips minimum, all 15-20s+

Prioritize a **still, dark pool** shot at the base of the falls at each site — that's
the thumbnail focal point and the recurring image the script returns to ("a still,
dark pool below" / "you find a smooth stone at the edge of the pool"). Get this shot
even if it's outside the standard 4-shot set.

Once shot, mark both sites done in `04-recording-assets/location-library.md` and save
raw footage to `04-recording-assets/raw-footage/na-muang-1/` and `na-muang-2/`.

## Part 2 — Narration (ElevenLabs)

Generate one audio file per script section (5 sections = 5 files minimum; split
further at your discretion for very long sections). Use your existing cloned-voice
settings (low speed, high stability).

- [ ] `01-welcome-settling.mp3` — Section 1
- [ ] `02-body-breath-settling.mp3` — Section 2
- [ ] `03-the-journey.mp3` — Section 3
- [ ] `04-descent-extended-quiet.mp3` — Section 4 (ends at "Just the sound of the water now.")

Section 5 has no spoken line — nothing to generate there; soundscape carries it.

Save to `04-recording-assets/audio/anxiety-relief-waterfall-journey/narration/`.

## Part 3 — Edit (CapCut)

The script already specifies exact pause lengths — use them directly instead of the
general 1.5-2s / 4-6s guidance in `PRODUCTION-SOP.md`:

- [ ] Lay narration clips in order with the scripted `[PAUSE - Xs]` gaps between each
      line (4s, 3s, 4s, 5s... — read directly from the script file).
- [ ] Section 4 gaps stretch out intentionally (6s → 8s → 8s → 10s → 10s) as the
      descent deepens — keep this widening rhythm, don't compress it.
- [ ] At `[NARRATION ENDS - SOUNDSCAPE CONTINUES]`, cut all spoken narration — soundscape
      only carries the rest of the all-night runtime.
- [ ] B-roll: cycle the Na Muang 1 & 2 clips under narration, slow cuts only (one cut
      per 15-20s+). Lead with a wide establishing shot in Section 1, favor the
      still-pool shot during Section 3 ("the journey") where the script names it directly.
- [ ] Soundscape: waterfall/water ambience under the full narration, continuing alone
      through the extended silent tail.
- [ ] Build the thumbnail from `02-packaging/thumbnails/anxiety-relief-waterfall-journey.md`
      using the still-pool shot as the base image.
- [ ] This is your first video — this edit becomes the CapCut template. Save it once
      finished (see `PRODUCTION-SOP.md` Part 3).

## Part 4 — Export & QC

- [ ] Export per `PRODUCTION-SOP.md` Part 4 defaults (MP4/H.264, 4K or 1080p, AAC 48kHz).
- [ ] QC: listen start to finish once — confirm the opening 60-90s actually settles
      you, not just reads as a normal video intro.
- [ ] Save final export + thumbnail, note the file location here: [FILL IN once exported]

## Handoff

Once exported and QC'd → Stage 5, `jn-settings` (post-upload checklist). Keep Private
24-48 hours first.
