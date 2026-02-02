import { ShoppingBag, Video, Package as AmazonBox } from "lucide-react";

interface PlatformBadgeProps {
  platform: "shopify" | "tiktok" | "amazon" | "instagram";
  variant?: "dot" | "pill"; // dot = colored circle, pill = full badge
  size?: "sm" | "md";
}

// Platform colors from design system
const PLATFORM_COLORS = {
  shopify: "#96BF48",
  tiktok: "#00F2EA",
  amazon: "#FF9900",
  instagram: "#E1306C",
};

const PLATFORM_LABELS = {
  shopify: "Shopify",
  tiktok: "TikTok",
  amazon: "Amazon",
  instagram: "Instagram",
};

const PLATFORM_ICONS = {
  shopify: ShoppingBag,
  tiktok: Video,
  amazon: AmazonBox,
  instagram: Video, // Using Video icon for Instagram
};

/**
 * PlatformBadge - Shows platform indicator as dot or full badge
 */
export function PlatformBadge({
  platform,
  variant = "dot",
  size = "md",
}: PlatformBadgeProps) {
  const backgroundColor = PLATFORM_COLORS[platform];
  const label = PLATFORM_LABELS[platform];
  const Icon = PLATFORM_ICONS[platform];

  if (variant === "dot") {
    const dotSize = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";
    return (
      <div
        className={`${dotSize} rounded-full`}
        style={{ backgroundColor }}
        title={label}
      />
    );
  }

  // Pill variant
  const pillSize = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${pillSize} rounded-full font-medium`}
      style={{
        backgroundColor: `${backgroundColor}15`,
        color: backgroundColor,
        border: `1px solid ${backgroundColor}30`,
      }}
    >
      <Icon className={iconSize} />
      <span>{label}</span>
    </div>
  );
}
