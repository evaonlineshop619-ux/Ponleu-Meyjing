import React, { useState } from 'react';
import { X, Heart, Sparkles, BookOpen, Camera, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StoryGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryGalleryModal: React.FC<StoryGalleryModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'gallery'>('story');
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  if (!isOpen) return null;

  const milestones = [
    {
      year: 'November 2023',
      title: 'A Chance Encounter',
      description: 'Met through mutual lifelong friends at an intimate café along the Mekong riverside in Phnom Penh. A simple conversation over iced tea turned into three hours of laughter.',
    },
    {
      year: 'April 2024',
      title: 'Our First Khmer New Year',
      description: 'Traveling together to Siem Reap with family, sharing blessings, exploring Angkor at sunrise, and realizing we were building a future side by side.',
    },
    {
      year: 'December 2025',
      title: 'The Rooftop Question',
      description: 'Under a sky filled with lanterns and river breezes, Ponleu asked Meyjing to walk hand in hand forever. With tearful joy, she said yes!',
    },
    {
      year: 'August 17, 2027',
      title: 'Our Engagement Ceremony',
      description: 'Surrounded by our families and dearest friends, taking our vows and stepping joyfully toward marriage.',
    },
  ];

  const galleryItems = [
    {
      title: 'Angkor Dawn',
      caption: 'Sunrise reflections in Siem Reap',
      tag: 'Cherished Memories',
      gradient: 'from-[#a1c4fd] to-[#c2e9fb]',
      accent: '#2b7fb3',
    },
    {
      title: 'Traditional Khmer Silk',
      caption: 'Fitting our ceremonial engagement garments in Phnom Penh',
      tag: 'Ceremonial',
      gradient: 'from-[#e0c3fc] to-[#8ec5fc]',
      accent: '#6366f1',
    },
    {
      title: 'Riverside Strolls',
      caption: 'Evening walks by the Sisowath Quay breeze',
      tag: 'Phnom Penh Days',
      gradient: 'from-[#cfd9df] to-[#e2ebf0]',
      accent: '#475569',
    },
    {
      title: 'The Ring & The Promise',
      caption: 'A golden hour promise of forever',
      tag: 'Milestone',
      gradient: 'from-[#fbc2eb] to-[#a6c1ee]',
      accent: '#db2777',
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
            <div>
              <span className="text-[10px] font-sans-clean tracking-[0.2em] text-[#0a6699] font-bold uppercase">
                Ponleu &amp; Meyjing
              </span>
              <h3 className="font-serif-elegant italic text-2xl text-slate-800 leading-none">
                {activeTab === 'story' ? 'Our Love Story' : 'Engagement Gallery'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-slate-100 px-6 pt-3 bg-slate-50/50">
            <button
              onClick={() => setActiveTab('story')}
              className={`pb-3 px-4 text-xs font-sans-clean font-bold transition-all relative flex items-center gap-1.5 ${
                activeTab === 'story'
                  ? 'text-[#0d7bb8]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Our Journey</span>
              {activeTab === 'story' && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1289dc] rounded-full"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`pb-3 px-4 text-xs font-sans-clean font-bold transition-all relative flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'text-[#0d7bb8]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photo Moments</span>
              {activeTab === 'gallery' && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1289dc] rounded-full"
                />
              )}
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto">
            {activeTab === 'story' ? (
              <div className="space-y-6">
                {/* Couple Intro Card */}
                <div className="p-5 rounded-2xl bg-[#f0f8fd] border border-[#bfe3f7] text-center">
                  <Heart className="w-6 h-6 text-[#1289dc] mx-auto mb-2 fill-sky-200" />
                  <h4 className="font-serif-elegant italic text-2xl text-slate-800">
                    Two Paths, One Heart
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    “We are so grateful to everyone who has touched our lives, guided our paths, and supported our love. Having our families and friends join us on August 17th means the world to us.”
                  </p>
                  <span className="text-[11px] font-sans-clean font-semibold text-[#0a6699] mt-3 block">
                    — Ponleu &amp; Meyjing
                  </span>
                </div>

                {/* Milestones list */}
                <div className="relative border-l-2 border-sky-200 ml-3 space-y-6 pl-5">
                  {milestones.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      className="relative"
                    >
                      <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#1289dc] border-2 border-white shadow-xs" />
                      <span className="text-[11px] font-mono font-semibold text-[#096e9f] block">
                        {m.year}
                      </span>
                      <h5 className="font-serif-elegant text-lg text-slate-800 font-semibold mt-0.5">
                        {m.title}
                      </h5>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {m.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {galleryItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPhoto(idx)}
                      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-sky-100 shadow-xs hover:shadow-md transition-shadow aspect-4/3 flex flex-col justify-end p-3 text-left"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90 transition-transform duration-500 group-hover:scale-105`}
                      />
                      {/* Decorative pattern */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-15">
                        <Heart className="w-16 h-16 text-slate-800" />
                      </div>

                      <div className="relative z-10 bg-white/85 backdrop-blur-xs p-2 rounded-xl border border-white/80">
                        <span className="text-[9px] font-sans-clean uppercase font-bold text-sky-700 tracking-wider">
                          {item.tag}
                        </span>
                        <h5 className="font-serif-elegant font-semibold text-slate-800 text-sm leading-tight">
                          {item.title}
                        </h5>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Lightbox / Expanded View */}
                {selectedPhoto !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
                    onClick={() => setSelectedPhoto(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="max-w-md w-full bg-white rounded-3xl p-6 text-center shadow-2xl relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div
                        className={`w-full h-56 rounded-2xl bg-gradient-to-br ${galleryItems[selectedPhoto].gradient} flex items-center justify-center mb-4`}
                      >
                        <Heart className="w-16 h-16 text-white/70 animate-pulse" />
                      </div>
                      <span className="text-xs font-sans-clean font-bold text-[#0a6699] uppercase tracking-wider">
                        {galleryItems[selectedPhoto].tag}
                      </span>
                      <h4 className="font-serif-elegant text-2xl text-slate-800 mt-1">
                        {galleryItems[selectedPhoto].title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-2">
                        {galleryItems[selectedPhoto].caption}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
