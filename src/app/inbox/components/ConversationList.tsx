"use client";

import React from "react";
import { Inbox, Search } from "lucide-react";
import { ConversationItem } from "./ConversationItem";
import { useInboxState } from "../hooks/useInboxState";

interface ConversationListProps {
  onSelectConversation?: (id: string) => void;
}

export function ConversationList({ onSelectConversation }: ConversationListProps = {}) {
  // ✅ Use individual selectors for reactivity
  const allConversations = useInboxState(state => state.conversations);
  const selectedConversationId = useInboxState(state => state.selectedConversationId);
  const setSelectedConversation = useInboxState(state => state.setSelectedConversation);
  const searchQuery = useInboxState(state => state.searchQuery);
  const currentQueue = useInboxState(state => state.currentQueue);

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    onSelectConversation?.(id);
  };

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

  // Debug logging
  console.log('[ConversationList] Current queue:', currentQueue);
  console.log('[ConversationList] Filtered conversations count:', conversations.length);
  console.log('[ConversationList] selectedConversationId:', selectedConversationId);

  if (conversations.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        {searchQuery ? (
          <>
            <Search className="h-12 w-12 text-[var(--text-muted)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No matches found</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Try adjusting your search query
            </p>
          </>
        ) : (
          <>
            <Inbox className="h-12 w-12 text-[var(--text-muted)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">All caught up!</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              No conversations in this queue
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isSelected={conversation.id === selectedConversationId}
          onClick={() => handleSelectConversation(conversation.id)}
        />
      ))}
    </div>
  );
}
