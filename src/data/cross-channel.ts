/**
 * Cross-channel intelligence data
 * Insights only possible with unified multi-platform data
 */

// Trending Products - velocity spikes across channels
export interface TrendingProduct {
  id: string;
  name: string;
  velocityChange: number; // percentage, e.g., 340
  platformBreakdown: {
    platform: 'shopify' | 'tiktok' | 'amazon' | 'instagram';
    orders: number;
  }[];
  totalOrders: number;
}

export const trendingProducts: TrendingProduct[] = [
  {
    id: '1',
    name: 'Black Hoodie XL',
    velocityChange: 340,
    platformBreakdown: [
      { platform: 'tiktok', orders: 412 },
      { platform: 'shopify', orders: 89 },
      { platform: 'amazon', orders: 34 },
    ],
    totalOrders: 535,
  },
  {
    id: '2',
    name: 'Cloudlift Sneakers - White',
    velocityChange: 180,
    platformBreakdown: [
      { platform: 'shopify', orders: 234 },
      { platform: 'instagram', orders: 67 },
      { platform: 'amazon', orders: 45 },
    ],
    totalOrders: 346,
  },
  {
    id: '3',
    name: 'Minimalist Watch - Gold',
    velocityChange: 120,
    platformBreakdown: [
      { platform: 'amazon', orders: 189 },
      { platform: 'shopify', orders: 78 },
      { platform: 'tiktok', orders: 23 },
    ],
    totalOrders: 290,
  },
  {
    id: '4',
    name: 'Vintage Denim Jacket',
    velocityChange: 85,
    platformBreakdown: [
      { platform: 'tiktok', orders: 67 },
      { platform: 'shopify', orders: 45 },
    ],
    totalOrders: 112,
  },
];

// Top Products by Channel
export interface TopProduct {
  id: string;
  name: string;
  imageUrl?: string;
  unitsSold: number;
  revenue: number;
}

export interface TopProductsByChannel {
  tiktok: TopProduct[];
  shopify: TopProduct[];
  amazon: TopProduct[];
}

export const topProductsByChannel: TopProductsByChannel = {
  tiktok: [
    { id: '1', name: 'Black Hoodie XL', unitsSold: 412, revenue: 38200 },
    { id: '2', name: 'Vintage Tee', unitsSold: 234, revenue: 9400 },
    { id: '3', name: 'Gold Chain', unitsSold: 189, revenue: 15100 },
  ],
  shopify: [
    { id: '4', name: 'Cloudlift Sneakers', unitsSold: 234, revenue: 21100 },
    { id: '5', name: 'Black Hoodie XL', unitsSold: 89, revenue: 8000 },
    { id: '6', name: 'Minimalist Watch', unitsSold: 78, revenue: 7000 },
  ],
  amazon: [
    { id: '7', name: 'Minimalist Watch', unitsSold: 189, revenue: 17000 },
    { id: '8', name: 'Leather Wallet', unitsSold: 156, revenue: 12500 },
    { id: '9', name: 'Vintage Tee', unitsSold: 134, revenue: 5400 },
  ],
};

// Social Signal - Voice of Customer
export interface SocialSignal {
  sentimentScore: number; // 0-100
  topPraise: { keyword: string; count: number }[];
  topConcerns: { keyword: string; count: number }[];
  trendingKeywords: { keyword: string; change: number }[];
  recentReviews: {
    rating: number;
    text: string;
    platform: 'shopify' | 'tiktok' | 'amazon' | 'instagram';
    timeAgo: string;
  }[];
}

export const socialSignal: SocialSignal = {
  sentimentScore: 84,
  topPraise: [
    { keyword: 'Quality', count: 234 },
    { keyword: 'Fast shipping', count: 189 },
    { keyword: 'Great value', count: 145 },
  ],
  topConcerns: [
    { keyword: 'Runs small', count: 67 },
    { keyword: 'Color different', count: 23 },
    { keyword: 'Packaging', count: 18 },
  ],
  trendingKeywords: [
    { keyword: 'sustainable', change: 40 },
    { keyword: 'oversized', change: 28 },
    { keyword: 'minimalist', change: 15 },
  ],
  recentReviews: [
    {
      rating: 5,
      text: "Best hoodie I've ever owned. Quality is amazing.",
      platform: 'tiktok',
      timeAgo: '2 hours ago',
    },
    {
      rating: 4,
      text: 'Love the sneakers but they run a bit small.',
      platform: 'shopify',
      timeAgo: '5 hours ago',
    },
    {
      rating: 5,
      text: 'Fast shipping, exactly as described.',
      platform: 'amazon',
      timeAgo: '1 day ago',
    },
  ],
};
