import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve("dist");
const indexHtml = resolve(distDir, "index.html");
const notFoundHtml = resolve(distDir, "404.html");

if (!existsSync(indexHtml)) {
    throw new Error("dist/index.html was not found. Run Vite build first.");
}

copyFileSync(indexHtml, notFoundHtml);
