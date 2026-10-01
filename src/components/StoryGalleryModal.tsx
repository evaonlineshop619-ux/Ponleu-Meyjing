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
      year: 'ខែវិច្ឆិកា ឆ្នាំ២០២៣',
      title: 'ការជួបគ្នាដំបូងដោយចៃដន្យ',
      description: 'បានស្គាល់គ្នាតាមរយៈមិត្តភក្តិរួម នៅហាងកាហ្វេដ៏កក់ក្តៅមួយក្បែរមាត់ទន្លេមេគង្គ ក្នុងរាជធានីភ្នំពេញ។ ការសន្ទនាដ៏សាមញ្ញបានក្លាយជាសំណើច និងក្តីស្រឡាញ់យ៉ាងជ្រាលជ្រៅ។',
    },
    {
      year: 'ខែមេសា ឆ្នាំ២០២៤',
      title: 'បុណ្យចូលឆ្នាំខ្មែរដំបូងជាមួយគ្នា',
      description: 'បានធ្វើដំណើរកម្សាន្តទៅកាន់ខេត្តសៀមរាបជាមួយក្រុមគ្រួសារ ទទួលពរជ័យ និងទស្សនាថ្ងៃរះដ៏ស្រស់ស្អាតនៅមុខប្រាសាទអង្គរវត្ត។',
    },
    {
      year: 'ខែធ្នូ ឆ្នាំ២០២៥',
      title: 'ការសុំភ្ជាប់ពាក្យក្រោមពន្លឺចន្ទ',
      description: 'ក្រោមមេឃស្រឡះ និងខ្យល់ទន្លេដ៏ត្រជាក់ ពន្លឺ បានសុំ ម៉ីជីង កាន់ដៃដើរលើវិថីជីវិតជាមួយគ្នា។ ដោយក្តីរំភើប និងទឹកភ្នែកនៃក្តីសុខ នាងបានឆ្លើយថា យល់ព្រម!',
    },
    {
      year: 'ថ្ងៃទី១៧ ខែសីហា ឆ្នាំ២០២៧',
      title: 'ពិធីភ្ជាប់ពាក្យជាផ្លូវការ',
      description: 'ហ៊ុំព័ទ្ធដោយមាតាបិតា ញាតិមិត្ត និងមិត្តភក្តិជាទីស្រឡាញ់ បំពាក់ចិញ្ចៀន និងបោះជំហានឆ្ពោះទៅកាន់អនាគតអាពាហ៍ពិពាហ៍ដ៏ត្រចះត្រចង់។',
    },
  ];

  const galleryItems = [
    {
      title: 'ថ្ងៃរះនៅអង្គរវត្ត',
      caption: 'ស្រមោលថ្ងៃរះដ៏រ៉ូមែនទិកនៅសៀមរាប',
      tag: 'អនុស្សាវរីយ៍ផ្អែមល្ហែម',
      gradient: 'from-[#a1c4fd] to-[#c2e9fb]',
      accent: '#2b7fb3',
    },
    {
      title: 'សំលៀកបំពាក់ប្រពៃណីខ្មែរ',
      caption: 'ការវាស់កាត់សំលៀកបំពាក់ហូលផាមួងសម្រាប់ពិធីមង្គល',
      tag: 'ប្រពៃណីខ្មែរ',
      gradient: 'from-[#e0c3fc] to-[#8ec5fc]',
      accent: '#6366f1',
    },
    {
      title: 'ដើរលេងតាមមាត់ទន្លេ',
      caption: 'ខ្យល់ត្រជាក់នៃវិថីព្រះស៊ីសុវត្ថិ រាជធានីភ្នំពេញ',
      tag: 'រាជធានីភ្នំពេញ',
      gradient: 'from-[#cfd9df] to-[#e2ebf0]',
      accent: '#475569',
    },
    {
      title: 'ចិញ្ចៀន និងពាក្យសន្យា',
      caption: 'ពាក្យសន្យានៃក្តីស្រឡាញ់ស្មោះត្រង់ជារៀងរហូត',
      tag: 'វេលាពិសិដ្ឋ',
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
              <span className="text-[11px] font-khmer-sans text-[#0a6699] font-bold">
                ពន្លឺ &amp; ម៉ីជីង
              </span>
              <h3 className="font-khmer-moul text-lg text-slate-800 leading-normal">
                {activeTab === 'story' ? 'រឿងរ៉ាវស្នេហារបស់យើង' : 'កម្រងរូបភាពអនុស្សាវរីយ៍'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all shadow-xs cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-slate-100 px-6 pt-3 bg-slate-50/50">
            <button
              onClick={() => setActiveTab('story')}
              className={`pb-3 px-4 text-xs font-khmer-sans font-bold transition-all relative flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'story'
                  ? 'text-[#0d7bb8]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>រឿងរ៉ាវស្នេហា</span>
              {activeTab === 'story' && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1289dc] rounded-full"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`pb-3 px-4 text-xs font-khmer-sans font-bold transition-all relative flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'gallery'
                  ? 'text-[#0d7bb8]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>កម្រងរូបភាព</span>
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
                  <h4 className="font-khmer-sans font-bold text-lg text-slate-800">
                    បេះដូងពីរ រួបរួមជាធ្លុងមួយ
                  </h4>
                  <p className="text-xs font-khmer-sans text-slate-600 mt-2 leading-relaxed">
                    «យើងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះមាតាបិតា លោកតាលោកយាយ ញាតិមិត្ត និងមិត្តភក្តិទាំងអស់ ដែលតែងតែផ្តល់ក្តីស្រឡាញ់ និងការគាំទ្រដល់ពួកយើង។ វត្តមានរបស់លោកអ្នកនៅថ្ងៃទី១៧ ខែសីហា គឺជាកិត្តិយស និងជាសេចក្តីរីករាយដ៏ធំធេងបំផុតសម្រាប់ពួកយើង។»
                  </p>
                  <span className="text-[11px] font-khmer-sans font-semibold text-[#0a6699] mt-3 block">
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
                      <span className="text-[11px] font-khmer-sans font-semibold text-[#096e9f] block">
                        {m.year}
                      </span>
                      <h5 className="font-khmer-sans text-base text-slate-800 font-bold mt-0.5">
                        {m.title}
                      </h5>
                      <p className="text-xs font-khmer-sans text-slate-600 mt-1 leading-relaxed">
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
                        <span className="text-[9px] font-khmer-sans font-bold text-sky-700 tracking-wider">
                          {item.tag}
                        </span>
                        <h5 className="font-khmer-sans font-bold text-slate-800 text-xs leading-tight">
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
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div
                        className={`w-full h-56 rounded-2xl bg-gradient-to-br ${galleryItems[selectedPhoto].gradient} flex items-center justify-center mb-4`}
                      >
                        <Heart className="w-16 h-16 text-white/70 animate-pulse" />
                      </div>
                      <span className="text-xs font-khmer-sans font-bold text-[#0a6699]">
                        {galleryItems[selectedPhoto].tag}
                      </span>
                      <h4 className="font-khmer-sans text-xl text-slate-800 mt-1 font-bold">
                        {galleryItems[selectedPhoto].title}
                      </h4>
                      <p className="text-xs font-khmer-sans text-slate-600 mt-2">
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
