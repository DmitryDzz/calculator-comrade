import type { CalculatorAppSettings } from "../appSettings/calculatorAppSettings.ts";

export type CalculatorSoundType =
    | "key-down"
    | "key-up"
    | "tap";

export type CalculatorSoundUrls = Record<CalculatorSoundType, string>;

export interface CalculatorSoundPlayer {
    playSound: (soundUrl: string) => void;
}

export interface CalculatorSoundFeedback {
    setSettings: (settings: CalculatorAppSettings) => void;
    playCalculatorButtonDownSound: () => void;
    playCalculatorButtonUpSound: () => void;
    playAppButtonTapSound: () => void;
}

interface CreateCalculatorSoundFeedbackOptions {
    initialSettings: CalculatorAppSettings;
    soundPlayer: CalculatorSoundPlayer;
    soundUrls: CalculatorSoundUrls;
}

export function createCalculatorSoundFeedback(
    options: CreateCalculatorSoundFeedbackOptions,
): CalculatorSoundFeedback {
    let settings = options.initialSettings;

    return {
        setSettings: (nextSettings: CalculatorAppSettings) => {
            settings = nextSettings;
        },

        playCalculatorButtonDownSound: () => {
            playSound(options.soundPlayer, options.soundUrls, settings, "key-down");
        },

        playCalculatorButtonUpSound: () => {
            /*
             * The current calculator design does not use a key-up sound.
             * Keep the platform action so other platforms can implement it later.
             */
        },

        playAppButtonTapSound: () => {
            playSound(options.soundPlayer, options.soundUrls, settings, "tap");
        },
    };
}

function playSound(
    soundPlayer: CalculatorSoundPlayer,
    soundUrls: CalculatorSoundUrls,
    settings: CalculatorAppSettings,
    soundType: CalculatorSoundType,
): void {
    if (!settings.soundEnabled) {
        return;
    }

    soundPlayer.playSound(soundUrls[soundType]);
}
