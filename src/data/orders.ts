import type { Order, OrderItem, ShippingAddress, Platform, OrderStatus, FulfillmentStatus, PaymentStatus, Customer } from "./types";
import { subHours, subDays, subMinutes } from "date-fns";

/**
 * Realistic e-commerce orders
 * 50+ orders across multiple platforms with varied statuses
 */

const customers: Customer[] = [
  { name: "Sarah Chen", email: "sarah.chen@email.com" },
  { name: "Marcus Johnson", email: "marcus.j@email.com" },
  { name: "Emma Rodriguez", email: "emma.rodriguez@email.com" },
  { name: "David Kim", email: "david.kim@email.com" },
  { name: "Olivia Martinez", email: "olivia.m@email.com" },
  { name: "James Wilson", email: "james.wilson@email.com" },
  { name: "Sophia Patel", email: "sophia.patel@email.com" },
  { name: "Michael Brown", email: "m.brown@email.com" },
  { name: "Isabella Garcia", email: "isabella.garcia@email.com" },
  { name: "William Lee", email: "w.lee@email.com" },
  { name: "Ava Thompson", email: "ava.t@email.com" },
  { name: "Noah Anderson", email: "noah.anderson@email.com" },
  { name: "Mia Taylor", email: "mia.taylor@email.com" },
  { name: "Ethan Davis", email: "ethan.davis@email.com" },
  { name: "Charlotte White", email: "charlotte.w@email.com" },
  { name: "Liam Martinez", email: "liam.martinez@email.com" },
  { name: "Amelia Harris", email: "amelia.harris@email.com" },
  { name: "Benjamin Clark", email: "ben.clark@email.com" },
  { name: "Harper Lewis", email: "harper.lewis@email.com" },
  { name: "Lucas Walker", email: "lucas.walker@email.com" },
];

const addresses: ShippingAddress[] = [
  {
    name: "Sarah Chen",
    street: "742 Evergreen Terrace",
    city: "Portland",
    state: "OR",
    zip: "97205",
    country: "US",
  },
  {
    name: "Marcus Johnson",
    street: "1234 Market Street, Apt 5B",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "US",
  },
  {
    name: "Emma Rodriguez",
    street: "567 Broadway Ave",
    city: "New York",
    state: "NY",
    zip: "10012",
    country: "US",
  },
  {
    name: "David Kim",
    street: "890 Pine Street",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    country: "US",
  },
];

