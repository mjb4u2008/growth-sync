"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Archive, UserPlus, ChevronLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChannelBadge } from "./ChannelBadge";
import { SLABadge } from "./SLABadge";
import { MessageBubble } from "./MessageBubble";
import { AIDraftCard } from "./AIDraftCard";
import { ReplyComposer } from "./ReplyComposer";
import { useInboxState } from "../hooks/useInboxState";
import { formatRelativeTime } from "@/lib/utils";

interface ConversationDetailProps {
  onBack?: () => void;
  onViewCustomer?: () => void;
}

export function ConversationDetail({ onBack, onViewCustomer }: ConversationDetailProps = {}) {
  // ✅ Use individual selectors for reactivity
  const allConversations = useInboxState(state => state.conversations);
  const selectedConversationId = useInboxState(state => state.selectedConversationId);
  const replyToConversation = useInboxState(state => state.replyToConversation);
  const archiveConversation = useInboxState(state => state.archiveConversation);

  const conversation = selectedConversationId
    ? allConversations.find(c => c.id === selectedConversationId) || null
    : null;

  const [showReplyComposer, setShowReplyComposer] = useState(false);
  const [aiDraftVisible, setAiDraftVisible] = useState(true);
  const [composerInitialValue, setComposerInitialValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  console.log('[ConversationDetail] selectedConversationId:', selectedConversationId);
  console.log('[ConversationDetail] conversation:', conversation?.id);

  // Keyboard shortcuts for reply interaction
  useEffect(() => {
    if (!conversation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea (unless it's in this conversation's composer)
      const target = e.target as HTMLElement;
      const isInComposer = target.tagName === 'TEXTAREA' && target.closest('[data-reply-composer]');
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      if (isTyping && !isInComposer) return;

      // Cmd+Enter: Quick send (AI draft or composer content)
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        console.log('[ConversationDetail] Cmd+Enter pressed');

        if (showReplyComposer) {
          // Composer is open - the ReplyComposer will handle this
          return;
        }

        // Composer closed - if AI draft exists, send it immediately
        if (conversation.aiDraft && aiDraftVisible) {
          console.log('[ConversationDetail] Quick-sending AI draft');
          replyToConversation(conversation.id, conversation.aiDraft.content);
          setAiDraftVisible(false);
        }
        return;
      }

      // Enter: Open composer (pre-fill with AI draft if exists)
      if (e.key === 'Enter' && !showReplyComposer && !isInComposer) {
        e.preventDefault();
        console.log('[ConversationDetail] Enter pressed - opening composer');

        // Pre-fill with AI draft if it exists
        if (conversation.aiDraft && aiDraftVisible) {
          setComposerInitialValue(conversation.aiDraft.content);
          setAiDraftVisible(false); // Hide AI draft card
        } else {
          setComposerInitialValue("");
        }

        setShowReplyComposer(true);
        return;
      }

      // Esc: Close composer
      if (e.key === 'Escape' && showReplyComposer) {
        e.preventDefault();
        console.log('[ConversationDetail] Esc pressed - closing composer');
        setShowReplyComposer(false);
        setComposerInitialValue("");
        // Note: AI draft remains hidden if it was consumed
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [conversation, showReplyComposer, aiDraftVisible, replyToConversation]);

  // Reset state when conversation changes
  useEffect(() => {
    setShowReplyComposer(false);
    setAiDraftVisible(true);
    setComposerInitialValue("");
  }, [selectedConversationId]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-center p-8">
        <div>
          <MessageSquare className="h-16 w-16 text-[var(--text-muted)] mx-auto mb-4" />
          <h3 className="text-xl font-semibold font-display text-[var(--text-primary)] mb-2">
            Select a conversation
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Choose a conversation from the list to view messages
          </p>
        </div>
      </div>
    );
  }

  const handleSendReply = (content: string) => {
    if (!content.trim()) return; // Prevent empty sends
    replyToConversation(conversation.id, content);
    setShowReplyComposer(false);
    setComposerInitialValue("");
  };

  const handleArchive = () => {
    archiveConversation(conversation.id);
  };

  return (
    <div
      ref={containerRef}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="px-3 sm:px-6 py-3 border-b border-[var(--border)]">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            {/* Mobile back button */}
            {onBack && (
              <button
                onClick={onBack}
                className="lg:hidden p-2 -ml-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors flex-shrink-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                <h2 className="text-base sm:text-lg font-semibold font-display text-[var(--text-primary)] truncate">
                  {conversation.subject}
                </h2>
                <ChannelBadge channel={conversation.channel} />
                <SLABadge status={conversation.slaStatus} deadline={conversation.slaDeadline} />
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {conversation.messages.length} message{conversation.messages.length !== 1 ? 's' : ''} · Last updated {formatRelativeTime(conversation.updatedAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile customer info button */}
            {onViewCustomer && (
              <Button variant="ghost" size="sm" onClick={onViewCustomer} className="lg:hidden">
                <User className="h-4 w-4" />
              </Button>
            )}

            {/* Desktop actions */}
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleArchive}>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
              <Button variant="ghost" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Assign
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages + Reply (scrollable together) */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6">
        {conversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* AI Draft - shows keyboard hints */}
        {conversation.aiDraft && aiDraftVisible && !showReplyComposer && (
          <AIDraftCard draft={conversation.aiDraft} />
        )}

        {/* Reply Composer - keyboard-driven */}
        {showReplyComposer && (
          <div className="mt-6">
            <ReplyComposer
              conversationId={conversation.id}
              initialValue={composerInitialValue}
              onSend={handleSendReply}
              onCancel={() => {
                setShowReplyComposer(false);
                setComposerInitialValue("");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
