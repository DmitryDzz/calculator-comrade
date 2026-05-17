import licenseText from "../../../LICENSE?raw";
import thirdPartyNoticesText from "../../../THIRD_PARTY_NOTICES?raw";

function LegalTextBlock({ title, text }: { title: string; text: string }) {
    return (
        <section>
            <h2>{title}</h2>
            <pre className="legal-text">{text.trim()}</pre>
        </section>
    );
}

export function LicensePage() {
    return (
        <article className="site-page">
            <h1>License</h1>
            <p>
                Calculator Comrade is open source software.
                You can find the project license and third-party notices below.
            </p>

            <LegalTextBlock title="Calculator Comrade" text={licenseText} />
            <LegalTextBlock title="Third-party notices" text={thirdPartyNoticesText} />
        </article>
    );
}
