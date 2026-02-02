/**
 * TypeScript type definitions for Growth Sync
 * All data structures for the e-commerce operations prototype
 */

// ============================================================================
// Customer Support Types
// ============================================================================

export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketStatus = "unassigned" | "open" | "waiting" | "resolved" | "closed";
export type TicketChannel = "email" | "chat" | "phone" | "tiktok" | "instagram";
export type SLAStatus = "on_track" | "at_risk" | "breached";

export interface Customer {
  name: string;
  email: string;
  avatar?: string;
  tags?: string[]; // e.g., ["VIP", "Repeat Customer"]
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  customer: Customer;
  subject: string;
  preview: string;
  priority: TicketPriority;
  status: TicketStatus;
  channel: TicketChannel;
  slaStatus: SLAStatus;
  createdAt: Date;
  updatedAt: Date;
  unread: boolean;
  assignedTo?: string;
}

export interface Message {
  id: string;
  ticketId: string;
  author: "customer" | "agent" | "system";
  authorName: string;
  content: string;
  timestamp: Date;
  isInternal?: boolean;
}

export interface AIsuggestion {
  id: string;
  type: "draft_reply" | "action" | "insight";
  title: string;
  content?: string;
  confidence: number; // 0-1
  actionLabel?: string;
}

// ============================================================================
// E-commerce Order Types
// ============================================================================

export type Platform = "shopify" | "amazon" | "tiktok" | "custom";
export type OrderStatus =
  | "pending"
  | "processing"
  | "awaiting_shipment"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";
export type FulfillmentStatus = "unfulfilled" | "partial" | "fulfilled";
export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  platform: Platform;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  fulfillmentStatus: FulfillmentStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  trackingNumber?: string;
  shippingAddress: ShippingAddress;
  notes?: string;
}

// ============================================================================
// Inventory Types
// ============================================================================

export type SyncStatus = "synced" | "syncing" | "error" | "pending";
export type StockLevel = "healthy" | "low" | "critical" | "out_of_stock";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  description?: string;
  price: number;
  stock: number;
  stockThreshold: number; // Low stock alert threshold
  stockLevel: StockLevel;
  syncStatus: SyncStatus;
  lastSyncedAt: Date;
  platforms: Platform[];
  imageUrl?: string;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Medium / Blue"
  sku: string;
  stock: number;
  price?: number; // If different from parent
}

// ============================================================================
// Insights & Analytics Types
// ============================================================================

export type InsightType = "opportunity" | "warning" | "critical" | "info";
export type InsightCategory = "inventory" | "revenue" | "customer" | "operations" | "marketing";

export interface Insight {
  id: string;
  type: InsightType;
  category: InsightCategory;
  title: string;
  description: string;
  confidence: number; // 0-1
  affectedEntity?: string; // Product name, customer segment, etc.
  actionLabel?: string;
  actionUrl?: string;
  createdAt: Date;
  dismissed?: boolean;
}

export interface KPI {
  label: string;
  value: number;
  unit?: "currency" | "number" | "percentage";
  change: number; // Percentage change
  changeLabel: string; // e.g., "vs last week"
  trend: "up" | "down" | "neutral";
  sparklineData?: number[]; // For mini charts
}

// ============================================================================
// Activity Feed Types
// ============================================================================

export type ActivityType =
  | "order_placed"
  | "order_shipped"
  | "order_delivered"
  | "ticket_created"
  | "ticket_resolved"
  | "inventory_synced"
  | "low_stock_alert"
  | "refund_issued"
  | "customer_signup";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: Date;
  actor?: string; // User or system that triggered
  relatedEntity?: {
    type: "order" | "ticket" | "product" | "customer";
    id: string;
    name: string;
  };
}

// ============================================================================
// Analytics Chart Types
// ============================================================================

export interface TimeSeriesDataPoint {
  date: string; // ISO string or formatted date
  value: number;
  label?: string;
}

export interface PlatformBreakdown {
  platform: Platform;
  value: number;
  percentage: number;
  color: string;
}

export interface AnalyticsData {
  revenue: {
    timeSeries: TimeSeriesDataPoint[];
    total: number;
    change: number;
    byPlatform: PlatformBreakdown[];
  };
  orders: {
    timeSeries: TimeSeriesDataPoint[];
    total: number;
    change: number;
  };
  traffic: {
    direct: number;
    organic: number;
    social: number;
    paid: number;
    referral: number;
  };
  topProducts: Array<{
    product: string;
    revenue: number;
    units: number;
    growth: number;
  }>;
}

// ============================================================================
// UI State Types
// ============================================================================

export interface FilterState {
  search: string;
  platform?: Platform;
  status?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortState {
  field: string;
  direction: "asc" | "desc";
}
