"use client";

import { Badge } from "@/components/ui/badge";
import { getSLATimeRemaining } from "../lib/utils";
import type { SLAStatus } from "../types";

interface SLABadgeProps {
  status: SLAStatus;
  deadline: Date;
  size?: "sm" | "md";
}

export function SLABadge({ status, deadline, size = "sm" }: SLABadgeProps) {
  const { hours, minutes, isExpired } = getSLATimeRemaining(deadline);

  const variantMap = {
    healthy: "success" as const,
    at_risk: "warning" as const,
    breached: "error" as const
  };

  const labelMap = {
    healthy: "On Track",
    at_risk: "At Risk",
    breached: "Breached"
  };

  return (
    <Badge variant={variantMap[status]} size={size} pulse={status === "breached"}>
      {labelMap[status]}
      {!isExpired && ` (${hours}h ${minutes}m)`}
    </Badge>
  );
}
