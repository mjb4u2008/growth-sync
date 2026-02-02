/**
 * Framer Motion spring physics configurations
 * Use these for consistent, buttery smooth animations across the app
 */

export const springConfigs = {
  /**
   * Gentle spring - For page transitions and large elements
   * Smooth, professional movement without bounce
   */
  gentle: {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
  },

  /**
   * Bouncy spring - For cards and interactive elements
   * Adds personality with subtle bounce on settling
   */
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 17,
  },

  /**
   * Quick spring - For buttons and micro-interactions
   * Fast, responsive feedback for user actions
   */
  quick: {
    type: "spring" as const,
    stiffness: 500,
    damping: 30,
  },

  /**
   * Slow spring - For emphasis and dramatic reveals
   * Deliberate, attention-grabbing movement
   */
  slow: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
  },

  /**
   * Smooth spring - Balanced movement for general use
   */
  smooth: {
    type: "spring" as const,
    stiffness: 300,
    damping: 24,
  },
};

/**
 * Custom easing curves for non-spring animations
 */
export const easingCurves = {
  /**
   * Smooth deceleration - Default for most transitions
   */
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],

  /**
   * Spring-like cubic bezier
   */
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],

  /**
   * Bounce effect
   */
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],

  /**
   * Sharp snap
   */
  sharp: [0.4, 0, 0.6, 1] as [number, number, number, number],
};

/**
 * Standard transition durations (in seconds)
 */
export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.4,
  slower: 0.6,
};

/**
 * Stagger delays for list animations (in seconds)
 */
export const staggerDelays = {
  tight: 0.03,
  normal: 0.05,
  relaxed: 0.1,
  slow: 0.15,
};
