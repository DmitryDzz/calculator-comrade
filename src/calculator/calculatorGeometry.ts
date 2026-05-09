export const CALCULATOR_BODY_WIDTH = 1760;
export const CALCULATOR_BODY_HEIGHT = 3120;

export interface CalculatorPoint {
    x: number;
    y: number;
}

export interface CalculatorSize {
    width: number;
    height: number;
}

export interface CalculatorRect extends CalculatorPoint, CalculatorSize {}

export function centerPointToStagePosition(point: CalculatorPoint): CalculatorPoint {
    return {
        x: CALCULATOR_BODY_WIDTH / 2 + point.x,
        y: CALCULATOR_BODY_HEIGHT / 2 + point.y,
    };
}
