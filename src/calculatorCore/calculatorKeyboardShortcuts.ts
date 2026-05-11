import {
    CALC_BUTTON_CECA,
    CALC_BUTTON_CHANGESIGN,
    CALC_BUTTON_D0,
    CALC_BUTTON_D1,
    CALC_BUTTON_D2,
    CALC_BUTTON_D3,
    CALC_BUTTON_D4,
    CALC_BUTTON_D5,
    CALC_BUTTON_D6,
    CALC_BUTTON_D7,
    CALC_BUTTON_D8,
    CALC_BUTTON_D9,
    CALC_BUTTON_DIV,
    CALC_BUTTON_EQUALS,
    CALC_BUTTON_MEMMINUS,
    CALC_BUTTON_MEMPLUS,
    CALC_BUTTON_MEMRC,
    CALC_BUTTON_MINUS,
    CALC_BUTTON_MU,
    CALC_BUTTON_MUL,
    CALC_BUTTON_PERCENT,
    CALC_BUTTON_PLUS,
    CALC_BUTTON_POINT,
    CALC_BUTTON_SQRT,
} from "./calculatorConstants";
import type { CalculatorButtonCode } from "./calculatorWasmTypes";

export function getCalculatorButtonCodeFromKeyboardEvent(
    event: KeyboardEvent,
): CalculatorButtonCode | null {
    if (event.ctrlKey || event.altKey || event.metaKey) {
        return null;
    }

    /*
     * Handle Shift-based shortcuts before plain digit keys.
     * Otherwise Shift+Digit5 and Shift+Digit8 would be caught as digits.
     */
    if (event.shiftKey) {
        switch (event.code) {
            case "Digit5":
                return CALC_BUTTON_PERCENT;

            case "Digit8":
                return CALC_BUTTON_MUL;

            case "Equal":
                return CALC_BUTTON_PLUS;

            default:
                break;
        }
    }

    switch (event.code) {
        case "Digit0":
        case "Numpad0":
            return CALC_BUTTON_D0;

        case "Digit1":
        case "Numpad1":
            return CALC_BUTTON_D1;

        case "Digit2":
        case "Numpad2":
            return CALC_BUTTON_D2;

        case "Digit3":
        case "Numpad3":
            return CALC_BUTTON_D3;

        case "Digit4":
        case "Numpad4":
            return CALC_BUTTON_D4;

        case "Digit5":
        case "Numpad5":
            return CALC_BUTTON_D5;

        case "Digit6":
        case "Numpad6":
            return CALC_BUTTON_D6;

        case "Digit7":
        case "Numpad7":
            return CALC_BUTTON_D7;

        case "Digit8":
        case "Numpad8":
            return CALC_BUTTON_D8;

        case "Digit9":
        case "Numpad9":
            return CALC_BUTTON_D9;

        case "Period":
        case "Comma":
        case "NumpadDecimal":
            return CALC_BUTTON_POINT;

        case "NumpadAdd":
            return CALC_BUTTON_PLUS;

        case "Minus":
        case "NumpadSubtract":
            return CALC_BUTTON_MINUS;

        case "Slash":
        case "NumpadDivide":
            return CALC_BUTTON_DIV;

        case "NumpadMultiply":
            return CALC_BUTTON_MUL;

        case "Equal":
        case "Enter":
        case "NumpadEnter":
            return CALC_BUTTON_EQUALS;

        case "Escape":
        case "Backspace":
        case "Delete":
            return CALC_BUTTON_CECA;

        case "KeyS":
            return CALC_BUTTON_CHANGESIGN;

        case "KeyR":
            return CALC_BUTTON_SQRT;

        case "KeyU":
            return CALC_BUTTON_MU;

        case "KeyM":
            return CALC_BUTTON_MEMRC;

        case "PageUp":
            return CALC_BUTTON_MEMPLUS;

        case "PageDown":
            return CALC_BUTTON_MEMMINUS;

        default:
            return null;
    }
}
