import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

import { appAssetManifest } from "./src/app/startup/appAssetManifest.ts";

const ASSET_MANIFEST_OUTPUT_PATH = "public/asset-manifest.json";

export default defineConfig(({ mode }) => {
    const isPackagedApp = mode === "desktop" || mode === "android";

    return {
        base:
            mode === "pages"
                ? "/calculator-comrade/"
                : isPackagedApp
                    ? "./"
                    : "/",
        plugins: [generateAssetManifestPlugin(), react()],
    };
});

function generateAssetManifestPlugin(): Plugin {
    return {
        name: "generate-asset-manifest",
        buildStart() {
            writeAssetManifestFile(process.cwd());
        },
        configureServer() {
            writeAssetManifestFile(process.cwd());
        },
    };
}

function writeAssetManifestFile(rootDir: string): void {
    const outputPath = resolve(rootDir, ASSET_MANIFEST_OUTPUT_PATH);
    const outputDir = dirname(outputPath);

    mkdirSync(outputDir, { recursive: true });
    writeFileSync(outputPath, `${JSON.stringify(appAssetManifest, null, 2)}\n`);
}
