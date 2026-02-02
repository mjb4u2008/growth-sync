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
  const setCurrentQueue = useInboxState(state => state.setCurrentQueue);
  const archiveConversation = useInboxState(state => state.archiveConversation);
  const setSelectedConversation = useInboxState(state => state.setSelectedConversation);

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
      <div className="px-8 py-8 max-w-[1800px] mx-auto flex flex-col h-[calc(100vh-0px)]">
        {/* Header with stats */}
        <InboxHeader />

        {/* Toolbar with queue tabs and search */}
        <InboxToolbar />

        {/* Main content area - 3 panels in a container */}
        <div className="flex-1 overflow-hidden">
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
      </div>

      {/* Modals */}
      <CommandPalette open={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
      <KeyboardShortcutsHelp open={showKeyboardHelp} onClose={() => setShowKeyboardHelp(false)} />
    </div>
  );
}
