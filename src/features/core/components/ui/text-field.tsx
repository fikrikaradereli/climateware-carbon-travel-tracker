import { forwardRef } from "react";
import { Icon } from "./icon";

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
    label?: string;
    error?: string;
    helperText?: string;
    className?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    { label, error, helperText, disabled, className = "", ...inputProps },
    ref
) {
    const inputClasses = [
        "w-full h-[44px] rounded-[8px] px-4 py-2 gap-2",
        "font-rubik text-[17px] font-normal leading-[25px]",
        "outline-none transition-colors duration-150",
        "placeholder:text-cw-dark-blue-50",
        disabled ? "bg-cw-grey-50 text-cw-dark-blue-50 pointer-events-none" : "bg-white text-cw-dark-blue-100",
        error ? "border border-cw-red-100" : "border border-transparent focus:border-cw-dark-blue-100",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label className="font-rubik text-cw-dark-blue-100 text-[14px] leading-none font-normal">{label}</label>
            )}
            <div className="relative flex items-center">
                <input ref={ref} disabled={disabled} {...inputProps} className={inputClasses} />
                {error && (
                    <span className="text-cw-red-100 pointer-events-none absolute right-4">
                        <Icon name="info" size={20} aria-label="Hata" />
                    </span>
                )}
            </div>
            {(error ?? helperText) && (
                <p
                    className={`font-rubik text-[12px] leading-none ${error ? "text-cw-red-100" : "text-cw-dark-blue-50"}`}
                >
                    {error ?? helperText}
                </p>
            )}
        </div>
    );
});
