import { Logo } from "./ui/logo";

const LINKS = ["Privacy Policy", "Terms and Conditions", "FAQ", "Contact"] as const;

export interface FooterProps {
    className?: string;
}

export function Footer({ className = "" }: FooterProps) {
    return (
        <footer
            className={[
                "flex w-full flex-col items-center justify-between gap-4 lg:flex-row",
                "px-6 py-5 lg:px-10",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {/* Left: logo + copyright */}
            <div className="flex items-center gap-3">
                <Logo />
                <span className="font-rubik text-cw-dark-blue-50 text-[14px]">© 2025</span>
            </div>

            {/* Right: links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {LINKS.map((link) => (
                    <a
                        key={link}
                        href="#"
                        className="font-rubik text-cw-dark-blue-100 hover:text-cw-green-100 text-[14px] transition-colors"
                    >
                        {link}
                    </a>
                ))}
            </nav>
        </footer>
    );
}
