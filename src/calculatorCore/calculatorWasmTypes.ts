export type CalculatorResult = number;
export type CalculatorHandle = number;
export type CalculatorButtonCode = number;
export type CalculatorOptions = number;

export interface CalculatorModuleFactoryOptions {
    locateFile?: (path: string, prefix: string) => string;
    print?: (text: string) => void;
    printErr?: (text: string) => void;
}

export interface CalculatorWasmModule {
    HEAP8: Int8Array;
    HEAPU8: Uint8Array;

    _malloc(size: number): number;
    _free(ptr: number): void;

    _CreateCalculator(
        digits: number,
        options: CalculatorOptions,
        hcalcOutPtr: number,
    ): CalculatorResult;

    _DisposeCalculator(hCalc: CalculatorHandle): CalculatorResult;

    _DisposeAll(): void;

    _SetDisplayEventCallback(
        hCalc: CalculatorHandle,
        callback: number,
    ): CalculatorResult;

    _CalculatorInput(
        hCalc: CalculatorHandle,
        button: CalculatorButtonCode,
    ): CalculatorResult;

    _GetSize(
        hCalc: CalculatorHandle,
        sizeOutPtr: number,
    ): CalculatorResult;

    _GetNegative(
        hCalc: CalculatorHandle,
        negativeOutPtr: number,
    ): CalculatorResult;

    _GetError(
        hCalc: CalculatorHandle,
        errorOutPtr: number,
    ): CalculatorResult;

    _GetMemory(
        hCalc: CalculatorHandle,
        memoryOutPtr: number,
    ): CalculatorResult;

    _GetPointPos(
        hCalc: CalculatorHandle,
        pointPosOutPtr: number,
    ): CalculatorResult;

    _GetDigit(
        hCalc: CalculatorHandle,
        index: number,
        digitOutPtr: number,
    ): CalculatorResult;

    _GetDisplayDigit(
        hCalc: CalculatorHandle,
        index: number,
        digitOutPtr: number,
    ): CalculatorResult;

    _ExportDump(
        hCalc: CalculatorHandle,
        dumpPtr: number,
        dumpSizeOutPtr: number,
    ): CalculatorResult;

    _ImportDump(
        hCalc: CalculatorHandle,
        dumpPtr: number,
        dumpSize: number,
    ): CalculatorResult;
}

export type CalculatorModuleFactory = (
    options?: CalculatorModuleFactoryOptions,
) => Promise<CalculatorWasmModule>;

// declare global {
//     interface Window {
//         createCalculatorModule?: CalculatorModuleFactory;
//     }
// }