export const orders: Order[] = [
  // Recent orders (today)
  {
    id: "order_001",
    orderNumber: "RM-10234",
    platform: "shopify",
    customer: customers[0],
    items: [
      { id: "item_001", name: "Cloudlift Sneakers - White/Navy", sku: "CLS-WHNV-10", quantity: 1, price: 129.99 },
    ],
    subtotal: 129.99,
    shipping: 8.99,
    tax: 11.43,
    total: 150.41,
    status: "delivered",
    fulfillmentStatus: "fulfilled",
    paymentStatus: "paid",
    createdAt: subDays(new Date(), 5),
    shippedAt: subDays(new Date(), 4),
    deliveredAt: subDays(new Date(), 1),
    trackingNumber: "1Z999AA10123456784",
    shippingAddress: addresses[0],
  },
  {
    id: "order_002",
    orderNumber: "RM-10235",
    platform: "tiktok",
    customer: customers[1],
    items: [
      { id: "item_002", name: "Midnight Runner Hoodie - Navy", sku: "MRH-NAVY-M", quantity: 2, price: 79.99 },
      { id: "item_003", name: "Performance Cap - Navy", sku: "PC-NAVY-001", quantity: 1, price: 34.99 },
    ],
    subtotal: 194.97,
    shipping: 0,
    tax: 16.07,
    total: 211.04,
    status: "shipped",
    fulfillmentStatus: "fulfilled",
    paymentStatus: "paid",
    createdAt: subDays(new Date(), 2),
    shippedAt: subHours(new Date(), 12),
    trackingNumber: "1Z999AA10987654321",
    shippingAddress: addresses[1],
  },
  {
    id: "order_003",
    orderNumber: "RM-10236",
    platform: "amazon",
    customer: customers[2],
    items: [
      { id: "item_004", name: "Classic White Tee - Medium", sku: "CWT-M-001", quantity: 3, price: 29.99 },
    ],
    subtotal: 89.97,
    shipping: 0,
    tax: 7.41,
    total: 97.38,
    status: "processing",
    fulfillmentStatus: "unfulfilled",
    paymentStatus: "paid",
    createdAt: subHours(new Date(), 6),
    shippingAddress: addresses[2],
  },
  {
    id: "order_004",
    orderNumber: "RM-10237",
    platform: "shopify",
    customer: customers[3],
    items: [
      { id: "item_005", name: "Everyday Backpack - Black", sku: "EBP-BLK-001", quantity: 1, price: 79.99 },
      { id: "item_006", name: "Minimalist Wallet - Tan Leather", sku: "MW-TAN-001", quantity: 1, price: 49.99 },
    ],
    subtotal: 129.98,
    shipping: 8.99,
    tax: 11.47,
    total: 150.44,
    status: "awaiting_shipment",
    fulfillmentStatus: "unfulfilled",
    paymentStatus: "paid",
    createdAt: subHours(new Date(), 18),
    shippingAddress: addresses[3],
  },
  {
    id: "order_005",
    orderNumber: "RM-10238",
    platform: "custom",
    customer: customers[4],
    items: [
      { id: "item_007", name: "Tech Joggers - Black", sku: "TJ-BLK-M", quantity: 2, price: 69.99 },
    ],
    subtotal: 139.98,
    shipping: 12.99,
    tax: 12.60,
    total: 165.57,
    status: "shipped",
    fulfillmentStatus: "fulfilled",
    paymentStatus: "paid",
    createdAt: subDays(new Date(), 3),
    shippedAt: subDays(new Date(), 1),
    trackingNumber: "1Z999AA10555666777",
    shippingAddress: addresses[0],
  },
  // Older orders
  {
    id: "order_006",
    orderNumber: "RM-10239",
    platform: "shopify",
    customer: customers[5],
    items: [
      { id: "item_008", name: "Sunrise Track Jacket - Black", sku: "STJ-BLK-L", quantity: 1, price: 89.99 },
    ],
    subtotal: 89.99,
    shipping: 8.99,
    tax: 8.01,
    total: 106.99,
    status: "delivered",
    fulfillmentStatus: "fulfilled",
    paymentStatus: "paid",
    createdAt: subDays(new Date(), 8),
    shippedAt: subDays(new Date(), 7),
    deliveredAt: subDays(new Date(), 5),
    trackingNumber: "1Z999AA10111222333",
    shippingAddress: addresses[1],
  },
  {
    id: "order_007",
    orderNumber: "RM-10240",
    platform: "tiktok",
    customer: customers[6],
    items: [
      { id: "item_009", name: "Urban Flow Crewneck - Sage", sku: "UFC-SAGE-S", quantity: 1, price: 64.99 },
      { id: "item_010", name: "Wool Beanie - Charcoal", sku: "WB-CHAR-001", quantity: 2, price: 29.99 },
    ],
    subtotal: 124.97,
    shipping: 0,
    tax: 10.31,
    total: 135.28,
    status: "delivered",
    fulfillmentStatus: "fulfilled",
    paymentStatus: "paid",
    createdAt: subDays(new Date(), 10),
    shippedAt: subDays(new Date(), 9),
    deliveredAt: subDays(new Date(), 7),
    trackingNumber: "1Z999AA10444555666",
    shippingAddress: addresses[2],
  },
  {
    id: "order_008",
    orderNumber: "RM-10241",
    platform: "amazon",
    customer: customers[7],
    items: [
      { id: "item_011", name: "Metro Slip-Ons - Grey", sku: "MSO-GRY-9", quantity: 1, price: 89.99 },
    ],
    subtotal: 89.99,
    shipping: 0,
    tax: 7.41,
    total: 97.40,
    status: "cancelled",
    fulfillmentStatus: "unfulfilled",
    paymentStatus: "refunded",
    createdAt: subDays(new Date(), 12),
    shippingAddress: addresses[3],
    notes: "Customer requested cancellation before shipment",
  },
  {
    id: "order_009",
    orderNumber: "RM-10242",
    platform: "shopify",
    customer: customers[8],
    items: [
      { id: "item_012", name: "Flex Shorts - Navy", sku: "FS-NAVY-L", quantity: 3, price: 44.99 },
    ],
    subtotal: 134.97,
    shipping: 8.99,
    tax: 11.87,
    total: 155.83,
    status: "delivered",
    fulfillmentStatus: "fulfilled",
    paymentStatus: "paid",
    createdAt: subDays(new Date(), 15),
    shippedAt: subDays(new Date(), 14),
    deliveredAt: subDays(new Date(), 12),
    trackingNumber: "1Z999AA10777888999",
    shippingAddress: addresses[0],
  },
  {
    id: "order_010",
    orderNumber: "RM-10243",
    platform: "shopify",
    customer: customers[9],
    items: [
      { id: "item_013", name: "Denim Jeans - Dark Wash", sku: "DJ-DRK-32", quantity: 1, price: 89.99 },
      { id: "item_014", name: "Vintage Black Tee - Large", sku: "VBT-L-001", quantity: 2, price: 29.99 },
    ],
    subtotal: 149.97,
    shipping: 8.99,
    tax: 13.11,
    total: 172.07,
    status: "delivered",
    fulfillmentStatus: "fulfilled",
    paymentStatus: "paid",
    createdAt: subDays(new Date(), 18),
    shippedAt: subDays(new Date(), 17),
    deliveredAt: subDays(new Date(), 15),
    trackingNumber: "1Z999AA10000111222",
    shippingAddress: addresses[1],
  },
];

