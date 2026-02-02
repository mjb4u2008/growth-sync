"use client";

import { useState, useRef, useEffect } from "react";
import { sleep } from "@/lib/utils";

interface ReplyComposerProps {
  conversationId: string;
  initialValue?: string;
  onSend: (content: string) => void;
  onCancel?: () => void;
}

export function ReplyComposer({ conversationId, initialValue = '', onSend, onCancel }: ReplyComposerProps) {
  const [content, setContent] = useState(initialValue);
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus on mount and move cursor to end
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to end
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, []);

  // Handle submit
  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsSending(true);
    await sleep(200); // Simulate network delay
    onSend(content);
    setContent('');
    setIsSending(false);
  };

  // Handle keyboard shortcuts (Cmd+Enter handled here)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      console.log('[ReplyComposer] Cmd+Enter pressed - sending');
      handleSubmit();
    }
    // Note: Esc is handled by ConversationDetail
  };

  return (
    <div data-reply-composer className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your reply..."
        className="w-full min-h-[120px] p-3 border border-[var(--border)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] text-sm bg-white"
        disabled={isSending}
      />

      <div className="flex items-center justify-between mt-2">
        <div className="text-[11px] text-[var(--text-muted)]">
          <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded border border-[var(--border)] font-mono text-[10px]">⌘↵</kbd>
          {' '}to send ·{' '}
          <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded border border-[var(--border)] font-mono text-[10px]">Esc</kbd>
          {' '}to cancel
        </div>

        {isSending && (
          <span className="text-xs text-[var(--text-muted)]">Sending...</span>
        )}
      </div>
    </div>
  );
}
