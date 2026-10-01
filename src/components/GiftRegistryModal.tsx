import React, { useState } from 'react';
import {
  X,
  Gift,
  Copy,
  Check,
  Plane,
  Home,
  ShoppingBag
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
      bankName: 'ធនាគារ ABA (KHQR / USD)',
      accountName: 'PONLEU & MEYJING',
      accountNumber: '001 829 402',
      currency: 'USD ($)',
      color: 'from-[#004f71] to-[#01354c]',
      badge: 'ពេញនិយម',
    },
    {
      id: 'aba-khr',
      bankName: 'ធនាគារ ABA (KHQR / KHR)',
      accountName: 'PONLEU & MEYJING',
      accountNumber: '001 829 403',
      currency: 'រៀល (៛)',
      color: 'from-[#006080] to-[#004258]',
      badge: 'ប្រាក់រៀល',
    },
    {
      id: 'acleda',
      bankName: 'ធនាគារ អេស៊ីលីដា (ACLEDA)',
      accountName: 'PONLEU & MEYJING',
      accountNumber: '2900 1029 4810',
      currency: 'USD / KHR',
      color: 'from-[#154c79] to-[#0f3453]',
      badge: 'ទូទាត់ទូទាំងប្រទេស',
    },
  ];

  const registryItems = [
    {
      id: 'honeymoon',
      icon: Plane,
      title: 'ដំណើរកម្សាន្តក្រេបចន្ទទឹកឃ្មុំ',
      subtitle: 'ខេត្តសៀមរាប និងឆ្នេរសមុទ្រកោះរ៉ុង',
      description: 'ការចូលរួមចំណែកសម្រាប់អាហារពេលល្ងាចរ៉ូមែនទិក និងការចងចាំដ៏ស្រស់បំព្រង។',
      status: 'បើកទទួលពរជ័យ',
      tag: 'បទពិសោធន៍',
    },
    {
      id: 'home',
      icon: Home,
      title: 'គេហដ្ឋាន និងការរស់នៅថ្មី',
      subtitle: 'គ្រឿងតុបតែងផ្ទះ និងសម្ភារផ្ទះបាយ',
      description: 'សម្រាប់ការកសាងសំបុកសុភមង្គលដ៏កក់ក្តៅ និងបរិក្ខារចាំបាច់។',
      status: 'បញ្ជីបំណងប្រាថ្នា',
      tag: 'គេហដ្ឋាន',
    },
    {
      id: 'giftcard',
      icon: ShoppingBag,
      title: 'ប័ណ្ណកាដូផ្សារទំនើប អ៊ីអន',
      subtitle: 'សាខាសែនសុខ និងមាត់ទន្លេ',
      description: 'សម្រាប់ទិញសម្ភារប្រើប្រាស់ និងគ្រឿងទេសសម្រាប់គ្រួសារថ្មី។',
      status: 'ប័ណ្ណកាដូ',
      tag: 'ទិញទំនិញ',
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
                <span className="text-[11px] font-khmer-sans text-[#0a6699] font-bold">
                  ពិធីចងដៃ &amp; អាំងប៉ាវ
                </span>
                <h3 className="font-khmer-moul text-lg text-slate-800 leading-normal">
                  ពន្លឺ &amp; ម៉ីជីង
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all shadow-xs cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Subheader message */}
          <div className="px-6 pt-4 pb-2 bg-slate-50/50 border-b border-slate-100 text-center">
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto font-khmer-sans">
              «វត្តមានដ៏ឧត្តុង្គឧត្តមរបស់លោកអ្នក គឺជាកាដូដ៏មានតម្លៃបំផុតសម្រាប់ពួកយើង។ សម្រាប់ភ្ញៀវកិត្តិយសដែលមានបំណងចងដៃ ឬផ្ញើពរជ័យតាមរយៈធនាគារអេឡិចត្រូនិក សូមមើលព័ត៌មានខាងក្រោម។»
            </p>

            {/* Tab switchers */}
            <div className="flex justify-center gap-2 mt-3">
              <button
                onClick={() => setActiveTab('banking')}
                className={`py-1.5 px-4 rounded-full text-xs font-khmer-sans font-bold transition-all cursor-pointer ${
                  activeTab === 'banking'
                    ? 'bg-[#1289dc] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                🏦 ផ្ទេរប្រាក់ធនាគារ / KHQR
              </button>
              <button
                onClick={() => setActiveTab('registry')}
                className={`py-1.5 px-4 rounded-full text-xs font-khmer-sans font-bold transition-all cursor-pointer ${
                  activeTab === 'registry'
                    ? 'bg-[#1289dc] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                🎁 មូលនិធិក្រេបចន្ទទឹកឃ្មុំ
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
                    <span className="text-[10px] font-khmer-sans font-bold text-[#0a6699] uppercase tracking-wider block">
                      ស្កេន KHQR ទូទាំងប្រទេស
                    </span>
                    <h4 className="font-khmer-sans font-bold text-slate-800 text-sm leading-tight">
                      ស្កេនជាមួយគ្រប់កម្មវិធីធនាគារនៅកម្ពុជា
                    </h4>
                    <p className="text-[11px] font-khmer-sans text-slate-500 mt-1 leading-snug">
                      គាំទ្រកម្មវិធី បាគង (Bakong), ABA, ACLEDA, Wing, Canadia និងធនាគារជាសមាជិក KHQR ទាំងអស់។
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
                          <span className="font-khmer-sans font-bold text-xs text-slate-800">
                            {bank.bankName}
                          </span>
                          <span className="text-[9px] font-khmer-sans px-2 py-0.5 rounded-full bg-sky-50 text-[#096e9f] font-semibold border border-sky-100">
                            {bank.currency}
                          </span>
                        </div>
                        <div className="font-mono text-sm font-bold text-[#0d7bb8] tracking-wider mt-1">
                          {bank.accountNumber}
                        </div>
                        <div className="text-[11px] text-slate-500 font-khmer-sans">
                          ឈ្មោះគណនី៖ <strong className="text-slate-700">{bank.accountName}</strong>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopy(bank.accountNumber, bank.id)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-[#ebf7fd] hover:text-[#0d7bb8] text-slate-700 text-xs font-khmer-sans font-semibold flex items-center gap-1.5 transition-all shrink-0 active:scale-95 cursor-pointer"
                        title="ចម្លងលេខគណនី"
                      >
                        {copiedAccount === bank.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">បានចម្លង</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>ចម្លង</span>
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
                          <h4 className="font-khmer-sans font-bold text-slate-800 text-sm leading-tight">
                            {item.title}
                          </h4>
                          <span className="text-[9px] font-khmer-sans font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs font-khmer-sans font-medium text-[#0a6699] mt-0.5">
                          {item.subtitle}
                        </p>
                        <p className="text-[11px] font-khmer-sans text-slate-500 mt-1 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-2">
                          <button
                            onClick={() => {
                              onClose();
                              onOpenGuestbook();
                            }}
                            className="inline-flex items-center gap-1 text-xs font-khmer-sans font-bold text-[#1289dc] hover:underline cursor-pointer"
                          >
                            <span>ផ្ញើសារពរជ័យជូនគូដណ្តឹង →</span>
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
