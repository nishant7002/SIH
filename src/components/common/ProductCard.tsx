import React from 'react';
import Link from 'next/link';
import { Product } from '../../types';
import { Star, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=800&q=80';

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <article className="craft-card flex flex-col h-full overflow-hidden group focus-within:ring-2 focus-within:ring-[#C85A32]">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full bg-[#F7F3EE] overflow-hidden">
        <img
          src={product.image || FALLBACK_IMAGE}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Region Tag Top-Left */}
        <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#D99B26]" aria-hidden="true" />
          <span>{product.region}, {product.state}</span>
        </div>

        {/* AI Price Badge Top-Right */}
        <div className="absolute top-2.5 right-2.5 bg-[#2C5E43] text-white px-2.5 py-1 rounded-md text-[11px] font-medium shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#D99B26]" aria-hidden="true" />
          <span>AI Fair Price</span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Craft Name & Rating */}
          <div className="flex items-center justify-between text-xs text-[#C85A32] font-semibold mb-1">
            <span className="uppercase tracking-wider">{product.craft}</span>
            <span className="text-[#59615C] font-normal flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#D99B26] text-[#D99B26]" aria-hidden="true" />
              <span className="font-semibold text-[#1F2421]">{product.rating}</span> ({product.reviewCount})
            </span>
          </div>

          {/* Product Title */}
          <Link
            href={`/products/${product.id}`}
            className="group-hover:text-[#6B1D2F] transition-colors focus:outline-none"
            aria-label={`View details for ${product.name}`}
          >
            <h3 className="text-base font-bold text-[#1F2421] line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Artisan Name */}
          <p className="text-xs text-[#59615C] mt-1.5 flex items-center gap-1">
            <span>By</span>
            <Link
              href={`/artisans/${product.artisanId}`}
              className="font-semibold text-[#1F2421] hover:text-[#C85A32] transition-colors"
            >
              {product.artisanName}
            </Link>
            {product.isVerifiedArtisan && (
              <span title="Verified Karigar" className="inline-flex">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2C5E43]" aria-label="Verified Karigar" />
              </span>
            )}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#E6DFD5] flex items-center justify-between mt-auto">
          <div>
            <div className="text-[11px] text-[#59615C]">Listed Price</div>
            <div className="text-lg font-bold text-[#6B1D2F]">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
          </div>

          <Link
            href={`/products/${product.id}`}
            className="bg-[#F7F3EE] hover:bg-[#6B1D2F] text-[#6B1D2F] hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border border-[#E6DFD5] focus:ring-2 focus:ring-[#6B1D2F]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};
