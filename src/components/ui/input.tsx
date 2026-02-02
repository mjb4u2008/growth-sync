"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label text
   */
  label?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Icon to display on the left
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right
   */
  rightIcon?: React.ReactNode;
  /**
   * Show clear button when input has value
   */
  clearable?: boolean;
  /**
   * Callback when clear button is clicked
   */
  onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      value,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

    const borderStyles = error
      ? "border-error focus-visible:ring-2 focus-visible:ring-error"
      : "border-border focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20";

    const hasValue = value && String(value).length > 0;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            value={value}
            className={cn(
              baseStyles,
              borderStyles,
              leftIcon && "pl-10",
              (rightIcon || (clearable && hasValue)) && "pr-10",
              className
            )}
            {...props}
          />

          {clearable && hasValue && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Clear input"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {rightIcon && !clearable && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1.5 text-sm text-error">{error}</p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-sm text-text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Search Input variant
export const SearchInput = forwardRef<HTMLInputElement, Omit<InputProps, "leftIcon">>(
  (props, ref) => {
    return (
      <Input
        ref={ref}
        leftIcon={<Search className="h-4 w-4" />}
        placeholder="Search..."
        {...props}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";

export { Input };
