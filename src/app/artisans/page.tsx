'use client';

import React, { useState, useEffect } from 'react';
import { Artisan } from '../../types';
import { apiService } from '../../services/apiService';
import { ArtisanCard } from '../../components/common/ArtisanCard';
import { SearchBar } from '../../components/filters/SearchBar';
import { LoadingState } from '../../components/common/LoadingState';
import { EmptyState } from '../../components/common/EmptyState';
import { ShieldCheck, MapPin, Award, Users } from 'lucide-react';

export default function ArtisanDirectoryPage() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCraft, setSelectedCraft] = useState('All');

  const availableStates = ['Gujarat', 'Bihar', 'Rajasthan', 'Chhattisgarh', 'Karnataka', 'Uttar Pradesh', 'Odisha', 'Assam', 'Jammu & Kashmir', 'West Bengal'];
  const availableCrafts = ['Kutch Embroidery', 'Madhubani Painting', 'Blue Pottery', 'Dhokra Art', 'Channapatna Toys', 'Banarasi Weaving', 'Pattachitra', 'Bamboo Crafts', 'Pashmina & Sozni', 'Kantha Stitch'];

  const fetchArtisans = async () => {
    setLoading(true);
    try {
      const data = await apiService.getArtisans({
        search: searchQuery,
        state: selectedState,
        craft: selectedCraft
      });
      setArtisans(data);
    } catch (err) {
      console.error('Failed to load artisans:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtisans();
  }, [searchQuery, selectedState, selectedCraft]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedState('All');
    setSelectedCraft('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6B1D2F] uppercase tracking-widest">
          <Users className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>Karigar Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
          Master Karigars of India
        </h1>
        <p className="text-sm text-[#59615C] max-w-3xl">
          Connect directly with verified traditional craftspeople, state awardees, and heritage artisans across India’s indigenous craft clusters.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#FDFAF6] p-4 rounded-2xl border border-[#E6DFD5] shadow-sm space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search karigars by artisan name, craft, state, or district..."
        />

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#E6DFD5] text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[#59615C] font-semibold">State:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-[#F7F3EE] border border-[#E6DFD5] text-[#1F2421] px-2.5 py-1 rounded-lg font-semibold focus:outline-none focus:border-[#C85A32]"
              >
                <option value="All">All States ({availableStates.length})</option>
                {availableStates.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#59615C] font-semibold">Craft:</span>
              <select
                value={selectedCraft}
                onChange={(e) => setSelectedCraft(e.target.value)}
                className="bg-[#F7F3EE] border border-[#E6DFD5] text-[#1F2421] px-2.5 py-1 rounded-lg font-semibold focus:outline-none focus:border-[#C85A32]"
              >
                <option value="All">All Crafts ({availableCrafts.length})</option>
                {availableCrafts.map((cr) => (
                  <option key={cr} value={cr}>{cr}</option>
                ))}
              </select>
            </div>

            {(selectedState !== 'All' || selectedCraft !== 'All' || searchQuery !== '') && (
              <button onClick={handleReset} className="text-[#6B1D2F] font-bold hover:underline">
                Clear Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[#2C5E43] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Verified Karigars</span>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      {loading ? (
        <LoadingState message="Fetching master artisan profiles..." />
      ) : artisans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Artisans Match Your Search"
          description="Try broadening your state or craft selection to discover master craftsmen."
          onAction={handleReset}
        />
      )}
    </div>
  );
}
