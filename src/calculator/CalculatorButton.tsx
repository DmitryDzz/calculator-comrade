import { useState } from "react";
import type { CalculatorButtonCode } from "../calculatorCore/calculatorWasmTypes";
import * as React from "react";

interface CalculatorButtonProps {
    className?: string;
    ariaLabel: string;
    buttonCode: CalculatorButtonCode;
    buttonSrc: string;
    labelSrc: string;
    onPressStart?: (buttonCode: CalculatorButtonCode) => void;
    onPress: (buttonCode: CalculatorButtonCode) => void;
    pressedButtonCode: CalculatorButtonCode | null;
}

export function CalculatorButton({
                                     className,
                                     ariaLabel,
                                     buttonCode,
                                     buttonSrc,
                                     labelSrc,
                                     onPressStart,
                                     onPress,
                                     pressedButtonCode,
                                 }: CalculatorButtonProps) {
    const [pointerPressed, setPointerPressed] = useState(false);
    const pressed = pointerPressed || pressedButtonCode === buttonCode;

    return (
        <button
            className={[
                "calculator-button",
                className,
                pressed ? "calculator-button--pressed" : undefined,
            ].filter(Boolean).join(" ")}
            type="button"
            tabIndex={-1}
            aria-label={ariaLabel}
            onPointerDown={(event) => {
                if (!isPrimaryPointer(event)) {
                    return;
                }

                event.currentTarget.setPointerCapture(event.pointerId);
                setPointerPressed(true);
                onPressStart?.(buttonCode);
            }}
            onPointerUp={() => {
                if (!pointerPressed) {
                    return;
                }

                setPointerPressed(false);
                onPress(buttonCode);
            }}
            onPointerCancel={() => {
                setPointerPressed(false);
            }}
            onLostPointerCapture={() => {
                setPointerPressed(false);
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
