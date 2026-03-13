import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui/icon";

export type AccountPage = "profile" | "dashboard";

export interface AccountMenuProps {
    onNavigate: (page: AccountPage) => void;
    onLogout: () => void;
    className?: string;
}

export function AccountMenu({ onNavigate, onLogout, className = "" }: AccountMenuProps) {
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

    function navigate(page: AccountPage) {
        onNavigate(page);
        setOpen(false);
    }

    function logout() {
        onLogout();
        setOpen(false);
    }

    return (
        <div ref={ref} className={["relative", className].filter(Boolean).join(" ")}>
            {/* Trigger */}
            <button
                type="button"
                aria-label="Account menu"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(prev => !prev)}
                className="text-cw-dark-blue-100 hover:text-cw-green-100 transition-colors cursor-pointer"
            >
                <Icon name="user-circle" size={32} />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg z-50 min-w-[160px] overflow-hidden"
                >
                    <div className="py-1">
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => navigate("profile")}
                            className="w-full text-left px-5 py-3 font-rubik font-medium text-[16px] text-cw-dark-blue-100 hover:bg-cw-grey-50 transition-colors"
                        >
                            Profile
                        </button>
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => navigate("dashboard")}
                            className="w-full text-left px-5 py-3 font-rubik font-medium text-[16px] text-cw-dark-blue-100 hover:bg-cw-grey-50 transition-colors"
                        >
                            Dashboard
                        </button>
                    </div>
                    <div className="border-t border-cw-grey-50">
                        <button
                            type="button"
                            role="menuitem"
                            onClick={logout}
                            className="w-full text-left px-5 py-3 font-rubik font-medium text-[16px] text-cw-dark-blue-100 hover:bg-cw-grey-50 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
