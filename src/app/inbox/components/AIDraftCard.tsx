"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { springConfigs } from "@/lib/spring-configs";
import type { AIDraft } from "../types";

interface AIDraftCardProps {
  draft: AIDraft;
}

export function AIDraftCard({ draft }: AIDraftCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfigs.bouncy}
      className="mb-6 mt-4"
    >
      {/* AI Draft Label - Right-aligned above bubble */}
      <div className="flex justify-end mb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#22A861]/10 rounded-lg border border-[#22A861]/30">
            <Sparkles className="h-3.5 w-3.5 text-[#22A861]" />
            <span className="text-xs font-semibold text-[#22A861]">
              AI Draft
            </span>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            {Math.round(draft.confidence * 100)}% confident
          </span>
        </div>
      </div>

      {/* Draft Message - Clearly distinct from sent messages */}
      <div className="flex justify-end mb-2">
        <div className="max-w-[80%]">
          <motion.div
            className="px-4 py-3 rounded-2xl bg-[#22A861]/10 border-2 border-dashed border-[#22A861] relative overflow-hidden"
            animate={{
              borderColor: ['rgba(34, 168, 97, 0.5)', 'rgba(34, 168, 97, 0.8)', 'rgba(34, 168, 97, 0.5)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#22A861]/0 via-[#22A861]/5 to-[#22A861]/0 animate-pulse" />

            <p className="text-sm leading-relaxed whitespace-pre-wrap text-[#16a34a] relative z-10">
              {draft.content}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Reasoning (subtle) */}
      <div className="flex justify-end mb-2">
        <div className="max-w-[80%]">
          <p className="text-[11px] text-[var(--text-muted)] italic px-1">
            {draft.reasoning}
          </p>
        </div>
      </div>

      {/* Keyboard Hints (Superhuman style) */}
      <div className="flex justify-end">
        <div className="text-[11px] text-[var(--text-muted)] px-1">
          <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded border border-[var(--border)] font-mono text-[10px]">↵</kbd>
          {' '}to edit ·{' '}
          <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded border border-[var(--border)] font-mono text-[10px]">⌘↵</kbd>
          {' '}to send
        </div>
      </div>
    </motion.div>
  );
}
