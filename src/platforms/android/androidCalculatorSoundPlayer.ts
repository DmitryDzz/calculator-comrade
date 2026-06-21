import { registerPlugin } from "@capacitor/core";

import type { CalculatorSoundType } from "../calculatorAppActions.ts";

interface AndroidCalculatorSoundPlugin {
    preload: () => Promise<void>;
    play: (options: { soundType: CalculatorSoundType }) => Promise<void>;
}

export interface AndroidCalculatorSoundPlayer {
    playSound: (soundType: CalculatorSoundType) => void;
}

const AndroidCalculatorSound = registerPlugin<AndroidCalculatorSoundPlugin>(
    "AndroidCalculatorSound",
);

export function createAndroidCalculatorSoundPlayer(): AndroidCalculatorSoundPlayer {
    void AndroidCalculatorSound.preload().catch((error: unknown) => {
        console.warn("Failed to preload Android calculator sounds.", error);
    });

    return {
        playSound: (soundType: CalculatorSoundType) => {
            void AndroidCalculatorSound.play({ soundType }).catch((error: unknown) => {
                console.warn("Failed to play Android calculator sound.", error);
            });
        },
    };
}
