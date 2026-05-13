import { CalculatorAppButton } from "./CalculatorAppButton.tsx";

interface CalculatorAppButtonsProps {
    onPressStart: () => void;
    onPress: () => void;
}

export function CalculatorAppButtons({ onPressStart, onPress }: CalculatorAppButtonsProps) {
    return (
        <>
            <CalculatorAppButton
                ariaLabel="Primary action"
                className="calculator-app-button--primary"
                src="/assets/calculator/buttons/app_button_share.webp"
                onPressStart={onPressStart}
                onPress={onPress}
            />
            <CalculatorAppButton
                ariaLabel="Information"
                className="calculator-app-button--info"
                src="/assets/calculator/buttons/app_button_info.webp"
                onPressStart={onPressStart}
                onPress={onPress}
            />
            <CalculatorAppButton
                ariaLabel="Feedback settings"
                className="calculator-app-button--settings"
                src="/assets/calculator/buttons/app_button_settings_snd_vbr.webp"
                onPressStart={onPressStart}
                onPress={onPress}
            />
        </>
    );
}
