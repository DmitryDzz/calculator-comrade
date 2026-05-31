import { invoke } from "@tauri-apps/api/core";

import type { CalculatorSoundType } from "../calculatorAppActions.ts";

export interface DesktopCalculatorSoundPlayer {
    playSound: (soundType: CalculatorSoundType) => void;
}

export function createDesktopCalculatorSoundPlayer(): DesktopCalculatorSoundPlayer {
    return {
        playSound: (soundType: CalculatorSoundType) => {
            void invoke("play_sound", { soundType }).catch((error: unknown) => {
                console.warn("Failed to play desktop sound:", error);
            });
        },
    };
}
