import { routes } from "../../shared/routes.ts";

export function TermsOfUsePage() {
    return (
        <article className="site-page">
            <h1>Terms of Use</h1>
            <p>Effective date: 24 May 2026</p>

            <h2>Overview</h2>
            <p>
                Calculator Comrade is provided free of charge, without ads and without
                in-app purchases. It is a non-commercial hobby project.
            </p>

            <h2>Acceptance of Terms</h2>
            <p>
                By using Calculator Comrade, you agree to these Terms of Use. If you do
                not agree with these terms, please do not use the app.
            </p>

            <h2>Permitted Use</h2>
            <p>
                You may use Calculator Comrade for personal, educational, and
                general-purpose calculations. You must not use the app in a way that
                violates applicable law or interferes with the app, website, or related
                services.
            </p>

            <h2>Calculation Accuracy</h2>
            <p>
                Calculator Comrade emulates a simple pocket calculator. It may have
                rounding, overflow, display, or behavior limitations typical of such
                calculators.
            </p>

            <h2>No Warranty</h2>
            <p>
                The app is provided as is, without warranties of any kind. The maintainer
                does not guarantee that the calculator is error-free, uninterrupted, or
                suitable for financial, engineering, medical, legal, safety-critical, or
                other important calculations.
            </p>

            <h2>Use at Your Own Risk</h2>
            <p>
                You are responsible for checking calculation results before relying on
                them. Do not use Calculator Comrade as the only source for important
                decisions.
            </p>

            <h2>Privacy</h2>
            <p>
                Please also read our <a href={routes.privacy}>Privacy Policy</a>, which
                explains that Calculator Comrade does not collect or share personal data.
            </p>

            <h2>Changes to These Terms</h2>
            <p>
                These Terms of Use may be updated from time to time. The effective date
                at the top of this page shows when the current version became effective.
            </p>

            <h2>Contact Us</h2>
            <p>
                If you have any questions about these Terms of Use, you can contact the
                project maintainer by email: <a href="mailto:dmitrydzz@protonmail.com">dmitrydzz@protonmail.com</a>.
            </p>
        </article>
    );
}
