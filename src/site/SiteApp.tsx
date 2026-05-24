import { useEffect, useState } from "react";
import { CalculatorApp } from "../app/CalculatorApp.tsx";
import { routes } from "../shared/routes.ts";
import { subscribeToNavigationChanges } from "../platforms/web/webNavigation.ts";
import { HomePage } from "./pages/HomePage.tsx";
import { TipsAndTricksPage } from "./pages/TipsAndTricksPage.tsx";
import { LicensePage } from "./pages/LicensePage.tsx";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage.tsx";
import { TermsOfUsePage } from "./pages/TermsOfUsePage.tsx";

type SitePage =
    | "home"
    | "calculator"
    | "calculatorSettings"
    | "tips"
    | "privacy"
    | "terms"
    | "license";

function getCurrentPage(): SitePage {
    const baseUrl = import.meta.env.BASE_URL;
    const basePath = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    let path = window.location.pathname;

    if (basePath !== "/" && path.startsWith(basePath)) {
        path = `/${path.slice(basePath.length)}`;
    }

    if (path === "/calculator/settings" || path === "/calculator/settings/") {
        return "calculatorSettings";
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

    if (path === "/terms-of-use" || path === "/terms-of-use/") {
        return "terms";
    }

    if (path === "/license" || path === "/license/") {
        return "license";
    }

    return "home";
}

function getPageLinkClassName(page: SitePage, currentPage: SitePage, baseClassName: string): string {
    return page === currentPage ? `${baseClassName} ${baseClassName}--active` : baseClassName;
}

function getAriaCurrent(page: SitePage, currentPage: SitePage): "page" | undefined {
    return page === currentPage ? "page" : undefined;
}

export function SiteApp() {
    const [currentPage, setCurrentPage] = useState(getCurrentPage);

    useEffect(() => {
        return subscribeToNavigationChanges(() => {
            setCurrentPage(getCurrentPage());
        });
    }, []);

    if (currentPage === "calculator" || currentPage === "calculatorSettings") {
        return <CalculatorApp settingsDialogOpen={currentPage === "calculatorSettings"} />;
    }

    return (
        <div className="site-shell">
            <header className="site-header">
                <a className="site-title" href={routes.home}>Calculator Comrade</a>
                <nav className="site-nav" aria-label="Main navigation">
                    <a
                        className={getPageLinkClassName("home", currentPage, "site-nav__link")}
                        aria-current={getAriaCurrent("home", currentPage)}
                        href={routes.home}
                    >
                        Home
                    </a>
                    <a className="site-nav__link" href={routes.calculator}>Calculator</a>
                    <a
                        className={getPageLinkClassName("tips", currentPage, "site-nav__link")}
                        aria-current={getAriaCurrent("tips", currentPage)}
                        href={routes.tips}
                    >
                        Tips & Tricks
                    </a>
                </nav>
            </header>

            <main className="site-main">
                {currentPage === "home" && <HomePage />}
                {currentPage === "tips" && <TipsAndTricksPage />}
                {currentPage === "privacy" && <PrivacyPolicyPage />}
                {currentPage === "terms" && <TermsOfUsePage />}
                {currentPage === "license" && <LicensePage />}
            </main>

            <footer className="site-footer">
                <nav className="site-footer__nav" aria-label="Legal navigation">
                    <a
                        className={getPageLinkClassName("privacy", currentPage, "site-footer__link")}
                        aria-current={getAriaCurrent("privacy", currentPage)}
                        href={routes.privacy}
                    >
                        Privacy Policy
                    </a>
                    <a
                        className={getPageLinkClassName("terms", currentPage, "site-footer__link")}
                        aria-current={getAriaCurrent("terms", currentPage)}
                        href={routes.terms}
                    >
                        Terms of Use
                    </a>
                    <a
                        className={getPageLinkClassName("license", currentPage, "site-footer__link")}
                        aria-current={getAriaCurrent("license", currentPage)}
                        href={routes.license}
                    >
                        License
                    </a>
                </nav>
            </footer>
        </div>
    );
}
