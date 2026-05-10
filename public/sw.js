const CACHE_NAME = "calculator-comrade-web-v1";

const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/manifest.webmanifest",

    "/wasm/calculator.js",
    "/wasm/calculator.wasm",

    "/favicon-48.png",
    "/favicon-72.png",
    "/favicon-96.png",
    "/favicon-144.png",
    "/favicon-192.png",

    "/icons/icon-48.png",
    "/icons/icon-72.png",
    "/icons/icon-96.png",
    "/icons/icon-144.png",
    "/icons/icon-192.png",
    "/icons/icon-512.png",
    "/icons/maskable-icon-192.png",
    "/icons/maskable-icon-512.png",

    "/screenshots/screenshot-wide.png",
    "/screenshots/screenshot-narrow.png",

    "/assets/calculator/body.webp",

    "/assets/calculator/buttons/app_button_info.webp",
    "/assets/calculator/buttons/app_button_rate.webp",
    "/assets/calculator/buttons/app_button_settings_off.webp",
    "/assets/calculator/buttons/app_button_settings_snd_vbr.webp",
    "/assets/calculator/buttons/app_button_settings_snd.webp",
    "/assets/calculator/buttons/app_button_settings_vbr.webp",
    "/assets/calculator/buttons/app_button_share.webp",
    "/assets/calculator/buttons/button_clear.webp",
    "/assets/calculator/buttons/button_digit.webp",
    "/assets/calculator/buttons/button_func.webp",
    "/assets/calculator/buttons/button_plus.webp",

    "/assets/calculator/display/display_digit0.webp",
    "/assets/calculator/display/display_digit1.webp",
    "/assets/calculator/display/display_digit2.webp",
    "/assets/calculator/display/display_digit3.webp",
    "/assets/calculator/display/display_digit4.webp",
    "/assets/calculator/display/display_digit5.webp",
    "/assets/calculator/display/display_digit6.webp",
    "/assets/calculator/display/display_digit7.webp",
    "/assets/calculator/display/display_digit8.webp",
    "/assets/calculator/display/display_digit9.webp",
    "/assets/calculator/display/display_error.webp",
    "/assets/calculator/display/display_memory.webp",
    "/assets/calculator/display/display_minus.webp",
    "/assets/calculator/display/display_point.webp",

    "/assets/calculator/labels/label0.webp",
    "/assets/calculator/labels/label1.webp",
    "/assets/calculator/labels/label2.webp",
    "/assets/calculator/labels/label3.webp",
    "/assets/calculator/labels/label4.webp",
    "/assets/calculator/labels/label5.webp",
    "/assets/calculator/labels/label6.webp",
    "/assets/calculator/labels/label7.webp",
    "/assets/calculator/labels/label8.webp",
    "/assets/calculator/labels/label9.webp",
    "/assets/calculator/labels/label_ce_ca.webp",
    "/assets/calculator/labels/label_change_sign.webp",
    "/assets/calculator/labels/label_div.webp",
    "/assets/calculator/labels/label_equals.webp",
    "/assets/calculator/labels/label_mem_minus.webp",
    "/assets/calculator/labels/label_mem_plus.webp",
    "/assets/calculator/labels/label_minus.webp",
    "/assets/calculator/labels/label_mrc.webp",
    "/assets/calculator/labels/label_mul.webp",
    "/assets/calculator/labels/label_mu.webp",
    "/assets/calculator/labels/label_percent.webp",
    "/assets/calculator/labels/label_plus.webp",
    "/assets/calculator/labels/label_point.webp",
    "/assets/calculator/labels/label_sqrt.webp",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);

            await cacheAssets(cache, STATIC_ASSETS);

            const buildAssets = await getBuildAssetsFromIndex();
            await cacheAssets(cache, buildAssets);

            await self.skipWaiting();
        })(),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();

            await Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName)),
            );

            await self.clients.claim();
        })(),
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    const requestUrl = new URL(event.request.url);

    if (requestUrl.origin !== self.location.origin) {
        return;
    }

    event.respondWith(handleFetch(event.request));
});

async function handleFetch(request) {
    const cachedResponse = await findCachedResponse(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const response = await fetch(request);

        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, response.clone());
        }

        return response;
    } catch (error) {
        if (request.mode === "navigate") {
            const fallback = await findCachedResponse("/index.html");

            if (fallback) {
                return fallback;
            }
        }

        console.warn("Offline request was not found in cache:", request.url);
        throw error;
    }
}

async function findCachedResponse(request) {
    const requestUrl =
        typeof request === "string"
            ? new URL(request, self.location.origin)
            : new URL(request.url);

    return (
        await caches.match(request) ??
        await caches.match(requestUrl.href) ??
        await caches.match(requestUrl.pathname)
    );
}

async function cacheAssets(cache, urls) {
    await Promise.all(
        urls.map(async (url) => {
            try {
                const request = new Request(url, { cache: "no-cache" });
                const response = await fetch(request);

                if (response.ok) {
                    await cache.put(request, response);
                } else {
                    console.warn("Asset was not cached:", url, response.status);
                }
            } catch (error) {
                console.warn("Asset was not cached:", url, error);
            }
        }),
    );
}

async function getBuildAssetsFromIndex() {
    try {
        const response = await fetch("/index.html", { cache: "no-cache" });

        if (!response.ok) {
            return [];
        }

        const html = await response.text();
        const assetUrls = new Set();

        const assetRegex = /(?:src|href)="(\/assets\/[^"]+\.(?:js|css))"/g;

        for (const match of html.matchAll(assetRegex)) {
            assetUrls.add(match[1]);
        }

        return [...assetUrls];
    } catch (error) {
        console.warn("Build assets were not discovered from index.html:", error);
        return [];
    }
}
