'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { apiService } from '../../services/apiService';
import { ProductCard } from '../../components/common/ProductCard';
import { LoadingState } from '../../components/common/LoadingState';
import { Sparkles, Filter, SlidersHorizontal, Info, RefreshCw } from 'lucide-react';

export default function AIRecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [reason, setReason] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Preference Filters
  const [selectedCraft, setSelectedCraft] = useState<string>('Kutch Embroidery');
  const [maxBudget, setMaxBudget] = useState<number>(5000);

  const availableCrafts = [
    'Kutch Embroidery',
    'Madhubani Painting',
    'Blue Pottery',
    'Dhokra Art',
    'Channapatna Toys',
    'Banarasi Weaving',
    'Pattachitra',
    'Bamboo Crafts',
    'Pashmina & Sozni',
    'Kantha Stitch'
  ];

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await apiService.getRecommendations({
        crafts: selectedCraft ? [selectedCraft] : undefined,
        maxPrice: maxBudget
      });
      setRecommendations(res.recommendations);
      setReason(res.reason);
    } catch (err) {
      console.error('Failed to load recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [selectedCraft, maxBudget]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#EBF4EF] text-[#2C5E43] px-3 py-1 rounded-full text-xs font-bold border border-[#2C5E43]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#D99B26]" />
          <span>AI Discovery & Personalization Engine</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
          Recommended for You
        </h1>

        <p className="text-sm text-[#59615C] max-w-3xl">
          Personalized handicraft recommendations generated based on your preferred craft traditions, material preferences, and budget segment.
        </p>
      </div>

      {/* Interactive Preference Controls */}
      <div className="bg-[#FDFAF6] p-6 rounded-2xl border border-[#E6DFD5] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#C85A32]" />
            <h3 className="text-sm font-bold text-[#1F2421]">Personalize Your Discovery Feed</h3>
          </div>
          <button
            onClick={fetchRecommendations}
            className="text-xs text-[#6B1D2F] font-bold hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh Feed
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          {/* Craft Preference */}
          <div className="space-y-2">
            <label className="font-semibold text-[#59615C] uppercase tracking-wider block">
              Preferred Craft Tradition
            </label>
            <select
              value={selectedCraft}
              onChange={(e) => setSelectedCraft(e.target.value)}
              className="w-full bg-[#F7F3EE] border border-[#E6DFD5] rounded-xl px-3 py-2.5 text-xs text-[#1F2421] focus:outline-none focus:border-[#C85A32]"
            >
              {availableCrafts.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Max Budget Slider */}
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-[#59615C] uppercase tracking-wider">Max Budget Filter</span>
              <span className="text-[#6B1D2F]">₹{maxBudget.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={20000}
              step={1000}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-[#C85A32] cursor-pointer"
            />
          </div>

          {/* Architectural Boundary Note */}
          <div className="bg-[#EBF4EF] p-3 rounded-xl border border-[#2C5E43]/20 flex items-start gap-2 text-[#2C5E43] col-span-1 sm:col-span-2 lg:col-span-1">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[11px]">Recommendation Architecture:</strong>
              <span className="text-[10px] text-[#2C5E43]/80">
                Connected via recommendationService.ts layer. Structured for future Cosine Similarity Python ML model API.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Recommendation Banner */}
      <div className="bg-[#F7F3EE] p-4 rounded-xl border border-[#E6DFD5] flex items-center justify-between text-xs text-[#1F2421]">
        <div className="flex items-center gap-2 font-medium">
          <Sparkles className="w-4 h-4 text-[#D99B26]" />
          <span>{reason}</span>
        </div>
        <span className="bg-[#6B1D2F] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
          AI Filtered
        </span>
      </div>

      {/* Grid Results */}
      {loading ? (
        <LoadingState message="Generating personalized AI recommendations..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
