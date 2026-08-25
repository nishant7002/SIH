'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiService } from '../../../services/apiService';
import { predictPrice } from '../../../services/pricePredictionService';
import { Toast } from '../../../components/common/Toast';
import { LoadingState } from '../../../components/common/LoadingState';
import {
  PlusCircle,
  Sparkles,
  ShieldCheck,
  Upload,
  ArrowRight,
  ChevronLeft,
  Calculator,
  Image as ImageIcon
} from 'lucide-react';

function AddProductContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Prefill parameters if navigated from Price Assistant
  const initialName = searchParams.get('name') || '';
  const initialCraft = searchParams.get('craft') || 'Kutch Embroidery';
  const initialPrice = searchParams.get('price') ? Number(searchParams.get('price')) : 1850;
  const initialMaterialCost = searchParams.get('materialCost') ? Number(searchParams.get('materialCost')) : 650;
  const initialLaborHours = searchParams.get('laborHours') ? Number(searchParams.get('laborHours')) : 8;

  // Form State
  const [productName, setProductName] = useState(initialName);
  const [craft, setCraft] = useState(initialCraft);
  const [category, setCategory] = useState('Home Decor & Textiles');
  const [region, setRegion] = useState('Kutch');
  const [state, setState] = useState('Gujarat');
  const [material, setMaterial] = useState('Organic Cotton & Silk Thread');
  const [description, setDescription] = useState('');
  const [dimensions, setDimensions] = useState('18 x 18 inches');
  const [weight, setWeight] = useState('450g');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=800&q=80');
  
  const [materialCost, setMaterialCost] = useState(initialMaterialCost);
  const [laborHours, setLaborHours] = useState(initialLaborHours);
  const [price, setPrice] = useState(initialPrice);

  // AI Recommendation State
  const [aiPriceRange, setAiPriceRange] = useState<{ min: number; max: number; recommended: number } | null>(null);
  const [aiCalculating, setAiCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAskAI = async () => {
    setAiCalculating(true);
    try {
      const pred = await predictPrice({
        productName: productName || 'Handicraft Item',
        craftType: craft,
        material: material,
        region: `${region}, ${state}`,
        productCategory: category,
        materialCost: Number(materialCost),
        laborHours: Number(laborHours),
        laborRatePerHour: 100,
        complexityLevel: 'Medium',
        currentMarketPrice: Number(price),
        productionQuantity: 1
      });

      setAiPriceRange({
        min: pred.minPrice,
        max: pred.maxPrice,
        recommended: pred.recommendedPrice
      });
      setPrice(pred.recommendedPrice);
      setToastMessage(`AI recommends fair price of ₹${pred.recommendedPrice.toLocaleString('en-IN')}!`);
    } catch (err) {
      console.error('Failed AI recommendation:', err);
    } finally {
      setAiCalculating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiService.createProduct({
        name: productName,
        craft,
        category,
        region,
        state,
        artisanId: 'art-1',
        artisanName: 'Pabiben Rabari',
        material,
        description,
        dimensions,
        weight,
        image: imageUrl,
        price: Number(price),
        estimatedCost: Number(materialCost) + Number(laborHours) * 100,
        tags: [craft, 'Handmade']
      });

      setToastMessage(`Successfully listed "${productName}" on Meridian!`);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
    } catch (err) {
      console.error('Failed to create product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Navigation link */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-xs text-[#6B1D2F] hover:text-[#C85A32] font-semibold transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6B1D2F] uppercase tracking-widest">
          <PlusCircle className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>Product Catalog Listing</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#1F2421] tracking-tight">
          Add New Handicraft Product
        </h1>
        <p className="text-xs text-[#59615C]">
          Input product specifications and ask our AI Price Assistant for fair market pricing benchmarks.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="craft-card p-6 sm:p-8 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#1F2421] pb-2 border-b border-[#E6DFD5]">
            1. Basic Product Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-[#59615C]">Product Title *</label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Hand-Embroidered Kutch Rabari Pillow Cover"
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#59615C]">Craft Technique *</label>
              <input
                type="text"
                required
                value={craft}
                onChange={(e) => setCraft(e.target.value)}
                placeholder="e.g. Kutch Embroidery"
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#59615C]">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
        </div>

        {/* Region & Specifications */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#1F2421] pb-2 border-b border-[#E6DFD5]">
            2. Origin & Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[#59615C]">Region / Cluster *</label>
              <input
                type="text"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. Kutch"
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#59615C]">State *</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Gujarat"
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#59615C]">Material *</label>
              <input
                type="text"
                required
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. Cotton & Silk"
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[#59615C]">Dimensions</label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#59615C]">Weight</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
              />
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-semibold text-[#59615C]">Product Description *</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the craft story, traditional technique, and design highlights..."
              className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
            />
          </div>
        </div>

        {/* Product Image URL */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#1F2421] pb-2 border-b border-[#E6DFD5]">
            3. Product Visual
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs items-center">
            <div className="sm:col-span-8 space-y-1">
              <label className="font-semibold text-[#59615C]">Product Image URL *</label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <div className="sm:col-span-4 h-24 rounded-xl border overflow-hidden bg-[#F7F3EE] relative flex items-center justify-center">
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-6 h-6 text-[#59615C]" />
              )}
            </div>
          </div>
        </div>

        {/* Pricing & AI Recommendation */}
        <div className="space-y-4 bg-[#EBF4EF] p-5 rounded-2xl border border-[#2C5E43]/30">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#2C5E43] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D99B26]" />
              4. Cost Breakdown & AI Pricing
            </h3>
            <button
              type="button"
              onClick={handleAskAI}
              disabled={aiCalculating}
              className="bg-[#2C5E43] hover:bg-[#1F2421] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{aiCalculating ? 'Calculating...' : 'Ask AI for Price Recommendation'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[#59615C]">Material Cost (₹)</label>
              <input
                type="number"
                value={materialCost}
                onChange={(e) => setMaterialCost(Number(e.target.value))}
                className="w-full bg-white border border-[#2C5E43]/30 rounded-lg px-3 py-2 text-xs focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#59615C]">Labor Hours</label>
              <input
                type="number"
                value={laborHours}
                onChange={(e) => setLaborHours(Number(e.target.value))}
                className="w-full bg-white border border-[#2C5E43]/30 rounded-lg px-3 py-2 text-xs focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1F2421]">Listed Selling Price (₹) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-white border-2 border-[#6B1D2F] font-bold text-[#6B1D2F] rounded-lg px-3 py-2 text-xs focus:outline-none"
              />
            </div>
          </div>

          {aiPriceRange && (
            <div className="bg-white p-3 rounded-xl border border-[#2C5E43]/30 text-xs text-[#2C5E43] flex items-center justify-between">
              <span>
                AI Recommended Fair Range: <strong>₹{aiPriceRange.min.toLocaleString('en-IN')} – ₹{aiPriceRange.max.toLocaleString('en-IN')}</strong>
              </span>
              <span className="font-bold text-[#6B1D2F]">Applied ₹{aiPriceRange.recommended.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-[#59615C] hover:bg-[#F7F3EE]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-7 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <span>{isSubmitting ? 'Publishing Product...' : 'Publish Product to Marketplace'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Toast */}
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}

export default function AddProductPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading add product form..." />}>
      <AddProductContent />
    </Suspense>
  );
}
