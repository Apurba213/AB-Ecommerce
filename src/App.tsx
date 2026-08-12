import React, { useState, useMemo } from 'react';
import { RoleBanner } from './components/RoleBanner';
import { Navbar } from './components/Navbar';
import { Product3DCard } from './components/Product3DCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { MerchantDashboard } from './components/MerchantDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ContactSection } from './components/ContactSection';
import { AuthModal } from './components/AuthModal';
import { db } from "./firebase";
import {
  initialProducts,
  initialMerchants,
  initialUsers,
  initialOrders,
  initialPayouts,
  initialSettings,
  initialCategories
} from './data/initialData';
import { translations } from './data/bangladeshData';
import { CartItem, Order, Product, MerchantProfile,ProductVariant, User, PayoutRequest, SystemSettings } from './types';
import { Sparkles, ShoppingBag, Store, ShieldCheck, Filter, Search, ChevronRight, ArrowLeft } from 'lucide-react';

export default function App() {
  // Navigation & Role State
  const [role, setRole] = useState<'customer' | 'merchant' | 'admin'>('customer');
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  // Application Data States
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [merchants, setMerchants] = useState<MerchantProfile[]>(initialMerchants);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [payouts, setPayouts] = useState<PayoutRequest[]>(initialPayouts);
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // Modal & Drawer States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const t = translations[lang];

  // Active Merchant Profile (for Merchant View demo)
  const currentMerchant = useMemo(() => {
    return merchants.find(m => m.id === 'mch_techbazar') || merchants[0];
  }, [merchants]);

  // Cart Handlers
const handleAddToCart = (
  product: Product,
  selectedVariant?: ProductVariant,
  qty = 1
) => {
  const variantName = selectedVariant?.name;

  setCartItems(prev => {
    const existingIndex = prev.findIndex(
      item =>
        item.product.id === product.id &&
        item.selectedVariant?.id === selectedVariant?.id
    );

    if (existingIndex > -1) {
      const updated = [...prev];
      updated[existingIndex].quantity += qty;
      return updated;
    }

    return [
      ...prev,
      {
        product,
        selectedVariant,
        quantity: qty,
        variantName,
      },
    ];
  });

  setIsCartOpen(true);
};
  const handleUpdateCartQty = (productId: string, delta: number, variantName?: string) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && item.variantName === variantName) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string, variantName?: string) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.variantName === variantName)));
  };

  // Order Creation Handler
  const handleOrderCreated = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsOrderTrackerOpen(true);
  };

  // Admin Handlers
  const handleUpdateMerchantStatus = (merchantId: string, status: 'active' | 'suspended' | 'rejected', commissionRate?: number) => {
    setMerchants(prev => prev.map(m => {
      if (m.id === merchantId) {
        return {
          ...m,
          status: status === 'rejected' ? 'suspended' : status,
          commissionRate: commissionRate !== undefined ? commissionRate : m.commissionRate
        };
      }
      return m;
    }));
  };

  const handleUpdateUserStatus = (userId: string, status: 'active' | 'suspended') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
  };

  const handleProcessPayout = (payoutId: string, status: 'approved' | 'rejected', note?: string) => {
    setPayouts(prev => prev.map(p => p.id === payoutId ? { ...p, status, adminNote: note } : p));
  };

  const handleUpdateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Merchant Handlers
 const handleAddProduct = (productData: Partial<Product>) => {
  const newProduct: Product = {
    ...productData,
    id: crypto.randomUUID(),
  } as Product;
  setProducts(prev => [newProduct, ...prev]);
};

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['orderStatus']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
  };

  const handleRequestPayout = (amount: number, method: 'bkash' | 'nagad', account: string) => {
    const newPayout: PayoutRequest = {
      id: `payout_${Date.now()}`,
      merchantId: currentMerchant.id,
      merchantStoreName: currentMerchant.storeName,
      amount,
      paymentMethod: method,
      accountNumber: account,
      status: 'pending',
      requestedDate: new Date().toISOString().split('T')[0]
    };
    setPayouts(prev => [newPayout, ...prev]);
  };

  // Filtered Products for Customer Storefront
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (!p.isApproved) return false;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e7eb] font-sans selection:bg-[#d4af37] selection:text-black flex flex-col">
      
      {/* Role Switching Banner */}
      <RoleBanner
        currentRole={role}
        onRoleChange={setRole}
        lang={lang}
        onLangToggle={() => setLang(prev => (prev === 'en' ? 'bn' : 'en'))}
      />

      {/* Global Navigation Bar */}
      <Navbar
        currentRole={role}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        lang={lang}
        onToggleLang={() => setLang(prev => (prev === 'en' ? 'bn' : 'en'))}
      />

      {/* MAIN VIEW CONTROLLER */}
      <main className="flex-1">

        {/* ROLE 1: CUSTOMER MULTI-VENDOR STOREFRONT */}
        {role === 'customer' && (
          <div className="space-y-8 pb-16">
            
            {/* 3D Hero Banner Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#0f0f0f] via-[#050505] to-[#050505] border-b border-white/5 py-12 px-4 sm:px-6 lg:px-8">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#E2136E]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                <div className="space-y-4 text-center lg:text-left max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] rounded-full text-xs font-black uppercase tracking-wider shadow-lg shadow-yellow-950/30">
                    <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
                    <span>AB Ecommerce Platform - 1,500+ Top Products</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white leading-tight">
                    Bangladesh’s Premier <span className="bg-gradient-to-r from-[#d4af37] via-amber-200 to-[#E2136E] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]">3D Mega Marketplace</span>
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Explore thousands of genuine Bangladeshi products across Electronics, Fashion, Appliances, Groceries & Gadgets with instant bKash 10% Cashback and Nagad payment.
                  </p>
                  
                  {/* Trust & Stats Badges */}
                  <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-300 font-bold">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-950/40 to-black px-3.5 py-2 rounded-xl border border-amber-500/30 shadow-md">
                      <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                      <span>1,500+ Active Listings</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-pink-950/40 to-black px-3.5 py-2 rounded-xl border border-pink-500/30 shadow-md">
                      <Store className="w-4 h-4 text-[#E2136E]" />
                      <span>Verified Sellers in 64 Districts</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-950/40 to-black px-3.5 py-2 rounded-xl border border-emerald-500/30 shadow-md">
                      <ShoppingBag className="w-4 h-4 text-emerald-400" />
                      <span>Fast 24-48h Express Delivery</span>
                    </div>
                  </div>
                </div>

                {/* Interactive 3D Showcase Cards */}
                <div className="w-full lg:w-auto grid grid-cols-2 gap-3 max-w-md mx-auto">
                  <div className="p-4 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl hover:border-[#d4af37]/50 hover:scale-105 transition-all duration-300 transform-gpu flex flex-col justify-between space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-wider">Flash Sale 3D</span>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-[#E2136E] text-white rounded">50% OFF</span>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500"
                      alt="TWS Earbuds"
                      className="w-full h-24 object-cover rounded-xl border border-white/10"
                    />
                    <div>
                      <h4 className="font-extrabold text-xs text-white truncate">TWS Earbuds LED Case</h4>
                      <p className="text-xs text-[#d4af37] font-mono font-bold mt-0.5">৳ 1,450 <span className="text-slate-500 line-through text-[10px]">৳ 2,900</span></p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl hover:border-[#E2136E]/50 hover:scale-105 transition-all duration-300 transform-gpu flex flex-col justify-between space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-pink-400 uppercase tracking-wider">Eid Special</span>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-amber-500 text-black rounded">Top Seller</span>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500"
                      alt="Dhakai Saree"
                      className="w-full h-24 object-cover rounded-xl border border-white/10"
                    />
                    <div>
                      <h4 className="font-extrabold text-xs text-white truncate">Handloom Jamdani Saree</h4>
                      <p className="text-xs text-[#d4af37] font-mono font-bold mt-0.5">৳ 12,500 <span className="text-slate-500 line-through text-[10px]">৳ 15,000</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-black text-lg text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#d4af37]" />
                  <span>Browse Categories</span>
                </h3>
                <span className="text-xs font-semibold text-slate-400">
                  {filteredProducts.length} Items Available
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => { setSelectedCategory('All'); setVisibleCount(24); }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'All'
                      ? 'bg-[#d4af37] text-black shadow-lg shadow-yellow-950/50 scale-105'
                      : 'bg-[#121212] border border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {initialCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.name); setVisibleCount(24); }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat.name
                        ? 'bg-[#d4af37] text-black shadow-lg shadow-yellow-950/50 scale-105'
                        : 'bg-[#121212] border border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {lang === 'bn' ? cat.nameBn : cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Product 3D Grid Catalog */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-xl font-serif font-black text-white flex items-center gap-2">
                    <span>AB Ecommerce Marketplace Catalog</span>
                    <span className="text-xs bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] px-2 py-0.5 rounded-full font-mono font-bold">
                      AB Verified
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Showing <span className="text-white font-bold">{Math.min(visibleCount, filteredProducts.length)}</span> of <span className="text-[#d4af37] font-bold">{filteredProducts.length}</span> items
                  </p>
                </div>

                {(selectedCategory !== 'All' || searchQuery !== '') && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                      setVisibleCount(24);
                    }}
                    className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/15 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>← Back to All Catalog</span>
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center bg-[#121212] rounded-3xl border border-white/10 space-y-3">
                  <Search className="w-10 h-10 mx-auto text-slate-500" />
                  <h3 className="font-bold text-white">No products match your search criteria</h3>
                  <p className="text-xs text-slate-400">Try clearing your filters or search for another term like Walton, Saree, or Earbuds.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setVisibleCount(24); }}
                    className="px-4 py-2 bg-[#d4af37] text-black font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.slice(0, visibleCount).map(product => (
                      <Product3DCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                        onAddToCart={(p) => handleAddToCart(p)}
                      />
                    ))}
                  </div>

                  {/* Load More Products Button */}
                  {visibleCount < filteredProducts.length && (
                    <div className="pt-8 text-center">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 24)}
                        className="px-8 py-3.5 bg-gradient-to-r from-[#d4af37] via-amber-400 to-[#d4af37] hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-sm rounded-2xl shadow-xl shadow-yellow-950/50 hover:shadow-yellow-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer inline-flex items-center gap-2 border border-amber-200/50"
                      >
                        <Sparkles className="w-4 h-4 text-black" />
                        <span>Load More Products ({filteredProducts.length - visibleCount} Remaining)</span>
                        <ChevronRight className="w-4 h-4 text-black" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        )}

        {/* ROLE 2: MERCHANT DASHBOARD */}
        {role === 'merchant' && (
          <MerchantDashboard
            merchant={currentMerchant}
            products={products.filter(p => p.merchantId === currentMerchant.id)}
            orders={orders.filter(o => o.items.some(i => i.merchantId === currentMerchant.id))}
            payouts={payouts.filter(p => p.merchantId === currentMerchant.id)}
            onAddProduct={handleAddProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onRequestPayout={handleRequestPayout}
            onBackToStore={() => setRole('customer')}
            lang={lang}
          />
        )}

        {/* ROLE 3: ADMIN DASHBOARD */}
        {role === 'admin' && (
          <AdminDashboard
            merchants={merchants}
            users={users}
            products={products}
            orders={orders}
            payouts={payouts}
            settings={settings}
            onUpdateMerchantStatus={handleUpdateMerchantStatus}
            onUpdateUserStatus={handleUpdateUserStatus}
            onProcessPayout={handleProcessPayout}
            onUpdateSettings={handleUpdateSettings}
            onBackToStore={() => setRole('customer')}
            lang={lang}
          />
        )}

      </main>

      {/* Global Modals & Drawers */}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          lang={lang}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        lang={lang}
      />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          settings={settings}
          onOrderComplete={handleOrderCreated}
          lang={lang}
        />
      )}

      {/* Order Tracker Modal */}
      {isOrderTrackerOpen && (
      <OrderTrackerModal
      isOpen={isOrderTrackerOpen}
      onClose={() => setIsOrderTrackerOpen(false)
  }
  orders={orders}
/>
 )}

      {/* Auth Modal with Smart Logo Login */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(newRole) => {
          setRole(newRole);
        }}
        lang={lang}
      />

      {/* Contact Section: Drop a message to store owner */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#d4af37] text-black font-serif font-extrabold flex items-center justify-center text-xs">
              AB
            </div>
            <span className="font-serif font-black text-white text-sm">AB Ecommerce Platform</span>
            <span>• Multi-Vendor E-Commerce</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Supported Gateways: bKash, Nagad, Cash on Delivery</span>
            <span>•</span>
            <span>Owner Email: apurbabarua635@gmail.com</span>
            <span>•</span>
            <span>Support: {settings.supportPhone}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
