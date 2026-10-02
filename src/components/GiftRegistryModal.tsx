import React, { useState } from 'react';
import {
  X,
  Gift,
  Copy,
  Check,
  CreditCard,
  QrCode,
  Heart,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  Plane,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GiftRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGuestbook: () => void;
}

export const GiftRegistryModal: React.FC<GiftRegistryModalProps> = ({
  isOpen,
  onClose,
  onOpenGuestbook,
}) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'banking' | 'registry'>('banking');

  if (!isOpen) return null;

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(id);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch {
      setCopiedAccount(id);
      setTimeout(() => setCopiedAccount(null), 2000);
    }
  };

  const bankOptions = [
    {
      id: 'aba-usd',
      bankName: 'ABA Bank (KHQR / USD)',
      accountName: 'PONLEU & MEYJING',
      accountNumber: '001 829 402',
      currency: 'USD ($)',
      color: 'from-[#004f71] to-[#01354c]',
      badge: 'Most Popular',
    },
    {
      id: 'aba-khr',
      bankName: 'ABA Bank (KHQR / KHR)',
      accountName: 'PONLEU & MEYJING',
      accountNumber: '001 829 403',
      currency: 'KHR (៛)',
      color: 'from-[#006080] to-[#004258]',
      badge: 'Khmer Riel',
    },
    {
      id: 'acleda',
      bankName: 'ACLEDA Bank Plc',
      accountName: 'PONLEU & MEYJING',
      accountNumber: '1200-8899-4455',
      currency: 'USD / KHR',
      color: 'from-[#154c79] to-[#0f3453]',
      badge: 'Local Transfer',
    },
  ];

  const registryItems = [
    {
      id: 'honeymoon',
      icon: Plane,
      title: 'Honeymoon Journey Fund',
      subtitle: 'Siem Reap & Island Getaway',
      description: 'Contribute toward our romantic sunset dinner and island retreat memories.',
      status: 'Open for Blessings',
      tag: 'Experience',
    },
    {
      id: 'home',
      icon: Home,
      title: 'New Home & Living Registry',
      subtitle: 'Home Decor & Kitchen Appliances',
      description: 'Placeholder wishlist for cozy home furnishings and kitchen essentials.',
      status: 'View Wishlist',
      tag: 'Home',
    },
    {
      id: 'giftcard',
      icon: ShoppingBag,
      title: 'Aeon Mall Phnom Penh Gift Card',
      subtitle: 'Sen Sok & Riverside Centers',
      description: 'Gift cards for celebration dining, lifestyle, and home necessities.',
      status: 'Gift Cards',
      tag: 'Shopping',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#eaf5fc] via-[#dcedf8] to-[#e4f1fa] px-6 py-4 flex items-center justify-between border-b border-sky-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#0a6699] flex items-center justify-center shadow-xs">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-sans-clean tracking-[0.2em] text-[#0a6699] font-bold uppercase">
                  Wedding Blessings &amp; Registry
                </span>
                <h3 className="font-serif-elegant italic text-2xl text-slate-800 leading-none">
                  Ponleu &amp; Meyjing
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Subheader message */}
          <div className="px-6 pt-4 pb-2 bg-slate-50/50 border-b border-slate-100 text-center">
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              “Your presence at our engagement celebration is the greatest gift of all. For beloved guests wishing to send a blessing or gift, we have provided options below.”
            </p>

            {/* Tab switchers */}
            <div className="flex justify-center gap-2 mt-3">
              <button
                onClick={() => setActiveTab('banking')}
                className={`py-1.5 px-4 rounded-full text-xs font-sans-clean font-bold transition-all ${
                  activeTab === 'banking'
                    ? 'bg-[#1289dc] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                🏦 Bank Transfer / KHQR
              </button>
              <button
                onClick={() => setActiveTab('registry')}
                className={`py-1.5 px-4 rounded-full text-xs font-sans-clean font-bold transition-all ${
                  activeTab === 'registry'
                    ? 'bg-[#1289dc] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                🎁 Gift Wishlists &amp; Funds
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto space-y-4">
            {activeTab === 'banking' ? (
              <div className="space-y-3.5">
                {/* QR Code Scan Card */}
                <div className="p-4 rounded-2xl bg-[#f0f8fd] border border-[#bfe3f7] flex items-center gap-4">
                  {/* Stylized KHQR code representation */}
                  <div className="w-20 h-20 bg-white border border-sky-200 rounded-xl p-1.5 shadow-2xs flex items-center justify-center shrink-0 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#004f71]">
                      <rect x="5" y="5" width="26" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="10" y="10" width="16" height="16" rx="2" fill="currentColor" />
                      <rect x="69" y="5" width="26" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="74" y="10" width="16" height="16" rx="2" fill="currentColor" />
                      <rect x="5" y="69" width="26" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="10" y="74" width="16" height="16" rx="2" fill="currentColor" />
                      <rect x="38" y="15" width="8" height="8" rx="1" fill="currentColor" />
                      <rect x="50" y="20" width="8" height="8" rx="1" fill="currentColor" />
                      <rect x="42" y="38" width="16" height="16" rx="2" fill="currentColor" />
                      <rect x="20" y="45" width="8" height="8" rx="1" fill="currentColor" />
                      <rect x="72" y="45" width="8" height="8" rx="1" fill="currentColor" />
                      <rect x="40" y="70" width="10" height="10" rx="1" fill="currentColor" />
                      <rect x="65" y="75" width="12" height="12" rx="1" fill="currentColor" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-[10px] bg-white rounded-full p-0.5 shadow-2xs">🇰🇭</span>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] font-sans-clean uppercase font-bold text-[#0a6699] tracking-wider block">
                      Universal KHQR Scan
                    </span>
                    <h4 className="font-serif-elegant font-semibold text-slate-800 text-base leading-tight">
                      Scan with any Cambodian Banking App
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      Supports Bakong, ABA, ACLEDA, Wing, Canadia, and all KHQR member banks.
                    </p>
                  </div>
                </div>

                {/* Bank Account Cards */}
                <div className="space-y-2.5">
                  {bankOptions.map((bank) => (
                    <div
                      key={bank.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-sky-300 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-sans-clean font-bold text-xs text-slate-800">
                            {bank.bankName}
                          </span>
                          <span className="text-[9px] font-sans-clean px-2 py-0.5 rounded-full bg-sky-50 text-[#096e9f] font-semibold border border-sky-100">
                            {bank.currency}
                          </span>
                        </div>
                        <div className="font-mono text-sm font-bold text-[#0d7bb8] tracking-wider mt-1">
                          {bank.accountNumber}
                        </div>
                        <div className="text-[11px] text-slate-500 font-sans-clean">
                          Account Name: <strong className="text-slate-700">{bank.accountName}</strong>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopy(bank.accountNumber, bank.id)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-[#ebf7fd] hover:text-[#0d7bb8] text-slate-700 text-xs font-sans-clean font-semibold flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
                        title="Copy account number"
                      >
                        {copiedAccount === bank.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Gift Registry / Wishlists */
              <div className="space-y-3">
                {registryItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-sky-300 transition-all flex items-start gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#ebf7fd] text-[#0d7bb8] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif-elegant font-semibold text-slate-800 text-base leading-tight">
                            {item.title}
                          </h4>
                          <span className="text-[9px] font-sans-clean font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-[#0a6699] mt-0.5">
                          {item.subtitle}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-2">
                          <button
                            onClick={() => {
                              onClose();
                              onOpenGuestbook();
                            }}
                            className="inline-flex items-center gap-1 text-xs font-sans-clean font-bold text-[#1289dc] hover:underline"
                          >
                            <span>Send a Warm Blessing Note →</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
