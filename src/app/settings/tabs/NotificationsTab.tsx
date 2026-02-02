"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, Smartphone } from "lucide-react";
import { SettingsSection } from "../components/SettingsSection";
import { SettingsRow } from "../components/SettingsRow";
import { Button } from "@/components/ui/button";
import { useSettingsState } from "../store";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";
import type { NotificationPreference } from "../types";

/**
 * NotificationsTab - Email and push notification preferences
 * Allows users to configure which notifications they want to receive
 */
export function NotificationsTab() {
  const notifications = useSettingsState((state) => state.notifications);
  const updateNotifications = useSettingsState((state) => state.updateNotifications);

  const [formData, setFormData] = useState<NotificationPreference[]>(notifications);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [dailyDigestTime, setDailyDigestTime] = useState("09:00");
  const [weeklyReportDay, setWeeklyReportDay] = useState("Monday");

  const handleToggle = (key: string) => {
    setFormData((prev) =>
      prev.map((notif) =>
        notif.key === key ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    updateNotifications(formData);
    setIsSaving(false);
    setHasChanges(false);

    // TODO: Connect to PATCH /api/notifications/preferences endpoint
    // const response = await fetch("/api/notifications/preferences", {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ preferences: formData, dailyDigestTime, weeklyReportDay }),
    // });
    // if (!response.ok) throw new Error("Failed to update notifications");

    // Show success feedback (toast would go here)
    alert("Notification preferences updated successfully!");
  };

  // Group notifications by category
  const inboxNotifs = formData.filter((n) => n.category === "inbox");
  const orderNotifs = formData.filter((n) => n.category === "orders");
  const platformNotifs = formData.filter((n) => n.category === "platform");
  const accountNotifs = formData.filter((n) => n.category === "account");

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 0 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Notification Channels"
          description="Choose how you want to receive notifications"
        >
          <div className="space-y-4">
            <SettingsRow
              label="Email Notifications"
              description="Receive updates via email"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--text-secondary)]" />
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            </SettingsRow>

            <SettingsRow
              label="Push Notifications"
              description="Browser and mobile push notifications"
            >
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[var(--text-secondary)]" />
                <input type="checkbox" defaultChecked disabled className="w-4 h-4 opacity-50" />
                <span className="text-xs text-[var(--text-secondary)]">(Coming Soon)</span>
              </div>
            </SettingsRow>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Inbox & Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 1 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Inbox & Support"
          description="Notifications about customer inquiries and tickets"
        >
          <div className="space-y-4">
            {inboxNotifs.map((notif) => (
              <SettingsRow
                key={notif.key}
                label={notif.label}
                description={notif.frequency ? `Frequency: ${notif.frequency}` : undefined}
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notif.enabled}
                    onChange={() => handleToggle(notif.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--accent)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
                </label>
              </SettingsRow>
            ))}
          </div>
        </SettingsSection>
      </motion.div>

      {/* Orders & Inventory */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 2 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Orders & Inventory"
          description="Alerts about stock levels and order sync issues"
        >
          <div className="space-y-4">
            {orderNotifs.map((notif) => (
              <SettingsRow
                key={notif.key}
                label={notif.label}
                description={notif.frequency ? `Frequency: ${notif.frequency}` : undefined}
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notif.enabled}
                    onChange={() => handleToggle(notif.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--accent)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
                </label>
              </SettingsRow>
            ))}
          </div>
        </SettingsSection>
      </motion.div>

      {/* Platform & System */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 3 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Platform & System"
          description="Integration status and system updates"
        >
          <div className="space-y-4">
            {platformNotifs.map((notif) => (
              <SettingsRow
                key={notif.key}
                label={notif.label}
                description={notif.frequency ? `Frequency: ${notif.frequency}` : undefined}
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notif.enabled}
                    onChange={() => handleToggle(notif.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--accent)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
                </label>
              </SettingsRow>
            ))}
          </div>
        </SettingsSection>
      </motion.div>

      {/* Account & Billing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 4 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Account & Billing"
          description="Team activity and billing notifications"
        >
          <div className="space-y-4">
            {accountNotifs.map((notif) => (
              <SettingsRow
                key={notif.key}
                label={notif.label}
                description={notif.frequency ? `Frequency: ${notif.frequency}` : undefined}
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notif.enabled}
                    onChange={() => handleToggle(notif.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--accent)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
                </label>
              </SettingsRow>
            ))}
          </div>
        </SettingsSection>
      </motion.div>

      {/* Notification Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 5 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Notification Schedule"
          description="Configure timing for digest emails and reports"
        >
          <div className="space-y-4">
            <SettingsRow
              label="Daily Digest Time"
              description="When to receive your daily summary email"
            >
              <select
                value={dailyDigestTime}
                onChange={(e) => {
                  setDailyDigestTime(e.target.value);
                  setHasChanges(true);
                }}
                className="px-3 py-2 bg-white border border-[var(--border)] rounded-lg text-sm max-w-xs"
              >
                <option value="06:00">6:00 AM</option>
                <option value="07:00">7:00 AM</option>
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="18:00">6:00 PM</option>
              </select>
            </SettingsRow>

            <SettingsRow
              label="Weekly Report Day"
              description="When to receive your weekly summary"
            >
              <select
                value={weeklyReportDay}
                onChange={(e) => {
                  setWeeklyReportDay(e.target.value);
                  setHasChanges(true);
                }}
                className="px-3 py-2 bg-white border border-[var(--border)] rounded-lg text-sm max-w-xs"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </SettingsRow>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 6 * staggerDelays.tight }}
        className="flex justify-end gap-3"
      >
        <Button
          variant="secondary"
          size="md"
          disabled={!hasChanges || isSaving}
          onClick={() => {
            setFormData(notifications);
            setHasChanges(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="md"
          disabled={!hasChanges || isSaving}
          onClick={handleSave}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </motion.div>
    </div>
  );
}
