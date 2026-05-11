import { CalculatorView } from "../calculator/CalculatorView.tsx";
import {useCalculatorCore} from "../calculatorCore/useCalculatorCore.ts";
import {getCalculatorButtonCodeFromKeyboardEvent} from "../calculatorCore/calculatorKeyboardShortcuts.ts";
import {useEffect} from "react";

export function App() {
    const calculator = useCalculatorCore();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const buttonCode = getCalculatorButtonCodeFromKeyboardEvent(event);

            if (buttonCode === null) {
                return;
            }

            event.preventDefault();
            calculator.input(buttonCode);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [calculator, calculator.input]);

    return (
        <main className="app">
            <CalculatorView
                display={calculator.display}
                onButtonPress={calculator.input}
            />
        </main>
    );
}
