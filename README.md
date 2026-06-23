# Maternal Care & Pregnancy Tracker App

A **Progressive Web App (PWA)** for expectant mothers — a private, offline-capable pregnancy companion with medically grounded weekly guidance, daily wellness tracking, and emotional support. Built as a portfolio HealthTech project with a warm, empathetic B2C tone.

> **Live demo:** [https://r1m1r.github.io/Caring-Diary/](https://r1m1r.github.io/Caring-Diary/)  
> **Note:** Bilingual UI — **Russian** and **English** (switch in Settings or on the setup screen). Source code identifiers and documentation are in English.

---

## Overview

This is a **100% client-side** pregnancy companion — no backend, no accounts, no user data leaving the device. Everything persists in the browser's **LocalStorage**, making it private, offline-capable, and installable as a home-screen PWA on iOS and Android.

The app supports **optional personalization**: the user can enter their name and a close contact (partner, parent, friend) for greetings and support messages. Medical content is informational and aligned with WHO / ACOG guidance.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Medication & vitamin reminders** | Customizable schedule, daily intake check-off, course expiry, pause/resume, and browser notifications |
| **Weekly pregnancy facts** | 40 weeks of developmental milestones, fruit-size comparisons, and body-change cards |
| **Emotional support** | Mood tracker, supportive letter cards, daily messages, and self-care coupons |
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
├── index.html          # Main application (HTML + CSS + app logic)
├── js/
│   ├── app-core.js         # Storage layer and tracker state stores
│   ├── app-content.js      # Bilingual dynamic copy (RU / EN)
│   ├── ui-i18n.js          # Static UI strings (381 keys × 2 locales)
│   ├── i18n.js             # Locale engine
│   ├── week-data-en.js     # English weekly medical facts (weeks 1–40)
│   └── clinical-content.js # English FAQ, smart tips, gender facts
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (offline shell cache)
├── .nojekyll           # Ensures js/ is served on GitHub Pages
├── .github/workflows/deploy-pages.yml
├── apple-icon.png      # PWA home-screen icon (optional)
├── .gitignore
└── README.md
```

### Architecture Highlights

- **`AppStorage`** — Safe LocalStorage wrapper with JSON parsing, quota handling, and scoped data reset.
- **`UserProfile`** — Optional display name and support contact for personalized greetings.
- **`WaterTracker`** — Daily hydration (8 glasses, auto-reset at midnight).
- **`MedicationTracker`** — Medication registry + daily intake completion.
- **`MoodTracker`** — Daily mood emoji + 14-day rolling history.
- **`KickCounter`** — Fetal movement counter (resets daily).
- **`WeightTracker`** — Persistent weight log for BMI charts.
- **`HospitalBagStore`** / **`GalleryStore`** — Checklist and ultrasound photos.
- **`app-content.js`** — Separated Russian copy for easy localization and portfolio review.

---

## Run Locally

No build step, Node.js, or package manager required.

### Option 1 — Open directly

1. Clone or download this repository.
2. Open `index.html` in a modern browser (Chrome, Safari, Edge, Firefox).

> Some browsers restrict LocalStorage for `file://` URLs. If data does not persist, use Option 2.

### Option 2 — Local HTTP server (recommended)

**Python 3:**

```bash
cd path/to/project
python -m http.server 8080
```

**Node.js (npx):**

```bash
npx serve .
```

Then visit **http://localhost:8080** (or the port shown).

### Option 3 — VS Code / Cursor Live Server

Install the **Live Server** extension, right-click `index.html` → **Open with Live Server**.

---

## Deploy to GitHub Pages

This repo includes [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) for automatic deployment on every push to `main`.

**One-time setup in GitHub:**

1. Open the repository → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push to `main` — the workflow uploads the project root (including `js/` modules and `.nojekyll`)

After deploy, verify in DevTools that `js/i18n.js` loads with **200** (not 404). Hard-refresh or clear the service worker cache if you still see an old build.

---

## First Launch

1. Optionally enter your **name** and **expected due date (EDD)** on the setup screen.
2. In **Settings**, set baby gender for themed colors (girl / boy / neutral) and add an emergency contact.
3. Explore tabs: **Home**, **Care Plan**, **Journal**, **Hospital Bag**, **Settings**.

All data stays on the device. Use **Settings → Clear all data** to reset (app-scoped keys only).

---

## Browser Support

| Feature | Chrome | Safari (iOS) | Firefox | Edge |
|---------|--------|--------------|---------|------|
| Core app | ✅ | ✅ | ✅ | ✅ |
| PWA install | ✅ | ✅ (Add to Home Screen) | ✅ | ✅ |
| Push notifications | ✅ | ⚠️ Limited on iOS | ✅ | ✅ |
| Haptic feedback | ✅ (Android) | ✅ (iOS) | ⚠️ | ✅ |

---

## Privacy & Data

- **No server** — zero network requests for user data after fonts load.
- **No analytics** — no third-party tracking SDKs.
- **Local only** — photos and diary entries are stored as base64 / text in LocalStorage.
- **Scoped reset** — "Clear all data" removes only this app's keys (`*_v16` suffix and known prefixes).

---

## License

Portfolio / learning project — feel free to fork and adapt for non-commercial purposes. Medical content is informational only and **does not replace professional prenatal care**.

---

## Author

Built by **Emir** — full-stack developer. HealthTech PWA case study for Upwork portfolio.

## License & Copyright

© 2026 Emir Useinov. All Rights Reserved.

This project is published strictly for portfolio demonstration and evaluation purposes. Unauthorized copying, modification, distribution, or commercial use of any part of this codebase is strictly prohibited without explicit written permission from the author.