// Type definitions for Inventory Management

export type Platform = "shopify" | "tiktok" | "amazon";
export type SyncStatus = "synced" | "out_of_sync" | "pending" | "not_listed";
export type FreshnessConfidence = "GREEN" | "YELLOW" | "RED";
export type InventoryStatus = "all" | "in_stock" | "low_stock" | "out_of_stock" | "out_of_sync";
export type AdjustmentType = "add" | "remove" | "set";
export type AdjustmentReason = "recount" | "damaged" | "return" | "sold" | "other";

export interface PlatformInventory {
  platform: Platform;
  quantity: number;
  lastSyncedAt: string;
  syncStatus: SyncStatus;
}

export interface InventoryProduct {
  id: string;
  sku: string;
  title: string;
  imageUrl?: string;
  ats: number; // Available to sell (computed)
  onHand: number;
  reserved: number;
  safetyStock: number;
  freshnessConfidence: FreshnessConfidence;
  platforms: PlatformInventory[];
}

export interface InventorySummary {
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
  outOfSyncCount: number;
  deltasLast24h: number;
}

export interface InventoryFilters {
  search: string;
  platform: Platform | "all";
  status: InventoryStatus;
  page: number;
  sortBy: "title" | "sku" | "ats" | string;
  sortOrder: "asc" | "desc";
}

export interface AttentionItem {
  id: string;
  productId: string;
  product: {
    title: string;
    sku: string;
    imageUrl?: string;
  };
  type: "low_stock" | "out_of_stock" | "out_of_sync" | "unlinked";
  severity: "high" | "medium" | "low";
  message: string;
  platforms?: {
    platform: Platform;
    quantity: number;
  }[];
}

export interface InventoryAdjustment {
  productId: string;
  type: AdjustmentType;
  amount: number;
  reason: AdjustmentReason;
  notes?: string;
}

export interface SyncPreview {
  productId: string;
  platform: Platform;
  currentInRM: number;
  currentOnPlatform: number;
  difference: number;
  percentDifference: number;
  hasWarning: boolean;
}
