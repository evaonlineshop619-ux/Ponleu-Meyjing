import React from 'react';
import { X, Camera, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PhotoSlideshow } from './PhotoSlideshow';

interface PhotoSlideshowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoSlideshowModal: React.FC<PhotoSlideshowModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm font-khmer">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#eaf5fc] via-[#dcedf8] to-[#e4f1fa] px-6 py-4 flex items-center justify-between border-b border-sky-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#0a6699] flex items-center justify-center shadow-xs">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-khmer tracking-wider text-[#0a6699] font-bold uppercase">
                  កម្រងរូបថតអនុស្សាវរីយ៍
                </span>
                <h3 className="font-moul text-lg text-slate-800 leading-normal mt-0.5">
                  ស្លាយរូបថត ពន្លឺ &amp; ម៉ីជីង
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

          {/* Modal Body with Slideshow */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
            <PhotoSlideshow autoPlayInterval={4000} showThumbnails={true} />

            <div className="p-4 rounded-2xl bg-[#f0f8fd] border border-[#bfe3f7] flex items-center gap-3">
              <Heart className="w-5 h-5 text-[#1289dc] shrink-0 fill-sky-200" />
              <p className="text-xs text-slate-600 leading-relaxed">
                ផ្ទាំងស្លាយរូបថតស្វ័យប្រវត្តិនៃអនុស្សាវរីយ៍ដ៏មានតម្លៃរបស់គូដណ្តប់ <strong>ពន្លឺ &amp; ម៉ីជីង</strong>។ លោកអ្នកអាចចុចព្រួញឆ្វេង-ស្តាំ ឬជ្រើសរើសរូបថតតូចៗខាងក្រោមដើម្បីទស្សនា។
              </p>
            </div>

            {/* Helpful guide card on how to add photos */}
            <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/80 text-xs text-sky-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0a6699]">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>របៀបបន្ថែមរូបថតចូលក្នុងស្លាយ (How to Add Photos):</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 text-[11px] sm:text-xs leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1289dc] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ១
                  </span>
                  <span>
                    ចុចប៊ូតុង <strong className="text-[#0d7bb8]">«+»</strong> នៅរបារខាងលើស្លាយ
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1289dc] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ២
                  </span>
                  <span>
                    ជ្រើសរើសរូបថតពីទូរស័ព្ទ ឬកុំព្យូទ័រ (គាំទ្រ JPG, PNG, WebP) ឬបញ្ចូលតំណភ្ជាប់ URL
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1289dc] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ៣
                  </span>
                  <span>
                    បញ្ចូលចំណងជើង រួចចុច <strong>«បញ្ចូលទៅក្នុងស្លាយ»</strong> — រូបថតនឹងបង្ហាញក្នុងស្លាយភ្លាមៗ!
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
