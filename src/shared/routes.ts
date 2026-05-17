import { assetUrl } from "./assetUrl.ts";

export const routes = {
    home: assetUrl(""),
    calculator: assetUrl("calculator/"),
    privacy: assetUrl("privacy-policy/"),
    license: assetUrl("license/"),
    tips: assetUrl("tips-n-tricks/"),
};

export type RouteKey = keyof typeof routes;
