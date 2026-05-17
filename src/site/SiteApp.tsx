import { CalculatorApp } from "../app/CalculatorApp.tsx";
import { routes } from "../shared/routes.ts";
import { HomePage } from "./pages/HomePage.tsx";
import { TipsAndTricksPage } from "./pages/TipsAndTricksPage.tsx";
import { LicensePage } from "./pages/LicensePage.tsx";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage.tsx";

function getCurrentPage(): "home" | "calculator" | "tips" | "privacy" | "license" {
    const baseUrl = import.meta.env.BASE_URL;
    const basePath = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    let path = window.location.pathname;

    if (basePath !== "/" && path.startsWith(basePath)) {
        path = `/${path.slice(basePath.length)}`;
    }

    if (path === "/calculator" || path === "/calculator/") {
        return "calculator";
    }

    if (path === "/tips-n-tricks" || path === "/tips-n-tricks/") {
        return "tips";
    }

    if (path === "/privacy-policy" || path === "/privacy-policy/") {
        return "privacy";
    }

    if (path === "/license" || path === "/license/") {
        return "license";
    }

    return "home";
}

export function SiteApp() {
    const currentPage = getCurrentPage();

    if (currentPage === "calculator") {
        return <CalculatorApp />;
    }

    return (
        <div className="site-shell">
            <header className="site-header">
                <a className="site-title" href={routes.home}>Calculator Comrade</a>
                <nav className="site-nav" aria-label="Main navigation">
                    <a href={routes.calculator}>Calculator</a>
                    <a href={routes.tips}>Tips & Tricks</a>
                    <a href={routes.privacy}>Privacy Policy</a>
                    <a href={routes.license}>License</a>
                </nav>
            </header>

            <main className="site-main">
                {currentPage === "home" && <HomePage />}
                {currentPage === "tips" && <TipsAndTricksPage />}
                {currentPage === "privacy" && <PrivacyPolicyPage />}
                {currentPage === "license" && <LicensePage />}
            </main>
        </div>
    );
}
