import { useCallback, useEffect, useRef, useState } from "react";
import CalculatorView from "../calculator/CalculatorView";
import { getCalculatorButtonCodeFromKeyboardEvent } from "../calculatorCore/calculatorKeyboardShortcuts";
import { useCalculatorCore } from "../calculatorCore/useCalculatorCore";
import type { CalculatorButtonCode } from "../calculatorCore/calculatorWasmTypes";
import {useCalculatorAudioFeedback} from "../calculatorFeedback/useCalculatorAudioFeedback.ts";

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

    const audioFeedback = useCalculatorAudioFeedback();

    const handleCalculatorButtonPressStart = useCallback(() => {
        audioFeedback.playCalculatorButtonDownSound();
    }, [audioFeedback]);

    const handleCalculatorButtonPress = useCallback((buttonCode: CalculatorButtonCode) => {
        audioFeedback.playCalculatorButtonUpSound();
        calculator.input(buttonCode);
    }, [audioFeedback, calculator]);

    const pressKeyboardButton = useCallback((buttonCode: CalculatorButtonCode) => {
        setPressedButtonCode(buttonCode);
        audioFeedback.playCalculatorButtonDownSound();

        if (keyboardPressTimeoutRef.current !== null) {
            window.clearTimeout(keyboardPressTimeoutRef.current);
        }

        keyboardPressTimeoutRef.current = window.setTimeout(() => {
            setPressedButtonCode(null);
            audioFeedback.playCalculatorButtonUpSound();
            calculatorInputRef.current(buttonCode);
            keyboardPressTimeoutRef.current = null;
        }, KEYBOARD_PRESS_VISUAL_DELAY_MS);
    }, [audioFeedback]);

    const handleOptionsButtonPressStart = useCallback(() => {
        audioFeedback.playAppButtonTapSound();
    }, [audioFeedback]);

    const handleOptionsButtonPress = useCallback(() => {
        // audioFeedback.playAppButtonTapSound();
    }, [audioFeedback]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const buttonCode = getCalculatorButtonCodeFromKeyboardEvent(event);

            if (event.repeat) {
                return;
            }

            if (buttonCode === null) {
                return;
            }

            event.preventDefault();

            calculatorInputRef.current(buttonCode);
            pressKeyboardButton(buttonCode);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [pressKeyboardButton]);

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
                onButtonPressStart={handleCalculatorButtonPressStart}
                onButtonPress={handleCalculatorButtonPress}
                pressedButtonCode={pressedButtonCode}
                onAppButtonPressStart={handleOptionsButtonPressStart}
                onAppButtonPress={handleOptionsButtonPress}
            />
        </main>
    );
}
