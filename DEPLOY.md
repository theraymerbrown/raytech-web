# Ship raytech-web (GitHub + Vercel) — 5 minutes

Local preview is already working: **http://localhost:3000**

Repo path: `Grok Projects\raytech-web`  
Git: initialized on `main` with initial commits. **Own repository** (not shared with other projects).

## 1) Create GitHub repo + push

1. Open https://github.com/new  
2. Name: **`raytech-web`**  
3. Private (recommended)  
4. **Do not** add README/license (repo already has files)  
5. Create repository, then in PowerShell:

```powershell
cd "C:\Users\AdamRaymer-brown\Grok Projects\raytech-web"
git remote add origin https://github.com/YOUR_GITHUB_USER/raytech-web.git
git push -u origin main
```

Replace `YOUR_GITHUB_USER` with your GitHub username or org.

## 2) Connect Vercel

1. Open https://vercel.com/new  
2. Import **`raytech-web`** from GitHub  
3. Framework: Next.js (auto)  
4. Deploy  

After that, every `git push` to `main` goes live. PRs get preview URLs.

## 3) Domain later

Vercel → Project → Settings → Domains → add `raytech.co` (and redirect `raytechservices.net` when ready).

## Local commands

```powershell
cd "C:\Users\AdamRaymer-brown\Grok Projects\raytech-web"
npm run dev    # http://localhost:3000
npm run build  # production check
```
