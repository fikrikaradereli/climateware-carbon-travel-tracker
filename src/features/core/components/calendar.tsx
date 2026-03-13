import { useState } from "react";
import { Icon } from "./ui/icon";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export interface CalendarProps {
    value?: Date | null;
    onChange: (date: Date) => void;
    onClose?: () => void;
    className?: string;
}

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstWeekday(year: number, month: number) {
    // getDay(): 0=Sun…6=Sat → convert to Mon=0…Sun=6
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
}

export function Calendar({ value, onChange, onClose, className = "" }: CalendarProps) {
    const [view, setView] = useState(() => {
        const base = value ?? new Date();
        return new Date(base.getFullYear(), base.getMonth(), 1);
    });

    const year = view.getFullYear();
    const month = view.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstWeekday = getFirstWeekday(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);

    // Build 6-row × 7-col grid
    const cells: { date: Date; current: boolean }[] = [];
    for (let i = firstWeekday - 1; i >= 0; i--) {
        cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), current: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push({ date: new Date(year, month, d), current: true });
    }
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
        cells.push({ date: new Date(year, month + 1, d), current: false });
    }

    function isSameDay(a: Date, b: Date) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }

    function handleSelect(date: Date) {
        onChange(date);
        onClose?.();
    }

    return (
        <div className={["w-75 rounded-2xl bg-white p-4 shadow-lg select-none", className].filter(Boolean).join(" ")}>
            {/* Month navigation */}
            <div className="mb-4 flex items-center justify-between">
                <button
                    type="button"
                    aria-label="Previous month"
                    onClick={() => setView(new Date(year, month - 1, 1))}
                    className="text-cw-dark-blue-100 hover:text-cw-green-100 transition-colors"
                >
                    <Icon name="chevron" size={20} className="rotate-90" />
                </button>
                <span className="font-rubik text-cw-dark-blue-100 text-[16px] font-semibold">
                    {MONTHS[month]} {year}
                </span>
                <button
                    type="button"
                    aria-label="Next month"
                    onClick={() => setView(new Date(year, month + 1, 1))}
                    className="text-cw-dark-blue-100 hover:text-cw-green-100 transition-colors"
                >
                    <Icon name="chevron" size={20} className="-rotate-90" />
                </button>
            </div>

            {/* Weekday headers */}
            <div className="mb-1 grid grid-cols-7">
                {DAYS.map((d) => (
                    <div key={d} className="font-rubik text-cw-dark-blue-50 py-1 text-center text-[11px] font-medium">
                        {d}
                    </div>
                ))}
            </div>

            {/* Date grid */}
            <div className="grid grid-cols-7">
                {cells.map(({ date, current }, i) => {
                    const selected = value ? isSameDay(date, value) : false;
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => handleSelect(date)}
                            className={[
                                "mx-auto flex size-9 items-center justify-center rounded-full",
                                "font-rubik text-[13px] transition-colors",
                                selected
                                    ? "bg-cw-dark-blue-100 text-white"
                                    : current
                                      ? "text-cw-dark-blue-100 hover:bg-cw-grey-50"
                                      : "text-cw-grey-100 hover:bg-cw-grey-50",
                            ].join(" ")}
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
