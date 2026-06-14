import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    const isPackagedApp = mode === "desktop" || mode === "android";

    return {
        base:
            mode === "pages"
                ? "/calculator-comrade/"
                : isPackagedApp
                    ? "./"
                    : "/",
        plugins: [react()],
    };
});
