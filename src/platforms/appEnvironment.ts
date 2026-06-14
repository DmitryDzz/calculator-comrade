export const appBuildMode = import.meta.env.MODE;

export const isDesktopApp = appBuildMode === "desktop";
export const isAndroidApp = appBuildMode === "android";

export const isStandaloneApp = isDesktopApp || isAndroidApp;
