import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Compass,
  TrendingUp,
  Heart,
  ArrowRight,
  HelpCircle,
  FileCode2,
  CheckCircle2
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Mission Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#FDF2F4] text-[#6B1D2F] border border-[#6B1D2F]/20 px-3.5 py-1.5 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>SIH 2026 Problem Statement SIH26090 Solution</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2421] tracking-tight">
          Bridging India's Karigars to Fair Global Markets
        </h1>

        <p className="text-base text-[#59615C] leading-relaxed">
          Meridian is an AI-powered digital platform designed to connect traditional Indian craftsmen with conscious buyers, ensuring fair price discovery, regional craft preservation, and direct market intelligence.
        </p>
      </div>

      {/* Problem vs Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Problem */}
        <div className="craft-card p-8 space-y-4 border-l-4 border-l-[#6B1D2F]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#6B1D2F] uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>The Artisan Challenge</span>
          </div>

          <h3 className="text-xl font-bold text-[#1F2421]">Obstacles Faced by Indian Craftsmen</h3>

          <ul className="space-y-3 text-xs text-[#59615C] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#6B1D2F] font-bold">•</span>
              <span><strong>Unfair Intermediary Margins:</strong> Artisans often receive less than 25% of the final retail price due to multiple middleman layers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6B1D2F] font-bold">•</span>
              <span><strong>Lack of Pricing Knowledge:</strong> Difficulty calculating fair valuations for labor-intensive handwork (e.g. 30 days of Banarasi silk weaving).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6B1D2F] font-bold">•</span>
              <span><strong>Digital Access Barrier:</strong> Inability to reach urban and international buyers directly beyond local craft fairs.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6B1D2F] font-bold">•</span>
              <span><strong>Craft Erosion:</strong> Younger generations abandoning traditional heritage crafts due to low income predictability.</span>
            </li>
          </ul>
        </div>

        {/* Solution */}
        <div className="craft-card p-8 space-y-4 border-l-4 border-l-[#2C5E43]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2C5E43] uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>The Meridian Solution</span>
          </div>

          <h3 className="text-xl font-bold text-[#1F2421]">AI-Assisted Fair Platform</h3>

          <ul className="space-y-3 text-xs text-[#59615C] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#2C5E43] font-bold">•</span>
              <span><strong>AI Price Assistant:</strong> Evaluates material cost, labor hours, artisan rates, and regional scarcity to recommend fair price bounds.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2C5E43] font-bold">•</span>
              <span><strong>Direct Buyer Discovery:</strong> Enables verified karigars to showcase products straight to conscious consumers without middleman fee.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2C5E43] font-bold">•</span>
              <span><strong>Market Demand Insights:</strong> Gives artisans analytics on trending craft categories, regional demand growth, and buyer queries.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2C5E43] font-bold">•</span>
              <span><strong>Regional Craft Map:</strong> Maps 28 Indian states and indigenous GI clusters to preserve authentic heritage narratives.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Target Impact Statistics */}
      <div className="bg-[#FDFAF6] border border-[#E6DFD5] rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <span className="text-xs font-bold text-[#C85A32] uppercase tracking-widest">Hackathon Target Impact</span>
        <h2 className="text-2xl font-extrabold text-[#1F2421]">Evaluation Benchmark Metrics</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
          <div className="p-4 bg-[#F7F3EE] rounded-2xl border border-[#E6DFD5]">
            <div className="text-3xl font-extrabold text-[#6B1D2F]">10,000+</div>
            <div className="text-xs text-[#59615C] mt-1 font-semibold">Karigars Onboarded Target</div>
          </div>
          <div className="p-4 bg-[#F7F3EE] rounded-2xl border border-[#E6DFD5]">
            <div className="text-3xl font-extrabold text-[#C85A32]">45+</div>
            <div className="text-xs text-[#59615C] mt-1 font-semibold">GI Craft Traditions</div>
          </div>
          <div className="p-4 bg-[#F7F3EE] rounded-2xl border border-[#E6DFD5]">
            <div className="text-3xl font-extrabold text-[#2C5E43]">28</div>
            <div className="text-xs text-[#59615C] mt-1 font-semibold">Indian States Covered</div>
          </div>
          <div className="p-4 bg-[#F7F3EE] rounded-2xl border border-[#E6DFD5]">
            <div className="text-3xl font-extrabold text-[#D99B26]">35%</div>
            <div className="text-xs text-[#59615C] mt-1 font-semibold">Income Uplift Goal</div>
          </div>
        </div>
      </div>

      {/* Technical Architecture & Future ML Roadmap */}
      <div className="bg-[#F7F3EE] border border-[#E6DFD5] rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6B1D2F] uppercase tracking-widest">
          <FileCode2 className="w-4 h-4 text-[#C85A32]" />
          <span>System Architecture & Future ML Integration</span>
        </div>

        <h3 className="text-xl font-bold text-[#1F2421]">Technical Architecture (FastAPI & ML Ready)</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-[#FDFAF6] p-5 rounded-2xl border border-[#E6DFD5] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#6B1D2F] text-white flex items-center justify-center font-bold">1</div>
            <h4 className="font-bold text-[#1F2421] text-sm">Next.js Frontend Prototype</h4>
            <p className="text-[#59615C]">
              Built with Next.js App Router, TypeScript, Tailwind CSS, and Recharts. Implements client service layers (`apiService.ts`, `pricePredictionService.ts`, `recommendationService.ts`).
            </p>
          </div>

          <div className="bg-[#FDFAF6] p-5 rounded-2xl border border-[#E6DFD5] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#C85A32] text-white flex items-center justify-center font-bold">2</div>
            <h4 className="font-bold text-[#1F2421] text-sm">FastAPI Integration Boundary</h4>
            <p className="text-[#59615C]">
              All service layer methods map directly to future FastAPI endpoints (`POST /api/predict-price`, `POST /api/recommendations`, `GET /api/market-insights`).
            </p>
          </div>

          <div className="bg-[#FDFAF6] p-5 rounded-2xl border border-[#E6DFD5] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#2C5E43] text-white flex items-center justify-center font-bold">3</div>
            <h4 className="font-bold text-[#1F2421] text-sm">Python ML Model Pipeline</h4>
            <p className="text-[#59615C]">
              Future ML engine using XGBoost and Gradient Boosting models trained on raw material costs, labor hours, complexity scores, historical auction data, and regional scarcity indices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
