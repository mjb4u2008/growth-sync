"use client";

import { Badge } from "@/components/ui/badge";
import { Crown, RefreshCw, Star, Sparkles } from "lucide-react";
import type { CustomerBadgeType } from "../types";

interface CustomerBadgeProps {
  type: CustomerBadgeType;
  size?: "sm" | "md";
}

export function CustomerBadge({ type, size = "sm" }: CustomerBadgeProps) {
  const config: Record<CustomerBadgeType, { label: string; variant: "accent" | "success" | "info" | "neutral"; icon: typeof Crown }> = {
    vip: { label: "VIP", variant: "accent", icon: Crown },
    repeat: { label: "Repeat", variant: "success", icon: RefreshCw },
    influencer: { label: "Influencer", variant: "info", icon: Star },
    new: { label: "New", variant: "neutral", icon: Sparkles }
  };

  const { label, variant, icon: Icon } = config[type];

  return (
    <Badge variant={variant} size={size} icon={<Icon className="h-3 w-3" />}>
      {label}
    </Badge>
  );
}
