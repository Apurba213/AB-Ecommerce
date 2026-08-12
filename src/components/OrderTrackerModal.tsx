import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { X, Search, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin, ArrowLeft } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  if (!isOpen) return null;

  const [searchNum, setSearchNum] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    orders.length > 0 ? orders[0] : null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(o => o.orderNumber.toLowerCase() === searchNum.trim().toLowerCase() || o.id === searchNum.trim());
    if (found) {
      setSelectedOrder(found);
    } else {
      alert('Order reference not found in active records.');
    }
  };

  const statusSteps: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'placed', label: 'Order Placed', desc: 'Customer placed order' },
    { status: 'confirmed', label: 'Merchant Approved', desc: 'Vendor confirmed inventory' },
    { status: 'processing', label: 'Packing & Quality Check', desc: 'Item being packed' },
    { status: 'shipped', label: 'In Transit / Courier', desc: 'Handed to courier team' },
    { status: 'delivered', label: 'Delivered', desc: 'Successfully received' }
  ];

  const getStepIndex = (st: OrderStatus) => {
    switch (st) {
      case 'placed': return 0;
      case 'confirmed': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentIdx = selectedOrder ? getStepIndex(selectedOrder.orderStatus) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0d0d0d] text-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative my-4 sm:my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-3 sm:p-5 border-b border-white/10 bg-[#050505] flex items-center justify-between gap-2 z-20 sticky top-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/15 transition cursor-pointer hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>← Back</span>
            </button>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#E2136E]" />
              <h2 className="font-extrabold text-xs sm:text-base text-white">
                Express Order Tracker
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 transition cursor-pointer" title="Close">
            <X className="w-5 h-5" />
          </button>
        </div>


        <div className="p-6 space-y-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchNum}
              onChange={(e) => setSearchNum(e.target.value)}
              placeholder="Enter Order Number (e.g., BD-2026-8911)"
              className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4af37]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#d4af37] hover:bg-amber-400 text-black font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {/* Active Orders List Quick Selector */}
          {orders.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] text-slate-400 font-bold self-center">Your Orders:</span>
              {orders.map((ord) => (
                <button
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition cursor-pointer whitespace-nowrap ${
                    selectedOrder?.id === ord.id
                      ? 'bg-[#E2136E]/20 border-[#E2136E] text-white'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {ord.orderNumber}
                </button>
              ))}
            </div>
          )}

          {/* Selected Order Timeline Display */}
          {selectedOrder ? (
            <div className="space-y-6 border-t border-white/10 pt-4">
              
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#121212] p-3.5 rounded-2xl border border-white/10">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Order No.</span>
                  <p className="font-extrabold text-sm text-white font-mono">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Payment Method</span>
                  <p className="font-bold text-xs text-slate-200 uppercase">{selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total</span>
                  <p className="font-mono font-black text-sm text-[#d4af37]">৳ {selectedOrder.totalAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="relative py-2">
                <div className="space-y-6">
                  {statusSteps.map((step, idx) => {
                    const isCompleted = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={step.status} className="flex items-start gap-3 relative">
                        {idx < statusSteps.length - 1 && (
                          <div
                            className={`absolute left-3.5 top-7 w-0.5 h-8 -ml-px ${
                              idx < currentIdx ? 'bg-emerald-500' : 'bg-white/10'
                            }`}
                          />
                        )}

                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs z-10 transition ${
                            isCompleted
                              ? 'bg-emerald-500 text-black'
                              : 'bg-white/10 text-slate-500'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>

                        <div>
                          <h4 className={`text-xs font-bold ${isCurrent ? 'text-[#d4af37] text-sm' : isCompleted ? 'text-white' : 'text-slate-500'}`}>
                            {step.label}
                          </h4>
                          <p className="text-[11px] text-slate-400">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items List */}
              <div className="p-3 bg-[#121212] border border-white/10 rounded-xl space-y-2">
                <h4 className="font-bold text-xs text-slate-300">Items in this shipment:</h4>
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs text-slate-200">
                    <span className="truncate max-w-[250px]">{item.productTitle} x {item.quantity}</span>
                    <span className="font-mono font-bold text-[#d4af37]">৳ {item.totalPrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <p className="text-xs text-center text-slate-500 py-6">No order selected.</p>
          )}

        </div>
      </div>
    </div>
  );
};
