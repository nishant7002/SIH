'use client';

import React from 'react';
import { Filter, RotateCcw, ShieldCheck } from 'lucide-react';

interface FilterPanelProps {
  crafts: string[];
  states: string[];
  categories: string[];
  selectedCraft: string;
  selectedState: string;
  selectedCategory: string;
  maxPrice: number;
  onCraftChange: (val: string) => void;
  onStateChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onMaxPriceChange: (val: number) => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  crafts,
  states,
  categories,
  selectedCraft,
  selectedState,
  selectedCategory,
  maxPrice,
  onCraftChange,
  onStateChange,
  onCategoryChange,
  onMaxPriceChange,
  onReset
}) => {
  return (
    <div className="craft-card p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#C85A32]" />
          <h3 className="text-sm font-bold text-[#1F2421]">Filter Handicrafts</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-[#6B1D2F] hover:text-[#C85A32] font-semibold flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Craft Type Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#59615C] uppercase tracking-wider block">
          Craft Technique
        </label>
        <select
          value={selectedCraft}
          onChange={(e) => onCraftChange(e.target.value)}
          className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs text-[#1F2421] focus:outline-none focus:border-[#C85A32]"
        >
          <option value="All">All Crafts ({crafts.length})</option>
          {crafts.map((craft) => (
            <option key={craft} value={craft}>
              {craft}
            </option>
          ))}
        </select>
      </div>

      {/* State / Region Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#59615C] uppercase tracking-wider block">
          State / Region
        </label>
        <select
          value={selectedState}
          onChange={(e) => onStateChange(e.target.value)}
          className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs text-[#1F2421] focus:outline-none focus:border-[#C85A32]"
        >
          <option value="All">All States ({states.length})</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Product Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#59615C] uppercase tracking-wider block">
          Product Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs text-[#1F2421] focus:outline-none focus:border-[#C85A32]"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <label className="font-semibold text-[#59615C] uppercase tracking-wider">
            Max Price Filter
          </label>
          <span className="font-bold text-[#6B1D2F]">₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min={500}
          max={20000}
          step={500}
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-[#C85A32] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#59615C]">
          <span>₹500</span>
          <span>₹20,000+</span>
        </div>
      </div>
    </div>
  );
};
