import { tickets } from "@/data/tickets";
import { orders } from "@/data/orders";
import type { Conversation, Message, AIDraft, Customer, CustomerBadgeType, Channel, Queue, PastConversation } from "../types";
import { addHours, subMinutes } from "date-fns";

// Helper: Generate past conversations for returning customers
function generatePastConversations(badges: CustomerBadgeType[], customerName: string): PastConversation[] {
  // Only VIP and repeat customers have past conversations
  if (!badges.includes("vip") && !badges.includes("repeat")) {
    return [];
  }

  const pastConversationTemplates = [
    { subject: "Order #RM-10234 shipping question", date: "2 weeks ago" },
    { subject: "Return request - wrong color", date: "1 month ago" },
    { subject: "Promo code not working at checkout", date: "3 weeks ago" },
    { subject: "Bulk order inquiry for 50+ units", date: "2 months ago" },
    { subject: "Size exchange for Medium → Large", date: "1 month ago" },
    { subject: "Product recommendation request", date: "3 months ago" },
    { subject: "Gift wrapping availability", date: "6 weeks ago" },
  ];

  // VIP customers get 2-3 past conversations, repeat get 1-2
  const count = badges.includes("vip")
    ? 2 + Math.floor(Math.random() * 2)  // 2-3
    : 1 + Math.floor(Math.random() * 2); // 1-2

  return pastConversationTemplates
    .slice(0, count)
    .map((template, i) => ({
      id: `past_${customerName}_${i}`,
      ...template
    }));
}

// Transform tickets → conversations
export const mockConversations: Conversation[] = tickets.map((ticket) => {
  // Map channel types
  const channelMap: Record<string, Channel> = {
    email: "email",
    chat: "email",
    phone: "sms",
    tiktok: "tiktok",
    instagram: "instagram"
  };

  // Map queue from status and priority
  let queue: Queue;
  if (ticket.status === "resolved") {
    queue = "done";
  } else if (ticket.status === "waiting") {
    queue = "pending";
  } else if (ticket.priority === "urgent" || ticket.status === "unassigned") {
    queue = "urgent";
  } else {
    queue = "open";
  }

  // Calculate SLA deadline
  const slaHours = ticket.priority === "urgent" ? 1 : ticket.priority === "high" ? 4 : ticket.priority === "medium" ? 8 : 24;

  // Map customer badges from tags
  const badges = (ticket.customer.tags || [])
    .map((tag) => {
      if (tag === "VIP") return "vip" as const;
      if (tag === "Influencer") return "influencer" as const;
      if (tag === "Repeat Customer") return "repeat" as const;
      return null;
    })
    .filter((badge) => badge !== null) as CustomerBadgeType[];

  // If no badges from tags, assign "new" for first-time customers
  if (badges.length === 0 && !ticket.assignedTo) {
    badges.push("new");
  }

  // Generate messages for conversation (2-5 messages)
  const messages: Message[] = [
    // Initial customer message
    {
      id: `msg_${ticket.id}_1`,
      conversationId: ticket.id,
      author: "customer",
      authorName: ticket.customer.name,
      content: ticket.preview,
      timestamp: ticket.createdAt,
      channel: channelMap[ticket.channel] || "email"
    }
  ];

  // Add agent response for resolved/waiting tickets
  if (ticket.status === "resolved" || ticket.status === "waiting") {
    messages.push({
      id: `msg_${ticket.id}_2`,
      conversationId: ticket.id,
      author: "agent",
      authorName: ticket.assignedTo || "Support Team",
      content: getAgentResponse(ticket.subject, ticket.status === "resolved"),
      timestamp: subMinutes(ticket.updatedAt, 30),
      channel: channelMap[ticket.channel] || "email"
    });

    // Add follow-up customer message for waiting status
    if (ticket.status === "waiting") {
      messages.push({
        id: `msg_${ticket.id}_3`,
        conversationId: ticket.id,
        author: "customer",
        authorName: ticket.customer.name,
        content: "Thank you! When can I expect an update?",
        timestamp: subMinutes(ticket.updatedAt, 10),
        channel: channelMap[ticket.channel] || "email"
      });
    }
  }

  // Generate AI draft for open/urgent conversations
  const aiDraft: AIDraft | undefined = (ticket.status === "open" || ticket.status === "unassigned") ? {
    id: `draft_${ticket.id}`,
    conversationId: ticket.id,
    content: getAIDraftResponse(ticket.subject, ticket.priority),
    confidence: 0.85 + Math.random() * 0.1,
    reasoning: getAIDraftReasoning(ticket.subject)
  } : undefined;

  // Find matching orders for customer (simple mock - randomly assign 1-3 orders)
  // Transform orders from data/types.ts Order to inbox/types.ts Order format
  const customerOrders = orders.slice(0, Math.floor(Math.random() * 3) + 1).map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
    items: order.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }))
  }));

  // Generate past conversations for repeat/VIP customers
  const pastConversations = generatePastConversations(badges, ticket.customer.name);

  // Build customer object
  const customer: Customer = {
    id: ticket.customer.email,
    name: ticket.customer.name,
    email: ticket.customer.email,
    badges,
    ltv: 500 + Math.random() * 1500, // Random LTV between $500-$2000
    totalOrders: 2 + Math.floor(Math.random() * 8), // 2-10 orders
    orders: customerOrders,
    tags: ticket.customer.tags || [],
    pastConversations
  };

  // Map SLA status from data/types.ts format to inbox/types.ts format
  const slaStatus = ticket.slaStatus === "on_track" ? "healthy" : ticket.slaStatus;

  return {
    id: ticket.id,
    customer,
    subject: ticket.subject,
    preview: ticket.preview,
    channel: channelMap[ticket.channel] || "email",
    queue,
    slaStatus,
    messages,
    aiDraft,
    unread: ticket.unread,
    assignedTo: ticket.assignedTo,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    slaDeadline: addHours(ticket.createdAt, slaHours)
  };
});

