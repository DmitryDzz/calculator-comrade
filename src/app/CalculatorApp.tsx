import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CalculatorView from "../calculator/CalculatorView.tsx";
import { getCalculatorButtonCodeFromKeyboardEvent } from "../calculatorCore/calculatorKeyboardShortcuts.ts";
import { useCalculatorCore } from "../calculatorCore/useCalculatorCore.ts";
import { createWebLocalStorageCalculatorStateStorage } from "../calculatorCore/webLocalStorageCalculatorStateStorage.ts";
import type { CalculatorButtonCode } from "../calculatorCore/calculatorWasmTypes.ts";
import { useCalculatorAudioFeedback } from "../calculatorFeedback/useCalculatorAudioFeedback.ts";
import { useCalculatorHapticFeedback } from "../calculatorFeedback/useCalculatorHapticFeedback.ts";
import { currentAppPlatform } from "./appPlatform.ts";
import { createWebCalculatorAppActions } from "./webCalculatorAppActions.ts";
import { createCalculatorAppButtonActions } from "../calculator/calculatorAppButtonActions.ts";
import type {CalculatorAppActions} from "./calculatorAppActions.ts";
import type {CalculatorStateStorage} from "../calculatorCore/calculatorStateStorage.ts";

interface ActiveKeyboardPress {
    keyboardCode: string;
    buttonCode: CalculatorButtonCode;
}

const calculatorStateStorage: CalculatorStateStorage = createWebLocalStorageCalculatorStateStorage();
const appActions: CalculatorAppActions = createWebCalculatorAppActions();

export function CalculatorApp() {
    const calculator = useCalculatorCore(calculatorStateStorage);
    const audioFeedback = useCalculatorAudioFeedback();
    const hapticFeedback = useCalculatorHapticFeedback();

    const [pressedButtonCode, setPressedButtonCode] =
        useState<CalculatorButtonCode | null>(null);

    const activeKeyboardPressRef = useRef<ActiveKeyboardPress | null>(null);

    const handleCalculatorButtonPressStart = useCallback<
        (buttonCode: CalculatorButtonCode) => void
    >((buttonCode: CalculatorButtonCode) => {
        audioFeedback.playCalculatorButtonDownSound();
        hapticFeedback.vibrateCalculatorButtonDown();
        calculator.input(buttonCode);
    }, [audioFeedback, hapticFeedback, calculator]);

    const handleCalculatorButtonPress = useCallback<
        (buttonCode: CalculatorButtonCode) => void
    >(() => {
        audioFeedback.playCalculatorButtonUpSound();
    }, [audioFeedback]);

    const handleAppButtonPressStart = useCallback(() => {
        audioFeedback.playAppButtonTapSound();
        hapticFeedback.vibrateAppButtonTap();
    }, [audioFeedback, hapticFeedback]);

    const appButtonActions = useMemo(() => createCalculatorAppButtonActions({
        platform: currentAppPlatform,
        appActions,
    }), []);

    const calculatorButtonPressStartRef = useRef(handleCalculatorButtonPressStart);
    const calculatorButtonPressRef = useRef(handleCalculatorButtonPress);

    useEffect(() => {
        calculatorButtonPressStartRef.current = handleCalculatorButtonPressStart;
    }, [handleCalculatorButtonPressStart]);

    useEffect(() => {
        calculatorButtonPressRef.current = handleCalculatorButtonPress;
    }, [handleCalculatorButtonPress]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const buttonCode = getCalculatorButtonCodeFromKeyboardEvent(event);

            if (buttonCode === null) {
                return;
            }

            event.preventDefault();

            if (activeKeyboardPressRef.current !== null) {
                return;
            }

            activeKeyboardPressRef.current = {
                keyboardCode: event.code,
                buttonCode,
            };

            setPressedButtonCode(buttonCode);
            calculatorButtonPressStartRef.current(buttonCode);
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const activePress = activeKeyboardPressRef.current;

            if (activePress === null) {
                return;
            }

            if (event.code !== activePress.keyboardCode) {
                return;
            }

            event.preventDefault();

            activeKeyboardPressRef.current = null;
            setPressedButtonCode(null);

            calculatorButtonPressRef.current(activePress.buttonCode);
        };

        const handleWindowBlur = () => {
            activeKeyboardPressRef.current = null;
            setPressedButtonCode(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("blur", handleWindowBlur);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("blur", handleWindowBlur);
        };
    }, []);

    return (
        <main className="app">
            <CalculatorView
                display={calculator.display}
                onButtonPressStart={handleCalculatorButtonPressStart}
                onButtonPress={handleCalculatorButtonPress}
                pressedButtonCode={pressedButtonCode}
                appButtonActions={appButtonActions}
                onAppButtonPressStart={handleAppButtonPressStart}
            />
        </main>
    );
}
