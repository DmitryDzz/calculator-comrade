export type MaybePromise<T> = T | Promise<T>;

export interface CalculatorStateStorage {
    loadDump(): MaybePromise<Uint8Array | null>;
    saveDump(dump: Uint8Array): MaybePromise<void>;
    clearDump(): MaybePromise<void>;
}
