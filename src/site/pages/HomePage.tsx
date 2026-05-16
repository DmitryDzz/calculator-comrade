import { assetUrl } from "../../shared/assetUrl.ts";
import { routes } from "../../shared/routes.ts";

export function HomePage() {
    return (
        <article className="site-page site-page--home">
            <section className="hero">
                <div className="hero__text">
                    <h1>First of all</h1>
                    <p className="lead">
                        <span>This is a calculator.</span>
                        <span>It is free.</span>
                        <span>No ads, no in-app purchases.</span>
                    </p>
                    <p>
                        Calculator Comrade is an emulator of an old pocket calculator.
                        It uses an open source core library that emulates the calculator&apos;s
                        processor architecture and algorithms.
                    </p>
                    <p className="hero__actions">
                        <a className="hero__primary-action" href={routes.calculator}>Use Calculator</a>
                        <a className="hero__secondary-action" href={routes.tips}>Read Tips & Tricks</a>
                    </p>
                </div>
                <img
                    className="hero__image"
                    src={assetUrl("screenshots/pixel2_277x512_framed.png")}
                    alt="Calculator Comrade screenshot"
                />
            </section>

            <section>
                <h2>Why yet another calculator app?</h2>
                <p>
                    An old pocket calculator can be surprisingly handy in everyday life.
                    For example, press <code>1 + =</code> and then keep pressing <code>=</code>
                    to use it as a counter. Or press <code>× =</code> to get a square number.
                </p>
                <p>
                    These small tricks are part of the charm of classic basic calculators.
                    Calculator Comrade keeps that behavior instead of turning the app into
                    another scientific calculator.
                </p>
            </section>

            <section>
                <h2>What is this calculator?</h2>
                <p>
                    This app is a software replica inspired by a classic 8-digit pocket
                    calculator. The visual design follows the old Android version, while the
                    calculation logic comes from <a href="https://github.com/DmitryDzz/calculator-comrade-lib">calculator-comrade-lib</a>.
                </p>
            </section>

            <section>
                <h2>Why is this app free?</h2>
                <ol>
                    <li>There are thousands of calculators already, so this is not a business plan.</li>
                    <li>It is a hobby project, and building it is part of the fun.</li>
                    <li>It is dedicated to the pioneers who designed those old calculator processors.</li>
                </ol>
            </section>
        </article>
    );
}
