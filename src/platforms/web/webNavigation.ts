export function navigateTo(url: string): void {
    window.history.pushState({ appNavigation: true }, "", url);
    notifyNavigationChanged();
}

export function replaceWith(url: string): void {
    window.history.replaceState({ appNavigation: true }, "", url);
    notifyNavigationChanged();
}

export function goBackOrReplace(fallbackUrl: string): void {
    if (window.history.state?.appNavigation === true) {
        window.history.back();
        return;
    }

    replaceWith(fallbackUrl);
}

export function subscribeToNavigationChanges(callback: () => void): () => void {
    window.addEventListener("popstate", callback);

    return () => {
        window.removeEventListener("popstate", callback);
    };
}

function notifyNavigationChanged(): void {
    window.dispatchEvent(new PopStateEvent("popstate"));
}
