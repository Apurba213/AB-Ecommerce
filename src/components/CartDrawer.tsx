import React, { useState } from 'react';
import { CartItem } from '../types';
import { translations } from '../data/bangladeshData';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: CartItem[];
  items?: CartItem[];
  onUpdateQuantity?: (productId: string, variantId: string | undefined, delta: number) => void;
  onUpdateQty?: (productId: string, delta: number, variantName?: string) => void;
  onRemoveItem: (productId: string, variantId?: string) => void;
  onProceedToCheckout?: (appliedCouponCode?: string, discountAmount?: number) => void;
  onCheckout?: () => void;
  lang?: 'en' | 'bn';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  items,
  onUpdateQuantity,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  onCheckout,
  lang = 'en'
}) => {
  if (!isOpen) return null;

  const currentLang = lang || 'en';
  const t = translations[currentLang] || translations.en;
  const activeCartItems = cartItems || items || [];
  const handleUpdateQuantity = (productId: string, variantId: string | undefined, delta: number) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(productId, variantId, delta);
    } else if (onUpdateQty) {
      onUpdateQty(productId, delta, variantId);
    }
  };
  const handleCheckout = () => {
    if (onProceedToCheckout) {
      onProceedToCheckout(appliedDiscount?.code, discountAmount);
    } else if (onCheckout) {
      onCheckout();
    }
  };
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const subtotal = activeCartItems.reduce((acc, item) => {
    const price = item.selectedVariant ? item.selectedVariant.price : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const estimatedTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponError('');
    setIsApplying(true);

    try {
      const res = await fetch('/api/coupons/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, amount: subtotal })
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setAppliedDiscount({ code: data.code, amount: data.discountAmount });
        setCouponCode('');
      } else {
        setCouponError(data.error || 'Invalid coupon code');
      }
    } catch (err) {
      setCouponError('Failed to apply coupon');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0d0d0d] text-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-white/10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#050505]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/15 transition cursor-pointer hover:scale-105 active:scale-95"
            >
              <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] rotate-180" />
              <span>← Back</span>
            </button>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#E2136E]" />
              <h2 className="font-extrabold text-xs sm:text-sm text-white">
                Cart ({activeCartItems.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeCartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <ShoppingBag className="w-8 h-8 text-slate-400" />
              </div>
              <p className="font-bold text-white text-sm mb-1">Your Cart is Empty</p>
              <p className="text-xs text-slate-400 max-w-xs">
                Explore thousands of genuine Bangladeshi products and add items to your cart!
              </p>
            </div>
          ) : (
            activeCartItems.map((item) => {
              const unitPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
              const itemTotal = unitPrice * item.quantity;

              return (
                <div
                  key={`${item.product.id}_${item.selectedVariant?.id || item.variantName || 'default'}`}
                  className="p-3 bg-[#121212] rounded-2xl border border-white/10 flex gap-3 relative group"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-xl bg-[#0a0a0a] border border-white/10 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between pr-6">
                    <div>
                      <h4 className="font-bold text-xs text-white line-clamp-2 leading-tight">
                        {item.product.title}
                      </h4>
                      {(item.selectedVariant || item.variantName) && (
                        <span className="text-[10px] text-slate-300 bg-white/10 px-1.5 py-0.5 rounded mt-1 inline-block">
                          {item.selectedVariant ? item.selectedVariant.name : item.variantName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-white/10 rounded-lg bg-white/5">
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.selectedVariant?.id || item.variantName, -1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-300 hover:bg-white/10 rounded-l-lg transition"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.selectedVariant?.id || item.variantName, 1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-300 hover:bg-white/10 rounded-r-lg transition"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono font-black text-xs text-[#d4af37]">
                        ৳ {itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedVariant?.id || item.variantName)}
                    className="absolute top-2 right-2 text-slate-500 hover:text-[#E2136E] p-1 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer: Promo Code & Checkout */}
        {activeCartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#050505] space-y-4">
            
            {/* Promo Code Form */}
            {appliedDiscount ? (
              <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Coupon ({appliedDiscount.code}) Applied: -৳{appliedDiscount.amount}
                </span>
                <button
                  onClick={() => setAppliedDiscount(null)}
                  className="text-rose-400 hover:underline font-bold text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo code (SAVE10, EID2026)"
                    className="w-full pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4af37]"
                  />
                  <Tag className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  disabled={isApplying}
                  className="px-3 py-2 bg-[#d4af37] hover:bg-amber-400 text-black font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  {isApplying ? '...' : 'Apply'}
                </button>
              </form>
            )}
            {couponError && <p className="text-[11px] text-[#E2136E] font-semibold">{couponError}</p>}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs border-t border-white/10 pt-3">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-white font-mono">৳ {subtotal.toLocaleString()}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-emerald-400 font-bold font-mono">
                  <span>Discount</span>
                  <span>-৳ {appliedDiscount.amount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Delivery Charge</span>
                <span>Calculated at checkout (৳60/৳120)</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/10">
                <span>Estimated Total</span>
                <span className="text-[#d4af37] text-base font-mono">৳ {estimatedTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                handleCheckout();
                onClose();
              }}
              className="w-full py-3.5 bg-[#E2136E] hover:bg-[#c80f5f] text-white rounded-2xl font-black text-sm shadow-lg shadow-pink-950/50 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>{t.checkout}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
