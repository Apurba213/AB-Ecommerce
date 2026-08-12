import React, { useState } from 'react';
import { CartItem, Order, PaymentMethod, Address } from '../types';
import { bangladeshLocations, translations } from '../data/bangladeshData';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ShieldCheck, MapPin, CreditCard, ArrowRight, Smartphone, AlertCircle, Sparkles, Truck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: CartItem[];
  items?: CartItem[];
  discountAmount?: number;
  couponCode?: string;
  onOrderSuccess?: (order: Order) => void;
  onOrderComplete?: (order: Order) => void;
  settings?: any;
  lang?: 'en' | 'bn';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  items,
  discountAmount = 0,
  couponCode,
  onOrderSuccess,
  onOrderComplete,
  lang = 'en'
}) => {
  if (!isOpen) return null;

  const currentLang = lang || 'en';
  const t = translations[currentLang] || translations.en;
  const activeCartItems = cartItems || items || [];
  const handleSuccess = (order: Order) => {
    if (onOrderSuccess) onOrderSuccess(order);
    if (onOrderComplete) onOrderComplete(order);
  };

  // Address Form State
  const [recipientName, setRecipientName] = useState('Rahim Uddin');
  const [phone, setPhone] = useState('01755554444');
  const [email, setEmail] = useState('rahim.dhaka@gmail.com');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [upazila, setUpazila] = useState('Dhanmondi');
  const [streetAddress, setStreetAddress] = useState('House 42, Road 7A, Dhanmondi, Dhaka');
  const [notes, setNotes] = useState('');

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');

  // Interactive Payment Gateway Modal Simulation
  const [activeGateway, setActiveGateway] = useState<'none' | 'bkash' | 'nagad' | 'card'>('none');
  
  // Gateway Form Fields
  const [accountNumber, setAccountNumber] = useState('01755554444');
  const [otp, setOtp] = useState('123456');
  const [pin, setPin] = useState('1234');
  const [gatewayStep, setGatewayStep] = useState<'mobile' | 'otp' | 'pin'>('mobile');
  const [gatewayError, setGatewayError] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Placed Order Result State
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Calculated Totals
  const subtotal = activeCartItems.reduce((acc, item) => {
    const p = item.selectedVariant ? item.selectedVariant.price : item.product.price;
    return acc + p * item.quantity;
  }, 0);

  const deliveryFee = division === 'Dhaka' ? 60 : 120;
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Division selection helper
  const selectedDivData = bangladeshLocations.divisions.find(d => d.name === division) || bangladeshLocations.divisions[0];
  const selectedDistData = selectedDivData.districts.find(d => d.name === district) || selectedDivData.districts[0];

  const handleDivisionChange = (divName: string) => {
    setDivision(divName);
    const divObj = bangladeshLocations.divisions.find(d => d.name === divName);
    if (divObj && divObj.districts.length > 0) {
      setDistrict(divObj.districts[0].name);
      setUpazila(divObj.districts[0].upazilas[0] || '');
    }
  };

  const handleDistrictChange = (distName: string) => {
    setDistrict(distName);
    const distObj = selectedDivData.districts.find(d => d.name === distName);
    if (distObj && distObj.upazilas.length > 0) {
      setUpazila(distObj.upazilas[0]);
    }
  };

  // Submit Handler for placing order
  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !phone || !streetAddress) {
      alert('Please fill out all required address fields.');
      return;
    }

    if (paymentMethod === 'bkash') {
      setActiveGateway('bkash');
      setGatewayStep('mobile');
    } else if (paymentMethod === 'nagad') {
      setActiveGateway('nagad');
      setGatewayStep('mobile');
    } else {
      // Cash on Delivery
      executeCompleteOrder('COD_HANDOVER_VERIFIED');
    }
  };

  const executeCompleteOrder = (trxId?: string) => {
    setIsProcessingPayment(true);

    const shippingAddress: Address = {
      id: `addr_${Date.now()}`,
      recipientName,
      phone,
      division,
      district,
      upazila,
      fullAddress: `${streetAddress}, ${upazila}, ${district}, ${division}`
    };

    const orderItems = activeCartItems.map((item, idx) => ({
      id: `item_${Date.now()}_${idx}`,
      productId: item.product.id,
      merchantId: item.product.merchantId,
      productTitle: item.product.title,
      productImage: item.product.images[0],
      variantName: item.selectedVariant?.name || item.variantName,
      unitPrice: item.selectedVariant ? item.selectedVariant.price : item.product.price,
      quantity: item.quantity,
      totalPrice: (item.selectedVariant ? item.selectedVariant.price : item.product.price) * item.quantity
    }));

    setTimeout(() => {
      const newOrder: Order = {
        id: `ord_bd_${Date.now()}`,
        orderNumber: `BD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        customerId: 'usr_customer_1',
        customerName: recipientName,
        customerPhone: phone,
        customerEmail: email,
        shippingAddress,
        items: orderItems,
        subtotal,
        discountAmount,
        deliveryFee,
        totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        paymentTrxId: trxId,
        orderStatus: 'placed',
        couponCode,
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setPlacedOrder(newOrder);
      setIsProcessingPayment(false);
      setActiveGateway('none');
      handleSuccess(newOrder);

      // Trigger Confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0d0d0d] text-white w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative my-4 sm:my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-3 sm:p-5 border-b border-white/10 bg-[#050505] flex items-center justify-between gap-2 z-20 sticky top-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/15 transition cursor-pointer hover:scale-105 active:scale-95"
            >
              <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] rotate-180" />
              <span>← Back</span>
            </button>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-white">
                {placedOrder ? 'Order Placement Confirmed' : 'Checkout & Payment'}
              </h2>
              <p className="text-[11px] text-slate-400 hidden sm:block">Fast delivery across 64 Districts in Bangladesh</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-slate-300 transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ORDER CONFIRMED SCREEN */}
        {placedOrder ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#E2136E] bg-pink-950/40 border border-[#E2136E]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                {placedOrder.paymentMethod.toUpperCase()} PAYMENT {placedOrder.paymentStatus === 'paid' ? 'SUCCESSFUL' : 'PENDING'}
              </span>
              <h3 className="text-2xl font-serif font-black text-white mt-3">
                {t.orderSuccess}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {t.orderNumber}: <strong className="text-[#d4af37] font-mono font-extrabold">{placedOrder.orderNumber}</strong>
              </p>
            </div>

            <div className="p-4 bg-[#121212] rounded-2xl border border-white/10 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="font-mono font-bold text-emerald-400">{placedOrder.paymentTrxId || 'N/A (COD)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Delivery Address:</span>
                <span className="font-semibold text-slate-200 text-right">{placedOrder.shippingAddress.fullAddress}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-sm text-white">
                <span>Total Amount Paid:</span>
                <span className="text-[#d4af37] font-mono font-black">৳ {placedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-[#E2136E] hover:bg-[#c80f5f] text-white font-extrabold text-sm rounded-2xl shadow-lg transition cursor-pointer"
            >
              Done & Return to Shopping
            </button>
          </div>
        ) : (

          /* CHECKOUT FORM */
          <form onSubmit={handleInitiatePayment} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Step 1: Recipient & Address */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                1. Delivery Address in Bangladesh
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Phone Number (+880) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Division -> District -> Upazila Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">{t.division} *</label>
                  <select
                    value={division}
                    onChange={(e) => handleDivisionChange(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {bangladeshLocations.divisions.map((d) => (
                      <option key={d.name} value={d.name}>
                        {lang === 'bn' ? d.nameBn : d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">{t.district} *</label>
                  <select
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {selectedDivData.districts.map((dst) => (
                      <option key={dst.name} value={dst.name}>
                        {lang === 'bn' ? dst.nameBn : dst.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">{t.upazila} *</label>
                  <select
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {selectedDistData.upazilas.map((upz) => (
                      <option key={upz} value={upz}>{upz}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Full Street Address / House No. *</label>
                <input
                  type="text"
                  required
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="House #, Road #, Sector / Area"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Step 2: Select Payment Method */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#d4af37]" />
                2. Select Payment Method
              </h3>

              <div className="grid grid-cols-3 gap-2.5">
                
                {/* bKash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                    paymentMethod === 'bkash'
                      ? 'border-[#E2136E] bg-pink-950/40 text-white ring-2 ring-pink-500/20 font-bold'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <span className="w-7 h-7 rounded-full bg-[#E2136E] text-white flex items-center justify-center font-black text-xs">
                    b
                  </span>
                  <span className="text-xs">bKash</span>
                  <span className="text-[10px] bg-[#E2136E]/20 text-pink-300 border border-[#E2136E]/30 px-1.5 py-0.5 rounded font-bold">
                    10% Cashback
                  </span>
                </button>

                {/* Nagad */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                    paymentMethod === 'nagad'
                      ? 'border-[#F7931E] bg-amber-950/40 text-white ring-2 ring-amber-500/20 font-bold'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <span className="w-7 h-7 rounded-full bg-[#F7931E] text-white flex items-center justify-center font-black text-xs">
                    N
                  </span>
                  <span className="text-xs">Nagad</span>
                  <span className="text-[10px] bg-[#F7931E]/20 text-amber-300 border border-[#F7931E]/30 px-1.5 py-0.5 rounded font-bold">
                    Instant Gateway
                  </span>
                </button>

                {/* COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-500 bg-emerald-950/40 text-white ring-2 ring-emerald-500/20 font-bold'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <Truck className="w-6 h-6 text-emerald-400" />
                  <span className="text-xs">Cash on Delivery</span>
                </button>

              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 bg-[#121212] rounded-2xl border border-white/10 text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal:</span>
                <span className="font-bold text-white font-mono">৳ {subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold font-mono">
                  <span>Promo Discount:</span>
                  <span>-৳ {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Shipping ({division === 'Dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}):</span>
                <span className="font-bold text-white font-mono">৳ {deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/10">
                <span>Total Payable:</span>
                <span className="text-[#d4af37] text-base font-mono font-black">৳ {totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#E2136E] hover:bg-[#c80f5f] text-white rounded-2xl font-black text-sm shadow-xl shadow-pink-950/50 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Pay ৳{totalAmount.toLocaleString()} via {paymentMethod.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

        {/* B KASH INTERACTIVE GATEWAY SIMULATOR MODAL */}
        {activeGateway === 'bkash' && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-pink-200 animate-in zoom-in-95 duration-150">
              {/* bKash Header */}
              <div className="bg-[#D12053] text-white p-4 text-center relative">
                <div className="w-10 h-10 bg-white text-[#D12053] font-black text-xl rounded-2xl flex items-center justify-center mx-auto mb-1">
                  b
                </div>
                <h3 className="font-black text-base">bKash Payment Gateway</h3>
                <p className="text-[11px] text-pink-100">Merchant: AmarDokan BD • Merchant ShortCode: 01700008899</p>
                <p className="text-xs font-bold text-amber-300 mt-1">Amount: ৳ {totalAmount.toLocaleString()}</p>
                
                <button
                  onClick={() => setActiveGateway('none')}
                  className="absolute top-3 right-3 text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* bKash Body */}
              <div className="p-6 space-y-4">
                {gatewayStep === 'mobile' && (
                  <>
                    <p className="text-xs text-slate-700 font-medium">Enter your bKash Account Number:</p>
                    <input
                      type="tel"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-center text-sm font-bold tracking-wider text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setGatewayStep('otp')}
                      className="w-full py-3 bg-[#D12053] text-white font-extrabold text-xs rounded-xl shadow cursor-pointer"
                    >
                      CONFIRM
                    </button>
                  </>
                )}

                {gatewayStep === 'otp' && (
                  <>
                    <p className="text-xs text-slate-700 font-medium text-center">Enter verification code sent to {accountNumber}:</p>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-center text-base font-mono font-bold tracking-widest text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setGatewayStep('pin')}
                      className="w-full py-3 bg-[#D12053] text-white font-extrabold text-xs rounded-xl shadow cursor-pointer"
                    >
                      VERIFY OTP
                    </button>
                  </>
                )}

                {gatewayStep === 'pin' && (
                  <>
                    <p className="text-xs text-slate-700 font-medium text-center">Enter 4-digit bKash PIN:</p>
                    <input
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="••••"
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-center text-xl font-mono font-bold tracking-widest text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => executeCompleteOrder(`BKASH_TRX_${Math.random().toString(36).substring(2, 8).toUpperCase()}`)}
                      disabled={isProcessingPayment}
                      className="w-full py-3 bg-[#D12053] text-white font-extrabold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isProcessingPayment ? 'AUTHORIZING TRANSACTION...' : 'EXECUTE PAYMENT'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* NAGAD INTERACTIVE GATEWAY SIMULATOR MODAL */}
        {activeGateway === 'nagad' && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-amber-200 animate-in zoom-in-95 duration-150">
              {/* Nagad Header */}
              <div className="bg-[#F7931E] text-white p-4 text-center relative">
                <div className="w-10 h-10 bg-white text-[#F7931E] font-black text-xl rounded-2xl flex items-center justify-center mx-auto mb-1">
                  N
                </div>
                <h3 className="font-black text-base">Nagad Payment Gateway</h3>
                <p className="text-[11px] text-amber-100">Merchant ID: NGD_MERCHANT_BD_9921</p>
                <p className="text-xs font-bold text-slate-900 mt-1">Amount: ৳ {totalAmount.toLocaleString()}</p>
                
                <button
                  onClick={() => setActiveGateway('none')}
                  className="absolute top-3 right-3 text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nagad Body */}
              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-700 font-medium">Enter Nagad Mobile Account:</p>
                <input
                  type="tel"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-center text-sm font-bold tracking-wider text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => executeCompleteOrder(`NGD_TRX_${Math.random().toString(36).substring(2, 8).toUpperCase()}`)}
                  disabled={isProcessingPayment}
                  className="w-full py-3 bg-[#F7931E] text-white font-extrabold text-xs rounded-xl shadow cursor-pointer"
                >
                  {isProcessingPayment ? 'VERIFYING WITH NAGAD...' : 'PAY NOW VIA NAGAD'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
