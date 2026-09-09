'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '../../types';
import { apiService } from '../../services/apiService';
import { useWishlist } from '../../hooks/useWishlist';
import { ProductCard } from '../../components/common/ProductCard';
import { LoadingState } from '../../components/common/LoadingState';
import { Heart, HeartOff, ArrowRight, ShoppingBag, Trash2, Sparkles, ChevronLeft } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, isLoaded, clearWishlist } = useWishlist();
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlistProducts() {
      setLoading(true);
      try {
        const allProducts = await apiService.getProducts();
        const filtered = allProducts.filter((p) => wishlist.includes(p.id));
        setSavedProducts(filtered);
      } catch (err) {
        console.error('Failed to load wishlist products:', err);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded) {
      loadWishlistProducts();
    }
  }, [wishlist, isLoaded]);

  if (!isLoaded || loading) {
    return <LoadingState message="Loading your saved wishlist products..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DFD5] pb-6">
        <div className="space-y-1">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1 text-xs text-[#6B1D2F] hover:text-[#C85A32] font-semibold transition-colors mb-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2 text-xs font-bold text-[#6B1D2F] uppercase tracking-widest">
            <Heart className="w-4 h-4 fill-[#6B1D2F]" />
            <span>Buyer Saved Collection</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1F2421] tracking-tight">
            My Wishlist
          </h1>
          <p className="text-xs text-[#59615C]">
            Your saved artisan products, all in one place.
          </p>
        </div>

        {savedProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#59615C]">
              {savedProducts.length} {savedProducts.length === 1 ? 'item saved' : 'items saved'}
            </span>
            <button
              onClick={() => clearWishlist()}
              className="text-xs text-[#6B1D2F] hover:text-[#C85A32] font-semibold flex items-center gap-1 border border-[#6B1D2F]/20 hover:border-[#C85A32] px-3 py-1.5 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Wishlist
            </button>
          </div>
        )}
      </div>

      {/* Wishlist Products Grid or Empty State */}
      {savedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="craft-card p-12 text-center max-w-lg mx-auto space-y-5 my-8">
          <div className="w-16 h-16 rounded-full bg-[#FDF2F4] text-[#6B1D2F] flex items-center justify-center mx-auto border border-[#6B1D2F]/20 shadow-sm">
            <HeartOff className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-[#1F2421]">Your wishlist is empty</h2>
            <p className="text-xs text-[#59615C] max-w-sm mx-auto leading-relaxed">
              Save products you love while exploring authentic Indian handicrafts and come back to them anytime.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/products"
              className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
