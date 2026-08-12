import React, { useState } from 'react';
import { MerchantProfile, User, Product, Order, PayoutRequest, SystemSettings } from '../types';
import { translations } from '../data/bangladeshData';
import { ShieldCheck, Users, Store, Package, DollarSign, CheckCircle2, XCircle, AlertOctagon, Settings, Database, Code, Sliders, Edit, Send, ArrowLeft } from 'lucide-react';

interface AdminDashboardProps {
  merchants: MerchantProfile[];
  users: User[];
  products: Product[];
  orders: Order[];
  payouts: PayoutRequest[];
  settings: SystemSettings;
  onUpdateMerchantStatus: (merchantId: string, status: 'active' | 'suspended' | 'rejected', commissionRate?: number) => void;
  onUpdateUserStatus: (userId: string, status: 'active' | 'suspended') => void;
  onProcessPayout: (payoutId: string, status: 'approved' | 'rejected', note?: string) => void;
  onUpdateSettings: (newSettings: Partial<SystemSettings>) => void;
  onBackToStore?: () => void;
  lang: 'en' | 'bn';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  merchants,
  users,
  products,
  orders,
  payouts,
  settings,
  onUpdateMerchantStatus,
  onUpdateUserStatus,
  onProcessPayout,
  onUpdateSettings,
  onBackToStore,
  lang = 'en'
}) => {
  const currentLang = lang || 'en';
  const t = translations[currentLang] || translations.en;
  const [activeTab, setActiveTab] = useState<'overview' | 'merchants' | 'users' | 'orders' | 'payouts'>('overview');

  const pendingMerchants = merchants.filter(m => m.status === 'pending');
  const activeMerchants = merchants.filter(m => m.status === 'active');
  const customerUsers = users.filter(u => u.role === 'customer');

  const totalPlatformGMV = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const estimatedPlatformCommission = orders.reduce((acc, o) => acc + (o.subtotal * (settings.defaultCommissionRate / 100)), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Top Banner Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#031c13] via-[#082a1d] to-[#01140e] text-white p-6 sm:p-8 shadow-2xl border border-emerald-500/30 shadow-emerald-950/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Ambient Emerald Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-black flex items-center justify-center font-black text-2xl shadow-xl shadow-emerald-950/80 border border-emerald-300/50 flex-shrink-0">
            <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-black text-white">
              AmarDokan Admin Portal
            </h1>
            <p className="text-xs text-emerald-200/80 mt-1 max-w-xl">
              Platform governance, merchant verification & sales analytics
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 bg-black/50 px-3.5 py-2 rounded-2xl border border-emerald-500/30">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-emerald-300">System Operational</span>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex border-b border-emerald-500/20 gap-2 sm:gap-6 overflow-x-auto pb-1 text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-3 border-b-2 transition cursor-pointer ${
            activeTab === 'overview' ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 rounded-t-xl' : 'border-transparent text-slate-400 hover:text-emerald-300'
          }`}
        >
          Executive Analytics
        </button>
        <button
          onClick={() => setActiveTab('merchants')}
          className={`pb-3 px-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'merchants' ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 rounded-t-xl' : 'border-transparent text-slate-400 hover:text-emerald-300'
          }`}
        >
          <span>Merchant Moderation</span>
          {pendingMerchants.length > 0 && (
            <span className="bg-emerald-400 text-black px-2 py-0.5 rounded-full text-[10px] font-extrabold animate-pulse">
              {pendingMerchants.length} PENDING
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-3 border-b-2 transition cursor-pointer ${
            activeTab === 'users' ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 rounded-t-xl' : 'border-transparent text-slate-400 hover:text-emerald-300'
          }`}
        >
          Customers ({customerUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-3 border-b-2 transition cursor-pointer ${
            activeTab === 'orders' ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 rounded-t-xl' : 'border-transparent text-slate-400 hover:text-emerald-300'
          }`}
        >
          Global Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('payouts')}
          className={`pb-3 px-3 border-b-2 transition cursor-pointer ${
            activeTab === 'payouts' ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 rounded-t-xl' : 'border-transparent text-slate-400 hover:text-emerald-300'
          }`}
        >
          Payouts Approval ({payouts.filter(p=>p.status==='pending').length})
        </button>
      </div>

      {/* TAB 1: EXECUTIVE ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-[#121212] rounded-2xl border border-white/10 shadow-sm space-y-2">
              <span className="text-slate-400 text-xs">Total Platform GMV</span>
              <p className="text-2xl font-mono font-black text-[#d4af37]">৳ {totalPlatformGMV.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-400 font-semibold">Across all 64 Districts</p>
            </div>

            <div className="p-5 bg-[#121212] rounded-2xl border border-white/10 shadow-sm space-y-2">
              <span className="text-slate-400 text-xs">Net Platform Revenue</span>
              <p className="text-2xl font-mono font-black text-emerald-400">৳ {estimatedPlatformCommission.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400">Verified Platform Earnings</p>
            </div>

            <div className="p-5 bg-[#121212] rounded-2xl border border-white/10 shadow-sm space-y-2">
              <span className="text-slate-400 text-xs">Active Verified Merchants</span>
              <p className="text-2xl font-black text-white">{activeMerchants.length}</p>
              <p className="text-[11px] text-amber-400 font-semibold">{pendingMerchants.length} pending review</p>
            </div>

            <div className="p-5 bg-[#121212] rounded-2xl border border-white/10 shadow-sm space-y-2">
              <span className="text-slate-400 text-xs">Total Registered Customers</span>
              <p className="text-2xl font-black text-white">{customerUsers.length}</p>
              <p className="text-[11px] text-slate-400">Active accounts</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MERCHANT MODERATION & APPROVAL WORKFLOW */}
      {activeTab === 'merchants' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <h3 className="font-extrabold text-sm text-white">Merchant Account Verification & Moderation Queue</h3>

          <div className="space-y-3">
            {merchants.map((m) => (
              <div key={m.id} className="p-5 bg-[#121212] rounded-2xl border border-white/10 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={m.logoUrl} alt="" className="w-12 h-12 rounded-xl object-cover bg-[#0a0a0a] border border-white/10" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-white">{m.storeName}</h4>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          m.status === 'active' ? 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-300' : 'bg-amber-950/80 border border-amber-500/30 text-amber-300'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{m.description}</p>
                    </div>
                  </div>

                  {/* Approve / Suspend Actions */}
                  <div className="flex items-center gap-2">
                    {m.status === 'pending' && (
                      <button
                        onClick={() => onUpdateMerchantStatus(m.id, 'active', 5)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Merchant</span>
                      </button>
                    )}

                    {m.status === 'active' && (
                      <button
                        onClick={() => onUpdateMerchantStatus(m.id, 'suspended')}
                        className="px-3 py-1.5 bg-rose-950/80 border border-rose-500/30 text-rose-300 hover:bg-rose-900 rounded-xl font-bold text-xs cursor-pointer"
                      >
                        Suspend
                      </button>
                    )}

                    {m.status === 'suspended' && (
                      <button
                        onClick={() => onUpdateMerchantStatus(m.id, 'active')}
                        className="px-3 py-1.5 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900 rounded-xl font-bold text-xs cursor-pointer"
                      >
                        Re-Activate
                      </button>
                    )}
                  </div>
                </div>

                {/* Verification Credentials */}
                <div className="p-3 bg-[#0a0a0a] rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300 border border-white/5">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Trade License No.</span>
                    <strong className="font-mono text-white">{m.tradeLicenseNo}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">NID Number</span>
                    <strong className="font-mono text-white">{m.nidNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">bKash Merchant Wallet</span>
                    <strong className="font-mono text-white">{m.bkashNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Commission Rate</span>
                    <strong className="text-emerald-400 font-mono font-extrabold">{m.commissionRate}%</strong>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMERS */}
      {activeTab === 'users' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <h3 className="font-extrabold text-sm text-white">Registered Customer Accounts</h3>
          <div className="space-y-2">
            {customerUsers.map((u) => (
              <div key={u.id} className="p-4 bg-[#121212] rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">{u.name}</h4>
                  <p className="text-slate-400">{u.email} • {u.phone}</p>
                </div>
                <button
                  onClick={() => onUpdateUserStatus(u.id, u.status === 'active' ? 'suspended' : 'active')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
                    u.status === 'active' ? 'bg-white/10 text-slate-300 hover:bg-white/20' : 'bg-emerald-950 border border-emerald-500/30 text-emerald-300'
                  }`}
                >
                  {u.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GLOBAL ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <h3 className="font-extrabold text-sm text-white">All System Orders & Transactions</h3>
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="p-4 bg-[#121212] rounded-2xl border border-white/10 text-xs space-y-2">
                <div className="flex justify-between font-bold text-white">
                  <span>{o.orderNumber} ({o.customerName})</span>
                  <span className="text-[#d4af37] font-mono">৳ {o.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Method: {o.paymentMethod.toUpperCase()} (Trx: {o.paymentTrxId || 'N/A'})</span>
                  <span className="font-bold uppercase text-emerald-400">{o.orderStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PAYOUTS APPROVAL */}
      {activeTab === 'payouts' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <h3 className="font-extrabold text-sm text-white">Merchant Withdrawal Requests</h3>
          <div className="space-y-3">
            {payouts.map((p) => (
              <div key={p.id} className="p-4 bg-[#121212] rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">{p.merchantStoreName}</h4>
                  <p className="text-slate-400">Amount: <span className="text-[#d4af37] font-mono font-bold">৳{p.amount.toLocaleString()}</span> via {p.paymentMethod.toUpperCase()} ({p.accountNumber})</p>
                </div>
                {p.status === 'pending' ? (
                  <button
                    onClick={() => onProcessPayout(p.id, 'approved', 'Disbursed via Admin bKash API')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow cursor-pointer"
                  >
                    Approve Payout
                  </button>
                ) : (
                  <span className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-bold px-3 py-1 rounded-full uppercase">
                    {p.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
