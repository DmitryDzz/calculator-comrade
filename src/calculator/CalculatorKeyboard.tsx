import {
        CALC_BUTTON_CECA,
        CALC_BUTTON_CHANGESIGN,
        CALC_BUTTON_D0,
        CALC_BUTTON_D1,
        CALC_BUTTON_D2,
        CALC_BUTTON_D3,
        CALC_BUTTON_D4,
        CALC_BUTTON_D5,
        CALC_BUTTON_D6,
        CALC_BUTTON_D7,
        CALC_BUTTON_D8,
        CALC_BUTTON_D9,
        CALC_BUTTON_DIV,
        CALC_BUTTON_EQUALS,
        CALC_BUTTON_MEMMINUS,
        CALC_BUTTON_MEMPLUS,
        CALC_BUTTON_MEMRC,
        CALC_BUTTON_MINUS,
        CALC_BUTTON_MU,
        CALC_BUTTON_MUL,
        CALC_BUTTON_PERCENT,
        CALC_BUTTON_PLUS,
        CALC_BUTTON_POINT,
        CALC_BUTTON_SQRT,
} from "../calculatorCore/calculatorConstants.ts";
import type { CalculatorButtonCode } from "../calculatorCore/calculatorWasmTypes.ts";
import { CalculatorButton } from "./CalculatorButton.tsx";

interface CalculatorKeyboardProps {
    onButtonPress: (buttonCode: CalculatorButtonCode) => void;
    pressedButtonCode: CalculatorButtonCode | null;
}

export function CalculatorKeyboard({ onButtonPress, pressedButtonCode }: CalculatorKeyboardProps) {
    return (
        <>
            {/* Digits */}
            <CalculatorButton
                ariaLabel="7"
                className="calculator-button--digit calculator-button--7"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label7.webp"
                buttonCode={CALC_BUTTON_D7}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="8"
                className="calculator-button--digit calculator-button--8"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label8.webp"
                buttonCode={CALC_BUTTON_D8}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="9"
                className="calculator-button--digit calculator-button--9"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label9.webp"
                buttonCode={CALC_BUTTON_D9}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="4"
                className="calculator-button--digit calculator-button--4"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label4.webp"
                buttonCode={CALC_BUTTON_D4}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="5"
                className="calculator-button--digit calculator-button--5"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label5.webp"
                buttonCode={CALC_BUTTON_D5}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="6"
                className="calculator-button--digit calculator-button--6"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label6.webp"
                buttonCode={CALC_BUTTON_D6}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="1"
                className="calculator-button--digit calculator-button--1"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label1.webp"
                buttonCode={CALC_BUTTON_D1}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="2"
                className="calculator-button--digit calculator-button--2"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label2.webp"
                buttonCode={CALC_BUTTON_D2}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="3"
                className="calculator-button--digit calculator-button--3"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label3.webp"
                buttonCode={CALC_BUTTON_D3}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="0"
                className="calculator-button--digit calculator-button--0"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label0.webp"
                buttonCode={CALC_BUTTON_D0}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />

            {/* Function row */}
            <CalculatorButton
                ariaLabel="CE/CA"
                className="calculator-button--clear calculator-button--ce-ca"
                buttonSrc="/assets/calculator/buttons/button_clear.webp"
                labelSrc="/assets/calculator/labels/label_ce_ca.webp"
                buttonCode={CALC_BUTTON_CECA}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="MU"
                className="calculator-button--digit calculator-button--mu"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_mu.webp"
                buttonCode={CALC_BUTTON_MU}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="Percent"
                className="calculator-button--digit calculator-button--percent"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_percent.webp"
                buttonCode={CALC_BUTTON_PERCENT}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="Divide"
                className="calculator-button--digit calculator-button--div"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_div.webp"
                buttonCode={CALC_BUTTON_DIV}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />

            {/* Memory row */}
            <CalculatorButton
                ariaLabel="Memory recall"
                className="calculator-button--func calculator-button--mrc"
                buttonSrc="/assets/calculator/buttons/button_func.webp"
                labelSrc="/assets/calculator/labels/label_mrc.webp"
                buttonCode={CALC_BUTTON_MEMRC}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="Memory minus"
                className="calculator-button--func calculator-button--mem-minus"
                buttonSrc="/assets/calculator/buttons/button_func.webp"
                labelSrc="/assets/calculator/labels/label_mem_minus.webp"
                buttonCode={CALC_BUTTON_MEMMINUS}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="Memory plus"
                className="calculator-button--func calculator-button--mem-plus"
                buttonSrc="/assets/calculator/buttons/button_func.webp"
                labelSrc="/assets/calculator/labels/label_mem_plus.webp"
                buttonCode={CALC_BUTTON_MEMPLUS}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="Square root"
                className="calculator-button--func calculator-button--sqrt"
                buttonSrc="/assets/calculator/buttons/button_func.webp"
                labelSrc="/assets/calculator/labels/label_sqrt.webp"
                buttonCode={CALC_BUTTON_SQRT}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="Change sign"
                className="calculator-button--func calculator-button--change-sign"
                buttonSrc="/assets/calculator/buttons/button_func.webp"
                labelSrc="/assets/calculator/labels/label_change_sign.webp"
                buttonCode={CALC_BUTTON_CHANGESIGN}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />

            {/* Operation buttons */}
            <CalculatorButton
                ariaLabel="Multiply"
                className="calculator-button--digit calculator-button--mul"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_mul.webp"
                buttonCode={CALC_BUTTON_MUL}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="Minus"
                className="calculator-button--digit calculator-button--minus"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_minus.webp"
                buttonCode={CALC_BUTTON_MINUS}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="Plus"
                className="calculator-button--plus"
                buttonSrc="/assets/calculator/buttons/button_plus.webp"
                labelSrc="/assets/calculator/labels/label_plus.webp"
                buttonCode={CALC_BUTTON_PLUS}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />

            {/* Bottom row */}
            <CalculatorButton
                ariaLabel="Decimal point"
                className="calculator-button--digit calculator-button--point"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_point.webp"
                buttonCode={CALC_BUTTON_POINT}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
            <CalculatorButton
                ariaLabel="Equals"
                className="calculator-button--digit calculator-button--equals"
                buttonSrc="/assets/calculator/buttons/button_digit.webp"
                labelSrc="/assets/calculator/labels/label_equals.webp"
                buttonCode={CALC_BUTTON_EQUALS}
                onPress={onButtonPress}
                pressedButtonCode={pressedButtonCode}
            />
        </>
    );
}
