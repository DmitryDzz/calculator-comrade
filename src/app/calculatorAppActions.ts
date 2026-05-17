import type { CalculatorAppSettings } from "../appSettings/calculatorAppSettings.ts";

export type MaybePromise<T> = T | Promise<T>;

export interface CalculatorAppActions {
    openHome: () => void;
    openHelp: () => void;
    openSettings: () => void;
    openLicense: () => void;
    openPrivacyPolicy: () => void;
    openTermsOfUse: () => void;
    isVibrationAvailable: () => boolean;
    loadSettings: () => MaybePromise<CalculatorAppSettings>;
    saveSettings: (settings: CalculatorAppSettings) => MaybePromise<void>;
    loadCalculatorDump: () => MaybePromise<Uint8Array | null>;
    saveCalculatorDump: (dump: Uint8Array) => MaybePromise<void>;
    clearCalculatorDump: () => MaybePromise<void>;
    rateApp: () => void;
    shareApp: () => void;
}
