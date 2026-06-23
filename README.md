# Caring Diary — Pregnancy Companion PWA

A **Progressive Web App (PWA)** for expectant mothers — private, offline-capable pregnancy tracking with medically grounded weekly guidance, a today dashboard, journal tools, and emotional support. Built as a portfolio **HealthTech** case study for Upwork.

> **Live demo:** [https://r1m1r.github.io/Caring-Diary/](https://r1m1r.github.io/Caring-Diary/)  
> **Reference build (personalized):** [care-diary-nine.vercel.app](https://care-diary-nine.vercel.app/) — same v18 feature set, localized for one user.  
> **Default language:** English (portfolio).  
> **After deploy:** Hard-refresh (Ctrl+Shift+R) or clear site data if the demo looks outdated — the service worker caches static assets.

---

## Overview

This is a **100% client-side** pregnancy companion — no backend, no accounts, no user data leaving the device. Everything persists in the browser **LocalStorage**, making it private, offline-capable, and installable as a home-screen PWA on iOS and Android.

The portfolio version uses neutral, English-first copy suitable for any expectant parent. Medical content is informational and aligned with WHO / ACOG guidance.

---

## Key Features (v18)

| Feature | Description |
|---------|-------------|
| **Today dashboard** | Meds, water, mood, and bump-photo chips; next action & visit cards |
| **Medication plan** | Schedule, 7-day adherence chart, finish-day ritual, notifications |
| **Weekly pregnancy facts** | 40 weeks of milestones, fruit-size comparisons, body-change cards |
| **Kick counter** | Cardiff method — 2-hour session timer |
| **Journal** | Daily entries, symptoms, BP log, contraction timer, visit prep |
| **Emotional support** | Mood tracker, support letters, coupons, guided breathing |
| **Hydration tracker** | 8-glass daily goal |
| **Weight & BMI** | WHO corridor visualization |
| **Bump gallery** | Weeks 19–40 with compare slider |
| **Hospital bag** | Editable checklist with progress |
| **Backup / restore** | Export and import JSON backup |
| **Provider report** | One-tap summary for prenatal visits |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Single-file HTML5 monolith (~8k lines) + CSS3 (glassmorphism, custom properties) |
| **JavaScript** | ES6+ inline bundle (v18) |
| **Persistence** | LocalStorage (versioned keys `_v16`, safe migrations) |
| **PWA** | Web App Manifest, Service Worker, standalone install |
| **Typography** | Google Fonts — Nunito, Playfair Display, Lora, Caveat |
| **Build** | `npm run build:portfolio` transforms Vercel source → English portfolio |

Supporting modules in `js/` supply English content for the portfolio build script; the deployed app is the monolith `index.html`.

---

## Project Structure

```
├── index.html              # v18 monolith (portfolio — English)
├── _vercel_source.html     # Original Vercel export (reference, not deployed)
├── scripts/
│   ├── build-portfolio-monolith.js
│   └── verify-smoke.js
├── js/                     # EN content sources for build script
├── manifest.webmanifest
├── sw.js
└── README.md
```

---

## Run Locally

```bash
npm start
# open http://localhost:4173
```

Regenerate portfolio `index.html` from Vercel source:

```bash
npm run build:portfolio
npm run verify
```

---

## Deploy (GitHub Pages)

Push to `main` — GitHub Actions deploys via `.github/workflows/deploy-pages.yml`.

Repository: [github.com/R1M1R/Caring-Diary](https://github.com/R1M1R/Caring-Diary)

---

## Privacy & Data

- **No server** — user data never leaves the device.
- **No analytics** — no third-party tracking.
- **Local only** — photos and diary entries stay on the phone.
- **Backup** — optional JSON export for migration.

---

## License

Portfolio / learning project. Medical content is informational only and **does not replace professional prenatal care**.

© 2026 Emir Useinov. All Rights Reserved.
