import { User, MerchantProfile, Category, Brand, Product, Order, PayoutRequest, Coupon, SystemSettings, Review } from '../types';
import { generateDarazThousandsCatalog, darazCategories, darazBrands } from './catalogGenerator';

export const initialUsers: User[] = [
  {
    id: 'usr_admin',
    name: 'Tanvir Hossain (Admin)',
    email: 'admin@amardokan.bd',
    phone: '+8801700000001',
    role: 'admin',
    status: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    createdAt: '2025-01-01'
  },
  {
    id: 'usr_merchant_1',
    name: 'Nazmul Islam',
    email: 'techbazar@merchant.bd',
    phone: '+8801811112222',
    role: 'merchant',
    status: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    createdAt: '2025-02-10'
  },
  {
    id: 'usr_merchant_2',
    name: 'Syeda Nusrat',
    email: 'deshicraft@merchant.bd',
    phone: '+8801922223333',
    role: 'merchant',
    status: 'pending', // Pending Admin approval demo
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    createdAt: '2026-03-01'
  },
  {
    id: 'usr_customer_1',
    name: 'Rahim Uddin',
    email: 'rahim.dhaka@gmail.com',
    phone: '+8801755554444',
    role: 'customer',
    status: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    createdAt: '2025-04-15'
  }
];

export const initialMerchants: MerchantProfile[] = [
  {
    id: 'mch_techbazar',
    userId: 'usr_merchant_1',
    storeName: 'TechBazar BD',
    storeSlug: 'techbazar-bd',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1000',
    description: 'Official retailer for genuine smartphones, gadgets, and Walton home appliances in Dhaka.',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Uttara',
    address: 'Sector 7, Uttara, Dhaka 1230',
    tradeLicenseNo: 'TRAD/DNCC/2025/883921',
    nidNumber: '19892691234567891',
    bkashNumber: '01811112222',
    nagadNumber: '01811112222',
    status: 'active',
    commissionRate: 5,
    rating: 4.8,
    totalSalesCount: 340,
    totalRevenue: 850000,
    joinedDate: '2025-02-10'
  },
  {
    id: 'mch_deshicraft',
    userId: 'usr_merchant_2',
    storeName: 'Deshi Heritage Crafts & Silk',
    storeSlug: 'deshi-heritage-crafts',
    logoUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1000',
    description: 'Authentic Rajshahi Silk Sarees, Handcrafted Nakshi Kantha, and Premium Panjabis.',
    division: 'Rajshahi',
    district: 'Rajshahi',
    upazila: 'Boalia',
    address: 'Silk City Market, Ghoramara, Rajshahi',
    tradeLicenseNo: 'TRAD/RCC/2026/00192',
    nidNumber: '19922699876543210',
    bkashNumber: '01922223333',
    nagadNumber: '01922223333',
    status: 'pending',
    commissionRate: 5,
    rating: 4.5,
    totalSalesCount: 42,
    totalRevenue: 125000,
    joinedDate: '2026-03-01'
  }
];

export const initialCategories: Category[] = darazCategories;

export const initialBrands: Brand[] = darazBrands;

