'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RegionInfo, Product } from '../../types';
import { apiService } from '../../services/apiService';
import { ProductCard } from '../../components/common/ProductCard';
import { MapPin, Compass, Users, Sparkles, ArrowRight, Layers } from 'lucide-react';

export default function RegionalCraftsPage() {
  const [regions, setRegions] = useState<RegionInfo[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<RegionInfo | null>(null);
  const [regionalProducts, setRegionalProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRegions() {
      setLoading(true);
      try {
        const regs = await apiService.getRegions();
        setRegions(regs);
        if (regs.length > 0) {
          setSelectedRegion(regs[0]);
          const prods = await apiService.getProducts({ state: regs[0].state });
          setRegionalProducts(prods);
        }
      } catch (err) {
        console.error('Failed to load regions:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRegions();
  }, []);

  const handleRegionSelect = async (reg: RegionInfo) => {
    setSelectedRegion(reg);
    const prods = await apiService.getProducts({ state: reg.state });
    setRegionalProducts(prods);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C85A32] uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5 text-[#6B1D2F]" />
          <span>Interactive India Craft Explorer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
          Explore Regional Craft Clusters & Traditions
        </h1>
        <p className="text-sm text-[#59615C] max-w-3xl">
          Discover traditional handicraft belts across 28 Indian states, mapping centuries of indigenous heritage, specialized artisan clusters, and fair price discovery.
        </p>
      </div>

      {/* Region Selector Grid Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {regions.map((reg) => (
          <button
            key={reg.regionName}
            onClick={() => handleRegionSelect(reg)}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedRegion?.regionName === reg.regionName
                ? 'bg-[#6B1D2F] text-white border-[#6B1D2F] shadow-md ring-2 ring-[#6B1D2F]/20'
                : 'bg-[#FDFAF6] hover:bg-[#F7F3EE] text-[#1F2421] border-[#E6DFD5]'
            }`}
          >
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                selectedRegion?.regionName === reg.regionName ? 'text-[#D99B26]' : 'text-[#C85A32]'
              }`}>
                {reg.state}
              </span>
              <h4 className="text-xs font-bold truncate mt-0.5">{reg.regionName}</h4>
            </div>
            <span className={`text-[11px] mt-2 block font-medium ${
              selectedRegion?.regionName === reg.regionName ? 'text-white/80' : 'text-[#59615C]'
            }`}>
              {reg.artisanCount.toLocaleString('en-IN')}+ karigars
            </span>
          </button>
        ))}
      </div>

      {/* Active Region Spotlight */}
      {selectedRegion && (
        <div className="bg-[#F7F3EE] border border-[#E6DFD5] rounded-3xl p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual */}
            <div className="lg:col-span-5 relative h-64 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <img
                src={selectedRegion.image}
                alt={selectedRegion.regionName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#6B1D2F] text-white px-3 py-1 rounded-lg text-xs font-bold">
                {selectedRegion.state} Belt
              </div>
            </div>

            {/* Info Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2C5E43] uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" />
                <span>Craft Cluster Overview</span>
              </div>

              <h2 className="text-2xl font-extrabold text-[#1F2421]">{selectedRegion.regionName}</h2>

              <p className="text-xs sm:text-sm text-[#59615C] leading-relaxed">
                {selectedRegion.description}
              </p>

              {/* Major Crafts Pills */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold text-[#1F2421] block">Major Traditional Crafts:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedRegion.majorCrafts.map((cr) => (
                    <span
                      key={cr}
                      className="bg-[#FDFAF6] text-[#6B1D2F] border border-[#6B1D2F]/20 px-3 py-1 rounded-lg text-xs font-semibold shadow-xs"
                    >
                      {cr}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clusters List */}
              <div className="space-y-1 text-xs text-[#59615C]">
                <strong className="text-[#1F2421]">Key Artisan Villages:</strong>{' '}
                {selectedRegion.craftClusters.join(' • ')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regional Products Showcase Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#6B1D2F] uppercase tracking-widest">Regional Catalog</div>
            <h2 className="text-2xl font-extrabold text-[#1F2421]">
              Handicrafts from {selectedRegion?.state}
            </h2>
          </div>

          <Link
            href={`/products?state=${encodeURIComponent(selectedRegion?.state || '')}`}
            className="text-xs font-bold text-[#6B1D2F] hover:text-[#C85A32] flex items-center gap-1"
          >
            <span>View All {selectedRegion?.state} Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {regionalProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="p-8 bg-[#FDFAF6] rounded-2xl border border-[#E6DFD5] text-center text-xs text-[#59615C]">
            No specific products listed for this state yet. Showing all regional items in Explore Products.
          </div>
        )}
      </div>
    </div>
  );
}
