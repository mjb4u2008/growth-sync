"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Package, MessageCircle } from "lucide-react";
import { SUGGESTED_QUERIES } from "../mockData";
import { useInsightsState } from "../store";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";
import type { SuggestedQuery } from "../types";

const categoryIcons = {
  revenue: TrendingUp,
  comparison: Sparkles,
  products: Package,
  sentiment: MessageCircle,
};

/**
 * SuggestedQueries - Empty state with clickable query suggestions
 * Stagger animated on mount for delightful entrance
 */
export function SuggestedQueries() {
  const sendMessage = useInsightsState((state) => state.sendMessage);

  const handleQueryClick = (query: SuggestedQuery) => {
    sendMessage(query.text);
  };

  return (
    <div className="p-8 w-full">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfigs.gentle}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent-light)] mb-4">
            <Sparkles className="w-8 h-8 text-[var(--accent)]" />
          </div>
          <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mb-2">
            Ask about your data
          </h2>
          <p className="text-[var(--text-secondary)]">
            Get instant insights across all your e-commerce platforms
          </p>
        </motion.div>

        {/* Suggested Queries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SUGGESTED_QUERIES.map((query, index) => {
            const Icon = categoryIcons[query.category];

            return (
              <motion.button
                key={query.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...springConfigs.bouncy,
                  delay: index * staggerDelays.normal,
                }}
                onClick={() => handleQueryClick(query)}
                className="group flex items-start gap-3 p-4 bg-white border border-[var(--border)] rounded-xl text-left hover:border-[var(--accent)] hover:shadow-md transition-all duration-200"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--bg-secondary)] group-hover:bg-[var(--accent-light)] flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {query.text}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center text-xs text-[var(--text-muted)] mt-6"
        >
          Or type your own question below
        </motion.p>
      </div>
    </div>
  );
}
