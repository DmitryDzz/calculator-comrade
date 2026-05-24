import { useCallback, useRef, useState } from "react";
import * as React from "react";

interface CalculatorAppButtonProps {
    className?: string;
    ariaLabel: string;
    src: string | null;
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

    const cancelPress = useCallback(() => {
        if (!pointerPressedRef.current) {
            return;
        }

        pointerPressedRef.current = false;
        setPointerPressed(false);
    }, []);

    const commitPress = useCallback(() => {
        if (!pointerPressedRef.current) {
            return;
        }

        pointerPressedRef.current = false;
        setPointerPressed(false);

        window.setTimeout(() => {
            onPress();
        }, 0);
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
                    cancelPress();
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

                if (isPointerInsideElement(event, event.currentTarget)) {
                    commitPress();
                } else {
                    cancelPress();
                }
            }}
            onPointerCancel={(event) => {
                if (event.pointerId !== activePointerIdRef.current) {
                    return;
                }

                activePointerIdRef.current = null;
                cancelPress();
            }}
            onLostPointerCapture={() => {
                activePointerIdRef.current = null;
                cancelPress();
            }}
            onContextMenu={(event) => {
                event.preventDefault();
            }}
        >
            <img
                className="calculator-app-button__image"
                src={src ?? undefined}
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
