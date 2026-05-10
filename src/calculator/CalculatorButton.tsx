import type { CalculatorButtonCode } from "../calculatorCore/calculatorWasmTypes.ts";

interface CalculatorButtonProps {
    className?: string;
    ariaLabel: string;
    buttonCode: CalculatorButtonCode;
    buttonSrc: string;
    labelSrc: string;
    onPress: (buttonCode: CalculatorButtonCode) => void;
}

export function CalculatorButton({
                                     className,
                                     ariaLabel,
                                     buttonCode,
                                     buttonSrc,
                                     labelSrc,
                                     onPress,
                                 }: CalculatorButtonProps) {
    return (
        <button
            className={["calculator-button", className].filter(Boolean).join(" ")}
            type="button"
            aria-label={ariaLabel}
            onClick={() => onPress(buttonCode)}
        >
            <img
                className="calculator-button__body"
                src={buttonSrc}
                alt=""
                draggable={false}
            />
            <img
                className="calculator-button__label"
                src={labelSrc}
                alt=""
                draggable={false}
            />
        </button>
    );
}
