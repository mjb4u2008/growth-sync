import type { AnalyticsData, KPI, Activity, TimeSeriesDataPoint, PlatformBreakdown } from "./types";
import { subDays, format } from "date-fns";

/**
 * Analytics data for charts and metrics
 * Time-series data for revenue, orders, traffic
 */

// Generate revenue time series for last 30 days
function generateRevenueSeries(): TimeSeriesDataPoint[] {
  const data: TimeSeriesDataPoint[] = [];
  const baseRevenue = 3000;

  for (let i = 30; i >= 0; i--) {
    const date = subDays(new Date(), i);
    // Add some variation and upward trend
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const weekendMultiplier = isWeekend ? 1.4 : 1.0;
    const trendMultiplier = 1 + (30 - i) * 0.01; // Slight upward trend
    const randomVariation = 0.8 + Math.random() * 0.4;

    const value = Math.round(
      baseRevenue * weekendMultiplier * trendMultiplier * randomVariation
    );

    data.push({
      date: format(date, "MMM d"),
      value,
    });
  }

  return data;
}

// Generate order count time series
function generateOrdersSeries(): TimeSeriesDataPoint[] {
  const data: TimeSeriesDataPoint[] = [];
  const baseOrders = 15;

  for (let i = 30; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const weekendMultiplier = isWeekend ? 1.5 : 1.0;
    const randomVariation = 0.7 + Math.random() * 0.6;

    const value = Math.round(baseOrders * weekendMultiplier * randomVariation);

    data.push({
      date: format(date, "MMM d"),
      value,
    });
  }

  return data;
}

// Generate platform-specific revenue time series (for stacked chart)
function generatePlatformRevenueSeries(): any[] {
  const data: any[] = [];
  const baseRevenue = 4000;

  for (let i = 30; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const weekendMultiplier = isWeekend ? 1.4 : 1.0;
    const trendMultiplier = 1 + (30 - i) * 0.01;
    const randomVariation = 0.8 + Math.random() * 0.4;

    const totalRevenue = baseRevenue * weekendMultiplier * trendMultiplier * randomVariation;

    data.push({
      date: format(date, "MMM d"),
      shopify: Math.round(totalRevenue * 0.50),  // 50%
      tiktok: Math.round(totalRevenue * 0.30),   // 30%
      amazon: Math.round(totalRevenue * 0.15),   // 15%
      instagram: Math.round(totalRevenue * 0.05), // 5%
    });
  }

  return data;
}

export const platformRevenueSeries = generatePlatformRevenueSeries();

export const analyticsData: AnalyticsData = {
  revenue: {
    timeSeries: generateRevenueSeries(),
    total: 127482.5,
    change: 12.4, // +12.4% vs last period
    byPlatform: [
      {
        platform: "shopify",
        value: 63741.25,
        percentage: 50.0,
        color: "#22A861",
      },
      {
        platform: "amazon",
        value: 38244.75,
        percentage: 30.0,
        color: "#86CEAA",
      },
      {
        platform: "tiktok",
        value: 19122.38,
        percentage: 15.0,
        color: "#1A8A4F",
      },
      {
        platform: "custom",
        value: 6374.13,
        percentage: 5.0,
        color: "#E8F5EC",
      },
    ],
  },
  orders: {
    timeSeries: generateOrdersSeries(),
    total: 482,
    change: 8.7,
  },
  traffic: {
    direct: 42,
    organic: 28,
    social: 18,
    paid: 8,
    referral: 4,
  },
  topProducts: [
    {
      product: "Classic White Tee - Medium",
      revenue: 15678.43,
      units: 523,
      growth: 23.4,
    },
    {
      product: "Cloudlift Sneakers - White/Navy",
      revenue: 12987.89,
      units: 100,
      growth: 45.2,
    },
    {
      product: "Midnight Runner Hoodie - Navy",
      revenue: 11198.56,
      units: 140,
      growth: 18.9,
    },
    {
      product: "Tech Joggers - Black",
      revenue: 9799.86,
      units: 140,
      growth: -5.3,
    },
    {
      product: "Everyday Backpack - Black",
      revenue: 8959.88,
      units: 112,
      growth: 67.8,
    },
  ],
};

