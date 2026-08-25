'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Compass,
  TrendingUp,
  LayoutDashboard,
  PlusCircle,
  Calculator,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<'buyer' | 'artisan'>('buyer');

  const isPublicActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#FDFAF6]/95 backdrop-blur-md border-b border-[#E6DFD5] transition-all">
      {/* Top Banner - Hackathon Status */}
      <div className="bg-[#6B1D2F] text-white text-xs px-4 py-1.5 flex justify-between items-center font-medium">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D99B26] animate-pulse"></span>
            SIH 2026 Problem Statement SIH26090 — <strong className="font-semibold text-[#F7F3EE]">Meridian Prototype</strong>
          </span>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline text-white/80">Mode:</span>
            <div className="bg-black/30 p-0.5 rounded-md flex items-center gap-1 border border-white/20">
              <button
                onClick={() => setUserRole('buyer')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${userRole === 'buyer'
                  ? 'bg-[#C85A32] text-white shadow-sm'
                  : 'text-white/80 hover:text-white'
                  }`}
              >
                Buyer View
              </button>
              <button
                onClick={() => setUserRole('artisan')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${userRole === 'artisan'
                  ? 'bg-[#C85A32] text-white shadow-sm'
                  : 'text-white/80 hover:text-white'
                  }`}
              >
                Artisan View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#C85A32] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            M
          </div>
          <div>
            <span className="text-xl font-bold text-[#6B1D2F] tracking-tight flex items-center gap-1">
              Meridian
            </span>
            <span className="text-[10px] block -mt-1 tracking-widest text-[#59615C] font-semibold uppercase">
              Artisan AI Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {userRole === 'buyer' ? (
            <>
              <Link
                href="/"
                className={`transition-colors hover:text-[#C85A32] ${isPublicActive('/') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                  }`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`transition-colors hover:text-[#C85A32] ${isPublicActive('/products') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                  }`}
              >
                Products
              </Link>
              <Link
                href="/artisans"
                className={`transition-colors hover:text-[#C85A32] ${isPublicActive('/artisans') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                  }`}
              >
                Artisans
              </Link>
              <Link
                href="/regions"
                className={`transition-colors hover:text-[#C85A32] ${isPublicActive('/regions') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                  }`}
              >
                Explore Crafts
              </Link>
              <Link
                href="/market-insights"
                className={`transition-colors hover:text-[#C85A32] ${isPublicActive('/market-insights') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                  }`}
              >
                Price Insights
              </Link>
              <Link
                href="/recommendations"
                className={`flex items-center gap-1 text-[#2C5E43] font-semibold bg-[#EBF4EF] px-2.5 py-1 rounded-full text-xs hover:bg-[#2C5E43] hover:text-white transition-all`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Picks
              </Link>
              <Link
                href="/about"
                className={`transition-colors hover:text-[#C85A32] ${isPublicActive('/about') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                  }`}
              >
                About
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center gap-1.5 transition-colors hover:text-[#C85A32] ${isPublicActive('/dashboard') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                  }`}
              >
                <LayoutDashboard className="w-4 h-4 text-[#C85A32]" />
                Dashboard
              </Link>
              <Link
                href="/price-assistant"
                className={`flex items-center gap-1.5 transition-colors hover:text-[#C85A32] ${isPublicActive('/price-assistant') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                  }`}
              >
                <Calculator className="w-4 h-4 text-[#2C5E43]" />
                AI Price Assistant
              </Link>
              <Link
                href="/dashboard/add-product"
                className={`flex items-center gap-1.5 transition-colors hover:text-[#C85A32] ${isPublicActive('/dashboard/add-product') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                  }`}
              >
                <PlusCircle className="w-4 h-4 text-[#6B1D2F]" />
                Add Product
              </Link>
              <Link
                href="/market-insights"
                className={`flex items-center gap-1.5 transition-colors hover:text-[#C85A32] ${isPublicActive('/market-insights') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                  }`}
              >
                <TrendingUp className="w-4 h-4 text-[#D99B26]" />
                Market Insights
              </Link>
            </>
          )}
        </nav>

        {/* Right Quick Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="p-2 text-[#59615C] hover:text-[#6B1D2F] hover:bg-[#F7F3EE] rounded-full transition-colors hidden sm:flex"
            title="Search Handicrafts"
          >
            <Search className="w-5 h-5" />
          </Link>

          {userRole === 'buyer' ? (
            <Link
              href="/login"
              className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          ) : (
            <Link
              href="/artisans/art-1"
              className="border border-[#C85A32] text-[#C85A32] hover:bg-[#C85A32] hover:text-white px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#2C5E43]" />
              <span>Pabiben (Artisan)</span>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1F2421] hover:bg-[#F7F3EE] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFAF6] border-b border-[#E6DFD5] px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between bg-[#F7F3EE] p-2 rounded-lg mb-2">
            <span className="text-xs font-semibold text-[#59615C]">Switch Mode:</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setUserRole('buyer');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 text-xs rounded font-medium ${userRole === 'buyer' ? 'bg-[#6B1D2F] text-white' : 'bg-white text-gray-700'
                  }`}
              >
                Buyer
              </button>
              <button
                onClick={() => {
                  setUserRole('artisan');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 text-xs rounded font-medium ${userRole === 'artisan' ? 'bg-[#C85A32] text-white' : 'bg-white text-gray-700'
                  }`}
              >
                Artisan
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-[#F7F3EE] rounded-lg"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-[#F7F3EE] rounded-lg"
            >
              Explore Products
            </Link>
            <Link
              href="/artisans"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-[#F7F3EE] rounded-lg"
            >
              Artisans Directory
            </Link>
            <Link
              href="/regions"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-[#F7F3EE] rounded-lg"
            >
              Regional Crafts Map
            </Link>
            <Link
              href="/price-assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#2C5E43] font-semibold hover:bg-[#EBF4EF] rounded-lg flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              AI Price Assistant
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#C85A32] font-semibold hover:bg-[#FDF6F0] rounded-lg flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Artisan Dashboard
            </Link>
            <Link
              href="/market-insights"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-[#F7F3EE] rounded-lg"
            >
              Market Insights
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-[#F7F3EE] rounded-lg"
            >
              About & Impact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
