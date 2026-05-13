import { useCallback, useMemo } from "react";
import { CalculatorAudioFeedback } from "./calculatorAudioFeedback";

interface UseCalculatorAudioFeedbackResult {
    playCalculatorButtonDownSound: () => void;
    playCalculatorButtonUpSound: () => void;
    playAppButtonTapSound: () => void;
}

export function useCalculatorAudioFeedback(): UseCalculatorAudioFeedbackResult {
    /*
     * Later this value should come from user settings.
     */
    const soundEnabled = true;

    const audioFeedback = useMemo(() => {
        return new CalculatorAudioFeedback({
            soundEnabled,
        });
    }, [soundEnabled]);

    audioFeedback.setOptions({
        soundEnabled,
    });

    const playCalculatorButtonDownSound = useCallback(() => {
        audioFeedback.play("key-down");
    }, [audioFeedback]);

    const playCalculatorButtonUpSound = useCallback(() => {
        audioFeedback.play("key-up");
    }, [audioFeedback]);

    const playAppButtonTapSound = useCallback(() => {
        audioFeedback.play("tap");
    }, [audioFeedback]);

    return {
        playCalculatorButtonDownSound,
        playCalculatorButtonUpSound,
        playAppButtonTapSound,
    };
}
