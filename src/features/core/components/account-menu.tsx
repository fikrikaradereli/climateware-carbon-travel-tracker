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
                onClick={() => setOpen((prev) => !prev)}
                className="text-cw-dark-blue-100 hover:text-cw-green-100 cursor-pointer transition-colors"
            >
                <Icon name="user-circle" size={32} />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    role="menu"
                    className="absolute top-full right-0 z-50 mt-2 min-w-40 overflow-hidden rounded-xl bg-white shadow-lg"
                >
                    <div className="py-1">
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => navigate("profile")}
                            className="font-rubik text-cw-dark-blue-100 hover:bg-cw-grey-50 w-full px-5 py-3 text-left text-[16px] font-medium transition-colors"
                        >
                            Profile
                        </button>
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => navigate("dashboard")}
                            className="font-rubik text-cw-dark-blue-100 hover:bg-cw-grey-50 w-full px-5 py-3 text-left text-[16px] font-medium transition-colors"
                        >
                            Dashboard
                        </button>
                    </div>
                    <div className="border-cw-grey-50 border-t">
                        <button
                            type="button"
                            role="menuitem"
                            onClick={logout}
                            className="font-rubik text-cw-dark-blue-100 hover:bg-cw-grey-50 w-full px-5 py-3 text-left text-[16px] font-medium transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
