"use client";

import { useMemo } from "react";
import { AlertCircle, Inbox, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useInboxState } from "../hooks/useInboxState";
import { cn } from "@/lib/utils";
import type { Queue } from "../types";

export function QueueSidebar() {
  const conversations = useInboxState((state) => state.conversations);
  const currentQueue = useInboxState((state) => state.currentQueue);
  const setCurrentQueue = useInboxState((state) => state.setCurrentQueue);
  const searchQuery = useInboxState((state) => state.searchQuery);
  const setSearchQuery = useInboxState((state) => state.setSearchQuery);

  // Calculate queue counts using useMemo to prevent infinite loops
  const queueCounts = useMemo(() => {
    return {
      urgent: conversations.filter((c) => c.queue === "urgent").length,
      open: conversations.filter((c) => c.queue === "open").length,
      pending: conversations.filter((c) => c.queue === "pending").length,
      done: conversations.filter((c) => c.queue === "done").length,
    };
  }, [conversations]);

  // Debug logging
  console.log('[QueueSidebar] Current queue:', currentQueue);
  console.log('[QueueSidebar] Queue counts:', queueCounts);

  const queues: { key: Queue; label: string; icon: typeof AlertCircle }[] = [
    { key: 'urgent', label: 'Urgent', icon: AlertCircle },
    { key: 'open', label: 'Open', icon: Inbox },
    { key: 'pending', label: 'Pending', icon: Clock },
    { key: 'done', label: 'Done', icon: CheckCircle }
  ];

  return (
    <div className="w-[200px] border-r border-[var(--border)] bg-[var(--bg-secondary)] h-full flex flex-col">
      <div className="p-4 border-b border-[var(--border)]">
        <h2 className="text-lg font-semibold font-display text-[var(--text-primary)]">Inbox</h2>
      </div>

      <nav className="flex-1 p-2">
        {queues.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setCurrentQueue(key)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg mb-1 transition-colors",
              currentQueue === key
                ? "bg-[var(--accent-muted)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:bg-white hover:text-[var(--text-primary)]"
            )}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{label}</span>
            </div>
            {queueCounts[key] > 0 && (
              <Badge variant={key === 'urgent' ? 'error' : 'neutral'} size="sm">
                {queueCounts[key]}
              </Badge>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--border)]">
        <Input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}
