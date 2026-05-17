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

const calculatorStateStorage: CalculatorStateStorage = createWebLocalStorageCalculatorStateStorage();
const appActions: CalculatorAppActions = createWebCalculatorAppActions();

export function CalculatorApp() {
    const calculator = useCalculatorCore(calculatorStateStorage);
    const audioFeedback = useCalculatorAudioFeedback();
    const hapticFeedback = useCalculatorHapticFeedback();

    const [pressedKeyboardButtonCodes, setPressedKeyboardButtonCodes] =
        useState<CalculatorButtonCode[]>([]);

    const activeKeyboardPressesRef = useRef<Map<string, CalculatorButtonCode>>(new Map());

    const updatePressedKeyboardButtonCodes = useCallback(() => {
        setPressedKeyboardButtonCodes([
            ...activeKeyboardPressesRef.current.values(),
        ]);
    }, []);

    const isButtonPressed = useCallback(
        (buttonCode: CalculatorButtonCode): boolean =>
            pressedKeyboardButtonCodes.includes(buttonCode),
        [pressedKeyboardButtonCodes],
    );

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

            if (event.repeat) {
                return;
            }

            const activeKeyboardPresses = activeKeyboardPressesRef.current;

            if (activeKeyboardPresses.has(event.code)) {
                return;
            }

            activeKeyboardPresses.set(event.code, buttonCode);
            updatePressedKeyboardButtonCodes();

            calculatorButtonPressStartRef.current(buttonCode);
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const activeKeyboardPresses = activeKeyboardPressesRef.current;
            const buttonCode = activeKeyboardPresses.get(event.code);

            if (buttonCode === undefined) {
                return;
            }

            event.preventDefault();

            activeKeyboardPresses.delete(event.code);
            updatePressedKeyboardButtonCodes();

            calculatorButtonPressRef.current(buttonCode);
        };

        const handleWindowBlur = () => {
            activeKeyboardPressesRef.current.clear();
            updatePressedKeyboardButtonCodes();
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("blur", handleWindowBlur);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("blur", handleWindowBlur);
        };
    }, [updatePressedKeyboardButtonCodes]);

    return (
        <main className="app">
            <CalculatorView
                display={calculator.display}
                onButtonPressStart={handleCalculatorButtonPressStart}
                onButtonPress={handleCalculatorButtonPress}
                isButtonPressed={isButtonPressed}
                appButtonActions={appButtonActions}
                onAppButtonPressStart={handleAppButtonPressStart}
            />
        </main>
    );
}
