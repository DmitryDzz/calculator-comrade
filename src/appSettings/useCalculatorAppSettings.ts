import { useCallback, useEffect, useState } from "react";
import type { CalculatorAppActions } from "../app/calculatorAppActions.ts";
import {
    DEFAULT_CALCULATOR_APP_SETTINGS,
    type CalculatorAppSettings,
} from "./calculatorAppSettings.ts";

export function useCalculatorAppSettings(appActions: CalculatorAppActions) {
    const [settings, setSettings] = useState<CalculatorAppSettings>(
        DEFAULT_CALCULATOR_APP_SETTINGS,
    );

    useEffect(() => {
        let disposed = false;

        void (async () => {
            try {
                const loadedSettings = await appActions.loadSettings();

                if (!disposed) {
                    setSettings(loadedSettings);
                }
            } catch (error: unknown) {
                console.warn("Stored app settings were ignored.", error);
            }
        })();

        return () => {
            disposed = true;
        };
    }, [appActions]);

    useEffect(() => {
        void (async () => {
            try {
                await appActions.saveSettings(settings);
            } catch (error: unknown) {
                console.warn("Failed to save app settings.", error);
            }
        })();
    }, [appActions, settings]);

    const setSoundEnabled = useCallback((soundEnabled: boolean) => {
        setSettings((currentSettings) => ({
            ...currentSettings,
            soundEnabled,
        }));
    }, []);

    const setVibrationEnabled = useCallback((vibrationEnabled: boolean) => {
        setSettings((currentSettings) => ({
            ...currentSettings,
            vibrationEnabled,
        }));
    }, []);

    return {
        settings,
        setSoundEnabled,
        setVibrationEnabled,
    };
}
