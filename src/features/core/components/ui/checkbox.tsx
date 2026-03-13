import { forwardRef } from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
    children?: React.ReactNode;
    className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    { children, disabled, className = "", ...inputProps },
    ref
) {
    return (
        <label
            className={`inline-flex cursor-pointer items-center gap-2 select-none ${disabled ? "pointer-events-none" : ""} ${className}`}
        >
            <span className="relative size-5 shrink-0">
                <input ref={ref} type="checkbox" disabled={disabled} {...inputProps} className="peer sr-only" />
                <span className="absolute inset-0 rounded-sm border border-[#BABBC7] bg-white transition-colors duration-150" />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-150 peer-checked:opacity-100">
                    <svg
                        width="16"
                        height="16"
                        viewBox="16.5 71.5 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.7026 76.9039C31.0718 76.5347 31.6703 76.5349 32.0392 76.9043C32.4077 77.2734 32.4075 77.8712 32.0387 78.24L24.4717 85.807L24.1571 86.1075C23.9639 86.2921 23.6596 86.2921 23.4663 86.1074L23.1436 85.799L19.9591 82.6144C19.5901 82.2454 19.59 81.6471 19.9589 81.2779C20.328 80.9086 20.9267 80.9085 21.2959 81.2778L23.4586 83.4411C23.6539 83.6364 23.9705 83.6364 24.1658 83.4411L30.7026 76.9039Z"
                            fill="#2A3349"
                        />
                    </svg>
                </span>
            </span>
            {children && (
                <span className="font-rubik text-cw-dark-blue-100 text-[17px] leading-none font-normal">
                    {children}
                </span>
            )}
        </label>
    );
});
