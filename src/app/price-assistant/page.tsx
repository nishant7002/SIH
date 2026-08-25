'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PricingInput, PricePrediction } from '../../types';
import { predictPrice } from '../../services/pricePredictionService';
import { StatCard } from '../../components/common/StatCard';
import { LoadingState } from '../../components/common/LoadingState';
import {
  Calculator,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Info,
  ArrowRight,
  BarChart2,
  DollarSign,
  Clock,
  Layers,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

export default function AIPriceAssistantPage() {
  const router = useRouter();

  // Form State
  const [productName, setProductName] = useState('Kutch Embroidered Pillow Cover');
  const [craftType, setCraftType] = useState('Kutch Embroidery');
  const [material, setMaterial] = useState('Organic Cotton & Mirrorwork');
  const [region, setRegion] = useState('Kutch, Gujarat');
  const [productCategory, setProductCategory] = useState('Home Decor & Textiles');
  const [materialCost, setMaterialCost] = useState(450);
  const [laborHours, setLaborHours] = useState(8);
  const [laborRatePerHour, setLaborRatePerHour] = useState(100);
  const [complexityLevel, setComplexityLevel] = useState<'Low' | 'Medium' | 'High' | 'Masterwork'>('Medium');
  const [currentMarketPrice, setCurrentMarketPrice] = useState(1250);
  const [productionQuantity, setProductionQuantity] = useState(1);

  // Result State
  const [prediction, setPrediction] = useState<PricePrediction | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const input: PricingInput = {
      productName,
      craftType,
      material,
      region,
      productCategory,
      materialCost: Number(materialCost),
      laborHours: Number(laborHours),
      laborRatePerHour: Number(laborRatePerHour),
      complexityLevel,
      currentMarketPrice: Number(currentMarketPrice),
      productionQuantity: Number(productionQuantity)
    };

    try {
      // Async call to mock pricePredictionService
      const result = await predictPrice(input);
      setPrediction(result);
    } catch (err) {
      console.error('Failed to compute price prediction:', err);
    } finally {
      setLoading(false);
    }
  };

  // Recharts Bar Data for Comparison
  const chartData = prediction
    ? [
        { name: 'Prod. Cost', price: prediction.estimatedProductionCost, color: '#59615C' },
        { name: 'Current Listed', price: prediction.currentMarketPrice || prediction.recommendedPrice, color: '#C85A32' },
        { name: 'Min Fair', price: prediction.minPrice, color: '#D99B26' },
        { name: 'Recommended', price: prediction.recommendedPrice, color: '#2C5E43' },
        { name: 'Max Fair', price: prediction.maxPrice, color: '#6B1D2F' }
      ]
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#EBF4EF] text-[#2C5E43] px-3 py-1 rounded-full text-xs font-bold border border-[#2C5E43]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#D99B26]" />
          <span>Karigar AI Tool</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
          AI Price Assistant
        </h1>

        <p className="text-sm text-[#59615C] max-w-3xl">
          Calculate fair craft valuations based on raw material expenses, artisan labor hours, complexity factors, and regional market demand index.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form Input */}
        <div className="lg:col-span-5 craft-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6DFD5]">
            <Calculator className="w-5 h-5 text-[#6B1D2F]" />
            <h2 className="text-base font-bold text-[#1F2421]">Product & Cost Parameters</h2>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4 text-xs">
            {/* Product Name */}
            <div className="space-y-1">
              <label className="font-semibold text-[#59615C]">Product Name *</label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            {/* Craft Type & Category */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#59615C]">Craft Technique *</label>
                <select
                  value={craftType}
                  onChange={(e) => setCraftType(e.target.value)}
                  className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
                >
                  <option value="Kutch Embroidery">Kutch Embroidery</option>
                  <option value="Madhubani Painting">Madhubani Painting</option>
                  <option value="Blue Pottery">Blue Pottery</option>
                  <option value="Dhokra Art">Dhokra Art</option>
                  <option value="Channapatna Toys">Channapatna Toys</option>
                  <option value="Banarasi Weaving">Banarasi Weaving</option>
                  <option value="Pattachitra Art">Pattachitra Art</option>
                  <option value="Bamboo Crafts">Bamboo Crafts</option>
                  <option value="Pashmina & Sozni">Pashmina & Sozni</option>
                  <option value="Kantha Stitch">Kantha Stitch</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#59615C]">Category *</label>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
                >
                  <option value="Home Decor & Textiles">Home Decor & Textiles</option>
                  <option value="Paintings & Wall Art">Paintings & Wall Art</option>
                  <option value="Ceramics & Pottery">Ceramics & Pottery</option>
                  <option value="Metalware & Sculptures">Metalware & Sculptures</option>
                  <option value="Toys & Wooden Crafts">Toys & Wooden Crafts</option>
                  <option value="Handloom Apparel">Handloom Apparel</option>
                </select>
              </div>
            </div>

            {/* Material & Region */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#59615C]">Raw Material Used *</label>
                <input
                  type="text"
                  required
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#59615C]">Craft Region / State *</label>
                <input
                  type="text"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>

            {/* Cost Breakdown Inputs */}
            <div className="pt-2 border-t border-[#E6DFD5] grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#59615C]">Material Cost (₹) *</label>
                <input
                  type="number"
                  min={0}
                  required
                  value={materialCost}
                  onChange={(e) => setMaterialCost(Number(e.target.value))}
                  className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#59615C]">Labor Hours Invested *</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={laborHours}
                  onChange={(e) => setLaborHours(Number(e.target.value))}
                  className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#59615C]">Base Labor Rate (₹/hr)</label>
                <input
                  type="number"
                  min={50}
                  value={laborRatePerHour}
                  onChange={(e) => setLaborRatePerHour(Number(e.target.value))}
                  className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#59615C]">Craft Complexity</label>
                <select
                  value={complexityLevel}
                  onChange={(e) => setComplexityLevel(e.target.value as any)}
                  className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
                >
                  <option value="Low">Low (Basic Assembly)</option>
                  <option value="Medium">Medium (Skilled Detail)</option>
                  <option value="High">High (Intricate Handwork)</option>
                  <option value="Masterwork">Masterwork (Rare Heritage)</option>
                </select>
              </div>
            </div>

            {/* Current Market Listing Price */}
            <div className="space-y-1">
              <label className="font-semibold text-[#59615C]">Current Listed Market Price (Optional ₹)</label>
              <input
                type="number"
                min={0}
                value={currentMarketPrice}
                onChange={(e) => setCurrentMarketPrice(Number(e.target.value))}
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6B1D2F] hover:bg-[#4A121F] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className="w-4 h-4 text-[#D99B26]" />
              <span>{loading ? 'Computing AI Model...' : 'Generate Price Recommendation'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: AI Output Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {loading ? (
            <LoadingState message="Running XGBoost deterministic pricing model..." />
          ) : prediction ? (
            <div className="space-y-6 animate-in fade-in">
              {/* Output Stats Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#EBF4EF] border border-[#2C5E43]/30 p-4 rounded-xl space-y-1">
                  <span className="text-[11px] text-[#2C5E43] font-semibold block">Recommended Price</span>
                  <span className="text-xl font-extrabold text-[#2C5E43]">
                    ₹{prediction.recommendedPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="bg-[#FFFBF0] border border-[#D99B26]/30 p-4 rounded-xl space-y-1">
                  <span className="text-[11px] text-[#D99B26] font-semibold block">Fair Market Range</span>
                  <span className="text-sm font-bold text-[#1F2421]">
                    ₹{prediction.minPrice.toLocaleString('en-IN')} – ₹{prediction.maxPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="bg-[#F7F3EE] border border-[#E6DFD5] p-4 rounded-xl space-y-1">
                  <span className="text-[11px] text-[#59615C] font-semibold block">Production Cost</span>
                  <span className="text-lg font-bold text-[#59615C]">
                    ₹{prediction.estimatedProductionCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="bg-[#FDF2F4] border border-[#6B1D2F]/20 p-4 rounded-xl space-y-1">
                  <span className="text-[11px] text-[#6B1D2F] font-semibold block">Artisan Margin</span>
                  <span className="text-lg font-bold text-[#6B1D2F]">
                    ₹{prediction.artisanMargin.toLocaleString('en-IN')} ({prediction.marginPercentage}%)
                  </span>
                </div>
              </div>

              {/* Status Explanation Card */}
              <div className="craft-card p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#2C5E43]" />
                    <h3 className="text-sm font-bold text-[#1F2421]">Market Valuation Analysis</h3>
                  </div>
                  <span className="bg-[#2C5E43]/10 text-[#2C5E43] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#2C5E43]/20">
                    {prediction.confidenceScore}% Model Confidence
                  </span>
                </div>

                <p className="text-xs text-[#59615C] leading-relaxed">
                  {prediction.explanation}
                </p>

                {/* Factors List */}
                <div className="pt-3 border-t border-[#E6DFD5] space-y-2">
                  <span className="text-xs font-bold text-[#1F2421] block">Key Pricing Factors:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {prediction.factors.map((f, idx) => (
                      <div key={idx} className="bg-[#F7F3EE] p-2.5 rounded-lg border border-[#E6DFD5] space-y-0.5">
                        <span className="font-semibold text-[#1F2421] block">{f.name}</span>
                        <span className="text-[11px] text-[#59615C]">{f.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comparison Chart */}
              <div className="craft-card p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#1F2421]">Price Comparison Benchmark</h3>
                  <BarChart2 className="w-4 h-4 text-[#C85A32]" />
                </div>

                <div className="h-56 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E6DFD5" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#59615C' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#59615C' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#FDFAF6', borderRadius: '8px', border: '1px solid #E6DFD5', fontSize: '12px' }}
                        formatter={(val: any) => [`₹${Number(val || 0).toLocaleString('en-IN')}`, 'Price']}
                      />
                      <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* CTA Apply to Listing */}
              <div className="flex justify-end pt-2">
                <Link
                  href={`/dashboard/add-product?name=${encodeURIComponent(prediction.productName)}&craft=${encodeURIComponent(prediction.craftType)}&price=${prediction.recommendedPrice}&materialCost=${prediction.materialCost}&laborHours=${prediction.laborHours}`}
                  className="bg-[#C85A32] hover:bg-[#A3421F] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Apply Recommendation to Add Product Listing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="craft-card p-12 text-center space-y-3">
              <Calculator className="w-12 h-12 text-[#C85A32] mx-auto opacity-40" />
              <h3 className="text-base font-bold text-[#1F2421]">Ready for Price Calculation</h3>
              <p className="text-xs text-[#59615C] max-w-sm mx-auto">
                Fill in your product parameters on the left and click "Generate Price Recommendation" to run the AI model evaluation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
