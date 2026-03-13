export interface ListItemProps {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}

export function ListItem({ children, active = false, onClick, className = "" }: ListItemProps) {
    const classes = [
        "inline-flex items-center justify-end gap-2",
        "h-[43px] px-4 py-3",
        "font-rubik text-[16px] font-medium leading-none",
        "cursor-pointer select-none transition-colors duration-150",
        active
            ? "bg-white text-cw-pink-100"
            : "bg-white text-cw-dark-blue-100 hover:bg-cw-grey-50 active:bg-cw-grey-100",
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
