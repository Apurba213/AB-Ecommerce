import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Eye, Heart, Star, Store, ShieldCheck, Sparkles } from 'lucide-react';

interface Product3DCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onSelect?: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const Product3DCard: React.FC<Product3DCardProps> = ({
  product,
  onQuickView,
  onSelect,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist = (_productId: string) => {}
}) => {
  const handleSelect = onQuickView || onSelect || ((_p: Product) => {});
  const [isHovered, setIsHovered] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#121212] rounded-2xl border border-white/10 shadow-lg hover:shadow-2xl hover:border-[#d4af37]/50 transition-all duration-300 ease-out flex flex-col overflow-hidden transform-gpu hover:-translate-y-1.5"
    >
      {/* Subtle Glow Overlay on Hover */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 rounded-2xl bg-gradient-to-tr from-[#d4af37]/10 via-transparent to-[#E2136E]/10 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-[#0a0a0a] overflow-hidden">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-20">
          {discountPercent > 0 && (
            <span className="bg-[#E2136E] text-white font-extrabold text-[9px] sm:text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md tracking-wider uppercase">
              {discountPercent}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] font-bold text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full shadow flex items-center gap-1 backdrop-blur-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#d4af37]" />
              TOP PICK
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          className={`absolute top-2.5 right-2.5 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition shadow-md cursor-pointer ${
            isWishlisted
              ? 'bg-[#E2136E] text-white'
              : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Action Overlay */}
        <div className="absolute inset-x-0 bottom-2.5 px-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1.5">
          <button
            onClick={() => handleSelect(product)}
            className="flex-1 py-1.5 sm:py-2 bg-[#d4af37] hover:bg-amber-400 text-black rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 shadow-lg transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-black" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Merchant Store Label */}
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-400 font-semibold mb-1">
            <Store className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span className="truncate">{product.merchantName}</span>
            <ShieldCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
          </div>

          {/* Title */}
          <h3
            onClick={() => handleSelect(product)}
            className="font-bold text-xs sm:text-sm text-white line-clamp-2 hover:text-[#d4af37] transition-colors cursor-pointer leading-tight sm:leading-snug"
          >
            {product.title}
          </h3>
        </div>

        {/* Rating & Stock */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 pt-0.5">
          <div className="flex items-center gap-1 bg-amber-950/20 px-1.5 py-0.5 rounded border border-amber-500/20">
            <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
            <span className="font-bold text-white">{product.rating}</span>
            <span className="text-[10px] text-slate-500 hidden sm:inline">({product.numReviews})</span>
          </div>

          <span className={`text-[10px] sm:text-[11px] font-medium px-1.5 py-0.5 rounded ${product.stock > 0 ? 'bg-white/5 text-slate-300' : 'bg-rose-950/60 text-rose-400'}`}>
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-1.5">
          <div className="min-w-0">
            <div className="font-mono font-black text-sm sm:text-base text-[#d4af37] flex items-baseline gap-1 truncate">
              <span>৳ {product.price.toLocaleString()}</span>
            </div>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-slate-500 line-through font-mono block truncate">
                ৳ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-[#E2136E] hover:bg-[#c80f5f] disabled:bg-slate-800 text-white rounded-xl text-[11px] sm:text-xs font-black shadow-md shadow-pink-950/60 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

