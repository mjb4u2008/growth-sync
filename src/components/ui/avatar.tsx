"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn, getInitials, stringToColor } from "@/lib/utils";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * User/customer name for generating initials
   */
  name: string;
  /**
   * Optional image URL
   */
  src?: string;
  /**
   * Size of avatar
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Status indicator dot
   */
  status?: "online" | "offline" | "away" | "busy";
  /**
   * Use custom background color (defaults to generated from name)
   */
  bgColor?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      name,
      src,
      size = "md",
      status,
      bgColor,
      ...props
    },
    ref
  ) => {
    const initials = getInitials(name);
    const generatedColor = bgColor || stringToColor(name);

    const sizes = {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
      xl: "h-16 w-16 text-lg",
    };

    const statusSizes = {
      sm: "h-2 w-2 border",
      md: "h-2.5 w-2.5 border-2",
      lg: "h-3 w-3 border-2",
      xl: "h-4 w-4 border-2",
    };

    const statusColors = {
      online: "bg-success",
      offline: "bg-gray-400",
      away: "bg-warning",
      busy: "bg-error",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex shrink-0", className)}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-center rounded-full font-medium font-display select-none",
            sizes[size],
            !src && "text-white"
          )}
          style={{
            backgroundColor: src ? undefined : generatedColor,
          }}
        >
          {src ? (
            <img
              src={src}
              alt={name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-white",
              statusSizes[size],
              statusColors[status]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
