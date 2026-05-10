import { useLayoutEffect, useRef, useState } from "react";
import { CalculatorAppButtons } from "./CalculatorAppButtons.tsx";
import { CalculatorDisplay } from "./CalculatorDisplay.tsx";
import { CalculatorKeyboard } from "./CalculatorKeyboard.tsx";
import {
    CALCULATOR_BODY_HEIGHT,
    CALCULATOR_BODY_WIDTH,
} from "./calculatorGeometry.ts";
import type { CalculatorDisplaySnapshot } from "../calculatorCore/calculatorWasmClient.ts";
import type { CalculatorButtonCode } from "../calculatorCore/calculatorWasmTypes.ts";

interface CalculatorViewProps {
    display: CalculatorDisplaySnapshot | null;
    onButtonPress: (buttonCode: CalculatorButtonCode) => void;
}

export function CalculatorView({ display, onButtonPress }: CalculatorViewProps) {
    const shellRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState<number | null>(null);

    useLayoutEffect(() => {
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
                {scale !== null && (
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

                        <CalculatorDisplay display={display} />
                        <CalculatorKeyboard onButtonPress={onButtonPress} />
                        <CalculatorAppButtons />
                    </div>
                )}
            </div>
        </section>
    );
}
