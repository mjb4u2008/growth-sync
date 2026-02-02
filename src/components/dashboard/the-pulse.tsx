"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generatePulseEvents, type PulseEvent } from "@/lib/pulse-engine";
import { formatRelativeTime, formatCurrency } from "@/lib/utils";

/**
 * The Pulse - Signature element that makes Growth Sync unforgettable
 *
 * A horizontal strip showing the last 60 minutes of business activity
 * as flowing colored dots. Like a Bloomberg ticker, but for e-commerce.
 *
 * Each dot is an event: sales, syncs, messages, reviews, returns.
 * They flow right-to-left across the screen in a constant stream.
 *
 * Hover to pause and see details. Watch your business breathe.
 */
export function ThePulse() {
  const [events, setEvents] = useState<PulseEvent[]>([]);
  const [hoveredEvent, setHoveredEvent] = useState<PulseEvent | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Generate initial events
    setEvents(generatePulseEvents(120));

    // Simulate new events coming in every 3-8 seconds
    const interval = setInterval(() => {
      const newEvent = generatePulseEvents(1)[0];
      setEvents((prev) => [...prev, { ...newEvent, timestamp: new Date() }].slice(-120));
    }, 3000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative h-10 w-full overflow-hidden border-b border-border/50"
      style={{
        background: "linear-gradient(90deg, #96BF4808, #00F2EA08, #FF990008, #E1306C08, #96BF4808)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredEvent(null);
      }}
    >
      {/* Flowing dots */}
      <div className="relative h-full flex items-center">
        <AnimatePresence mode="popLayout">
          {events.map((event, index) => {
            const delay = index * 0.25; // Stagger dots across screen

            return (
              <motion.div
                key={event.id}
                className="absolute cursor-pointer"
                initial={{ x: "100vw", opacity: 0 }}
                animate={{
                  x: isPaused ? `${100 - (index / events.length) * 100}vw` : "-50px",
                  opacity: [0, 1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  x: {
                    duration: isPaused ? 0 : 30,
                    ease: "linear",
                    delay: isPaused ? 0 : delay,
                  },
                  opacity: {
                    duration: 1,
                    times: [0, 0.1, 0.9, 1],
                  },
                }}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
                style={{
                  left: `${(index / events.length) * 100}%`,
                }}
              >
                {/* The dot */}
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: event.color,
                    boxShadow: `0 0 8px ${event.color}`,
                  }}
                  animate={{
                    scale: hoveredEvent?.id === event.id ? 1.5 : 1,
                    boxShadow: hoveredEvent?.id === event.id
                      ? `0 0 16px ${event.color}`
                      : `0 0 8px ${event.color}`,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />

                {/* Tooltip */}
                {hoveredEvent?.id === event.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap"
                  >
                    <div
                      className="px-3 py-2 rounded-lg border border-border/50 backdrop-blur-md"
                      style={{
                        background: "rgba(10, 10, 10, 0.95)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: event.color }}
                        />
                        <span className="text-xs font-mono font-semibold text-white">
                          {event.type.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-white/80">{event.description}</p>
                      {event.amount && (
                        <p className="text-xs font-mono text-white/60 mt-1">
                          {formatCurrency(event.amount)}
                        </p>
                      )}
                      <p className="text-[10px] font-mono text-white/40 mt-1">
                        {formatRelativeTime(event.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 right-4 text-[10px] font-mono text-text-muted"
        >
          PAUSED
        </motion.div>
      )}

      {/* Legend (left side) */}
      <div className="absolute top-0 left-0 h-full flex items-center px-4 pointer-events-none">
        <span className="text-[10px] font-mono font-semibold text-text-muted tracking-wider">
          LIVE PULSE
        </span>
      </div>
    </div>
  );
}
