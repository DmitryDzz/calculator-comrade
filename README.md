# Calculator Comrade

Calculator Comrade is a web app and project site for an old-school 8-digit pocket calculator emulator.

The calculator engine remains in a separate repository:

```text
calculator-comrade-lib
```

This repository is the product/application layer:

```text
calculator-comrade
```

It contains the web application, GitHub Pages site, PWA files, legal/support pages, and later the Android, Windows, and Linux wrappers.

## Current stage

The project has been reorganized from `calculator-comrade-web` into the future multiplatform `calculator-comrade` repository structure.

Implemented now:

- Vite + React + TypeScript.
- Calculator web application.
- WASM integration with `calculator-comrade-lib` build artifacts.
- PWA manifest.
- Service worker with offline support.
- Project site pages:
  - Home.
  - Calculator.
  - Privacy Policy.
  - Tips & Tricks.
- GitHub Pages-ready base path support.

Planned next stages:

1. Publish the site to GitHub Pages.
2. Add settings dialog and polish the web app UI.
3. Add Android build wrapper.
4. Add Windows and Linux desktop wrappers.

## Project structure

```text
public/
├── assets/
│   └── calculator/
├── icons/
├── screenshots/
├── sounds/
├── wasm/
├── manifest.webmanifest
└── sw.js

src/
├── app/
│   └── CalculatorApp.tsx
├── calculator/
├── calculatorCore/
├── calculatorFeedback/
├── shared/
│   ├── assetUrl.ts
│   └── routes.ts
├── site/
│   ├── SiteApp.tsx
│   └── pages/
├── styles/
│   ├── calculator.css
│   ├── index.css
│   └── site.css
├── main.tsx
└── registerServiceWorker.ts
```

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The service worker is registered only in production mode.

## Production build

Build for local/static hosting at `/`:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Build for GitHub Pages under `/calculator-comrade/`:

```bash
npm run build:pages
```

## Pages

The site currently exposes these routes:

```text
/
/calculator/
/privacy-policy/
/tips-n-tricks/
```

When deployed to GitHub Pages from a project repository named `calculator-comrade`, the production URLs will be:

```text
https://dmitrydzz.github.io/calculator-comrade/
https://dmitrydzz.github.io/calculator-comrade/calculator/
https://dmitrydzz.github.io/calculator-comrade/privacy-policy/
https://dmitrydzz.github.io/calculator-comrade/tips-n-tricks/
```

## WASM artifacts

The current project keeps the generated WASM files in:

```text
public/wasm/calculator.js
public/wasm/calculator.wasm
```

Later this can be automated with a script that copies fresh artifacts from `calculator-comrade-lib`.
