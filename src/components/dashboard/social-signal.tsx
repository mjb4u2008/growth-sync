"use client";

import Link from "next/link";
import { Check, X, Star } from "lucide-react";
import { socialSignal } from "@/data/cross-channel";

const platformColors: Record<string, string> = {
  shopify: "#96BF48",
  tiktok: "#00F2EA",
  amazon: "#FF9900",
  instagram: "#E1306C",
};

/**
 * Voice of Customer - Social signal and sentiment
 *
 * Aggregates customer feedback from reviews, comments, messages
 * Across all platforms - unified voice of customer
 */
export function SocialSignal() {
  const sentimentWidth = socialSignal.sentimentScore;

  return (
    <div className="bg-white border border-[var(--border)] rounded-xl shadow-[var(--shadow-card)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Voice of Customer
        </h3>
        <span className="text-xs text-[var(--text-muted)]">Last 30 Days</span>
      </div>

      {/* Overall sentiment */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide mb-2">
          Overall Sentiment
        </h4>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${sentimentWidth}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-green-600">
            {sentimentWidth}% Positive
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] my-6" />

      {/* Top praise and concerns */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Top Praise */}
        <div>
          <h4 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide mb-3">
            Top Praise
          </h4>
          <div className="space-y-2">
            {socialSignal.topPraise.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-[var(--text-primary)]">
                  "{item.keyword}"
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Concerns */}
        <div>
          <h4 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide mb-3">
            Top Concerns
          </h4>
          <div className="space-y-2">
            {socialSignal.topConcerns.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <X className="h-3.5 w-3.5 text-orange-500 flex-shrink-0" />
                <span className="text-sm text-[var(--text-primary)]">
                  "{item.keyword}"
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] my-6" />

      {/* Trending keywords */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide mb-3">
          Trending Keywords
        </h4>
        <div className="flex flex-wrap gap-2">
          {socialSignal.trendingKeywords.map((keyword, index) => (
            <div
              key={index}
              className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium"
            >
              {keyword.keyword} ↗+{keyword.change}%
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] my-6" />

      {/* Recent reviews */}
      <div>
        <h4 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide mb-3">
          Recent Reviews
        </h4>
        <div className="space-y-4">
          {socialSignal.recentReviews.map((review, index) => (
            <div key={index} className="space-y-1">
              {/* Star rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm text-[var(--text-primary)]">
                "{review.text}"
              </p>

              {/* Platform and time */}
              <div className="flex items-center gap-2">
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                  style={{
                    backgroundColor: `${platformColors[review.platform]}20`,
                    color: platformColors[review.platform],
                  }}
                >
                  {review.platform}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  · {review.timeAgo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="mt-4 pt-4 border-t border-[var(--border)]">
        <Link
          href="/reviews"
          className="text-xs font-medium text-[var(--accent)] hover:underline"
        >
          View All Reviews →
        </Link>
      </div>
    </div>
  );
}
