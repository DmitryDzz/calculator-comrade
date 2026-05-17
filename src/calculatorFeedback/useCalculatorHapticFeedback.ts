import { useCallback, useMemo } from "react";
import { CalculatorHapticFeedback } from "./calculatorHapticFeedback";

interface UseCalculatorHapticFeedbackResult {
    vibrationSupported: boolean;
    vibrateCalculatorButtonDown: () => void;
    vibrateAppButtonTap: () => void;
}

export function useCalculatorHapticFeedback(
    vibrationEnabled: boolean,
): UseCalculatorHapticFeedbackResult {
    const vibrationSupported = "vibrate" in navigator;

    const hapticFeedback = useMemo(() => {
        return new CalculatorHapticFeedback({
            vibrationEnabled: vibrationSupported && vibrationEnabled,
        });
    }, [vibrationEnabled, vibrationSupported]);

    hapticFeedback.setOptions({
        vibrationEnabled: vibrationSupported && vibrationEnabled,
    });

    const vibrateCalculatorButtonDown = useCallback(() => {
        hapticFeedback.vibrate("key-down");
    }, [hapticFeedback]);

    const vibrateAppButtonTap = useCallback(() => {
        hapticFeedback.vibrate("tap");
    }, [hapticFeedback]);

    return {
        vibrationSupported,
        vibrateCalculatorButtonDown,
        vibrateAppButtonTap,
    };
}
