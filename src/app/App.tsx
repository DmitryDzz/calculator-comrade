import { useCallback, useEffect, useRef, useState } from "react";
import { CalculatorView } from "../calculator/CalculatorView";
import { getCalculatorButtonCodeFromKeyboardEvent } from "../calculatorCore/calculatorKeyboardShortcuts";
import { useCalculatorCore } from "../calculatorCore/useCalculatorCore";
import type { CalculatorButtonCode } from "../calculatorCore/calculatorWasmTypes";

const KEYBOARD_PRESS_VISUAL_DELAY_MS = 90;

export function App() {
    const calculator = useCalculatorCore();

    const [pressedButtonCode, setPressedButtonCode] =
        useState<CalculatorButtonCode | null>(null);

    const calculatorInputRef = useRef(calculator.input);
    const keyboardPressTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        calculatorInputRef.current = calculator.input;
    }, [calculator.input]);

    const flashButton = useCallback((buttonCode: CalculatorButtonCode) => {
        setPressedButtonCode(buttonCode);

        if (keyboardPressTimeoutRef.current !== null) {
            window.clearTimeout(keyboardPressTimeoutRef.current);
        }

        keyboardPressTimeoutRef.current = window.setTimeout(() => {
            setPressedButtonCode(null);
            keyboardPressTimeoutRef.current = null;
        }, KEYBOARD_PRESS_VISUAL_DELAY_MS);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const buttonCode = getCalculatorButtonCodeFromKeyboardEvent(event);

            if (buttonCode === null) {
                return;
            }

            event.preventDefault();

            calculatorInputRef.current(buttonCode);
            flashButton(buttonCode);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [flashButton]);

    useEffect(() => {
        return () => {
            if (keyboardPressTimeoutRef.current !== null) {
                window.clearTimeout(keyboardPressTimeoutRef.current);
                keyboardPressTimeoutRef.current = null;
            }
        };
    }, []);

    return (
        <main className="app">
            <CalculatorView
                display={calculator.display}
                onButtonPress={calculator.input}
                pressedButtonCode={pressedButtonCode}
            />
        </main>
    );
}
