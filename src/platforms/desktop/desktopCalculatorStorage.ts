import {
    CALCULATOR_DUMP_STORAGE_KEY,
    type CalculatorAppSettings,
    DEFAULT_CALCULATOR_APP_SETTINGS, normalizeCalculatorAppSettings,
    SETTINGS_STORAGE_KEY
} from "../../app/settings/calculatorAppSettings.ts";
import {decodeBase64ToBytes, encodeBytesToBase64} from "../appPlatform.ts";

export function loadCalculatorAppSettingsFromLocalStorage(): CalculatorAppSettings {
    try {
        const storedValue = window.localStorage.getItem(SETTINGS_STORAGE_KEY);

        if (storedValue === null) {
            return DEFAULT_CALCULATOR_APP_SETTINGS;
        }

        const parsedValue = JSON.parse(storedValue) as Partial<CalculatorAppSettings>;

        return normalizeCalculatorAppSettings(parsedValue);
    } catch(e) {
        console.error(e);
        return DEFAULT_CALCULATOR_APP_SETTINGS;
    }
}

export function saveCalculatorAppSettingsToLocalStorage(settings: CalculatorAppSettings): void {
    try {
        window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch(e) {
        console.error(e);
        /*
         * Settings are useful, but calculator input must not depend on storage.
         */
    }
}

export function loadCalculatorDumpFromLocalStorage(): Uint8Array | null {
    try {
        const encodedDump = window.localStorage.getItem(CALCULATOR_DUMP_STORAGE_KEY);

        if (encodedDump === null) {
            return null;
        }

        return decodeBase64ToBytes(encodedDump);
    } catch(e) {
        console.error(e);
        return null;
    }
}

export function saveCalculatorDumpToLocalStorage(dump: Uint8Array): void {
    try {
        window.localStorage.setItem(CALCULATOR_DUMP_STORAGE_KEY, encodeBytesToBase64(dump));
    } catch(e) {
        console.error(e);
        /*
         * Stored state is useful, but calculator input must not depend on storage.
         */
    }
}

export function clearCalculatorDumpInLocalStorage(): void {
    try {
        window.localStorage.removeItem(CALCULATOR_DUMP_STORAGE_KEY);
    } catch(e) {
        console.error(e);
        /*
         * Stored state is useful, but calculator input must not depend on storage.
         */
    }
}
