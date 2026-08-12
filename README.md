# raytech-web

Public sales site for **RayTech Services, LLC** (Adam Raymer-Brown).

**Own repository.** Source of truth on GitHub → deploy on **Vercel**.

## Locked product decisions

| Item | Value |
|------|--------|
| Flow | Team photo first → story → offers → how we work → **Let’s talk** |
| CTA | **Let’s talk** → `mailto:adam@raytech.co` (swap for form/calendar later) |
| Feel | Paper-and-ink editorial; real humans; no SaaS purple |
| Not this repo | Close crew app (separate later) |

## Local development

```bash
cd "C:\Users\AdamRaymer-brown\Grok Projects\raytech-web"
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build (also what Vercel runs)
```

## Create the GitHub repo (one-time)

GitHub CLI was not installed on this machine. Either:

### Option A — GitHub website

1. Create a **new empty** repository named `raytech-web` (no README if you already have one locally).
2. Then:

```bash
cd "C:\Users\AdamRaymer-brown\Grok Projects\raytech-web"
git remote add origin https://github.com/YOUR_USER/raytech-web.git
git push -u origin main
```

### Option B — Install GitHub CLI

```bash
winget install GitHub.cli
gh auth login
cd "C:\Users\AdamRaymer-brown\Grok Projects\raytech-web"
gh repo create raytech-web --private --source=. --remote=origin --push
```

Use `--public` if you prefer a public repo.

## Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**.
2. Import **`raytech-web`** from GitHub.
3. Framework: **Next.js** (auto-detected). Root directory: `.`
4. Deploy. Every push to `main` updates production; PRs get preview URLs.

### CLI (after `npm i -g vercel` and login)

```bash
cd "C:\Users\AdamRaymer-brown\Grok Projects\raytech-web"
npx vercel login
npx vercel        # preview
npx vercel --prod # production
```

Prefer linking the GitHub repo in the Vercel dashboard so deploys stay automatic.

## Domain (later)

- **ASSUMPTION:** production hostname `raytech.co`
- Redirect `raytechservices.net` → primary domain when DNS is ready
- In Vercel: Project → Settings → Domains

## Assets

Copied from `raytech-website-assets/approved/`:

- `public/images/team.jpg` — hero
- `public/images/adam-rooftop.jpg` — story
- `public/images/adam-casual.jpg` — alternate (ready if needed)
- `public/images/logo.png`

## Contact (facts)

- Phone: (502) 229-7527  
- Email: adam@raytech.co  
- Address: 401 4th Street, Shelbyville, KY 40065  
