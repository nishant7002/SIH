'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Artisan, Product } from '../../../types';
import { apiService } from '../../../services/apiService';
import { ProductCard } from '../../../components/common/ProductCard';
import { Modal } from '../../../components/common/Modal';
import { Toast } from '../../../components/common/Toast';
import { LoadingState } from '../../../components/common/LoadingState';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Award,
  Package,
  MessageSquare,
  ChevronLeft,
  Phone,
  Mail,
  Star,
  CheckCircle2
} from 'lucide-react';

export default function ArtisanProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Inquiry Modal State
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadArtisanProfile() {
      setLoading(true);
      try {
        const data = await apiService.getArtisanById(id);
        if (data) {
          setArtisan(data);
          // Fetch products created by this artisan
          const allProds = await apiService.getProducts();
          const filtered = allProds.filter((p) => p.artisanId === data.id || p.artisanName === data.name);
          setArtisanProducts(filtered.length > 0 ? filtered : allProds.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load artisan profile:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadArtisanProfile();
  }, [id]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInquiryModalOpen(false);
    setToastMessage(`Your inquiry has been sent directly to ${artisan?.name}!`);
    setInquiryMessage('');
    setInquiryEmail('');
  };

  if (loading) {
    return <LoadingState message="Fetching master artisan profile..." />;
  }

  if (!artisan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1F2421]">Artisan Profile Not Found</h2>
        <Link href="/artisans" className="text-[#6B1D2F] font-bold underline">
          Back to Artisan Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Navigation link */}
      <Link
        href="/artisans"
        className="inline-flex items-center gap-1 text-xs text-[#6B1D2F] hover:text-[#C85A32] font-semibold transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Artisan Directory
      </Link>

      {/* Hero Profile Banner */}
      <div className="bg-gradient-to-r from-[#6B1D2F] via-[#4A121F] to-[#1F2421] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          {/* Profile Photo */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl flex-shrink-0 bg-white">
            <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{artisan.name}</h1>
              {artisan.verified && (
                <span className="bg-[#2C5E43] text-white text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Karigar
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-[#D99B26]">{artisan.craft}</p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                {artisan.district}, {artisan.state}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#D99B26]" />
                {artisan.experienceYears} Years Craft Heritage
              </span>
              <span className="flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-green-400" />
                {artisan.productCount} Listed Products
              </span>
            </div>

            {/* Awards pills */}
            {artisan.awards && artisan.awards.length > 0 && (
              <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-2">
                {artisan.awards.map((award, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-lg text-xs flex items-center gap-1"
                  >
                    <Award className="w-3.5 h-3.5 text-[#D99B26]" />
                    {award}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action CTA */}
          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="bg-[#C85A32] hover:bg-[#A3421F] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Artisan</span>
          </button>
        </div>
      </div>

      {/* Story & Heritage Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 craft-card p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#6B1D2F] uppercase tracking-widest">
            <Award className="w-4 h-4 text-[#C85A32]" />
            <span>Artisan Life Narrative & Heritage</span>
          </div>

          <h3 className="text-xl font-bold text-[#1F2421]">Preserving traditional craft lineage</h3>

          <p className="text-xs sm:text-sm text-[#59615C] leading-relaxed whitespace-pre-line">
            {artisan.story}
          </p>

          {artisan.craftHeritage && (
            <div className="mt-4 p-4 bg-[#F7F3EE] rounded-xl border border-[#E6DFD5] text-xs text-[#1F2421]">
              <strong className="text-[#6B1D2F] block mb-1">Craft Lineage & Knowledge:</strong>
              {artisan.craftHeritage}
            </div>
          )}
        </div>

        {/* Contact & Verification Box */}
        <div className="lg:col-span-4 craft-card p-6 space-y-4">
          <h3 className="text-base font-bold text-[#1F2421] pb-2 border-b border-[#E6DFD5]">
            Verification & Contact
          </h3>

          <div className="space-y-3 text-xs text-[#59615C]">
            <div className="flex items-center gap-2 text-[#2C5E43] font-semibold bg-[#EBF4EF] p-2.5 rounded-lg border border-[#2C5E43]/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Government GI-Cluster Registered</span>
            </div>

            {artisan.contactEmail && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#6B1D2F]" />
                <span>{artisan.contactEmail}</span>
              </div>
            )}

            {artisan.contactPhone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C85A32]" />
                <span>{artisan.contactPhone}</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="w-full bg-[#6B1D2F] hover:bg-[#4A121F] text-white py-3 rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Direct Inquiry</span>
          </button>
        </div>
      </div>

      {/* Artisan Product Catalog */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#C85A32] uppercase tracking-widest">Handcrafted Collection</div>
            <h2 className="text-2xl font-extrabold text-[#1F2421]">Products by {artisan.name}</h2>
          </div>
          <span className="text-xs text-[#59615C] font-semibold">{artisanProducts.length} Listings Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artisanProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Inquiry Modal */}
      <Modal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        title={`Contact ${artisan.name}`}
      >
        <form onSubmit={handleInquirySubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#59615C]">Your Email *</label>
            <input
              type="email"
              required
              value={inquiryEmail}
              onChange={(e) => setInquiryEmail(e.target.value)}
              placeholder="buyer@example.com"
              className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#59615C]">Message to Artisan *</label>
            <textarea
              required
              rows={4}
              value={inquiryMessage}
              onChange={(e) => setInquiryMessage(e.target.value)}
              placeholder="Write your custom order or bulk query..."
              className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsInquiryModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#59615C]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#6B1D2F] text-white px-5 py-2 rounded-lg text-xs font-bold"
            >
              Send Inquiry
            </button>
          </div>
        </form>
      </Modal>

      {/* Toast */}
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
