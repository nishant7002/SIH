'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '../../types';
import { apiService } from '../../services/apiService';
import { SearchBar } from '../../components/filters/SearchBar';
import { FilterPanel } from '../../components/filters/FilterPanel';
import { ProductCard } from '../../components/common/ProductCard';
import { LoadingState } from '../../components/common/LoadingState';
import { EmptyState } from '../../components/common/EmptyState';
import { SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';

function ExploreProductsContent() {
  const searchParams = useSearchParams();
  const initialCraft = searchParams.get('craft') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCraft, setSelectedCraft] = useState(initialCraft);
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'popular' | 'new'>('recommended');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch filtered data from apiService
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiService.getProducts({
        search: searchQuery,
        craft: selectedCraft,
        state: selectedState,
        category: selectedCategory,
        maxPrice: maxPrice,
        sortBy: sortBy
      });
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedCraft, selectedState, selectedCategory, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCraft('All');
    setSelectedState('All');
    setSelectedCategory('All');
    setMaxPrice(20000);
    setSortBy('recommended');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C85A32] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Handicraft Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
          Explore Authentic Indian Handicrafts
        </h1>
        <p className="text-sm text-[#59615C] max-w-3xl">
          Discover handloom textiles, folk paintings, blue pottery, lost-wax bronzes, and wooden crafts verified for fair pricing and artisan origin.
        </p>
      </div>

      {/* Search & Action Bar */}
      <div className="space-y-4 bg-[#FDFAF6] p-4 rounded-2xl border border-[#E6DFD5] shadow-sm">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onTagSelect={(tag) => setSelectedCraft(tag)}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#E6DFD5] text-xs">
          {/* Active Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#59615C] font-semibold">Active:</span>
            {selectedCraft !== 'All' && (
              <span className="bg-[#6B1D2F] text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                Craft: {selectedCraft}
                <button onClick={() => setSelectedCraft('All')}>×</button>
              </span>
            )}
            {selectedState !== 'All' && (
              <span className="bg-[#C85A32] text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                State: {selectedState}
                <button onClick={() => setSelectedState('All')}>×</button>
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="bg-[#2C5E43] text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')}>×</button>
              </span>
            )}
            {maxPrice < 20000 && (
              <span className="bg-[#D99B26] text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                Under ₹{maxPrice.toLocaleString('en-IN')}
                <button onClick={() => setMaxPrice(20000)}>×</button>
              </span>
            )}
            {(selectedCraft !== 'All' || selectedState !== 'All' || selectedCategory !== 'All' || maxPrice < 20000) && (
              <button
                onClick={handleResetFilters}
                className="text-[#6B1D2F] hover:underline font-semibold ml-1"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sort Dropdown & Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden bg-[#F7F3EE] border border-[#E6DFD5] text-[#1F2421] px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#59615C]" />
              <span className="text-[#59615C] font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F7F3EE] border border-[#E6DFD5] text-[#1F2421] px-3 py-1.5 rounded-lg font-semibold focus:outline-none focus:border-[#C85A32]"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
                <option value="new">Newest Additions</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid & Filter Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterPanel
            crafts={['Kutch Embroidery', 'Madhubani Painting', 'Blue Pottery', 'Dhokra Art', 'Channapatna Toys', 'Banarasi Weaving', 'Pattachitra', 'Bamboo Crafts', 'Pashmina & Sozni', 'Kantha Stitch']}
            states={['Gujarat', 'Bihar', 'Rajasthan', 'Chhattisgarh', 'Karnataka', 'Uttar Pradesh', 'Odisha', 'Assam', 'Jammu & Kashmir', 'West Bengal']}
            categories={['Home Decor & Textiles', 'Paintings & Wall Art', 'Ceramics & Pottery', 'Metalware & Sculptures', 'Toys & Wooden Crafts', 'Handloom Apparel', 'Apparel & Fashion Accessories']}
            selectedCraft={selectedCraft}
            selectedState={selectedState}
            selectedCategory={selectedCategory}
            maxPrice={maxPrice}
            onCraftChange={setSelectedCraft}
            onStateChange={setSelectedState}
            onCategoryChange={setSelectedCategory}
            onMaxPriceChange={setMaxPrice}
            onReset={handleResetFilters}
          />
        </div>

        {/* Mobile Filter Overlay */}
        {showMobileFilters && (
          <div className="lg:hidden col-span-1 mb-4">
            <FilterPanel
              crafts={['Kutch Embroidery', 'Madhubani Painting', 'Blue Pottery', 'Dhokra Art', 'Channapatna Toys', 'Banarasi Weaving', 'Pattachitra', 'Bamboo Crafts', 'Pashmina & Sozni', 'Kantha Stitch']}
              states={['Gujarat', 'Bihar', 'Rajasthan', 'Chhattisgarh', 'Karnataka', 'Uttar Pradesh', 'Odisha', 'Assam', 'Jammu & Kashmir', 'West Bengal']}
              categories={['Home Decor & Textiles', 'Paintings & Wall Art', 'Ceramics & Pottery', 'Metalware & Sculptures', 'Toys & Wooden Crafts', 'Handloom Apparel', 'Apparel & Fashion Accessories']}
              selectedCraft={selectedCraft}
              selectedState={selectedState}
              selectedCategory={selectedCategory}
              maxPrice={maxPrice}
              onCraftChange={setSelectedCraft}
              onStateChange={setSelectedState}
              onCategoryChange={setSelectedCategory}
              onMaxPriceChange={setMaxPrice}
              onReset={handleResetFilters}
            />
          </div>
        )}

        {/* Products Grid */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#59615C] font-semibold px-1">
            <span>Showing {products.length} handicraft listings</span>
            <span className="flex items-center gap-1 text-[#2C5E43]">
              <Sparkles className="w-3.5 h-3.5 text-[#D99B26]" />
              AI Fair Price Evaluated
            </span>
          </div>

          {loading ? (
            <LoadingState message="Filtering handcrafted items..." />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Handicrafts Match Your Filters"
              description="Try adjusting your craft technique, max price slider, or search query to explore more artisan items."
              onAction={handleResetFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExploreProductsPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading marketplace..." />}>
      <ExploreProductsContent />
    </Suspense>
  );
}
