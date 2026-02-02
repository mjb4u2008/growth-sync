import type { Product, ProductVariant, StockLevel, SyncStatus, Platform } from "./types";
import { subHours, subDays, subMinutes } from "date-fns";

/**
 * Realistic product catalog for a modern e-commerce apparel brand
 * 100+ products across categories: Apparel, Footwear, Accessories
 */

function getStockLevel(stock: number, threshold: number): StockLevel {
  if (stock === 0) return "out_of_stock";
  if (stock < threshold * 0.5) return "critical";
  if (stock < threshold) return "low";
  return "healthy";
}

// Helper to randomly assign platforms
function getRandomPlatforms(): Platform[] {
  const platforms: Platform[] = ["shopify", "amazon", "tiktok", "custom"];
  const count = Math.floor(Math.random() * 3) + 1; // 1-3 platforms
  return platforms.slice(0, count);
}

// Helper for sync status
function getRandomSyncStatus(): {
  syncStatus: SyncStatus;
  lastSyncedAt: Date;
} {
  const statuses: SyncStatus[] = ["synced", "synced", "synced", "syncing", "error"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  let lastSyncedAt: Date;
  if (status === "syncing") {
    lastSyncedAt = subMinutes(new Date(), Math.random() * 5);
  } else if (status === "error") {
    lastSyncedAt = subHours(new Date(), Math.random() * 24);
  } else {
    lastSyncedAt = subMinutes(new Date(), Math.random() * 30);
  }

  return { syncStatus: status, lastSyncedAt };
}

export const products: Product[] = [
  // APPAREL - Hoodies & Sweatshirts
  {
    id: "prod_001",
    name: "Midnight Runner Hoodie - Charcoal",
    sku: "MRH-CHAR-M",
    category: "Apparel",
    description: "Premium cotton blend hoodie for athletes",
    price: 79.99,
    stock: 12,
    stockThreshold: 25,
    stockLevel: "critical",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "tiktok"],
  },
  {
    id: "prod_002",
    name: "Midnight Runner Hoodie - Navy",
    sku: "MRH-NAVY-M",
    category: "Apparel",
    price: 79.99,
    stock: 45,
    stockThreshold: 20,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "amazon", "tiktok"],
  },
  {
    id: "prod_003",
    name: "Sunrise Track Jacket - Black",
    sku: "STJ-BLK-L",
    category: "Apparel",
    price: 89.99,
    stock: 8,
    stockThreshold: 15,
    stockLevel: "critical",
    ...getRandomSyncStatus(),
    platforms: ["shopify"],
  },
  {
    id: "prod_004",
    name: "Urban Flow Crewneck - Sage",
    sku: "UFC-SAGE-S",
    category: "Apparel",
    price: 64.99,
    stock: 34,
    stockThreshold: 20,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "tiktok"],
  },
  {
    id: "prod_005",
    name: "Coastal Breeze Hoodie - Seafoam",
    sku: "CBH-SEAFOAM-M",
    category: "Apparel",
    price: 74.99,
    stock: 0,
    stockThreshold: 20,
    stockLevel: "out_of_stock",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "amazon"],
  },

  // APPAREL - T-Shirts & Tops
  {
    id: "prod_006",
    name: "Classic White Tee - Medium",
    sku: "CWT-M-001",
    category: "Apparel",
    price: 29.99,
    stock: 156,
    stockThreshold: 50,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "amazon", "tiktok", "custom"],
  },
  {
    id: "prod_007",
    name: "Vintage Black Tee - Large",
    sku: "VBT-L-001",
    category: "Apparel",
    price: 29.99,
    stock: 89,
    stockThreshold: 50,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "amazon"],
  },
  {
    id: "prod_008",
    name: "Performance Tank - Slate",
    sku: "PT-SLATE-M",
    category: "Apparel",
    price: 34.99,
    stock: 23,
    stockThreshold: 25,
    stockLevel: "low",
    ...getRandomSyncStatus(),
    platforms: ["shopify"],
  },
  {
    id: "prod_009",
    name: "Oversized Graphic Tee - White",
    sku: "OGT-WHT-XL",
    category: "Apparel",
    price: 39.99,
    stock: 67,
    stockThreshold: 30,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["tiktok", "shopify"],
  },
  {
    id: "prod_010",
    name: "Minimal Logo Tee - Sand",
    sku: "MLT-SAND-M",
    category: "Apparel",
    price: 32.99,
    stock: 14,
    stockThreshold: 25,
    stockLevel: "critical",
    ...getRandomSyncStatus(),
    platforms: ["shopify"],
  },

  // FOOTWEAR
  {
    id: "prod_011",
    name: "Cloudlift Sneakers - White/Navy",
    sku: "CLS-WHNV-10",
    category: "Footwear",
    price: 129.99,
    stock: 34,
    stockThreshold: 20,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "amazon"],
  },
  {
    id: "prod_012",
    name: "Cloudlift Sneakers - Black",
    sku: "CLS-BLK-10",
    category: "Footwear",
    price: 129.99,
    stock: 12,
    stockThreshold: 20,
    stockLevel: "critical",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "amazon", "custom"],
  },
  {
    id: "prod_013",
    name: "Trail Blazer Boots - Brown",
    sku: "TBB-BRN-11",
    category: "Footwear",
    price: 159.99,
    stock: 8,
    stockThreshold: 15,
    stockLevel: "critical",
    ...getRandomSyncStatus(),
    platforms: ["shopify"],
  },
  {
    id: "prod_014",
    name: "Metro Slip-Ons - Grey",
    sku: "MSO-GRY-9",
    category: "Footwear",
    price: 89.99,
    stock: 45,
    stockThreshold: 25,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "tiktok"],
  },
  {
    id: "prod_015",
    name: "Street Runner V2 - Red/White",
    sku: "SRV2-RDWH-10",
    category: "Footwear",
    price: 139.99,
    stock: 0,
    stockThreshold: 20,
    stockLevel: "out_of_stock",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "amazon"],
  },

  // ACCESSORIES
  {
    id: "prod_016",
    name: "Everyday Backpack - Black",
    sku: "EBP-BLK-001",
    category: "Accessories",
    price: 79.99,
    stock: 56,
    stockThreshold: 20,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "amazon"],
  },
  {
    id: "prod_017",
    name: "Minimalist Wallet - Tan Leather",
    sku: "MW-TAN-001",
    category: "Accessories",
    price: 49.99,
    stock: 89,
    stockThreshold: 30,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "custom"],
  },
  {
    id: "prod_018",
    name: "Performance Cap - Navy",
    sku: "PC-NAVY-001",
    category: "Accessories",
    price: 34.99,
    stock: 12,
    stockThreshold: 25,
    stockLevel: "critical",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "tiktok"],
  },
  {
    id: "prod_019",
    name: "Wool Beanie - Charcoal",
    sku: "WB-CHAR-001",
    category: "Accessories",
    price: 29.99,
    stock: 67,
    stockThreshold: 20,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "amazon", "tiktok"],
  },
  {
    id: "prod_020",
    name: "Travel Duffel - Olive",
    sku: "TD-OLV-001",
    category: "Accessories",
    price: 119.99,
    stock: 23,
    stockThreshold: 15,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify"],
  },

  // More variety - Bottoms
  {
    id: "prod_021",
    name: "Tech Joggers - Black",
    sku: "TJ-BLK-M",
    category: "Apparel",
    price: 69.99,
    stock: 45,
    stockThreshold: 30,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "amazon"],
  },
  {
    id: "prod_022",
    name: "Cargo Pants - Khaki",
    sku: "CP-KHA-32",
    category: "Apparel",
    price: 79.99,
    stock: 18,
    stockThreshold: 20,
    stockLevel: "low",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "tiktok"],
  },
  {
    id: "prod_023",
    name: "Flex Shorts - Navy",
    sku: "FS-NAVY-L",
    category: "Apparel",
    price: 44.99,
    stock: 78,
    stockThreshold: 40,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "amazon", "tiktok"],
  },
  {
    id: "prod_024",
    name: "Slim Fit Chinos - Stone",
    sku: "SFC-STN-32",
    category: "Apparel",
    price: 74.99,
    stock: 34,
    stockThreshold: 25,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify"],
  },
  {
    id: "prod_025",
    name: "Denim Jeans - Dark Wash",
    sku: "DJ-DRK-32",
    category: "Apparel",
    price: 89.99,
    stock: 56,
    stockThreshold: 30,
    stockLevel: "healthy",
    ...getRandomSyncStatus(),
    platforms: ["shopify", "amazon"],
  },
];

