"use client";
import React from "react";
import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
    size?: "md" | "lg";
};

export function Button({
    className,
    variant = "primary",
    size = "md",
    ...props
}: Props) {
    const base =
        "group relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium " +
        "transition duration-300 ease-out active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gold/40 " +
        "disabled:opacity-50 disabled:pointer-events-none";

    const sizes = {
        md: "h-11",
        lg: "h-12 px-6 text-[0.95rem]",
    }[size];

    const variants = {
        primary:
            "text-black bg-gold shadow-soft hover:shadow-glow " +
            "before:absolute before:inset-0 before:rounded-xl before:bg-white/20 before:opacity-0 before:transition " +
            "hover:before:opacity-100",
        secondary:
            "text-white border border-white/12 bg-white/[0.06] hover:bg-white/[0.10]",
        ghost:
            "text-white/85 hover:text-white hover:bg-white/[0.06]",
    }[variant];

    return <button className={cn(base, sizes, variants, className)} {...props} />;
}