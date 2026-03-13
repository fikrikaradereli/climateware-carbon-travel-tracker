import { Logo } from "./ui/logo";

const LINKS = ["Privacy Policy", "Terms and Conditions", "FAQ", "Contact"] as const;

export interface FooterProps {
    className?: string;
}

export function Footer({ className = "" }: FooterProps) {
    return (
        <footer
            className={[
                "w-full flex flex-col lg:flex-row items-center justify-between gap-4",
                "px-6 lg:px-10 py-5",
                className,
            ].filter(Boolean).join(" ")}
        >
            {/* Left: logo + copyright */}
            <div className="flex items-center gap-3">
                <Logo />
                <span className="font-rubik text-[14px] text-cw-dark-blue-50">
                    © 2025
                </span>
            </div>

            {/* Right: links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {LINKS.map(link => (
                    <a
                        key={link}
                        href="#"
                        className="font-rubik text-[14px] text-cw-dark-blue-100 hover:text-cw-green-100 transition-colors"
                    >
                        {link}
                    </a>
                ))}
            </nav>
        </footer>
    );
}
