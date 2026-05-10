import type { CalculatorDisplaySnapshot } from "../calculatorCore/calculatorWasmClient.ts";

interface CalculatorDisplayProps {
        display: CalculatorDisplaySnapshot | null;
}

const DISPLAY_POSITIONS = [0, 1, 2, 3, 4, 5, 6, 7];

export function CalculatorDisplay({ display }: CalculatorDisplayProps) {
        return (
            <>
                    <CalculatorDisplayInactiveLayer />

                    {display !== null && (
                        <CalculatorDisplayActiveLayer display={display} />
                    )}
            </>
        );
}

function CalculatorDisplayInactiveLayer() {
        return (
            <>
                    {DISPLAY_POSITIONS.map((position) => (
                        <img
                            key={`inactive-digit-${position}`}
                            className={[
                                    "calculator-display-digit",
                                    `calculator-display-digit--${position}`,
                                    "calculator-display-symbol--inactive",
                            ].join(" ")}
                            src="/assets/calculator/display/display_digit8.webp"
                            alt=""
                            draggable={false}
                        />
                    ))}

                    {DISPLAY_POSITIONS.map((position) => (
                        <img
                            key={`inactive-point-${position}`}
                            className={[
                                    "calculator-display-point",
                                    `calculator-display-point--${position}`,
                                    "calculator-display-symbol--inactive",
                            ].join(" ")}
                            src="/assets/calculator/display/display_point.webp"
                            alt=""
                            draggable={false}
                        />
                    ))}

                    <img
                        className="calculator-display-indicator calculator-display-minus calculator-display-symbol--inactive"
                        src="/assets/calculator/display/display_minus.webp"
                        alt=""
                        draggable={false}
                    />
                    <img
                        className="calculator-display-indicator calculator-display-memory calculator-display-symbol--inactive"
                        src="/assets/calculator/display/display_memory.webp"
                        alt=""
                        draggable={false}
                    />
                    <img
                        className="calculator-display-indicator calculator-display-error calculator-display-symbol--inactive"
                        src="/assets/calculator/display/display_error.webp"
                        alt=""
                        draggable={false}
                    />
            </>
        );
}

interface CalculatorDisplayActiveLayerProps {
        display: CalculatorDisplaySnapshot;
}

function CalculatorDisplayActiveLayer({
                                              display,
                                      }: CalculatorDisplayActiveLayerProps) {
        return (
            <>
                    {display.digits.map((digit, position) => {
                            if (digit < 0) {
                                    return null;
                            }

                            return (
                                <img
                                    key={`active-digit-${position}`}
                                    className={[
                                            "calculator-display-digit",
                                            `calculator-display-digit--${position}`,
                                            "calculator-display-symbol--active",
                                    ].join(" ")}
                                    src={`/assets/calculator/display/display_digit${digit}.webp`}
                                    alt=""
                                    draggable={false}
                                />
                            );
                    })}

                    {display.pointPos >= 0 && (
                        <img
                            className={[
                                    "calculator-display-point",
                                    `calculator-display-point--${display.pointPos}`,
                                    "calculator-display-symbol--active",
                            ].join(" ")}
                            src="/assets/calculator/display/display_point.webp"
                            alt=""
                            draggable={false}
                        />
                    )}

                    {display.negative && (
                        <img
                            className="calculator-display-indicator calculator-display-minus calculator-display-symbol--active"
                            src="/assets/calculator/display/display_minus.webp"
                            alt=""
                            draggable={false}
                        />
                    )}

                    {display.memory && (
                        <img
                            className="calculator-display-indicator calculator-display-memory calculator-display-symbol--active"
                            src="/assets/calculator/display/display_memory.webp"
                            alt=""
                            draggable={false}
                        />
                    )}

                    {display.error && (
                        <img
                            className="calculator-display-indicator calculator-display-error calculator-display-symbol--active"
                            src="/assets/calculator/display/display_error.webp"
                            alt=""
                            draggable={false}
                        />
                    )}
            </>
        );
}
