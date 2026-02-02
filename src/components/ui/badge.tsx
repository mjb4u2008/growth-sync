"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "success"
    | "warning"
    | "error"
    | "info"
    | "neutral"
    | "accent";
  size?: "sm" | "md" | "lg";
  /**
   * Show pulsing dot indicator
   */
  pulse?: boolean;
  /**
   * Icon to display before text
   */
  icon?: React.ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "neutral",
      size = "md",
      pulse = false,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors";

    const variants = {
      success:
        "bg-green-50 text-green-700 border-green-200",
      warning:
        "bg-amber-50 text-amber-700 border-amber-200",
      error:
        "bg-red-50 text-red-700 border-red-200",
      info:
        "bg-blue-50 text-blue-700 border-blue-200",
      neutral:
        "bg-bg-secondary text-text-secondary border-border",
      accent:
        "bg-accent-light text-accent-dark border-accent-muted",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-xs",
      lg: "px-3 py-1.5 text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {pulse && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
          </span>
        )}
        {icon && <span className="inline-flex">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
