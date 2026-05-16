import type { AppPlatform } from "../app/appPlatform.ts";
import type { CalculatorAppActions } from "../app/calculatorAppActions.ts";
import { assetUrl } from "../shared/assetUrl.ts";

export type CalculatorAppButtonActionId =
    | "home"
    | "help"
    | "settings"
    | "rateApp"
    | "shareApp";

export interface CalculatorAppButtonAction {
    id: CalculatorAppButtonActionId;
    ariaLabel: string;
    src: string | null;
    onPress: () => void;
}

interface CreateCalculatorAppButtonActionsOptions {
    platform: AppPlatform;
    appActions: CalculatorAppActions;
    wasRateAppButtonUsed?: boolean;
}

export function createCalculatorAppButtonActions({
    platform,
    appActions,
    wasRateAppButtonUsed = false,
}: CreateCalculatorAppButtonActionsOptions): CalculatorAppButtonAction[] {
    if (platform === "android") {
        const primaryAction: CalculatorAppButtonAction = wasRateAppButtonUsed
            ? {
                id: "shareApp",
                ariaLabel: "Share app",
                src: getPlatformAppButtonIcon(platform, "shareApp"),
                onPress: appActions.shareApp,
            }
            : {
                id: "rateApp",
                ariaLabel: "Rate app",
                src: getPlatformAppButtonIcon(platform, "rateApp"),
                onPress: appActions.rateApp,
            };

        return [
            primaryAction,
            {
                id: "help",
                ariaLabel: "Help",
                src: getPlatformAppButtonIcon(platform, "help"),
                onPress: appActions.openHelp,
            },
            {
                id: "settings",
                ariaLabel: "Settings",
                src: getPlatformAppButtonIcon(platform, "settings"),
                onPress: appActions.openSettings,
            },
        ];
    }

    return [
        {
            id: "home",
            ariaLabel: "Home",
            src: getPlatformAppButtonIcon(platform, "home"),
            onPress: appActions.openHome,
        },
        {
            id: "help",
            ariaLabel: "Help",
            src: getPlatformAppButtonIcon(platform, "help"),
            onPress: appActions.openHelp,
        },
        {
            id: "settings",
            ariaLabel: "Settings",
            src: getPlatformAppButtonIcon(platform, "settings"),
            onPress: appActions.openSettings,
        },
    ];
}

function getPlatformAppButtonIcon(
    platform: AppPlatform,
    actionId: CalculatorAppButtonActionId,
): string | null {
    if (platform === "ios" && actionId === "shareApp") {
        return assetUrl("assets/calculator/buttons/app_button_share_ios.svg");
    }

    return commonAppButtonIcons[actionId];
}

const commonAppButtonIcons: Record<CalculatorAppButtonActionId, string | null> = {
    home: assetUrl("assets/calculator/buttons/app_button_home.svg"),
    help: assetUrl("assets/calculator/buttons/app_button_help.svg"),
    settings: assetUrl("assets/calculator/buttons/app_button_settings.svg"),
    rateApp: null,
    shareApp: null,
};
