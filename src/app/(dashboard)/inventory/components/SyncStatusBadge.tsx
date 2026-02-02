"use client";

import { Check, AlertTriangle, Clock, Minus } from "lucide-react";
import type { SyncStatus } from "../types";

interface SyncStatusBadgeProps {
  quantity: number;
  status: SyncStatus;
  safetyStock?: number;
}

/**
 * SyncStatusBadge - Shows platform quantity with colored status indicator
 * ✓ Green: synced and in stock
 * ⚠ Yellow: out of sync OR low stock
 * 🔴 Red: out of stock
 * -- Gray: not listed on platform
 */
export function SyncStatusBadge({ quantity, status, safetyStock = 0 }: SyncStatusBadgeProps) {
  // Determine display status
  let displayStatus: "synced" | "warning" | "error" | "not_listed" = "synced";
  let icon = <Check className="w-3 h-3" />;
  let colorClass = "text-green-600";
  let bgClass = "bg-green-50";
  let tooltipText = "Synced and in stock";

  if (status === "not_listed") {
    displayStatus = "not_listed";
    icon = <Minus className="w-3 h-3" />;
    colorClass = "text-[var(--text-muted)]";
    bgClass = "bg-[var(--bg-secondary)]";
    tooltipText = "Not listed on this platform";
  } else if (quantity === 0) {
    displayStatus = "error";
    icon = <AlertTriangle className="w-3 h-3" />;
    colorClass = "text-red-600";
    bgClass = "bg-red-50";
    tooltipText = "Out of stock";
  } else if (status === "out_of_sync" || (safetyStock > 0 && quantity <= safetyStock)) {
    displayStatus = "warning";
    icon = <AlertTriangle className="w-3 h-3" />;
    colorClass = "text-yellow-600";
    bgClass = "bg-yellow-50";
    tooltipText = status === "out_of_sync" ? "Out of sync" : "Low stock";
  } else if (status === "pending") {
    displayStatus = "warning";
    icon = <Clock className="w-3 h-3" />;
    colorClass = "text-blue-600";
    bgClass = "bg-blue-50";
    tooltipText = "Sync pending";
  }

  if (status === "not_listed") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${colorClass} ${bgClass}`}
        title={tooltipText}
      >
        {icon}
        <span>--</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium font-mono ${colorClass} ${bgClass}`}
      title={tooltipText}
    >
      {icon}
      <span>{quantity}</span>
    </span>
  );
}
