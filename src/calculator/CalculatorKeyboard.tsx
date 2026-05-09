import { CalculatorButton } from "./CalculatorButton";

export function CalculatorKeyboard() {
    return (
        <>
            {/* Digits */}
            <CalculatorButton
                ariaLabel="7"
                className="calculator-button--digit calculator-button--7"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label7.webp"
            />
            <CalculatorButton
                ariaLabel="8"
                className="calculator-button--digit calculator-button--8"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label8.webp"
            />
            <CalculatorButton
                ariaLabel="9"
                className="calculator-button--digit calculator-button--9"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label9.webp"
            />
            <CalculatorButton
                ariaLabel="4"
                className="calculator-button--digit calculator-button--4"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label4.webp"
            />
            <CalculatorButton
                ariaLabel="5"
                className="calculator-button--digit calculator-button--5"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label5.webp"
            />
            <CalculatorButton
                ariaLabel="6"
                className="calculator-button--digit calculator-button--6"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label6.webp"
            />
            <CalculatorButton
                ariaLabel="1"
                className="calculator-button--digit calculator-button--1"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label1.webp"
            />
            <CalculatorButton
                ariaLabel="2"
                className="calculator-button--digit calculator-button--2"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label2.webp"
            />
            <CalculatorButton
                ariaLabel="3"
                className="calculator-button--digit calculator-button--3"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label3.webp"
            />
            <CalculatorButton
                ariaLabel="0"
                className="calculator-button--digit calculator-button--0"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label0.webp"
            />

            {/* Function row */}
            <CalculatorButton
                ariaLabel="CE/CA"
                className="calculator-button--clear calculator-button--ce-ca"
                buttonSrc="/assets/calculator/buttons/button_clear.webp"
                labelSrc="/assets/calculator/labels/label_ce_ca.webp"
            />
            <CalculatorButton
                ariaLabel="MU"
                className="calculator-button--digit calculator-button--mu"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_mu.webp"
            />
            <CalculatorButton
                ariaLabel="Percent"
                className="calculator-button--digit calculator-button--percent"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_percent.webp"
            />
            <CalculatorButton
                ariaLabel="Divide"
                className="calculator-button--digit calculator-button--div"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_div.webp"
            />

            {/* Memory row */}
            <CalculatorButton
                ariaLabel="Memory recall"
                className="calculator-button--func calculator-button--mrc"
                buttonSrc="/assets/calculator/buttons/button_func.webp"
                labelSrc="/assets/calculator/labels/label_mrc.webp"
            />
            <CalculatorButton
                ariaLabel="Memory minus"
                className="calculator-button--func calculator-button--mem-minus"
                buttonSrc="/assets/calculator/buttons/button_func.webp"
                labelSrc="/assets/calculator/labels/label_mem_minus.webp"
            />
            <CalculatorButton
                ariaLabel="Memory plus"
                className="calculator-button--func calculator-button--mem-plus"
                buttonSrc="/assets/calculator/buttons/button_func.webp"
                labelSrc="/assets/calculator/labels/label_mem_plus.webp"
            />
            <CalculatorButton
                ariaLabel="Square root"
                className="calculator-button--func calculator-button--sqrt"
                buttonSrc="/assets/calculator/buttons/button_func.webp"
                labelSrc="/assets/calculator/labels/label_sqrt.webp"
            />
            <CalculatorButton
                ariaLabel="Change sign"
                className="calculator-button--func calculator-button--change-sign"
                buttonSrc="/assets/calculator/buttons/button_func.webp"
                labelSrc="/assets/calculator/labels/label_change_sign.webp"
            />

            {/* Operation buttons */}
            <CalculatorButton
                ariaLabel="Multiply"
                className="calculator-button--digit calculator-button--mul"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_mul.webp"
            />
            <CalculatorButton
                ariaLabel="Minus"
                className="calculator-button--digit calculator-button--minus"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_minus.webp"
            />
            <CalculatorButton
                ariaLabel="Plus"
                className="calculator-button--plus"
                buttonSrc="/assets/calculator/buttons/button_plus.webp"
                labelSrc="/assets/calculator/labels/label_plus.webp"
            />

            {/* Bottom row */}
            <CalculatorButton
                ariaLabel="Decimal point"
                className="calculator-button--digit calculator-button--point"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_point.webp"
            />
            <CalculatorButton
                ariaLabel="Equals"
                className="calculator-button--digit calculator-button--equals"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_equals.webp"
            />
        </>
    );
}
