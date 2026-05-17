import { assetUrl } from "../shared/assetUrl.ts";
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
    onButtonPressStart: (buttonCode: CalculatorButtonCode) => void;
    onButtonPress: (buttonCode: CalculatorButtonCode) => void;
    isButtonPressed: (buttonCode: CalculatorButtonCode) => boolean;
}

export function CalculatorKeyboard({ onButtonPressStart, onButtonPress, isButtonPressed }: CalculatorKeyboardProps) {
    return (
        <>
            {/* Digits */}
            <CalculatorButton
                ariaLabel="7"
                className="calculator-button--digit calculator-button--7"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label7.webp")}
                buttonCode={CALC_BUTTON_D7}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="8"
                className="calculator-button--digit calculator-button--8"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label8.webp")}
                buttonCode={CALC_BUTTON_D8}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="9"
                className="calculator-button--digit calculator-button--9"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label9.webp")}
                buttonCode={CALC_BUTTON_D9}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="4"
                className="calculator-button--digit calculator-button--4"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label4.webp")}
                buttonCode={CALC_BUTTON_D4}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="5"
                className="calculator-button--digit calculator-button--5"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label5.webp")}
                buttonCode={CALC_BUTTON_D5}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="6"
                className="calculator-button--digit calculator-button--6"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label6.webp")}
                buttonCode={CALC_BUTTON_D6}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="1"
                className="calculator-button--digit calculator-button--1"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label1.webp")}
                buttonCode={CALC_BUTTON_D1}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="2"
                className="calculator-button--digit calculator-button--2"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label2.webp")}
                buttonCode={CALC_BUTTON_D2}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="3"
                className="calculator-button--digit calculator-button--3"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label3.webp")}
                buttonCode={CALC_BUTTON_D3}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="0"
                className="calculator-button--digit calculator-button--0"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label0.webp")}
                buttonCode={CALC_BUTTON_D0}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />

            {/* Function row */}
            <CalculatorButton
                ariaLabel="CE/CA"
                className="calculator-button--clear calculator-button--ce-ca"
                buttonSrc={assetUrl("assets/calculator/buttons/button_clear.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_ce_ca.webp")}
                buttonCode={CALC_BUTTON_CECA}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="MU"
                className="calculator-button--digit calculator-button--mu"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_mu.webp")}
                buttonCode={CALC_BUTTON_MU}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="Percent"
                className="calculator-button--digit calculator-button--percent"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_percent.webp")}
                buttonCode={CALC_BUTTON_PERCENT}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="Divide"
                className="calculator-button--digit calculator-button--div"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_div.webp")}
                buttonCode={CALC_BUTTON_DIV}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />

            {/* Memory row */}
            <CalculatorButton
                ariaLabel="Memory recall"
                className="calculator-button--func calculator-button--mrc"
                buttonSrc={assetUrl("assets/calculator/buttons/button_func.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_mrc.webp")}
                buttonCode={CALC_BUTTON_MEMRC}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="Memory minus"
                className="calculator-button--func calculator-button--mem-minus"
                buttonSrc={assetUrl("assets/calculator/buttons/button_func.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_mem_minus.webp")}
                buttonCode={CALC_BUTTON_MEMMINUS}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="Memory plus"
                className="calculator-button--func calculator-button--mem-plus"
                buttonSrc={assetUrl("assets/calculator/buttons/button_func.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_mem_plus.webp")}
                buttonCode={CALC_BUTTON_MEMPLUS}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="Square root"
                className="calculator-button--func calculator-button--sqrt"
                buttonSrc={assetUrl("assets/calculator/buttons/button_func.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_sqrt.webp")}
                buttonCode={CALC_BUTTON_SQRT}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="Change sign"
                className="calculator-button--func calculator-button--change-sign"
                buttonSrc={assetUrl("assets/calculator/buttons/button_func.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_change_sign.webp")}
                buttonCode={CALC_BUTTON_CHANGESIGN}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />

            {/* Operation buttons */}
            <CalculatorButton
                ariaLabel="Multiply"
                className="calculator-button--digit calculator-button--mul"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_mul.webp")}
                buttonCode={CALC_BUTTON_MUL}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="Minus"
                className="calculator-button--digit calculator-button--minus"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_minus.webp")}
                buttonCode={CALC_BUTTON_MINUS}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="Plus"
                className="calculator-button--plus"
                buttonSrc={assetUrl("assets/calculator/buttons/button_plus.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_plus.webp")}
                buttonCode={CALC_BUTTON_PLUS}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />

            {/* Bottom row */}
            <CalculatorButton
                ariaLabel="Decimal point"
                className="calculator-button--digit calculator-button--point"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_point.webp")}
                buttonCode={CALC_BUTTON_POINT}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
            <CalculatorButton
                ariaLabel="Equals"
                className="calculator-button--digit calculator-button--equals"
                buttonSrc={assetUrl("assets/calculator/buttons/button_digit.webp")}
                labelSrc={assetUrl("assets/calculator/labels/label_equals.webp")}
                buttonCode={CALC_BUTTON_EQUALS}
                onPressStart={onButtonPressStart}
                onPress={onButtonPress}
                isButtonPressed={isButtonPressed}
            />
        </>
    );
}
