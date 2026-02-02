import type { UserProfile, BrandProfile, Integration, TeamMember, NotificationPreference, BrandVoice } from "./types";

export const mockUser: UserProfile = {
  id: "user_001",
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex@growthsync.com",
  emailVerified: true,
  phone: "+1 (555) 123-4567",
  avatar: undefined,
  timezone: "America/Los_Angeles",
  dateFormat: "MM/DD/YYYY",
  role: "owner",
};

export const mockBrand: BrandProfile = {
  id: "brand_001",
  brandName: "Growth Sync",
  legalName: "Growth Sync, Inc.",
  website: "https://growthsync.com",
  industry: "E-commerce Software",
  logo: undefined,
  supportEmail: "support@growthsync.com",
  supportPhone: "+1 (555) 100-2000",
  address: {
    street: "123 Commerce Street",
    city: "San Francisco",
    state: "CA",
    postalCode: "94105",
    country: "United States",
  },
};

export const mockIntegrations: Integration[] = [
  {
    id: "int_001",
    platform: "shopify",
    connected: true,
    accountIdentifier: "growthsync-store.myshopify.com",
    connectedAt: "2025-01-15T10:30:00Z",
    lastSyncedAt: "2025-02-02T14:25:00Z",
    stats: {
      productsSynced: 847,
      ordersSynced: 1247,
    },
    status: "active",
  },
  {
    id: "int_002",
    platform: "tiktok",
    connected: true,
    accountIdentifier: "@growthsync_shop",
    connectedAt: "2025-01-20T09:15:00Z",
    lastSyncedAt: "2025-02-02T14:22:00Z",
    stats: {
      productsSynced: 245,
      ordersSynced: 438,
    },
    status: "active",
  },
  {
    id: "int_003",
    platform: "gmail",
    connected: true,
    accountIdentifier: "support@growthsync.com",
    connectedAt: "2025-01-10T08:00:00Z",
    lastSyncedAt: "2025-02-02T14:20:00Z",
    stats: {
      emailsProcessed: 3421,
    },
    status: "active",
  },
  {
    id: "int_004",
    platform: "amazon",
    connected: false,
    status: "active",
  },
  {
    id: "int_005",
    platform: "instagram",
    connected: false,
    status: "coming_soon",
  },
  {
    id: "int_006",
    platform: "twilio",
    connected: false,
    status: "active",
  },
  {
    id: "int_007",
    platform: "packsmith",
    connected: false,
    status: "active",
  },
  {
    id: "int_008",
    platform: "shipstation",
    connected: false,
    status: "coming_soon",
  },
];

export const mockTeam: TeamMember[] = [
  {
    id: "user_001",
    name: "Alex Morgan",
    email: "alex@growthsync.com",
    role: "owner",
    status: "active",
    lastActive: "2025-02-02T14:30:00Z",
  },
  {
    id: "user_002",
    name: "Sarah Chen",
    email: "sarah@growthsync.com",
    role: "admin",
    status: "active",
    lastActive: "2025-02-02T12:15:00Z",
  },
  {
    id: "user_003",
    name: "Jordan Taylor",
    email: "jordan@growthsync.com",
    role: "cs-manager",
    status: "active",
    lastActive: "2025-02-02T11:45:00Z",
  },
  {
    id: "user_004",
    name: "Mike Johnson",
    email: "mike@growthsync.com",
    role: "member",
    status: "invited",
    invitedAt: "2025-02-01T10:00:00Z",
  },
];

export const mockNotifications: NotificationPreference[] = [
  // Inbox & Support
  { category: "inbox", key: "urgent_tickets", label: "Urgent tickets", enabled: true, frequency: "realtime" },
  { category: "inbox", key: "sla_breach", label: "SLA breach warnings", enabled: true, frequency: "realtime" },
  { category: "inbox", key: "daily_summary", label: "Daily summary", enabled: true, frequency: "daily" },
  { category: "inbox", key: "every_ticket", label: "Every new ticket", enabled: false, frequency: "realtime" },

  // Orders & Inventory
  { category: "orders", key: "low_stock", label: "Low stock alerts", enabled: true, frequency: "realtime" },
  { category: "orders", key: "out_of_stock", label: "Out of stock alerts", enabled: true, frequency: "realtime" },
  { category: "orders", key: "daily_orders", label: "Daily orders summary", enabled: true, frequency: "daily" },
  { category: "orders", key: "sync_errors", label: "Sync errors", enabled: true, frequency: "realtime" },

  // Platform & System
  { category: "platform", key: "disconnection", label: "Platform disconnections", enabled: true, frequency: "realtime" },
  { category: "platform", key: "integration_errors", label: "Integration errors", enabled: true, frequency: "realtime" },
  { category: "platform", key: "weekly_report", label: "Weekly report", enabled: true, frequency: "weekly" },
  { category: "platform", key: "product_updates", label: "Product updates", enabled: false, frequency: "weekly" },

  // Account & Billing
  { category: "account", key: "payment_receipts", label: "Payment receipts", enabled: true, frequency: "realtime" },
  { category: "account", key: "payment_failures", label: "Payment failures", enabled: true, frequency: "realtime" },
  { category: "account", key: "team_changes", label: "Team changes", enabled: true, frequency: "realtime" },
];

export const mockBrandVoice: BrandVoice = {
  tone: "friendly",
  phrasesToUse: [
    "We're here to help",
    "Let's get this sorted",
    "Thanks for reaching out",
  ],
  phrasesToAvoid: [
    "Unfortunately",
    "I'm sorry but",
    "There's nothing we can do",
  ],
  signature: "\n\nBest,\nThe Growth Sync Team",
};
