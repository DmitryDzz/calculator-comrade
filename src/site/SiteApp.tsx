import { CalculatorApp } from "../app/CalculatorApp.tsx";
import { routes } from "../shared/routes.ts";
import { HomePage } from "./pages/HomePage.tsx";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage.tsx";
import { TipsAndTricksPage } from "./pages/TipsAndTricksPage.tsx";

function getCurrentPage(): "home" | "calculator" | "privacy" | "tips" {
    const baseUrl = import.meta.env.BASE_URL;
    const basePath = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    let path = window.location.pathname;

    if (basePath !== "/" && path.startsWith(basePath)) {
        path = `/${path.slice(basePath.length)}`;
    }

    if (path === "/calculator" || path === "/calculator/") {
        return "calculator";
    }

    if (path === "/privacy-policy" || path === "/privacy-policy/") {
        return "privacy";
    }

    if (path === "/tips-n-tricks" || path === "/tips-n-tricks/") {
        return "tips";
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
                    <a href={routes.privacy}>Privacy Policy</a>
                    <a href={routes.tips}>Tips & Tricks</a>
                </nav>
            </header>

            <main className="site-main">
                {currentPage === "home" && <HomePage />}
                {currentPage === "privacy" && <PrivacyPolicyPage />}
                {currentPage === "tips" && <TipsAndTricksPage />}
            </main>
        </div>
    );
}
