import React from 'react';
import Link from 'next/link';
import { Heart, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1F2421] text-[#F7F3EE] pt-16 pb-8 border-t-4 border-[#6B1D2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C85A32] to-[#6B1D2F] flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Meri<span className="text-[#C85A32]">dian</span>
              </span>
            </div>
            <p className="text-sm text-[#F7F3EE]/70 leading-relaxed max-w-sm">
              Empowering India’s traditional karigars with AI-driven fair price discovery, regional craft story preservation, and direct digital market access.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#2C5E43]/30 text-[#EBF4EF] border border-[#2C5E43]/50 px-3 py-1.5 rounded-lg text-xs">
              <ShieldCheck className="w-4 h-4 text-[#2C5E43]" />
              <span>SIH 2026 Problem Statement SIH26090 Prototype</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 text-[#D99B26]">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F7F3EE]/70">
              <li>
                <Link href="/products" className="hover:text-[#C85A32] transition-colors">
                  All Handicrafts
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-[#C85A32] transition-colors">
                  Artisan Directory
                </Link>
              </li>
              <li>
                <Link href="/regions" className="hover:text-[#C85A32] transition-colors">
                  Regional Craft Map
                </Link>
              </li>
              <li>
                <Link href="/market-insights" className="hover:text-[#C85A32] transition-colors">
                  Price & Market Insights
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="hover:text-[#C85A32] transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D99B26]" />
                  AI Personalized Picks
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Artisan Tools */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 text-[#D99B26]">
              Artisan AI Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F7F3EE]/70">
              <li>
                <Link href="/price-assistant" className="hover:text-[#C85A32] transition-colors">
                  AI Price Assistant
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#C85A32] transition-colors">
                  Artisan Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/add-product" className="hover:text-[#C85A32] transition-colors">
                  List New Product
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#C85A32] transition-colors">
                  Karigar Registration
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C85A32] transition-colors">
                  About & Vision
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured Crafts */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 text-[#D99B26]">
              Iconic Crafts
            </h4>
            <ul className="space-y-2 text-xs text-[#F7F3EE]/60">
              <li>Kutch Mirror Embroidery</li>
              <li>Madhubani Folk Canvas</li>
              <li>Jaipur Quartz Blue Pottery</li>
              <li>Bastar Lost-Wax Dhokra</li>
              <li>Channapatna Lacquer Toys</li>
              <li>Varanasi Kadhwa Silk</li>
              <li>Puri Palm Leaf Pattachitra</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F7F3EE]/50 gap-4">
          <p>© 2026 Meridian Prototype. Developed for Smart India Hackathon (SIH26090).</p>
          <div className="flex items-center gap-1 text-[#F7F3EE]/60">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C85A32] fill-current" />
            <span>for Indian Karigars</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
