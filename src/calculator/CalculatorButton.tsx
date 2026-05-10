import { useState } from "react";
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
    const [pressed, setPressed] = useState(false);

    return (
        <button
            className={[
                "calculator-button",
                className,
                pressed ? "calculator-button--pressed" : undefined,
            ].filter(Boolean).join(" ")}
            type="button"
            aria-label={ariaLabel}
            onPointerDown={(event) => {
                if (!isPrimaryPointer(event)) {
                    return;
                }

                event.currentTarget.setPointerCapture(event.pointerId);
                setPressed(true);
            }}
            onPointerUp={() => {
                if (!pressed) {
                    return;
                }

                setPressed(false);
                onPress(buttonCode);
            }}
            onPointerCancel={() => {
                setPressed(false);
            }}
            onLostPointerCapture={() => {
                setPressed(false);
            }}
            onContextMenu={(event) => {
                event.preventDefault();
            }}
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

function isPrimaryPointer(event: React.PointerEvent<HTMLButtonElement>): boolean {
    if (!event.isPrimary) {
        return false;
    }

    if (event.pointerType === "mouse") {
        return event.button === 0;
    }

    return true;
}
