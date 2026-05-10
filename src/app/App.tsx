import { CalculatorView } from "../calculator/CalculatorView.tsx";
import {useEffect} from "react";
import {loadCalculatorModule} from "../calculatorCore/calculatorModule.ts";
import {CalculatorWasmClient} from "../calculatorCore/calculatorWasmClient.ts";
import {CALC_BUTTON_D7, CALC_OPTIONS_DEFAULT} from "../calculatorCore/calculatorConstants.ts";

export function App() {
    useEffect(() => {
        void (async () => {
            console.info("%cApp is running", "background-color: lime");
            const module = await loadCalculatorModule();
            const client = new CalculatorWasmClient(module);

            const handle = client.createCalculator(8, CALC_OPTIONS_DEFAULT);

            console.log("Initial display:", client.readDisplay(handle));

            client.input(handle, CALC_BUTTON_D7);

            console.log("After D7:", client.readDisplay(handle));

            client.disposeCalculator(handle);
        })();
    }, []);

    return (
        <main className="app">
            <CalculatorView />
        </main>
    );
}
