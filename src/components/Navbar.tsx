import React, { useState } from 'react';
import { Category, CartItem, UserRole, User } from '../types';
import { translations } from '../data/bangladeshData';
import { Search, ShoppingBag, Heart, Store, ChevronDown, User as UserIcon, MapPin, Truck, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  categories?: Category[];
  selectedCategory?: string;
  onSelectCategory?: (catSlug: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  cartItems?: CartItem[];
  cartCount?: number;
  wishlistIds?: string[];
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenOrderTracker?: () => void;
  onOpenOrders?: () => void;
  currentRole?: UserRole;
  currentUser?: User;
  lang?: 'en' | 'bn';
  onToggleLang?: () => void;
  onOpenAuthModal?: () => void;
  onNavigateMerchantStores?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories = [],
  selectedCategory = 'all',
  onSelectCategory = (_catSlug: string) => {},
  searchQuery = '',
  onSearchChange = (_q: string) => {},
  cartItems = [],
  cartCount,
  wishlistIds = [],
  onOpenCart = () => {},
  onOpenWishlist = () => {},
  onOpenOrderTracker,
  onOpenOrders,
  currentRole = 'customer',
  currentUser,
  lang = 'en',
  onOpenAuthModal = () => {},
  onNavigateMerchantStores
}) => {
  const currentLang = lang || 'en';
  const t = translations[currentLang] || translations.en;
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartCount = cartCount !== undefined ? cartCount : (cartItems || []).reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = (cartItems || []).reduce((acc, item) => {
    const p = item.selectedVariant ? item.selectedVariant.price : item.product.price;
    return acc + p * item.quantity;
  }, 0);

  const handleOrderTracker = onOpenOrderTracker || onOpenOrders || (() => {});
  const user = currentUser || { id: 'usr_guest', name: 'Guest User', email: 'guest@amardokan.com', phone: '01700000000', role: 'customer', status: 'active' };

  return (
    <header className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 shadow-2xl transition-all text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onSelectCategory('all'); }}
              className="flex items-center gap-2.5 group relative perspective-1000 py-1"
            >
              {/* 3D Store Icon Badge */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#d4af37] via-amber-300 to-[#997711] flex items-center justify-center text-black font-extrabold shadow-lg shadow-yellow-500/20 group-hover:rotate-y-12 group-hover:scale-110 group-hover:shadow-yellow-500/50 transition-all duration-300 transform-gpu relative z-10 border border-amber-300/40">
                <Store className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:rotate-12 transition-transform duration-300" />
                <Sparkles className="w-3 h-3 text-amber-900 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" />
              </div>

              {/* 3D Title Hover Effect */}
              <div className="group-hover:translate-x-1 transition-transform duration-300">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-black text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 group-hover:from-amber-300 group-hover:via-white group-hover:to-[#E2136E] transition-all duration-300 group-hover:drop-shadow-[0_4px_12px_rgba(212,175,55,0.6)] inline-block transform group-hover:-translate-y-0.5">
                    {t.brandName}
                  </span>
                  <span className="text-[10px] bg-[#E2136E]/20 border border-[#E2136E]/60 text-[#E2136E] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-md shadow-pink-900/40 group-hover:scale-110 group-hover:bg-[#E2136E] group-hover:text-white transition-all duration-300">
                    AB Commerce
                  </span>
                </div>
                <p className="text-[11px] text-amber-200/60 hidden xl:block font-medium italic group-hover:text-amber-300 transition-colors">
                  {t.subTitle}
                </p>
              </div>
            </a>
          </div>

          {/* Search Bar & Category Dropdown */}
          <div className="hidden md:flex flex-1 max-w-2xl items-center relative">
            {/* Category Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-2 px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-white/80 rounded-l-xl text-xs font-semibold border-y border-l border-white/10 transition cursor-pointer whitespace-nowrap"
              >
                <span>{selectedCategory === 'all' ? t.allCategories : categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/40" />
              </button>

              {/* Dropdown Menu */}
              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-[#121212] rounded-xl shadow-2xl border border-white/10 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => { onSelectCategory('all'); setIsCategoryMenuOpen(false); }}
                    className={`w-full text-left px-4 py-2 hover:bg-white/5 font-medium ${selectedCategory === 'all' ? 'text-[#d4af37] font-bold bg-white/5' : 'text-slate-300'}`}
                  >
                    {t.allCategories}
                  </button>
                  <div className="h-px bg-white/10 my-1" />
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { onSelectCategory(cat.slug); setIsCategoryMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2 hover:bg-white/5 flex items-center justify-between ${selectedCategory === cat.slug ? 'text-[#d4af37] font-bold bg-white/5' : 'text-slate-300'}`}
                    >
                      <span>{lang === 'bn' ? cat.nameBn : cat.name}</span>
                      <span className="text-[10px] bg-white/10 text-white/60 px-1.5 py-0.5 rounded-full">
                        {cat.productCount}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 hover:bg-white/10 focus:bg-black/60 border-y border-r border-white/10 focus:border-[#d4af37] rounded-r-xl text-xs text-white placeholder:text-white/30 focus:outline-none transition"
              />
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Merchant Stores Link */}
            {onNavigateMerchantStores && (
              <button
                onClick={onNavigateMerchantStores}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-[#d4af37] hover:bg-white/5 rounded-lg transition"
              >
                <Store className="w-4 h-4 text-[#d4af37]" />
                <span>{t.merchants}</span>
              </button>
            )}

            {/* Order Tracking Button */}
            <button
              onClick={handleOrderTracker}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition cursor-pointer"
              title="Track Order Status"
            >
              <Truck className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline">{t.trackOrder}</span>
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="p-2.5 text-slate-300 hover:text-[#E2136E] hover:bg-white/5 rounded-xl relative transition cursor-pointer border border-white/5"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E2136E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 bg-[#E2136E] hover:bg-[#c80f5f] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-pink-950/40 transition cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d4af37] text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-mono">
                ৳ {totalCartValue.toLocaleString()}
              </span>
            </button>

            {/* User Account / Login */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold border border-white/10 transition cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center overflow-hidden font-bold text-[10px]">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-3.5 h-3.5" />
                )}
              </div>
              <span className="hidden md:inline max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4af37]"
            />
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-3 space-y-2 animate-in fade-in duration-150">
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => { onSelectCategory('all'); setIsMobileMenuOpen(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${selectedCategory === 'all' ? 'bg-[#d4af37] text-black font-bold' : 'bg-white/5 text-slate-300'}`}
              >
                {t.allCategories}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { onSelectCategory(cat.slug); setIsMobileMenuOpen(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${selectedCategory === cat.slug ? 'bg-[#d4af37] text-black font-bold' : 'bg-white/5 text-slate-300'}`}
                >
                  {lang === 'bn' ? cat.nameBn : cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
