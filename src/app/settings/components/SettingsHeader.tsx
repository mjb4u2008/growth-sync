"use client";

import { motion } from "framer-motion";
import { springConfigs } from "@/lib/spring-configs";

/**
 * SettingsHeader - Page title with description
 */
export function SettingsHeader() {
  return (
    <div className="mb-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfigs.gentle}
      >
        <h1 className="text-2xl font-bold font-display text-[var(--text-primary)]">
          Settings
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Manage your account and preferences
        </p>
      </motion.div>
    </div>
  );
}
