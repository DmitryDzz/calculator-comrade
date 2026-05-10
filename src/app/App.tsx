import { CalculatorView } from "../calculator/CalculatorView.tsx";
import {useCalculatorCore} from "../calculatorCore/useCalculatorCore.ts";

export function App() {
    const calculator = useCalculatorCore();

    return (
        <main className="app">
            <CalculatorView
                display={calculator.display}
                onButtonPress={calculator.input}
            />
        </main>
    );
}
