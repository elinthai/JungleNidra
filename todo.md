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

## Branch 3 — Content calendar — built 2026-07-03

- [x] New file: `content-calendar.md` — columns: slug, working title, stage, target day, status/notes.
      Stages match `SOP.md` exactly: Idea → Packaged → Scripted → Shooting → Editing → Repurposing →
      Uploaded → Reviewed.
- [x] Seeded with `anxiety-relief-waterfall-journey` (currently at Scripted, awaiting shoot).
- [x] Cadence rule: staying flexible for now (Eli's call) — no fixed 1-week-ahead lock. Revisit once
      a few videos have gone through and real pacing is known.
- [ ] Remember to update `content-calendar.md` by hand as videos move through stages — nothing
      auto-updates it yet.

## Branch 4 — Brand asset library — built 2026-07-03

- [x] New folder: `brand-assets/` with `brand-guide.md` — consolidates the color palette (deep blue /
      soft moss green / warm amber glow), imagery style rules, and the 4-part thumbnail construction
      template pulled from the pattern already used in `02-packaging/thumbnails/`.
- [x] ElevenLabs voice settings and CapCut plan already documented in `PRODUCTION-SOP.md` — brand-guide
      references them rather than duplicating.
- [ ] Actual thumbnail template file doesn't exist yet — build one (Canva/Photoshop) once you've made
      a few thumbnails by hand, then store it in `brand-assets/thumbnail-template/` and note it in
      `brand-guide.md`.
- [ ] Intro/outro audio bed — not built yet. Optional: a consistent quiet ambient bed under the opening
      lines for brand recognition across videos. Folder ready at `brand-assets/audio-bed/`.
- [ ] Channel art (banner/profile image) — not built yet. Folder ready at `brand-assets/channel-art/`.

## Branch 5 — Revenue / financials tracking — built 2026-07-03

- [x] New file: `06-performance-review/revenue-log.md` — monthly actuals table across all 5 of
      `jn-monetization`'s income layers (Ads, Affiliate, Memberships, Licensing, Sponsorships).
- [ ] No plan has actually been run yet — run `/jn-monetization` once a few videos are live and
      there's real view/sub numbers to work from.

## Branch 6 — Dashboard UI — built 2026-07-03

- [x] `dashboard/` — a Next.js app reading `content-calendar.md`, `todo.md`, `SOP.md`,
      `PRODUCTION-SOP.md`, `brand-assets/brand-guide.md`, and
      `04-recording-assets/location-library.md` from the repo root at build time.
      View-only by design (per Eli's call) — the markdown files stay the source of truth.
- [x] Pages: Overview (stats), Calendar, Locations (progress bars per category), Brand
      (palette swatches + guide), SOP, Todo.
- [x] Verified locally: build succeeds, login sets the cookie, all pages render real repo
      content correctly (calendar shows the waterfall video, locations shows Na Muang 1, etc).
- [x] Deployed to Vercel (2026-07-03) — Root Directory set to `dashboard`, Framework Preset
      manually set to Next.js (didn't auto-detect on first deploy, causing a "no public
      directory" build failure — fixed once set explicitly).
- [x] Password gate (`DASHBOARD_PASSWORD` env var + `middleware.ts`) removed 2026-07-03 —
      the env var wasn't taking effect after a couple of redeploy attempts. Dashboard was
      briefly public; **superseded by Branch 6.5 below**, which adds real auth back.
- [x] Every push to `main` auto-redeploys, so routine content edits (new calendar rows,
      checked-off locations) show up on the next deploy with zero dashboard code changes.

## Branch 6.5 — Workbench (Projects: real login, uploads) — built 2026-07-03

Eli wants to go from "start to finish a project on this site" — create a video, upload
raw footage/stills, track it through stages, all in the browser. Actual video editing
stays in CapCut (rebuilding that in-browser would be its own large project, not a
feature add) — the site's job is the workflow and assets around it.

- [x] Real login via NextAuth (Credentials provider, single user, bcrypt-hashed password)
      replacing the old custom cookie-compare approach that broke last time. Config split
      into `lib/auth.config.ts` (edge-safe, used by `middleware.ts`) and `lib/auth.ts`
      (full config with bcrypt, used by the route handler) — bcrypt isn't Edge-runtime
      compatible, so it can't live in the middleware bundle.
- [x] `AUTH_PASSWORD_HASH_B64`: the bcrypt hash is stored base64-encoded, not raw — raw
      hashes are full of `$` characters that both Vercel's env var UI and Next.js's local
      `.env` loader can silently mangle (this actually happened during local testing:
      `dotenv-expand` stripped the `$2b$10$...` prefix, breaking every login attempt until
      caught). `scripts/generate-secrets.js "password"` generates both `AUTH_SECRET` and
      the base64 hash — run it locally, paste output into Vercel.
- [x] `/projects` — the new workbench. Create a project (title + optional target day),
      it gets a slug matching what `jn-production-line` uses for git-tracked package/script
      files. Each project page has: a stage selector (same 8 stages as `content-calendar.md`),
      a brand palette reference, an upload widget (video/photo, labeled with site name),
      and a notes field.
- [x] Storage: one Vercel Blob store holds `data/projects.json` (acts as a lightweight
      database — no separate DB needed for single-user, low-volume data) plus the uploaded
      files themselves. Uploads use `@vercel/blob/client`'s direct-to-Blob pattern so large
      video files bypass the serverless function body-size limit.
- [x] Verified locally: clean build (no Edge Runtime warnings after the config split),
      full login flow tested via curl (CSRF token → credentials callback → session cookie →
      access to `/projects`), all working end to end.
- [x] Deployed and verified live (2026-07-03), after working through three real issues:
      1. First password attempt failed — turned out to be a mix-up between the plaintext
         login password and the base64 hash meant only for the env var; regenerated fresh
         with `Bangrak2024` as the actual login password.
      2. `BLOB_READ_WRITE_TOKEN` wasn't added automatically when the store was first
         connected — added manually from the store's quickstart page.
      3. First Blob store was created as **private** access by default, but our code
         (and the Vercel quickstart snippet) assumes `access: 'public'`. No toggle existed
         post-creation, so deleted and recreated the store choosing Public explicitly.
         Also hit the by-now-familiar "env var change needs a fresh redeploy" issue twice
         along the way (old store's stale token, then the new one).
      Confirmed working end to end: logged in with the real password, created a test
      project via the API, saw it render on `/projects`.
- [x] Added a `DELETE /api/projects/[slug]` endpoint + delete button on the project page
      (built while cleaning up the test project — useful going forward regardless).
- [x] Removed the temporary error-detail exposure from `/api/projects` POST (was added
      briefly to debug live, replaced with server-side `console.error` + a generic
      client-facing message).
- [ ] Phase 2 (not built): trigger `jn-production-line`/`jn-repurposing` generation
      directly from the site via the Claude API, instead of through Claude Code chat.
      Biggest remaining "leave the site to use Claude Code chat" seam — deliberately not
      started yet since it needs a scoping conversation (API cost, how much mid-generation
      editing to allow) before building.

## Branch 7 — Seamless-workflow gaps — started 2026-07-03

Four gaps identified when reviewing the full system end to end. All four are being
closed by making `/projects` (Blob-backed) the one live record, with git-tracked
markdown files becoming historical snapshots rather than something read live.

- [x] **Two sources of truth**: `/calendar` now reads live from `getProjects()` (Blob),
      table-formatted, instead of parsing `content-calendar.md`. The real waterfall video
      was seeded into Blob via the API (`anxiety-relief-waterfall-journey`, stage
      `Scripted`, notes carried over) so nothing was lost. `content-calendar.md` marked
      superseded in-file, kept as a snapshot.
- [x] **No auto stage-transitions**: `onUploadCompleted` in `/api/upload` now bumps the
      stage to "Shooting" if the project is still earlier than that when the first asset
      lands (`stageIndex()` helper added to `lib/store.ts`).
- [x] **No publish/export tracking**: `Project` gained `publishUrl`/`publishedAt`. New
      `PublishForm` component on the project page — pasting a YouTube link auto-sets the
      stage to "Uploaded" and records the timestamp. `PATCH /api/projects/[slug]` handles it.
- [x] **Location library disconnected from uploads**: added `data/locations.json` in Blob
      (`getLocations`/`saveLocations`/`markSiteShot` in `lib/store.ts`), lazy-seeded from the
      original 40-site list on first read. `/locations` now reads live. Upload handler
      case-insensitively matches the typed site name and marks it shot automatically.
      `location-library.md` marked superseded in-file, kept as the original seed.
- [x] Also updated `/` (Overview) to pull its stats from the same live Blob data instead of
      parsing markdown, for consistency. Removed `lib/table.ts` (no longer used by anything
      once calendar/locations stopped parsing markdown tables) and trimmed
      `copy-content.js` to only the files still read live (brand guide, SOP, todo).
- [x] Verified via curl against the live site: seeded the waterfall project (confirms
      `/calendar` will show it), `GET /api/locations` reachable. **Not yet verified**: the
      upload-triggered behaviors (auto stage-transition, auto site-checkoff) — these need a
      real file upload through the browser UI to confirm, since Vercel Blob's client-upload
      callback can't be easily faked via curl. Eli should spot-check these on the next real
      upload.

## Later (once channel has traction — not now)

- [ ] Community/comment management branch (recurring engagement pass beyond the pinned comment).
- [ ] Competitor/trend tracking branch — recurring version of `jn-video-idea-finder`, run weekly instead
      of per-video, to catch new sleep-content trends early.
- [ ] Sponsorship pipeline — only relevant once inbound interest starts; rate card + outreach tracker.

## Open questions for Eli

- Audio-only cross-posting (Spotify, Insight Timer): resolved as a monetization question, not just
  distribution — it's `jn-monetization` Layer 4 (licensing). Revisit once there's a script/soundscape
  library deep enough to license, tracked via `06-performance-review/revenue-log.md`.
