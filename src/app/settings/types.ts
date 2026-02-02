export type SettingsTab =
  | "profile"
  | "business"
  | "integrations"
  | "team"
  | "billing"
  | "notifications"
  | "ai-automation"
  | "security"
  | "data-privacy"
  | "help";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phone?: string;
  avatar?: string;
  timezone: string;
  dateFormat: string;
  role: "owner" | "admin" | "member" | "cs-manager" | "viewer";
}

export interface BrandProfile {
  id: string;
  brandName: string;
  legalName: string;
  website: string;
  industry: string;
  logo?: string;
  supportEmail: string;
  supportPhone?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface Integration {
  id: string;
  platform: "shopify" | "tiktok" | "amazon" | "instagram" | "gmail" | "twilio" | "packsmith" | "shipstation";
  connected: boolean;
  accountIdentifier?: string; // Shop URL, email, etc.
  connectedAt?: string;
  lastSyncedAt?: string;
  stats?: {
    productsSynced?: number;
    ordersSynced?: number;
    emailsProcessed?: number;
  };
  status?: "active" | "error" | "coming_soon";
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "owner" | "admin" | "member" | "cs-manager" | "viewer";
  status: "active" | "invited";
  lastActive?: string;
  invitedAt?: string;
}

export interface NotificationPreference {
  category: "inbox" | "orders" | "platform" | "account";
  key: string;
  label: string;
  enabled: boolean;
  frequency?: "realtime" | "daily" | "weekly";
}

export interface BrandVoice {
  tone: "professional" | "friendly" | "casual" | "gen-z";
  phrasesToUse: string[];
  phrasesToAvoid: string[];
  signature: string;
}