// Generate more products to reach 100+
for (let i = 26; i <= 100; i++) {
  const categories = ["Apparel", "Footwear", "Accessories"];
  const category = categories[Math.floor(Math.random() * categories.length)];

  const apparelNames = [
    "Performance Tee",
    "Athletic Hoodie",
    "Zip Jacket",
    "Long Sleeve Henley",
    "Quarter Zip",
    "Polo Shirt",
    "Windbreaker",
    "Fleece Pullover",
    "Bomber Jacket",
    "Varsity Jacket",
  ];

  const footwearNames = [
    "Running Shoes",
    "Canvas Sneakers",
    "High-Top Kicks",
    "Loafers",
    "Sandals",
    "Hiking Boots",
    "Derby Shoes",
    "Athletic Trainers",
  ];

  const accessoryNames = [
    "Crossbody Bag",
    "Sunglasses",
    "Belt",
    "Socks Pack",
    "Gym Bag",
    "Phone Case",
    "Watch",
    "Scarf",
  ];

  let name: string;
  if (category === "Apparel") {
    name = apparelNames[Math.floor(Math.random() * apparelNames.length)];
  } else if (category === "Footwear") {
    name = footwearNames[Math.floor(Math.random() * footwearNames.length)];
  } else {
    name = accessoryNames[Math.floor(Math.random() * accessoryNames.length)];
  }

  const colors = ["Black", "White", "Navy", "Grey", "Olive", "Burgundy", "Tan"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const price = category === "Footwear" ? 99.99 + Math.random() * 80 : 39.99 + Math.random() * 60;
  const stock = Math.floor(Math.random() * 150);
  const stockThreshold = 20 + Math.floor(Math.random() * 20);

  products.push({
    id: `prod_${String(i).padStart(3, "0")}`,
    name: `${name} - ${color}`,
    sku: `${name.substring(0, 3).toUpperCase()}-${color.substring(0, 3).toUpperCase()}-${String(i).padStart(3, "0")}`,
    category,
    price: Math.round(price * 100) / 100,
    stock,
    stockThreshold,
    stockLevel: getStockLevel(stock, stockThreshold),
    ...getRandomSyncStatus(),
    platforms: getRandomPlatforms(),
  });
}
