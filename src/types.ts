export type UserRole = 'admin' | 'merchant' | 'customer';

export type AccountStatus = 'active' | 'pending' | 'suspended' | 'rejected';

export type PaymentMethod = 'bkash' | 'nagad' | 'cod';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type OrderStatus = 'placed' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: AccountStatus;
  avatarUrl?: string;
  createdAt: string;
}

export interface MerchantProfile {
  id: string;
  userId: string;
  storeName: string;
  storeSlug: string;
  logoUrl: string;
  bannerUrl: string;
  description: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  tradeLicenseNo: string;
  nidNumber: string;
  bkashNumber: string;
  nagadNumber: string;
  bankAccountDetails?: string;
  status: AccountStatus;
  commissionRate: number; // e.g. 5%
  rating: number;
  totalSalesCount: number;
  totalRevenue: number;
  joinedDate: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., 'Size: L, Color: Black'
  sku: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  merchantId: string;
  merchantName: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  numReviews: number;
  isFeatured?: boolean;
  isApproved: boolean;
  variants?: ProductVariant[];
  tags: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Address {
  id: string;
  recipientName: string;
  phone: string;
  division: string;
  district: string;
  upazila: string;
  fullAddress: string;
  isDefault?: boolean;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  variantName?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  merchantId: string;
  productTitle: string;
  productImage: string;
  variantName?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g., BD-2026-8839
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  totalAmount: number; // in BDT
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentTrxId?: string;
  orderStatus: OrderStatus;
  couponCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayoutRequest {
  id: string;
  merchantId: string;
  merchantStoreName: string;
  amount: number; // in BDT
  paymentMethod: 'bkash' | 'nagad' | 'bank';
  accountNumber: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  requestedDate: string;
  processedDate?: string;
  adminNote?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 for 10% or 200 for 200 BDT
  minOrderAmount: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
}

export interface SystemSettings {
  siteName: string;
  supportPhone: string;
  supportEmail: string;
  defaultCommissionRate: number;
  insideDhakaShippingFee: number;
  outsideDhakaShippingFee: number;
  bkashAppKey: string;
  bkashAppSecret: string;
  bkashMerchantShortCode: string;
  nagadMerchantId: string;
  nagadPublicKey: string;
  sslCommerzStoreId: string;
  sslCommerzStorePassword: string;
}
