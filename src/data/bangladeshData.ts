export interface LocationData {
  divisions: {
    name: string;
    nameBn: string;
    districts: {
      name: string;
      nameBn: string;
      upazilas: string[];
    }[];
  }[];
}

export const bangladeshLocations: LocationData = {
  divisions: [
    {
      name: 'Dhaka',
      nameBn: 'ঢাকা',
      districts: [
        {
          name: 'Dhaka',
          nameBn: 'ঢাকা',
          upazilas: ['Mirpur', 'Dhanmondi', 'Gulshan', 'Uttara', 'Savar', 'Kharani', 'Motijheel', 'Mohammadpur', 'Tejgaon', 'Badda', 'Banani']
        },
        {
          name: 'Gazipur',
          nameBn: 'গাজীপুর',
          upazilas: ['Gazipur Sadar', 'Kaliakair', 'Kapasia', 'Sreepur', 'Kaliganj']
        },
        {
          name: 'Narayanganj',
          nameBn: 'নারায়ণগঞ্জ',
          upazilas: ['Narayanganj Sadar', 'Araihazar', 'Bandar', 'Rupganj', 'Sonargaon']
        },
        {
          name: 'Tangail',
          nameBn: 'টাঙ্গাইল',
          upazilas: ['Tangail Sadar', 'Gopalpur', 'Mirzapur', 'Delduar', 'Madhupur']
        }
      ]
    },
    {
      name: 'Chattogram',
      nameBn: 'চট্টগ্রাম',
      districts: [
        {
          name: 'Chattogram',
          nameBn: 'চট্টগ্রাম',
          upazilas: ['Kotwali', 'Panchlaish', 'Agrabad', 'Hathazari', 'Sitakunda', 'Patiya', 'Raozan', 'Boalkhali']
        },
        {
          name: 'Cox\'s Bazar',
          nameBn: 'কক্সবাজার',
          upazilas: ['Cox\'s Bazar Sadar', 'Teknaf', 'Ukhiya', 'Chakaria', 'Ramu']
        },
        {
          name: 'Cumilla',
          nameBn: 'কুমিল্লা',
          upazilas: ['Cumilla Sadar', 'Daudkandi', 'Chandina', 'Laksam', 'Burichang']
        }
      ]
    },
    {
      name: 'Rajshahi',
      nameBn: 'রাজশাহী',
      districts: [
        {
          name: 'Rajshahi',
          nameBn: 'রাজশাহী',
          upazilas: ['Boalia', 'Rajpara', 'Paba', 'Godagari', 'Tanore', 'Puthia']
        },
        {
          name: 'Bogra',
          nameBn: 'বগুড়া',
          upazilas: ['Bogra Sadar', 'Sariakandi', 'Shajahanpur', 'Sherpur', 'Shibganj']
        }
      ]
    },
    {
      name: 'Khulna',
      nameBn: 'খুলনা',
      districts: [
        {
          name: 'Khulna',
          nameBn: 'খুলনা',
          upazilas: ['Khulna Sadar', 'Sonadanga', 'Daulatpur', 'Rupsha', 'Batiaghata', 'Dacope']
        },
        {
          name: 'Jeshore',
          nameBn: 'যশোর',
          upazilas: ['Jeshore Sadar', 'Jhikargachha', 'Bagherpara', 'Abhaynagar', 'Keshabpur']
        }
      ]
    },
    {
      name: 'Sylhet',
      nameBn: 'সিলেট',
      districts: [
        {
          name: 'Sylhet',
          nameBn: 'সিলেট',
          upazilas: ['Sylhet Sadar', 'Beanibazar', 'Golapganj', 'Zakiganj', 'Jaintiapur', 'Sreemangal']
        }
      ]
    },
    {
      name: 'Barishal',
      nameBn: 'বরিশাল',
      districts: [
        {
          name: 'Barishal',
          nameBn: 'বরিশাল',
          upazilas: ['Barishal Sadar', 'Babuganj', 'Bakerganj', 'Banaripara', 'Gaurnadi']
        }
      ]
    },
    {
      name: 'Rangpur',
      nameBn: 'রংপুর',
      districts: [
        {
          name: 'Rangpur',
          nameBn: 'রংপুর',
          upazilas: ['Rangpur Sadar', 'Badarganj', 'Gangachara', 'Kaunia', 'Mithapukur']
        }
      ]
    },
    {
      name: 'Mymensingh',
      nameBn: 'ময়মনসিংহ',
      districts: [
        {
          name: 'Mymensingh',
          nameBn: 'ময়মনসিংহ',
          upazilas: ['Mymensingh Sadar', 'Bhaluka', 'Gafargaon', 'Gouripur', 'Muktagachha']
        }
      ]
    }
  ]
};

