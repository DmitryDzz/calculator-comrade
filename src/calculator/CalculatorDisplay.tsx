export function CalculatorDisplay() {
    return (
        <>
            {/* Inactive digit shadows */}
            <img
                className="calculator-display-digit calculator-display-digit--0 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_digit8.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-digit calculator-display-digit--1 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_digit8.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-digit calculator-display-digit--2 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_digit8.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-digit calculator-display-digit--3 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_digit8.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-digit calculator-display-digit--4 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_digit8.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-digit calculator-display-digit--5 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_digit8.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-digit calculator-display-digit--6 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_digit8.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-digit calculator-display-digit--7 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_digit8.webp"
                alt=""
                draggable={false}
            />

            {/* Active mock value: 0 on the rightmost display position */}
            <img
                className="calculator-display-digit calculator-display-digit--0 calculator-display-symbol--active"
                src="/assets/calculator/display/display_digit0.webp"
                alt=""
                draggable={false}
            />

            {/* Inactive indicators */}
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

            {/* Inactive points */}
            <img
                className="calculator-display-point calculator-display-point--0 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_point.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-point calculator-display-point--1 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_point.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-point calculator-display-point--2 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_point.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-point calculator-display-point--3 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_point.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-point calculator-display-point--4 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_point.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-point calculator-display-point--5 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_point.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-point calculator-display-point--6 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_point.webp"
                alt=""
                draggable={false}
            />
            <img
                className="calculator-display-point calculator-display-point--7 calculator-display-symbol--inactive"
                src="/assets/calculator/display/display_point.webp"
                alt=""
                draggable={false}
            />

            {/* Active decimal point mock can stay disabled for now */}
            <img
                className="calculator-display-point calculator-display-point--0 calculator-display-symbol--active"
                src="/assets/calculator/display/display_point.webp"
                alt=""
                draggable={false}
            />
        </>
    );
}