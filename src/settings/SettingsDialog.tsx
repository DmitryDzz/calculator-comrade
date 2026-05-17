import { useEffect } from "react";
import type { CalculatorAppActions } from "../app/calculatorAppActions.ts";
import type { CalculatorAppSettings } from "../appSettings/calculatorAppSettings.ts";

interface SettingsDialogProps {
    settings: CalculatorAppSettings;
    vibrationAvailable: boolean;
    appVersion: string;
    coreVersion: string;
    appActions: CalculatorAppActions;
    onSoundEnabledChange: (enabled: boolean) => void;
    onVibrationEnabledChange: (enabled: boolean) => void;
    onClose: () => void;
}

export function SettingsDialog({
    settings,
    vibrationAvailable,
    appVersion,
    coreVersion,
    appActions,
    onSoundEnabledChange,
    onVibrationEnabledChange,
    onClose,
}: SettingsDialogProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") {
                return;
            }

            event.preventDefault();
            onClose();
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    const openAfterClose = (open: () => void) => {
        onClose();
        open();
    };

    return (
        <div className="settings-dialog-backdrop" role="presentation" onPointerDown={onClose}>
            <section
                className="settings-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-dialog-title"
                onPointerDown={(event) => event.stopPropagation()}
            >
                <header className="settings-dialog__header">
                    <button
                        className="settings-dialog__back-button"
                        type="button"
                        aria-label="Close settings"
                        onClick={onClose}
                    >
                        ←
                    </button>
                    <h1 id="settings-dialog-title" className="settings-dialog__title">
                        Settings
                    </h1>
                </header>

                <div className="settings-dialog__content">
                    <div className="settings-group" aria-label="Feedback settings">
                        <SettingSwitch
                            title="Sound"
                            // description="Play calculator button sounds."
                            checked={settings.soundEnabled}
                            onChange={onSoundEnabledChange}
                        />

                        <div hidden={!vibrationAvailable}>
                            <SettingSwitch
                                title="Vibration"
                                // description="Use short haptic feedback on supported devices."
                                checked={settings.vibrationEnabled}
                                onChange={onVibrationEnabledChange}
                            />
                        </div>
                    </div>

                    <div className="settings-group" aria-label="Documents">
                        <SettingLink
                            title="License"
                            onClick={() => openAfterClose(appActions.openLicense)}
                        />
                        <SettingLink
                            title="Privacy Policy"
                            onClick={() => openAfterClose(appActions.openPrivacyPolicy)}
                        />
                        <SettingLink
                            title="Terms of Use"
                            onClick={() => openAfterClose(appActions.openTermsOfUse)}
                        />
                    </div>

                    <div className="settings-group" aria-label="Version information">
                        <SettingValue title="Core version" value={coreVersion} />
                        <SettingValue title="App version" value={appVersion} />
                    </div>
                </div>
            </section>
        </div>
    );
}

interface SettingSwitchProps {
    title: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

function SettingSwitch({ title, description, checked, onChange }: SettingSwitchProps) {
    return (
        <label className="settings-row settings-row--switch">
            <span className="settings-row__text">
                <span className="settings-row__title">{title}</span>
                {description && <span className="settings-row__description">{description}</span>}
            </span>
            <input
                className="settings-switch"
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.currentTarget.checked)}
            />
        </label>
    );
}

interface SettingLinkProps {
    title: string;
    onClick: () => void;
}

function SettingLink({ title, onClick }: SettingLinkProps) {
    return (
        <button className="settings-row settings-row--link" type="button" onClick={onClick}>
            <span className="settings-row__title">{title}</span>
            <span className="settings-row__chevron" aria-hidden="true">›</span>
        </button>
    );
}

interface SettingValueProps {
    title: string;
    value: string;
}

function SettingValue({ title, value }: SettingValueProps) {
    return (
        <div className="settings-row settings-row--value">
            <span className="settings-row__title">{title}</span>
            <span className="settings-row__value">{value}</span>
        </div>
    );
}
