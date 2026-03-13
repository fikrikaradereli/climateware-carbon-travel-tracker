import { useEffect, useState } from "react";
import { Icon } from "./ui/icon";
import { Logo } from "./ui/logo";
import { AccountMenu } from "./account-menu";
import type { AccountPage } from "./account-menu";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import type { NavLink } from "./mobile-menu";

function useActiveNav(): NavLink {
    function compute(): NavLink {
        const w = window.innerWidth;
        if (w >= 1024) return "WEB";
        if (w >= 640) return "TABLET";
        return "MOBILE";
    }

    const [activeNav, setActiveNav] = useState<NavLink>(compute);

    useEffect(() => {
        function handleResize() {
            setActiveNav(compute());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return activeNav;
}

export interface HeaderProps {
    language?: string;
    onLanguageChange?: (code: string) => void;
    onNavigate?: (page: AccountPage) => void;
    onLogout?: () => void;
    className?: string;
}

export function Header({
    language = "EN",
    onLanguageChange,
    onNavigate,
    onLogout,
    className = "",
}: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const activeNav = useActiveNav();

    function handleLogout() {
        onLogout?.();
    }

    return (
        <>
            <header
                className={[
                    "w-full flex items-center justify-between px-6 lg:px-10 h-15",
                    className,
                ].filter(Boolean).join(" ")}
            >
                {/* Left: Logo + separator + nav labels (desktop/tablet only) */}
                <div className="flex items-center gap-6">
                    <Logo />

                    {/* Vertical separator */}
                    <div className="hidden lg:block w-px h-6 bg-cw-grey-100" />

                    {/* Nav labels — görsel gösterge, tıklanamaz */}
                    <nav className="hidden lg:flex items-center gap-6" aria-label="View indicator">
                        {(["WEB", "TABLET", "MOBILE"] as NavLink[]).map(link => (
                            <span
                                key={link}
                                aria-current={activeNav === link ? "page" : undefined}
                                className={[
                                    "font-montserrat text-[16px] font-semibold leading-none select-none",
                                    activeNav === link
                                        ? "text-cw-green-100"
                                        : "text-cw-dark-blue-50",
                                ].join(" ")}
                            >
                                {link}
                            </span>
                        ))}
                    </nav>
                </div>

                {/* Right: Language + Account (desktop/tablet) | Hamburger (mobile) */}
                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-4">
                        <LanguageSwitcher
                            value={language}
                            onChange={code => onLanguageChange?.(code)}
                        />
                        <AccountMenu
                            onNavigate={page => onNavigate?.(page)}
                            onLogout={handleLogout}
                        />
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        onClick={() => setMenuOpen(true)}
                        className="lg:hidden text-cw-dark-blue-100 hover:text-cw-green-100 transition-colors"
                    >
                        <Icon name="menu" size={32} />
                    </button>
                </div>
            </header>

            {/* Mobile overlay menu */}
            <MobileMenu
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                activeLink={activeNav}
                onNavigate={page => onNavigate?.(page)}
                onLogout={handleLogout}
            />
        </>
    );
}
