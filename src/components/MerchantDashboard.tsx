import React, { useState, useRef } from 'react';
import { MerchantProfile, Product, Order, PayoutRequest, ProductVariant } from '../types';
import { translations } from '../data/bangladeshData';
import { Store, Plus, Package, DollarSign, Clock, AlertTriangle, ShieldCheck, CheckCircle2, ArrowUpRight, Image, Edit, Trash2, Send, ArrowLeft, Camera, Upload, Film, Video, X } from 'lucide-react';

interface MerchantDashboardProps {
  merchant: MerchantProfile;
  products: Product[];
  orders: Order[];
  payouts: PayoutRequest[];
  onAddProduct: (productData: Partial<Product>) => void;
  onUpdateOrderStatus: (orderId: string, orderStatus: any) => void;
  onRequestPayout: (amount: number, method: 'bkash' | 'nagad', accountNum: string) => void;
  onBackToStore?: () => void;
  lang: 'en' | 'bn';
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({
  merchant,
  products,
  orders,
  payouts,
  onAddProduct,
  onUpdateOrderStatus,
  onRequestPayout,
  onBackToStore,
  lang = 'en'
}) => {
  const currentLang = lang || 'en';
  const t = translations[currentLang] || translations.en;
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'payouts' | 'profile'>('overview');

  // Add Product Modal State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics & Gadgets');
  const [brand, setBrand] = useState('Walton BD');
  const [price, setPrice] = useState('2500');
  const [originalPrice, setOriginalPrice] = useState('3000');
  const [stock, setStock] = useState('15');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [tags, setTags] = useState('bangladesh, quality, warranty');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Payout Modal State
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('10000');
  const [payoutMethod, setPayoutMethod] = useState<'bkash' | 'nagad'>('bkash');
  const [payoutAccount, setPayoutAccount] = useState(merchant.bkashNumber || '01811112222');

  const merchantProducts = products.filter(p => p.merchantId === merchant.id);
  const merchantOrders = orders.filter(o => o.items.some(i => i.merchantId === merchant.id));
  const pendingOrdersCount = merchantOrders.filter(o => o.orderStatus === 'placed' || o.orderStatus === 'confirmed').length;
  const lowStockProducts = merchantProducts.filter(p => p.stock < 5);

  const totalSalesRevenue = merchantOrders.reduce((acc, o) => {
    const merchantItems = o.items.filter(i => i.merchantId === merchant.id);
    return acc + merchantItems.reduce((a, b) => a + b.totalPrice, 0);
  }, 0);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video');
    setMediaType(isVideo ? 'video' : 'image');

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setImageUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    onAddProduct({
      merchantId: merchant.id,
      merchantName: merchant.storeName,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      category,
      brand,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      stock: Number(stock),
      description,
      images: [imageUrl || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800'],
      tags: tags.split(',').map(t => t.trim()),
      isApproved: true
    });

    setIsAddProductOpen(false);
    setTitle('');
    setDescription('');
  };

  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payoutAmount || Number(payoutAmount) <= 0) return;