// KPI data for dashboard (Swap-inspired strip)
export const kpiData: KPI[] = [
  {
    label: "Unified Revenue",
    value: 127482.5,
    unit: "currency",
    change: 12.4,
    changeLabel: "vs last period",
    trend: "up",
    sparklineData: [98500, 102300, 108700, 111200, 115800, 121400, 127482.5],
  },
  {
    label: "Orders Today",
    value: 847,
    unit: "number",
    change: 15.4,
    changeLabel: "vs yesterday",
    trend: "up",
    sparklineData: [620, 680, 730, 765, 790, 815, 847],
  },
  {
    label: "Avg Order Value",
    value: 94.5,
    unit: "currency",
    change: 8.2,
    changeLabel: "vs last week",
    trend: "up",
    sparklineData: [87, 89, 91, 88, 92, 93, 94.5],
  },
  {
    label: "Conversion",
    value: 3.2,
    unit: "percentage",
    change: -0.4,
    changeLabel: "vs last week",
    trend: "down",
    sparklineData: [3.6, 3.5, 3.4, 3.3, 3.2, 3.1, 3.2],
  },
];

// Activity feed for dashboard
export const activityFeed: Activity[] = [
  {
    id: "activity_001",
    type: "order_placed",
    title: "New order from Emma Rodriguez",
    description: "Order #RM-10236 for $97.38",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
    relatedEntity: {
      type: "order",
      id: "order_003",
      name: "RM-10236",
    },
  },
  {
    id: "activity_002",
    type: "ticket_resolved",
    title: "Ticket resolved",
    description: "TKT-4512 closed by Agent Sarah",
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 min ago
    actor: "Agent Sarah",
    relatedEntity: {
      type: "ticket",
      id: "tick_011",
      name: "TKT-4512",
    },
  },
  {
    id: "activity_003",
    type: "order_shipped",
    title: "Order shipped",
    description: "RM-10235 shipped via USPS",
    timestamp: new Date(Date.now() - 75 * 60 * 1000), // 1.25 hours ago
    actor: "System",
    relatedEntity: {
      type: "order",
      id: "order_002",
      name: "RM-10235",
    },
  },
  {
    id: "activity_004",
    type: "inventory_synced",
    title: "Inventory synced",
    description: "100 products synced to Shopify",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    actor: "System",
  },
  {
    id: "activity_005",
    type: "low_stock_alert",
    title: "Low stock alert",
    description: "Cloudlift Sneakers - Black (12 units left)",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    actor: "System",
    relatedEntity: {
      type: "product",
      id: "prod_012",
      name: "Cloudlift Sneakers - Black",
    },
  },
  {
    id: "activity_006",
    type: "order_delivered",
    title: "Order delivered",
    description: "RM-10234 delivered to Sarah Chen",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    relatedEntity: {
      type: "order",
      id: "order_001",
      name: "RM-10234",
    },
  },
  {
    id: "activity_007",
    type: "ticket_created",
    title: "New support ticket",
    description: "TKT-4521 from Sarah Chen (Urgent)",
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000), // 26 hours ago
    relatedEntity: {
      type: "ticket",
      id: "tick_001",
      name: "TKT-4521",
    },
  },
  {
    id: "activity_008",
    type: "refund_issued",
    title: "Refund processed",
    description: "$97.40 refunded to Michael Brown",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    actor: "Agent Mike",
    relatedEntity: {
      type: "order",
      id: "order_008",
      name: "RM-10241",
    },
  },
  {
    id: "activity_009",
    type: "customer_signup",
    title: "New customer registered",
    description: "Harper Lewis created an account",
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
    relatedEntity: {
      type: "customer",
      id: "cust_019",
      name: "Harper Lewis",
    },
  },
  {
    id: "activity_010",
    type: "order_placed",
    title: "Large order placed",
    description: "Order #RM-10240 for $135.28",
    timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000), // 4 days ago
    relatedEntity: {
      type: "order",
      id: "order_007",
      name: "RM-10240",
    },
  },
];

// Needs Attention items for dashboard
export const needsAttention = [
  {
    id: "attn_001",
    type: "low_stock" as const,
    title: "5 products critically low on stock",
    description: "Will stock out in 2-4 days at current velocity",
    urgency: "high" as const,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    actionLabel: "Review Inventory",
    actionUrl: "/inventory",
  },
  {
    id: "attn_002",
    type: "ticket" as const,
    title: "3 urgent tickets unassigned",
    description: "Including 1 VIP customer and 1 wholesale inquiry",
    urgency: "critical" as const,
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    actionLabel: "Assign Tickets",
    actionUrl: "/inbox",
  },
  {
    id: "attn_003",
    type: "refund" as const,
    title: "2 pending refund requests",
    description: "Awaiting approval for total of $187.38",
    urgency: "medium" as const,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    actionLabel: "Review Refunds",
    actionUrl: "/orders",
  },
  {
    id: "attn_004",
    type: "sync_error" as const,
    title: "Amazon sync failed",
    description: "3 products haven't synced in 24 hours",
    urgency: "high" as const,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    actionLabel: "Fix Integration",
    actionUrl: "/inventory",
  },
];
