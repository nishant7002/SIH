import React from 'react';
import { Sparkles, Info, ShieldCheck, TrendingUp, AlertCircle } from 'lucide-react';

interface PriceInsightCardProps {
  currentPrice: number;
  minPrice: number;
  maxPrice: number;
  status: string;
  explanation?: string;
  confidenceScore?: number;
  isPrototype?: boolean;
}

export const PriceInsightCard: React.FC<PriceInsightCardProps> = ({
  currentPrice,
  minPrice,
  maxPrice,
  status,
  explanation = 'Based on craft category, material cost, region, complexity characteristics, and comparable market listings.',
  confidenceScore = 84,
  isPrototype = true
}) => {
  return (
    <div className="bg-[#EBF4EF] border border-[#2C5E43]/30 rounded-xl p-5 shadow-sm space-y-4">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#2C5E43] text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#D99B26]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1F2421]">AI Price Insight</h4>
            <p className="text-[11px] text-[#2C5E43] font-semibold">Fair Craft Value Benchmark</p>
          </div>
        </div>

        {isPrototype && (
          <span className="bg-[#2C5E43]/10 text-[#2C5E43] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#2C5E43]/20">
            Prototype Prediction ({confidenceScore}% Confidence)
          </span>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white p-3.5 rounded-lg border border-[#2C5E43]/20">
        <div>
          <span className="text-[11px] text-[#59615C] block">Current Listed Price</span>
          <span className="text-base font-bold text-[#6B1D2F]">
            ₹{currentPrice.toLocaleString('en-IN')}
          </span>
        </div>

        <div>
          <span className="text-[11px] text-[#59615C] block">Fair Market Range</span>
          <span className="text-base font-bold text-[#2C5E43]">
            ₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <span className="text-[11px] text-[#59615C] block">Pricing Status</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2C5E43] bg-[#EBF4EF] px-2 py-0.5 rounded mt-0.5">
            <ShieldCheck className="w-3 h-3" />
            {status}
          </span>
        </div>
      </div>

      {/* Explanation Footer */}
      <div className="flex items-start gap-2 text-xs text-[#59615C]">
        <Info className="w-4 h-4 text-[#2C5E43] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {explanation}
          {isPrototype && (
            <span className="block mt-1 font-medium text-[11px] text-[#C85A32]">
              * Note: AI price range is an advisory estimate powered by mock ML model services for hackathon demonstration.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
