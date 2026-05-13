import { useState } from "react";
import * as React from "react";

interface CalculatorAppButtonProps {
    className?: string;
    ariaLabel: string;
    src: string;
    onPressStart?: () => void;
    onPress?: () => void;
}

export function CalculatorAppButton({
                                        className,
                                        ariaLabel,
                                        src,
                                        onPressStart,
                                        onPress,
                                    }: CalculatorAppButtonProps) {
    const [pressed, setPressed] = useState(false);

    return (
        <button
            className={[
                "calculator-app-button",
                className,
                pressed ? "calculator-app-button--pressed" : undefined,
            ].filter(Boolean).join(" ")}
            type="button"
            tabIndex={-1}
            aria-label={ariaLabel}
            onPointerDown={(event) => {
                if (!isPrimaryPointer(event)) {
                    return;
                }

                event.currentTarget.setPointerCapture(event.pointerId);
                setPressed(true);
                onPressStart?.();
            }}
            onPointerUp={() => {
                if (!pressed) {
                    return;
                }

                setPressed(false);
                onPress?.();
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
                className="calculator-app-button__image"
                src={src}
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
