import React, { useState } from 'react';
import {
  X,
  MapPin,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  Car,
  Compass,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const plusCode = 'GR4H+89W Phnom Penh';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plusCode)}`;
  const appleMapsUrl = `http://maps.apple.com/?q=${encodeURIComponent(plusCode)}`;

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(plusCode);
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
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#eaf5fc] via-[#dcedf8] to-[#e4f1fa] px-6 py-4 flex items-center justify-between border-b border-sky-100 font-khmer">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#0a6699] flex items-center justify-center shadow-xs">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-khmer tracking-wider text-[#0a6699] font-bold uppercase">
                  ទីតាំង និងការធ្វើដំណើរ
                </span>
                <h3 className="font-moul text-lg text-slate-800 leading-normal mt-0.5">
                  គេហដ្ឋានខាងស្រី (ផ្ទះកូនក្រមុំ)
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

          {/* Content Body */}
          <div className="p-6 overflow-y-auto space-y-5 font-khmer">
            {/* Visual Map Representation */}
            <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-sky-200 bg-[#e5f1f9] shadow-inner flex flex-col items-center justify-center text-center p-4">
              {/* Map Grid Background Graphics */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#93c5fd 1px, #e5f1f9 1px)`,
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px',
                }}
              />

              {/* Roads & Pathways overlay */}
              <svg
                className="absolute inset-0 w-full h-full opacity-35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M -20 80 Q 150 120 450 60"
                  stroke="#0284c7"
                  strokeWidth="6"
                  fill="none"
                />
                <path
                  d="M 180 -20 Q 220 100 240 250"
                  stroke="#0ea5e9"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M 60 180 Q 200 130 380 180"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>

              {/* Pulsing Venue Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-sky-500/25 animate-ping absolute -top-1 -left-1" />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] text-white flex items-center justify-center shadow-lg relative z-10">
                    <MapPin className="w-5 h-5 drop-shadow-xs" />
                  </div>
                </div>
                <div className="mt-2 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-sky-200">
                  <span className="font-moul text-slate-800 text-xs sm:text-sm">
                    គេហដ្ឋានខាងស្រី · រាជធានីភ្នំពេញ
                  </span>
                </div>
              </div>

              <span className="absolute bottom-2 right-3 text-[10px] font-khmer text-slate-500 bg-white/85 px-2 py-0.5 rounded shadow-2xs">
                ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ
              </span>
            </div>

            {/* Plus Code & Quick Action Box */}
            <div className="p-4 rounded-2xl bg-[#f0f8fd] border border-[#bfe3f7] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-khmer font-semibold text-slate-500 uppercase tracking-wider block">
                  កូដទីតាំង Google Maps Plus Code
                </span>
                <span className="text-base font-bold font-mono text-[#096e9f] tracking-tight">
                  {plusCode}
                </span>
              </div>

              <button
                onClick={handleCopyCode}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-[#0d7bb8] text-xs font-khmer font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">បានចម្លងរួចរាល់!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>ចម្លងកូដទីតាំង</span>
                  </>
                )}
              </button>
            </div>

            {/* Navigation External Links */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs font-khmer font-bold tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-khmer font-bold tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Apple Maps</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>

            {/* Travel & Arrival Guidance */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold font-khmer text-slate-800 uppercase tracking-wider">
                ការណែនាំពីការធ្វើដំណើរ
              </h4>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 font-khmer leading-relaxed">
                <Car className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 font-bold">Grab &amp; PassApp:</strong> លោកអ្នកអាចចម្លងកូដ{' '}
                  <code className="bg-sky-100/70 text-sky-800 px-1 py-0.5 rounded font-mono">
                    GR4H+89W
                  </code>{' '}
                  ដាក់ក្នុងប្រអប់ស្វែងរកទីតាំងរបស់ Grab ឬ PassApp ដើម្បីធ្វើដំណើរមកដល់មុខផ្ទះដោយផ្ទាល់។
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 font-khmer leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 font-bold">ពេលវេលាចូលរួម:</strong> ពិធីជាផ្លូវការនឹងចាប់ផ្តើមយ៉ាងទៀងទាត់នៅម៉ោង{' '}
                  <span className="font-semibold text-sky-700">៨:០០ យប់</span>។ កម្មវិធីទទួលស្វាគមន៍ និងពិសាតែផ្កាម្លិះចាប់ផ្តើមពីម៉ោង{' '}
                  <span className="font-semibold text-slate-700">៧:៣០ យប់តទៅ</span>។
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
