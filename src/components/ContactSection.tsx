import React, { useState } from 'react';
import { Mail, Phone, MapPin, User, Send, CheckCircle2, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.address || !formData.message) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      mobile: '',
      address: '',
      email: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact-section" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black/90">
      {/* 3D Glassmorphism Background Ambient Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#d4af37]/10 via-[#E2136E]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
        {/* Scalable Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] rounded-full text-xs font-black uppercase tracking-wider shadow-lg shadow-yellow-950/20">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span>24/7 Fast Customer & Merchant Support</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
              Drop a Message
            </span>
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Have a question about orders, products, or merchant verification? Send us your message and our support team will respond promptly.
          </p>
        </div>

        {/* Scalable Glassmorphism Form Container */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_16px_40px_0_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-white/25 transition-all duration-500">
          
          {/* Top Glass Highlight Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />

          {isSubmitted ? (
            <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-xl animate-pulse" />
                <div className="relative w-full h-full bg-black/80 backdrop-blur-md border border-emerald-500/50 text-emerald-400 rounded-2xl flex items-center justify-center shadow-2xl">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-black text-white">Message Delivered Successfully!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you <span className="text-[#d4af37] font-bold">{formData.name}</span>. Your inquiry has been logged and sent directly to management.
                </p>
              </div>

              {/* Submitted Details Summary Card */}
              <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-left space-y-2.5 text-xs text-slate-300 max-w-lg mx-auto">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#d4af37]" />
                  <span><strong className="text-slate-400">Sender Name:</strong> {formData.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span><strong className="text-slate-400">Mobile Number:</strong> {formData.mobile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span><strong className="text-slate-400">Address:</strong> {formData.address}</span>
                </div>
                {formData.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span><strong className="text-slate-400">Email:</strong> {formData.email}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 text-slate-200">
                  <strong className="text-slate-400">Message Content:</strong>
                  <p className="mt-1 text-slate-300 italic bg-white/5 p-3 rounded-xl border border-white/5">
                    "{formData.message}"
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all duration-300 cursor-pointer border border-white/20 shadow-lg hover:scale-105"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Responsive 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/40 backdrop-blur-md border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017xxxxxxxx"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full bg-black/40 backdrop-blur-md border border-white/15 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  <span>Your Address & District *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House 14, Road 5, Dhanmondi, Dhaka"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-black/40 backdrop-blur-md border border-white/15 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                />
              </div>

              {/* Email (Optional) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>Email Address (Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/40 backdrop-blur-md border border-white/15 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span>Your Message / Support Request *</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black/40 backdrop-blur-md border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-all resize-none shadow-inner"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 bg-gradient-to-r from-[#d4af37] via-amber-400 to-[#d4af37] hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm sm:text-base rounded-2xl shadow-2xl shadow-yellow-950/50 hover:shadow-yellow-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 border border-amber-200/50"
              >
                {isSending ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 animate-spin text-black" />
                    Sending Message...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    <span>Send Message Now</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
