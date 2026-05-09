import { useEffect, useRef, useState } from "react";
import {
    CALCULATOR_BODY_HEIGHT,
    CALCULATOR_BODY_WIDTH,
} from "./calculatorGeometry";
import { CalculatorKeyboard } from "./CalculatorKeyboard";
import { CalculatorDisplay } from "./CalculatorDisplay";
import {CalculatorAppButtons} from "./CalculatorAppButtons.tsx";

export function CalculatorView() {
    const shellRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const shell = shellRef.current;
        if (!shell) {
            return;
        }

        const updateScale = () => {
            const rect = shell.getBoundingClientRect();
            setScale(rect.width / CALCULATOR_BODY_WIDTH);
        };

        updateScale();

        const resizeObserver = new ResizeObserver(updateScale);
        resizeObserver.observe(shell);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <section className="calculator-view" aria-label="Calculator">
            <div ref={shellRef} className="calculator-shell">
                <div
                    className="calculator-stage"
                    style={{
                        width: CALCULATOR_BODY_WIDTH,
                        height: CALCULATOR_BODY_HEIGHT,
                        transform: `scale(${scale})`,
                    }}
                >
                    <img
                        className="calculator-body"
                        src="/assets/calculator/body.webp"
                        alt=""
                        draggable={false}
                    />

                    <CalculatorKeyboard />
                    <CalculatorDisplay />
                    <CalculatorAppButtons />

                </div>
            </div>
        </section>
    );
}