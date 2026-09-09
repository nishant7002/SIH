'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sparkles,
  Search,
  User,
  Menu,
  X,
  TrendingUp,
  LayoutDashboard,
  PlusCircle,
  Calculator,
  ShieldCheck,
  Heart,
  LogOut
} from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, role, isAuthenticated, signOut } = useAuth();
  const { count: wishlistCount } = useWishlist();

  const isPublicActive = (path: string) => pathname === path;

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFAF6]/95 backdrop-blur-md border-b border-[#E6DFD5] transition-all">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B1D2F] to-[#C85A32] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            M
          </div>
          <div>
            <span className="text-xl font-bold text-[#6B1D2F] tracking-tight flex items-center gap-1">
              Meri<span className="text-[#C85A32]">dian</span>
            </span>
            <span className="text-[10px] block -mt-1 tracking-widest text-[#59615C] font-semibold uppercase">
              Artisan AI Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {role === 'artisan' ? (
            /* Artisan Navigation Links */
            <>
              <Link
                href="/dashboard"
                className={`flex items-center gap-1.5 transition-colors hover:text-[#C85A32] ${
                  isPublicActive('/dashboard') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-[#C85A32]" />
                Dashboard
              </Link>
              <Link
                href="/price-assistant"
                className={`flex items-center gap-1.5 transition-colors hover:text-[#C85A32] ${
                  isPublicActive('/price-assistant') ? 'text-[#2C5E43] font-semibold' : 'text-[#1F2421]'
                }`}
              >
                <Calculator className="w-4 h-4 text-[#2C5E43]" />
                AI Price Assistant
              </Link>
              <Link
                href="/dashboard/add-product"
                className={`flex items-center gap-1.5 transition-colors hover:text-[#C85A32] ${
                  isPublicActive('/dashboard/add-product') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-[#6B1D2F]" />
                Add Product
              </Link>
              <Link
                href="/market-insights"
                className={`flex items-center gap-1.5 transition-colors hover:text-[#C85A32] ${
                  isPublicActive('/market-insights') ? 'text-[#D99B26] font-semibold' : 'text-[#1F2421]'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-[#D99B26]" />
                Market Insights
              </Link>
            </>
          ) : (
            /* Buyer / General Visitor Navigation Links */
            <>
              <Link
                href="/"
                className={`transition-colors hover:text-[#C85A32] ${
                  isPublicActive('/') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                }`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`transition-colors hover:text-[#C85A32] ${
                  isPublicActive('/products') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                }`}
              >
                Products
              </Link>
              <Link
                href="/artisans"
                className={`transition-colors hover:text-[#C85A32] ${
                  isPublicActive('/artisans') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                }`}
              >
                Artisans
              </Link>
              <Link
                href="/wishlist"
                className={`flex items-center gap-1.5 transition-colors hover:text-[#C85A32] ${
                  isPublicActive('/wishlist') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isPublicActive('/wishlist') ? 'fill-[#6B1D2F] text-[#6B1D2F]' : 'text-[#6B1D2F]'}`} />
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-[#6B1D2F] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/regions"
                className={`transition-colors hover:text-[#C85A32] ${
                  isPublicActive('/regions') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                }`}
              >
                Explore Crafts
              </Link>
              <Link
                href="/market-insights"
                className={`transition-colors hover:text-[#C85A32] ${
                  isPublicActive('/market-insights') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                }`}
              >
                Price Insights
              </Link>
              <Link
                href="/recommendations"
                className="flex items-center gap-1 text-[#2C5E43] font-semibold bg-[#EBF4EF] px-2.5 py-1 rounded-full text-xs hover:bg-[#2C5E43] hover:text-white transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Picks
              </Link>
              <Link
                href="/about"
                className={`transition-colors hover:text-[#C85A32] ${
                  isPublicActive('/about') ? 'text-[#6B1D2F] font-semibold' : 'text-[#1F2421]'
                }`}
              >
                About
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

          {/* Wishlist Quick Action for Buyers */}
          {role !== 'artisan' && (
            <Link
              href="/wishlist"
              className="p-2 text-[#6B1D2F] hover:bg-[#F7F3EE] rounded-full transition-colors relative flex items-center justify-center"
              title="My Wishlist"
              aria-label={`View Wishlist (${wishlistCount} items)`}
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#6B1D2F]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#6B1D2F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>
          )}

          {/* Account Status / Sign Out Action */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#1F2421] bg-[#F7F3EE] px-3 py-1.5 rounded-lg border border-[#E6DFD5] hidden sm:flex items-center gap-1.5">
                {role === 'artisan' ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2C5E43]" />
                ) : (
                  <User className="w-3.5 h-3.5 text-[#6B1D2F]" />
                )}
                <span>{user.name}</span>
                <span className="text-[10px] font-bold text-[#59615C] uppercase">({user.role})</span>
              </span>

              <button
                onClick={handleSignOut}
                className="bg-[#F7F3EE] hover:bg-[#6B1D2F] text-[#6B1D2F] hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border border-[#E6DFD5] flex items-center gap-1"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFAF6] border-b border-[#E6DFD5] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          {isAuthenticated && user && (
            <div className="flex items-center justify-between bg-[#F7F3EE] p-3 rounded-xl border border-[#E6DFD5] mb-2 text-xs">
              <div className="flex items-center gap-2">
                {role === 'artisan' ? (
                  <ShieldCheck className="w-4 h-4 text-[#2C5E43]" />
                ) : (
                  <User className="w-4 h-4 text-[#6B1D2F]" />
                )}
                <div>
                  <span className="font-bold text-[#1F2421] block">{user.name}</span>
                  <span className="text-[10px] text-[#59615C] uppercase">{user.role} Account</span>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="text-xs text-[#6B1D2F] font-bold border border-[#6B1D2F]/30 px-3 py-1 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          )}

          <nav className="flex flex-col space-y-2 text-sm font-medium">
            {role === 'artisan' ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F7F3EE] flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#C85A32]" />
                  Dashboard
                </Link>
                <Link
                  href="/price-assistant"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F7F3EE] flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-[#2C5E43]" />
                  AI Price Assistant
                </Link>
                <Link
                  href="/dashboard/add-product"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F7F3EE] flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 text-[#6B1D2F]" />
                  Add Product
                </Link>
                <Link
                  href="/market-insights"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F7F3EE] flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4 text-[#D99B26]" />
                  Market Insights
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F7F3EE]"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F7F3EE]"
                >
                  Products
                </Link>
                <Link
                  href="/artisans"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F7F3EE]"
                >
                  Artisans
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F7F3EE] flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 text-[#6B1D2F]" />
                  <span>Wishlist ({wishlistCount})</span>
                </Link>
                <Link
                  href="/regions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F7F3EE]"
                >
                  Explore Crafts
                </Link>
                <Link
                  href="/market-insights"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F7F3EE]"
                >
                  Price Insights
                </Link>
                <Link
                  href="/recommendations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F7F3EE]"
                >
                  AI Picks
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#F7F3EE]"
                >
                  About
                </Link>
              </>
            )}

            {!isAuthenticated && (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 bg-[#6B1D2F] text-white px-4 py-2.5 rounded-xl font-bold text-xs text-center shadow-sm"
              >
                Sign In / Register
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
