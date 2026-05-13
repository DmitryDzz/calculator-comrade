export type CalculatorHapticType =
    | "key-down"
    | "tap";

export interface CalculatorHapticFeedbackOptions {
    vibrationEnabled: boolean;
}

const HAPTIC_PATTERNS: Record<CalculatorHapticType, number | number[]> = {
    "key-down": 12,
    "tap": 8,
};

export class CalculatorHapticFeedback {
    private options: CalculatorHapticFeedbackOptions;

    public constructor(options: CalculatorHapticFeedbackOptions) {
        this.options = options;
    }

    public setOptions(options: CalculatorHapticFeedbackOptions): void {
        this.options = options;
    }

    public vibrate(hapticType: CalculatorHapticType): void {
        if (!this.options.vibrationEnabled) {
            return;
        }

        if (!("vibrate" in navigator)) {
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
}
