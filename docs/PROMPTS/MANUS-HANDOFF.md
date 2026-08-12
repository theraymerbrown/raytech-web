# Manus handoff — RayTech public sales site

**Use this file in Manus Desktop** (open/attach/paste).  
It is the design + product brief. Prefer reviewing the live site and photos; do not invent a new company.

---

## Role

You are a senior brand/web designer reviewing and improving a **local IT shop sales site** for RayTech Services LLC.  
Plan and design against this brief. Do **not** turn it into a SaaS product tour or generic MSP brochure.

---

## Company facts (only these — do not invent)

| | |
|--|--|
| Company | RayTech Services, LLC |
| Owner | Adam Raymer-Brown |
| Address | 401 4th Street, Shelbyville, KY 40065 |
| Phone | (502) 229-7527 |
| Email | adam@raytech.co |
| Corridor | Shelby County, Louisville–Lexington, plus remote |
| Since | About 2009 |
| Old site | Dead WordPress on raytechservices.net |

---

## What this project is

**Two tracks — only the public one is in scope for Manus design review:**

1. **Public website (this repo `raytech-web`)** — sales + story + trust + **Let’s talk**  
2. **Close** — internal crew app later; **not** the marketing homepage  

**LAMBS** (Logs, Access, Management, Backups, Service) is how the *shop* holds work — a process wrapper. It may stay quiet or off the public hero. Do not force a five-letter product billboard unless Adam asks.

---

## Locked UX decisions

| Decision | Lock |
|----------|------|
| Page flow | **Team photo first** → story → offers → how we work → CTA |
| Primary CTA | **Let’s talk** |
| Tone | Real humans serving real people; calm; plain English |
| Feel | Paper-and-ink editorial (warm paper, ink, one clay accent); display serif + workhorse sans |
| Deploy | Own **GitHub** repo → **Vercel** |
| Photos | Real team + Adam only (paths below) |

### Section order

1. Hero — full team outdoor photo; “Real humans. Real follow-through.”  
2. Story — Adam + shop  
3. Offers — infrastructure / care / projects (**no fake prices**)  
4. How we work — simple shop rules  
5. Light facts  
6. Let’s talk + phone/email  
7. Footer  

---

## Voice

Calm authority. Short sentences. Clarity over cleverness.  
Tech always connects to people, peace, and practical progress.  
No hype, no “24/7 NOC,” no unlimited-support theater.

Character Diamond (filter, not a second product): **Architect of Calm Tech Clarity** — Use the Machine to Restore the Human.

---

## Visual system

- Warm paper field, ink text, **one clay accent**  
- Big type, one idea per section  
- Mobile-first; touch targets ≥44px  
- Photography: real team, real Adam — not stock handshake  
- **Avoid:** purple gradients, glassmorphism, fake testimonial carousel, dashboard hero  

---

## Assets (open these)

**In the site repo (what’s already built-in):**

```
C:\Users\AdamRaymer-brown\Grok Projects\raytech-web\public\images\
  team.jpg
  adam-rooftop.jpg
  adam-casual.jpg
  logo.png
```

**Full review gallery (optional):**

```
C:\Users\AdamRaymer-brown\Grok Projects\raytech-website-assets\review.html
C:\Users\AdamRaymer-brown\Grok Projects\raytech-website-assets\approved\
```

**Live local site (if running):** http://localhost:3000  

**Code:** `C:\Users\AdamRaymer-brown\Grok Projects\raytech-web\src\app\`

---

## What to do in Manus

1. Open this brief + the images above.  
2. Review the existing Next.js page (or redesign concepts) against the locked flow.  
3. Propose **visual/layout refinements** — not a new business model.  
4. Keep **Let’s talk** as primary CTA.  
5. Mark any copy you want to change; do not invent SLAs, prices, or client logos.  
6. If exporting a design, it should still map to a simple marketing site shippable via GitHub → Vercel.

---

## Explicit do-nots

- Do not invent package prices or product names  
- Do not build Close / login / multi-tenant SaaS UI into the public site  
- Do not replace real photos with stock people  
- Do not hide the team behind a service grid  
- Do not use “Meet the team” filler with fake bios  

---

## Success

A church secretary and a lawyer both understand: who RayTech is, that real people do the work, and how to **Let’s talk** — without feeling they signed up for software.
