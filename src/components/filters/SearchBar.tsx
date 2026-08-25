'use client';

import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onTagSelect?: (tag: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search handicrafts, crafts, regions (e.g. Kutch, Madhubani, Blue Pottery)...',
  onTagSelect
}) => {
  const popularTags = ['Kutch Embroidery', 'Madhubani Painting', 'Blue Pottery', 'Dhokra Art', 'Banarasi Silk', 'Channapatna'];

  return (
    <div className="w-full space-y-3">
      <div className="relative flex items-center">
        <Search className="w-5 h-5 absolute left-4 text-[#59615C] pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-xl pl-12 pr-10 py-3.5 text-sm text-[#1F2421] placeholder-[#59615C]/70 focus:outline-none focus:border-[#C85A32] focus:ring-2 focus:ring-[#C85A32]/20 transition-all shadow-sm"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3.5 p-1 text-[#59615C] hover:text-[#1F2421] rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Popular Tag Chips */}
      {onTagSelect && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[#59615C] font-medium flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-[#D99B26]" />
            Popular:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              className="bg-[#F7F3EE] hover:bg-[#C85A32] hover:text-white text-[#59615C] px-2.5 py-1 rounded-full border border-[#E6DFD5] transition-all flex-shrink-0 font-medium text-[11px]"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
