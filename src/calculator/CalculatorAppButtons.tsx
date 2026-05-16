import { CalculatorAppButton } from "./CalculatorAppButton.tsx";
import type { CalculatorAppButtonAction } from "./calculatorAppButtonActions.ts";

interface CalculatorAppButtonsProps {
    actions: CalculatorAppButtonAction[];
    onPressStart: () => void;
}

const buttonPositionClassNames = [
    "calculator-app-button--primary",
    "calculator-app-button--info",
    "calculator-app-button--settings",
] as const;

export function CalculatorAppButtons({ actions, onPressStart }: CalculatorAppButtonsProps) {
    return (
        <>
            {actions.slice(0, buttonPositionClassNames.length).map((action, index) => (
                <CalculatorAppButton
                    key={action.id}
                    ariaLabel={action.ariaLabel}
                    className={buttonPositionClassNames[index]}
                    src={action.src}
                    onPressStart={onPressStart}
                    onPress={action.onPress}
                />
            ))}
        </>
    );
}
