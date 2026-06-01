import { getCurrentWindow } from "@tauri-apps/api/window";

// function getElementSize(selector: string): string | null {
//     const element = document.querySelector(selector);
//
//     if (!(element instanceof Element)) {
//         return null;
//     }
//
//     const rect = element.getBoundingClientRect();
//
//     return `${Math.round(rect.width)}x${Math.round(rect.height)}`;
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function logDesktopWindowSize(_reason: string): Promise<void> {
    // const currentWindow = getCurrentWindow();
    //
    // const outerSize = await currentWindow.outerSize();
    // const innerSize = await currentWindow.innerSize();
    // const scaleFactor = await currentWindow.scaleFactor();
    //
    // console.log(`[Desktop window size] ${reason}`, {
    //     scaleFactor,
    //
    //     tauriOuterPhysical: `${outerSize.width}x${outerSize.height}`,
    //     tauriInnerPhysical: `${innerSize.width}x${innerSize.height}`,
    //
    //     browserInnerCss: `${window.innerWidth}x${window.innerHeight}`,
    //     browserOuterCss: `${window.outerWidth}x${window.outerHeight}`,
    //     devicePixelRatio: window.devicePixelRatio,
    //
    //     calculatorShellCss: getElementSize(".calculator-shell"),
    //     settingsDialogCss: getElementSize(".settings-dialog"),
    // });
}

export function listenDesktopWindowSize(): () => void {
    let disposed = false;
    let unlistenTauriResize: (() => void) | undefined;
    let debounceTimeoutId: number | undefined;

    const logDebounced = (reason: string) => {
        if (debounceTimeoutId !== undefined) {
            window.clearTimeout(debounceTimeoutId);
        }

        debounceTimeoutId = window.setTimeout(() => {
            void logDesktopWindowSize(reason);
        }, 150);
    };

    void logDesktopWindowSize("initial");

    const handleBrowserResize = () => {
        logDebounced("browser resize");
    };

    window.addEventListener("resize", handleBrowserResize);

    void getCurrentWindow().onResized(() => {
        logDebounced("tauri resize");
    }).then((unlisten) => {
        if (disposed) {
            unlisten();
            return;
        }

        unlistenTauriResize = unlisten;
    });

    return () => {
        disposed = true;

        window.removeEventListener("resize", handleBrowserResize);

        if (debounceTimeoutId !== undefined) {
            window.clearTimeout(debounceTimeoutId);
        }

        if (unlistenTauriResize !== undefined) {
            unlistenTauriResize();
        }
    };
}