// Generate more orders to reach 50+
for (let i = 11; i <= 50; i++) {
  const platforms: Platform[] = ["shopify", "amazon", "tiktok", "custom"];
  const platform = platforms[Math.floor(Math.random() * platforms.length)];

  const customer = customers[Math.floor(Math.random() * customers.length)];
  const address = addresses[Math.floor(Math.random() * addresses.length)];

  // Random number of items (1-3)
  const itemCount = Math.floor(Math.random() * 3) + 1;
  const items: OrderItem[] = [];
  let subtotal = 0;

  for (let j = 0; j < itemCount; j++) {
    const productNames = [
      { name: "Classic White Tee - Medium", sku: "CWT-M-001", price: 29.99 },
      { name: "Tech Joggers - Black", sku: "TJ-BLK-M", price: 69.99 },
      { name: "Everyday Backpack - Black", sku: "EBP-BLK-001", price: 79.99 },
      { name: "Performance Tank - Slate", sku: "PT-SLATE-M", price: 34.99 },
      { name: "Cargo Pants - Khaki", sku: "CP-KHA-32", price: 79.99 },
      { name: "Wool Beanie - Charcoal", sku: "WB-CHAR-001", price: 29.99 },
    ];

    const product = productNames[Math.floor(Math.random() * productNames.length)];
    const quantity = Math.floor(Math.random() * 2) + 1;

    items.push({
      id: `item_${i}_${j}`,
      ...product,
      quantity,
    });

    subtotal += product.price * quantity;
  }

  const shipping = platform === "amazon" || platform === "tiktok" ? 0 : 8.99;
  const tax = Math.round(subtotal * 0.0825 * 100) / 100; // 8.25% tax
  const total = subtotal + shipping + tax;

  const statuses: OrderStatus[] = [
    "delivered",
    "delivered",
    "delivered",
    "shipped",
    "processing",
    "awaiting_shipment",
    "cancelled",
  ];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  let fulfillmentStatus: FulfillmentStatus = "unfulfilled";
  if (status === "delivered" || status === "shipped") {
    fulfillmentStatus = "fulfilled";
  }

  let paymentStatus: PaymentStatus = "paid";
  if (status === "cancelled") {
    paymentStatus = "refunded";
  }

  const daysAgo = Math.floor(Math.random() * 30) + 1;
  const createdAt = subDays(new Date(), daysAgo);

  let shippedAt: Date | undefined;
  let deliveredAt: Date | undefined;
  let trackingNumber: string | undefined;

  if (status === "shipped" || status === "delivered") {
    shippedAt = subDays(new Date(), daysAgo - 1);
    trackingNumber = `1Z999AA10${Math.floor(Math.random() * 1000000000)}`;
  }

  if (status === "delivered") {
    deliveredAt = subDays(new Date(), Math.max(1, daysAgo - 3));
  }

  orders.push({
    id: `order_${String(i).padStart(3, "0")}`,
    orderNumber: `RM-${10233 + i}`,
    platform,
    customer,
    items,
    subtotal: Math.round(subtotal * 100) / 100,
    shipping,
    tax,
    total: Math.round(total * 100) / 100,
    status,
    fulfillmentStatus,
    paymentStatus,
    createdAt,
    shippedAt,
    deliveredAt,
    trackingNumber,
    shippingAddress: address,
  });
}
