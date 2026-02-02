"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { SettingsSection } from "../components/SettingsSection";
import { SettingsRow } from "../components/SettingsRow";
import { PlatformConnectionCard } from "../components/PlatformConnectionCard";
import { Button } from "@/components/ui/button";
import { useSettingsState } from "../store";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";

/**
 * IntegrationsTab - OAuth connector management (KEY TAB)
 * Shows connected/disconnected state for all platforms
 * Allows simulated OAuth connection/disconnection
 */
export function IntegrationsTab() {
  const integrations = useSettingsState((state) => state.integrations);
  const connectIntegration = useSettingsState((state) => state.connectIntegration);
  const disconnectIntegration = useSettingsState((state) => state.disconnectIntegration);
  const openConnectPlatformModal = useSettingsState((state) => state.openConnectPlatformModal);

  // Group integrations by category
  const { ecommerce, communication, fulfillment } = useMemo(() => {
    return {
      ecommerce: integrations.filter((i) =>
        ["shopify", "tiktok", "amazon", "instagram"].includes(i.platform)
      ),
      communication: integrations.filter((i) =>
        ["gmail", "twilio"].includes(i.platform)
      ),
      fulfillment: integrations.filter((i) =>
        ["packsmith", "shipstation"].includes(i.platform)
      ),
    };
  }, [integrations]);

  const handleConnect = (platform: string) => {
    openConnectPlatformModal(platform);

    // Simulate OAuth flow with timeout
    setTimeout(() => {
      connectIntegration(platform);
      // Modal will be closed by the modal component
    }, 1500);
  };

  const handleDisconnect = (platform: string) => {
    if (confirm(`Are you sure you want to disconnect ${platform}?`)) {
      disconnectIntegration(platform);
    }
  };

  const handleSyncAll = () => {
    alert("Syncing all connected platforms... (mock action)");
  };

  return (
    <div className="space-y-6">
      {/* E-Commerce Platforms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 0 * staggerDelays.tight }}
      >
        <SettingsSection
          title="E-Commerce Platforms"
          description="Connect your online stores to sync products, orders, and inventory"
        >
          <div className="space-y-3">
            {ecommerce.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ...springConfigs.bouncy,
                  delay: index * staggerDelays.tight + 0.1,
                }}
              >
                <PlatformConnectionCard
                  integration={integration}
                  onConnect={() => handleConnect(integration.platform)}
                  onDisconnect={() => handleDisconnect(integration.platform)}
                />
              </motion.div>
            ))}
          </div>
        </SettingsSection>
      </motion.div>

      {/* Communication Channels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 1 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Communication Channels"
          description="Connect email and SMS for customer support automation"
        >
          <div className="space-y-3">
            {communication.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ...springConfigs.bouncy,
                  delay: index * staggerDelays.tight + 0.2,
                }}
              >
                <PlatformConnectionCard
                  integration={integration}
                  onConnect={() => handleConnect(integration.platform)}
                  onDisconnect={() => handleDisconnect(integration.platform)}
                />
              </motion.div>
            ))}
          </div>
        </SettingsSection>
      </motion.div>

      {/* Fulfillment & Logistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 2 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Fulfillment & Logistics"
          description="Connect 3PL providers and shipping carriers"
        >
          <div className="space-y-3">
            {fulfillment.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ...springConfigs.bouncy,
                  delay: index * staggerDelays.tight + 0.3,
                }}
              >
                <PlatformConnectionCard
                  integration={integration}
                  onConnect={() => handleConnect(integration.platform)}
                  onDisconnect={() => handleDisconnect(integration.platform)}
                />
              </motion.div>
            ))}
          </div>
        </SettingsSection>
      </motion.div>

      {/* Sync Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 3 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Sync Settings"
          description="Configure how and when data syncs across platforms"
        >
          <div className="space-y-3">
            <SettingsRow
              label="Auto-sync frequency"
              description="How often to automatically sync data"
            >
              <select className="px-3 py-2 bg-white border border-[var(--border)] rounded-lg text-sm">
                <option>Every 15 minutes</option>
                <option>Every 30 minutes</option>
                <option>Every hour</option>
                <option>Manual only</option>
              </select>
            </SettingsRow>

            <SettingsRow
              label="Sync on webhook"
              description="Sync immediately when platforms send updates"
            >
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </SettingsRow>

            <div className="pt-4">
              <Button
                variant="primary"
                size="md"
                onClick={handleSyncAll}
              >
                Sync All Now
              </Button>
            </div>
          </div>
        </SettingsSection>
      </motion.div>
    </div>
  );
}
