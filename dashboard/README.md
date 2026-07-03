# Jungle Nidra Dashboard

The production workbench. Two kinds of content:

- **Read-only pages** (Overview, Calendar, Locations, Brand, SOP, Todo) — read
  `content-calendar.md`, `todo.md`, `SOP.md`, `PRODUCTION-SOP.md`,
  `brand-assets/brand-guide.md`, and `04-recording-assets/location-library.md`
  from the repo root at build time. Edited via Claude Code or GitHub, not from
  the site.
- **Projects** (`/projects`) — a real, interactive workbench. Create a project
  per video (slug matches what `jn-production-line` uses for the script/package
  files), move it through stages, and upload raw footage/stills for it. Backed
  by a `projects.json` file in Vercel Blob storage (acting as a lightweight
  database) plus the uploaded files themselves, also in Blob.

Real login required (NextAuth, single user, password stored as a bcrypt hash) —
this site stores and displays real unreleased content, so it can't be public.

## Local development

```
npm install
node scripts/generate-secrets.js "your-chosen-password"   # prints AUTH_SECRET + AUTH_PASSWORD_HASH_B64
```

Paste that output into `.env.local`:

```
AUTH_SECRET=...
AUTH_PASSWORD_HASH_B64=...
BLOB_READ_WRITE_TOKEN=...   # see below for how to get this
```

```
npm run dev
```

Note: `/projects` needs `BLOB_READ_WRITE_TOKEN` to work (list/create/upload).
Everything else works without it.

## Deploying to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the
   `elinthai/JungleNidra` GitHub repo (skip this if the project already exists).
2. **Root Directory**: `dashboard`. **Framework Preset**: must say **Next.js**
   explicitly — it doesn't always auto-detect, and if it's stuck on "Other" the
   build fails with a "No Output Directory named public" error.
3. **Environment Variables** (Settings → Environments):
   - `AUTH_SECRET` and `AUTH_PASSWORD_HASH_B64` — from
     `node scripts/generate-secrets.js "your-password"`, run locally.
   - `BLOB_READ_WRITE_TOKEN` — go to the project's **Storage** tab → **Create
     Database** → **Blob** → create a store and connect it to this project.
     Vercel adds this env var automatically once connected.
4. Deploy (or Redeploy if the project already exists — make sure you're
   redeploying the latest commit from `main`, not an old one from the
   Deployments list).

## Why base64 for the password hash

Bcrypt hashes are full of `$` characters (e.g. `$2b$10$...`). Both Vercel's env
var UI and Next.js's local `.env` loader (`dotenv-expand`) can interpret `$` as
a shell-style variable reference and silently strip/mangle the value. Storing
the hash as base64 (`AUTH_PASSWORD_HASH_B64`, decoded in `lib/auth.ts`) avoids
this entirely — this bit us once already, so it's not a hypothetical.

## Notes

- Every push to `main` auto-redeploys. Content-file edits (calendar, todo,
  etc.) show up automatically; `/projects` data lives in Blob storage and isn't
  affected by git pushes at all.
- Actual video editing stays in CapCut — this site manages the workflow and
  assets around it, not the edit itself.
