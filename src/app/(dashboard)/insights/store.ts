// Zustand store for Insights Chat Demo
// Follows useInboxState.ts pattern with individual selectors for reactivity

import { create } from "zustand";
import { matchQuery } from "./mockData";
import { sleep } from "@/lib/utils";
import type { ChatMessage, UserMessage, AIMessage, StepStatus, Conversation } from "./types";

// localStorage helpers
const STORAGE_KEY = "insights-conversations";
const MAX_CONVERSATIONS = 20;

function saveToLocalStorage(conversations: Conversation[], activeId: string | null) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        conversations: conversations.slice(-MAX_CONVERSATIONS), // Keep only last 20
        activeId,
      })
    );
  } catch (e) {
    console.warn("Failed to save to localStorage:", e);
  }
}

function loadFromLocalStorage(): {
  conversations: Conversation[];
  activeId: string | null;
} {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return { conversations: [], activeId: null };

    const parsed = JSON.parse(data);
    // Convert date strings back to Date objects
    const conversations = parsed.conversations.map((c: any) => ({
      ...c,
      createdAt: new Date(c.createdAt),
      updatedAt: new Date(c.updatedAt),
      messages: c.messages.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      })),
    }));

    return { conversations, activeId: parsed.activeId };
  } catch (e) {
    console.warn("Failed to load from localStorage:", e);
    return { conversations: [], activeId: null };
  }
}

function truncateTitle(text: string, maxLength: number = 30): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

interface InsightsState {
  // Message state
  messages: ChatMessage[];
  isTyping: boolean;
  suggestedQueriesVisible: boolean;

  // Conversation history
  conversations: Conversation[];
  activeConversationId: string | null;

  // Actions - Message flow
  sendMessage: (content: string) => void;
  receiveAIResponse: (response: AIMessage) => void;
  startTyping: () => void;
  stopTyping: () => void;
  hideSuggestedQueries: () => void;

  // Actions - Conversation management
  createNewChat: () => void;
  switchConversation: (id: string) => void;
  saveCurrentConversation: () => void;

  // Actions - Deep dive animation
  updateDeepDiveStep: (messageId: string, stepId: string, status: StepStatus) => void;
  completeDeepDive: (messageId: string, result: any) => void;
}

export const useInsightsState = create<InsightsState>((set, get) => {
  // Load from localStorage on init
  const { conversations, activeId } = loadFromLocalStorage();
  const activeConversation = activeId
    ? conversations.find((c) => c.id === activeId)
    : null;

  return {
    // Initial state
    messages: activeConversation?.messages || [],
    isTyping: false,
    suggestedQueriesVisible: !activeConversation || activeConversation.messages.length === 0,
    conversations,
    activeConversationId: activeId,

  // Send user message and trigger AI response
    sendMessage: async (content: string) => {
      const {
        messages,
        activeConversationId,
        conversations,
        hideSuggestedQueries,
        startTyping,
        stopTyping,
        receiveAIResponse,
        saveCurrentConversation,
      } = get();

      // Hide suggested queries after first message
      hideSuggestedQueries();

      // Create new conversation if none exists
      if (!activeConversationId) {
        const newConversation: Conversation = {
          id: `conv_${Date.now()}`,
          title: truncateTitle(content),
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set({
          conversations: [...conversations, newConversation],
          activeConversationId: newConversation.id,
        });
      }

      // Add user message immediately (optimistic update)
      const userMessage: UserMessage = {
        id: `user_${Date.now()}`,
        role: "user",
        content,
        timestamp: new Date(),
      };

      set({ messages: [...messages, userMessage] });
      saveCurrentConversation();

      // Show typing indicator
      startTyping();

      // Simulate AI thinking time (800-1500ms)
      const thinkingTime = 800 + Math.random() * 700;
      await sleep(thinkingTime);

      // Match query to response
      const aiResponse = matchQuery(content);

      // Add AI response
      receiveAIResponse(aiResponse);

      // Stop typing indicator
      stopTyping();

      // Save after AI response
      saveCurrentConversation();
    },

  // Add AI response to messages
  receiveAIResponse: (response: AIMessage) => {
    const { messages } = get();
    set({ messages: [...messages, response] });
  },

  // Typing indicator
  startTyping: () => set({ isTyping: true }),
  stopTyping: () => set({ isTyping: false }),

  // Suggested queries
    hideSuggestedQueries: () => set({ suggestedQueriesVisible: false }),

    // Create new chat
    createNewChat: () => {
      const { saveCurrentConversation } = get();
      saveCurrentConversation(); // Save current before switching

      set({
        messages: [],
        activeConversationId: null,
        suggestedQueriesVisible: true,
        isTyping: false,
      });
    },

    // Switch to existing conversation
    switchConversation: (id: string) => {
      const { conversations, saveCurrentConversation } = get();
      saveCurrentConversation(); // Save current before switching

      const conversation = conversations.find((c) => c.id === id);
      if (!conversation) return;

      set({
        messages: conversation.messages,
        activeConversationId: id,
        suggestedQueriesVisible: conversation.messages.length === 0,
        isTyping: false,
      });

      saveToLocalStorage(conversations, id);
    },

    // Save current conversation to localStorage
    saveCurrentConversation: () => {
      const { messages, activeConversationId, conversations } = get();

      if (!activeConversationId || messages.length === 0) {
        saveToLocalStorage(conversations, activeConversationId);
        return;
      }

      const updatedConversations = conversations.map((c) => {
        if (c.id === activeConversationId) {
          return {
            ...c,
            messages,
            updatedAt: new Date(),
            // Update title from first message if it's still default
            title:
              c.messages.length === 0 && messages.length > 0 && messages[0].role === "user"
                ? truncateTitle(messages[0].content)
                : c.title,
          };
        }
        return c;
      });

      set({ conversations: updatedConversations });
      saveToLocalStorage(updatedConversations, activeConversationId);
    },

  // Update single deep dive step status
  updateDeepDiveStep: (messageId: string, stepId: string, status: StepStatus) => {
    const { messages } = get();

    const updatedMessages = messages.map((msg) => {
      if (msg.id === messageId && msg.role === "ai" && msg.type === "deepDive") {
        return {
          ...msg,
          steps: msg.steps.map((step) =>
            step.id === stepId ? { ...step, status } : step
          ),
        };
      }
      return msg;
    });

    set({ messages: updatedMessages });
  },

  // Complete deep dive with final result
  completeDeepDive: (messageId: string, result: any) => {
    const { messages } = get();

    const updatedMessages = messages.map((msg) => {
      if (msg.id === messageId && msg.role === "ai" && msg.type === "deepDive") {
        return {
          ...msg,
          result,
        };
      }
      return msg;
    });

    set({ messages: updatedMessages });
    },
  };
});
