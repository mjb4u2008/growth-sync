import { ShoppingBag, Music, Package, Globe } from "lucide-react";
import type { Platform } from "@/data/types";

const platformConfig: Record<
  Platform,
  { color: string; icon: typeof ShoppingBag; label: string }
> = {
  shopify: { color: "#96BF48", icon: ShoppingBag, label: "Shopify" },
  tiktok: { color: "#00F2EA", icon: Music, label: "TikTok" },
  amazon: { color: "#FF9900", icon: Package, label: "Amazon" },
  custom: { color: "#6B7280", icon: Globe, label: "Custom" },
};

interface PlatformBadgeProps {
  platform: Platform;
}

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: `${config.color}15`,
        color: config.color,
      }}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
