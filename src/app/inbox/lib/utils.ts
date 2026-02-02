import type { Channel, SLAStatus, Queue, Conversation } from "../types";
import { type LucideIcon, Mail, MessageSquare, Instagram, MessageCircle, Hash } from "lucide-react";
import { differenceInMinutes } from "date-fns";

// Platform-specific colors (match dashboard pattern)
export function getChannelColor(channel: Channel): string {
  const colors: Record<Channel, string> = {
    email: "#3B82F6",
    tiktok: "#00F2EA",
    instagram: "#E1306C",
    sms: "#22C55E",
    facebook: "#1877F2"
  };
  return colors[channel];
}

export function getChannelIcon(channel: Channel): LucideIcon {
  const icons: Record<Channel, LucideIcon> = {
    email: Mail,
    sms: MessageSquare,
    instagram: Instagram,
    facebook: MessageCircle,
    tiktok: Hash
  };
  return icons[channel];
}

export function getSLATimeRemaining(deadline: Date): { hours: number; minutes: number; isExpired: boolean } {
  const now = new Date();
  const diffMinutes = differenceInMinutes(deadline, now);

  return {
    hours: Math.floor(Math.abs(diffMinutes) / 60),
    minutes: Math.abs(diffMinutes) % 60,
    isExpired: diffMinutes < 0
  };
}

export function getSLAStatusColor(status: SLAStatus): string {
  return status === "healthy" ? "#22A861" : status === "at_risk" ? "#F59E0B" : "#EF4444";
}

export function filterConversationsByQueue(conversations: Conversation[], queue: Queue): Conversation[] {
  return conversations
    .filter(c => c.queue === queue)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

export function getQueueCounts(conversations: Conversation[]): Record<Queue, number> {
  return {
    urgent: conversations.filter(c => c.queue === "urgent").length,
    open: conversations.filter(c => c.queue === "open").length,
    pending: conversations.filter(c => c.queue === "pending").length,
    done: conversations.filter(c => c.queue === "done").length
  };
}
