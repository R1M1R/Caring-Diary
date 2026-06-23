# Maternal Care & Pregnancy Tracker App

A lovingly crafted **Progressive Web App (PWA)** for expectant mothers — built originally for my wife during her pregnancy. It combines medically grounded weekly guidance with daily wellness tracking, emotional support, and a calming iOS-inspired glassmorphism interface.

> **Note:** All user-facing copy is in Russian (the app's original language). Source code identifiers, comments, and documentation are in English for portfolio and open-source clarity.

---

## Overview

This is a **100% client-side** HealthTech companion — no backend, no accounts, no data leaving the device. Everything persists in the browser's **LocalStorage**, making it private, offline-capable, and installable as a home-screen PWA on iOS and Android.

The app is designed with an **empathetic B2C focus**: warm tone of voice, reassuring medical facts (aligned with WHO / ACOG guidance), haptic feedback on interactions, and modules for both physical and emotional well-being.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Medication & vitamin reminders** | Customizable schedule, daily intake check-off, course expiry, pause/resume, and browser notifications |
| **Weekly pregnancy facts** | 40 weeks of developmental milestones, fruit-size comparisons, and body-change cards |
| **Emotional support** | Mood tracker, supportive letter cards, partner messages, and care coupons |
| **Hydration tracker** | Visual 8-glass daily water goal with progress feedback |
| **Guided breathing** | Box-breathing exercise with animated ripples for relaxation |
| **Weight & BMI corridor** | WHO-recommended weight gain tracking with chart visualization |
| **Ultrasound gallery** | Week-by-week photo album (weeks 19–40) with image compression |
| **Hospital bag checklist** | Categorized packing list with progress tracking |
| **Doctor report** | One-tap summary export for prenatal visits |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3 (Custom Properties, Glassmorphism, Flexbox/Grid) |
| **JavaScript** | ES6+ (modules pattern, centralized state stores) |
| **Persistence** | Browser LocalStorage (versioned keys, safe parse/set wrappers) |
| **PWA** | Web App Manifest meta tags, `apple-touch-icon`, installable standalone |
| **Typography** | Google Fonts — Nunito, Playfair Display, Lora, Caveat |
| **Accessibility** | ARIA labels, `prefers-reduced-motion`, semantic roles |
| **UX** | Haptic feedback (`navigator.vibrate`), swipe tab navigation, confetti celebrations |

---

## Project Structure

```
├── index.html          # Main application (HTML + CSS + app logic)
├── js/
│   └── app-core.js     # Storage layer and all tracker state stores
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (offline shell cache)
├── apple-icon.png      # PWA home-screen icon (optional)
├── .gitignore
└── README.md
```

### Architecture Highlights

- **`AppStorage`** — Safe LocalStorage wrapper with JSON parsing, quota handling, and scoped data reset.
- **`WaterTracker`** — Daily hydration (8 glasses, auto-reset at midnight).
- **`MedicationTracker`** — Medication registry + daily intake completion.
- **`MoodTracker`** — Daily mood emoji + 14-day rolling history.
- **`KickCounter`** — Fetal movement counter (resets daily).
- **`WeightTracker`** — Persistent weight log for BMI charts.
- **`HospitalBagStore`** / **`GalleryStore`** — Checklist and ultrasound photos.

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

## First Launch

1. Enter the **expected due date (EDD)** on the setup screen.
2. Optionally set baby gender in **Settings** for themed colors (girl / boy / neutral).
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

Personal project — feel free to fork and adapt for non-commercial learning and portfolio purposes. Medical content is informational only and **does not replace professional prenatal care**.

---

## Author

Built with love by **Emir** — a husband and developer who wanted his partner to feel supported every day of her pregnancy journey.
