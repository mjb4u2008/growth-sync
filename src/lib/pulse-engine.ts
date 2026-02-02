import { subMinutes, subSeconds } from "date-fns";

/**
 * The Pulse Engine - Generates real-time business events for The Pulse
 * Each event becomes a flowing dot on the pulse strip
 */

export type PulseEventType = "order" | "sync" | "message" | "review" | "return" | "system";
export type Platform = "shopify" | "tiktok" | "amazon" | "instagram" | "email";

export interface PulseEvent {
  id: string;
  type: PulseEventType;
  platform: Platform;
  amount?: number;
  description: string;
  timestamp: Date;
  color: string;
}

const eventColors: Record<PulseEventType, string> = {
  order: "#22A861",      // Green - Sales
  sync: "#3B82F6",       // Blue - Inventory sync
  message: "#F59E0B",    // Yellow - Messages
  review: "#A855F7",     // Purple - Reviews
  return: "#EF4444",     // Red - Returns/Refunds
  system: "#9CA3AF",     // White/Gray - System events
};

const platformNames: Record<Platform, string> = {
  shopify: "Shopify",
  tiktok: "TikTok",
  amazon: "Amazon",
  instagram: "Instagram",
  email: "Email",
};

/**
 * Generate realistic pulse events for the last 60 minutes
 */
export function generatePulseEvents(count: number = 120): PulseEvent[] {
  const events: PulseEvent[] = [];
  const now = new Date();

  // Generate events spread across last 60 minutes
  for (let i = 0; i < count; i++) {
    const minutesAgo = Math.floor((i / count) * 60);
    const secondsOffset = Math.floor(Math.random() * 60);
    const timestamp = subSeconds(subMinutes(now, minutesAgo), secondsOffset);

    const type = getRandomEventType();
    const platform = getRandomPlatform();

    events.push({
      id: `pulse_${timestamp.getTime()}_${i}`,
      type,
      platform,
      amount: type === "order" ? 20 + Math.random() * 200 : undefined,
      description: generateEventDescription(type, platform),
      timestamp,
      color: eventColors[type],
    });
  }

  // Sort by timestamp (oldest first, will flow right to left)
  return events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

function getRandomEventType(): PulseEventType {
  const weights = {
    order: 0.4,       // 40% orders
    sync: 0.2,        // 20% syncs
    message: 0.15,    // 15% messages
    review: 0.1,      // 10% reviews
    return: 0.05,     // 5% returns
    system: 0.1,      // 10% system
  };

  const random = Math.random();
  let cumulative = 0;

  for (const [type, weight] of Object.entries(weights)) {
    cumulative += weight;
    if (random <= cumulative) {
      return type as PulseEventType;
    }
  }

  return "order";
}

function getRandomPlatform(): Platform {
  const platforms: Platform[] = ["shopify", "tiktok", "amazon", "instagram", "email"];
  const weights = [0.3, 0.35, 0.2, 0.1, 0.05]; // TikTok slightly favored

  const random = Math.random();
  let cumulative = 0;

  for (let i = 0; i < platforms.length; i++) {
    cumulative += weights[i];
    if (random <= cumulative) {
      return platforms[i];
    }
  }

  return "shopify";
}

function generateEventDescription(type: PulseEventType, platform: Platform): string {
  const platformName = platformNames[platform];

  const descriptions: Record<PulseEventType, string[]> = {
    order: [
      `New order on ${platformName}`,
      `Sale completed via ${platformName}`,
      `Order placed (${platformName})`,
    ],
    sync: [
      `Inventory synced to ${platformName}`,
      `${platformName} sync complete`,
      `Stock levels updated (${platformName})`,
    ],
    message: [
      `New message from ${platformName}`,
      `Customer inquiry (${platformName})`,
      `Support ticket created`,
    ],
    review: [
      `5-star review on ${platformName}`,
      `Product review posted`,
      `Customer feedback received`,
    ],
    return: [
      `Return requested on ${platformName}`,
      `Refund processed`,
      `Order cancelled`,
    ],
    system: [
      `${platformName} connected`,
      `System health check`,
      `Background sync`,
    ],
  };

  const options = descriptions[type];
  return options[Math.floor(Math.random() * options.length)];
}
