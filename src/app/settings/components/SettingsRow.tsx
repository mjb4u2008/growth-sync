"use client";

import { ReactNode } from "react";

interface SettingsRowProps {
  label: string;
  description?: string;
  children: ReactNode; // The control (input, toggle, select, etc.)
}

/**
 * SettingsRow - Label + control row layout
 * Flex row with label on left, control on right
 * Optional description below label in muted text
 */
export function SettingsRow({ label, description, children }: SettingsRowProps) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-[var(--border)] last:border-b-0">
      <div className="flex-1 pr-8">
        <label className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
        {description && (
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {description}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
}
