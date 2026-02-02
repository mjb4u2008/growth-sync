import { create } from "zustand";
import { mockConversations } from "../data/mockData";
import { filterConversationsByQueue, getQueueCounts as getQueueCountsUtil } from "../lib/utils";
import type { Conversation, Queue } from "../types";

interface InboxState {
  conversations: Conversation[];
  selectedConversationId: string | null;
  currentQueue: Queue;
  searchQuery: string;
  isArchiving: boolean;
  isReplying: boolean;
  mobileView: "list" | "detail" | "customer";

  setSelectedConversation: (id: string | null) => void;
  setCurrentQueue: (queue: Queue) => void;
  setSearchQuery: (query: string) => void;
  archiveConversation: (id: string) => void;
  replyToConversation: (id: string, content: string) => void;
  assignConversation: (id: string, agent: string) => void;
  setMobileView: (view: "list" | "detail" | "customer") => void;

  getFilteredConversations: () => Conversation[];
  getQueueCounts: () => Record<Queue, number>;
  getSelectedConversation: () => Conversation | null;
}

export const useInboxState = create<InboxState>((set, get) => ({
  conversations: mockConversations,
  selectedConversationId: null,
  currentQueue: "urgent",
  searchQuery: "",
  isArchiving: false,
  isReplying: false,
  mobileView: "list",

  setSelectedConversation: (id) => {
    console.log('[Store] setSelectedConversation called with:', id);
    set({ selectedConversationId: id });
  },
  setCurrentQueue: (queue) => set({ currentQueue: queue }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setMobileView: (view) => set({ mobileView: view }),

  // Optimistic update: UI instantly updates, simulate 200ms network delay
  archiveConversation: (id) => {
    set({ isArchiving: true });
    set((state) => ({
      conversations: state.conversations.map(c =>
        c.id === id ? { ...c, queue: 'done' as Queue } : c
      ),
      selectedConversationId: null
    }));
    setTimeout(() => set({ isArchiving: false }), 200);
  },

  replyToConversation: (id, content) => {
    set({ isReplying: true });
    set((state) => ({
      conversations: state.conversations.map(c =>
        c.id === id ? {
          ...c,
          messages: [...c.messages, {
            id: `msg_${Date.now()}`,
            conversationId: id,
            author: "agent" as const,
            authorName: "You",
            content,
            timestamp: new Date(),
            channel: c.channel
          }],
          aiDraft: undefined,
          updatedAt: new Date()
        } : c
      )
    }));
    setTimeout(() => set({ isReplying: false }), 200);
  },

  assignConversation: (id, agent) => {
    set((state) => ({
      conversations: state.conversations.map(c =>
        c.id === id ? { ...c, assignedTo: agent } : c
      )
    }));
  },

  getFilteredConversations: () => {
    const { conversations, currentQueue, searchQuery } = get();
    let filtered = filterConversationsByQueue(conversations, currentQueue);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.customer.name.toLowerCase().includes(query) ||
        c.subject.toLowerCase().includes(query) ||
        c.preview.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  getQueueCounts: () => getQueueCountsUtil(get().conversations),

  getSelectedConversation: () => {
    const { conversations, selectedConversationId } = get();
    return conversations.find(c => c.id === selectedConversationId) || null;
  }
}));
