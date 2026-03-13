export interface NavItemProps {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}

export function NavItem({ children, active = false, onClick, className = "" }: NavItemProps) {
    const classes = [
        "inline-flex items-center gap-[10px]",
        "font-montserrat text-[16px] font-semibold leading-none",
        "cursor-pointer select-none transition-colors duration-150",
        active ? "text-cw-pink-100" : "text-cw-dark-blue-100 hover:text-cw-green-100 active:text-cw-pink-150",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div role="button" tabIndex={0} onClick={onClick} className={classes}>
            {children}
        </div>
    );
}
