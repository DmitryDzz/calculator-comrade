import { routes } from "../shared/routes.ts";
import type { CalculatorAppActions } from "./calculatorAppActions.ts";

export function createWebCalculatorAppActions(): CalculatorAppActions {
    return {
        openHome: () => {
            window.location.assign(routes.home);
        },

        openHelp: () => {
            window.location.assign(routes.tips);
        },

        openSettings: () => {
            /*
             * The settings screen is not implemented yet.
             */
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
