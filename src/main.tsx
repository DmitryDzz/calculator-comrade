import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SiteApp } from "./site/SiteApp.tsx";
import "./styles/index.css";
import "./styles/calculator.css";
import "./styles/site.css";
import "./styles/settings.css";
import { registerServiceWorker } from "./registerServiceWorker.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SiteApp />
    </StrictMode>,
);

if (import.meta.env.PROD) {
    registerServiceWorker();
}
