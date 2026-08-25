'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardStats, Product } from '../../types';
import { apiService } from '../../services/apiService';
import { StatCard } from '../../components/common/StatCard';
import { ProductCard } from '../../components/common/ProductCard';
import { Modal } from '../../components/common/Modal';
import { Toast } from '../../components/common/Toast';
import { LoadingState } from '../../components/common/LoadingState';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Sparkles,
  PlusCircle,
  Calculator,
  CheckCircle2,
  Clock,
  ArrowRight,
  BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

export default function ArtisanDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'inquiries' | 'opportunities'>('overview');

  // Inquiry Reply Modal State
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      try {
        const dashboardData = await apiService.getDashboardStats();
        setStats(dashboardData);

        // Fetch artisan products
        const productsData = await apiService.getProducts({ artisanId: 'art-1' });
        setMyProducts(productsData);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInquiry && stats) {
      selectedInquiry.status = 'Responded';
      setToastMessage(`Response sent to ${selectedInquiry.buyerName}!`);
      setSelectedInquiry(null);
      setReplyMessage('');
    }
  };

  if (loading || !stats) {
    return <LoadingState message="Loading Artisan Dashboard analytics..." />;
  }

  const COLORS = ['#6B1D2F', '#C85A32', '#2C5E43', '#D99B26'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Quick Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#6B1D2F] uppercase tracking-widest">
            <LayoutDashboard className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Karigar Management Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1F2421] tracking-tight mt-1">
            Artisan Dashboard
          </h1>
          <p className="text-xs text-[#59615C]">
            Welcome back, <strong>Pabiben Rabari</strong> (Master Kutch Karigar)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/price-assistant"
            className="bg-[#EBF4EF] text-[#2C5E43] border border-[#2C5E43]/30 px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#2C5E43] hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Calculator className="w-4 h-4" />
            <span>AI Price Assistant</span>
          </Link>

          <Link
            href="/dashboard/add-product"
            className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          subtitle="12 Active Listings"
          icon={Package}
          colorTheme="maroon"
        />
        <StatCard
          title="Total Inquiries"
          value={stats.totalInquiries}
          subtitle="8 Pending Buyer Messages"
          icon={MessageSquare}
          colorTheme="terracotta"
        />
        <StatCard
          title="Estimated Revenue"
          value={`₹${stats.estimatedRevenue.toLocaleString('en-IN')}`}
          subtitle="Last 6 Months"
          icon={DollarSign}
          trend="+22% vs last quarter"
          trendType="positive"
          colorTheme="green"
        />
        <StatCard
          title="Avg Product Price"
          value={`₹${stats.averageProductPrice.toLocaleString('en-IN')}`}
          subtitle="Fair Craft Valuation"
          icon={TrendingUp}
          colorTheme="ochre"
        />
        <StatCard
          title="AI Opportunities"
          value={stats.aiPricingOpportunitiesCount}
          subtitle="Prices Below Fair Range"
          icon={Sparkles}
          trend="Pricing Optimization"
          trendType="positive"
          colorTheme="terracotta"
        />
      </div>

      {/* AI Market Insight Highlights Box */}
      <div className="bg-[#FFFBF0] border border-[#D99B26]/40 rounded-2xl p-5 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D99B26]" />
          <h3 className="text-xs font-bold text-[#1F2421] uppercase tracking-wider">AI Market Insights Opportunity</h3>
          <span className="bg-[#D99B26]/20 text-[#1F2421] text-[10px] font-semibold px-2 py-0.5 rounded">Prototype Insight</span>
        </div>
        <p className="text-xs text-[#1F2421] leading-relaxed">
          "Embroidery products in the Kutch regional cluster are receiving <strong>18% higher-than-average inquiry interest</strong> this month. Consider adjusting prices on Rabari wall tapestries to match fair market demand ranges."
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-[#E6DFD5] flex gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-all border-b-2 ${
            activeTab === 'overview'
              ? 'border-[#6B1D2F] text-[#6B1D2F]'
              : 'border-transparent text-[#59615C] hover:text-[#1F2421]'
          }`}
        >
          Overview & Charts
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 transition-all border-b-2 ${
            activeTab === 'products'
              ? 'border-[#6B1D2F] text-[#6B1D2F]'
              : 'border-transparent text-[#59615C] hover:text-[#1F2421]'
          }`}
        >
          My Products ({myProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 transition-all border-b-2 ${
            activeTab === 'inquiries'
              ? 'border-[#6B1D2F] text-[#6B1D2F]'
              : 'border-transparent text-[#59615C] hover:text-[#1F2421]'
          }`}
        >
          Orders & Inquiries ({stats.recentInquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`pb-3 transition-all border-b-2 ${
            activeTab === 'opportunities'
              ? 'border-[#6B1D2F] text-[#6B1D2F]'
              : 'border-transparent text-[#59615C] hover:text-[#1F2421]'
          }`}
        >
          AI Opportunities ({stats.priceComparison.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW & CHARTS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
          {/* Chart 1: Sales & Inquiry Trend */}
          <div className="lg:col-span-7 craft-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#1F2421]">Sales Revenue & Inquiry Trend</h3>
                <p className="text-xs text-[#59615C]">Monthly performance analytics (6 Months)</p>
              </div>
              <TrendingUp className="w-5 h-5 text-[#2C5E43]" />
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.salesTrend} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6DFD5" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#59615C' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#59615C' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FDFAF6', borderRadius: '8px', border: '1px solid #E6DFD5', fontSize: '12px' }}
                    formatter={(value: any, name: any) => [
                      name === 'sales' ? `₹${Number(value).toLocaleString('en-IN')}` : value,
                      name === 'sales' ? 'Revenue' : 'Inquiries'
                    ]}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#6B1D2F" strokeWidth={3} name="Revenue" />
                  <Line type="monotone" dataKey="inquiries" stroke="#C85A32" strokeWidth={2} name="Inquiries" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Category Revenue Breakdown */}
          <div className="lg:col-span-5 craft-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#1F2421]">Revenue by Category</h3>
                <p className="text-xs text-[#59615C]">Product line performance</p>
              </div>
              <BarChart2 className="w-5 h-5 text-[#C85A32]" />
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.categoryPerformance} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6DFD5" />
                  <XAxis dataKey="category" tick={{ fontSize: 9, fill: '#59615C' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#59615C' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FDFAF6', borderRadius: '8px', border: '1px solid #E6DFD5', fontSize: '12px' }}
                    formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                    {stats.categoryPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center text-xs font-semibold text-[#59615C]">
            <span>Showing {myProducts.length} items listed under Pabiben Rabari catalog</span>
            <Link href="/dashboard/add-product" className="text-[#6B1D2F] font-bold hover:underline flex items-center gap-1">
              <PlusCircle className="w-3.5 h-3.5" />
              Add Product
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {myProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS & INQUIRIES TABLE */}
      {activeTab === 'inquiries' && (
        <div className="craft-card p-6 space-y-4 animate-in fade-in overflow-x-auto">
          <h3 className="text-base font-bold text-[#1F2421]">Recent Buyer Inquiries</h3>

          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6DFD5] text-[#59615C] font-semibold uppercase tracking-wider bg-[#F7F3EE]">
                <th className="p-3">Buyer</th>
                <th className="p-3">Product Requested</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DFD5]">
              {stats.recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-[#F7F3EE]/50">
                  <td className="p-3 font-bold text-[#1F2421]">{inq.buyerName}</td>
                  <td className="p-3 text-[#59615C] max-w-xs truncate">{inq.productName}</td>
                  <td className="p-3 text-[#59615C]">{inq.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        inq.status === 'Completed'
                          ? 'bg-[#EBF4EF] text-[#2C5E43]'
                          : inq.status === 'Responded'
                          ? 'bg-[#FFFBF0] text-[#D99B26]'
                          : 'bg-[#FDF2F4] text-[#6B1D2F]'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-3 py-1 rounded-lg font-semibold text-[11px]"
                    >
                      Respond
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: AI PRICING OPPORTUNITIES */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="text-xs text-[#59615C]">
            AI identified products where your current listing price is below the recommended fair market range:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.priceComparison.map((opp, idx) => (
              <div key={idx} className="craft-card p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#1F2421]">{opp.productName}</h4>
                  <span className="bg-[#EBF4EF] text-[#2C5E43] text-[10px] font-bold px-2 py-0.5 rounded">
                    +₹{(opp.recommendedPrice - opp.currentPrice).toLocaleString('en-IN')} Fair Upside
                  </span>
                </div>

                <div className="flex justify-between text-xs pt-2 border-t border-[#E6DFD5]">
                  <div>
                    <span className="text-[#59615C] block">Current Listed:</span>
                    <span className="font-bold text-[#6B1D2F]">₹{opp.currentPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[#59615C] block">AI Recommended:</span>
                    <span className="font-bold text-[#2C5E43]">₹{opp.recommendedPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Link
                  href="/price-assistant"
                  className="w-full bg-[#F7F3EE] hover:bg-[#6B1D2F] text-[#6B1D2F] hover:text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  Run AI Price Calculation
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {selectedInquiry && (
        <Modal
          isOpen={Boolean(selectedInquiry)}
          onClose={() => setSelectedInquiry(null)}
          title={`Respond to Inquiry from ${selectedInquiry.buyerName}`}
        >
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <div className="p-3 bg-[#F7F3EE] rounded-lg text-xs space-y-1">
              <strong className="text-[#1F2421] block">Buyer Inquiry Message:</strong>
              <p className="text-[#59615C] italic">"{selectedInquiry.message}"</p>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-[#59615C]">Your Response Message *</label>
              <textarea
                required
                rows={4}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Confirm price, customization timeframe, or delivery options..."
                className="w-full bg-white border border-[#E6DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 text-xs font-semibold text-[#59615C]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#6B1D2F] text-white px-5 py-2 rounded-lg text-xs font-bold"
              >
                Send Reply
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Toast */}
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
