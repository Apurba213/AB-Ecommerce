import { Product, Category, Brand } from '../types';

export const darazCategories: Category[] = [
  {
    id: 'cat_electronics',
    name: 'Electronics & Gadgets',
    nameBn: 'ইলেকট্রনিক্স ও গ্যাজেট',
    slug: 'electronics-gadgets',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    productCount: 240
  },
  {
    id: 'cat_mobile_accessories',
    name: 'Mobile & Accessories',
    nameBn: 'মোবাইল ও অ্যাক্সেসরিজ',
    slug: 'mobile-accessories',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500',
    productCount: 310
  },
  {
    id: 'cat_fashion',
    name: 'Fashion & Apparel',
    nameBn: 'ফ্যাশন ও পোশাক',
    slug: 'fashion-apparel',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500',
    productCount: 420
  },
  {
    id: 'cat_home',
    name: 'Home & Kitchen Appliances',
    nameBn: 'হোম ও কিচেন সামগ্রী',
    slug: 'home-kitchen',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500',
    productCount: 180
  },
  {
    id: 'cat_groceries',
    name: 'Organic & Groceries',
    nameBn: 'অর্গানিক গ্রোসারি ও খাবার',
    slug: 'organic-groceries',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500',
    productCount: 210
  },
  {
    id: 'cat_footwear',
    name: 'Shoes & Footwear',
    nameBn: 'জুতো ও ফুটওয়্যার',
    slug: 'shoes-footwear',
    icon: 'Footprints',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    productCount: 150
  },
  {
    id: 'cat_beauty',
    name: 'Beauty & Health',
    nameBn: 'বিউটি ও পার্সোনাল কেয়ার',
    slug: 'beauty-health',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500',
    productCount: 190
  },
  {
    id: 'cat_sports',
    name: 'Sports & Outdoors',
    nameBn: 'খেলাধুলা ও আউটডোর',
    slug: 'sports-outdoors',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=500',
    productCount: 110
  },
  {
    id: 'cat_computers',
    name: 'Computers & Gaming',
    nameBn: 'কম্পিউটার ও গেমিং',
    slug: 'computers-gaming',
    icon: 'Laptop',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500',
    productCount: 160
  },
  {
    id: 'cat_automotive',
    name: 'Motors & Accessories',
    nameBn: 'মোটর ও বাইক সামগ্রী',
    slug: 'motors-accessories',
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500',
    productCount: 90
  }
];

