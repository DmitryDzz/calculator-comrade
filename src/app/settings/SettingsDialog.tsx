import { useEffect, useRef, useState } from "react";
import type { CalculatorAppActions } from "../../platforms/calculatorAppActions.ts";
import type { CalculatorAppSettings } from "./calculatorAppSettings.ts";
import { assetUrl } from "../../shared/assetUrl.ts";
import * as React from "react";

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
    const contentRef = useRef<HTMLDivElement | null>(null);
    const scrollbarTrackRef = useRef<HTMLDivElement | null>(null);
    const [scrollbarState, setScrollbarState] = useState({
        visible: false,
        thumbHeight: 0,
        thumbTop: 0,
    });

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

    useEffect(() => {
        const content = contentRef.current;

        if (!content) {
            return undefined;
        }

        const updateScrollbar = () => {
            const content = contentRef.current;
            const track = scrollbarTrackRef.current;

            if (!content) {
                return;
            }

            const { clientHeight, scrollHeight, scrollTop } = content;
            const maxScrollTop = scrollHeight - clientHeight;

            if (maxScrollTop <= 1 || !track) {
                setScrollbarState({
                    visible: false,
                    thumbHeight: 0,
                    thumbTop: 0,
                });
                return;
            }

            const trackHeight = track.clientHeight;

            const thumbHeight = Math.max(
                28,
                (clientHeight / scrollHeight) * trackHeight,
            );

            const maxThumbTop = trackHeight - thumbHeight;

            const thumbTop =
                maxScrollTop > 0
                    ? (scrollTop / maxScrollTop) * maxThumbTop
                    : 0;

            setScrollbarState({
                visible: true,
                thumbHeight,
                thumbTop,
            });
        };
        updateScrollbar();

        const resizeObserver = new ResizeObserver(updateScrollbar);
        resizeObserver.observe(content);

        content.addEventListener("scroll", updateScrollbar, { passive: true });
        window.addEventListener("resize", updateScrollbar);

        return () => {
            content.removeEventListener("scroll", updateScrollbar);
            window.removeEventListener("resize", updateScrollbar);
            resizeObserver.disconnect();
        };
    }, [vibrationAvailable]);

    const openDocument = (open: () => void) => {
        open();
    };

    return (
        <div className="settings-dialog-backdrop" role="presentation">
            <section
                className="settings-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-dialog-title"
            >
                <header className="settings-dialog__header">
                    <button
                        className="settings-dialog__back-button"
                        type="button"
                        aria-label="Close settings"
                        onClick={onClose}
                    >
                        <span
                            className="settings-dialog__back-icon"
                            style={{
                                "--settings-back-icon-url": `url("${assetUrl("assets/settings/arrow-left.svg")}")`,
                            } as React.CSSProperties}
                            aria-hidden="true"
                        />
                    </button>
                    <h1 id="settings-dialog-title" className="settings-dialog__title">
                        SETTINGS
                    </h1>
                </header>

                <div ref={contentRef} className="settings-dialog__content">
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
                            onClick={() => openDocument(appActions.openLicense)}
                        />
                        <SettingLink
                            title="Privacy Policy"
                            onClick={() => openDocument(appActions.openPrivacyPolicy)}
                        />
                        <SettingLink
                            title="Terms of Use"
                            onClick={() => openDocument(appActions.openTermsOfUse)}
                        />
                    </div>

                    <div className="settings-group" aria-label="Version information">
                        <SettingValue title="Core version" value={coreVersion} />
                        <SettingValue title="App version" value={appVersion} />
                    </div>
                </div>

                <div
                    ref={scrollbarTrackRef}
                    className={[
                        "settings-dialog__scrollbar",
                        scrollbarState.visible ? "settings-dialog__scrollbar--visible" : "",
                    ].join(" ")}
                    aria-hidden="true"
                >
                    <div
                        className="settings-dialog__scrollbar-thumb"
                        style={{
                            height: `${scrollbarState.thumbHeight}px`,
                            transform: `translateY(${scrollbarState.thumbTop}px)`,
                        }}
                    />
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

function SettingSwitch({ title, checked, onChange }: SettingSwitchProps) {
    return (
        <label className="settings-row settings-row--switch">
            <span className="settings-row__title">{title}</span>

            <span className="settings-switch-control">
                <input
                    className="settings-switch"
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => onChange(event.target.checked)}
                />

                <SettingsToggleIcon checked={checked} />
            </span>
        </label>
    );
}

interface SettingsToggleIconProps {
    checked: boolean;
}

function SettingsToggleIcon({ checked }: SettingsToggleIconProps) {
    if (checked) {
        return (
            <svg
                className="settings-switch-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <rect
                    // className="settings-switch-icon__knob"
                    width="20"
                    height="14"
                    x="2"
                    y="5"
                    rx="7"
                />
                <circle
                    className="settings-switch-icon__knob"
                    cx="15"
                    cy="12"
                    r="4"
                    // fill="red"
                    stroke="none"
                />
            </svg>
        );
    }

    return (
        <svg
            className="settings-switch-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="9" cy="12" r="3" />
            <rect width="20" height="14" x="2" y="5" rx="7" />
        </svg>
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
            <span
                className="settings-dialog__chevron-right-icon"
                style={{
                    "--settings-chevron-right-icon-url": `url("${assetUrl("assets/settings/chevron-right.svg")}")`,
                } as React.CSSProperties}
                aria-hidden="true"
            />
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
