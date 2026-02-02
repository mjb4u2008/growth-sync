"use client";

import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useInsightsState } from "../store";
import { UserMessage } from "./messages/UserMessage";
import { AIMessage } from "./messages/AIMessage";
import { SuggestedQueries } from "./SuggestedQueries";
import { TypingIndicator } from "./TypingIndicator";

/**
 * ChatContainer - Scrollable message list with auto-scroll
 * Shows empty state, messages, typing indicator
 */
export function ChatContainer() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = useInsightsState((state) => state.messages);
  const isTyping = useInsightsState((state) => state.isTyping);
  const suggestedQueriesVisible = useInsightsState(
    (state) => state.suggestedQueriesVisible
  );

  const isEmpty = messages.length === 0;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto w-full">
      {/* Empty state with suggested queries - centered */}
      {isEmpty && suggestedQueriesVisible && (
        <div className="h-full flex items-center justify-center">
          <SuggestedQueries />
        </div>
      )}

      {/* Messages */}
      {!isEmpty && (
        <div className="max-w-4xl mx-auto p-6">
          {messages.map((message) => {
            if (message.role === "user") {
              return <UserMessage key={message.id} message={message} />;
            } else {
              return <AIMessage key={message.id} message={message} />;
            }
          })}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
