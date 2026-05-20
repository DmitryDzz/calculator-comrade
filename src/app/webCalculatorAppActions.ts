import {
    DEFAULT_CALCULATOR_APP_SETTINGS,
    type CalculatorAppSettings,
} from "../appSettings/calculatorAppSettings.ts";
import { createCalculatorSoundFeedback, type CalculatorSoundUrls } from "./calculatorSoundFeedback.ts";
import { createWebCalculatorSoundPlayer } from "./webCalculatorSoundPlayer.ts";
import { createWebCalculatorHapticFeedback } from "./webCalculatorHapticFeedback.ts";
import { assetUrl } from "../shared/assetUrl.ts";
import { routes } from "../shared/routes.ts";
import type { CalculatorAppActions } from "./calculatorAppActions.ts";

interface CreateWebCalculatorAppActionsOptions {
    openSettings?: () => void;
}

const SETTINGS_STORAGE_KEY = "calculator-comrade.settings.v1";
const CALCULATOR_DUMP_STORAGE_KEY = "calculator-comrade.calculator.dump.v1";

const WEB_CALCULATOR_SOUND_URLS: CalculatorSoundUrls = {
    "key-down": assetUrl("sounds/key-down.ogg"),
    "key-up": assetUrl("sounds/key-up.ogg"),
    "tap": assetUrl("sounds/tap.ogg"),
};

export function createWebCalculatorAppActions(
    options: CreateWebCalculatorAppActionsOptions = {},
): CalculatorAppActions {
    const initialSettings = loadCalculatorAppSettingsFromLocalStorage();
    const soundFeedback = createCalculatorSoundFeedback({
        initialSettings,
        soundPlayer: createWebCalculatorSoundPlayer(WEB_CALCULATOR_SOUND_URLS),
        soundUrls: WEB_CALCULATOR_SOUND_URLS,
    });
    const hapticFeedback = createWebCalculatorHapticFeedback(initialSettings);

    return {
        openHome: () => {
            window.location.assign(routes.home);
        },

        openHelp: () => {
            window.location.assign(routes.tips);
        },

        openSettings: options.openSettings ?? (() => {
            /*
             * The settings screen is provided by the app shell.
             */
        }),

        openLicense: () => {
            window.location.assign(routes.license);
        },

        openPrivacyPolicy: () => {
            window.location.assign(routes.privacy);
        },

        openTermsOfUse: () => {
            window.location.assign(routes.terms);
        },

        isVibrationAvailable: () => {
            return (
                typeof navigator !== "undefined" &&
                typeof navigator.vibrate === "function" &&
                isMobileLikeBrowser()
            );
        },

        loadSettings: () => loadCalculatorAppSettingsFromLocalStorage(),

        saveSettings: (settings: CalculatorAppSettings) => {
            soundFeedback.setSettings(settings);
            hapticFeedback.setSettings(settings);
            saveCalculatorAppSettingsToLocalStorage(settings);
        },

        playCalculatorButtonDownSound: () => {
            soundFeedback.playCalculatorButtonDownSound();
        },

        playCalculatorButtonUpSound: () => {
            soundFeedback.playCalculatorButtonUpSound();
        },

        playAppButtonTapSound: () => {
            soundFeedback.playAppButtonTapSound();
        },

        vibrateCalculatorButtonDown: () => {
            hapticFeedback.vibrateCalculatorButtonDown();
        },

        vibrateAppButtonTap: () => {
            hapticFeedback.vibrateAppButtonTap();
        },

        loadCalculatorDump: () => loadCalculatorDumpFromLocalStorage(),

        saveCalculatorDump: (dump: Uint8Array) => {
            saveCalculatorDumpToLocalStorage(dump);
        },

        clearCalculatorDump: () => {
            window.localStorage.removeItem(CALCULATOR_DUMP_STORAGE_KEY);
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

function loadCalculatorAppSettingsFromLocalStorage(): CalculatorAppSettings {
    try {
        const storedValue = window.localStorage.getItem(SETTINGS_STORAGE_KEY);

        if (storedValue === null) {
            return DEFAULT_CALCULATOR_APP_SETTINGS;
        }

        const parsedValue = JSON.parse(storedValue) as Partial<CalculatorAppSettings>;

        return normalizeCalculatorAppSettings(parsedValue);
    } catch {
        return DEFAULT_CALCULATOR_APP_SETTINGS;
    }
}

function saveCalculatorAppSettingsToLocalStorage(settings: CalculatorAppSettings): void {
    try {
        window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
        /*
         * Settings are useful, but calculator input must not depend on storage.
         */
    }
}

function normalizeCalculatorAppSettings(
    settings: Partial<CalculatorAppSettings>,
): CalculatorAppSettings {
    return {
        soundEnabled: typeof settings.soundEnabled === "boolean"
            ? settings.soundEnabled
            : DEFAULT_CALCULATOR_APP_SETTINGS.soundEnabled,
        vibrationEnabled: typeof settings.vibrationEnabled === "boolean"
            ? settings.vibrationEnabled
            : DEFAULT_CALCULATOR_APP_SETTINGS.vibrationEnabled,
    };
}

function loadCalculatorDumpFromLocalStorage(): Uint8Array | null {
    try {
        const encodedDump = window.localStorage.getItem(CALCULATOR_DUMP_STORAGE_KEY);

        if (encodedDump === null) {
            return null;
        }

        return decodeBase64ToBytes(encodedDump);
    } catch {
        return null;
    }
}

function saveCalculatorDumpToLocalStorage(dump: Uint8Array): void {
    try {
        window.localStorage.setItem(CALCULATOR_DUMP_STORAGE_KEY, encodeBytesToBase64(dump));
    } catch {
        /*
         * Stored state is useful, but calculator input must not depend on storage.
         */
    }
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

function encodeBytesToBase64(bytes: Uint8Array): string {
    let binary = "";

    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return window.btoa(binary);
}

function decodeBase64ToBytes(encoded: string): Uint8Array {
    const binary = window.atob(encoded);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
}
