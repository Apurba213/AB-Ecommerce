import React from 'react';
import { UserRole } from '../types';
import { translations } from '../data/bangladeshData';
import { ShieldCheck, Store, ShoppingBag, Languages, Coins, Sparkles, ArrowLeft } from 'lucide-react';

interface RoleBannerProps {
  currentRole: UserRole;
  onRoleChange?: (role: UserRole) => void;
  onSelectRole?: (role: UserRole) => void;
  lang?: 'en' | 'bn';
  onLangToggle?: () => void;
  merchantStatus?: string;
}

export const RoleBanner: React.FC<RoleBannerProps> = ({
  currentRole,
  onRoleChange,
  onSelectRole,
  lang = 'en',
  onLangToggle,
  merchantStatus
}) => {
  const currentLang = lang || 'en';
  const t = translations[currentLang] || translations.en;
  const handleRoleSelect = onRoleChange || onSelectRole || (() => {});

  return (
    <div className="bg-[#0a0a0a] text-slate-200 text-xs py-2.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 shadow-lg relative z-30">
      {/* Left side: Back button or Tagline & Language */}
      <div className="flex items-center gap-3">
        {currentRole !== 'customer' ? (
          <button
            onClick={() => handleRoleSelect('customer')}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#d4af37] text-black hover:bg-amber-300 rounded-xl text-xs font-black shadow-lg shadow-yellow-950/40 transition cursor-pointer hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-black stroke-[3]" />
            <span>← Back to Customer Store</span>
          </button>
        ) : (
          <>
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              {t.freeDeliveryTag}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300 font-medium">
              <Coins className="w-3.5 h-3.5 text-[#d4af37]" />
              {t.bkashCashback}
            </span>
          </>
        )}
      </div>

      {/* Right side: Developer Tools, Language, and Quick Role Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto flex-wrap">
        {/* Language Toggle */}
        <button
          onClick={onLangToggle}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold border border-white/10 transition cursor-pointer"
          title="Switch Language"
        >
          <Languages className="w-3.5 h-3.5 text-[#E2136E]" />
          <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
        </button>

        {/* Role Selector Pill */}
        <div className="flex items-center bg-black/60 rounded-xl p-1 border border-white/10 ml-1">
          <span className="text-[11px] text-white/40 px-2 font-medium hidden sm:inline">
            {t.switchRole}
          </span>
          <button
            onClick={() => handleRoleSelect('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentRole === 'customer'
                ? 'bg-[#E2136E] text-white shadow-md shadow-pink-900/40'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.customerPanel}</span>
          </button>

          <button
            onClick={() => handleRoleSelect('merchant')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer relative ${
              currentRole === 'merchant'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>{t.merchantPanel}</span>
            {merchantStatus === 'pending' && (
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping absolute -top-0.5 -right-0.5" />
            )}
          </button>

          <button
            onClick={() => handleRoleSelect('admin')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentRole === 'admin'
                ? 'bg-[#d4af37] text-black shadow-md shadow-yellow-900/30'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.adminPanel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
