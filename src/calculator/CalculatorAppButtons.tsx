import { CalculatorAppButton } from "./CalculatorAppButton";

export function CalculatorAppButtons() {
    return (
        <>
            <CalculatorAppButton
                ariaLabel="Primary action"
                className="calculator-app-button--primary"
                src="/assets/calculator/buttons/app_button_share.webp"
            />
            <CalculatorAppButton
                ariaLabel="Information"
                className="calculator-app-button--info"
                src="/assets/calculator/buttons/app_button_info.webp"
            />
            <CalculatorAppButton
                ariaLabel="Feedback settings"
                className="calculator-app-button--settings"
                src="/assets/calculator/buttons/app_button_settings_snd_vbr.webp"
            />
        </>
    );
}
