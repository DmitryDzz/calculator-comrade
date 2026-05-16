import type { CalculatorStateStorage } from "./calculatorStateStorage.ts";

const CALCULATOR_STATE_STORAGE_KEY = "calculator-comrade.calculator.dump.v1";

export function createWebLocalStorageCalculatorStateStorage(
    key = CALCULATOR_STATE_STORAGE_KEY,
): CalculatorStateStorage {
    return {
        loadDump: () => {
            const encodedDump = window.localStorage.getItem(key);

            if (encodedDump === null) {
                return null;
            }

            return decodeBase64ToBytes(encodedDump);
        },

        saveDump: (dump: Uint8Array) => {
            window.localStorage.setItem(key, encodeBytesToBase64(dump));
        },

        clearDump: () => {
            window.localStorage.removeItem(key);
        },
    };
}

function encodeBytesToBase64(bytes: Uint8Array): string {
    let binary = "";

    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return window.btoa(binary);
}

function decodeBase64ToBytes(encoded: string): Uint8Array {
    const binary = window.atob(encoded);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
}
