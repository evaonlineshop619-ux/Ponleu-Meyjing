import React, { useState } from 'react';
import { X, Share2, Copy, Check, QrCode, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://invitation.ponleu-meyjing.com';

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ពិធីភ្ជាប់ពាក្យ ពន្លឺ & ម៉ីជីង',
          text: 'សូមគោរពអញ្ជើញចូលរួមពិធីពិសាស្លាភ្ជាប់ពាក្យ ពន្លឺ & ម៉ីជីង នៅថ្ងៃអង្គារ ទី១៧ ខែសីហា ឆ្នាំ២០២៧ នៅរាជធានីភ្នំពេញ។',
          url: currentUrl,
        });
      } catch {
        // Ignored if user dismissed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden max-h-[90vh] flex flex-col font-khmer"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#eaf5fc] via-[#dcedf8] to-[#e4f1fa] px-6 py-4 flex items-center justify-between border-b border-sky-100 font-khmer">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#0a6699]" />
              <h3 className="font-moul text-base text-slate-800 leading-normal">
                ចែករំលែកលិខិតអញ្ជើញ
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 text-center space-y-4 font-khmer">
            {/* Stylized QR Code */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="w-44 h-44 mx-auto p-3.5 bg-white border-2 border-sky-100 rounded-2xl shadow-sm flex flex-col items-center justify-center relative group"
            >
              {/* SVG QR Code Pattern */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#0a6699]">
                {/* Corner position markers */}
                <rect x="5" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                <rect x="11" y="11" width="16" height="16" rx="2" fill="currentColor" />

                <rect x="67" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                <rect x="73" y="11" width="16" height="16" rx="2" fill="currentColor" />

                <rect x="5" y="67" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                <rect x="11" y="73" width="16" height="16" rx="2" fill="currentColor" />

                {/* Data pixel simulation */}
                <rect x="38" y="10" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="50" y="10" width="8" height="6" rx="1" fill="currentColor" />
                <rect x="42" y="22" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="54" y="24" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="10" y="42" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="22" y="42" width="6" height="8" rx="1" fill="currentColor" />
                <rect x="34" y="38" width="8" height="8" rx="1" fill="currentColor" />
                <rect x="46" y="38" width="8" height="8" rx="1" fill="currentColor" />
                <rect x="58" y="44" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="70" y="42" width="8" height="6" rx="1" fill="currentColor" />
                <rect x="84" y="44" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="38" y="54" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="48" y="52" width="8" height="8" rx="1" fill="currentColor" />
                <rect x="62" y="54" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="40" y="72" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="52" y="68" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="68" y="70" width="8" height="6" rx="1" fill="currentColor" />
                <rect x="80" y="72" width="8" height="8" rx="1" fill="currentColor" />
                <rect x="44" y="84" width="8" height="6" rx="1" fill="currentColor" />
                <rect x="58" y="84" width="8" height="6" rx="1" fill="currentColor" />
                <rect x="74" y="86" width="6" height="6" rx="1" fill="currentColor" />
              </svg>

              {/* Central Heart badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-white border border-sky-200 shadow-xs flex items-center justify-center animate-pulse">
                  <span className="text-xs">💍</span>
                </div>
              </div>
            </motion.div>

            <p className="text-xs text-slate-500 font-khmer">
              ស្កេនជាមួយកាមេរ៉ាទូរស័ព្ទដៃ ដើម្បីបើកមើលលិខិតអញ្ជើញឌីជីថលដោយផ្ទាល់។
            </p>

            {/* Share Actions */}
            <div className="space-y-2 pt-2 font-khmer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNativeShare}
                className="w-full py-3 px-4 rounded-xl bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs font-khmer font-bold tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Smartphone className="w-4 h-4" />
                <span>ចែករំលែកតាមកម្មវិធីទូរស័ព្ទ</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopy}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-khmer font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">បានចម្លងតំណភ្ជាប់!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>ចម្លងតំណភ្ជាប់លិខិតអញ្ជើញ</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
