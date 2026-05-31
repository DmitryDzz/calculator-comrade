# Calculator Comrade

Calculator Comrade is a web app and project site for an old-school 8-digit pocket calculator emulator.

The calculator engine is developed as a separate open-source library [calculator-comrade-lib](https://github.com/DmitryDzz/calculator-comrade-lib).

This repository contains the product/application layer. It contains the web application, GitHub Pages site, PWA files, legal/support pages, and later the Android, Windows, and Linux wrappers.

## License
This project is licensed under the MIT License.

Copyright (c) 2019-2026 Dmitry Dzakhov (dmitrydzz).

See [LICENSE](LICENSE) for details.

Third-party open-source components and assets are listed in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Authors

See [AUTHORS.md](AUTHORS.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Linux desktop build

The desktop shell is built with Tauri. The frontend is still built by Vite,
but desktop builds use `desktop` mode and native Rust commands for platform
integration such as sound playback.

### Dependencies

On Ubuntu 24.04, install the Tauri build dependencies and ALSA development
files required by the native desktop sound backend:

```bash
sudo apt update
sudo apt install \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  patchelf \
  pkg-config \
  libwebkit2gtk-4.1-dev \
  libasound2-dev
```

On Ubuntu 24.04 and newer, the runtime ALSA package is usually
`libasound2t64`. On Ubuntu 22.04 and older, it is usually `libasound2`.
The Debian package metadata declares the dependency as
`libasound2 | libasound2t64` to support both families.

### Development

```bash
npm install
npm run tauri:dev
```

### Build x86_64

```bash
npm run tauri:build
```

### Build arm64

For now, prefer building on an actual arm64 Linux machine or arm64 CI runner.
Cross-compilation is possible, but it needs matching WebKitGTK, OpenSSL and
ALSA development packages for the target architecture.

### Output packages

Linux packages are generated under:

```text
src-tauri/target/release/bundle/deb/
src-tauri/target/release/bundle/appimage/
```

The `.deb` package includes Debian dependency metadata for ALSA runtime
libraries. AppImage does not have Debian dependency metadata; it still expects
the host system to provide a working Linux audio stack.
