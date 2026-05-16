export function TipsAndTricksPage() {
    return (
        <article className="site-page">
            <h1>Tips & Tricks</h1>

            <h2>M+, M-, MRC use case</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Coffee</td><td>10</td><td>13</td></tr>
                    <tr><td>Sugar</td><td>5</td><td>17</td></tr>
                    <tr><td>Milk</td><td>7</td><td>20</td></tr>
                </tbody>
            </table>
            <p>
                To calculate the total price press <code>10 × 13 M+ 5 × 17 M+ 7 × 20 M+ MRC</code>.
                You will get <code>355</code>.
            </p>

            <h2>% operation</h2>
            <p>What is 25% of 40? <code>40 × 25 %</code></p>
            <p>If 10 is 25%, what is 100%? <code>10 ÷ 25 %</code></p>
            <p>What is 40 + 25%? <code>40 + 25 %</code></p>
            <p>What is 40 - 25%? <code>40 - 25 %</code></p>

            <h2>MU operation</h2>
            <p>
                The product&apos;s price is 100 after a 20% discount. What is the initial price?
                Press <code>100 MU 20 %</code>.
            </p>

            <h2>Overflow error</h2>
            <p>
                <code>12345678 × 1234 =</code> returns <code>ERROR 152.34566</code>.
                The real result is <code>15234566652</code>, but the calculator has only
                8 digits, so it shows the most meaningful part of the overflowed value.
            </p>

            <h2>Repeat the last operation</h2>
            <p>
                <code>10 + 5 =</code> gives <code>15</code>. Press <code>=</code> again and get
                <code>20</code>, then <code>25</code>, and so on.
            </p>
            <p>
                <code>24 ÷ 2 =</code> gives <code>12</code>, then <code>=</code> gives
                <code>6</code>, then <code>3</code>, then <code>1.5</code>.
            </p>

            <h2>Counter</h2>
            <p>
                <code>1 + =</code> returns <code>1</code>. Press <code>=</code> again and get
                <code>2</code>, then <code>3</code>, and so on.
            </p>

            <h2>Power</h2>
            <p><code>2 × =</code> gives <code>4</code>.</p>
            <p><code>2 × = =</code> gives <code>8</code>.</p>
            <p><code>2 × = = =</code> gives <code>16</code>.</p>

            <h2>1/x</h2>
            <p><code>10 ÷ =</code> gives <code>0.1</code>.</p>

            <h2>Change sign</h2>
            <p>
                <code>5 - =</code> returns <code>-5</code>. You can also use this trick in
                expressions, for example <code>2 + 3 - =</code> gives <code>-5</code>.
            </p>
        </article>
    );
}
