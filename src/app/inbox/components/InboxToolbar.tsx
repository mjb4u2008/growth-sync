"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Inbox, Clock, CheckCircle, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInboxState } from "../hooks/useInboxState";
import { cn } from "@/lib/utils";
import { springConfigs } from "@/lib/spring-configs";
import type { Queue } from "../types";

/**
 * InboxToolbar - Queue tabs and search/filter controls
 */
export function InboxToolbar() {
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

  const queues: { key: Queue; label: string; icon: typeof AlertCircle }[] = [
    { key: "urgent", label: "Urgent", icon: AlertCircle },
    { key: "open", label: "Open", icon: Inbox },
    { key: "pending", label: "Pending", icon: Clock },
    { key: "done", label: "Done", icon: CheckCircle },
  ];

  return (
    <motion.div
      className="mb-4 flex items-center justify-between"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfigs.gentle}
    >
      {/* Queue Tabs */}
      <div className="flex items-center gap-2">
        {queues.map(({ key, label, icon: Icon }) => (
          <motion.button
            key={key}
            onClick={() => setCurrentQueue(key)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm",
              currentQueue === key
                ? "bg-[var(--accent)] text-white shadow-md"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={springConfigs.quick}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
            {queueCounts[key] > 0 && (
              <Badge
                variant={key === "urgent" ? "error" : "neutral"}
                size="sm"
                className={cn(
                  "ml-1",
                  currentQueue === key && "bg-white/20 text-white border-white/30"
                )}
              >
                {queueCounts[key]}
              </Badge>
            )}
          </motion.button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-[280px]"
          />
        </div>
        <Button
          variant="secondary"
          size="md"
          leftIcon={<Filter className="w-4 h-4" />}
        >
          Filters
        </Button>
      </div>
    </motion.div>
  );
}
