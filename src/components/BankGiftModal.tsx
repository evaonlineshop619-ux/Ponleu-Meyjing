import React, { useState, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  CreditCard,
  Heart,
  Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import abaQrCodeImg from '../assets/images/abaqrcode.jpg';

// Exact details copied from the photo uploaded by user
export const ABA_DETAILS = {
  name: 'PONLEU NGEK',
  khrAccount: '002 129 840',
  usdAccount: '012 889 206',
  bankName: 'ABA BANK',
  groupName: 'NATIONAL BANK OF CANADA GROUP',
};

interface BankGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BankGiftModal: React.FC<BankGiftModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopy = (fieldId: string, text: string) => {
    navigator.clipboard.writeText(text.replace(/\s+/g, ''));
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = abaQrCodeImg;
    link.download = `ABA-KHQR-${ABA_DETAILS.name.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm font-khmer">
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden max-h-[95vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#eaf5fc] via-[#dcedf8] to-[#e4f1fa] px-5 py-3.5 flex items-center justify-between border-b border-sky-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#004e7c] flex items-center justify-center shadow-xs">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-khmer tracking-wider text-[#004e7c] font-bold uppercase">
                  ចំណងដៃអាពាហ៍ពិពាហ៍
                </span>
                <h3 className="font-moul text-sm sm:text-base text-slate-800 leading-normal mt-0.5">
                  ABA QR &amp; លេខកុងធនាគារ
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

          {/* Modal Body */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
            {/* Thank you note */}
            <div className="text-center">
              <p className="text-xs text-slate-600 leading-relaxed font-khmer">
                សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះទឹកចិត្ត និងសេចក្តីស្រឡាញ់របស់ភ្ញៀវកិត្តិយសទាំងអស់!
              </p>
            </div>

            {/* Authentic ABA KHQR Card Container matching user's photo */}
            <div
              ref={cardRef}
              className="rounded-2xl bg-[#002f4a] p-4 sm:p-5 text-white shadow-md border border-[#004e7c]/40 relative overflow-hidden"
            >
              {/* Top Title: ABA' QR */}
              <div className="text-center mb-3">
                <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-white inline-flex items-center justify-center">
                  <span>ABA</span>
                  <span className="text-[#e11a22] font-black mx-0.5">’</span>
                  <span className="ml-1.5 font-bold tracking-wider text-sky-100">QR</span>
                </h2>
              </div>

              {/* White Center Card with QR Code */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-slate-900 border border-slate-100 max-w-[270px] sm:max-w-[280px] mx-auto p-3">
                {/* QR Code from assets */}
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-white flex items-center justify-center">
                    <img
                      src={abaQrCodeImg}
                      alt="ABA KHQR Code"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Numbers list on photo with Copy Buttons */}
              <div className="mt-4 max-w-[290px] mx-auto space-y-2 pt-2 text-white">
                {/* KHR Account Row */}
                <div className="flex items-center justify-between gap-2 bg-white/10 hover:bg-white/15 transition-colors p-2.5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">
                      ៛
                    </span>
                    <div className="min-w-0">
                      <span className="text-[11px] text-sky-200 block leading-tight font-khmer">
                        គណនី KHR:
                      </span>
                      <strong className="text-sm sm:text-base font-mono font-bold tracking-wider text-amber-300 block">
                        {ABA_DETAILS.khrAccount}
                      </strong>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('khr', ABA_DETAILS.khrAccount)}
                    className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                      copiedField === 'khr'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-slate-800 hover:bg-slate-100 active:scale-95'
                    }`}
                    title="ចម្លងលេខកុង KHR"
                  >
                    {copiedField === 'khr' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span className="text-[10px]">បានចម្លង</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">ចម្លង</span>
                      </>
                    )}
                  </button>
                </div>

                {/* USD Account Row */}
                <div className="flex items-center justify-between gap-2 bg-white/10 hover:bg-white/15 transition-colors p-2.5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">
                      $
                    </span>
                    <div className="min-w-0">
                      <span className="text-[11px] text-sky-200 block leading-tight font-khmer">
                        គណនី USD:
                      </span>
                      <strong className="text-sm sm:text-base font-mono font-bold tracking-wider text-amber-300 block">
                        {ABA_DETAILS.usdAccount}
                      </strong>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('usd', ABA_DETAILS.usdAccount)}
                    className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                      copiedField === 'usd'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-slate-800 hover:bg-slate-100 active:scale-95'
                    }`}
                    title="ចម្លងលេខកុង USD"
                  >
                    {copiedField === 'usd' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span className="text-[10px]">បានចម្លង</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">ចម្លង</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Name Row with copy */}
                <div className="flex items-center justify-between gap-2 px-2 pt-1 text-sky-200 text-xs font-khmer">
                  <span className="text-[11px]">
                    ឈ្មោះម្ចាស់កុង៖ <strong className="text-white font-mono">{ABA_DETAILS.name}</strong>
                  </span>
                  <button
                    onClick={() => handleCopy('name', ABA_DETAILS.name)}
                    className="text-[11px] text-sky-300 hover:text-white underline transition-colors"
                  >
                    {copiedField === 'name' ? 'បានចម្លងឈ្មោះ ✓' : 'ចម្លងឈ្មោះ'}
                  </button>
                </div>
              </div>

              {/* Bottom Footer: ABA BANK | NATIONAL BANK OF CANADA GROUP */}
              <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-center gap-2 text-center">
                <span className="font-black text-sm tracking-wider text-white">
                  ABA<span className="text-[#e11a22] font-black">’</span> BANK
                </span>
                <span className="text-white/40">|</span>
                <span className="text-[9px] text-white/80 font-bold uppercase tracking-wider leading-tight text-left">
                  NATIONAL BANK<br />OF CANADA GROUP
                </span>
              </div>
            </div>

            {/* Quick Download QR Button */}
            <div className="flex items-center justify-center">
              <button
                onClick={handleDownloadQr}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-khmer font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Download className="w-4 h-4 text-[#004e7c]" />
                <span>រក្សាទុកកាត QR ចូលទូរស័ព្ទ (Save QR)</span>
              </button>
            </div>

            {/* Bottom Blessing */}
            <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100 flex items-center gap-2.5 text-slate-600 text-xs">
              <Heart className="w-4 h-4 text-[#1289dc] shrink-0 fill-sky-200" />
              <span>
                វត្តមាន និងពរជ័យរបស់លោកអ្នក គឺជាកាដូដ៏ពិសិដ្ឋបំផុតសម្រាប់យើងខ្ញុំទាំងពីរ។
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
