import "../../styles/site.css";

export function TipsAndTricksPage() {
    return (
        <article className="site-page">
            <h1>Tips & Tricks</h1>

            <h2>Keyboard shortcuts</h2>
            <p>
                Most calculator buttons can be used from the keyboard. Digits and basic
                operations work as expected, but some calculator keys have less obvious
                shortcuts:
            </p>

            <div className="tips-table-wrapper">
                <table className="tips-table">
                    <thead>
                    <tr>
                        <th>Keyboard key</th>
                        <th>Calculator key</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><code>Esc</code>, <code>Backspace</code>, <code>Delete</code></td>
                        <td><code>CE/CA</code></td>
                    </tr>
                    <tr>
                        <td><code>S</code></td>
                        <td><code>+/−</code></td>
                    </tr>
                    <tr>
                        <td><code>R</code></td>
                        <td><code>√</code></td>
                    </tr>
                    <tr>
                        <td><code>U</code></td>
                        <td><code>MU</code></td>
                    </tr>
                    <tr>
                        <td><code>M</code></td>
                        <td><code>MRC</code></td>
                    </tr>
                    <tr>
                        <td><code>Page Up</code></td>
                        <td><code>M+</code></td>
                    </tr>
                    <tr>
                        <td><code>Page Down</code></td>
                        <td><code>M−</code></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <h2>Overflow error</h2>
            <p>
                <code>12345678 × 1234 =</code> returns <code>ERROR 152.34566</code>.
                The real result is <code>15234566652</code>, but the calculator has only 8 digits.
                The calculator tries to show <code>15234566???</code>: the <code>ERROR</code> flag means
                that overflow occurred, and the decimal point after the third digit means that there
                are three more unknown digits.
            </p>

            <h2>Repeat the last operation</h2>
            <p>
                <code>10 + 5 =</code> gives <code>15</code>. Press <code>=</code> again and get
                <code>20</code>, then <code>25</code>, and so on.
            </p>
            <p>
                <code>10 − 5 =</code> gives <code>5</code>. Press <code>=</code> again and get
                <code>0</code>, then <code>−5</code>, and so on.
            </p>
            <p>
                <code>24 ÷ 2 =</code> gives <code>12</code>. Press <code>=</code> again and get
                <code>6</code>, then <code>3</code>, then <code>1.5</code>.
            </p>
            <p>
                <strong>Note 1:</strong> multiplication repeats differently. <code>2 × 3 =</code> gives
                <code>6</code>, then <code>=</code> gives <code>12</code>, then <code>24</code>.
                The result is multiplied by <code>2</code>, the first operand, not by the second one
                as with <code>+</code>, <code>−</code>, and <code>÷</code> operations.
            </p>
            <p>
                <strong>Note 2:</strong> <code>%</code> and <code>MU</code> operations cannot be repeated this way.
            </p>

            <h2>Counter (+=)</h2>
            <p>
                <code>1 + =</code> returns <code>1</code>. Press <code>=</code> again and get
                <code>2</code>, then <code>3</code>, and so on. Later, you can type a new number
                and continue counting from it.
            </p>

            <h2>Power (×=)</h2>
            <p><code>2 × =</code> gives <code>4</code>, which is 2².</p>
            <p><code>2 × = =</code> gives <code>8</code>, which is 2³.</p>
            <p><code>2 × = = =</code> gives <code>16</code>, which is 2⁴.</p>
            <p>Another way to get the same fourth power is <code>2 × = × =</code>, which gives <code>16</code>.</p>

            <h2><span className="home-page__calculator-variable"><var><sup>1</sup>/<sub>x</sub></var></span> (÷=)</h2>
            <p><code>10 ÷ =</code> gives <code>0.1</code>.</p>
            <p><code>5 + 5 ÷ =</code> gives <code>0.1</code>.</p>
            <p><code>2 × 3 + 4 ÷ =</code> gives <code>0.1</code>.</p>

            <h2>Change sign (−=)</h2>
            <p>
                <code>5 − =</code> returns <code>−5</code>. You can also use this trick in expressions.
            </p>
            <p><code>2 + 3 − =</code> gives <code>−5</code>.</p>
            <p><code>7 − 2 − =</code> gives <code>−5</code>.</p>
            <p><code>10 ÷ 2 − =</code> gives <code>−5</code>.</p>
            <p>
                <strong>Warning:</strong> this trick does not work as expected if the last operation in the expression
                is multiplication. <code>1 + 2 × 3 − =</code> gives <code>−4</code>, while you might
                expect <code>−9</code>.
            </p>
            <p>
                <strong>Workaround:</strong> press <code>1 + 2 × 3 + 0 − =</code> to get <code>−9</code>.
            </p>

            <h2>% operation</h2>
            <p>What is 25% of 40? Press <code>40 × 25 %</code>.</p>
            <p>If 10 is 25%, what is 100%? Press <code>10 ÷ 25 %</code>.</p>
            <p>What is 40 plus 25%? Press <code>40 + 25 %</code>.</p>
            <p>What is 40 minus 25%? Press <code>40 − 25 %</code>.</p>

            <h2>MU (Mark-Up) operation</h2>

            <h3>Markup and profit</h3>
            <p>
                On many CASIO-style calculators, <code>MU</code> is used for markup-style
                calculations. For example, <code>120 MU 25 %</code> gives <code>160</code>,
                the selling price with a 25% profit margin. Press <code>=</code> again to
                show the profit amount: <code>40</code>.
            </p>

            <h3>Reverse discount</h3>
            <p>
                The same logic can also be used in reverse. For example,
                <code>100 MU 20 %</code> gives <code>125</code>, the original price before
                a 20% discount. Press <code>=</code> again to show the discount amount:
                <code>25</code>.
            </p>

            <h2>M+, M−, MRC use case</h2>
            <div className="tips-table-wrapper">
                <table className="tips-table">
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
            </div>
            <p>
                To calculate the total price, press <code>10 × 13 M+ 5 × 17 M+ 7 × 20 M+ MRC</code>.
                You will get <code>355</code>.
            </p>

            <h2>Quadratic equations</h2>
            <p>
                For a quadratic equation <code>ax² + bx + c = 0</code>, use the discriminant:
                <code>D = b² − 4ac</code>.
            </p>
            <p>
                The roots are <code>x₁ = (−b − √D) ÷ (2a)</code> and
                <code>x₂ = (−b + √D) ÷ (2a)</code>.
            </p>
            <p>
                A quick way to calculate <code>√D</code> and save it to memory is:
                <code>b × = M+ 4 × a × c M− MRC MRC √ M+ C/AC</code>.
            </p>
            <p>
                Then calculate <code>x₁</code> with <code>− b − MRC ÷ 2 ÷ a</code>.
            </p>
            <p>
                Calculate <code>x₂</code> with <code>− b + MRC ÷ 2 ÷ a</code>.
            </p>

            <h2>Fibonacci numbers</h2>
            <p>
                You can generate Fibonacci numbers by repeating <code>+ =</code> after the initial
                <code>1 + =</code>.
            </p>
            <p><code>1 + =</code> gives <code>1</code>.</p>
            <p><code>+ =</code> gives <code>2</code>.</p>
            <p><code>+ =</code> gives <code>3</code>.</p>
            <p><code>+ =</code> gives <code>5</code>.</p>
            <p><code>+ =</code> gives <code>8</code>, and so on.</p>
        </article>
    );
}
