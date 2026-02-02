"use client";

import { useMemo } from "react";
import { useInboxState } from "../hooks/useInboxState";

export function InboxBadge() {
  const conversations = useInboxState((state) => state.conversations);

  // Calculate urgent count using useMemo to prevent infinite loops
  const urgentCount = useMemo(() => {
    return conversations.filter((c) => c.queue === "urgent").length;
  }, [conversations]);

  if (urgentCount === 0) return null;

  return (
    <div className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[var(--error)] text-white text-xs font-semibold rounded-full">
      {urgentCount}
    </div>
  );
}