export const darazBrands: Brand[] = [
  { id: 'b_walton', name: 'Walton BD', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100' },
  { id: 'b_samsung', name: 'Samsung', logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100' },
  { id: 'b_realme', name: 'realme', logo: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=100' },
  { id: 'b_aarong', name: 'Aarong Handcrafts', logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100' },
  { id: 'b_apex', name: 'Apex Footwear', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { id: 'b_bata', name: 'Bata Bangladesh', logo: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100' },
  { id: 'b_square', name: 'Square Pure Organic', logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100' },
  { id: 'b_unilever', name: 'Unilever Pureit', logo: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100' },
  { id: 'b_xiaomi', name: 'Xiaomi / Redmi', logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100' },
  { id: 'b_baseus', name: 'Baseus BD', logo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100' }
];

interface CatalogSeedTemplate {
  titlePrefixes: string[];
  titleSubtypes: string[];
  brandList: string[];
  categorySlug: string;
  categoryName: string;
  minPrice: number;
  maxPrice: number;
  images: string[];
  tags: string[];
  variantsList?: Array<{ name: string; extraPrice: number }>;
}

const catalogTemplates: CatalogSeedTemplate[] = [
  {
    categorySlug: 'electronics-gadgets',
    categoryName: 'Electronics & Gadgets',
    brandList: ['Walton BD', 'Samsung', 'realme', 'Xiaomi / Redmi', 'Baseus BD'],
    minPrice: 450,
    maxPrice: 38000,
    titlePrefixes: ['Ultra HD', 'Wireless Bluetooth 5.3', 'Smart Noise-Cancelling', 'Portable Magnetic', 'High-Speed 65W Fast Charge', 'Pro AI Powered', 'Ergonomic Premium'],
    titleSubtypes: [
      'Earbuds TWS with LED Display Case',
      'Smartwatch with AMOLED Curved Display & Heart Rate Monitor',
      'Power Bank 20000mAh Dual USB-C Fast Charger',
      'Mini Desktop USB Rechargeable Silent Fan',
      'Gaming Mechanical Keyboard RGB Backlit',
      'Wireless Ergonomic Mouse 2.4GHz Quiet Click',
      'Smart WiFi Security Camera 360 Night Vision',
      'Bluetooth Soundbar Speaker with Subwoofer Deep Bass',
      'Portable Action Camera 4K Ultra HD Waterproof',
      'Professional Studio Condenser USB Microphone'
    ],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
      'https://images.unsplash.com/photo-1608156639585-34a0a56ee6c9?w=800',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800'
    ],
    tags: ['gadget', 'bluetooth', 'electronics', 'smarttech', 'wireless', 'fastcharge']
  },
  {
    categorySlug: 'mobile-accessories',
    categoryName: 'Mobile & Accessories',
    brandList: ['realme', 'Xiaomi / Redmi', 'Baseus BD', 'Samsung'],
    minPrice: 190,
    maxPrice: 12500,
    titlePrefixes: ['Full Coverage 9D Glass', 'Shockproof Armor', 'Nylon Braided Type-C', 'MagSafe Magnetic Wireless', 'Fast Charging Adapter', 'Heavy Duty Kickstand'],
    titleSubtypes: [
      'Tempered Glass Screen Protector for Redmi & Samsung',
      'Transparent Silicone Shockproof Case for Mobile',
      '100W Super Fast Type-C Braided Cable 2M',
      'Car Phone Mount Holder with Auto Clamping',
      'Universal Mobile Gaming Joystick Controller',
      '3-in-1 Wireless Charging Dock Stand for Phone & Watch',
      'Selfie Stick Tripod with Bluetooth Remote Shutter',
      'Dual USB Fast Car Charger Adapter LED'
    ],
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800'
    ],
    tags: ['mobile', 'cover', 'charger', 'type-c', 'screenprotector', 'accessories']
  },
  {
    categorySlug: 'fashion-apparel',
    categoryName: 'Fashion & Apparel',
    brandList: ['Aarong Handcrafts', 'Deshi Heritage Crafts', 'Apex Footwear', 'Bata Bangladesh'],
    minPrice: 650,
    maxPrice: 18500,
    titlePrefixes: ['Handloom Pure Cotton', 'Exclusive Embroidery Work', 'Traditional Dhakai', 'Casual Slim Fit', 'Designer Silk Premium', 'Comfort Stretch Soft'],
    titleSubtypes: [
      'Dhakai Jamdani Saree with Matching Blouse Piece',
      'Men Cotton Kabli Suit Set with Waistcoat',
      'Luxury Designer Katan Silk Saree - Wedding Edition',
      'Breathable Casual Cotton Polo T-Shirt',
      'Women Handcrafted Anarkali Salwar Kameez',
      'Men Embroidered Kurta Panjabi',
      'Unisex Denim Jacket Vintage Wash',
      'Traditional Silk Dupatta with Zari Work'
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800'
    ],
    tags: ['fashion', 'eid', 'saree', 'panjabi', 'salwar', 'traditional', 'bangladesh']
  },
  {
    categorySlug: 'home-kitchen',
    categoryName: 'Home & Kitchen Appliances',
    brandList: ['Walton BD', 'Unilever Pureit', 'Samsung'],
    minPrice: 850,
    maxPrice: 62000,
    titlePrefixes: ['Energy Saving 5-Star', 'Stainless Steel Multi-Purpose', 'Automatic Smart Control', 'Non-Stick Ceramic Coated', 'Double Wall Vacuum Insulated'],
    titleSubtypes: [
      'Non-Frost Inverter Refrigerator 220L',
      'Electric Rice Cooker 2.8L Dual Pot',
      'RO UV Alkaline Water Purifier Filter',
      'Microwave Oven 25L Convection & Grill',
      'Automatic Stainless Steel Electric Kettle 1.8L',
      'Blender & Grinder Heavy Duty 750W 3-Jars',
      'Garment Steamer Iron Vertical Portable',
      'Air Fryer Digital Touchscreen 5.5L Oil-Free Cooker'
    ],
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800',
      'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800',
      'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=800'
    ],
    tags: ['homeappliance', 'walton', 'kitchen', 'refrigerator', 'blender', 'ricecooker']
  },
  {
    categorySlug: 'organic-groceries',
    categoryName: 'Organic & Groceries',
    brandList: ['Square Pure Organic', 'Aarong Handcrafts', 'Walton BD'],
    minPrice: 120,
    maxPrice: 3500,
    titlePrefixes: ['100% Pure Chemical-Free', 'Fresh Organic Sourced', 'Sundarban Natural', 'Cold Pressed Virgin', 'Premium Quality Export Grade'],
    titleSubtypes: [
      'Sundarban Raw Natural Wild Honey 500g',
      'Organic Mustard Oil (Sorishar Tel) Cold Pressed 1 Liter',
      'Kalo Jeera (Black Seed) Pure Honey 1kg',
      'Chinigura Rice Premium Kalojira Polao Chawl 5kg',
      'Pure Ghee (Gharer Ghee) 500g Glass Jar',
      'Organic Chia Seeds & Flaxseeds Combo Pack 500g',
      'Pure Turmeric & Chili Powder Spice Combo 1kg'
    ],
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      'https://images.unsplash.com/photo-1587049352847-81a56d773cae?w=800',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800',
      'https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?w=800'
    ],
    tags: ['grocery', 'organic', 'honey', 'ghee', 'mustardoil', 'food', 'bangladeshi']
  },
  {
    categorySlug: 'shoes-footwear',
    categoryName: 'Shoes & Footwear',
    brandList: ['Apex Footwear', 'Bata Bangladesh', 'Aarong Handcrafts'],
    minPrice: 750,
    maxPrice: 9500,
    titlePrefixes: ['Genuine Full-Grain Leather', 'Lightweight Running Comfort', 'Breathable Mesh Cushioned', 'Handmade Ethnic Nagra', 'Formal Executive Slip-On'],
    titleSubtypes: [
      'Venturini Genuine Leather Formal Loafers',
      'Orthopedic Soft Memory Foam Walking Shoes',
      'Men Genuine Cow Leather Nagra Sandals',
      'Women Ethnic Hand-Embroidered Flat Jutti Shoes',
      'Waterproof Sports Trail Running Sneakers',
      'Classic High-Top Casual Canvas Sneakers'
    ],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800'
    ],
    tags: ['footwear', 'shoes', 'leather', 'apex', 'bata', 'loafers', 'sneakers']
  },
  {
    categorySlug: 'beauty-health',
    categoryName: 'Beauty & Health',
    brandList: ['Square Pure Organic', 'Unilever Pureit'],
    minPrice: 220,
    maxPrice: 6500,
    titlePrefixes: ['Organic Herbal Formula', 'Vitamin C Brightening', 'Hydrating Hyaluronic Acid', 'Natural Tea Tree Anti-Acne', 'Deep Cleansing Charcoal'],
    titleSubtypes: [
      'Vitamin C Serum for Radiant Glowing Skin 30ml',
      'Herbal Hair Oil with Onion & Bhringraj 200ml',
      'Sunscreen SPF 50+ PA++++ Non-Greasy Gel Cream',
      'Matte Waterproof Liquid Lipstick Set of 6 Colors',
      'Electric Facial Cleansing Brush & Massager',
      'Deep Moisturizing Body Lotion with Shea Butter 400ml'
    ],
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
      'https://images.unsplash.com/photo-1608248597261-833258657b45?w=800',
      'https://images.unsplash.com/photo-1512290900673-700200877990?w=800'
    ],
    tags: ['beauty', 'skincare', 'herbal', 'serum', 'sunscreen', 'cosmetics']
  },
  {
    categorySlug: 'computers-gaming',
    categoryName: 'Computers & Gaming',
    brandList: ['Xiaomi / Redmi', 'Samsung', 'Baseus BD', 'Walton BD'],
    minPrice: 1200,
    maxPrice: 125000,
    titlePrefixes: ['High-Performance Gaming', 'Ultra-Slim Aluminum', 'Mechanical RGB Backlit', '4K IPS Color-Accurate', 'Dual Band AC1200 High Speed'],
    titleSubtypes: [
      'Gaming Laptop Stand with RGB Cooling Fans',
      '27-inch 165Hz Curved Gaming Monitor 1ms Response',
      'Wireless Mechanical Gaming Keyboard Hot-Swappable',
      'Ergonomic High-Back Mesh Office Gaming Chair',
      'USB-C Multi-Port Adapter Hub 8-in-1 HDMI 4K',
      'Dual-Band Gigabit Wi-Fi 6 Router 4 Antennas'
    ],
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
      'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=800',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800'
    ],
    tags: ['gaming', 'computer', 'keyboard', 'monitor', 'router', 'laptop']
  }
];

export function generateDarazThousandsCatalog(targetCount: number = 1500): Product[] {
  const generated: Product[] = [];
  const merchants = [
    { id: 'mch_techbazar', name: 'TechBazar BD' },
    { id: 'mch_deshicraft', name: 'Deshi Heritage Crafts & Silk' },
    { id: 'mch_official_store', name: 'AB Official Flagship Mall' },
    { id: 'mch_dhaka_mart', name: 'Dhaka Supermart BD' },
    { id: 'mch_gadget_hub', name: 'GadgetHub Bangladesh' }
  ];

  let idCounter = 1;

  while (generated.length < targetCount) {
    for (const template of catalogTemplates) {
      if (generated.length >= targetCount) break;

      const prefix = template.titlePrefixes[idCounter % template.titlePrefixes.length];
      const subtype = template.titleSubtypes[(idCounter * 3) % template.titleSubtypes.length];
      const brand = template.brandList[idCounter % template.brandList.length];
      const merchant = merchants[idCounter % merchants.length];

      // Price calculation
      const stepPrice = Math.floor((template.maxPrice - template.minPrice) / 20);
      const basePrice = template.minPrice + (idCounter % 20) * stepPrice;
      const roundedPrice = Math.round(basePrice / 50) * 50;
      const discountPercent = (idCounter % 5 === 0) ? 0 : 10 + (idCounter % 35);
      const originalPrice = discountPercent > 0 ? Math.round((roundedPrice * (1 + discountPercent / 100)) / 50) * 50 : undefined;

      const title = `${brand} ${prefix} ${subtype} (Model ${2026 - (idCounter % 3)}-X${(idCounter % 89) + 10})`;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const img1 = template.images[idCounter % template.images.length];
      const img2 = template.images[(idCounter + 1) % template.images.length];

      const rating = Number((4.0 + ((idCounter * 7) % 10) / 10).toFixed(1));
      const numReviews = 5 + ((idCounter * 17) % 380);

      const isFeatured = (idCounter % 18 === 0);

      const variants = [
        { id: `var_${idCounter}_1`, name: 'Standard Edition / Color: Black', sku: `SKU-${idCounter}-BLK`, price: roundedPrice, stock: 15 + (idCounter % 40) },
        { id: `var_${idCounter}_2`, name: 'Pro Edition / Color: Silver', sku: `SKU-${idCounter}-SLV`, price: roundedPrice + 250, stock: 8 + (idCounter % 20) }
      ];

      generated.push({
        id: `prd_catalog_${idCounter}`,
        merchantId: merchant.id,
        merchantName: merchant.name,
        title,
        slug,
        description: `Official authentic product by ${brand}. High quality Bangladeshi guaranteed product with fast delivery across 64 districts via AB Express Logistics. Full manufacturer warranty included.`,
        price: roundedPrice,
        originalPrice,
        category: template.categoryName,
        brand,
        images: [img1, img2],
        stock: 10 + (idCounter % 90),
        rating: Math.min(5.0, rating),
        numReviews,
        isFeatured,
        isApproved: true,
        variants,
        tags: [...template.tags, brand.toLowerCase(), merchant.name.toLowerCase().split(' ')[0]],
        createdAt: new Date(2026, 0, 1 + (idCounter % 60)).toISOString().split('T')[0]
      });

      idCounter++;
    }
  }

  return generated;
}
