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
                onClick={() => setOpen((prev) => !prev)}
                className="font-rubik text-cw-dark-blue-100 hover:text-cw-green-100 inline-flex cursor-pointer items-center gap-1 text-[16px] font-medium transition-colors select-none"
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
                <div className="absolute top-full right-0 z-50 mt-2 min-w-40 overflow-hidden rounded-xl bg-white shadow-lg">
                    {/* Panel header */}
                    <div className="border-cw-grey-50 flex items-center justify-end gap-2 border-b px-4 py-3">
                        <span className="font-rubik text-cw-dark-blue-100 text-[14px] font-medium">{value}</span>
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
                        {options.map((opt) => {
                            const active = opt.code === value;
                            return (
                                <li
                                    key={opt.code}
                                    role="option"
                                    aria-selected={active}
                                    onClick={() => handleSelect(opt.code)}
                                    className={[
                                        "font-rubik cursor-pointer px-4 py-3 text-[15px] transition-colors",
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