// Helper: Generate realistic agent responses based on subject
function getAgentResponse(subject: string, isResolved: boolean): string {
  const lowerSubject = subject.toLowerCase();

  if (lowerSubject.includes("wrong size") || lowerSubject.includes("wrong item")) {
    return isResolved
      ? "I've processed your exchange and expedited shipping. You should receive the correct item within 2-3 business days. Tracking number: USPS-9876543210"
      : "I've initiated an exchange for the correct size. I'll send you a prepaid return label via email shortly.";
  }

  if (lowerSubject.includes("charged twice") || lowerSubject.includes("duplicate charge")) {
    return isResolved
      ? "The duplicate charge has been refunded to your original payment method. You should see it reflected in 3-5 business days."
      : "I've confirmed the duplicate charge and submitted a refund request. Processing typically takes 3-5 business days.";
  }

  if (lowerSubject.includes("tracking") || lowerSubject.includes("delivered") || lowerSubject.includes("never received")) {
    return isResolved
      ? "I've confirmed with the carrier that the package was delivered to your neighbor. I've also issued a replacement shipment as a courtesy."
      : "I'm investigating this with our shipping carrier. I'll update you within 24 hours with a resolution.";
  }

  if (lowerSubject.includes("defective") || lowerSubject.includes("broken") || lowerSubject.includes("zipper")) {
    return isResolved
      ? "I've processed a full refund for the defective item. The refund will appear in your account within 3-5 business days."
      : "I apologize for the defective product. I'm processing a replacement or refund - which would you prefer?";
  }

  if (lowerSubject.includes("discount") || lowerSubject.includes("promo code")) {
    return isResolved
      ? "The code is now active! Just enter SAVE20 at checkout to receive your 20% discount."
      : "I've checked your account and the code should work now. If you still have issues, please let me know!";
  }

  if (lowerSubject.includes("bulk order") || lowerSubject.includes("partnership")) {
    return isResolved
      ? "Thank you for your interest! I've sent wholesale pricing and partnership details to your email. Looking forward to working together!"
      : "This sounds like a great opportunity! Our partnerships team will reach out within 24 hours with pricing and availability.";
  }

  // Default response
  return isResolved
    ? "This issue has been resolved. Please let us know if you need any further assistance!"
    : "Thank you for reaching out. I'm looking into this and will update you shortly.";
}

// Helper: Generate AI draft responses
function getAIDraftResponse(subject: string, priority: string): string {
  const lowerSubject = subject.toLowerCase();

  if (lowerSubject.includes("wrong size") || lowerSubject.includes("wrong item")) {
    return "I sincerely apologize for shipping the incorrect size. I'd be happy to expedite an exchange at no charge. I'll send you a prepaid return label right away and rush ship the correct size. Would you like me to proceed with this?";
  }

  if (lowerSubject.includes("charged twice")) {
    return "I apologize for the duplicate charge. I've immediately escalated this to our billing team for a full refund. The duplicate charge will be refunded to your original payment method within 24-48 hours. I'll send you a confirmation email with the refund reference number.";
  }

  if (lowerSubject.includes("bulk order") || lowerSubject.includes("partnership")) {
    return "Thank you for your interest in partnering with us! For bulk orders of 50+ units, I'd like to connect you with our wholesale team who can provide custom pricing and timeline. Can you share more details about your launch timeline? I'll have someone from our partnerships team reach out within 4 hours.";
  }

  if (lowerSubject.includes("never received") || lowerSubject.includes("delivered")) {
    return "I'm so sorry your package hasn't arrived despite showing as delivered. Let me investigate this with the carrier immediately. In the meantime, I can issue a replacement shipment today. Would you like me to proceed with sending a replacement while I investigate?";
  }

  if (lowerSubject.includes("defective") || lowerSubject.includes("broken")) {
    return "I'm very sorry the product arrived defective. This definitely isn't up to our quality standards. I can offer either a full refund or a replacement with expedited shipping at no charge. Which would you prefer?";
  }

  // Default for urgent
  if (priority === "urgent") {
    return "Thank you for contacting us. I understand this is urgent and I'm prioritizing your case. Let me review your account and get back to you with a solution within the hour.";
  }

  // Default
  return "Thank you for reaching out. I'm reviewing your case and will provide a solution shortly. Is there anything specific you'd like me to address first?";
}

// Helper: Generate AI draft reasoning
function getAIDraftReasoning(subject: string): string {
  const lowerSubject = subject.toLowerCase();

  if (lowerSubject.includes("wrong") || lowerSubject.includes("defective")) {
    return "Product issue requiring exchange/refund. Customer showed patience, prioritizing fast resolution.";
  }

  if (lowerSubject.includes("charged twice") || lowerSubject.includes("refund")) {
    return "Billing issue - immediate refund warranted. High confidence due to clear transaction history.";
  }

  if (lowerSubject.includes("bulk") || lowerSubject.includes("partnership")) {
    return "B2B opportunity - escalate to partnerships team. Potential high-value customer.";
  }

  if (lowerSubject.includes("tracking") || lowerSubject.includes("delivered")) {
    return "Shipping issue - offer replacement while investigating. Maintains trust during resolution.";
  }

  return "Standard support inquiry - offering immediate assistance and clear next steps.";
}

// Debug: Log queue distribution
const queueDistribution = mockConversations.reduce((acc, conv) => {
  acc[conv.queue] = (acc[conv.queue] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log('[MockData] Queue distribution:', queueDistribution);
console.log('[MockData] Total conversations:', mockConversations.length);
