"use client";

import { SimpleResponse } from "./SimpleResponse";
import { ChartResponse } from "./ChartResponse";
import { DeepDiveResponse } from "./DeepDiveResponse";
import type { AIMessage as AIMessageType } from "../../types";

interface AIMessageProps {
  message: AIMessageType;
}

/**
 * AIMessage - Router component for AI responses
 * Delegates to SimpleResponse, ChartResponse, or DeepDiveResponse based on type
 */
export function AIMessage({ message }: AIMessageProps) {
  switch (message.type) {
    case "simple":
      return <SimpleResponse message={message} />;
    case "chart":
      return <ChartResponse message={message} />;
    case "deepDive":
      return <DeepDiveResponse message={message} />;
    default:
      return null;
  }
}
