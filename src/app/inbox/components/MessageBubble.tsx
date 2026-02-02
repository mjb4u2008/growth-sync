"use client";

import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { springConfigs } from "@/lib/spring-configs";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAgent = message.author === 'agent';
  const isSystem = message.author === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <div className="px-3 py-1.5 bg-[var(--bg-secondary)] rounded-full text-[11px] text-[var(--text-muted)]">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={cn("flex mb-1.5", isAgent ? "justify-end" : "justify-start")}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfigs.quick}
    >
      <div className={cn("max-w-[80%]", isAgent ? "items-end" : "items-start")}>
        <div className="flex items-center gap-1.5 mb-0.5 ml-1">
          {!isAgent && <Avatar name={message.authorName} size="sm" />}
          <span className="text-[10px] font-medium text-[var(--text-secondary)]">{message.authorName}</span>
          <span className="text-[10px] text-[var(--text-muted)]">·</span>
          <span className="text-[10px] text-[var(--text-muted)]">{formatRelativeTime(message.timestamp)}</span>
        </div>

        <div
          className={cn(
            "px-3 py-2 rounded-2xl",
            isAgent
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--bg-secondary)] text-[var(--text-primary)]"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </motion.div>
  );
}
