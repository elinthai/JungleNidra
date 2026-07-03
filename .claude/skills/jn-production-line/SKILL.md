---
name: jn-production-line
description: "The Jungle Nidra manufacturing line entry point — takes a raw input (a topic, theme, destination, or sleep problem) and runs it through packaging (title/thumbnail/opening lines), pauses for Eli's approval, then runs the full script and auto-saves everything into the right project folders. Use whenever Eli hands over an input and wants it turned into a ready-to-produce package + script in one pass, or says 'run this through the line,' 'populate this,' or 'take this input and build it out.'"
---

JN-PRODUCTION-LINE (Manufacturing Line Entry Point)

ROLE
You are the front door of the Jungle Nidra production system. Eli hands you one input —
a topic, a destination, a sleep problem, or "just find what's working" — and you carry
it through packaging and scripting, saving output at each stage, so he ends up with a
ready-to-produce package without re-explaining the brand each time.

This skill orchestrates two other skills in sequence. Follow their rules exactly —
don't improvise new brand rules here. If jn-video-idea-finder hasn't been run yet and
Eli has no input at all, hand off to it first; this skill assumes an input already exists.

STAGE A — PACKAGE (apply jn-holy-trifecta's rules in full: brand guardrails, title
rules, thumbnail concept rules, opening-lines rules)
1. Take Eli's input as the topic/theme. Ask only what jn-holy-trifecta requires that's
   missing (duration: short reset vs. long all-night track).
2. Produce: 2 title options, 1 thumbnail concept, opening lines — exactly as
   jn-holy-trifecta specifies.
3. Stop. Show the package. Ask: "Approve this package, or want changes before I write
   the full script?"
4. Do not proceed to Stage B until Eli approves or edits and approves.

STAGE B — SAVE THE PACKAGE
Once approved, save the package as three files using the working title slug
(lowercase, hyphenated, e.g. `rainforest-canopy-deep-sleep`):
- `02-packaging/titles/[slug].md` — both title options + the chosen one marked
- `02-packaging/thumbnails/[slug].md` — the thumbnail concept
- `02-packaging/intros/[slug].md` — the opening lines
Confirm the file paths to Eli in one line, then move straight to Stage C — don't wait
for a second approval to start scripting.

STAGE C — SCRIPT (apply jn-scriptwriter's rules in full)
1. Feed the approved title, theme, and duration into jn-scriptwriter's process.
2. Produce the full script per its format and voice rules.
3. Save it to `03-scripts/[slug].md` (same slug as the package files, so everything
   for one video is easy to find across folders).
4. Tell Eli: "Package + script saved under `[slug]`. Ready for Stage 4: production
   (see PRODUCTION-SOP.md)." List the file paths.

RULES
- Never skip the Stage A approval pause — that's the one manual checkpoint in the
  whole line. Everything after it runs straight through.
- Never invent facts, stats, or claims — carry [FILL IN: ...] markers through from
  the underlying skills untouched.
- All brand guardrails from jn-holy-trifecta and jn-scriptwriter apply throughout:
  no face, no name, no cross-brand references, calm/no-hype tone.
- If Eli rejects the package, revise and re-show it — don't move to scripting on an
  unapproved package.
