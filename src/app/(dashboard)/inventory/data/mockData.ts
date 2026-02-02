// Mock inventory data for development

import type {
  InventoryProduct,
  InventorySummary,
  AttentionItem,
  Platform,
  SyncStatus,
} from "../types";

// Helper to generate platform inventory
function createPlatformInventory(
  platform: Platform,
  quantity: number,
  syncStatus: SyncStatus = "synced"
) {
  const hoursAgo = Math.floor(Math.random() * 48);
  return {
    platform,
    quantity,
    lastSyncedAt: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
    syncStatus,
  };
}

// Mock products
export const MOCK_PRODUCTS: InventoryProduct[] = [
  {
    id: "prod_001",
    sku: "BLK-M-01",
    title: "Black T-Shirt M",
    imageUrl: undefined,
    ats: 45,
    onHand: 50,
    reserved: 5,
    safetyStock: 10,
    freshnessConfidence: "GREEN",
    platforms: [
      createPlatformInventory("shopify", 45),
      createPlatformInventory("tiktok", 45),
    ],
  },
  {
    id: "prod_002",
    sku: "BLU-L-02",
    title: "Blue Hoodie L",
    imageUrl: undefined,
    ats: 12,
    onHand: 15,
    reserved: 3,
    safetyStock: 10,
    freshnessConfidence: "YELLOW",
    platforms: [
      createPlatformInventory("shopify", 12, "out_of_sync"),
      createPlatformInventory("tiktok", 8, "out_of_sync"),
    ],
  },
  {
    id: "prod_003",
    sku: "WHT-CAP",
    title: "White Cap",
    imageUrl: undefined,
    ats: 3,
    onHand: 3,
    reserved: 0,
    safetyStock: 15,
    freshnessConfidence: "RED",
    platforms: [
      createPlatformInventory("shopify", 3),
      createPlatformInventory("tiktok", 3),
    ],
  },
  {
    id: "prod_004",
    sku: "RED-SNK-10",
    title: "Red Sneakers 10",
    imageUrl: undefined,
    ats: 28,
    onHand: 30,
    reserved: 2,
    safetyStock: 5,
    freshnessConfidence: "GREEN",
    platforms: [
      createPlatformInventory("shopify", 28),
      createPlatformInventory("tiktok", 0, "not_listed"),
    ],
  },
  {
    id: "prod_005",
    sku: "GRN-XL-05",
    title: "Green Jacket XL",
    imageUrl: undefined,
    ats: 0,
    onHand: 0,
    reserved: 0,
    safetyStock: 5,
    freshnessConfidence: "RED",
    platforms: [
      createPlatformInventory("shopify", 0),
      createPlatformInventory("tiktok", 0),
      createPlatformInventory("amazon", 0),
    ],
  },
  {
    id: "prod_006",
    sku: "YLW-S-06",
    title: "Yellow Tank Top S",
    imageUrl: undefined,
    ats: 67,
    onHand: 70,
    reserved: 3,
    safetyStock: 20,
    freshnessConfidence: "GREEN",
    platforms: [
      createPlatformInventory("shopify", 67),
      createPlatformInventory("tiktok", 67),
    ],
  },
  {
    id: "prod_007",
    sku: "BLK-SNK-9",
    title: "Black Sneakers 9",
    imageUrl: undefined,
    ats: 15,
    onHand: 18,
    reserved: 3,
    safetyStock: 10,
    freshnessConfidence: "YELLOW",
    platforms: [
      createPlatformInventory("shopify", 15),
      createPlatformInventory("tiktok", 12, "out_of_sync"),
    ],
  },
  {
    id: "prod_008",
    sku: "PNK-L-08",
    title: "Pink Sweatshirt L",
    imageUrl: undefined,
    ats: 8,
    onHand: 10,
    reserved: 2,
    safetyStock: 15,
    freshnessConfidence: "YELLOW",
    platforms: [
      createPlatformInventory("shopify", 8),
      createPlatformInventory("amazon", 8),
    ],
  },
  {
    id: "prod_009",
    sku: "BLU-CAP",
    title: "Blue Baseball Cap",
    imageUrl: undefined,
    ats: 42,
    onHand: 45,
    reserved: 3,
    safetyStock: 10,
    freshnessConfidence: "GREEN",
    platforms: [
      createPlatformInventory("shopify", 42),
      createPlatformInventory("tiktok", 42),
      createPlatformInventory("amazon", 42),
    ],
  },
  {
    id: "prod_010",
    sku: "GRY-M-10",
    title: "Gray Joggers M",
    imageUrl: undefined,
    ats: 23,
    onHand: 25,
    reserved: 2,
    safetyStock: 8,
    freshnessConfidence: "GREEN",
    platforms: [
      createPlatformInventory("shopify", 23),
      createPlatformInventory("tiktok", 23),
    ],
  },
];

