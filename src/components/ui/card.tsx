"use client";

import { HTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Enable hover lift effect
   */
  hoverable?: boolean;
  /**
   * Make card clickable (adds pointer cursor)
   */
  clickable?: boolean;
  /**
   * Add green-tinted shadow on hover
   */
  accentHover?: boolean;
  /**
   * Custom padding (default is p-6)
   */
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hoverable = false,
      clickable = false,
      accentHover = false,
      padding = "md",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "bg-bg-card border border-border rounded-[14px] transition-shadow";

    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const hoverStyles = hoverable || clickable ? "cursor-pointer" : "";

    // Hover animation variants
    const hoverAnimation = (hoverable || clickable) && {
      whileHover: {
        y: -2,
        boxShadow: accentHover
          ? "0 8px 30px rgba(34, 168, 97, 0.15)"
          : "0 12px 40px rgba(26, 26, 26, 0.08)",
      },
      transition: { type: "spring", stiffness: 400, damping: 25 },
    };

    const MotionDiv = motion.div as React.ForwardRefExoticComponent<
      HTMLMotionProps<"div">
    >;

    return (
      <MotionDiv
        ref={ref}
        className={cn(
          baseStyles,
          paddingStyles[padding],
          hoverStyles,
          className
        )}
        {...(hoverAnimation || {})}
        {...props}
      >
        {children}
      </MotionDiv>
    );
  }
);

Card.displayName = "Card";

// Card sub-components for better composition
export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold font-display text-text-primary", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card };
