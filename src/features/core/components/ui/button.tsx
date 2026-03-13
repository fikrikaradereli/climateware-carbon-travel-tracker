import type { MouseEvent, ReactNode } from "react";
import type { IconName } from "./icon";
import { Icon } from "./icon";
import { SocialIcon } from "./social-icon";
import type { SocialProvider } from "./social-icon";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "icon" | "social";

export interface ButtonProps {
    /** Visual style of the button */
    variant?: ButtonVariant;
    /** Social provider — required when variant="social" */
    provider?: SocialProvider;
    /** Icon name — required when variant="icon", optional for other variants */
    icon?: IconName;
    children?: ReactNode;
    disabled?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    "aria-label"?: string;
}

// ─── Variant styles ────────────────────────────────────────────────────────────
//
// primary  → Figma "Button / Default" — pink fill, Rubik Bold 18px, white text
// outline  → Figma "Button / Outline" — white border, semi-transparent hover/press
// ghost    → Figma "Button - nofill"  — no background, text + optional underline
// icon     → Figma "Button - icononly" — 32×32 transparent, hover bg
// social   → Figma "Social Button"    — white bg, border, logo + label

const BASE =
    "inline-flex items-center justify-center cursor-pointer select-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
    primary: [
        "h-[44px] px-10 rounded-[8px]",
        "bg-cw-pink-100 text-white",
        "hover:bg-cw-pink-50",
        "active:bg-cw-pink-150",
        "focus-visible:ring-cw-pink-100",
    ].join(" "),

    secondary: [
        "h-[44px] px-10 rounded-[8px]",
        "bg-white text-cw-dark-blue-100 border border-cw-dark-blue-100",
        "hover:bg-cw-grey-50",
        "active:bg-cw-grey-100",
        "focus-visible:ring-cw-dark-blue-100",
    ].join(" "),

    outline: [
        "h-[44px] px-10 rounded-[8px]",
        "border border-white text-white bg-transparent",
        "hover:bg-white/25",
        "active:bg-white/15",
        "focus-visible:ring-white",
    ].join(" "),

    ghost: [
        "h-[44px] py-[6px] px-[8px] gap-[8px]",
        "bg-transparent text-cw-dark-blue-100",
        "hover:underline",
        "active:opacity-70",
        "focus-visible:ring-cw-dark-blue-100",
    ].join(" "),

    icon: [
        "size-8 rounded-[4px] p-0",
        "bg-transparent text-cw-dark-blue-100",
        "hover:bg-cw-grey-50",
        "active:bg-cw-grey-100",
        "focus-visible:ring-cw-dark-blue-100",
    ].join(" "),

    social: [
        "h-[40px] px-3 gap-2 rounded-[8px]",
        "bg-white text-cw-dark-blue-100 border border-cw-grey-100",
        "hover:bg-[#F7F7F7]",
        "active:bg-[#E2E2E2]",
        "focus-visible:ring-cw-grey-100",
    ].join(" "),
};

const SOCIAL_LABELS: Record<SocialProvider, string> = {
    google: "Connect with Google",
    facebook: "Connect with Facebook",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Button({
    variant = "primary",
    provider,
    icon,
    children,
    disabled = false,
    onClick,
    className = "",
    type = "button",
    "aria-label": ariaLabel,
}: ButtonProps) {
    const classes = [BASE, VARIANT_CLASSES[variant], className].filter(Boolean).join(" ");

    // Social button layout
    if (variant === "social") {
        const prov = provider ?? "google";
        const label = children ?? SOCIAL_LABELS[prov];
        return (
            <button type={type} disabled={disabled} onClick={onClick} className={classes} aria-label={ariaLabel}>
                <SocialIcon provider={prov} size={20} />
                <span className="text-sm leading-none font-medium">{label}</span>
            </button>
        );
    }

    // Icon-only button
    if (variant === "icon") {
        return (
            <button type={type} disabled={disabled} onClick={onClick} className={classes} aria-label={ariaLabel}>
                {icon && <Icon name={icon} size={20} />}
                {children}
            </button>
        );
    }

    // Primary / outline / ghost
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={classes} aria-label={ariaLabel}>
            {icon && <Icon name={icon} size={18} className="mr-2" />}
            <span
                className={
                    variant === "primary" || variant === "secondary" || variant === "outline"
                        ? "text-[18px] leading-none font-bold"
                        : "text-sm leading-none font-medium"
                }
            >
                {children}
            </span>
        </button>
    );
}
