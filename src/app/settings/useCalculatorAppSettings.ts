import { useCallback, useEffect, useState } from "react";
import type { CalculatorAppActions } from "../../platforms/calculatorAppActions.ts";
import {
    DEFAULT_CALCULATOR_APP_SETTINGS,
    type CalculatorAppSettings,
} from "./calculatorAppSettings.ts";

export function useCalculatorAppSettings(appActions: CalculatorAppActions) {
    const [settings, setSettings] = useState<CalculatorAppSettings>(
        DEFAULT_CALCULATOR_APP_SETTINGS,
    );
    const [settingsLoaded, setSettingsLoaded] = useState(false);

    useEffect(() => {
        let disposed = false;

        void (async () => {
            try {
                const loadedSettings = await appActions.loadSettings();

                if (!disposed) {
                    setSettings(loadedSettings);
                    setSettingsLoaded(true);
                }
            } catch (error: unknown) {
                console.warn("Stored app settings were ignored.", error);

                if (!disposed) {
                    setSettings(DEFAULT_CALCULATOR_APP_SETTINGS);
                    setSettingsLoaded(true);
                }
            }
        })();

        return () => {
            disposed = true;
        };
    }, [appActions]);

    useEffect(() => {
        if (!settingsLoaded) {
            return;
        }

        void (async () => {
            try {
                await appActions.saveSettings(settings);
            } catch (error: unknown) {
                console.warn("Failed to save app settings.", error);
            }
        })();
    }, [appActions, settings, settingsLoaded]);

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
        settingsLoaded,
        setSoundEnabled,
        setVibrationEnabled,
    };
}
