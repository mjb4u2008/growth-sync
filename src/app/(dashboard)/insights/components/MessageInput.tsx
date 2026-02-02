"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInsightsState } from "../store";

/**
 * MessageInput - Textarea with send button
 * Keyboard shortcuts: Enter = send, Shift+Enter = newline, Escape = clear
 * Disabled while AI is typing
 */
export function MessageInput() {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = useInsightsState((state) => state.sendMessage);
  const isTyping = useInsightsState((state) => state.isTyping);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isTyping) return;

    sendMessage(trimmed);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter key (without shift): send message
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }

    // Escape key: clear input
    if (e.key === "Escape") {
      e.preventDefault();
      setInputValue("");
    }
  };

  return (
    <div className="flex items-end gap-3">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your data..."
          disabled={isTyping}
          rows={1}
          className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors resize-none max-h-32 disabled:opacity-50 disabled:cursor-not-allowed"
        />

        {/* Keyboard hints */}
        <div className="absolute bottom-full left-0 mb-1 text-xs text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
          <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded text-xs">
            Enter
          </kbd>{" "}
          to send ·{" "}
          <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded text-xs">
            Shift + Enter
          </kbd>{" "}
          for new line
        </div>
      </div>

      <Button
        variant="primary"
        size="md"
        onClick={handleSend}
        disabled={!inputValue.trim() || isTyping}
        leftIcon={<Send className="w-4 h-4" />}
      >
        Send
      </Button>
    </div>
  );
}
