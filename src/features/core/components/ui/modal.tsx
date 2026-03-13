import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import React from "react";

// ─── Context ──────────────────────────────────────────────────────────────────

interface ModalContextValue {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModal() {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error("Modal compound components must be used within <Modal>");
    return ctx;
}

// ─── Modal (root) ─────────────────────────────────────────────────────────────

export interface ModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
}

export function Modal({ open: controlledOpen, onOpenChange: controlledOnOpenChange, children }: ModalProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const open = controlledOpen ?? internalOpen;
    const onOpenChange = controlledOnOpenChange ?? setInternalOpen;

    return <ModalContext.Provider value={{ open, onOpenChange }}>{children}</ModalContext.Provider>;
}

// ─── ModalTrigger ─────────────────────────────────────────────────────────────

export interface ModalTriggerProps {
    asChild?: boolean;
    children: ReactNode;
    className?: string;
}

export function ModalTrigger({ asChild, children, className = "" }: ModalTriggerProps) {
    const { onOpenChange } = useModal();

    if (asChild && React.isValidElement(children)) {
        const child = children as React.ReactElement<{ onClick?: React.MouseEventHandler }>;
        return React.cloneElement(child, {
            onClick: (e: React.MouseEvent) => {
                child.props.onClick?.(e);
                onOpenChange(true);
            },
        });
    }

    return (
        <button className={className} onClick={() => onOpenChange(true)}>
            {children}
        </button>
    );
}

// ─── ModalContent ─────────────────────────────────────────────────────────────

export interface ModalContentProps {
    children: ReactNode;
    className?: string;
}

export function ModalContent({ children, className = "" }: ModalContentProps) {
    const { open, onOpenChange } = useModal();

    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onOpenChange(false);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => onOpenChange(false)}
        >
            <div
                role="dialog"
                aria-modal="true"
                className={`bg-cw-grey-50 flex max-h-172.25 w-259 flex-col rounded-xl ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

// ─── ModalHeader ──────────────────────────────────────────────────────────────

export function ModalHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`px-6 pt-8 pb-8 ${className}`}>{children}</div>;
}

// ─── ModalTitle ───────────────────────────────────────────────────────────────

export function ModalTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <h2 className={`font-rubik text-cw-dark-blue-100 text-[28px] leading-[100%] font-bold ${className}`}>
            {children}
        </h2>
    );
}

// ─── ModalDescription ─────────────────────────────────────────────────────────

export function ModalDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <p className={`font-rubik text-cw-dark-blue-50 mt-2 text-[17px] leading-6.25 ${className}`}>{children}</p>;
}

// ─── ModalBody ────────────────────────────────────────────────────────────────

export function ModalBody({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={`flex-1 overflow-y-auto px-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-[#D9D9D9] ${className}`}
        >
            {children}
        </div>
    );
}

// ─── ModalFooter ──────────────────────────────────────────────────────────────

export function ModalFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={`flex h-19 shrink-0 items-center justify-end gap-3 border-t border-[#D9D9D9] px-6 ${className}`}
        >
            {children}
        </div>
    );
}

// ─── ModalClose ───────────────────────────────────────────────────────────────

export interface ModalCloseProps {
    asChild?: boolean;
    children?: ReactNode;
    className?: string;
}

export function ModalClose({ asChild, children, className = "" }: ModalCloseProps) {
    const { onOpenChange } = useModal();

    if (asChild && React.isValidElement(children)) {
        const child = children as React.ReactElement<{ onClick?: React.MouseEventHandler }>;
        return React.cloneElement(child, {
            onClick: (e: React.MouseEvent) => {
                child.props.onClick?.(e);
                onOpenChange(false);
            },
        });
    }

    return (
        <button className={className} onClick={() => onOpenChange(false)}>
            {children}
        </button>
    );
}
