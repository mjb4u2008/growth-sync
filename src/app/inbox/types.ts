export type Channel = "email" | "tiktok" | "instagram" | "sms" | "facebook";
export type Queue = "urgent" | "open" | "pending" | "done";
export type SLAStatus = "healthy" | "at_risk" | "breached";
export type CustomerBadgeType = "vip" | "repeat" | "influencer" | "new";

export interface Message {
  id: string;
  conversationId: string;
  author: "customer" | "agent" | "system";
  authorName: string;
  content: string;
  timestamp: Date;
  channel: Channel;
}

export interface AIDraft {
  id: string;
  conversationId: string;
  content: string;
  confidence: number; // 0-1
  reasoning: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: Date;
  items: { name: string; quantity: number; price: number }[];
}

export interface PastConversation {
  id: string;
  subject: string;
  date: string; // Relative time like "2 weeks ago"
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  badges: CustomerBadgeType[];
  ltv: number;
  totalOrders: number;
  orders: Order[];
  tags: string[];
  pastConversations: PastConversation[];
}

export interface Conversation {
  id: string;
  customer: Customer;
  subject: string;
  preview: string;
  channel: Channel;
  queue: Queue;
  slaStatus: SLAStatus;
  messages: Message[];
  aiDraft?: AIDraft;
  unread: boolean;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  slaDeadline: Date;
}
