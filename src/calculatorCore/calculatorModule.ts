import type {
    CalculatorModuleFactory,
    CalculatorWasmModule,
} from "./calculatorWasmTypes";

export async function loadCalculatorModule(): Promise<CalculatorWasmModule> {
    const moduleFactory = await importCalculatorModuleFactory();

    return moduleFactory({
        locateFile: (path) => {
            if (path.endsWith(".wasm")) {
                return "/wasm/calculator.wasm";
            }

            return `/wasm/${path}`;
        },
    });
}

async function importCalculatorModuleFactory(): Promise<CalculatorModuleFactory> {
    const s = "/wasm/calculator.js";
    const module = await import(s) as {
        default: CalculatorModuleFactory;
    };

    return module.default;
}
