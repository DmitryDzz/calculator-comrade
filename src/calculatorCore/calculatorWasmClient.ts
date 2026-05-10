import { CALC_OK } from "./calculatorConstants.ts";
import type {
    CalculatorButtonCode,
    CalculatorHandle,
    CalculatorOptions,
    CalculatorResult,
    CalculatorWasmModule,
} from "./calculatorWasmTypes.ts";

export interface CalculatorDisplaySnapshot {
    size: number;
    digits: number[];
    pointPos: number;
    negative: boolean;
    memory: boolean;
    error: boolean;
}

export class CalculatorWasmClient {
    private readonly module: CalculatorWasmModule;

    public constructor(module: CalculatorWasmModule) {
        this.module = module;
    }

    public createCalculator(
        digits: number,
        options: CalculatorOptions,
    ): CalculatorHandle {
        const handlePtr = this.module._malloc(1);

        try {
            const result = this.module._CreateCalculator(
                digits,
                options,
                handlePtr,
            );

            this.throwIfError(result, "CreateCalculator");

            return this.module.HEAPU8[handlePtr];
        } finally {
            this.module._free(handlePtr);
        }
    }

    public disposeCalculator(handle: CalculatorHandle): void {
        const result = this.module._DisposeCalculator(handle);

        this.throwIfError(result, "DisposeCalculator");
    }

    public disposeAll(): void {
        this.module._DisposeAll();
    }

    public input(
        handle: CalculatorHandle,
        buttonCode: CalculatorButtonCode,
    ): void {
        const result = this.module._CalculatorInput(handle, buttonCode);

        this.throwIfError(result, "CalculatorInput");
    }

    public readDisplay(handle: CalculatorHandle): CalculatorDisplaySnapshot {
        const size = this.getUint8(handle, this.module._GetSize.bind(this.module));
        const digits: number[] = [];

        for (let index = 0; index < size; index += 1) {
            digits.push(this.getInt8ForIndex(
                handle,
                index,
                this.module._GetDisplayDigit.bind(this.module),
            ));
        }

        return {
            size,
            digits,
            pointPos: this.getInt8(
                handle,
                this.module._GetPointPos.bind(this.module),
            ),
            negative: this.getBool(
                handle,
                this.module._GetNegative.bind(this.module),
            ),
            memory: this.getBool(
                handle,
                this.module._GetMemory.bind(this.module),
            ),
            error: this.getBool(
                handle,
                this.module._GetError.bind(this.module),
            ),
        };
    }

    private getUint8(
        handle: CalculatorHandle,
        getter: (handle: CalculatorHandle, outPtr: number) => CalculatorResult,
    ): number {
        const outPtr = this.module._malloc(1);

        try {
            const result = getter(handle, outPtr);

            this.throwIfError(result, "uint8 getter");

            return this.module.HEAPU8[outPtr];
        } finally {
            this.module._free(outPtr);
        }
    }

    private getInt8(
        handle: CalculatorHandle,
        getter: (handle: CalculatorHandle, outPtr: number) => CalculatorResult,
    ): number {
        const outPtr = this.module._malloc(1);

        try {
            const result = getter(handle, outPtr);

            this.throwIfError(result, "int8 getter");

            return this.module.HEAP8[outPtr];
        } finally {
            this.module._free(outPtr);
        }
    }

    private getBool(
        handle: CalculatorHandle,
        getter: (handle: CalculatorHandle, outPtr: number) => CalculatorResult,
    ): boolean {
        return this.getUint8(handle, getter) !== 0;
    }

    private getInt8ForIndex(
        handle: CalculatorHandle,
        index: number,
        getter: (
            handle: CalculatorHandle,
            index: number,
            outPtr: number,
        ) => CalculatorResult,
    ): number {
        const outPtr = this.module._malloc(1);

        try {
            const result = getter(handle, index, outPtr);

            this.throwIfError(result, "indexed int8 getter");

            return this.module.HEAP8[outPtr];
        } finally {
            this.module._free(outPtr);
        }
    }

    private throwIfError(result: CalculatorResult, functionName: string): void {
        if (result === CALC_OK) {
            return;
        }

        throw new Error(`${functionName} failed with code ${result}`);
    }
}
