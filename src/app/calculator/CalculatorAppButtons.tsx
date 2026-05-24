import { CalculatorAppButton } from "./CalculatorAppButton.tsx";
import type { CalculatorAppButtonAction } from "./calculatorAppButtonActions.ts";

interface CalculatorAppButtonsProps {
    actions: CalculatorAppButtonAction[];
    onPressStart: () => void;
    settingsButtonAttention: boolean;
}

const buttonPositionClassNames = [
    "calculator-app-button--primary",
    "calculator-app-button--info",
    "calculator-app-button--settings",
] as const;

export function CalculatorAppButtons({
    actions,
    onPressStart,
    settingsButtonAttention,
}: CalculatorAppButtonsProps) {
    return (
        <>
            {actions.slice(0, buttonPositionClassNames.length).map((action, index) => {
                const isSettingsButton = action.id === "settings";

                return (
                    <CalculatorAppButton
                        key={action.id}
                        ariaLabel={action.ariaLabel}
                        className={[
                            buttonPositionClassNames[index],
                            isSettingsButton && settingsButtonAttention
                                ? "calculator-app-button--attention"
                                : undefined,
                        ].filter(Boolean).join(" ")}
                        src={action.src}
                        onPressStart={onPressStart}
                        onPress={action.onPress}
                    />
                );
            })}
        </>
    );
}