const manualInitialProducts: Product[] = [
  {
    id: 'prd_walton_fridge',
    merchantId: 'mch_techbazar',
    merchantName: 'TechBazar BD',
    title: 'Walton Non-Frost Inverter Refrigerator WFE-2D5-GDEL',
    slug: 'walton-non-frost-inverter-refrigerator',
    description: 'Energy-saving double door inverter refrigerator designed for Bangladeshi households. Rapid cooling with localized warranty.',
    price: 48500,
    originalPrice: 53000,
    category: 'Electronics & Gadgets',
    brand: 'Walton BD',
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800'
    ],
    stock: 12,
    rating: 4.8,
    numReviews: 24,
    isFeatured: true,
    isApproved: true,
    variants: [
      { id: 'v1', name: 'Color: Glass Red, 220L', sku: 'WLT-RED-220', price: 48500, stock: 8 },
      { id: 'v2', name: 'Color: Mirror Silver, 250L', sku: 'WLT-SLV-250', price: 52000, stock: 4 }
    ],
    tags: ['walton', 'refrigerator', 'home appliance', 'made in bangladesh'],
    createdAt: '2026-01-15'
  },
  {
    id: 'prd_saree_jamdani',
    merchantId: 'mch_deshicraft',
    merchantName: 'Deshi Heritage Crafts & Silk',
    title: 'Handloom Traditional Dhakai Jamdani Saree - Royal Blue',
    slug: 'handloom-traditional-dhakai-jamdani-saree',
    description: 'Pure cotton 84-count authentic Dhakai Jamdani saree hand-woven by weavers in Narayanganj. Comes with matching blouse piece.',
    price: 12500,
    originalPrice: 15000,
    category: 'Fashion & Apparel',
    brand: 'Aarong Handcrafts',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800'
    ],
    stock: 5,
    rating: 4.9,
    numReviews: 18,
    isFeatured: true,
    isApproved: true,
    variants: [
      { id: 'v3', name: 'Royal Blue with Gold Zari', sku: 'JAM-BLU-GLD', price: 12500, stock: 3 },
      { id: 'v4', name: 'Crimson Red with Silver Zari', sku: 'JAM-RED-SLV', price: 13000, stock: 2 }
    ],
    tags: ['saree', 'jamdani', 'eid collection', 'traditional'],
    createdAt: '2026-02-01'
  },
  {
    id: 'prd_panjabi_eid',
    merchantId: 'mch_deshicraft',
    merchantName: 'Deshi Heritage Crafts & Silk',
    title: 'Premium Embroidery Cotton Panjabi - Eid Collection',
    slug: 'premium-embroidery-cotton-panjabi',
    description: 'Luxurious breathable 100% combed cotton Panjabi featuring subtle chest embroidery, mandarin collar, and custom engraved metallic buttons.',
    price: 3450,
    originalPrice: 4200,
    category: 'Fashion & Apparel',
    brand: 'Aarong Handcrafts',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800',
      'https://images.unsplash.com/photo-1597983073493-88cd35cfa3d0?w=800'
    ],
    stock: 25,
    rating: 4.7,
    numReviews: 45,
    isFeatured: true,
    isApproved: true,
    variants: [
      { id: 'v5', name: 'Size: M (40), Off-White', sku: 'PNJ-OWH-M', price: 3450, stock: 10 },
      { id: 'v6', name: 'Size: L (42), Off-White', sku: 'PNJ-OWH-L', price: 3450, stock: 10 },
      { id: 'v7', name: 'Size: XL (44), Off-White', sku: 'PNJ-OWH-XL', price: 3450, stock: 5 }
    ],
    tags: ['panjabi', 'menswear', 'eid 2026', 'cotton'],
    createdAt: '2026-02-10'
  },
  {
    id: 'prd_apex_loafers',
    merchantId: 'mch_techbazar',
    merchantName: 'TechBazar BD',
    title: 'Apex Venturini Genuine Leather Formal Loafers',
    slug: 'apex-venturini-genuine-leather-loafers',
    description: 'Crafted with premium full-grain Bangladeshi cow leather. OrthoLite cushioned footbed for maximum daily comfort in office & events.',
    price: 5890,
    originalPrice: 6500,
    category: 'Shoes & Footwear',
    brand: 'Apex Footwear',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
    ],
    stock: 18,
    rating: 4.6,
    numReviews: 31,
    isFeatured: false,
    isApproved: true,
    variants: [
      { id: 'v8', name: 'Size: 41, Tan Brown', sku: 'APX-TAN-41', price: 5890, stock: 6 },
      { id: 'v9', name: 'Size: 42, Black', sku: 'APX-BLK-42', price: 5890, stock: 12 }
    ],
    tags: ['leather', 'apex', 'loafers', 'formal shoes'],
    createdAt: '2026-02-18'
  },
  {
    id: 'prd_s24_ultra',
    merchantId: 'mch_techbazar',
    merchantName: 'TechBazar BD',
    title: 'Samsung Galaxy S24 Ultra 5G (Official BD Variant)',
    slug: 'samsung-galaxy-s24-ultra-5g-official-bd',
    description: 'Official BTRC registered Galaxy S24 Ultra with Galaxy AI features, Titanium Frame, and 200MP Camera. 1 Year Official Warranty in Bangladesh.',
    price: 175000,
    originalPrice: 185000,
    category: 'Electronics & Gadgets',
    brand: 'Samsung BD',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
    ],
    stock: 6,
    rating: 4.9,
    numReviews: 52,
    isFeatured: true,
    isApproved: true,
    variants: [
      { id: 'v10', name: '12GB RAM / 256GB - Titanium Gray', sku: 'SAM-S24U-256', price: 175000, stock: 4 },
      { id: 'v11', name: '12GB RAM / 512GB - Titanium Black', sku: 'SAM-S24U-512', price: 195000, stock: 2 }
    ],
    tags: ['samsung', 'flagship', 'btrc approved', 'smartphone'],
    createdAt: '2026-01-20'
  },
  {
    id: 'prd_sundarban_honey',
    merchantId: 'mch_deshicraft',
    merchantName: 'Deshi Heritage Crafts & Silk',
    title: 'Organic Sundarban Natural Raw Honey (500g Jar)',
    slug: 'organic-sundarban-natural-raw-honey-500g',
    description: '100% pure unfiltered wild honey collected directly from the Sundarban mangrove forests by traditional Moubals (honey harvesters).',
    price: 950,
    originalPrice: 1200,
    category: 'Organic & Groceries',
    brand: 'Square Pure Organic',
    images: [
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=800',
      'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800'
    ],
    stock: 50,
    rating: 4.9,
    numReviews: 89,
    isFeatured: true,
    isApproved: true,
    tags: ['organic', 'sundarban honey', 'groceries', 'pure'],
    createdAt: '2026-02-22'
  }
];

