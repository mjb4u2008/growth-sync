"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SettingsSectionProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children: ReactNode;
  danger?: boolean; // Red border for danger zones
}

/**
 * SettingsSection - Reusable section card wrapper
 * White card with border, padding, optional header action
 * If danger=true: red border and background tint
 */
export function SettingsSection({
  title,
  description,
  action,
  children,
  danger = false,
}: SettingsSectionProps) {
  return (
    <div
      className={cn(
        "border rounded-xl p-6",
        danger
          ? "border-red-500/50 bg-red-500/5"
          : "bg-white border-[var(--border)]"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold font-display text-[var(--text-primary)]">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {description}
            </p>
          )}
        </div>
        {action && (
          <Button
            variant="secondary"
            size="sm"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
