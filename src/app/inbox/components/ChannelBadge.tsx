"use client";

import { getChannelIcon, getChannelColor } from "../lib/utils";
import type { Channel } from "../types";

interface ChannelBadgeProps {
  channel: Channel;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function ChannelBadge({ channel, size = "sm", showLabel = true }: ChannelBadgeProps) {
  const Icon = getChannelIcon(channel);
  const color = getChannelColor(channel);

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize"
      style={{
        backgroundColor: `${color}20`,
        color: color
      }}
    >
      <Icon className="h-3 w-3" />
      {showLabel && channel}
    </span>
  );
}