export const translations = {
  en: {
    brandName: 'AB Ecommerce Platform',
    subTitle: 'Premier Multi-Vendor E-Commerce Marketplace in Bangladesh',
    searchPlaceholder: 'Search 1,500+ products, categories, brands...',
    categories: 'Categories',
    allCategories: 'All Categories',
    merchants: 'Verified Sellers',
    cart: 'Cart',
    wishlist: 'Wishlist',
    login: 'Login / Register',
    myAccount: 'My Account',
    adminPanel: 'Admin Portal',
    merchantPanel: 'Merchant Portal',
    customerPanel: 'Customer View',
    switchRole: 'Switch Role:',
    freeDeliveryTag: 'Free Delivery Over ৳2,000 in Dhaka',
    bkashCashback: '10% Cashback on bKash Payment',
    expressDelivery: 'Fast 24-48h Delivery',
    insideDhaka: 'Inside Dhaka (৳60)',
    outsideDhaka: 'Outside Dhaka (৳120)',
    featuredProducts: 'Trending Products in Bangladesh',
    topMerchants: 'Top Merchant Stores',
    shopByCategory: 'Explore Top Categories',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    checkout: 'Proceed to Checkout',
    total: 'Total',
    subtotal: 'Subtotal',
    discount: 'Discount',
    deliveryFee: 'Delivery Fee',
    division: 'Division',
    district: 'District',
    upazila: 'Upazila / Thana',
    selectDivision: 'Select Division',
    selectDistrict: 'Select District',
    selectUpazila: 'Select Upazila',
    streetAddress: 'Street Address & House No.',
    recipientPhone: 'Recipient Phone Number (+880)',
    paymentMethod: 'Payment Method',
    payWithBkash: 'Pay with bKash',
    payWithNagad: 'Pay with Nagad',
    cashOnDelivery: 'Cash on Delivery',
    payWithCard: 'Credit/Debit Card',
    applyCoupon: 'Apply Coupon',
    enterCoupon: 'Enter promo code (e.g. SAVE10)',
    orderSuccess: 'Order Placed Successfully!',
    orderNumber: 'Order Number',
    trackOrder: 'Track Order Status',
    merchantApprovalStatus: 'Merchant Account Status',
    pendingApprovalMsg: 'Your merchant application is currently pending Admin verification (Trade License & NID verification).',
    addProducts: 'Add New Product',
    salesOverview: 'Sales Analytics',
    inventoryAlerts: 'Low Stock Alerts',
    payouts: 'Payout Requests',
    requestPayout: 'Request Withdrawal',
    adminApprovals: 'Merchant & User Moderation',
    databaseSchema: 'Database Schema Viewer',
    apiDocs: 'API Documentation'
  },
  bn: {
    brandName: 'এবি ই-কমার্স প্ল্যাটফর্ম',
    subTitle: 'বাংলাদেশের সেরা মাল্টি-ভেন্ডার অনলাইন মার্কেটপ্লেস',
    searchPlaceholder: '১,৫০০+ পণ্য, দোকান ও ক্যাটাগরি খুঁজুন...',
    categories: 'ক্যাটাগরি সমূহ',
    allCategories: 'সকল ক্যাটাগরি',
    merchants: 'যাচাইকৃত বিক্রেতা',
    cart: 'কার্ট',
    wishlist: 'উইশলিস্ট',
    login: 'লগইন / রেজিস্ট্রেশন',
    myAccount: 'আমার অ্যাকাউন্ট',
    adminPanel: 'এডমিন পোর্টাল',
    merchantPanel: 'মার্চেন্ট পোর্টাল',
    customerPanel: 'গ্রাহক ভিউ',
    switchRole: 'রোল পরিবর্তন:',
    freeDeliveryTag: 'ঢাকায় ৳২,০০০+ অর্ডারে ফ্রি ডেলিভারি',
    bkashCashback: 'বিকাশ পেমেন্টে ১০% ক্যাশব্যাক',
    expressDelivery: '২৪-৪৮ ঘণ্টার দ্রুত ডেলিভারি',
    insideDhaka: 'ঢাকার ভেতরে (৳৬০)',
    outsideDhaka: 'ঢাকার বাইরে (৳১২০)',
    featuredProducts: 'বাংলাদেশের ট্রেন্ডিং পণ্যসমূহ',
    topMerchants: 'শীর্ষ মার্চেন্ট স্টোর',
    shopByCategory: 'ক্যাটাগরি অনুযায়ী কেনাকাটা',
    addToCart: 'কার্টে যোগ করুন',
    buyNow: 'এখনই কিনুন',
    checkout: 'চেকআউট করুন',
    total: 'সর্বমোট',
    subtotal: 'সাবটোটাল',
    discount: 'ছাড়',
    deliveryFee: 'ডেলিভারি চার্জ',
    division: 'বিভাগ',
    district: 'জেলা',
    upazila: 'উপজেলা / থানা',
    selectDivision: 'বিভাগ নির্বাচন করুন',
    selectDistrict: 'জেলা নির্বাচন করুন',
    selectUpazila: 'উপজেলা নির্বাচন করুন',
    streetAddress: 'রাস্তা ও বাসা নং',
    recipientPhone: 'প্রাপকের মোবাইল নম্বর (+৮৮০)',
    paymentMethod: 'পেমেন্ট মেথড',
    payWithBkash: 'বিকাশ দিয়ে পেমেন্ট',
    payWithNagad: 'নগদ দিয়ে পেমেন্ট',
    cashOnDelivery: 'ক্যাশ অন ডেলিভারি (COD)',
    payWithCard: 'কার্ড পেমেন্ট',
    applyCoupon: 'কুপন প্রয়োগ করুন',
    enterCoupon: 'প্রোমো কোড দিন (যেমন: SAVE10)',
    orderSuccess: 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!',
    orderNumber: 'অর্ডার নম্বর',
    trackOrder: 'অর্ডার ট্র্যাকিং',
    merchantApprovalStatus: 'মার্চেন্ট অ্যাকাউন্ট স্ট্যাটাস',
    pendingApprovalMsg: 'আপনার মার্চেন্ট আবেদন এডমিন যাচাইয়ের (ট্রেড লাইসেন্স ও এনআইডি) অপেক্ষায় রয়েছে।',
    addProducts: 'নতুন পণ্য যোগ করুন',
    salesOverview: 'বিক্রি এনালিটিক্স',
    inventoryAlerts: 'কম স্টকের সতর্কতা',
    payouts: 'উত্তোলনের আবেদন',
    requestPayout: 'টাকা উত্তোলনের আবেদন',
    adminApprovals: 'মার্চেন্ট ও ব্যবহারকারী মডারেশন',
    databaseSchema: 'ডাটাবেস স্কিমা ভিউয়ার',
    apiDocs: 'এপিআই ডকুমেন্টেশন'
  }
};
