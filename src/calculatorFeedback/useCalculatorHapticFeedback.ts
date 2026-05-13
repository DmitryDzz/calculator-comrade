import { useCallback, useMemo } from "react";
import { CalculatorHapticFeedback } from "./calculatorHapticFeedback";

interface UseCalculatorHapticFeedbackResult {
    vibrateCalculatorButtonDown: () => void;
    vibrateAppButtonTap: () => void;
}

export function useCalculatorHapticFeedback(): UseCalculatorHapticFeedbackResult {
    /*
     * Later this value should come from user settings.
     *
     * For now it is enabled. Unsupported browsers/devices will simply ignore it.
     */
    const vibrationEnabled = true;

    const hapticFeedback = useMemo(() => {
        return new CalculatorHapticFeedback({
            vibrationEnabled,
        });
    }, [vibrationEnabled]);

    hapticFeedback.setOptions({
        vibrationEnabled,
    });

    const vibrateCalculatorButtonDown = useCallback(() => {
        hapticFeedback.vibrate("key-down");
    }, [hapticFeedback]);

    const vibrateAppButtonTap = useCallback(() => {
        hapticFeedback.vibrate("tap");
    }, [hapticFeedback]);

    return {
        vibrateCalculatorButtonDown,
        vibrateAppButtonTap,
    };
}
