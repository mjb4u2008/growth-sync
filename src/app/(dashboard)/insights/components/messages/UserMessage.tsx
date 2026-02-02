"use client";

import { motion } from "framer-motion";
import { springConfigs } from "@/lib/spring-configs";
import { formatRelativeTime } from "@/lib/utils";
import type { UserMessage as UserMessageType } from "../../types";

interface UserMessageProps {
  message: UserMessageType;
}

/**
 * UserMessage - Right-aligned user query bubble
 * Green background with white text, spring entrance animation
 */
export function UserMessage({ message }: UserMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfigs.quick}
      className="flex justify-end mb-3"
    >
      <div className="max-w-[70%]">
        <div className="bg-[var(--accent)] text-white rounded-2xl px-4 py-3 shadow-sm">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-1 text-right">
          {formatRelativeTime(message.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}
