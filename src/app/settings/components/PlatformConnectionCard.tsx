"use client";

import { ShoppingBag, Video, Package, Mail, MessageSquare, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";
import type { Integration } from "../types";

const platformConfig = {
  shopify: {
    name: "Shopify",
    icon: ShoppingBag,
    color: "#96BF48",
    description: "Sync products, orders, and inventory from your Shopify store",
  },
  tiktok: {
    name: "TikTok Shop",
    icon: Video,
    color: "#00F2EA",
    description: "Connect your TikTok Shop to manage products and orders",
  },
  amazon: {
    name: "Amazon Seller",
    icon: Package,
    color: "#FF9900",
    description: "Integrate with Amazon Seller Central for order management",
  },
  instagram: {
    name: "Instagram Shop",
    icon: Video,
    color: "#E1306C",
    description: "Connect Instagram Shopping for seamless product listings",
  },
  gmail: {
    name: "Gmail",
    icon: Mail,
    color: "#EA4335",
    description: "Connect Gmail for customer support email automation",
  },
  twilio: {
    name: "Twilio SMS",
    icon: MessageSquare,
    color: "#F22F46",
    description: "Send SMS notifications and support messages",
  },
  packsmith: {
    name: "Packsmith 3PL",
    icon: Truck,
    color: "#4CAF50",
    description: "Connect to Packsmith for fulfillment and shipping",
  },
  shipstation: {
    name: "ShipStation",
    icon: Truck,
    color: "#3B5998",
    description: "Integrate with ShipStation for multi-carrier shipping",
  },
};

interface PlatformConnectionCardProps {
  integration: Integration;
  onConnect: () => void;
  onDisconnect: () => void;
}

/**
 * PlatformConnectionCard - Shows integration status and actions
 * Displays different UI for connected/disconnected/coming_soon states
 */
export function PlatformConnectionCard({
  integration,
  onConnect,
  onDisconnect,
}: PlatformConnectionCardProps) {
  const config = platformConfig[integration.platform];
  const Icon = config.icon;

  const isComingSoon = integration.status === "coming_soon";

  return (
    <div
      className={`flex items-start justify-between p-4 border rounded-xl transition-colors ${
        isComingSoon
          ? "bg-gray-50 border-gray-200 opacity-60"
          : integration.connected
          ? "bg-green-50 border-green-200"
          : "bg-white border-[var(--border)] hover:border-[var(--accent)]"
      }`}
    >
      <div className="flex items-start gap-4 flex-1">
        {/* Icon and status indicator */}
        <div className="relative">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${config.color}15` }}
          >
            <Icon
              className="w-6 h-6"
              style={{ color: config.color }}
            />
          </div>
          {/* Status dot */}
          <div
            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              integration.connected
                ? "bg-green-500"
                : isComingSoon
                ? "bg-purple-500"
                : "bg-gray-400"
            }`}
          />
        </div>

        {/* Platform info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-[var(--text-primary)]">
              {config.name}
            </h4>
            {integration.connected && (
              <Badge variant="success" size="sm">
                Connected
              </Badge>
            )}
            {isComingSoon && (
              <Badge variant="neutral" size="sm">
                Coming Soon
              </Badge>
            )}
          </div>

          <p className="text-xs text-[var(--text-secondary)] mb-2">
            {config.description}
          </p>

          {/* Connected state details */}
          {integration.connected && integration.accountIdentifier && (
            <div className="space-y-1">
              <p className="text-xs text-[var(--text-secondary)]">
                <span className="font-medium">Account:</span> {integration.accountIdentifier}
              </p>
              {integration.lastSyncedAt && (
                <p className="text-xs text-[var(--text-secondary)]">
                  <span className="font-medium">Last synced:</span>{" "}
                  {formatRelativeTime(integration.lastSyncedAt)}
                </p>
              )}
              {integration.stats && (
                <div className="flex gap-4 mt-2">
                  {integration.stats.productsSynced !== undefined && (
                    <div className="text-xs">
                      <span className="font-mono font-semibold text-[var(--text-primary)]">
                        {integration.stats.productsSynced}
                      </span>
                      <span className="text-[var(--text-secondary)] ml-1">products</span>
                    </div>
                  )}
                  {integration.stats.ordersSynced !== undefined && (
                    <div className="text-xs">
                      <span className="font-mono font-semibold text-[var(--text-primary)]">
                        {integration.stats.ordersSynced}
                      </span>
                      <span className="text-[var(--text-secondary)] ml-1">orders</span>
                    </div>
                  )}
                  {integration.stats.emailsProcessed !== undefined && (
                    <div className="text-xs">
                      <span className="font-mono font-semibold text-[var(--text-primary)]">
                        {integration.stats.emailsProcessed}
                      </span>
                      <span className="text-[var(--text-secondary)] ml-1">emails</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="ml-4">
        {isComingSoon ? (
          <Button variant="secondary" size="sm" disabled>
            Notify Me
          </Button>
        ) : integration.connected ? (
          <Button variant="ghost" size="sm" onClick={onDisconnect}>
            Disconnect
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={onConnect}>
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}
