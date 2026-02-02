// Type definitions for Insights Chat Demo

export type MessageRole = "user" | "ai";
export type AIResponseType = "simple" | "chart" | "deepDive";
export type ChartType = "bar" | "pie" | "table";

// Base message interface
export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// User message (right-aligned, green bubble)
export interface UserMessage extends Message {
  role: "user";
}

// AI response - simple text
export interface SimpleAIResponse extends Message {
  role: "ai";
  type: "simple";
  sources?: string[];
}

// AI response - with chart visualization
export interface ChartAIResponse extends Message {
  role: "ai";
  type: "chart";
  chartType: ChartType;
  chartData: any; // Flexible for different chart data structures
  sources?: string[];
}

// Deep dive step states
export type StepStatus = "pending" | "running" | "complete";

export interface DeepDiveStep {
  id: string;
  label: string;
  status: StepStatus;
  duration: number; // seconds
}

// AI response - deep dive with multi-step animation
export interface DeepDiveAIResponse extends Message {
  role: "ai";
  type: "deepDive";
  steps: DeepDiveStep[];
  result?: any; // Final result data (table, chart, etc.)
  estimatedTime: number; // Total estimated seconds
  sources?: string[];
}

// Union types
export type AIMessage = SimpleAIResponse | ChartAIResponse | DeepDiveAIResponse;
export type ChatMessage = UserMessage | AIMessage;

// Suggested query
export interface SuggestedQuery {
  id: string;
  text: string;
  category: "revenue" | "products" | "sentiment" | "comparison";
}

// Conversation with history
export interface Conversation {
  id: string;
  title: string; // First user message, truncated to 30 chars
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
