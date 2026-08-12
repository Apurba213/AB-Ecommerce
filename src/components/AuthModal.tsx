import React, { useState } from 'react';
import { X, User, Lock, Phone, Mail, MapPin, ShieldCheck, Store, ShoppingBag, CheckCircle2, Sparkles, ArrowRight, UserPlus, LogIn, KeyRound, Check, FileText, Landmark, Award, Zap, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole, userDetails?: any) => void;
  lang?: 'en' | 'bn';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  lang = 'en'
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>('customer');

  // Common Form Fields
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('01712345678');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('Dhanmondi, Dhaka');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // Role Specific Fields
  // Merchant
  const [storeName, setStoreName] = useState('');
  const [tradeLicense, setTradeLicense] = useState('');
  const [payoutAccount, setPayoutAccount] = useState('01711223344');
  
  // Admin
  const [adminPasskey, setAdminPasskey] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  // Quick Demo Login Handler
  const handleQuickDemoLogin = (targetRole: UserRole) => {
    setRole(targetRole);
    setIsSubmitting(true);

    let demoName = 'Apurba Barua';
    let demoAddress = 'Dhanmondi, Dhaka';
    if (targetRole === 'merchant') {
      demoName = 'Apurba Electronics BD';
      demoAddress = 'GEC Circle, Chittagong';
    } else if (targetRole === 'admin') {
      demoName = 'Platform Admin (Superuser)';
      demoAddress = 'AB Tower, Gulshan 2, Dhaka';
    }

    const userObj = {
      name: demoName,
      mobile: '01712345678',
      email: `${targetRole}@amardokan.bd`,
      address: demoAddress,
      role: targetRole
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setLoggedInUser(userObj);
      setIsSuccess(true);

      setTimeout(() => {
        onLoginSuccess(targetRole, userObj);
        onClose();
        setIsSuccess(false);
      }, 2200);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userObj = {
      name: fullName || (storeName ? storeName : (mode === 'login' ? 'Apurba Barua' : 'New Member')),
      mobile,
      email: email || `${role}@amardokan.bd`,
      address,
      role,
      tradeLicense,
      payoutAccount
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setLoggedInUser(userObj);
      setIsSuccess(true);

      setTimeout(() => {
        onLoginSuccess(role, userObj);
        onClose();
        setIsSuccess(false);
      }, 2200);
    }, 1200);
  };

  const getRoleTitle = (r: UserRole) => {
    switch (r) {
      case 'customer': return 'Customer Shopper Account';
      case 'merchant': return 'Merchant / Verified Store Owner';
      case 'admin': return 'Platform System Administrator';
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd || pwd.length < 4) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (pwd.length < 8) return { score: 2, label: 'Medium', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const pwdStrength = getPasswordStrength(password);

  // Role Theme Color Classes
  const getRoleTheme = () => {
    switch (role) {
      case 'customer':
        return {
          glowFrom: 'from-[#d4af37]/30',
          glowTo: 'to-amber-500/10',
          borderAccent: 'via-[#d4af37]',
          badgeBg: 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/50',
          buttonGradient: 'from-[#d4af37] via-amber-400 to-[#d4af37] text-black shadow-yellow-950/50',
          activeTab: 'bg-[#d4af37] text-black'
        };
      case 'merchant':
        return {
          glowFrom: 'from-[#E2136E]/30',
          glowTo: 'to-pink-600/10',
          borderAccent: 'via-[#E2136E]',
          badgeBg: 'bg-[#E2136E]/20 text-[#E2136E] border-[#E2136E]/50',
          buttonGradient: 'from-[#E2136E] via-pink-500 to-[#E2136E] text-white shadow-pink-950/50',
          activeTab: 'bg-[#E2136E] text-white'
        };
      case 'admin':
        return {
          glowFrom: 'from-emerald-500/30',
          glowTo: 'to-teal-600/10',
          borderAccent: 'via-emerald-400',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
          buttonGradient: 'from-emerald-400 via-teal-400 to-emerald-500 text-black shadow-emerald-950/50',
          activeTab: 'bg-emerald-400 text-black'
        };
    }
  };

  const theme = getRoleTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      
      {/* Glassmorphic Container with 3D Depth */}
      <div className="relative w-full max-w-lg bg-black/80 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden transform-gpu backdrop-blur-2xl my-8">
        
        {/* Ambient 3D Neon Glow Spheres tailored to role */}
        <div className={`absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br ${theme.glowFrom} ${theme.glowTo} rounded-full blur-3xl pointer-events-none animate-pulse`} />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Metallic Glass Edge */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${theme.borderAccent} to-transparent`} />

        {/* Top Header Bar with Back Button & Close */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 relative z-20">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/15 transition cursor-pointer hover:scale-105 active:scale-95"
          >
            <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] rotate-180" />
            <span>← Back to Store</span>
          </button>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* SMART 3D SUCCESSFUL ANIMATION SCREEN */
          <div className="py-8 text-center space-y-6 animate-in zoom-in-90 duration-500 relative z-10">
            
            {/* 3D Rotating Logo Badge */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center perspective-1000">
              
              {/* Spinning Halo */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#d4af37] via-amber-300 to-[#E2136E] animate-spin opacity-90 blur-md" />
              
              {/* Glass Monogram Core */}
              <div className="absolute inset-1.5 rounded-2xl bg-black/90 backdrop-blur-md flex flex-col items-center justify-center border-2 border-amber-300/60 shadow-2xl transform-gpu rotate-y-12 hover:rotate-y-0 transition-transform duration-500">
                <span className="font-serif font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-amber-200 to-white tracking-widest drop-shadow-[0_2px_12px_rgba(212,175,55,0.9)]">
                  AB
                </span>
                <span className="text-[9px] font-black text-amber-300 uppercase tracking-widest -mt-1">
                  VERIFIED
                </span>
              </div>

              {/* Success Badge Floating Icon */}
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black p-2 rounded-full shadow-2xl shadow-emerald-950 animate-bounce">
                <CheckCircle2 className="w-6 h-6 stroke-[3]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg border ${theme.badgeBg}`}>
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>{mode === 'login' ? 'Authentication Successful' : 'Account Created Successfully'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                Welcome, {loggedInUser?.name || 'Member'}!
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300">
                Access granted to <strong className="text-white">{getRoleTitle(role)}</strong>
              </p>
            </div>

            {/* Credentials Summary Card */}
            <div className="bg-black/60 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-left space-y-2 text-xs font-mono text-slate-300 max-w-sm mx-auto shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Account Type:</span>
                <span className="text-emerald-400 font-bold uppercase">{role}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Mobile / Contact:</span>
                <span className="text-white font-bold">{loggedInUser?.mobile}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-[#d4af37] font-bold">{loggedInUser?.address}</span>
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-amber-200/90 font-mono animate-pulse">
              ⚡ Launching {role.toUpperCase()} workspace dashboard...
            </div>
          </div>
        ) : (
          /* WONDERFUL LOGIN & ACCOUNT CREATION FORM */
          <div className="space-y-5 relative z-10">
            
            {/* Header Brand */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37] via-amber-300 to-[#E2136E] rounded-2xl flex items-center justify-center mx-auto text-black font-serif font-black text-2xl shadow-xl shadow-yellow-950/50 border border-amber-200/50">
                AB
              </div>
              <h2 className="text-2xl font-serif font-black text-white tracking-tight">
                AB Ecommerce Portal
              </h2>
              <p className="text-xs text-slate-400">
                Unified Portal for Customers, Merchants & Admins
              </p>
            </div>

            {/* Quick 1-Click Demo Login Bar */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 text-center space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
                <Zap className="w-3 h-3 text-[#d4af37]" />
                <span>1-Click Instant Demo Access:</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('customer')}
                  className="py-1.5 px-2 bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl text-[11px] font-bold transition cursor-pointer"
                >
                  Customer Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('merchant')}
                  className="py-1.5 px-2 bg-pink-500/15 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 rounded-xl text-[11px] font-bold transition cursor-pointer"
                >
                  Seller Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('admin')}
                  className="py-1.5 px-2 bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-[11px] font-bold transition cursor-pointer"
                >
                  Admin Demo
                </button>
              </div>
            </div>

            {/* Mode Toggle: Sign In vs Create Account */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-black/60 backdrop-blur-md rounded-2xl border border-white/15">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'login'
                    ? 'bg-gradient-to-r from-[#d4af37] to-amber-400 text-black shadow-lg shadow-yellow-950/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('register')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'register'
                    ? 'bg-gradient-to-r from-[#E2136E] to-pink-500 text-white shadow-lg shadow-pink-950/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </button>
            </div>

            {/* Role Selector Pill */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Account Role:
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-black/40 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    role === 'customer'
                      ? 'bg-[#d4af37] text-black shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Customer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('merchant')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    role === 'merchant'
                      ? 'bg-[#E2136E] text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Seller</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    role === 'admin'
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Registration Specific Fields */}
              {mode === 'register' && (
                <>
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition"
                      placeholder="e.g. Apurba Barua"
                    />
                  </div>

                  {/* Merchant Specific Registration Inputs */}
                  {role === 'merchant' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-pink-950/20 border border-pink-500/20 rounded-2xl">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                          <Store className="w-3.5 h-3.5 text-[#E2136E]" />
                          <span>Store Name *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                          className="w-full bg-black/60 border border-pink-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-400"
                          placeholder="e.g. Barua Gadgets"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-pink-400" />
                          <span>Trade License No.</span>
                        </label>
                        <input
                          type="text"
                          value={tradeLicense}
                          onChange={(e) => setTradeLicense(e.target.value)}
                          className="w-full bg-black/60 border border-pink-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-400"
                          placeholder="TL-2026-BD"
                        />
                      </div>
                    </div>
                  )}

                  {/* Admin Specific Passkey Input */}
                  {role === 'admin' && (
                    <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl space-y-1">
                      <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Platform Master Admin Passkey *</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={adminPasskey}
                        onChange={(e) => setAdminPasskey(e.target.value)}
                        className="w-full bg-black/60 border border-emerald-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                        placeholder="Enter AB-ADMIN-2026 Key"
                      />
                    </div>
                  )}

                  {/* Address & District */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      <span>Delivery Address & District *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-400 transition"
                      placeholder="e.g. House 12, Road 4, Dhanmondi, Dhaka"
                    />
                  </div>
                </>
              )}

              {/* Mobile Number */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mobile Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 transition"
                  placeholder="017xxxxxxxx"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>Email Address {mode === 'login' ? '(Optional)' : '*'}</span>
                </label>
                <input
                  type="email"
                  required={mode === 'register'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 transition"
                  placeholder="user@example.com"
                />
              </div>

              {/* Password & Strength Meter */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Password *</span>
                  </label>
                  {mode === 'register' && (
                    <span className="text-[10px] text-slate-400">
                      Strength: <strong className="text-white">{pwdStrength.label}</strong>
                    </span>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                  placeholder="••••••••"
                />

                {/* Password Strength Bar */}
                {mode === 'register' && (
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex gap-1 mt-1">
                    <div className={`h-full flex-1 transition-all ${pwdStrength.score >= 1 ? pwdStrength.color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 transition-all ${pwdStrength.score >= 2 ? pwdStrength.color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 transition-all ${pwdStrength.score >= 3 ? pwdStrength.color : 'bg-transparent'}`} />
                  </div>
                )}
              </div>

              {/* Remember Me & Terms */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/20 bg-black/50 text-[#d4af37] focus:ring-0"
                  />
                  <span>Keep me signed in</span>
                </label>
                <span className="text-slate-500 hover:text-slate-300 cursor-pointer">Forgot password?</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 bg-gradient-to-r ${theme.buttonGradient} font-extrabold text-sm rounded-xl shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/20 mt-2`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin text-black" />
                    {mode === 'login' ? 'Authenticating...' : 'Creating Account...'}
                  </span>
                ) : (
                  <>
                    <span>
                      {mode === 'login' ? `Sign In to ${role.toUpperCase()} Workspace` : `Create ${role.toUpperCase()} Account`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

