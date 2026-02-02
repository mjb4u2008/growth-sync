"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatContainer } from "./components/ChatContainer";
import { MessageInput } from "./components/MessageInput";
import { HistoryDropdown } from "./components/HistoryDropdown";
import { useInsightsState } from "./store";
import { springConfigs } from "@/lib/spring-configs";

/**
 * Insights Page - Chat interface for querying e-commerce data
 * Mock-first demo with AI-powered responses including charts and deep dives
 */
export default function InsightsPage() {
  const createNewChat = useInsightsState((state) => state.createNewChat);

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 max-w-[1800px] mx-auto flex flex-col h-[calc(100vh-0px)]">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfigs.gentle}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold font-display text-[var(--text-primary)]">
                Insights Chat
              </h1>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Ask questions about your e-commerce data
              </p>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <HistoryDropdown />
              <Button
                variant="secondary"
                size="md"
                onClick={createNewChat}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                New Chat
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Optional Context Bar */}
        <motion.div
          className="mb-4 flex items-center gap-4 text-sm text-[var(--text-muted)]"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfigs.gentle, delay: 0.1 }}
        >
          <span className="text-[var(--text-secondary)]">$127K revenue today</span>
          <span>•</span>
          <span className="text-[var(--text-secondary)]">847 orders</span>
          <span>•</span>
          <span className="text-[var(--text-secondary)]">12 products need attention</span>
        </motion.div>

        {/* Chat Container - bordered box */}
        <motion.div
          className="flex-1 flex flex-col border border-[var(--border)] rounded-xl bg-white overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfigs.gentle, delay: 0.2 }}
        >
          {/* Chat Messages (scrollable) */}
          <ChatContainer />

          {/* Input (pinned to bottom) */}
          <div className="border-t border-[var(--border)] bg-[var(--bg-secondary)] p-4">
            <MessageInput />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
