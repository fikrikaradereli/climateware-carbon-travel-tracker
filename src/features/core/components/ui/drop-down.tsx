import { Icon } from "./icon";

export interface DropDownProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
    label?: string;
    helperText?: string;
    className?: string;
}

export function DropDown({ label, helperText, disabled, className = "", children, ...selectProps }: DropDownProps) {
    const selectClasses = [
        "w-full h-[44px] rounded-[8px] pl-4 pr-12 py-2",
        "font-rubik text-[17px] font-normal leading-[25px]",
        "outline-none transition-colors duration-150",
        "appearance-none border border-transparent",
        disabled
            ? "bg-cw-grey-50 text-cw-dark-blue-50 pointer-events-none"
            : "bg-white text-cw-dark-blue-100 cursor-pointer focus:border-cw-dark-blue-100",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label className="font-rubik text-cw-dark-blue-100 text-[14px] leading-none font-normal">{label}</label>
            )}
            <div className="relative flex items-center">
                <select disabled={disabled} {...selectProps} className={selectClasses}>
                    {children}
                </select>
                <span
                    className={`pointer-events-none absolute right-4 ${disabled ? "text-cw-dark-blue-50" : "text-cw-dark-blue-100"}`}
                >
                    <Icon name="chevron" size={20} />
                </span>
            </div>
            {helperText && <p className="font-rubik text-cw-dark-blue-50 text-[12px] leading-none">{helperText}</p>}
        </div>
    );
}
