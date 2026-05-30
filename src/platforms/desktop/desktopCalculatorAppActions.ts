import type { CalculatorAppSettings } from "../../app/settings/calculatorAppSettings.ts";
import {
    type CalculatorAppActions,
    type CalculatorSoundType,
    type CreateCalculatorAppActionsOptions,
    WEB_CALCULATOR_SOUND_URLS,
} from "../calculatorAppActions.ts";
import {
    createWebCalculatorSoundPlayer,
    type WebCalculatorSoundPlayer,
} from "../web/webCalculatorSoundPlayer.ts";
import {
    clearCalculatorDumpInLocalStorage,
    loadCalculatorAppSettingsFromLocalStorage,
    loadCalculatorDumpFromLocalStorage,
    saveCalculatorAppSettingsToLocalStorage,
    saveCalculatorDumpToLocalStorage,
} from "./desktopCalculatorStorage.ts";

export function createDesktopCalculatorAppActions(
    options: CreateCalculatorAppActionsOptions = {},
): CalculatorAppActions {
    let settings = loadCalculatorAppSettingsFromLocalStorage();
    const soundPlayer = createWebCalculatorSoundPlayer(WEB_CALCULATOR_SOUND_URLS);

    return {
        openHome: () => {
            /*
             * In the desktop shell, site pages should be opened in the system
             * browser later through a platform-specific external-link action.
             */
        },

        openHelp: () => {
            /*
             * In the desktop shell, help should be opened in the system browser later.
             */
        },

        openSettings: options.openSettings ?? (() => {
            /*
             * The settings screen is provided by the app shell.
             */
        }),

        openLicense: () => {
            /*
             * Open externally later through the desktop platform layer.
             */
        },

        openPrivacyPolicy: () => {
            /*
             * Open externally later through the desktop platform layer.
             */
        },

        openTermsOfUse: () => {
            /*
             * Open externally later through the desktop platform layer.
             */
        },

        isVibrationAvailable: () => false,

        vibrateCalculatorButtonDown: () => {
            /*
             * Desktop shell has no haptic feedback.
             */
        },

        vibrateAppButtonTap: () => {
            /*
             * Desktop shell has no haptic feedback.
             */
        },

        loadSettings: () => loadCalculatorAppSettingsFromLocalStorage(),

        saveSettings: (nextSettings: CalculatorAppSettings) => {
            settings = nextSettings;
            saveCalculatorAppSettingsToLocalStorage(nextSettings);
        },

        playCalculatorButtonDownSound: () => {
            playSoundIfEnabled(settings, soundPlayer, "key-down");
        },

        playCalculatorButtonUpSound: () => {
            /*
             * The current calculator design does not use a key-up sound.
             * Keep the platform action so other platforms can implement it later.
             */
        },

        playAppButtonTapSound: () => {
            playSoundIfEnabled(settings, soundPlayer, "tap");
        },

        loadCalculatorDump: () => loadCalculatorDumpFromLocalStorage(),

        saveCalculatorDump: (dump: Uint8Array) => {
            saveCalculatorDumpToLocalStorage(dump);
        },

        clearCalculatorDump: () => {
            clearCalculatorDumpInLocalStorage();
        },

        rateApp: () => {
            /*
             * Desktop shell is not distributed through an app store yet.
             */
        },

        shareApp: () => {
            /*
             * Desktop sharing can be added later through a platform-specific layer.
             */
        },
    };
}

function playSoundIfEnabled(
    settings: CalculatorAppSettings,
    soundPlayer: WebCalculatorSoundPlayer,
    soundType: CalculatorSoundType,
): void {
    if (!settings.soundEnabled) {
        return;
    }

    soundPlayer.playSound(WEB_CALCULATOR_SOUND_URLS[soundType]);
}
