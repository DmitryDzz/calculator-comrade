import { assetUrl } from "./shared/assetUrl.ts";

export function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        return;
    }

    window.addEventListener("load", async () => {
        try {
            const registration = await navigator.serviceWorker.register(
                assetUrl("sw.js"),
                { scope: import.meta.env.BASE_URL },
            );

            console.info("Service worker registered:", registration.scope);
        } catch (error: unknown) {
            console.error("Service worker registration failed:", error);
        }
    });
}
