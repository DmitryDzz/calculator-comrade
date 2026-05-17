import { assetUrl } from "../shared/assetUrl.ts";
import { useLayoutEffect, useRef, useState } from "react";
import { CalculatorAppButtons } from "./CalculatorAppButtons.tsx";
import { CalculatorDisplay } from "./CalculatorDisplay.tsx";
import { CalculatorKeyboard } from "./CalculatorKeyboard.tsx";
import {
    CALCULATOR_BODY_HEIGHT,
    CALCULATOR_BODY_WIDTH,
} from "../calculatorCore/calculatorGeometry.ts";
import type { CalculatorDisplaySnapshot } from "../calculatorCore/calculatorWasmClient.ts";
import type { CalculatorButtonCode } from "../calculatorCore/calculatorWasmTypes.ts";
import type { CalculatorAppButtonAction } from "./calculatorAppButtonActions.ts";

interface CalculatorViewProps {
    display: CalculatorDisplaySnapshot | null;
    onButtonPressStart: (buttonCode: CalculatorButtonCode) => void;
    onButtonPress: (buttonCode: CalculatorButtonCode) => void;
    isButtonPressed: (buttonCode: CalculatorButtonCode) => boolean;
    appButtonActions: CalculatorAppButtonAction[];
    onAppButtonPressStart: () => void;
}

function CalculatorView({
    display,
    onButtonPressStart,
    onButtonPress,
    isButtonPressed,
    appButtonActions,
    onAppButtonPressStart,
}: CalculatorViewProps) {
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
                            src={assetUrl("assets/calculator/body.webp")}
                            alt=""
                            draggable={false}
                        />

                        <CalculatorDisplay display={display} />
                        <CalculatorKeyboard
                            onButtonPressStart={onButtonPressStart}
                            onButtonPress={onButtonPress}
                            isButtonPressed={isButtonPressed}
                        />
                        <CalculatorAppButtons
                            actions={appButtonActions}
                            onPressStart={onAppButtonPressStart}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

export default CalculatorView
