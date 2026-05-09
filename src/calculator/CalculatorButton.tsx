interface CalculatorButtonProps {
    className?: string;
    ariaLabel: string;
    buttonSrc: string;
    labelSrc: string;
}

export function CalculatorButton({
                                     className,
                                     ariaLabel,
                                     buttonSrc,
                                     labelSrc,
                                 }: CalculatorButtonProps) {
    return (
        <button
            className={["calculator-button", className].filter(Boolean).join(" ")}
            type="button"
            aria-label={ariaLabel}
        >
            <img
                className="calculator-button__body"
                src={buttonSrc}
                alt=""
                draggable={false}
            />
            <img
                className="calculator-button__label"
                src={labelSrc}
                alt=""
                draggable={false}
            />
        </button>
    );
}