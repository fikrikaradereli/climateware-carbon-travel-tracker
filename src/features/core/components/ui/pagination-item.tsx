export interface PaginationItemProps {
    children: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    "aria-label"?: string;
}

export function PaginationItem({
    children,
    active = false,
    disabled = false,
    onClick,
    "aria-label": ariaLabel,
}: PaginationItemProps) {
    const classes = [
        "inline-flex items-center justify-center",
        "size-8 rounded-[4px] p-[5px]",
        "font-rubik text-[16px] font-medium leading-[25px] text-center",
        "select-none transition-colors duration-150",
        disabled
            ? "text-cw-dark-blue-50 pointer-events-none"
            : active
              ? "bg-cw-dark-blue-100 text-white"
              : "text-cw-dark-blue-100 cursor-pointer hover:bg-cw-grey-50 active:bg-cw-grey-100",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-current={active ? "page" : undefined}
            className={classes}
        >
            {children}
        </button>
    );
}
