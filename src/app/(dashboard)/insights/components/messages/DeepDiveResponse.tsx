"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Circle, Check, Loader2 } from "lucide-react";
import { springConfigs } from "@/lib/spring-configs";
import { formatRelativeTime, sleep } from "@/lib/utils";
import { ProductScoreTable } from "../charts/ProductScoreTable";
import { useInsightsState } from "../../store";
import type { DeepDiveAIResponse } from "../../types";

interface DeepDiveResponseProps {
  message: DeepDiveAIResponse;
}

/**
 * DeepDiveResponse - Multi-step animated analysis
 * Shows step-by-step progress with pending → running → complete states
 * Renders final result (table/chart) when all steps complete
 */
export function DeepDiveResponse({ message }: DeepDiveResponseProps) {
  const [timeRemaining, setTimeRemaining] = useState(message.estimatedTime);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateDeepDiveStep = useInsightsState((state) => state.updateDeepDiveStep);
  const completeDeepDive = useInsightsState((state) => state.completeDeepDive);

  const isComplete = message.result !== undefined;
  const allStepsComplete = message.steps.every((step) => step.status === "complete");

  // Animate through steps
  useEffect(() => {
    // Only animate if steps are still pending and we haven't started yet
    if (message.steps[0].status !== "pending" || isAnimating) {
      return;
    }

    setIsAnimating(true);

    async function animateSteps() {
      for (const step of message.steps) {
        // Set to running
        updateDeepDiveStep(message.id, step.id, "running");

        // Wait for step duration
        await sleep(step.duration * 1000);

        // Set to complete
        updateDeepDiveStep(message.id, step.id, "complete");
      }

      // All steps complete, show result
      completeDeepDive(message.id, message.result);
    }

    animateSteps();
  }, [message.id, message.steps, message.result, isAnimating, updateDeepDiveStep, completeDeepDive]);

  // Time remaining counter
  useEffect(() => {
    if (isComplete || !isAnimating) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 0.1));
    }, 100);

    return () => clearInterval(interval);
  }, [isComplete, isAnimating]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfigs.quick}
      className="flex justify-start mb-3"
    >
      <div className="max-w-[85%]">
        <div className="bg-white border border-[var(--border)] rounded-2xl px-5 py-4 shadow-sm">
          {/* Animation phase */}
          {!isComplete && (
            <div>
              <p className="text-sm text-[var(--text-primary)] font-medium mb-4">
                {message.content}
              </p>

              {/* Step list */}
              <div className="space-y-2 mb-4">
                {message.steps.map((step) => (
                  <motion.div
                    key={step.id}
                    className="flex items-center gap-2"
                    animate={{
                      color:
                        step.status === "complete"
                          ? "var(--accent)"
                          : step.status === "running"
                          ? "var(--text-primary)"
                          : "var(--text-muted)",
                    }}
                    transition={springConfigs.gentle}
                  >
                    {/* Step icon */}
                    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                      {step.status === "complete" && (
                        <Check className="w-5 h-5 text-[var(--accent)]" />
                      )}
                      {step.status === "running" && (
                        <Loader2 className="w-5 h-5 text-[var(--accent)] animate-spin" />
                      )}
                      {step.status === "pending" && (
                        <Circle className="w-4 h-4 text-[var(--text-muted)]" />
                      )}
                    </div>

                    {/* Step label */}
                    <span className="text-sm">{step.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Time remaining */}
              {allStepsComplete === false && (
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)]">
                    Estimated time remaining
                  </p>
                  <p className="text-xs font-mono text-[var(--text-secondary)]">
                    ~{Math.ceil(timeRemaining)}s
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Result phase */}
          {isComplete && (
            <div>
              <p className="text-sm text-[var(--text-primary)] font-medium mb-2">
                Analysis Complete
              </p>

              {/* Render result based on type */}
              {message.result.type === "table" && (
                <ProductScoreTable products={message.result.products} />
              )}

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
          )}
        </div>

        <p className="text-xs text-[var(--text-muted)] mt-1">
          {formatRelativeTime(message.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}