// Extend to 847 products (as mentioned in spec)
const extendedProducts: InventoryProduct[] = [...MOCK_PRODUCTS];
for (let i = 11; i <= 100; i++) {
  const colors = ["Black", "White", "Blue", "Red", "Green", "Yellow", "Pink", "Gray"];
  const types = ["T-Shirt", "Hoodie", "Cap", "Sneakers", "Jacket", "Tank Top"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const color = colors[i % colors.length];
  const type = types[i % types.length];
  const size = sizes[i % sizes.length];
  const ats = Math.floor(Math.random() * 100);
  const onHand = ats + Math.floor(Math.random() * 10);
  const reserved = onHand - ats;
  const safetyStock = Math.floor(Math.random() * 20) + 5;

  const platforms = [];
  if (Math.random() > 0.1) platforms.push(createPlatformInventory("shopify", ats));
  if (Math.random() > 0.3) platforms.push(createPlatformInventory("tiktok", ats));
  if (Math.random() > 0.6) platforms.push(createPlatformInventory("amazon", ats));

  extendedProducts.push({
    id: `prod_${String(i).padStart(3, "0")}`,
    sku: `${color.slice(0, 3).toUpperCase()}-${size}-${String(i).padStart(2, "0")}`,
    title: `${color} ${type} ${size}`,
    imageUrl: undefined,
    ats,
    onHand,
    reserved,
    safetyStock,
    freshnessConfidence: ats === 0 ? "RED" : ats < safetyStock ? "YELLOW" : "GREEN",
    platforms,
  });
}

export const ALL_PRODUCTS = extendedProducts;

// Mock summary
export const MOCK_SUMMARY: InventorySummary = {
  totalProducts: ALL_PRODUCTS.length,
  lowStockCount: ALL_PRODUCTS.filter((p) => p.ats > 0 && p.ats < p.safetyStock).length,
  outOfStockCount: ALL_PRODUCTS.filter((p) => p.ats === 0).length,
  outOfSyncCount: ALL_PRODUCTS.filter((p) =>
    p.platforms.some((pl) => pl.syncStatus === "out_of_sync")
  ).length,
  deltasLast24h: 43,
};

// Mock attention items
export const MOCK_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: "attn_001",
    productId: "prod_002",
    product: {
      title: "Blue Hoodie L",
      sku: "BLU-L-02",
    },
    type: "out_of_sync",
    severity: "high",
    message: "Out of sync (Shopify: 12, TikTok: 8)",
    platforms: [
      { platform: "shopify", quantity: 12 },
      { platform: "tiktok", quantity: 8 },
    ],
  },
  {
    id: "attn_002",
    productId: "prod_003",
    product: {
      title: "White Cap",
      sku: "WHT-CAP",
    },
    type: "low_stock",
    severity: "high",
    message: "Only 3 units left (Safety stock: 15)",
  },
  {
    id: "attn_003",
    productId: "prod_005",
    product: {
      title: "Green Jacket XL",
      sku: "GRN-XL-05",
    },
    type: "out_of_stock",
    severity: "high",
    message: "Out of stock across all platforms",
  },
  {
    id: "attn_004",
    productId: "prod_007",
    product: {
      title: "Black Sneakers 9",
      sku: "BLK-SNK-9",
    },
    type: "out_of_sync",
    severity: "medium",
    message: "Out of sync (Shopify: 15, TikTok: 12)",
    platforms: [
      { platform: "shopify", quantity: 15 },
      { platform: "tiktok", quantity: 12 },
    ],
  },
  {
    id: "attn_005",
    productId: "prod_008",
    product: {
      title: "Pink Sweatshirt L",
      sku: "PNK-L-08",
    },
    type: "low_stock",
    severity: "medium",
    message: "Only 8 units left (Safety stock: 15)",
  },
];
