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
      year: 'វិច្ឆិកា ២០២៣',
      title: 'ការជួបគ្នាដោយចៃដន្យ',
      description: 'បានជួបគ្នាលើកដំបូងតាមរយៈមិត្តភក្តិ នៅហាងកាហ្វេដ៏ស្ងប់ស្ងាត់មួយតាមបណ្តោយមាត់ទន្លេមេគង្គ រាជធានីភ្នំពេញ។ ការសន្ទនាដ៏សាមញ្ញ បានប្រែក្លាយជាសំណើច និងការយល់ចិត្តគ្នាយ៉ាងជ្រាលជ្រៅ។',
    },
    {
      year: 'មេសា ២០២៤',
      title: 'ចូលឆ្នាំខ្មែរដំបូងជាមួយគ្នា',
      description: 'បានធ្វើដំណើរកំសាន្តជាមួយក្រុមគ្រួសារទៅកាន់ទឹកដីសៀមរាបអង្គរ ទទួលពរជ័យឆ្នាំថ្មី និងទស្សនាថ្ងៃរះដ៏ស្រស់បំព្រងនៅមុខប្រាសាទអង្គរវត្ត។',
    },
    {
      year: 'ធ្នូ ២០២៥',
      title: 'ពាក្យសុំរៀបការដ៏រំភើប',
      description: 'ក្រោមពន្លឺចង្កៀងគោម និងខ្យល់រាត្រីដ៏ត្រជាក់ ពន្លឺ បានសុំ ម៉ីជីង កាន់ដៃគ្នាកសាងសុភមង្គលរហូតតទៅ។ ដោយក្តីរំភើប នាងបានឆ្លើយយល់ព្រម!',
    },
    {
      year: '១៧ សីហា ២០២៧',
      title: 'ពិធីពិសាស្លាភ្ជាប់ពាក្យ',
      description: 'ជួបជុំមាតាបិតា ញាតិមិត្ត និងមិត្តភក្តិជាទីស្រឡាញ់ ដើម្បីផ្លាស់ប្តូរចិញ្ចៀនសច្ចា និងបោះជំហានឆ្ពោះទៅរកថ្ងៃអាពាហ៍ពិពាហ៍។',
    },
  ];

  const galleryItems = [
    {
      title: 'ថ្ងៃរះលើទឹកដីអង្គរ',
      caption: 'ការចងចាំដ៏ផ្អែមល្ហែមនៅខេត្តសៀមរាប',
      tag: 'អនុស្សាវរីយ៍',
      gradient: 'from-[#a1c4fd] to-[#c2e9fb]',
      accent: '#2b7fb3',
    },
    {
      title: 'សូត្រខ្មែរប្រពៃណី',
      caption: 'ការសាកឈុតសម្លៀកបំពាក់ប្រពៃណីសម្រាប់ពិធីភ្ជាប់ពាក្យ',
      tag: 'ប្រពៃណីខ្មែរ',
      gradient: 'from-[#e0c3fc] to-[#8ec5fc]',
      accent: '#6366f1',
    },
    {
      title: 'លំហែកាយមាត់ទន្លេ',
      caption: 'ការដើរកំសាន្តនាពេលល្ងាចតាមមាត់ទន្លេស៊ីសុវត្ថិ',
      tag: 'ភ្នំពេញ',
      gradient: 'from-[#cfd9df] to-[#e2ebf0]',
      accent: '#475569',
    },
    {
      title: 'ចិញ្ចៀន និងការសន្យា',
      caption: 'ការសន្យាសេចក្តីស្រឡាញ់ជារៀងរហូត',
      tag: 'ថ្ងៃពិសេស',
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
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden max-h-[90vh] flex flex-col font-khmer"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#eaf5fc] via-[#dcedf8] to-[#e4f1fa] px-6 py-4 flex items-center justify-between border-b border-sky-100">
            <div>
              <span className="text-[10px] font-khmer tracking-wider text-[#0a6699] font-bold uppercase">
                ពន្លឺ &amp; ម៉ីជីង
              </span>
              <h3 className="font-moul text-lg text-slate-800 leading-normal mt-0.5">
                {activeTab === 'story' ? 'ដំណើររឿងស្នេហារបស់យើង' : 'រូបថតអនុស្សាវរីយ៍'}
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
          <div className="flex border-b border-slate-100 px-6 pt-3 bg-slate-50/50 font-khmer">
            <button
              onClick={() => setActiveTab('story')}
              className={`pb-3 px-4 text-xs font-khmer font-bold transition-all relative flex items-center gap-1.5 ${
                activeTab === 'story'
                  ? 'text-[#0d7bb8]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>ដំណើររឿង</span>
              {activeTab === 'story' && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1289dc] rounded-full"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`pb-3 px-4 text-xs font-khmer font-bold transition-all relative flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'text-[#0d7bb8]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>រូបថតអនុស្សាវរីយ៍</span>
              {activeTab === 'gallery' && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1289dc] rounded-full"
                />
              )}
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto font-khmer">
            {activeTab === 'story' ? (
              <div className="space-y-6">
                {/* Couple Intro Card */}
                <div className="p-5 rounded-2xl bg-[#f0f8fd] border border-[#bfe3f7] text-center">
                  <Heart className="w-6 h-6 text-[#1289dc] mx-auto mb-2 fill-sky-200" />
                  <h4 className="font-moul text-base text-slate-800">
                    ដួងចិត្តតែមួយ លើវិថីជីវិតរួមគ្នា
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-khmer">
                    “យើងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះមនុស្សជាទីស្រឡាញ់ទាំងអស់ ដែលបានចូលមកក្នុងជីវិត ជួយណែនាំ និងគាំទ្រសេចក្តីស្រឡាញ់របស់យើងខ្ញុំ។ វត្តមានរបស់ក្រុមគ្រួសារ និងមិត្តភក្តិទាំងអស់នៅថ្ងៃទី១៧ សីហា គឺជាអត្ថន័យដ៏ធំធេងបំផុតសម្រាប់យើងខ្ញុំទាំងពីរ។”
                  </p>
                  <span className="text-[11px] font-moul text-[#0a6699] mt-3 block">
                    — ពន្លឺ &amp; ម៉ីជីង
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
                      <h5 className="font-moul text-sm text-slate-800 font-normal mt-0.5 leading-normal">
                        {m.title}
                      </h5>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed font-khmer">
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
                        <span className="text-[9px] font-khmer uppercase font-bold text-sky-700 tracking-wider block">
                          {item.tag}
                        </span>
                        <h5 className="font-moul text-xs text-slate-800 leading-normal truncate">
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
                      className="max-w-md w-full bg-white rounded-3xl p-6 text-center shadow-2xl relative font-khmer"
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
                      <span className="text-xs font-khmer font-bold text-[#0a6699] uppercase tracking-wider block">
                        {galleryItems[selectedPhoto].tag}
                      </span>
                      <h4 className="font-moul text-lg text-slate-800 mt-1 leading-normal">
                        {galleryItems[selectedPhoto].title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-2 font-khmer leading-relaxed">
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
