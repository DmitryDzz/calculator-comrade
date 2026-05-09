interface CalculatorAppButtonProps {
    className?: string;
    ariaLabel: string;
    src: string;
}

export function CalculatorAppButton({
                                        className,
                                        ariaLabel,
                                        src,
                                    }: CalculatorAppButtonProps) {
    return (
        <button
            className={["calculator-app-button", className].filter(Boolean).join(" ")}
            type="button"
            aria-label={ariaLabel}
        >
            <img
                className="calculator-app-button__image"
                src={src}
                alt=""
                draggable={false}
            />
        </button>
    );
}
