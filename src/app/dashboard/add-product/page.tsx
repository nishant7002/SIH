'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiService } from '../../../services/apiService';
import {
  ImageEnhancementResult,
  ProductRecognitionResult,
  DescriptionGenerationResult,
  PricePrediction
} from '../../../types';
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
  Image as ImageIcon,
  Wand2,
  CheckCircle2,
  Layers,
  Mic,
  Tag,
  Info,
  RotateCcw,
  SlidersHorizontal,
  Eye,
  ShieldCheck as ShieldIcon,
  LogIn
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';

function SmartCatalogingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, role, isLoaded } = useAuth();

  // Step state: 1 (Upload) -> 2 (Enhance) -> 3 (Catalog) -> 4 (Description) -> 5 (Price) -> 6 (Review & Publish)
  const initialStepParam = searchParams.get('step');
  const [currentStep, setCurrentStep] = useState<number>(initialStepParam ? Number(initialStepParam) : 1);

  // Form & Image State
  const [originalImageUrl, setOriginalImageUrl] = useState<string>(
    'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=800&q=80'
  );
  const [imageUrl, setImageUrl] = useState<string>(
    'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=800&q=80'
  );
  const [enhancedImageResult, setEnhancedImageResult] = useState<ImageEnhancementResult | null>(null);
  const [activeImageMode, setActiveImageMode] = useState<'original' | 'enhanced'>('enhanced');

  // AI Step 2: Image Enhancer State
  const [isEnhancing, setIsEnhancing] = useState(false);

  // AI Step 3: Catalog Recognition State
  const [artisanHint, setArtisanHint] = useState('');
  const [recognitionResult, setRecognitionResult] = useState<ProductRecognitionResult | null>(null);
  const [isAnalyzingCatalog, setIsAnalyzingCatalog] = useState(false);

  // Editable Catalog Fields
  const [category, setCategory] = useState('Home Decor & Textiles');
  const [subcategory, setSubcategory] = useState('Handwoven Textile & Embroidery');
  const [craft, setCraft] = useState('Kutch Embroidery');
  const [material, setMaterial] = useState('Organic Cotton & Mirrorwork');
  const [region, setRegion] = useState('Kutch, Gujarat');
  const [tags, setTags] = useState<string[]>(['Handmade', 'Embroidery', 'Kutch Cluster']);

  // AI Step 4: Description Generator State
  const [regionalVoiceInput, setRegionalVoiceInput] = useState('');
  const [artisanNotes, setArtisanNotes] = useState('');
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [descriptionResult, setDescriptionResult] = useState<DescriptionGenerationResult | null>(null);

  // Editable Description Fields
  const [productTitle, setProductTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [keyFeatures, setKeyFeatures] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState('18 x 18 inches');

  // AI Step 5: Price Advisor State
  const [materialCost, setMaterialCost] = useState(450);
  const [laborHours, setLaborHours] = useState(8);
  const [laborRatePerHour, setLaborRatePerHour] = useState(100);
  const [complexityLevel, setComplexityLevel] = useState<'Low' | 'Medium' | 'High' | 'Masterwork'>('Medium');
  const [isPredictingPrice, setIsPredictingPrice] = useState(false);
  const [pricePrediction, setPricePrediction] = useState<PricePrediction | null>(null);
  const [listingPrice, setListingPrice] = useState<number>(1399);

  // Final Action State
  const [isPublishing, setIsPublishing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sample Presets for Quick Demo
  const samplePresets = [
    {
      name: 'Kutch Mirrorwork Textile',
      url: 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=800&q=80',
      hint: 'Embroidery mirrorwork pillow'
    },
    {
      name: 'Madhubani Folk Painting',
      url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      hint: 'Madhubani Tree of Life folk art canvas'
    },
    {
      name: 'Jaipur Blue Pottery Vase',
      url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
      hint: 'Blue pottery decorative flower vase'
    },
    {
      name: 'Channapatna Wooden Toy',
      url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
      hint: 'Channapatna non toxic wooden toy set'
    }
  ];

  // Helper to handle AI Step 2: Image Enhancement
  const handleEnhanceImage = async (urlToEnhance: string = originalImageUrl) => {
    setIsEnhancing(true);
    try {
      const res = await apiService.enhanceImage(urlToEnhance);
      setEnhancedImageResult(res);
      setImageUrl(res.enhancedUrl);
      setActiveImageMode('enhanced');
      setToastMessage('AI Studio image enhancement complete!');
    } catch (err) {
      console.error('Enhancement failed:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  // Helper to handle AI Step 3: Catalog Analysis
  const handleAnalyzeCatalog = async () => {
    setIsAnalyzingCatalog(true);
    try {
      const res = await apiService.analyzeCatalog(imageUrl, artisanHint || productTitle);
      setRecognitionResult(res);
      setCategory(res.category);
      setSubcategory(res.subcategory);
      setCraft(res.craft);
      setMaterial(res.material);
      setRegion(res.suggestedRegion);
      setTags(res.tags);
      setToastMessage(`AI Recognized: ${res.craft} (${res.confidenceLevel})`);
    } catch (err) {
      console.error('Catalog analysis failed:', err);
    } finally {
      setIsAnalyzingCatalog(false);
    }
  };

  // Helper to handle AI Step 4: Description Generation
  const handleGenerateDescription = async () => {
    setIsGeneratingDescription(true);
    try {
      const res = await apiService.generateDescription({
        productName: productTitle || artisanHint,
        category,
        subcategory,
        craft,
        material,
        region,
        artisanNotes,
        regionalVoiceInput,
        dimensions
      });

      setDescriptionResult(res);
      setProductTitle(res.title);
      setShortDescription(res.shortDescription);
      setDetailedDescription(res.detailedDescription);
      setKeyFeatures(res.keyFeatures);
      setTags(res.searchTags);
      setToastMessage('Professional AI Product Listing generated!');
    } catch (err) {
      console.error('Description generation failed:', err);
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  // Helper to handle AI Step 5: Price Prediction
  const handlePredictPrice = async () => {
    setIsPredictingPrice(true);
    try {
      const res = await apiService.predictPrice({
        productName: productTitle || 'Artisan Handicraft',
        craftType: craft,
        material,
        region,
        productCategory: category,
        materialCost: Number(materialCost),
        laborHours: Number(laborHours),
        laborRatePerHour: Number(laborRatePerHour),
        complexityLevel,
        currentMarketPrice: Number(listingPrice),
        productionQuantity: 1
      });

      setPricePrediction(res);
      setListingPrice(res.recommendedPrice);
      setToastMessage(`AI Price Advisor: Recommended range ₹${res.minPrice} – ₹${res.maxPrice}`);
    } catch (err) {
      console.error('Price prediction failed:', err);
    } finally {
      setIsPredictingPrice(false);
    }
  };

  // Final Publish Handler
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    try {
      await apiService.createProduct({
        name: productTitle || 'Handcrafted Artisan Item',
        craft,
        category,
        subcategory,
        region: region.split(',')[0] || region,
        state: region.split(',')[1]?.trim() || 'Gujarat',
        artisanId: 'art-1',
        artisanName: 'Pabiben Rabari',
        material,
        description: detailedDescription,
        shortDescription,
        keyFeatures,
        dimensions,
        image: activeImageMode === 'enhanced' ? imageUrl : originalImageUrl,
        enhancedImage: imageUrl,
        isAiAssisted: true,
        price: Number(listingPrice),
        estimatedCost: Number(materialCost) + Number(laborHours) * 100,
        tags: tags.length > 0 ? tags : [craft, 'Handmade']
      });

      setToastMessage('Successfully published AI-assisted catalog item to Meridian marketplace!');
      setTimeout(() => {
        router.push('/products');
      }, 1200);
    } catch (err) {
      console.error('Failed to publish product:', err);
    } finally {
      setIsPublishing(false);
    }
  };

  if (!isLoaded) {
    return <LoadingState message="Loading Smart Cataloging Studio..." />;
  }

  if (role !== 'artisan') {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="craft-card p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF2F4] text-[#6B1D2F] flex items-center justify-center mx-auto border border-[#6B1D2F]/20 font-bold">
            <ShieldIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-[#1F2421]">Artisan Access Required</h2>
            <p className="text-xs text-[#59615C] leading-relaxed">
              The AI Smart Cataloging Studio is reserved for registered Karigars and craft producers.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/login"
              className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all inline-flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In as Artisan</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Navigation Top */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-xs text-[#6B1D2F] hover:text-[#C85A32] font-semibold transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Artisan Dashboard
      </button>

      {/* Header & SIH Workflow Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#EBF4EF] text-[#2C5E43] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#2C5E43]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#D99B26]" />
          <span>Smart Cataloging Workflow — SIH26090</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
          AI Smart Cataloging Studio
        </h1>
        <p className="text-sm text-[#59615C] max-w-3xl">
          Transform raw craft photos into high-converting marketplace listings with AI Image Enhancement, Smart Cataloging, Description Generation, and Price Guidance.
        </p>
      </div>

      {/* Step Wizard Progress Bar */}
      <div className="craft-card p-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] text-xs font-bold">
          {[
            { num: 1, label: 'Upload' },
            { num: 2, label: 'AI Studio' },
            { num: 3, label: 'Smart Catalog' },
            { num: 4, label: 'AI Listing' },
            { num: 5, label: 'Price Advisor' },
            { num: 6, label: 'Review & Publish' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
                currentStep === s.num
                  ? 'bg-[#6B1D2F] text-white shadow-sm'
                  : currentStep > s.num
                  ? 'bg-[#EBF4EF] text-[#2C5E43]'
                  : 'text-[#59615C] hover:bg-[#F7F3EE]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold ${
                currentStep === s.num ? 'bg-white text-[#6B1D2F]' : 'bg-black/10'
              }`}>
                {s.num}
              </span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: UPLOAD PRODUCT IMAGE */}
      {currentStep === 1 && (
        <div className="craft-card p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#6B1D2F]" />
              <h2 className="text-base font-bold text-[#1F2421]">Step 1: Upload Product Photo</h2>
            </div>
            <span className="text-xs text-[#59615C]">Select or paste craft image URL</span>
          </div>

          {/* Preset Samples */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#59615C]">Or Choose a Quick Demo Sample Image:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setOriginalImageUrl(preset.url);
                    setImageUrl(preset.url);
                    setArtisanHint(preset.hint);
                    setToastMessage(`Loaded preset: ${preset.name}`);
                  }}
                  className={`p-2 rounded-xl border text-left text-xs transition-all space-y-1 ${
                    originalImageUrl === preset.url ? 'border-[#C85A32] bg-[#FDF6F0] ring-2 ring-[#C85A32]/30' : 'border-[#E6DFD5] bg-[#FDFAF6]'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <span className="font-semibold text-[#1F2421] block truncate">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#59615C]">Image URL input *</label>
            <div className="flex gap-3">
              <input
                type="url"
                required
                value={originalImageUrl}
                onChange={(e) => {
                  setOriginalImageUrl(e.target.value);
                  setImageUrl(e.target.value);
                }}
                className="flex-1 bg-[#FDFAF6] border border-[#E6DFD5] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2421] focus:outline-none focus:border-[#C85A32]"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="relative aspect-[4/3] max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-[#E6DFD5] bg-[#F7F3EE]">
            <img
              src={originalImageUrl}
              alt="Original Craft Preview"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=800&q=80';
              }}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => {
                handleEnhanceImage();
                setCurrentStep(2);
              }}
              className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <span>Next: AI Image Enhancer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: AI IMAGE ENHANCER */}
      {currentStep === 2 && (
        <div className="craft-card p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-[#C85A32]" />
              <h2 className="text-base font-bold text-[#1F2421]">Step 2: AI Image Studio & Enhancer</h2>
            </div>
            <button
              onClick={() => handleEnhanceImage()}
              disabled={isEnhancing}
              className="bg-[#C85A32] hover:bg-[#A3421F] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>{isEnhancing ? 'Processing...' : 'Re-run AI Enhancer'}</span>
            </button>
          </div>

          {isEnhancing ? (
            <LoadingState message="AI Studio is optimizing background, lighting, and e-commerce 4:3 auto-crop..." />
          ) : (
            <div className="space-y-6">
              {/* Original vs Enhanced Comparison Toggle */}
              <div className="flex items-center justify-between bg-[#F7F3EE] p-2 rounded-xl border border-[#E6DFD5]">
                <span className="text-xs font-semibold text-[#59615C]">Comparison Mode:</span>
                <div className="flex gap-2 text-xs font-bold">
                  <button
                    onClick={() => setActiveImageMode('original')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      activeImageMode === 'original' ? 'bg-[#6B1D2F] text-white shadow-sm' : 'bg-white text-[#59615C]'
                    }`}
                  >
                    Original Photo
                  </button>
                  <button
                    onClick={() => setActiveImageMode('enhanced')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      activeImageMode === 'enhanced' ? 'bg-[#2C5E43] text-white shadow-sm' : 'bg-white text-[#59615C]'
                    }`}
                  >
                    AI Studio Enhanced ✨
                  </button>
                </div>
              </div>

              {/* Visual Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#59615C] block">Original Upload</span>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E6DFD5] bg-[#F7F3EE]">
                    <img src={originalImageUrl} alt="Original" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-[#2C5E43]">
                    <span>AI Studio Enhanced Output</span>
                    <span className="bg-[#EBF4EF] px-2 py-0.5 rounded border border-[#2C5E43]/20">+35% Clarity</span>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#2C5E43] bg-white shadow-md relative">
                    <img src={imageUrl} alt="Enhanced" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 bg-[#2C5E43] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                      Studio Optimized
                    </span>
                  </div>
                </div>
              </div>

              {/* Applied Enhancements List */}
              {enhancedImageResult && (
                <div className="bg-[#EBF4EF] p-4 rounded-xl border border-[#2C5E43]/30 text-xs space-y-2">
                  <span className="font-bold text-[#2C5E43] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    AI Enhancements Applied:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#2C5E43]/90">
                    {enhancedImageResult.enhancementsApplied.map((e, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2C5E43]" />
                        <span>{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-semibold text-[#59615C] hover:underline"
                >
                  ← Back to Upload
                </button>

                <button
                  onClick={() => {
                    handleAnalyzeCatalog();
                    setCurrentStep(3);
                  }}
                  className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Accept & Analyze Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: AI PRODUCT RECOGNITION + SMART CATALOGING */}
      {currentStep === 3 && (
        <div className="craft-card p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#2C5E43]" />
              <h2 className="text-base font-bold text-[#1F2421]">Step 3: AI Product Recognition & Cataloging</h2>
            </div>
            {recognitionResult && (
              <span className="bg-[#2C5E43] text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                AI Confidence: {recognitionResult.confidenceScore}% ({recognitionResult.confidenceLevel})
              </span>
            )}
          </div>

          {isAnalyzingCatalog ? (
            <LoadingState message="AI is recognizing product features, category, subcategory, craft, material, and tags..." />
          ) : (
            <div className="space-y-6 text-xs">
              {/* Optional Artisan Prompt Hint */}
              <div className="space-y-1">
                <label className="font-semibold text-[#59615C]">Artisan Product Hint (Optional)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={artisanHint}
                    onChange={(e) => setArtisanHint(e.target.value)}
                    placeholder="e.g. Handmade embroidered Rabari wall hanging pillow"
                    className="flex-1 bg-[#FDFAF6] border border-[#E6DFD5] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
                  />
                  <button
                    type="button"
                    onClick={handleAnalyzeCatalog}
                    className="bg-[#2C5E43] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#1F2421] transition-all"
                  >
                    Re-Analyze
                  </button>
                </div>
              </div>

              {/* Inferred Smart Catalog Grid (100% Editable) */}
              <div className="bg-[#FDFAF6] p-5 rounded-2xl border border-[#E6DFD5] space-y-4">
                <div className="flex items-center justify-between text-xs text-[#2C5E43] font-bold pb-2 border-b border-[#E6DFD5]">
                  <span>AI Inferred Attributes (All fields are editable)</span>
                  <span className="text-[11px] font-normal text-[#59615C]">Click any field to modify</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-[#59615C]">Category *</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs font-semibold text-[#1F2421] focus:border-[#C85A32]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-[#59615C]">Subcategory *</label>
                    <input
                      type="text"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs font-semibold text-[#1F2421] focus:border-[#C85A32]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-[#59615C]">Craft Technique *</label>
                    <input
                      type="text"
                      value={craft}
                      onChange={(e) => setCraft(e.target.value)}
                      className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs font-semibold text-[#6B1D2F] focus:border-[#C85A32]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-[#59615C]">Material *</label>
                    <input
                      type="text"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs font-semibold text-[#1F2421] focus:border-[#C85A32]"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-semibold text-[#59615C]">Suggested Region / State *</label>
                    <input
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs font-semibold text-[#1F2421] focus:border-[#C85A32]"
                    />
                  </div>
                </div>

                {/* Detected Attributes */}
                {recognitionResult?.detectedAttributes && (
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                    {recognitionResult.detectedAttributes.map((attr, idx) => (
                      <span key={idx} className="bg-[#EBF4EF] text-[#2C5E43] px-2.5 py-1 rounded-md border border-[#2C5E43]/20 font-medium">
                        {attr.name}: {attr.value}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-semibold text-[#59615C] hover:underline"
                >
                  ← Back to Image Studio
                </button>

                <button
                  onClick={() => {
                    handleGenerateDescription();
                    setCurrentStep(4);
                  }}
                  className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Generate AI Product Listing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: AI PRODUCT DESCRIPTION GENERATOR */}
      {currentStep === 4 && (
        <div className="craft-card p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D99B26]" />
              <h2 className="text-base font-bold text-[#1F2421]">Step 4: AI Product Description Generator</h2>
            </div>
            <button
              onClick={handleGenerateDescription}
              disabled={isGeneratingDescription}
              className="bg-[#D99B26] hover:bg-[#1F2421] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Regenerate Text</span>
            </button>
          </div>

          {isGeneratingDescription ? (
            <LoadingState message="AI is generating marketplace title, short description, detailed craftsmanship story, key features, and tags..." />
          ) : (
            <div className="space-y-6 text-xs">
              {/* Regional Language Voice / Text Placeholder */}
              <div className="bg-[#FFFBF0] border border-[#D99B26]/30 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between font-bold text-[#1F2421]">
                  <span className="flex items-center gap-1.5 text-[#D99B26]">
                    <Mic className="w-4 h-4" />
                    Describe your product in your language (Voice / Text)
                  </span>
                  <span className="text-[10px] text-[#59615C] font-normal">Multilingual AI Input Readiness</span>
                </div>
                <textarea
                  rows={2}
                  value={regionalVoiceInput}
                  onChange={(e) => setRegionalVoiceInput(e.target.value)}
                  placeholder="Tell us about your craft in Hindi, Gujarati, Tamil, Bengali or your regional language..."
                  className="w-full bg-white border border-[#E6DFD5] rounded-lg p-2.5 text-xs text-[#1F2421] focus:outline-none"
                />
              </div>

              {/* Anti-Hallucination Indicator */}
              {descriptionResult?.antiHallucinationNote && (
                <div className="bg-[#EBF4EF] p-2.5 rounded-lg border border-[#2C5E43]/20 text-[11px] text-[#2C5E43] flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>{descriptionResult.antiHallucinationNote}</span>
                </div>
              )}

              {/* Generated Fields (Editable) */}
              <div className="space-y-4 bg-[#FDFAF6] p-5 rounded-2xl border border-[#E6DFD5]">
                <div className="space-y-1">
                  <label className="font-semibold text-[#59615C]">Marketplace Product Title *</label>
                  <input
                    type="text"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs font-bold text-[#1F2421] focus:border-[#C85A32]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#59615C]">Short Description (Product Card Snippet)</label>
                  <input
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs text-[#1F2421] focus:border-[#C85A32]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#59615C]">Detailed Craft Description *</label>
                  <textarea
                    rows={6}
                    value={detailedDescription}
                    onChange={(e) => setDetailedDescription(e.target.value)}
                    className="w-full bg-white border border-[#E6DFD5] rounded-lg p-3 text-xs text-[#1F2421] leading-relaxed focus:border-[#C85A32]"
                  />
                </div>

                {/* Key Features */}
                <div className="space-y-1">
                  <label className="font-semibold text-[#59615C]">Key Features (Bullet Points)</label>
                  <div className="space-y-1.5">
                    {keyFeatures.map((feat, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const copy = [...keyFeatures];
                          copy[idx] = e.target.value;
                          setKeyFeatures(copy);
                        }}
                        className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-1.5 text-xs text-[#1F2421]"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-xs font-semibold text-[#59615C] hover:underline"
                >
                  ← Back to Smart Catalog
                </button>

                <button
                  onClick={() => {
                    handlePredictPrice();
                    setCurrentStep(5);
                  }}
                  className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Proceed to AI Price Advisor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 5: AI PRICE RANGE PREDICTION */}
      {currentStep === 5 && (
        <div className="craft-card p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#6B1D2F]" />
              <h2 className="text-base font-bold text-[#1F2421]">Step 5: AI Price Advisor</h2>
            </div>
            {pricePrediction && (
              <span className="bg-[#2C5E43] text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                AI Confidence: {pricePrediction.confidenceLevel} ({pricePrediction.confidenceScore}%)
              </span>
            )}
          </div>

          {isPredictingPrice ? (
            <LoadingState message="AI Price Advisor is calculating production costs, craft benchmarks, and fair market range..." />
          ) : (
            <div className="space-y-6 text-xs">
              {/* Parameter Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FDFAF6] p-4 rounded-xl border border-[#E6DFD5]">
                <div className="space-y-1">
                  <label className="font-semibold text-[#59615C]">Material Cost (₹) *</label>
                  <input
                    type="number"
                    value={materialCost}
                    onChange={(e) => setMaterialCost(Number(e.target.value))}
                    className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#59615C]">Labor Hours Invested *</label>
                  <input
                    type="number"
                    value={laborHours}
                    onChange={(e) => setLaborHours(Number(e.target.value))}
                    className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#59615C]">Craft Complexity</label>
                  <select
                    value={complexityLevel}
                    onChange={(e) => setComplexityLevel(e.target.value as any)}
                    className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Masterwork">Masterwork</option>
                  </select>
                </div>
              </div>

              {/* Output Summary Cards */}
              {pricePrediction && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-[#EBF4EF] border border-[#2C5E43]/30 p-4 rounded-xl">
                      <span className="text-[11px] text-[#2C5E43] font-semibold block">Recommended Price Range</span>
                      <span className="text-base font-extrabold text-[#2C5E43]">
                        ₹{pricePrediction.minPrice.toLocaleString('en-IN')} – ₹{pricePrediction.maxPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="bg-[#FDF2F4] border border-[#6B1D2F]/20 p-4 rounded-xl">
                      <span className="text-[11px] text-[#6B1D2F] font-semibold block">Suggested Listing Price</span>
                      <span className="text-xl font-extrabold text-[#6B1D2F]">
                        ₹{pricePrediction.recommendedPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="bg-[#F7F3EE] border border-[#E6DFD5] p-4 rounded-xl">
                      <span className="text-[11px] text-[#59615C] font-semibold block">Estimated Production Cost</span>
                      <span className="text-base font-bold text-[#59615C]">
                        ₹{pricePrediction.estimatedProductionCost.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="bg-[#FFFBF0] border border-[#D99B26]/30 p-4 rounded-xl">
                      <span className="text-[11px] text-[#D99B26] font-semibold block">Estimated Artisan Margin</span>
                      <span className="text-base font-bold text-[#1F2421]">
                        ₹{pricePrediction.artisanMargin.toLocaleString('en-IN')} ({pricePrediction.marginPercentage}%)
                      </span>
                    </div>
                  </div>

                  {/* Pricing Factors Explanation */}
                  <div className="bg-[#FDFAF6] p-4 rounded-xl border border-[#E6DFD5] space-y-2">
                    <span className="font-bold text-[#1F2421] block">Pricing Factors & Valuation Rationale:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {pricePrediction.factors.map((f, idx) => (
                        <div key={idx} className="bg-white p-2.5 rounded-lg border border-[#E6DFD5] space-y-0.5">
                          <span className="font-semibold text-[#1F2421] block">{f.name}</span>
                          <span className="text-[11px] text-[#59615C]">{f.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final Listing Price Input (Artisan Editable) */}
                  <div className="p-4 bg-[#F7F3EE] rounded-xl border border-[#E6DFD5] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#1F2421] block">Your Final Selling Price (₹)</span>
                      <span className="text-[11px] text-[#59615C]">You can keep or edit the AI suggested price</span>
                    </div>
                    <input
                      type="number"
                      value={listingPrice}
                      onChange={(e) => setListingPrice(Number(e.target.value))}
                      className="w-36 bg-white border-2 border-[#6B1D2F] font-extrabold text-[#6B1D2F] text-base rounded-xl px-3 py-2 text-right focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="text-xs font-semibold text-[#59615C] hover:underline"
                >
                  ← Back to AI Description
                </button>

                <button
                  onClick={() => setCurrentStep(6)}
                  className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Review Final Product & Publish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 6: ARTISAN REVIEW & PUBLISH */}
      {currentStep === 6 && (
        <form onSubmit={handlePublish} className="craft-card p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2C5E43]" />
              <h2 className="text-base font-bold text-[#1F2421]">Step 6: Artisan Final Review & Publish</h2>
            </div>
            <span className="bg-[#EBF4EF] text-[#2C5E43] text-xs px-3 py-1 rounded-full font-bold border border-[#2C5E43]/20">
              AI-Assisted Listing Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-xs">
            {/* Visual Preview */}
            <div className="md:col-span-5 space-y-3">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#E6DFD5] bg-[#F7F3EE] relative shadow-md">
                <img src={activeImageMode === 'enhanced' ? imageUrl : originalImageUrl} alt="Final Product" className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#2C5E43] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                  AI Enhanced
                </span>
              </div>

              <div className="p-3 bg-[#FDFAF6] rounded-xl border border-[#E6DFD5] space-y-1">
                <span className="font-bold text-[#1F2421] block">Price & Cost Summary:</span>
                <div className="flex justify-between text-xs">
                  <span className="text-[#59615C]">Listed Price:</span>
                  <span className="font-extrabold text-[#6B1D2F]">₹{Number(listingPrice).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#59615C]">Est. Production Cost:</span>
                  <span>₹{materialCost + laborHours * 100}</span>
                </div>
              </div>
            </div>

            {/* Editable Final Details */}
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#59615C]">Title *</label>
                <input
                  type="text"
                  required
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs font-bold text-[#1F2421]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#59615C]">Craft</label>
                  <input
                    type="text"
                    value={craft}
                    onChange={(e) => setCraft(e.target.value)}
                    className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-1.5 text-xs text-[#6B1D2F] font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#59615C]">Material</label>
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-1.5 text-xs text-[#1F2421]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#59615C]">Description *</label>
                <textarea
                  rows={4}
                  required
                  value={detailedDescription}
                  onChange={(e) => setDetailedDescription(e.target.value)}
                  className="w-full bg-white border border-[#E6DFD5] rounded-lg p-2.5 text-xs text-[#1F2421] leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#E6DFD5]">
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="text-xs font-semibold text-[#59615C] hover:underline"
            >
              ← Back to Price Advisor
            </button>

            <button
              type="submit"
              disabled={isPublishing}
              className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-8 py-3 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <span>{isPublishing ? 'Publishing Listing...' : 'Publish Product to Marketplace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}

export default function AddProductPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading Smart Cataloging Studio..." />}>
      <SmartCatalogingWizard />
    </Suspense>
  );
}
