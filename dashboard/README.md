# Jungle Nidra Dashboard

View-only dashboard for the production system — reads `content-calendar.md`,
`todo.md`, `SOP.md`, `PRODUCTION-SOP.md`, `brand-assets/brand-guide.md`, and
`04-recording-assets/location-library.md` from the repo root at build time and
renders them. It doesn't edit anything — the files stay the source of truth,
edited via Claude Code or GitHub as usual.

Password-protected (single shared password via the `DASHBOARD_PASSWORD` env var,
checked in `middleware.ts`) since this shows real business details.

## Local development

```
npm install
cp .env.local.example .env.local   # then edit the password
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
