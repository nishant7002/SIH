'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  TrendingUp,
  Award,
  Users,
  Compass,
  Calculator,
  CheckCircle2,
  Quote,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { CraftCard } from '../components/common/CraftCard';
import { ProductCard } from '../components/common/ProductCard';
import { ArtisanCard } from '../components/common/ArtisanCard';
import { PriceInsightCard } from '../components/common/PriceInsightCard';
import { MOCK_CRAFT_CATEGORIES, MOCK_PRODUCTS, MOCK_ARTISANS, MOCK_REGIONS } from '../data/mockData';

export default function Home() {
  const featuredCrafts = MOCK_CRAFT_CATEGORIES.slice(0, 8);
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);
  const featuredArtisans = MOCK_ARTISANS.slice(0, 3);
  const popularRegions = MOCK_REGIONS.slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F3EE] via-[#FDFAF6] to-[#FDFAF6] pt-12 pb-20 border-b border-[#E6DFD5]">
        {/* Background Subtle Motifs */}
        <div className="absolute inset-0 opacity-[0.03] bg-craft-pattern pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-[#FDF2F4] text-[#6B1D2F] border border-[#6B1D2F]/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>AI-Powered Indian Handicraft Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1F2421] tracking-tight leading-[1.1]">
                India's Crafts. <br />
                <span className="text-[#6B1D2F]">Fairer Prices.</span> <br />
                <span className="text-[#C85A32]">Wider Markets.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#59615C] leading-relaxed max-w-2xl">
                Meridian connects India's traditional artisans with buyers while using AI to support fair pricing, product discovery, and market insights.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/products"
                  className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 group"
                >
                  <span>Explore Crafts</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/price-assistant"
                  className="bg-[#FDFAF6] hover:bg-[#F7F3EE] text-[#C85A32] border-2 border-[#C85A32] px-6 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm"
                >
                  <Calculator className="w-4 h-4 text-[#2C5E43]" />
                  <span>Join as Artisan</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-[#59615C] border-t border-[#E6DFD5]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2C5E43]" />
                  <span>Verified Karigars</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D99B26]" />
                  <span>AI Fair Price Benchmark</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C85A32]" />
                  <span>28+ Indian States & GI Clusters</span>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=1000&q=80"
                  alt="Kutch Embroidery Craft"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="bg-[#C85A32] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded w-max mb-2">
                    Kutch Craft Cluster, Gujarat
                  </span>
                  <h3 className="text-xl font-bold">Hand-Embroidered Rabari Wall Tapestry</h3>
                  <p className="text-xs text-white/80 mt-1">Master Karigar Pabiben Rabari (24 yrs craft heritage)</p>
                </div>
              </div>

              {/* Floating Live AI Price Card */}
              <div className="absolute -bottom-6 -left-6 max-w-sm w-full hidden sm:block">
                <PriceInsightCard
                  currentPrice={3450}
                  minPrice={3100}
                  maxPrice={3800}
                  status="Within recommended range"
                  explanation="Based on 14 labor hours, organic mirrorwork material expense, and Kutch regional scarcity factor."
                  confidenceScore={91}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CRAFTS TAXONOMY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#C85A32] uppercase tracking-widest">Heritage Traditions</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421] mt-1">
              Featured Indian Craft Traditions
            </h2>
            <p className="text-sm text-[#59615C] mt-1">
              Discover authentic GI-tagged handicrafts straight from indigenous craft clusters.
            </p>
          </div>
          <Link
            href="/regions"
            className="text-sm font-bold text-[#6B1D2F] hover:text-[#C85A32] flex items-center gap-1.5 transition-colors"
          >
            <span>View All Regional Crafts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCrafts.map((craft) => (
            <CraftCard key={craft.id} craft={craft} />
          ))}
        </div>
      </section>

      {/* POPULAR PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#2C5E43] uppercase tracking-widest">Marketplace Showcase</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421] mt-1">
              Curated Artisan Handicrafts
            </h2>
            <p className="text-sm text-[#59615C] mt-1">
              Every item is verified for fair pricing and artisan authenticity.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-bold text-[#6B1D2F] hover:text-[#C85A32] flex items-center gap-1.5 transition-colors"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI PRICING SPOTLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1F2421] via-[#6B1D2F] to-[#1F2421] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#C85A32] text-white px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D99B26]" />
                <span>AI Price Assistant Feature</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Empowering Artisans with Transparent Fair Price Discovery
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Many artisans struggle to price their products competitively while accounting for labor hours, raw material cost, and market demand. Our AI Price Assistant evaluates craft complexity, hours invested, and regional market data to recommend fair price ranges.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/price-assistant"
                  className="bg-[#C85A32] hover:bg-[#A3421F] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Try AI Price Calculator</span>
                </Link>
                <Link
                  href="/market-insights"
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all border border-white/20 flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4 text-[#D99B26]" />
                  <span>View Market Insights</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/20">
                <span className="font-bold text-sm text-[#D99B26]">AI Recommendation Output</span>
                <span className="bg-[#2C5E43] text-white px-2 py-0.5 rounded font-semibold text-[10px]">
                  91% Confidence
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Estimated Production Cost:</span>
                  <span className="font-bold">₹2,100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Recommended Fair Range:</span>
                  <span className="font-bold text-[#D99B26]">₹3,100 – ₹3,800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Estimated Artisan Margin:</span>
                  <span className="font-bold text-green-400">₹1,350 (39%)</span>
                </div>
                <div className="pt-2 text-[11px] text-white/80 bg-black/30 p-2.5 rounded border border-white/10">
                  "Evaluated based on 14 hours Rabari embroidery labor, material expenses, and Gujarat craft cluster demand."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTISANS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#6B1D2F] uppercase tracking-widest">Master Karigars</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421] mt-1">
              Meet the Masters Behind the Craft
            </h2>
            <p className="text-sm text-[#59615C] mt-1">
              Support verified master artisans preserving centuries of Indian cultural heritage.
            </p>
          </div>
          <Link
            href="/artisans"
            className="text-sm font-bold text-[#6B1D2F] hover:text-[#C85A32] flex items-center gap-1.5 transition-colors"
          >
            <span>Browse Artisan Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArtisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      </section>

      {/* HOW PLATFORM WORKS */}
      <section className="bg-[#F7F3EE] py-16 border-y border-[#E6DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#C85A32] uppercase tracking-widest">Simple Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421]">How Meridian Works</h2>
            <p className="text-sm text-[#59615C]">
              Connecting traditional craftsmen with conscious buyers through transparent AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="craft-card p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF2F4] text-[#6B1D2F] flex items-center justify-center font-bold text-xl mx-auto border border-[#6B1D2F]/20">
                1
              </div>
              <h3 className="font-bold text-base text-[#1F2421]">Karigar Listing</h3>
              <p className="text-xs text-[#59615C] leading-relaxed">
                Artisans create verified profiles and input product specifications, material costs, and labor hours.
              </p>
            </div>

            <div className="craft-card p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF6F0] text-[#C85A32] flex items-center justify-center font-bold text-xl mx-auto border border-[#C85A32]/20">
                2
              </div>
              <h3 className="font-bold text-base text-[#1F2421]">AI Fair Pricing</h3>
              <p className="text-xs text-[#59615C] leading-relaxed">
                Our AI model calculates fair production costs, artisan margins, and competitive market price ranges.
              </p>
            </div>

            <div className="craft-card p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF4EF] text-[#2C5E43] flex items-center justify-center font-bold text-xl mx-auto border border-[#2C5E43]/20">
                3
              </div>
              <h3 className="font-bold text-base text-[#1F2421]">Direct Discovery</h3>
              <p className="text-xs text-[#59615C] leading-relaxed">
                Buyers discover authentic handicrafts filtered by craft type, region, state, material, and price range.
              </p>
            </div>

            <div className="craft-card p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFFBF0] text-[#D99B26] flex items-center justify-center font-bold text-xl mx-auto border border-[#D99B26]/20">
                4
              </div>
              <h3 className="font-bold text-base text-[#1F2421]">Market Intelligence</h3>
              <p className="text-xs text-[#59615C] leading-relaxed">
                Artisans gain real-time analytics on trending craft categories, regional demand growth, and buyer interest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATISTICS COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FDFAF6] border border-[#E6DFD5] rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#6B1D2F] uppercase tracking-widest">Measurable Social Impact</span>
            <h2 className="text-2xl font-extrabold text-[#1F2421]">Preserving Heritage, Elevating Lives</h2>
            <p className="text-xs text-[#59615C]">
              * Metrics represent target evaluation parameters for SIH26090 hackathon prototype deployment.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 text-center">
            <div className="p-4 bg-[#F7F3EE] rounded-2xl border border-[#E6DFD5]">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#6B1D2F]">10,000+</div>
              <div className="text-xs font-semibold text-[#59615C] mt-1">Artisans Target Goal</div>
            </div>
            <div className="p-4 bg-[#F7F3EE] rounded-2xl border border-[#E6DFD5]">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#C85A32]">45+</div>
              <div className="text-xs font-semibold text-[#59615C] mt-1">GI Craft Categories</div>
            </div>
            <div className="p-4 bg-[#F7F3EE] rounded-2xl border border-[#E6DFD5]">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#2C5E43]">28</div>
              <div className="text-xs font-semibold text-[#59615C] mt-1">Indian States Covered</div>
            </div>
            <div className="p-4 bg-[#F7F3EE] rounded-2xl border border-[#E6DFD5]">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#D99B26]">35%</div>
              <div className="text-xs font-semibold text-[#59615C] mt-1">Income Growth Target</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#C85A32] uppercase tracking-widest">Voices of Karigars & Buyers</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421]">What Our Community Says</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="craft-card p-6 space-y-4 relative">
            <Quote className="w-8 h-8 text-[#C85A32]/20 absolute top-4 right-4" />
            <p className="text-xs sm:text-sm text-[#1F2421] italic leading-relaxed">
              "Before Meridian, middle merchants would buy my Kutch Rabari tapestries for cheap and sell them in metro cities at 4x prices. The AI Price Assistant helped me realize my true craft worth and list with confidence."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-[#E6DFD5]">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                alt="Pabiben"
                className="w-10 h-10 rounded-full object-cover border border-[#C85A32]"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1F2421]">Pabiben Rabari</h4>
                <p className="text-[11px] text-[#59615C]">Master Artisan, Kutch (Gujarat)</p>
              </div>
            </div>
          </div>

          <div className="craft-card p-6 space-y-4 relative">
            <Quote className="w-8 h-8 text-[#6B1D2F]/20 absolute top-4 right-4" />
            <p className="text-xs sm:text-sm text-[#1F2421] italic leading-relaxed">
              "Finding verified GI-certified Madhubani and Dhokra artwork used to require trips to remote craft fairs. Meridian gives me direct access to authentic karigars with complete fair price transparency."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-[#E6DFD5]">
              <div className="w-10 h-10 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center font-bold text-sm">
                AS
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1F2421]">Ananya Sen</h4>
                <p className="text-[11px] text-[#59615C]">Conscious Buyer & Interior Designer, Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
