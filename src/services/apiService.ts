import { Product, Artisan, MarketInsight, DashboardStats, CraftCategory, RegionInfo } from '../types';
import {
  MOCK_PRODUCTS,
  MOCK_ARTISANS,
  MOCK_CRAFT_CATEGORIES,
  MOCK_REGIONS,
  MOCK_MARKET_INSIGHTS,
  MOCK_DASHBOARD_STATS
} from '../data/mockData';
import { predictPrice } from './pricePredictionService';
import { getBuyerRecommendations } from './recommendationService';

/**
 * Unified API Service Abstraction Layer.
 * Provides a clean interface for all data fetching and mutations.
 * Easily replace with `fetch('/api/v1/...')` when FastAPI backend is ready.
 */
export const apiService = {
  // GET /api/products
  async getProducts(params?: {
    craft?: string;
    region?: string;
    state?: string;
    material?: string;
    category?: string;
    artisanId?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: 'recommended' | 'price-low' | 'price-high' | 'popular' | 'new';
  }): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let result = [...MOCK_PRODUCTS];

    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.craft.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.artisanName.toLowerCase().includes(q)
      );
    }

    if (params?.artisanId) {
      result = result.filter((p) => p.artisanId === params.artisanId);
    }

    if (params?.craft && params.craft !== 'All') {
      result = result.filter((p) => p.craft === params.craft);
    }
    if (params?.state && params.state !== 'All') {
      result = result.filter((p) => p.state === params.state);
    }
    if (params?.category && params.category !== 'All') {
      result = result.filter((p) => p.category === params.category);
    }
    if (params?.material && params.material !== 'All') {
      result = result.filter((p) => p.material.toLowerCase().includes(params.material!.toLowerCase()));
    }
    if (params?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= params.minPrice!);
    }
    if (params?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= params.maxPrice!);
    }

    // Sorting
    if (params?.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (params?.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (params?.sortBy === 'popular') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (params?.sortBy === 'new') {
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  },

  // GET /api/products/:id
  async getProductById(id: string): Promise<Product | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  },

  // GET /api/artisans
  async getArtisans(params?: { state?: string; craft?: string; search?: string }): Promise<Artisan[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let result = [...MOCK_ARTISANS];

    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.craft.toLowerCase().includes(q) ||
          a.state.toLowerCase().includes(q) ||
          a.district.toLowerCase().includes(q)
      );
    }
    if (params?.state && params.state !== 'All') {
      result = result.filter((a) => a.state === params.state);
    }
    if (params?.craft && params.craft !== 'All') {
      result = result.filter((a) => a.craft.toLowerCase().includes(params.craft!.toLowerCase()));
    }

    return result;
  },

  // GET /api/artisans/:id
  async getArtisanById(id: string): Promise<Artisan | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return MOCK_ARTISANS.find((a) => a.id === id) || null;
  },

  // GET /api/craft-categories
  async getCraftCategories(): Promise<CraftCategory[]> {
    return MOCK_CRAFT_CATEGORIES;
  },

  // GET /api/regions
  async getRegions(): Promise<RegionInfo[]> {
    return MOCK_REGIONS;
  },

  // GET /api/market-insights
  async getMarketInsights(): Promise<MarketInsight[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_MARKET_INSIGHTS;
  },

  // GET /api/dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_DASHBOARD_STATS;
  },

  // POST /api/products (Mock create product)
  async createProduct(newProduct: Partial<Product>): Promise<Product> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name || 'Untitled Craft',
      craft: newProduct.craft || 'Custom Handicraft',
      category: newProduct.category || 'Decor',
      region: newProduct.region || 'India',
      state: newProduct.state || 'Gujarat',
      artisanId: newProduct.artisanId || 'art-1',
      artisanName: newProduct.artisanName || 'Pabiben Rabari',
      material: newProduct.material || 'Traditional Materials',
      description: newProduct.description || 'Authentic artisan product.',
      price: newProduct.price || 1500,
      estimatedCost: newProduct.estimatedCost || 900,
      rating: 5.0,
      reviewCount: 1,
      image: newProduct.image || 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=800&q=80',
      tags: newProduct.tags || ['Handmade'],
      isVerifiedArtisan: true,
      aiFairPriceRange: {
        min: Math.round((newProduct.price || 1500) * 0.9),
        max: Math.round((newProduct.price || 1500) * 1.1),
        status: 'Within recommended range'
      },
      inStock: true
    };
    MOCK_PRODUCTS.unshift(created);
    return created;
  },

  // POST /api/predict-price
  predictPrice,

  // POST /api/recommendations
  getRecommendations: getBuyerRecommendations
};