export const initialProducts: Product[] = [
  ...manualInitialProducts,
  ...generateDarazThousandsCatalog(1500)
];

export const initialReviews: Review[] = [
  {
    id: 'rev_1',
    productId: 'prd_walton_fridge',
    userName: 'Kazi Mahfuzur Rahman',
    rating: 5,
    comment: 'Awesome cooling efficiency! Delivered to Uttara within 24 hours. bKash payment was smooth and received 10% instant cashback.',
    date: '2026-02-12'
  },
  {
    id: 'rev_2',
    productId: 'prd_saree_jamdani',
    userName: 'Sabrina Yashmin',
    rating: 5,
    comment: 'Dhakai Jamdani fabric is so soft and genuine. Highly recommended merchant from Rajshahi.',
    date: '2026-02-14'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord_bd_1001',
    orderNumber: 'BD-2026-8911',
    customerId: 'usr_customer_1',
    customerName: 'Rahim Uddin',
    customerPhone: '+8801755554444',
    customerEmail: 'rahim.dhaka@gmail.com',
    shippingAddress: {
      id: 'addr_1',
      recipientName: 'Rahim Uddin',
      phone: '+8801755554444',
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Dhanmondi',
      fullAddress: 'House 42, Road 7A, Dhanmondi, Dhaka 1209'
    },
    items: [
      {
        id: 'item_1',
        productId: 'prd_panjabi_eid',
        merchantId: 'mch_deshicraft',
        productTitle: 'Premium Embroidery Cotton Panjabi - Eid Collection',
        productImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800',
        variantName: 'Size: L (42), Off-White',
        unitPrice: 3450,
        quantity: 1,
        totalPrice: 3450
      }
    ],
    subtotal: 3450,
    discountAmount: 345, // 10% promo
    deliveryFee: 60, // Inside Dhaka
    totalAmount: 3165,
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    paymentTrxId: 'TRX9A882BC1',
    orderStatus: 'shipped',
    couponCode: 'SAVE10',
    notes: 'Please call before delivery.',
    createdAt: '2026-02-28T10:30:00Z',
    updatedAt: '2026-03-01T14:20:00Z'
  },
  {
    id: 'ord_bd_1002',
    orderNumber: 'BD-2026-9204',
    customerId: 'usr_customer_1',
    customerName: 'Rahim Uddin',
    customerPhone: '+8801755554444',
    customerEmail: 'rahim.dhaka@gmail.com',
    shippingAddress: {
      id: 'addr_1',
      recipientName: 'Rahim Uddin',
      phone: '+8801755554444',
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Dhanmondi',
      fullAddress: 'House 42, Road 7A, Dhanmondi, Dhaka 1209'
    },
    items: [
      {
        id: 'item_2',
        productId: 'prd_sundarban_honey',
        merchantId: 'mch_deshicraft',
        productTitle: 'Organic Sundarban Natural Raw Honey (500g Jar)',
        productImage: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=800',
        unitPrice: 950,
        quantity: 2,
        totalPrice: 1900
      }
    ],
    subtotal: 1900,
    discountAmount: 0,
    deliveryFee: 60,
    totalAmount: 1960,
    paymentMethod: 'nagad',
    paymentStatus: 'paid',
    paymentTrxId: 'NGD773199A',
    orderStatus: 'confirmed',
    createdAt: '2026-03-02T09:15:00Z',
    updatedAt: '2026-03-02T09:15:00Z'
  }
];

