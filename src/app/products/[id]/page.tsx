'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Product, Artisan } from '../../../types';
import { apiService } from '../../../services/apiService';
import { PriceInsightCard } from '../../../components/common/PriceInsightCard';
import { ProductCard } from '../../../components/common/ProductCard';
import { Modal } from '../../../components/common/Modal';
import { Toast } from '../../../components/common/Toast';
import { LoadingState } from '../../../components/common/LoadingState';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Ruler,
  Weight,
  Sparkles,
  MessageSquare,
  ShoppingBag,
  Star,
  Award,
  ChevronLeft,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  
  // Inquiry Modal & Toast States
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryQuantity, setInquiryQuantity] = useState(1);
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProductData() {
      setLoading(true);
      try {
        const prod = await apiService.getProductById(id);
        if (prod) {
          setProduct(prod);
          setSelectedImage(prod.image);

          // Fetch artisan info
          const art = await apiService.getArtisanById(prod.artisanId);
          setArtisan(art);

          // Fetch similar recommendations
          const recRes = await apiService.getRecommendations({ productId: prod.id });
          setSimilarProducts(recRes.recommendations);
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadProductData();
  }, [id]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInquiryModalOpen(false);
    setToastMessage(`Inquiry sent to ${product?.artisanName}! They will contact you via email.`);
    setInquiryName('');
    setInquiryEmail('');
    setInquiryMessage('');
  };

  const handleAddToCart = () => {
    setToastMessage(`Added "${product?.name}" to your cart / inquiry list!`);
  };

  if (loading) {
    return <LoadingState message="Fetching authentic handicraft details..." />;
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1F2421]">Product Not Found</h2>
        <p className="text-sm text-[#59615C]">The handicraft item you requested does not exist or has been removed.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#6B1D2F] text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Explore Products
        </Link>
      </div>
    );
  }

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs text-[#59615C]">
        <Link
          href="/products"
          className="flex items-center gap-1 text-[#6B1D2F] hover:text-[#C85A32] font-semibold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to All Products
        </Link>
        <div className="flex items-center gap-2">
          <span className="bg-[#EBF4EF] text-[#2C5E43] px-2.5 py-0.5 rounded-full font-semibold">
            {product.craft}
          </span>
          <span className="bg-[#F7F3EE] text-[#1F2421] px-2.5 py-0.5 rounded-full font-semibold">
            {product.region}, {product.state}
          </span>
        </div>
      </div>

      {/* Top Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F3EE] border border-[#E6DFD5] shadow-md group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D99B26]" />
              <span>{product.region}, {product.state}</span>
            </div>
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === imgUrl ? 'border-[#C85A32] ring-2 ring-[#C85A32]/30' : 'border-[#E6DFD5]'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#C85A32] uppercase tracking-wider mb-1">
              <span>{product.category}</span>
              <span className="text-[#59615C] flex items-center gap-1 font-normal">
                <Star className="w-4 h-4 fill-[#D99B26] text-[#D99B26]" />
                <strong className="text-[#1F2421]">{product.rating}</strong> ({product.reviewCount} reviews)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421] tracking-tight">
              {product.name}
            </h1>

            {/* Artisan Attribution Card Link */}
            <div className="mt-3 flex items-center gap-3 bg-[#F7F3EE] p-3 rounded-xl border border-[#E6DFD5]">
              {artisan ? (
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#C85A32]"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center font-bold">
                  K
                </div>
              )}
              <div className="flex-1 text-xs">
                <span className="text-[#59615C] block">Crafted by Master Karigar</span>
                <Link
                  href={`/artisans/${product.artisanId}`}
                  className="font-bold text-[#6B1D2F] hover:text-[#C85A32] flex items-center gap-1 transition-colors text-sm"
                >
                  {product.artisanName}
                  {product.isVerifiedArtisan && (
                    <span title="Verified Karigar">
                      <ShieldCheck className="w-4 h-4 text-[#2C5E43]" />
                    </span>
                  )}
                </Link>
              </div>
              <Link
                href={`/artisans/${product.artisanId}`}
                className="text-xs text-[#C85A32] font-semibold border border-[#C85A32]/30 px-3 py-1 rounded-lg hover:bg-[#C85A32] hover:text-white transition-all"
              >
                View Profile
              </Link>
            </div>
          </div>

          {/* Pricing & AI Insight Box */}
          <div className="space-y-4 pt-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#6B1D2F]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#59615C]">Direct Artisan Price (Inclusive of all taxes)</span>
            </div>

            {/* AI PRICE INSIGHT CARD */}
            <PriceInsightCard
              currentPrice={product.price}
              minPrice={product.aiFairPriceRange.min}
              maxPrice={product.aiFairPriceRange.max}
              status={product.aiFairPriceRange.status}
              explanation={`Based on ${product.craft} technique, material cost benchmark, ${product.region} region index, and labor hours.`}
              confidenceScore={88}
              isPrototype={true}
            />
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-[#FDFAF6] p-4 rounded-xl border border-[#E6DFD5]">
            <div className="flex items-center gap-2 text-[#59615C]">
              <Ruler className="w-4 h-4 text-[#C85A32]" />
              <span><strong>Dimensions:</strong> {product.dimensions || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-[#59615C]">
              <Weight className="w-4 h-4 text-[#2C5E43]" />
              <span><strong>Weight:</strong> {product.weight || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-[#59615C]">
              <Clock className="w-4 h-4 text-[#D99B26]" />
              <span><strong>Production Time:</strong> {product.productionTimeDays || 7} Days</span>
            </div>
            <div className="flex items-center gap-2 text-[#59615C]">
              <ShieldCheck className="w-4 h-4 text-[#6B1D2F]" />
              <span><strong>Material:</strong> {product.material}</span>
            </div>
          </div>

          {/* CTAs & Inquiry Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#6B1D2F] hover:bg-[#4A121F] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart / Order</span>
            </button>

            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="bg-[#FDFAF6] hover:bg-[#F7F3EE] text-[#C85A32] border-2 border-[#C85A32] py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire Artisan</span>
            </button>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-[#E6DFD5] space-y-2">
            <h3 className="text-sm font-bold text-[#1F2421]">About this Craft Item</h3>
            <p className="text-xs text-[#59615C] leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Artisan Heritage Story Box */}
      {artisan && (
        <div className="bg-[#F7F3EE] border border-[#E6DFD5] rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#6B1D2F] uppercase tracking-widest">
            <Award className="w-4 h-4 text-[#C85A32]" />
            <span>Karigar Story & Heritage</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-3">
              <img
                src={artisan.image}
                alt={artisan.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mx-auto md:mx-0"
              />
            </div>
            <div className="md:col-span-9 space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold text-[#1F2421]">{artisan.name}</h3>
              <p className="text-xs text-[#C85A32] font-semibold">{artisan.craft} ({artisan.experienceYears} Years Craft Experience)</p>
              <p className="text-xs text-[#59615C] leading-relaxed">{artisan.story}</p>
            </div>
          </div>
        </div>
      )}

      {/* Similar Products Recommendations */}
      {similarProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#2C5E43] uppercase tracking-widest">AI Personalization</div>
              <h2 className="text-2xl font-extrabold text-[#1F2421]">Similar Handicraft Products</h2>
            </div>
            <Link href="/products" className="text-xs font-bold text-[#6B1D2F] hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Contact Artisan Inquiry Modal */}
      <Modal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        title={`Send Direct Inquiry to ${product.artisanName}`}
      >
        <form onSubmit={handleInquirySubmit} className="space-y-4">
          <div className="p-3 bg-[#F7F3EE] rounded-lg border border-[#E6DFD5] flex items-center gap-3">
            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
            <div>
              <h4 className="text-xs font-bold text-[#1F2421] line-clamp-1">{product.name}</h4>
              <p className="text-[11px] text-[#6B1D2F] font-bold">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#59615C]">Your Name *</label>
            <input
              type="text"
              required
              value={inquiryName}
              onChange={(e) => setInquiryName(e.target.value)}
              placeholder="e.g. Anita Sharma"
              className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#59615C]">Email Address *</label>
            <input
              type="email"
              required
              value={inquiryEmail}
              onChange={(e) => setInquiryEmail(e.target.value)}
              placeholder="anita@example.com"
              className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#59615C]">Quantity Needed</label>
            <input
              type="number"
              min={1}
              max={100}
              value={inquiryQuantity}
              onChange={(e) => setInquiryQuantity(Number(e.target.value))}
              className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#59615C]">Message / Customization Request *</label>
            <textarea
              required
              rows={3}
              value={inquiryMessage}
              onChange={(e) => setInquiryMessage(e.target.value)}
              placeholder="Ask about bulk pricing, custom colors, or delivery time..."
              className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsInquiryModalOpen(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#59615C] hover:bg-[#E6DFD5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-5 py-2 rounded-lg text-xs font-bold shadow-sm"
            >
              Submit Inquiry
            </button>
          </div>
        </form>
      </Modal>

      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
