import React from 'react';
import Link from 'next/link';
import { CraftCategory } from '../../types';
import { Users, ArrowUpRight } from 'lucide-react';

interface CraftCardProps {
  craft: CraftCategory;
}

const FALLBACK_CRAFT_IMAGE = 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=600&q=80';

export const CraftCard: React.FC<CraftCardProps> = ({ craft }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_CRAFT_IMAGE;
  };

  return (
    <Link
      href={`/products?craft=${encodeURIComponent(craft.name)}`}
      className="craft-card flex flex-col overflow-hidden group hover:border-[#C85A32] transition-all focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F7F3EE]">
        <img
          src={craft.image || FALLBACK_CRAFT_IMAGE}
          alt={craft.name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
          <div className="flex items-center justify-between">
            <span className="bg-[#C85A32] text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded tracking-wider">
              {craft.region}, {craft.state}
            </span>
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#6B1D2F] transition-colors">
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mt-1.5 drop-shadow-sm">{craft.name}</h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <p className="text-xs text-[#59615C] line-clamp-2">{craft.description}</p>
        
        <div className="pt-2 border-t border-[#E6DFD5] flex items-center justify-between text-xs text-[#1F2421]">
          <span className="flex items-center gap-1 font-medium">
            <Users className="w-3.5 h-3.5 text-[#2C5E43]" aria-hidden="true" />
            {craft.artisanCount.toLocaleString('en-IN')}+ Artisans
          </span>
          <span className="text-[#6B1D2F] font-semibold group-hover:underline">Explore Crafts →</span>
        </div>
      </div>
    </Link>
  );
};
