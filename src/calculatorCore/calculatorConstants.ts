import type {
    CalculatorButtonCode,
    CalculatorOptions,
    CalculatorResult,
} from "./calculatorWasmTypes";

/**
 * Calculator C API result codes.
 * Mirrors libcalc.h.
 */
export const CALC_OK: CalculatorResult = 0;
export const CALC_ERR_NO_INSTANCE: CalculatorResult = -1;
export const CALC_ERR_TOO_MANY_INSTANCES: CalculatorResult = -2;
export const CALC_ERR_WRONG_DUMP_VERSION: CalculatorResult = -3;
export const CALC_ERR_WRONG_DUMP_SIZE: CalculatorResult = -4;
export const CALC_ERR_INVALID_OUT_ARGUMENT: CalculatorResult = -5;
export const CALC_ERR_INVALID_INDEX_ARGUMENT: CalculatorResult = -6;
export const CALC_ERR_UNSUPPORTED_SIZE: CalculatorResult = -7;
export const CALC_ERR_INTERNAL: CalculatorResult = -8;

/**
 * Calculator button codes.
 * Mirrors button_codes.h.
 */
export const CALC_BUTTON_NONE: CalculatorButtonCode = 0;
export const CALC_BUTTON_CA: CalculatorButtonCode = 1;
export const CALC_BUTTON_CE: CalculatorButtonCode = 2;
export const CALC_BUTTON_CECA: CalculatorButtonCode = 3;
export const CALC_BUTTON_D0: CalculatorButtonCode = 4;
export const CALC_BUTTON_D1: CalculatorButtonCode = 5;
export const CALC_BUTTON_D2: CalculatorButtonCode = 6;
export const CALC_BUTTON_D3: CalculatorButtonCode = 7;
export const CALC_BUTTON_D4: CalculatorButtonCode = 8;
export const CALC_BUTTON_D5: CalculatorButtonCode = 9;
export const CALC_BUTTON_D6: CalculatorButtonCode = 10;
export const CALC_BUTTON_D7: CalculatorButtonCode = 11;
export const CALC_BUTTON_D8: CalculatorButtonCode = 12;
export const CALC_BUTTON_D9: CalculatorButtonCode = 13;
export const CALC_BUTTON_POINT: CalculatorButtonCode = 14;
export const CALC_BUTTON_PLUS: CalculatorButtonCode = 15;
export const CALC_BUTTON_MINUS: CalculatorButtonCode = 16;
export const CALC_BUTTON_CHANGESIGN: CalculatorButtonCode = 17;
export const CALC_BUTTON_MUL: CalculatorButtonCode = 18;
export const CALC_BUTTON_DIV: CalculatorButtonCode = 19;
export const CALC_BUTTON_MU: CalculatorButtonCode = 20;
export const CALC_BUTTON_SQRT: CalculatorButtonCode = 21;
export const CALC_BUTTON_PERCENT: CalculatorButtonCode = 22;
export const CALC_BUTTON_EQUALS: CalculatorButtonCode = 23;
export const CALC_BUTTON_MEMPLUS: CalculatorButtonCode = 24;
export const CALC_BUTTON_MEMMINUS: CalculatorButtonCode = 25;
export const CALC_BUTTON_MEMR: CalculatorButtonCode = 26;
export const CALC_BUTTON_MEMC: CalculatorButtonCode = 27;
export const CALC_BUTTON_MEMRC: CalculatorButtonCode = 28;

/**
 * Calculator option flags.
 * Mirrors option_codes.h.
 */
export const CALC_OPTION_TRUNC_ZEROS_ON_OVERFLOW: CalculatorOptions = 0x01;
export const CALC_OPTION_MEMORY_OVERFLOW_CLEARS_X: CalculatorOptions = 0x02;

export const CALC_OPTIONS_DEFAULT: CalculatorOptions =
    CALC_OPTION_MEMORY_OVERFLOW_CLEARS_X;
