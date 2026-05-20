import type { CalculatorAppSettings } from "../appSettings/calculatorAppSettings.ts";

type CalculatorHapticType =
    | "key-down"
    | "tap";

export interface WebCalculatorHapticFeedback {
    setSettings: (settings: CalculatorAppSettings) => void;
    vibrateCalculatorButtonDown: () => void;
    vibrateAppButtonTap: () => void;
}

const HAPTIC_PATTERNS: Record<CalculatorHapticType, number | number[]> = {
    "key-down": 12,
    "tap": 8,
};

export function createWebCalculatorHapticFeedback(
    initialSettings: CalculatorAppSettings,
): WebCalculatorHapticFeedback {
    let settings = initialSettings;

    return {
        setSettings: (nextSettings: CalculatorAppSettings) => {
            settings = nextSettings;
        },

        vibrateCalculatorButtonDown: () => {
            vibrate(settings, "key-down");
        },

        vibrateAppButtonTap: () => {
            vibrate(settings, "tap");
        },
    };
}

function vibrate(settings: CalculatorAppSettings, hapticType: CalculatorHapticType): void {
    if (!settings.vibrationEnabled) {
        return;
    }

    if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
        return;
    }

    try {
        navigator.vibrate(HAPTIC_PATTERNS[hapticType]);
    } catch {
        /*
         * Vibration is optional feedback.
         * It must never break calculator input.
         */
    }
}
