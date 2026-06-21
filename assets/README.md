# Android assets source

This directory contains source images used to generate Android launcher icons and splash screen resources for the Capacitor Android project.

These files are **source artwork**, not runtime web assets. They are used only when Android icons or splash resources need to be regenerated.

## Source files

The expected source files are:

```text
assets/
  icon-only.png
  icon-foreground.png
  icon-background.png
  splash.png
  splash-dark.png
```

These files are used by `@capacitor/assets`.

## Regenerating Android assets

The project does not keep `@capacitor/assets` installed permanently, because it is only a generation tool and pulls in a relatively large dependency tree.

To regenerate Android assets, temporarily install it:

```bash
npm install -D @capacitor/assets
```

Then run:

```bash
npx capacitor-assets generate --android
```

After checking the generated files, the dependency can be removed again:

```bash
npm uninstall -D @capacitor/assets
```

The generated Android resources are written under:

```text
android/app/src/main/res/
```

These generated resources are committed to the repository.

## Notes

Do not edit generated Android icon resources manually unless there is a specific Android-only adjustment. Prefer changing the source images in this directory and regenerating the Android assets.

The custom Android splash theme and `splash_icon` resource may still contain manual Android-specific adjustments outside this directory.
