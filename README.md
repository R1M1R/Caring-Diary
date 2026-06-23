# Caring Diary — Pregnancy Companion PWA

A **Progressive Web App (PWA)** for expectant mothers — a private, offline-capable pregnancy companion with medically grounded weekly guidance, daily wellness tracking, and emotional support. Built as a portfolio **HealthTech** case study for Upwork.

> **Live demo:** [https://r1m1r.github.io/Caring-Diary/](https://r1m1r.github.io/Caring-Diary/)  
> **Default language:** English (Russian available in Settings → Language).  
> **After deploy:** Hard-refresh (Ctrl+Shift+R) or clear site data if the demo looks outdated — the service worker caches static assets (`maternal-care-v7`).

---

## Overview

This is a **100% client-side** pregnancy companion — no backend, no accounts, no user data leaving the device. Everything persists in the browser's **LocalStorage**, making it private, offline-capable, and installable as a home-screen PWA on iOS and Android.

The app supports **optional personalization**: enter your name and a close contact (partner, parent, friend) for greetings and support messages. Medical content is informational and aligned with WHO / ACOG guidance.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Medication & vitamin reminders** | Customizable schedule, daily intake check-off, course expiry, pause/resume, browser notifications |
| **Weekly pregnancy facts** | 40 weeks of developmental milestones, fruit-size comparisons, body-change cards |
| **Emotional support** | Mood tracker, supportive letter cards, daily messages, self-care coupons |
| **Hydration tracker** | Visual 8-glass daily water goal with progress feedback |
| **Guided breathing** | Box-breathing exercise with animated ripples for relaxation |
| **Weight & BMI corridor** | WHO-recommended weight gain tracking with chart visualization |
| **Ultrasound gallery** | Week-by-week photo album (weeks 19–40) with image compression |
| **Hospital bag checklist** | Universal categorized packing list with progress tracking |
| **Doctor report** | One-tap summary export for prenatal visits |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3 (Custom Properties, Glassmorphism, Flexbox/Grid) |
| **JavaScript** | ES6+ (centralized state stores, content separation) |
| **Persistence** | Browser LocalStorage (versioned keys, safe parse/set wrappers) |
| **PWA** | Web App Manifest, Service Worker, installable standalone |
| **Typography** | Google Fonts — Nunito, Playfair Display, Lora, Caveat |
| **Accessibility** | ARIA labels, `prefers-reduced-motion`, semantic roles |
| **UX** | Haptic feedback, swipe tab navigation, confetti celebrations |

---

## Project Structure

```
├── index.html          # Main application shell + app logic
├── js/
│   ├── app-core.js         # Storage layer and tracker state stores
│   ├── app-content.js      # Bilingual dynamic copy (RU / EN)
│   ├── ui-i18n.js          # Static UI strings (381 keys × 2 locales)
│   ├── i18n.js             # Locale engine (English default)
│   ├── week-data-en.js     # English weekly medical facts (weeks 1–40)
│   └── clinical-content.js # English FAQ, smart tips, gender facts, body & fetus EN
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (offline shell cache)
├── .nojekyll           # Ensures js/ is served on GitHub Pages
├── .github/workflows/deploy-pages.yml
└── README.md
```

---

## Run Locally

No build step required.

```bash
npm start
# open http://localhost:4173
```

Or open `index.html` via any static file server.

```bash
npm run verify   # smoke tests (modules, i18n parity, SW assets)
```

---

## Deploy (GitHub Pages)

Push to `main` — GitHub Actions deploys automatically via `.github/workflows/deploy-pages.yml`.

Repository: [github.com/R1M1R/Caring-Diary](https://github.com/R1M1R/Caring-Diary)

---

## Privacy & Data

- **No server** — zero network requests for user data after fonts load.
- **No analytics** — no third-party tracking SDKs.
- **Local only** — photos and diary entries stay on the device.
- **Scoped reset** — "Clear all data" removes only this app's keys.

---

## License

Portfolio / learning project — feel free to fork and adapt for non-commercial purposes. Medical content is informational only and **does not replace professional prenatal care**.

© 2026 Emir Useinov. All Rights Reserved.
