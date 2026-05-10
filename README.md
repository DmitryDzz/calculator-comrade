# Calculator Comrade Web

A web version of Calculator Comrade.

This application is a basic calculator that emulates the processor logic of classic handheld calculators to faithfully reproduce their behavior.

## Current stage

The project is currently at the `architecture/bootstrap` stage.

Implemented:

- Vite + React + TypeScript application bootstrap.
- Responsive calculator visual layout.
- Visual layout ported from the old Android application.
- Calculator body, keyboard, display, and app buttons.
- CSS-based positioning in the original calculator coordinate system.
- PWA manifest.
- PWA icons and screenshots.
- Basic service worker with offline support.

Not implemented yet:

- Calculator logic.
- WebAssembly integration with `calculator-comrade-lib`.
- Real display state.
- Real keyboard input handling.
- Platform-specific app button behavior.

## Architecture notes

The visual layout is based on the original Android application assets and coordinates.

The original calculator body image has the size:

```text
1760 x 3120
```

The web application uses an internal stage with the same coordinate system. The stage is scaled to fit the visible application shell.

This allows CSS positions to use the original Android coordinates almost directly.

Example:

```css
.calculator-button--7 {
    left: calc(880px - 569.7573px);
    top: calc(1560px + 462.52374px);
}
```

Where:

```text
880  = 1760 / 2
1560 = 3120 / 2
```

## Project structure

```text
public/
├── assets/
│   └── calculator/
├── icons/
├── screenshots/
├── manifest.webmanifest
└── sw.js

src/
├── app/
│   └── App.tsx
├── calculator/
│   ├── CalculatorAppButton.tsx
│   ├── CalculatorAppButtons.tsx
│   ├── CalculatorButton.tsx
│   ├── CalculatorDisplay.tsx
│   ├── CalculatorKeyboard.tsx
│   ├── CalculatorView.tsx
│   └── calculatorGeometry.ts
├── styles/
│   ├── calculator.css
│   └── index.css
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

The service worker is not registered in development mode. This avoids stale cached files while working on the app.

## Production build

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The service worker is registered only in production mode.

## Offline testing

To test offline support:

1. Build and preview the app:

```bash
npm run build
npm run preview
```

2. Open the preview URL in Chrome or Chromium.

3. Open DevTools:

```text
Application → Service workers
```

4. Confirm that `/sw.js` is registered and active.

5. Open:

```text
Application → Cache storage
```

6. Confirm that `calculator-comrade-web-v1` contains the application shell and Vite build assets.

7. Switch to offline mode:

```text
Network → Offline
```

8. Reload the page.

The app should still open from the service worker cache.

If testing gets confusing, clear the local PWA state:

```text
Application → Service workers → Unregister
Application → Storage → Clear site data
```

Then reload the page online.

## PWA notes

The manifest is located at:

```text
public/manifest.webmanifest
```

The service worker is located at:

```text
public/sw.js
```

The current service worker is intentionally simple and manual. It caches static files and discovers Vite build assets from `index.html`.

Later, we may replace it with a generated precache setup, for example via `vite-plugin-pwa`.

## Next planned steps

Possible next steps:

- Add a typed display state model.
- Add visual-only keyboard press events.
- Prepare the boundary for WebAssembly integration.
- Connect `calculator-comrade-lib`.
- Implement platform-specific app buttons.
- Add Capacitor support for Android.
