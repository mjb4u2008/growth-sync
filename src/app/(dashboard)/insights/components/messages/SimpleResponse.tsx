"use client";

import { motion } from "framer-motion";
import { springConfigs } from "@/lib/spring-configs";
import { formatRelativeTime } from "@/lib/utils";
import type { SimpleAIResponse } from "../../types";

interface SimpleResponseProps {
  message: SimpleAIResponse;
}

/**
 * SimpleResponse - Left-aligned AI text response
 * Supports markdown-like formatting (bold with **) and line breaks
 */
export function SimpleResponse({ message }: SimpleResponseProps) {
  // Simple markdown-like parser for **bold**
  const formatContent = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfigs.quick}
      className="flex justify-start mb-3"
    >
      <div className="max-w-[85%]">
        <div className="bg-white border border-[var(--border)] rounded-2xl px-5 py-4 shadow-sm">
          <div className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-line">
            {formatContent(message.content)}
          </div>

          {/* Source citations */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--text-muted)]">
                <span className="font-medium">Sources:</span>{" "}
                {message.sources.join(", ")}
              </p>
            </div>
          )}
        </div>

        <p className="text-xs text-[var(--text-muted)] mt-1">
          {formatRelativeTime(message.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}
