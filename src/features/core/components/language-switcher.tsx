import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui/icon";

export interface LanguageOption {
    code: string;
    label: string;
}

const DEFAULT_OPTIONS: LanguageOption[] = [
    { code: "EN", label: "English" },
    { code: "TR", label: "Turkish" },
    { code: "FR", label: "French" },
];

export interface LanguageSwitcherProps {
    value: string;
    onChange: (code: string) => void;
    options?: LanguageOption[];
    className?: string;
}

export function LanguageSwitcher({
    value,
    onChange,
    options = DEFAULT_OPTIONS,
    className = "",
}: LanguageSwitcherProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    function handleSelect(code: string) {
        onChange(code);
        setOpen(false);
    }

    return (
        <div ref={ref} className={["relative", className].filter(Boolean).join(" ")}>
            {/* Trigger */}
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(prev => !prev)}
                className="inline-flex items-center gap-1 font-rubik font-medium text-[16px] text-cw-dark-blue-100 hover:text-cw-green-100 transition-colors cursor-pointer select-none"
            >
                <span>{value}</span>
                <Icon
                    name="chevron"
                    size={20}
                    className={["transition-transform duration-200", open ? "rotate-180" : ""].join(" ")}
                />
            </button>

            {/* Dropdown panel */}
            {open && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg z-50 min-w-[160px] overflow-hidden">
                    {/* Panel header */}
                    <div className="flex items-center justify-end gap-2 px-4 py-3 border-b border-cw-grey-50">
                        <span className="font-rubik font-medium text-[14px] text-cw-dark-blue-100">
                            {value}
                        </span>
                        <button
                            type="button"
                            aria-label="Close language selector"
                            onClick={() => setOpen(false)}
                            className="text-cw-dark-blue-100 hover:text-cw-green-100 transition-colors"
                        >
                            <Icon name="cross" size={16} />
                        </button>
                    </div>

                    {/* Language list */}
                    <ul role="listbox" className="py-1">
                        {options.map(opt => {
                            const active = opt.code === value;
                            return (
                                <li
                                    key={opt.code}
                                    role="option"
                                    aria-selected={active}
                                    onClick={() => handleSelect(opt.code)}
                                    className={[
                                        "px-4 py-3 font-rubik text-[15px] cursor-pointer transition-colors",
                                        active
                                            ? "text-cw-pink-100 font-semibold"
                                            : "text-cw-dark-blue-100 hover:bg-cw-grey-50",
                                    ].join(" ")}
                                >
                                    {opt.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
