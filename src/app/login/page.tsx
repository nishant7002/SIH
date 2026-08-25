'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Toast } from '../../components/common/Toast';
import {
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2,
  LayoutDashboard,
  ShoppingBag
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'artisan' | 'buyer'>('artisan');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'artisan') {
      setToastMessage('Logged in as Artisan (Pabiben Rabari)! Redirecting to Dashboard...');
      setTimeout(() => router.push('/dashboard'), 1000);
    } else {
      setToastMessage('Logged in as Buyer! Redirecting to Explore Products...');
      setTimeout(() => router.push('/products'), 1000);
    }
  };

  const handleDemoArtisan = () => {
    setEmail('pabiben.crafts@meridian.in');
    setPassword('demo123');
    setToastMessage('Demo Artisan credentials filled!');
  };

  const handleDemoBuyer = () => {
    setEmail('buyer@example.com');
    setPassword('demo123');
    setToastMessage('Demo Buyer credentials filled!');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6B1D2F] to-[#C85A32] text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
          M
        </div>
        <h1 className="text-2xl font-extrabold text-[#1F2421] tracking-tight">
          Welcome to Meridian
        </h1>
        <p className="text-xs text-[#59615C]">
          Sign in to your account or try quick demo login for hackathon evaluation.
        </p>
      </div>

      <div className="craft-card p-6 space-y-6">
        {/* Role Toggle */}
        <div className="grid grid-cols-2 p-1 bg-[#F7F3EE] rounded-xl border border-[#E6DFD5] text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('artisan')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'artisan'
                ? 'bg-[#6B1D2F] text-white shadow-sm'
                : 'text-[#59615C] hover:text-[#1F2421]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Artisan Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'buyer'
                ? 'bg-[#C85A32] text-white shadow-sm'
                : 'text-[#59615C] hover:text-[#1F2421]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Buyer Account</span>
          </button>
        </div>

        {/* Demo Quick Login Buttons */}
        <div className="p-3 bg-[#EBF4EF] rounded-xl border border-[#2C5E43]/20 space-y-2 text-xs">
          <span className="font-bold text-[#2C5E43] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D99B26]" />
            1-Click Demo Evaluation Login:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoArtisan}
              className="bg-white border border-[#2C5E43]/40 text-[#2C5E43] hover:bg-[#2C5E43] hover:text-white py-1.5 px-2 rounded-lg font-semibold transition-all text-[11px] truncate"
            >
              Demo Karigar (Pabiben)
            </button>
            <button
              type="button"
              onClick={handleDemoBuyer}
              className="bg-white border border-[#2C5E43]/40 text-[#2C5E43] hover:bg-[#2C5E43] hover:text-white py-1.5 px-2 rounded-lg font-semibold transition-all text-[11px] truncate"
            >
              Demo Buyer
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-[#59615C]">Email Address *</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 absolute left-3 text-[#59615C]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@meridian.in"
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1F2421] focus:outline-none focus:border-[#C85A32]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#59615C]">Password *</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-3 text-[#59615C]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1F2421] focus:outline-none focus:border-[#C85A32]"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2 ${
              role === 'artisan' ? 'bg-[#6B1D2F] hover:bg-[#4A121F]' : 'bg-[#C85A32] hover:bg-[#A3421F]'
            }`}
          >
            <span>Sign In as {role === 'artisan' ? 'Artisan' : 'Buyer'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Toast */}
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
