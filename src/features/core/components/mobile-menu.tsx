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
            className="fixed inset-0 z-50 flex flex-col bg-white px-6 pt-6 pb-8"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
        >
            {/* Close button */}
            <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="text-cw-dark-blue-100 hover:text-cw-green-100 mb-8 self-start transition-colors"
            >
                <Icon name="cross" size={20} />
            </button>

            {/* Nav labels — görsel gösterge, tıklanamaz */}
            <nav className="mb-8 flex flex-col gap-6" aria-label="View indicator">
                {(["WEB", "TABLET", "MOBILE"] as NavLink[]).map((link) => (
                    <span
                        key={link}
                        aria-current={activeLink === link ? "page" : undefined}
                        className={[
                            "font-montserrat text-[16px] leading-none font-semibold select-none",
                            activeLink === link ? "text-cw-green-100" : "text-cw-dark-blue-100",
                        ].join(" ")}
                    >
                        {link}
                    </span>
                ))}
            </nav>

            <div className="border-cw-grey-50 mb-8 border-t" />

            {/* Account actions */}
            <div className="flex flex-col gap-6">
                {(["profile", "dashboard"] as AccountPage[]).map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => {
                            onNavigate(page);
                            onClose();
                        }}
                        className="font-rubik text-cw-dark-blue-100 hover:text-cw-green-100 text-left text-[16px] font-medium transition-colors"
                    >
                        {page.charAt(0).toUpperCase() + page.slice(1)}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={() => {
                        onLogout();
                        onClose();
                    }}
                    className="font-rubik text-cw-dark-blue-100 hover:text-cw-green-100 text-left text-[16px] font-medium transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