export const initialPayouts: PayoutRequest[] = [
  {
    id: 'payout_1',
    merchantId: 'mch_techbazar',
    merchantStoreName: 'TechBazar BD',
    amount: 150000,
    paymentMethod: 'bkash',
    accountNumber: '01811112222',
    status: 'approved',
    requestedDate: '2026-02-25',
    processedDate: '2026-02-26',
    adminNote: 'Transfer completed via bKash Merchant Payout API (Trx: TRX9921008).'
  },
  {
    id: 'payout_2',
    merchantId: 'mch_deshicraft',
    merchantStoreName: 'Deshi Heritage Crafts & Silk',
    amount: 45000,
    paymentMethod: 'nagad',
    accountNumber: '01922223333',
    status: 'pending',
    requestedDate: '2026-03-01'
  }
];

export const initialCoupons: Coupon[] = [
  {
    code: 'SAVE10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 1000,
    maxDiscount: 500,
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    code: 'EID2026',
    discountType: 'fixed',
    discountValue: 300,
    minOrderAmount: 2500,
    expiryDate: '2026-05-31',
    isActive: true
  },
  {
    code: 'BKASH100',
    discountType: 'fixed',
    discountValue: 100,
    minOrderAmount: 800,
    expiryDate: '2026-12-31',
    isActive: true
  }
];

export const initialSettings: SystemSettings = {
  siteName: 'AB Ecommerce Platform',
  supportPhone: '+880 9612-883921',
  supportEmail: 'support@amardokan.com.bd',
  defaultCommissionRate: 5.0, // 5% platform commission
  insideDhakaShippingFee: 60,
  outsideDhakaShippingFee: 120,
  bkashAppKey: 'bkash_sandbox_key_8839',
  bkashAppSecret: 'bkash_sec_2026_xyz_app',
  bkashMerchantShortCode: '01700008899',
  nagadMerchantId: 'NGD_MERCHANT_BD_9921',
  nagadPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...',
  sslCommerzStoreId: 'amardokan_live_store',
  sslCommerzStorePassword: 'ssl_store_pass_2026'
};
