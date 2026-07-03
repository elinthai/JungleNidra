# Jungle Nidra Dashboard

View-only dashboard for the production system — reads `content-calendar.md`,
`todo.md`, `SOP.md`, `PRODUCTION-SOP.md`, `brand-assets/brand-guide.md`, and
`04-recording-assets/location-library.md` from the repo root at build time and
renders them. It doesn't edit anything — the files stay the source of truth,
edited via Claude Code or GitHub as usual.

**Currently public — no password gate.** The password-gate code (`app/login/`,
`app/api/login/`) is still in the repo but unenforced since `middleware.ts` was
removed (2026-07-03, the env var wasn't taking effect on Vercel and Eli chose to drop
it for now rather than keep debugging). The dashboard shows real business details
(revenue plans, unreleased titles/scripts) — revisit adding real auth before treating
this as more than a personal/low-traffic tool. To re-enable the old single-password
gate, restore `middleware.ts` (see git history) and set `DASHBOARD_PASSWORD` in Vercel.

## Local development

```
npm install
npm run dev
```

## Deploying to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the
   `elinthai/JungleNidra` GitHub repo.
2. When configuring the project, set **Root Directory** to `dashboard`.
3. Add an environment variable: `DASHBOARD_PASSWORD` = (your chosen password).
4. Deploy. Every push to `main` redeploys automatically.

Since the dashboard just reads markdown files from the repo, any update to
`content-calendar.md`, `todo.md`, etc. that gets pushed to `main` will show up on
the next deploy — no dashboard code changes needed for routine updates.
