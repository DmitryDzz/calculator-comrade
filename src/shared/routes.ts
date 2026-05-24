import { assetUrl } from "./assetUrl.ts";

export const routes = {
    home: assetUrl(""),
    calculator: assetUrl("calculator/"),
    calculatorSettings: assetUrl("calculator/settings/"),
    privacy: assetUrl("privacy-policy/"),
    terms: assetUrl("terms-of-use/"),
    license: assetUrl("license/"),
    tips: assetUrl("tips-n-tricks/"),
};

export type RouteKey = keyof typeof routes;