    onRequestPayout(Number(payoutAmount), payoutMethod, payoutAccount);
    setIsPayoutModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Hidden File Inputs for Photo/Video Upload & Camera Capture */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,video/*"
        className="hidden"
        onChange={handleMediaUpload}
      />
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*,video/*"
        capture="environment"
        className="hidden"
        onChange={handleMediaUpload}
      />

      {/* Store Banner Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#180512] via-[#200818] to-[#0d020a] text-white p-6 sm:p-8 shadow-2xl border border-pink-500/30 shadow-pink-950/30">
        <div className="absolute inset-0 opacity-20">
          <img src={merchant.bannerUrl} alt="" className="w-full h-full object-cover" />
        </div>
        
        {/* Ambient Pink Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E2136E]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={merchant.logoUrl}
              alt={merchant.storeName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-pink-500/50 shadow-xl shadow-pink-950/50 bg-[#121212]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-black text-white">{merchant.storeName}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  merchant.status === 'active' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                }`}>
                  {merchant.status.toUpperCase()} SELLER
                </span>
              </div>
              <p className="text-xs text-pink-200/80 mt-1 max-w-xl">{merchant.description}</p>
              <div className="flex items-center gap-3 text-[11px] text-pink-300/70 mt-2 font-mono">
                <span>📍 {merchant.upazila}, {merchant.district}, {merchant.division}</span>
                <span>• Trade License: {merchant.tradeLicenseNo}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAddProductOpen(true)}
            className="px-5 py-3 bg-gradient-to-r from-[#E2136E] via-pink-600 to-[#E2136E] hover:from-pink-500 hover:to-pink-600 text-white rounded-2xl font-black text-xs shadow-xl shadow-pink-950/80 flex items-center gap-2 transition cursor-pointer border border-pink-400/40 hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Product</span>
          </button>
        </div>
      </div>

      {/* Account Pending Approval Notice */}
      {merchant.status === 'pending' && (
        <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-4 text-xs text-amber-200">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 animate-pulse" />
            <div>
              <h4 className="font-extrabold">{t.merchantApprovalStatus}: PENDING VERIFICATION</h4>
              <p className="text-slate-400 mt-0.5">{t.pendingApprovalMsg}</p>
            </div>
          </div>
          <span className="bg-amber-900/60 border border-amber-500/30 px-3 py-1 rounded-xl font-bold">In Admin Review</span>
        </div>
      )}

      {/* Dashboard Nav Tabs */}
      <div className="flex border-b border-pink-500/20 gap-2 sm:gap-6 overflow-x-auto pb-1 text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-3 border-b-2 transition cursor-pointer ${
            activeTab === 'overview' ? 'border-[#E2136E] text-[#E2136E] bg-pink-500/10 rounded-t-xl' : 'border-transparent text-slate-400 hover:text-pink-300'
          }`}
        >
          Seller Overview & Sales
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'products' ? 'border-[#E2136E] text-[#E2136E] bg-pink-500/10 rounded-t-xl' : 'border-transparent text-slate-400 hover:text-pink-300'
          }`}
        >
          <span>Inventory Catalog</span>
          <span className="bg-pink-500/20 text-pink-300 border border-pink-500/30 px-1.5 py-0.5 rounded-full text-[10px]">
            {merchantProducts.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'orders' ? 'border-[#E2136E] text-[#E2136E] bg-pink-500/10 rounded-t-xl' : 'border-transparent text-slate-400 hover:text-pink-300'
          }`}
        >
          <span>Customer Orders</span>
          {pendingOrdersCount > 0 && (
            <span className="bg-[#E2136E] text-white px-1.5 py-0.5 rounded-full text-[10px] font-extrabold animate-pulse">
              {pendingOrdersCount} NEW
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('payouts')}
          className={`pb-3 px-3 border-b-2 transition cursor-pointer ${
            activeTab === 'payouts' ? 'border-[#E2136E] text-[#E2136E] bg-pink-500/10 rounded-t-xl' : 'border-transparent text-slate-400 hover:text-pink-300'
          }`}
        >
          Payouts & Earnings
        </button>
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-[#121212] rounded-2xl border border-white/10 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Store GMV</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-mono font-black text-[#d4af37]">৳ {totalSalesRevenue.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-400 font-semibold">Comm. Rate: {merchant.commissionRate}%</p>
            </div>

            <div className="p-5 bg-[#121212] rounded-2xl border border-white/10 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Orders Assigned</span>
                <Package className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-2xl font-black text-white">{merchantOrders.length}</p>
              <p className="text-[11px] text-slate-400">{pendingOrdersCount} pending action</p>
            </div>

            <div className="p-5 bg-[#121212] rounded-2xl border border-white/10 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Products</span>
                <Store className="w-4 h-4 text-[#E2136E]" />
              </div>
              <p className="text-2xl font-black text-white">{merchantProducts.length}</p>
              <p className="text-[11px] text-amber-400 font-semibold">{lowStockProducts.length} low stock</p>
            </div>

            <div className="p-5 bg-[#121212] rounded-2xl border border-white/10 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Store Rating</span>
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              </div>
              <p className="text-2xl font-black text-white">{merchant.rating} ★</p>
              <p className="text-[11px] text-slate-400">Verified Seller Status</p>
            </div>
          </div>

          {/* Low Stock Alerts Box */}
          {lowStockProducts.length > 0 && (
            <div className="p-5 bg-rose-950/30 border border-rose-500/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Inventory Low-Stock Alerts ({lowStockProducts.length} items)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {lowStockProducts.map((prd) => (
                  <div key={prd.id} className="p-3 bg-[#121212] rounded-xl border border-rose-500/30 text-xs flex justify-between items-center">
                    <span className="truncate font-semibold text-white">{prd.title}</span>
                    <span className="text-rose-400 font-extrabold px-2 py-0.5 bg-rose-950/60 rounded border border-rose-500/30">
                      Only {prd.stock} left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGER */}
      {activeTab === 'products' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-sm text-white">Your Product Listings ({merchantProducts.length})</h3>
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-4 py-2 bg-[#E2136E] hover:bg-[#c80f5f] text-white rounded-xl font-bold text-xs shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {merchantProducts.map((prd) => (
              <div key={prd.id} className="p-4 bg-[#121212] rounded-2xl border border-white/10 shadow-sm flex gap-3">
                <img src={prd.images[0]} alt="" className="w-20 h-20 object-cover rounded-xl bg-[#0a0a0a] border border-white/10 flex-shrink-0" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-white line-clamp-1">{prd.title}</h4>
                    <p className="text-[11px] text-slate-400">{prd.category}</p>
                    <p className="font-mono font-black text-sm text-[#d4af37] mt-1">৳ {prd.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/5">
                    <span className={`font-bold ${prd.stock < 5 ? 'text-rose-400' : 'text-slate-300'}`}>
                      Stock: {prd.stock}
                    </span>
                    <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                      Approved
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS TO FULFILL */}
      {activeTab === 'orders' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <h3 className="font-extrabold text-sm text-white">Orders Assigned to {merchant.storeName}</h3>

          <div className="space-y-3">
            {merchantOrders.map((ord) => (
              <div key={ord.id} className="p-4 bg-[#121212] rounded-2xl border border-white/10 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3 text-xs">
                  <div>
                    <span className="font-mono font-bold text-white">{ord.orderNumber}</span>
                    <span className="text-slate-400 ml-2">• Customer: {ord.customerName} ({ord.customerPhone})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-white/10 text-white px-2.5 py-0.5 rounded-full font-bold">
                      {ord.orderStatus.toUpperCase()}
                    </span>
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-white"
                    >
                      <option value="placed" className="bg-[#121212]">Placed</option>
                      <option value="confirmed" className="bg-[#121212]">Confirmed</option>
                      <option value="processing" className="bg-[#121212]">Processing</option>
                      <option value="shipped" className="bg-[#121212]">Shipped</option>
                      <option value="delivered" className="bg-[#121212]">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  {ord.items.filter(i => i.merchantId === merchant.id).map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs text-slate-300">
                      <span>{item.productTitle} x {item.quantity}</span>
                      <span className="font-mono font-bold text-[#d4af37]">৳ {item.totalPrice.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PAYOUTS */}
      {activeTab === 'payouts' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-sm text-white">Withdrawal & Payout Requests</h3>
            <button
              onClick={() => setIsPayoutModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.requestPayout}</span>
            </button>
          </div>

          <div className="space-y-2">
            {payouts.map((p) => (
              <div key={p.id} className="p-4 bg-[#121212] rounded-2xl border border-white/10 shadow-sm flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-bold text-[#d4af37]">৳ {p.amount.toLocaleString()}</span>
                  <span className="text-slate-400 ml-2">via {p.paymentMethod.toUpperCase()} ({p.accountNumber})</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Requested on: {p.requestedDate}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-bold uppercase ${
                  p.status === 'approved' ? 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-300' : 'bg-amber-950/80 border border-amber-500/30 text-amber-300'
                }`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0d0d0d] text-white border border-white/10 w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-extrabold text-base text-white">Add New Product to Store</h3>
            
            <form onSubmit={handleCreateProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Shoes & Footwear">Shoes & Footwear</option>
                    <option value="Organic & Groceries">Organic & Groceries</option>
                    <option value="Home & Kitchen Appliances">Home & Kitchen</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Brand</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Price (৳) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Original Price</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Photo & Video Upload / Camera Capture Section */}
              <div className="space-y-2">
                <label className="font-semibold text-slate-300 block mb-1">Product Photo / Video *</label>
                
                {imageUrl ? (
                  <div className="relative rounded-2xl overflow-hidden bg-[#181818] border border-white/10 p-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {mediaType === 'video' ? (
                        <div className="w-16 h-16 rounded-xl bg-pink-950 flex items-center justify-center border border-pink-500/30">
                          <Film className="w-8 h-8 text-[#E2136E]" />
                        </div>
                      ) : (
                        <img src={imageUrl} alt="Uploaded product" className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                      )}
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {mediaType === 'video' ? 'Product Video Attached' : 'Product Photo Uploaded'}
                        </span>
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Ready to publish
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="px-2.5 py-1 bg-rose-950/80 border border-rose-500/30 hover:bg-rose-900 text-rose-200 rounded-xl text-[11px] font-bold flex items-center gap-1 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Change</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="p-3.5 bg-gradient-to-r from-pink-950/60 to-purple-950/60 hover:from-pink-900/80 hover:to-purple-900/80 border border-pink-500/40 text-pink-200 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition cursor-pointer hover:scale-102 active:scale-98 shadow-md"
                    >
                      <Camera className="w-5 h-5 text-[#E2136E]" />
                      <span className="font-extrabold text-xs">Click Photo / Video</span>
                      <span className="text-[10px] text-pink-300/70">Open Camera</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition cursor-pointer hover:scale-102 active:scale-98 shadow-md"
                    >
                      <Upload className="w-5 h-5 text-[#d4af37]" />
                      <span className="font-extrabold text-xs">Upload from Device</span>
                      <span className="text-[10px] text-slate-400">Choose File</span>
                    </button>
                  </div>
                )}

                {/* Sample Presets Fallback */}
                <div className="pt-1">
                  <span className="text-[10px] text-slate-400 block mb-1">Or choose a sample product image:</span>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {[
                      { name: 'Walton Gadget', url: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800' },
                      { name: 'Fashion Dress', url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800' },
                      { name: 'Leather Shoe', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' },
                      { name: 'Organic Honey', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800' }
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setImageUrl(preset.url);
                          setMediaType('image');
                        }}
                        className="flex-shrink-0 px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-semibold text-slate-300 transition flex items-center gap-1 cursor-pointer"
                      >
                        <img src={preset.url} alt="" className="w-3.5 h-3.5 rounded object-cover" />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#E2136E] hover:bg-[#c80f5f] text-white font-bold rounded-xl"
                >
                  Publish Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REQUEST PAYOUT MODAL */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0d0d0d] text-white border border-white/10 w-full max-w-sm rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-base text-white">Request Payout Withdrawal</h3>
            <form onSubmit={handlePayoutSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Withdrawal Amount (৳)</label>
                <input
                  type="number"
                  required
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl font-bold text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Method</label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl font-bold text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="bkash">bKash Merchant Wallet</option>
                  <option value="nagad">Nagad Merchant Wallet</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Account Number</label>
                <input
                  type="tel"
                  required
                  value={payoutAccount}
                  onChange={(e) => setPayoutAccount(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
