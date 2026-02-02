// Mock response system for Insights Chat Demo
import type {
  AIMessage,
  SimpleAIResponse,
  ChartAIResponse,
  DeepDiveAIResponse,
  SuggestedQuery,
} from "./types";

// Suggested queries for empty state
export const SUGGESTED_QUERIES: SuggestedQuery[] = [
  {
    id: "sq1",
    text: "What was our revenue yesterday?",
    category: "revenue",
  },
  {
    id: "sq2",
    text: "Compare Q4 performance vs Q3",
    category: "comparison",
  },
  {
    id: "sq3",
    text: "Which products should we launch on TikTok?",
    category: "products",
  },
  {
    id: "sq4",
    text: "What's the sentiment on Bundle X?",
    category: "sentiment",
  },
];

// Mock response 1: Revenue Yesterday (Simple)
const revenueYesterdayResponse: SimpleAIResponse = {
  id: "ai_revenue_yesterday",
  role: "ai",
  type: "simple",
  content: `Yesterday's revenue was **$4,247.38** across all platforms.

**Breakdown:**
• Shopify: $2,123.69 (50%)
• TikTok: $1,274.21 (30%)
• Amazon: $637.11 (15%)
• Instagram: $212.37 (5%)

This is **12% above** our daily average of $3,792.`,
  timestamp: new Date(),
  sources: ["Shopify API", "TikTok Shop API", "Amazon MWS", "Instagram Commerce"],
};

// Mock response 2: Q4 vs Q3 Comparison (Chart - Bar)
const quarterComparisonResponse: ChartAIResponse = {
  id: "ai_quarter_comparison",
  role: "ai",
  type: "chart",
  content: "Q4 2025 significantly outperformed Q3, with **34% revenue growth** driven by holiday shopping and new TikTok product launches.",
  chartType: "bar",
  chartData: {
    data: [
      { quarter: "Q3 2025", revenue: 98500, orders: 1240 },
      { quarter: "Q4 2025", revenue: 132080, orders: 1680 },
    ],
    metrics: ["revenue", "orders"],
  },
  timestamp: new Date(),
  sources: ["Financial Analytics System"],
};

// Mock response 3: TikTok Product Launch (Deep Dive)
const tiktokProductsResponse: DeepDiveAIResponse = {
  id: "ai_tiktok_products",
  role: "ai",
  type: "deepDive",
  content: "Analyzing your product catalog to identify optimal TikTok launches...",
  steps: [
    {
      id: "step1",
      label: "Analyzing historical TikTok performance data",
      status: "pending",
      duration: 2,
    },
    {
      id: "step2",
      label: "Evaluating current inventory levels",
      status: "pending",
      duration: 1.5,
    },
    {
      id: "step3",
      label: "Checking trend alignment with TikTok demographics",
      status: "pending",
      duration: 2,
    },
    {
      id: "step4",
      label: "Calculating viral potential scores",
      status: "pending",
      duration: 2.5,
    },
    {
      id: "step5",
      label: "Generating recommendations",
      status: "pending",
      duration: 1,
    },
  ],
  estimatedTime: 9,
  result: {
    type: "table",
    products: [
      {
        name: "Cloudlift Sneakers - White/Navy",
        score: 94,
        reasons: [
          "High engagement on similar products",
          "Strong inventory (247 units)",
          "Trending style category",
        ],
        metrics: {
          avgEngagement: "12.4%",
          conversionRate: "8.2%",
          projectedRevenue: "$18,400",
        },
      },
      {
        name: "Tech Joggers - Black",
        score: 89,
        reasons: [
          "Proven TikTok performer",
          "High margin (58%)",
          "Good stock levels",
        ],
        metrics: {
          avgEngagement: "10.8%",
          conversionRate: "7.5%",
          projectedRevenue: "$14,200",
        },
      },
      {
        name: "Midnight Runner Hoodie - Navy",
        score: 85,
        reasons: [
          "Seasonal relevance",
          "Influencer interest",
          "Unique design element",
        ],
        metrics: {
          avgEngagement: "9.2%",
          conversionRate: "6.8%",
          projectedRevenue: "$11,800",
        },
      },
    ],
  },
  timestamp: new Date(),
  sources: ["TikTok Analytics", "Inventory System", "Trend Analysis Engine"],
};

// Mock response 4: Sentiment Analysis (Chart - Pie)
const sentimentBundleResponse: ChartAIResponse = {
  id: "ai_sentiment_bundle",
  role: "ai",
  type: "chart",
  content: "Bundle X has **78% positive sentiment** from 245 customer reviews across all platforms. Main concerns center around sizing accuracy.",
  chartType: "pie",
  chartData: {
    data: [
      { category: "Positive", value: 191, percentage: 78, color: "var(--accent)" },
      { category: "Neutral", value: 37, percentage: 15, color: "#F59E0B" },
      { category: "Negative", value: 17, percentage: 7, color: "#EF4444" },
    ],
    issues: [
      { issue: "Sizing runs small", mentions: 23, severity: "medium" },
      { issue: "Shipping delay concerns", mentions: 8, severity: "low" },
      { issue: "Color variation from photos", mentions: 6, severity: "low" },
    ],
  },
  timestamp: new Date(),
  sources: ["Review Aggregation System", "Customer Support Tickets"],
};

// Default fallback response
const defaultResponse: SimpleAIResponse = {
  id: "ai_default",
  role: "ai",
  type: "simple",
  content: `I can help you analyze your e-commerce data across all platforms. Try asking about:

**Revenue & Performance:**
• Daily/weekly/monthly revenue breakdowns
• Platform comparisons
• Period-over-period growth

**Product Intelligence:**
• Top performing products
• Launch recommendations
• Inventory insights

**Customer Insights:**
• Review sentiment analysis
• Customer behavior patterns
• Feedback trends

What would you like to explore?`,
  timestamp: new Date(),
};

// Query matching function
export function matchQuery(query: string): AIMessage {
  const normalized = query.trim().toLowerCase();

  // Revenue queries
  if (/revenue.*yesterday|yesterday.*revenue/i.test(normalized)) {
    return { ...revenueYesterdayResponse, timestamp: new Date() };
  }

  // Comparison queries
  if (/compare.*q[34]|q[34].*compar|quarter.*compar/i.test(normalized)) {
    return { ...quarterComparisonResponse, timestamp: new Date() };
  }

  // TikTok product queries
  if (/tiktok.*(product|launch|best)|launch.*tiktok|product.*tiktok/i.test(normalized)) {
    // Clone with fresh timestamps and reset step states
    const response: DeepDiveAIResponse = {
      ...tiktokProductsResponse,
      id: `ai_tiktok_${Date.now()}`,
      timestamp: new Date(),
      steps: tiktokProductsResponse.steps.map((step) => ({
        ...step,
        status: "pending" as const,
      })),
    };
    return response;
  }

  // Sentiment queries
  if (/sentiment.*bundle|bundle.*sentiment|review.*bundle/i.test(normalized)) {
    return { ...sentimentBundleResponse, timestamp: new Date() };
  }

  // Default fallback
  return { ...defaultResponse, timestamp: new Date() };
}
