'use client';

import React, { useState, useEffect } from 'react';
import { MarketInsight } from '../../types';
import { apiService } from '../../services/apiService';
import { StatCard } from '../../components/common/StatCard';
import { LoadingState } from '../../components/common/LoadingState';
import {
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  Sparkles,
  Info,
  ShieldCheck,
  MapPin,
  Tag,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Cell
} from 'recharts';

export default function MarketInsightsPage() {
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await apiService.getMarketInsights();
        setInsights(data);
      } catch (err) {
        console.error('Failed to load market insights:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Data formatting for Recharts
  const craftDemandChartData = insights.map((item) => ({
    name: item.craft,
    demandScore: item.demandScore,
    buyerInterest: item.buyerInterestScore
  }));

  const priceTrendChartData = insights.map((item) => ({
    name: item.craft,
    avgPrice: item.averagePrice,
    priceGrowth: item.priceGrowthPercent
  }));

  const COLORS = ['#6B1D2F', '#C85A32', '#2C5E43', '#D99B26', '#1F2421'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#FDF2F4] text-[#6B1D2F] px-3 py-1 rounded-full text-xs font-bold border border-[#6B1D2F]/20">
          <TrendingUp className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>Handicraft Intelligence & Analytics</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
          Market & Price Insights
        </h1>

        <p className="text-sm text-[#59615C] max-w-3xl">
          Real-time analytics on regional demand trends, price benchmarks, and buyer interest scores across Indian handicraft clusters.
        </p>
      </div>

      {/* Top Stat Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Top Trending Craft"
          value="Banarasi Weaving"
          subtitle="Varanasi Cluster"
          icon={TrendingUp}
          trend="+15.8% price growth"
          trendType="positive"
          colorTheme="maroon"
        />
        <StatCard
          title="Highest Demand Score"
          value="Kutch Embroidery"
          subtitle="95/100 Index Score"
          icon={Sparkles}
          trend="Strong Urban Buyer Interest"
          trendType="positive"
          colorTheme="terracotta"
        />
        <StatCard
          title="Fastest Growing"
          value="Channapatna Toys"
          subtitle="Karnataka Cluster"
          icon={BarChart2}
          trend="+18.2% annual growth"
          trendType="positive"
          colorTheme="green"
        />
        <StatCard
          title="Highest Valuation"
          value="Banarasi Silk"
          subtitle="₹16,500 Avg Price"
          icon={Tag}
          trend="Luxury Silk Segment"
          trendType="neutral"
          colorTheme="ochre"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart 1: Craft Demand Index */}
        <div className="lg:col-span-6 craft-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1F2421]">Craft Demand Index vs Buyer Interest</h3>
              <p className="text-xs text-[#59615C]">Evaluated 0 - 100 demand score scale</p>
            </div>
            <BarChart2 className="w-5 h-5 text-[#6B1D2F]" />
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={craftDemandChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6DFD5" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#59615C' }} interval={0} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 10, fill: '#59615C' }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FDFAF6', borderRadius: '8px', border: '1px solid #E6DFD5', fontSize: '12px' }}
                />
                <Bar dataKey="demandScore" fill="#6B1D2F" name="Demand Score" radius={[4, 4, 0, 0]} />
                <Bar dataKey="buyerInterest" fill="#C85A32" name="Buyer Interest" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Average Market Prices */}
        <div className="lg:col-span-6 craft-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1F2421]">Average Market Prices (INR)</h3>
              <p className="text-[#59615C] text-xs">Category benchmark prices across craft clusters</p>
            </div>
            <TrendingUp className="w-5 h-5 text-[#2C5E43]" />
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceTrendChartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6DFD5" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#59615C' }} interval={0} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 10, fill: '#59615C' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FDFAF6', borderRadius: '8px', border: '1px solid #E6DFD5', fontSize: '12px' }}
                  formatter={(value: any) => [`₹${Number(value || 0).toLocaleString('en-IN')}`, 'Avg Price']}
                />
                <Bar dataKey="avgPrice" radius={[4, 4, 0, 0]}>
                  {priceTrendChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Market Insights List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#1F2421]">Regional Market Insights Feed</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((item, idx) => (
            <div key={idx} className="craft-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider block">
                    {item.region}, {item.state}
                  </span>
                  <h4 className="text-base font-bold text-[#1F2421]">{item.craft}</h4>
                </div>
                <span className="bg-[#EBF4EF] text-[#2C5E43] border border-[#2C5E43]/20 text-xs px-2.5 py-1 rounded-full font-bold">
                  {item.trend}
                </span>
              </div>

              <p className="text-xs text-[#59615C] leading-relaxed">{item.insightSummary}</p>

              <div className="pt-3 border-t border-[#E6DFD5] flex items-center justify-between text-xs text-[#1F2421]">
                <span>Average Price: <strong>₹{item.averagePrice.toLocaleString('en-IN')}</strong></span>
                <span className="text-[#2C5E43] font-semibold">+{item.priceGrowthPercent}% Annual Growth</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How Insights Are Generated - ML Architecture Explanation */}
      <div className="bg-[#F7F3EE] border border-[#E6DFD5] rounded-3xl p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6B1D2F] uppercase tracking-widest">
          <Info className="w-4 h-4 text-[#C85A32]" />
          <span>System Architecture Explanation</span>
        </div>

        <h3 className="text-xl font-bold text-[#1F2421]">How Market Insights Are Generated</h3>

        <p className="text-xs text-[#59615C] leading-relaxed">
          For this hackathon prototype, insights are computed using deterministic analytics datasets (`MOCK_MARKET_INSIGHTS`). In the full production deployment, the Python FastAPI backend will continuously ingest:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="bg-[#FDFAF6] p-4 rounded-xl border border-[#E6DFD5] space-y-1">
            <strong className="text-[#6B1D2F] block">1. Product Listings & Data</strong>
            <span className="text-[#59615C]">Material expenses, labor hours, artisan rates, and historical listing prices.</span>
          </div>
          <div className="bg-[#FDFAF6] p-4 rounded-xl border border-[#E6DFD5] space-y-1">
            <strong className="text-[#C85A32] block">2. Buyer Interaction Logs</strong>
            <span className="text-[#59615C]">Search terms, page views, inquiry conversion rates, and regional demand volume.</span>
          </div>
          <div className="bg-[#FDFAF6] p-4 rounded-xl border border-[#E6DFD5] space-y-1">
            <strong className="text-[#2C5E43] block">3. Python ML Pipeline</strong>
            <span className="text-[#59615C]">XGBoost & Gradient Boosting models predicting demand scores and fair value ranges.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
