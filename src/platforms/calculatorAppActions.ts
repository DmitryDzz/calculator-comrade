import type { CalculatorAppSettings } from "../app/settings/calculatorAppSettings.ts";

export type MaybePromise<T> = T | Promise<T>;

export interface CalculatorAppActions {
    openHome: () => void;
    openHelp: () => void;
    openSettings: () => void;
    openLicense: () => void;
    openPrivacyPolicy: () => void;
    openTermsOfUse: () => void;
    isVibrationAvailable: () => boolean;
    playCalculatorButtonDownSound: () => void;
    playCalculatorButtonUpSound: () => void;
    playAppButtonTapSound: () => void;
    vibrateCalculatorButtonDown: () => void;
    vibrateAppButtonTap: () => void;
    loadSettings: () => MaybePromise<CalculatorAppSettings>;
    saveSettings: (settings: CalculatorAppSettings) => MaybePromise<void>;
    loadCalculatorDump: () => MaybePromise<Uint8Array | null>;
    saveCalculatorDump: (dump: Uint8Array) => MaybePromise<void>;
    clearCalculatorDump: () => MaybePromise<void>;
    rateApp: () => void;
    shareApp: () => void;
}
