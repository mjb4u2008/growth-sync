"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { InboxHeader } from "./components/InboxHeader";
import { InboxToolbar } from "./components/InboxToolbar";
import { ConversationList } from "./components/ConversationList";
import { ConversationDetail } from "./components/ConversationDetail";
import { CustomerPanel } from "./components/CustomerPanel";
import { CommandPalette } from "./components/CommandPalette";
import { KeyboardShortcutsHelp } from "./components/KeyboardShortcutsHelp";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useInboxState } from "./hooks/useInboxState";
import { springConfigs } from "@/lib/spring-configs";

export default function InboxPage() {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  // ✅ Use individual selectors for reactivity
  const allConversations = useInboxState(state => state.conversations);
  const selectedConversationId = useInboxState(state => state.selectedConversationId);
  const currentQueue = useInboxState(state => state.currentQueue);
  const searchQuery = useInboxState(state => state.searchQuery);
  const mobileView = useInboxState(state => state.mobileView);
  const setCurrentQueue = useInboxState(state => state.setCurrentQueue);
  const archiveConversation = useInboxState(state => state.archiveConversation);
  const setSelectedConversation = useInboxState(state => state.setSelectedConversation);
  const setMobileView = useInboxState(state => state.setMobileView);

  // Filter conversations locally (reactive)
  const conversations = React.useMemo(() => {
    let filtered = allConversations.filter(c => c.queue === currentQueue);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.customer.name.toLowerCase().includes(query) ||
        c.subject.toLowerCase().includes(query) ||
        c.preview.toLowerCase().includes(query)
      );
    }
    return filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }, [allConversations, currentQueue, searchQuery]);

  // Find selected conversation locally (reactive)
  const selectedConversation = selectedConversationId
    ? allConversations.find(c => c.id === selectedConversationId) || null
    : null;

  // Implement actual navigation logic
  const handleNavigateNext = () => {
    if (!selectedConversation && conversations.length > 0) {
      setSelectedConversation(conversations[0].id);
      return;
    }

    const currentIndex = conversations.findIndex(c => c.id === selectedConversation?.id);
    if (currentIndex < conversations.length - 1) {
      setSelectedConversation(conversations[currentIndex + 1].id);
    }
  };

  const handleNavigatePrev = () => {
    if (!selectedConversation && conversations.length > 0) {
      setSelectedConversation(conversations[0].id);
      return;
    }

    const currentIndex = conversations.findIndex(c => c.id === selectedConversation?.id);
    if (currentIndex > 0) {
      setSelectedConversation(conversations[currentIndex - 1].id);
    }
  };

  const handleArchive = () => {
    if (selectedConversation) {
      archiveConversation(selectedConversation.id);
    }
  };

  const handleReply = () => {
    // Focus the reply composer textarea
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.focus();
    }
  };

  const handleAssign = () => {
    // Placeholder for assign functionality
    console.log('Assign conversation');
  };

  // Wire up keyboard shortcuts
  useKeyboardShortcuts({
    onNavigateNext: handleNavigateNext,
    onNavigatePrev: handleNavigatePrev,
    onArchive: handleArchive,
    onReply: handleReply,
    onAssign: handleAssign,
    onOpenCommandPalette: () => setShowCommandPalette(true),
    onShowHelp: () => setShowKeyboardHelp(true),
    onSwitchQueue: (queue) => setCurrentQueue(queue)
  });

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 max-w-[1800px] mx-auto flex flex-col h-[calc(100vh-0px)]">
        {/* Header with stats */}
        <InboxHeader />

        {/* Toolbar with queue tabs and search */}
        <InboxToolbar />

        {/* Desktop: 3-panel layout */}
        <div className="hidden lg:block flex-1 overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springConfigs.gentle}
          >
            {/* Conversation List - 320px */}
            <div className="w-[320px] border-r border-[var(--border)]">
              <ConversationList />
            </div>

            {/* Conversation Detail - flex-1 */}
            <div className="flex-1 border-r border-[var(--border)]">
              <ConversationDetail />
            </div>

            {/* Customer Panel - conditional, 320px */}
            {selectedConversation && (
              <motion.div
                className="w-[320px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={springConfigs.gentle}
              >
                <CustomerPanel customer={selectedConversation.customer} />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Mobile: Single-panel with navigation */}
        <div className="lg:hidden flex-1 overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springConfigs.gentle}
          >
            {mobileView === "list" && (
              <ConversationList
                onSelectConversation={(id) => {
                  setSelectedConversation(id);
                  setMobileView("detail");
                }}
              />
            )}
            {mobileView === "detail" && (
              <ConversationDetail
                onBack={() => setMobileView("list")}
                onViewCustomer={() => setMobileView("customer")}
              />
            )}
            {mobileView === "customer" && selectedConversation && (
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
                  <button
                    onClick={() => setMobileView("detail")}
                    className="p-2 -ml-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-lg font-semibold">Customer Info</h2>
                </div>
                <div className="flex-1 overflow-auto">
                  <CustomerPanel customer={selectedConversation.customer} />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <CommandPalette open={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
      <KeyboardShortcutsHelp open={showKeyboardHelp} onClose={() => setShowKeyboardHelp(false)} />
    </div>
  );
}
