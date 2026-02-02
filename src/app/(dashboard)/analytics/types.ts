export type Period = "24h" | "7d" | "30d" | "90d" | "1y";

export interface AnalyticsMetric {
  label: string;
  value: number | string;
  change?: number;
  trend?: "up" | "down" | "neutral";
  unit?: "currency" | "number" | "percentage";
}

export interface PlatformHealth {
  platform: "shopify" | "tiktok" | "amazon";
  revenue: number;
  growth: number;
  aov: number;
  orders: number;
}

export interface ProductPerformance {
  id: string;
  name: string;
  sku: string;
  revenue: number;
  units: number;
  platforms: Array<"shopify" | "tiktok" | "amazon">;
  growth: number;
}

export interface ProductPlatformData {
  product: string;
  shopify: number;
  tiktok: number;
  amazon: number;
  bestChannel: "shopify" | "tiktok" | "amazon";
  bestChannelGrowth: number;
}

export interface AttentionItem {
  id: string;
  type: "declining_sales" | "no_recent_sales" | "missing_platform";
  product: string;
  message: string;
  actionLabel: string;
  actionHref?: string;
}

export interface TrendInsight {
  id: string;
  icon: "🔥" | "⚠️" | "💡" | "🎯";
  message: string;
  actionSuggestion?: string;
}
