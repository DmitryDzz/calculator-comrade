import { useCallback, useRef, useState } from "react";
import * as React from "react";

interface CalculatorAppButtonProps {
    className?: string;
    ariaLabel: string;
    src: string;
    onPressStart: () => void;
    onPress: () => void;
}

export function CalculatorAppButton({
                                        className,
                                        ariaLabel,
                                        src,
                                        onPressStart,
                                        onPress,
                                    }: CalculatorAppButtonProps) {
    const [pointerPressed, setPointerPressed] = useState(false);

    const activePointerIdRef = useRef<number | null>(null);
    const pointerPressedRef = useRef(false);

    const releaseButton = useCallback(() => {
        if (!pointerPressedRef.current) {
            return;
        }

        pointerPressedRef.current = false;
        setPointerPressed(false);

        onPress();
    }, [onPress]);

    return (
        <button
            className={[
                "calculator-app-button",
                className,
                pointerPressed ? "calculator-app-button--pressed" : undefined,
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
                onPressStart();
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
                className="calculator-app-button__image"
                src={src}
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

    return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );
}
