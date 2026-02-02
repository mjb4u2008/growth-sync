"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsTabs } from "./components/SettingsTabs";
import { useSettingsState } from "./store";
import { springConfigs } from "@/lib/spring-configs";
import type { SettingsTab } from "./types";

// Import tab components
import { ProfileTab } from "./tabs/ProfileTab";
import { IntegrationsTab } from "./tabs/IntegrationsTab";
import { BusinessTab } from "./tabs/BusinessTab";
import { AIAutomationTab } from "./tabs/AIAutomationTab";
import { NotificationsTab } from "./tabs/NotificationsTab";
import { HelpTab } from "./tabs/HelpTab";
import { SecurityTab } from "./tabs/SecurityTab";
import { TeamTab } from "./tabs/TeamTab";
import { BillingTab } from "./tabs/BillingTab";
import { DataPrivacyTab } from "./tabs/DataPrivacyTab";

// Import modals
import { ConnectPlatformModal } from "./modals/ConnectPlatformModal";

/**
 * Settings page content with URL sync
 */
function SettingsContent() {
  const searchParams = useSearchParams();
  const activeTab = useSettingsState((state) => state.activeTab);
  const setActiveTab = useSettingsState((state) => state.setActiveTab);

  // Sync URL with active tab
  useEffect(() => {
    const tab = searchParams.get("tab") as SettingsTab;
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    } else if (!tab && activeTab !== "profile") {
      // Default to profile if no tab in URL
      setActiveTab("profile");
    }
  }, [searchParams, activeTab, setActiveTab]);

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "business":
        return <BusinessTab />;
      case "integrations":
        return <IntegrationsTab />;
      case "team":
        return <TeamTab />;
      case "billing":
        return <BillingTab />;
      case "notifications":
        return <NotificationsTab />;
      case "ai-automation":
        return <AIAutomationTab />;
      case "security":
        return <SecurityTab />;
      case "data-privacy":
        return <DataPrivacyTab />;
      case "help":
        return <HelpTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <>
      <SettingsHeader />
      <SettingsTabs />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfigs.gentle}
        className="mt-6"
      >
        {renderTab()}
      </motion.div>

      {/* Modals */}
      <ConnectPlatformModal />
    </>
  );
}

/**
 * Settings Page - Centralized settings hub for Growth Sync
 * Tabbed navigation with query params for tab state
 */
export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="px-8 py-8 max-w-[1800px] mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <SettingsContent />
        </Suspense>
      </div>
    </div>
  );
}
