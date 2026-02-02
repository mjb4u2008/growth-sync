"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare } from "lucide-react";
import { useInsightsState } from "../store";
import { springConfigs } from "@/lib/spring-configs";
import { formatDistanceToNow } from "date-fns";

/**
 * HistoryDropdown - Shows past conversations with relative timestamps
 * Click to switch conversation, auto-closes on selection
 */
export function HistoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const conversations = useInsightsState((state) => state.conversations);
  const activeConversationId = useInsightsState((state) => state.activeConversationId);
  const switchConversation = useInsightsState((state) => state.switchConversation);

  // Sort by updatedAt descending (most recent first), limit to 10
  const recentConversations = [...conversations]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 10);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (id: string) => {
    switchConversation(id);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] bg-white border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors"
      >
        <span>History</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={springConfigs.quick}
            className="absolute right-0 top-full mt-2 w-80 bg-white border border-[var(--border)] rounded-xl shadow-lg overflow-hidden z-50"
          >
            {/* Empty state */}
            {recentConversations.length === 0 && (
              <div className="px-4 py-8 text-center">
                <MessageSquare className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
                <p className="text-sm text-[var(--text-secondary)]">
                  No past conversations
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Start chatting to see history here
                </p>
              </div>
            )}

            {/* Conversation list */}
            {recentConversations.length > 0 && (
              <div className="py-2">
                {recentConversations.map((conversation) => {
                  const isActive = conversation.id === activeConversationId;
                  const relativeTime = formatDistanceToNow(conversation.updatedAt, {
                    addSuffix: true,
                  });

                  return (
                    <button
                      key={conversation.id}
                      onClick={() => handleSelect(conversation.id)}
                      className={`w-full px-4 py-3 flex items-start justify-between gap-3 hover:bg-[var(--bg-secondary)] transition-colors text-left ${
                        isActive ? "bg-[var(--bg-secondary)]" : ""
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            isActive
                              ? "text-[var(--accent)]"
                              : "text-[var(--text-primary)]"
                          }`}
                        >
                          {conversation.title}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                          {conversation.messages.length} message
                          {conversation.messages.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                        {relativeTime}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
