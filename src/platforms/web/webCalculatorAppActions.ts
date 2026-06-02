import {type CalculatorAppSettings} from "../../app/settings/calculatorAppSettings.ts";
import {createWebCalculatorSoundPlayer, type WebCalculatorSoundPlayer} from "./webCalculatorSoundPlayer.ts";
import { createWebCalculatorHapticFeedback } from "./webCalculatorHapticFeedback.ts";
import { routes } from "../../shared/routes.ts";
import { navigateTo } from "./webNavigation.ts";
import {
    type CalculatorAppActions, type CalculatorSoundType,
    type CreateCalculatorAppActionsOptions,
    WEB_CALCULATOR_SOUND_URLS
} from "../calculatorAppActions.ts";
import {
    clearCalculatorDumpInLocalStorage,
    loadCalculatorAppSettingsFromLocalStorage, loadCalculatorDumpFromLocalStorage,
    saveCalculatorAppSettingsToLocalStorage, saveCalculatorDumpToLocalStorage
} from "./webCalculatorStorage.ts";

export function createWebCalculatorAppActions(
    options: CreateCalculatorAppActionsOptions = {},
): CalculatorAppActions {
    let settings = loadCalculatorAppSettingsFromLocalStorage();
    const soundPlayer = createWebCalculatorSoundPlayer(WEB_CALCULATOR_SOUND_URLS);
    const hapticFeedback = createWebCalculatorHapticFeedback(settings);

    return {
        openHome: () => {
            navigateTo(routes.home);
        },

        openHelp: () => {
            navigateTo(routes.tips);
        },

        openSettings: options.openSettings ?? (() => {
            /*
             * The settings screen is provided by the app shell.
             */
        }),

        openLicense: () => {
            navigateTo(routes.license);
        },

        openPrivacyPolicy: () => {
            navigateTo(routes.privacy);
        },

        openTermsOfUse: () => {
            navigateTo(routes.terms);
        },

        isVibrationAvailable: () => {
            return (
                typeof navigator !== "undefined" &&
                typeof navigator.vibrate === "function" &&
                isMobileLikeBrowser()
            );
        },

        vibrateCalculatorButtonDown: () => {
            hapticFeedback.vibrateCalculatorButtonDown();
        },

        vibrateAppButtonTap: () => {
            hapticFeedback.vibrateAppButtonTap();
        },

        loadSettings: () => loadCalculatorAppSettingsFromLocalStorage(),

        saveSettings: (nextSettings: CalculatorAppSettings) => {
            settings = nextSettings;
            hapticFeedback.setSettings(nextSettings);
            saveCalculatorAppSettingsToLocalStorage(nextSettings);
        },

        playCalculatorButtonDownSound: async () => {
            await playSoundIfEnabledAsync(settings, soundPlayer, "key-down");
        },

        playCalculatorButtonUpSound: () => {
            /*
             * The current calculator design does not use a key-up sound.
             * Keep the platform action so other platforms can implement it later.
             */
        },

        playAppButtonTapSound: async () => {
            await playSoundIfEnabledAsync(settings, soundPlayer, "tap");
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
             * The web app is not distributed through an app store.
             */
        },

        shareApp: () => {
            if (!navigator.share) {
                return;
            }

            void navigator.share({
                title: "Calculator Comrade",
                text: "A free calculator with no ads and no in-app purchases.",
                url: routes.home,
            });
        },
    };
}

async function playSoundIfEnabledAsync(
    settings: CalculatorAppSettings,
    soundPlayer: WebCalculatorSoundPlayer,
    soundType: CalculatorSoundType,
): Promise<void> {
    if (!settings.soundEnabled) {
        return;
    }

    await soundPlayer.unlockAsync();
    await soundPlayer.playSoundAsync(WEB_CALCULATOR_SOUND_URLS[soundType]);
}

function isMobileLikeBrowser(): boolean {
    const navigatorLike = navigator as Navigator & {
        userAgentData?: {
            mobile?: boolean;
        };
    };

    // Chromium-based browsers: Chrome, Edge, Android WebView, etc.
    if (typeof navigatorLike.userAgentData?.mobile === "boolean") {
        return navigatorLike.userAgentData.mobile;
    }

    // Fallback for browsers without User-Agent Client Hints.
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
