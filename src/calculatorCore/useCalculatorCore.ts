import { useCallback, useEffect, useRef, useState } from "react";
import { CALC_OPTIONS_DEFAULT } from "./calculatorConstants.ts";
import { loadCalculatorModule } from "./calculatorModule.ts";
import type { CalculatorAppActions } from "../app/calculatorAppActions.ts";
import {
    type CalculatorDisplaySnapshot,
    CalculatorWasmClient,
} from "./calculatorWasmClient.ts";
import type {
    CalculatorButtonCode,
    CalculatorHandle,
} from "./calculatorWasmTypes.ts";

interface UseCalculatorCoreState {
    loading: boolean;
    error: Error | null;
    display: CalculatorDisplaySnapshot | null;
    coreVersion: string;
    input: (buttonCode: CalculatorButtonCode) => void;
}

export function useCalculatorCore(
    appActions: CalculatorAppActions,
): UseCalculatorCoreState {
    const clientRef = useRef<CalculatorWasmClient | null>(null);
    const handleRef = useRef<CalculatorHandle | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [display, setDisplay] = useState<CalculatorDisplaySnapshot | null>(null);
    const [coreVersion, setCoreVersion] = useState("Unknown");

    useEffect(() => {
        let disposed = false;

        void (async () => {
            try {
                const module = await loadCalculatorModule();

                if (disposed) {
                    return;
                }

                const client = new CalculatorWasmClient(module);
                const handle = client.createCalculator(8, CALC_OPTIONS_DEFAULT);

                await restoreCalculatorStateAsync(client, handle, appActions);

                if (disposed) {
                    client.disposeCalculator(handle);
                    return;
                }

                const initialDisplay = client.readDisplay(handle);

                clientRef.current = client;
                handleRef.current = handle;

                setDisplay(initialDisplay);
                setCoreVersion(client.getCoreVersion());
                setError(null);
                setLoading(false);
            } catch (error: unknown) {
                if (disposed) {
                    return;
                }

                setDisplay(null);
                setCoreVersion("Unknown");
                setError(error instanceof Error ? error : new Error(String(error)));
                setLoading(false);
            }
        })();

        return () => {
            disposed = true;

            const client = clientRef.current;
            const handle = handleRef.current;

            clientRef.current = null;
            handleRef.current = null;

            if (client !== null && handle !== null) {
                client.disposeCalculator(handle);
            }
        };
    }, [appActions]);

    const input = useCallback((buttonCode: CalculatorButtonCode) => {
        const client = clientRef.current;
        const handle = handleRef.current;

        if (client === null || handle === null) {
            return;
        }

        try {
            client.input(handle, buttonCode);
            setDisplay(client.readDisplay(handle));
            setError(null);
            void saveCalculatorState(client, handle, appActions);
        } catch (error: unknown) {
            setError(error instanceof Error ? error : new Error(String(error)));
        }
    }, [appActions]);

    return {
        loading,
        error,
        display,
        coreVersion,
        input,
    };
}

async function restoreCalculatorStateAsync(
    client: CalculatorWasmClient,
    handle: CalculatorHandle,
    appActions: CalculatorAppActions,
): Promise<void> {
    try {
        const dump = await appActions.loadCalculatorDump();

        if (dump === null) {
            return;
        }

        client.importDump(handle, dump);
    } catch (error: unknown) {
        await appActions.clearCalculatorDump();
        console.warn("Stored calculator state was ignored.", error);
    }
}

async function saveCalculatorState(
    client: CalculatorWasmClient,
    handle: CalculatorHandle,
    appActions: CalculatorAppActions,
): Promise<void> {
    try {
        const dump = client.exportDump(handle);

        await appActions.saveCalculatorDump(dump);
    } catch (error: unknown) {
        console.warn("Failed to save calculator state.", error);
    }
}
