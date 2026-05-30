export const SETTINGS_STORAGE_KEY = "calculator-comrade.settings.v1.0";
export const CALCULATOR_DUMP_STORAGE_KEY = "calculator-comrade.calculator.dump.v1.0";

export interface CalculatorAppSettings {
    soundEnabled: boolean;
    vibrationEnabled: boolean;
}

export const DEFAULT_CALCULATOR_APP_SETTINGS: CalculatorAppSettings = {
    soundEnabled: true,
    vibrationEnabled: true,
};

export function normalizeCalculatorAppSettings(
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
