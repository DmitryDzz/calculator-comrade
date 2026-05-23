import { useCallback, useRef, useState } from "react";
import * as React from "react";
import type { CalculatorButtonCode } from "../../calculatorCore/calculatorWasmTypes.ts";

interface CalculatorButtonProps {
    className?: string;
    ariaLabel: string;
    buttonCode: CalculatorButtonCode;
    buttonSrc: string;
    labelSrc: string;
    onPressStart: (buttonCode: CalculatorButtonCode) => void;
    onPress: (buttonCode: CalculatorButtonCode) => void;
    isButtonPressed: (buttonCode: CalculatorButtonCode) => boolean;
}

export function CalculatorButton({
                                     className,
                                     ariaLabel,
                                     buttonCode,
                                     buttonSrc,
                                     labelSrc,
                                     onPressStart,
                                     onPress,
                                     isButtonPressed,
                                 }: CalculatorButtonProps) {
    const [pointerPressed, setPointerPressed] = useState(false);

    const activePointerIdRef = useRef<number | null>(null);
    const pointerPressedRef = useRef(false);

    const releaseButton = useCallback(() => {
        if (!pointerPressedRef.current) {
            return;
        }

        pointerPressedRef.current = false;
        setPointerPressed(false);

        onPress(buttonCode);
    }, [buttonCode, onPress]);

    const pressed = pointerPressed || isButtonPressed(buttonCode);

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

                if (activePointerIdRef.current !== null) {
                    return;
                }

                activePointerIdRef.current = event.pointerId;
                pointerPressedRef.current = true;

                event.currentTarget.setPointerCapture(event.pointerId);

                setPointerPressed(true);
                onPressStart(buttonCode);
            }}
            onPointerMove={(event) => {
                if (event.pointerId !== activePointerIdRef.current) {
                    return;
                }

                if (!isPointerInsideElement(event, event.currentTarget)) {
                    releaseButton();
                }
            }}
            onPointerUp={(event) => {
                if (event.pointerId !== activePointerIdRef.current) {
                    return;
                }

                activePointerIdRef.current = null;

                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                    event.currentTarget.releasePointerCapture(event.pointerId);
                }

                releaseButton();
            }}
            onPointerCancel={(event) => {
                if (event.pointerId !== activePointerIdRef.current) {
                    return;
                }

                activePointerIdRef.current = null;
                releaseButton();
            }}
            onLostPointerCapture={() => {
                activePointerIdRef.current = null;
                releaseButton();
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

// noinspection DuplicatedCode
function isPrimaryPointer(event: React.PointerEvent<HTMLButtonElement>): boolean {
    if (!event.isPrimary) {
        return false;
    }

    if (event.pointerType === "mouse") {
        return event.button === 0;
    }

    return true;
}

function isPointerInsideElement(
    event: React.PointerEvent<HTMLButtonElement>,
    element: HTMLElement,
): boolean {
    const rect = element.getBoundingClientRect();
    const margin = getPointerReleaseMargin(event, rect);

    return (
        event.clientX >= rect.left - margin &&
        event.clientX <= rect.right + margin &&
        event.clientY >= rect.top - margin &&
        event.clientY <= rect.bottom + margin
    );
}

function getPointerReleaseMargin(
    event: React.PointerEvent<HTMLButtonElement>,
    rect: DOMRect,
): number {
    const minSize = Math.min(rect.width, rect.height);

    if (event.pointerType === "touch") {
        return minSize * 0.15;
    }

    if (event.pointerType === "pen") {
        return minSize * 0.08;
    }

    return 0;
}
