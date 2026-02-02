"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { springConfigs } from "@/lib/spring-configs";
import { formatRelativeTime, cn } from "@/lib/utils";
import { ChannelBadge } from "./ChannelBadge";
import { CustomerBadge } from "./CustomerBadge";
import { SLABadge } from "./SLABadge";
import type { Conversation } from "../types";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export const ConversationItem = memo(function ConversationItem({
  conversation,
  isSelected,
  onClick
}: ConversationItemProps) {
  const { customer, subject, preview, channel, slaStatus, slaDeadline, unread, updatedAt } = conversation;

  const handleClick = () => {
    console.log('[ConversationItem] Clicked:', conversation.id);
    onClick();
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "w-full text-left p-3 border-b border-[var(--border)] transition-colors relative",
        isSelected ? "bg-[var(--accent-muted)]" : "bg-white hover:bg-[var(--bg-secondary)]",
        unread && "font-semibold"
      )}
      whileHover={{ x: 4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={springConfigs.quick}
      initial={false}
      animate={isSelected ? { x: 4 } : { x: 0 }}
    >
      <div className="flex items-start gap-2.5">
        <Avatar name={customer.name} size="sm" />

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={cn("text-sm font-medium text-[var(--text-primary)] truncate", unread && "font-semibold")}>
              {customer.name}
            </span>
            <ChannelBadge channel={channel} size="sm" showLabel={false} />
            {customer.badges.slice(0, 1).map(badge => (
              <CustomerBadge key={badge} type={badge} size="sm" />
            ))}
          </div>

          {/* Subject */}
          <div className={cn("text-sm text-[var(--text-primary)] mb-0.5 truncate", unread && "font-semibold")}>
            {subject}
          </div>

          {/* Preview */}
          <div className="text-xs text-[var(--text-secondary)] truncate mb-1.5">
            {preview}
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between">
            <SLABadge status={slaStatus} deadline={slaDeadline} size="sm" />
            <span className="text-[10px] text-[var(--text-muted)]">{formatRelativeTime(updatedAt)}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
});
