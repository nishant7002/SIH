'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { Toast } from '../../components/common/Toast';
import { LoadingState } from '../../components/common/LoadingState';
import {
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2,
  ShoppingBag,
  UserPlus,
  LogIn
} from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect');

  const { signIn, signUp, isAuthenticated, role } = useAuth();

  // Mode: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'artisan'>('buyer');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // If already authenticated, redirect automatically
  useEffect(() => {
    if (isAuthenticated && role) {
      if (redirectTarget) {
        router.push(redirectTarget);
      } else if (role === 'artisan') {
        router.push('/dashboard');
      } else {
        router.push('/products');
      }
    }
  }, [isAuthenticated, role, redirectTarget, router]);

  // Handle Demo 1-Click Logins
  const handleDemoBuyer = async () => {
    setIsSubmitting(true);
    try {
      const user = await signIn('buyer@meridian.demo', 'buyer');
      setToastMessage(`Welcome back, ${user.name}! Redirecting to Marketplace...`);
      setTimeout(() => {
        router.push('/products');
      }, 1000);
    } catch (err) {
      console.error('Demo login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoArtisan = async () => {
    setIsSubmitting(true);
    try {
      const user = await signIn('pabiben.crafts@meridian.in', 'artisan');
      setToastMessage(`Welcome back, Master Karigar ${user.name}! Redirecting to Dashboard...`);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (err) {
      console.error('Demo login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (authMode === 'signin') {
        const user = await signIn(email, selectedRole);
        setToastMessage(`Signed in successfully as ${user.name} (${user.role})!`);
        setTimeout(() => {
          if (user.role === 'artisan') {
            router.push('/dashboard');
          } else {
            router.push('/products');
          }
        }, 1000);
      } else {
        const user = await signUp(name, email, selectedRole);
        setToastMessage(`Account created successfully as ${user.role.toUpperCase()}! Redirecting...`);
        setTimeout(() => {
          if (user.role === 'artisan') {
            router.push('/dashboard');
          } else {
            router.push('/products');
          }
        }, 1000);
      }
    } catch (err) {
      console.error('Auth action failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6B1D2F] to-[#C85A32] text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
          M
        </div>
        <h1 className="text-2xl font-extrabold text-[#1F2421] tracking-tight">
          Welcome to Meridian
        </h1>
        <p className="text-xs text-[#59615C]">
          Sign in to your account or register to discover and manage authentic Indian handicrafts.
        </p>
      </div>

      <div className="craft-card p-6 space-y-6">
        {/* Sign In vs Sign Up Tab Toggle */}
        <div className="grid grid-cols-2 p-1 bg-[#F7F3EE] rounded-xl border border-[#E6DFD5] text-xs font-bold">
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'signin'
                ? 'bg-[#6B1D2F] text-white shadow-sm'
                : 'text-[#59615C] hover:text-[#1F2421]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'signup'
                ? 'bg-[#6B1D2F] text-white shadow-sm'
                : 'text-[#59615C] hover:text-[#1F2421]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>

        {/* 1-Click Demo Evaluation Login Buttons */}
        <div className="p-3.5 bg-[#EBF4EF] rounded-xl border border-[#2C5E43]/20 space-y-2 text-xs">
          <span className="font-bold text-[#2C5E43] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D99B26]" />
            1-Click Hackathon Evaluation Sign In:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoBuyer}
              disabled={isSubmitting}
              className="bg-white border border-[#2C5E43]/40 text-[#2C5E43] hover:bg-[#2C5E43] hover:text-white py-2 px-2.5 rounded-lg font-semibold transition-all text-[11px] truncate flex items-center justify-center gap-1"
            >
              <User className="w-3 h-3" />
              <span>Demo Buyer</span>
            </button>
            <button
              type="button"
              onClick={handleDemoArtisan}
              disabled={isSubmitting}
              className="bg-white border border-[#2C5E43]/40 text-[#2C5E43] hover:bg-[#2C5E43] hover:text-white py-2 px-2.5 rounded-lg font-semibold transition-all text-[11px] truncate flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Demo Artisan (Pabiben)</span>
            </button>
          </div>
        </div>

        {/* Account Type Selection during Create Account */}
        {authMode === 'signup' && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1F2421]">What brings you to Meridian?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setSelectedRole('buyer')}
                className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                  selectedRole === 'buyer'
                    ? 'border-[#C85A32] bg-[#FDF6F0] ring-2 ring-[#C85A32]/30'
                    : 'border-[#E6DFD5] bg-[#FDFAF6]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-[#1F2421]">
                  <User className="w-4 h-4 text-[#C85A32]" />
                  <span>BUYER</span>
                </div>
                <p className="text-[11px] text-[#59615C] leading-snug">
                  Discover and purchase handcrafted products.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('artisan')}
                className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                  selectedRole === 'artisan'
                    ? 'border-[#6B1D2F] bg-[#FDF2F4] ring-2 ring-[#6B1D2F]/30'
                    : 'border-[#E6DFD5] bg-[#FDFAF6]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-[#1F2421]">
                  <ShieldCheck className="w-4 h-4 text-[#6B1D2F]" />
                  <span>ARTISAN</span>
                </div>
                <p className="text-[11px] text-[#59615C] leading-snug">
                  List, manage, and sell your handcrafted products.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {authMode === 'signup' && (
            <div className="space-y-1">
              <label className="font-semibold text-[#59615C]">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya Sharma or Pabiben Rabari"
                className="w-full bg-[#FDFAF6] border border-[#E6DFD5] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2421] focus:outline-none focus:border-[#C85A32]"
              />
            </div>
          )}

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
            disabled={isSubmitting}
            className="w-full bg-[#6B1D2F] hover:bg-[#4A121F] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>
              {isSubmitting
                ? 'Authenticating...'
                : authMode === 'signin'
                ? 'Sign In to Meridian'
                : `Create ${selectedRole.toUpperCase()} Account`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading Meridian Authentication..." />}>
      <LoginContent />
    </Suspense>
  );
}
