import React from 'react';
import Link from 'next/link';
import { Artisan } from '../../types';
import { ShieldCheck, Award, MapPin, Package, Clock, ArrowRight } from 'lucide-react';

interface ArtisanCardProps {
  artisan: Artisan;
}

const FALLBACK_ARTISAN_IMAGE = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80';

export const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_ARTISAN_IMAGE;
  };

  return (
    <article className="craft-card p-5 flex flex-col justify-between h-full group focus-within:ring-2 focus-within:ring-[#C85A32]">
      <div>
        {/* Header Photo & Identity */}
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C85A32] flex-shrink-0 bg-[#F7F3EE]">
            <img
              src={artisan.image || FALLBACK_ARTISAN_IMAGE}
              alt={artisan.name}
              onError={handleImageError}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              loading="lazy"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <Link
                href={`/artisans/${artisan.id}`}
                className="text-lg font-bold text-[#1F2421] group-hover:text-[#6B1D2F] transition-colors focus:outline-none"
              >
                {artisan.name}
              </Link>
              {artisan.verified && (
                <span title="Verified Artisan" className="inline-flex">
                  <ShieldCheck className="w-4 h-4 text-[#2C5E43]" aria-label="Verified Artisan" />
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-[#C85A32] mt-0.5">{artisan.craft}</p>

            <div className="flex items-center gap-1 text-xs text-[#59615C] mt-1">
              <MapPin className="w-3 h-3 text-[#D99B26]" aria-hidden="true" />
              <span>
                {artisan.district}, {artisan.state}
              </span>
            </div>
          </div>
        </div>

        {/* Story Snippet */}
        <p className="text-xs text-[#1F2421]/80 mt-3.5 line-clamp-3 leading-relaxed">
          {artisan.story}
        </p>

        {/* Awards pill if present */}
        {artisan.awards && artisan.awards.length > 0 && (
          <div className="mt-3 bg-[#FDF2F4] text-[#6B1D2F] px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 border border-[#6B1D2F]/20">
            <Award className="w-3.5 h-3.5 text-[#6B1D2F]" aria-hidden="true" />
            <span className="truncate">{artisan.awards[0]}</span>
          </div>
        )}
      </div>

      {/* Footer Metrics */}
      <div className="mt-4 pt-3 border-t border-[#E6DFD5] flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-[#59615C]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#C85A32]" aria-hidden="true" />
            <strong>{artisan.experienceYears}y</strong> exp
          </span>
          <span className="flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-[#2C5E43]" aria-hidden="true" />
            <strong>{artisan.productCount}</strong> products
          </span>
        </div>

        <Link
          href={`/artisans/${artisan.id}`}
          className="text-xs font-semibold text-[#6B1D2F] group-hover:text-[#C85A32] flex items-center gap-1 transition-colors focus:outline-none"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};
