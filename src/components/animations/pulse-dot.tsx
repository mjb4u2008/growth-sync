"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PulseDotProps {
  /**
   * Size of the dot
   */
  size?: "sm" | "md" | "lg";
  /**
   * Color variant
   */
  variant?: "success" | "warning" | "error" | "info" | "accent";
  /**
   * Custom className
   */
  className?: string;
  /**
   * Disable pulse animation
   */
  static?: boolean;
}

/**
 * Pulsing dot indicator
 * Perfect for sync status, live indicators, notification badges
 * All dots pulse in unison for magical cohesion across the app
 */
export function PulseDot({
  size = "md",
  variant = "success",
  className,
  static: isStatic = false,
}: PulseDotProps) {
  const sizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  };

  const variants = {
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    info: "bg-info",
    accent: "bg-accent",
  };

  if (isStatic) {
    return (
      <span
        className={cn(
          "inline-block rounded-full",
          sizes[size],
          variants[variant],
          className
        )}
      />
    );
  }

  return (
    <span className={cn("relative inline-flex", className)}>
      {/* Ping animation ring */}
      <motion.span
        className={cn(
          "absolute inline-flex h-full w-full rounded-full opacity-75",
          variants[variant]
        )}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.75, 0, 0.75],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Static dot */}
      <span
        className={cn(
          "relative inline-flex rounded-full",
          sizes[size],
          variants[variant]
        )}
      />
    </span>
  );
}

/**
 * Synced pulse dot - matches the unified sync pulse across the app
 * Use this for inventory sync status to create that magical cohesion
 */
export function SyncPulseDot({ className }: { className?: string }) {
  return (
    <PulseDot
      size="sm"
      variant="accent"
      className={className}
    />
  );
}
