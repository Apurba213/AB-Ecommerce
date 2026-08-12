import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { X, Star, ShoppingBag, Store, ShieldCheck, Heart, Truck, Check, Sparkles, MessageSquare, ArrowLeft } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedVariant?: ProductVariant, qty?: number) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  onAddReview?: (productId: string, rating: number, comment: string) => void;
  lang?: 'en' | 'bn';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist = (_productId: string) => {},
  onAddReview = (_productId: string, _rating: number, _comment: string) => {},
  lang = 'en'
}) => {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [is3DPreview, setIs3DPreview] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddReview(product.id, newRating, newComment);
    setIsReviewSubmitted(true);
    setNewComment('');
    setTimeout(() => setIsReviewSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0d0d0d] text-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative my-4 sm:my-8 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar with Prominent Back Button & Close */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-[#080808] z-20 sticky top-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/15 transition cursor-pointer hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
            <span>← Back to Products</span>
          </button>

          <span className="text-xs text-slate-400 font-mono hidden sm:inline truncate max-w-xs">
            Item ID: {product.id}
          </span>

          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto flex-1">
          
          {/* Left: Image Gallery & 3D Interactive View */}
          <div className="p-4 sm:p-6 bg-[#050505] md:border-r border-white/10 flex flex-col justify-between space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#121212] border border-white/10 shadow-inner flex items-center justify-center">
              {is3DPreview ? (
                <div
                  className="w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
                  onMouseMove={(e) => {
                    if (e.buttons === 1) {
                      setRotation((prev) => prev + e.movementX);
                    }
                  }}
                >
                  <div
                    className="w-4/5 h-4/5 transition-transform duration-75"
                    style={{
                      transform: `perspective(600px) rotateY(${rotation}deg)`,
                      backgroundImage: `url(${product.images[activeImageIdx] || product.images[0]})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                  />
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-2 bg-white/10 px-2.5 py-1 rounded-full shadow-sm">
                    Drag horizontally to rotate 360° product view
                  </span>
                </div>
              ) : (
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-contain p-2 sm:p-4"
                />
              )}

              {/* 3D Mode Toggle Button */}
              <button
                onClick={() => setIs3DPreview(!is3DPreview)}
                className={`absolute bottom-3 left-3 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer ${
                  is3DPreview
                    ? 'bg-[#E2136E] text-white'
                    : 'bg-[#d4af37] text-black hover:bg-amber-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{is3DPreview ? 'Standard View' : '3D Orbit Preview'}</span>
              </button>
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveImageIdx(idx); setIs3DPreview(false); }}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 overflow-hidden flex-shrink-0 bg-[#121212] transition cursor-pointer ${
                      activeImageIdx === idx ? 'border-[#d4af37] ring-2 ring-yellow-500/20' : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Merchant Store Badge */}
            <div className="p-3 bg-emerald-950/40 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Store className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1 font-bold text-xs text-white">
                    <span className="truncate max-w-[140px] sm:max-w-none">{product.merchantName}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  </div>
                  <p className="text-[10px] text-slate-400">Verified Seller in Bangladesh</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#d4af37] bg-black/60 border border-[#d4af37]/30 px-2.5 py-1 rounded-lg">
                4.8 ★
              </span>
            </div>

          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-4 sm:p-6 flex flex-col justify-between space-y-4 overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#d4af37] font-bold bg-[#d4af37]/10 border border-[#d4af37]/30 px-2.5 py-1 rounded-md uppercase tracking-wider text-[10px] sm:text-xs">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span className="text-slate-400">({product.numReviews})</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-lg sm:text-2xl font-serif font-bold text-white leading-snug mb-3">
                {product.title}
              </h1>

              {/* Price in BDT */}
              <div className="flex items-baseline gap-2.5 sm:gap-3 mb-3 flex-wrap">
                <span className="text-xl sm:text-3xl font-mono font-black text-[#d4af37]">
                  ৳ {displayPrice.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs sm:text-base text-slate-500 line-through font-mono">
                    ৳ {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[10px] sm:text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 font-bold px-2 py-0.5 rounded">
                  In Stock ({selectedVariant ? selectedVariant.stock : product.stock})
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {product.description}
              </p>

              {/* bKash Offer Callout */}
              <div className="p-2.5 sm:p-3 bg-pink-950/40 border border-[#E2136E]/40 rounded-2xl flex items-center gap-2.5 mb-3">
                <span className="bg-[#E2136E] text-white font-extrabold text-[9px] sm:text-[10px] px-2 py-1 rounded flex-shrink-0">
                  bKash OFFER
                </span>
                <p className="text-[11px] sm:text-xs text-pink-200 font-medium">
                  Pay with <strong>bKash Direct Gateway</strong> to get 10% instant cashback (up to ৳200).
                </p>
              </div>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-1.5 mb-3">
                  <label className="text-xs font-bold text-slate-200">Select Option / Variant:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                          selectedVariant?.id === v.id
                            ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37] ring-2 ring-yellow-500/20'
                            : 'border-white/10 hover:border-white/20 text-slate-300 bg-white/5'
                        }`}
                      >
                        {v.name} - ৳{v.price.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-4">
                <label className="text-xs font-bold text-slate-200">Quantity:</label>
                <div className="flex items-center border border-white/10 rounded-xl bg-white/5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-slate-300 font-bold hover:bg-white/10 rounded-l-xl transition"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-extrabold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-slate-300 font-bold hover:bg-white/10 rounded-r-xl transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions: Add to Cart & Wishlist */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    onAddToCart(product, selectedVariant, quantity);
                    onClose();
                  }}
                  className="flex-1 py-3 sm:py-3.5 bg-[#E2136E] hover:bg-[#c80f5f] text-white rounded-2xl font-extrabold text-xs sm:text-sm shadow-lg shadow-pink-950/50 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="truncate">Add {quantity} to Cart - ৳ {(displayPrice * quantity).toLocaleString()}</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3 sm:p-3.5 rounded-2xl border transition cursor-pointer flex-shrink-0 ${
                    isWishlisted
                      ? 'bg-[#E2136E] border-[#E2136E] text-white'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-around text-[10px] sm:text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-emerald-400" /> Inside Dhaka ৳60</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> Genuine Guarantee</span>
              </div>
            </div>

            {/* Submit Review Form Section */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="font-bold text-xs text-white mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#E2136E]" />
                Write a Review for this Product
              </h3>

              {isReviewSubmitted ? (
                <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Thank you! Your review has been submitted.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="text-[#d4af37] hover:scale-110 transition cursor-pointer"
                        >
                          <Star className={`w-4 h-4 ${star <= newRating ? 'fill-current' : 'text-slate-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience with this item..."
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#d4af37] hover:bg-amber-400 text-black rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
