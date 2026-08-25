export interface Product {
  id: string;
  name: string;
  craft: string;
  category: string;
  region: string;
  state: string;
  artisanId: string;
  artisanName: string;
  material: string;
  description: string;
  price: number;
  estimatedCost: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  tags: string[];
  dimensions?: string;
  weight?: string;
  productionTimeDays?: number;
  isVerifiedArtisan: boolean;
  aiFairPriceRange: {
    min: number;
    max: number;
    status: 'Within recommended range' | 'Below market range' | 'Above market range';
  };
  inStock: boolean;
}

export interface Artisan {
  id: string;
  name: string;
  craft: string;
  state: string;
  district: string;
  experienceYears: number;
  story: string;
  image: string;
  verified: boolean;
  productCount: number;
  awards?: string[];
  craftHeritage?: string;
  rating: number;
  contactPhone?: string;
  contactEmail?: string;
}

export interface PricingInput {
  productName: string;
  craftType: string;
  material: string;
  region: string;
  productCategory: string;
  materialCost: number;
  laborHours: number;
  laborRatePerHour: number;
  complexityLevel: 'Low' | 'Medium' | 'High' | 'Masterwork';
  currentMarketPrice: number;
  productionQuantity: number;
}

export interface PricePrediction {
  productId?: string;
  productName: string;
  craftType: string;
  material: string;
  region: string;
  materialCost: number;
  laborHours: number;
  laborCost: number;
  estimatedProductionCost: number;
  currentMarketPrice: number;
  recommendedPrice: number;
  minPrice: number;
  maxPrice: number;
  confidenceScore: number; // e.g. 84%
  artisanMargin: number;
  marginPercentage: number;
  marketPosition: 'Value' | 'Competitive' | 'Premium' | 'Luxury';
  explanation: string;
  factors: {
    name: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }[];
}

export interface MarketInsight {
  craft: string;
  region: string;
  state: string;
  demandScore: number; // 0 - 100
  averagePrice: number;
  trend: 'Rising' | 'Stable' | 'High Demand' | 'Emerging';
  priceGrowthPercent: number;
  topMaterials: string[];
  insightSummary: string;
  buyerInterestScore: number;
}

export interface CraftCategory {
  id: string;
  name: string;
  description: string;
  region: string;
  state: string;
  artisanCount: number;
  image: string;
  historySnippet: string;
}

export interface RegionInfo {
  state: string;
  regionName: string;
  majorCrafts: string[];
  artisanCount: number;
  craftClusters: string[];
  description: string;
  image: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalInquiries: number;
  estimatedRevenue: number;
  averageProductPrice: number;
  aiPricingOpportunitiesCount: number;
  salesTrend: { month: string; sales: number; inquiries: number }[];
  categoryPerformance: { category: string; count: number; revenue: number }[];
  priceComparison: { productName: string; currentPrice: number; recommendedPrice: number }[];
  recentInquiries: {
    id: string;
    productName: string;
    buyerName: string;
    date: string;
    status: 'Pending' | 'Responded' | 'Completed';
    message: string;
  }[];
}

export interface RecommendationPreferences {
  crafts?: string[];
  materials?: string[];
  regions?: string[];
  maxPrice?: number;
  productId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'artisan' | 'buyer';
  artisanId?: string;
  avatar?: string;
}
