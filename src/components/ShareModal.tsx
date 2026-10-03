import React, { useState, useEffect } from 'react';
import { X, Share2, Copy, Check, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import QRCode from 'qrcode';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const currentUrl = 'https://ponleu-meyjing.vercel.app/';

  useEffect(() => {
    if (currentUrl) {
      QRCode.toDataURL(currentUrl, {
        width: 480,
        margin: 1.5,
        color: {
          dark: '#002f4a',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error('Error generating link QR:', err));
    }
  }, [currentUrl]);

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
            {/* Real Generated QR Code */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-48 h-48 mx-auto p-2.5 bg-white border-2 border-sky-100 rounded-2xl shadow-sm flex flex-col items-center justify-center relative group"
            >
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="Wedding Invitation Link QR Code"
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <div className="w-full h-full bg-sky-50 rounded-xl flex items-center justify-center animate-pulse">
                  <QrCode className="w-10 h-10 text-sky-400" />
                </div>
              )}

              {/* Central Heart badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-white border border-sky-200 shadow-sm flex items-center justify-center">
                  <span className="text-xs">💍</span>
                </div>
              </div>
            </motion.div>

            <div className="space-y-2">
              <p className="text-xs text-slate-600 font-medium">
                ស្កេនជាមួយកាមេរ៉ាទូរស័ព្ទដៃ ដើម្បីបើកមើលលិខិតអញ្ជើញឌីជីថល
              </p>
              <button
                onClick={handleCopy}
                className="text-[12px] text-sky-700 hover:text-sky-900 font-mono inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 transition-colors border border-sky-100"
                title="ចុចដើម្បីចម្លងតំណភ្ជាប់"
              >
                <span>{currentUrl}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                )}
              </button>
              {copied && (
                <p className="text-[11px] text-emerald-600 font-semibold animate-fade-in">
                  បានចម្លងតំណភ្ជាប់ជោគជ័យ!
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
