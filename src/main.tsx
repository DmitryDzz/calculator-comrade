import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";
import "./styles/index.css";
import "./styles/calculator.css";
import { registerServiceWorker } from "./registerServiceWorker.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);

if (import.meta.env.PROD) {
    registerServiceWorker();
}
