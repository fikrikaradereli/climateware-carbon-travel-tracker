import { Icon } from "./ui/icon";

export type NavLink = "WEB" | "TABLET" | "MOBILE";
export type AccountPage = "profile" | "dashboard";

export interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    activeLink?: NavLink;
    onNavigate: (page: AccountPage) => void;
    onLogout: () => void;
}

export function MobileMenu({ isOpen, onClose, activeLink, onNavigate, onLogout }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-white flex flex-col px-6 pt-6 pb-8"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
        >
            {/* Close button */}
            <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="self-start text-cw-dark-blue-100 hover:text-cw-green-100 transition-colors mb-8"
            >
                <Icon name="cross" size={20} />
            </button>

            {/* Nav labels — görsel gösterge, tıklanamaz */}
            <nav className="flex flex-col gap-6 mb-8" aria-label="View indicator">
                {(["WEB", "TABLET", "MOBILE"] as NavLink[]).map(link => (
                    <span
                        key={link}
                        aria-current={activeLink === link ? "page" : undefined}
                        className={[
                            "font-montserrat text-[16px] font-semibold leading-none select-none",
                            activeLink === link ? "text-cw-green-100" : "text-cw-dark-blue-100",
                        ].join(" ")}
                    >
                        {link}
                    </span>
                ))}
            </nav>

            <div className="border-t border-cw-grey-50 mb-8" />

            {/* Account actions */}
            <div className="flex flex-col gap-6">
                {(["profile", "dashboard"] as AccountPage[]).map(page => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => { onNavigate(page); onClose(); }}
                        className="text-left font-rubik font-medium text-[16px] text-cw-dark-blue-100 hover:text-cw-green-100 transition-colors"
                    >
                        {page.charAt(0).toUpperCase() + page.slice(1)}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={() => { onLogout(); onClose(); }}
                    className="text-left font-rubik font-medium text-[16px] text-cw-dark-blue-100 hover:text-cw-green-100 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
