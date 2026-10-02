import React from 'react';
import { X, Clock, Sparkles, Shirt, Award, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScheduleEvent } from '../types';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const scheduleEvents: ScheduleEvent[] = [
  {
    time: '7:30 PM (យប់)',
    title: 'ទទួលភ្ញៀវកិត្តិយស & ពិសាតែផ្កាម្លិះ',
    description: 'ភ្ញៀវកិត្តិយសអញ្ជើញមកដល់គេហដ្ឋានខាងស្រី ពិសាតែផ្កាម្លិះក្រអូប នំចំណីប្រពៃណី និងថតរូបអនុស្សាវរីយ៍នៅមុខរានហាល។',
    location: 'ទីធ្លាមុខគេហដ្ឋានខាងស្រី',
    badge: 'ទទួលភ្ញៀវ',
  },
  {
    time: '8:00 PM (យប់)',
    title: 'ពិធីភ្ជាប់ពាក្យជាផ្លូវការចាប់ផ្តើម',
    description: 'ក្បួនដង្ហែកូនកំលោះ ពន្លឺ និងកូនក្រមុំ ម៉ីជីង ព្រមទាំងមាតាបិតាទាំងសងខាង ពិធីរៀបចំផ្លែឈើ និងការប្រសិទ្ធពរជ័យពីចាស់ទុំ។',
    location: 'សាលពិធីមង្គលធំ',
    badge: 'ពិធីផ្លូវការ',
  },
  {
    time: '8:45 PM (យប់)',
    title: 'ពិធីបំពាក់ចិញ្ចៀនភ្ជាប់ពាក្យ',
    description: 'កូនកំលោះ និងកូនក្រមុំផ្លាស់ប្តូរបំពាក់ចិញ្ចៀនភ្ជាប់ពាក្យចំពោះមុខមាតាបិតា ញាតិមិត្ត និងភ្ញៀវកិត្តិយស ព្រមទាំងថ្លែងពាក្យសច្ចា និងទទួលពរជ័យ។',
    location: 'វេទិកាពិធីមង្គល',
    badge: 'បំពាក់ចិញ្ចៀន',
  },
  {
    time: '9:15 PM (យប់)',
    title: 'ពិធីពិសាភោជនាហារ និងតន្ត្រីកំសាន្ត',
    description: 'ពិសាភោជនាហារសាមគ្គី ម្ហូបខ្មែរ និងអន្តរជាតិ ជល់កែវអបអរសាទរ និងស្តាប់តន្ត្រីកំសាន្តយ៉ាងកក់ក្តៅ។',
    location: 'សួនច្បារគេហដ្ឋាន',
    badge: 'ពិសារអាហារ',
  },
  {
    time: '11:00 PM (យប់)',
    title: 'ជូនដំណើរភ្ញៀវកិត្តិយស & វត្ថុអនុស្សាវរីយ៍',
    description: 'ថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅដល់ភ្ញៀវកិត្តិយសទាំងអស់ ជូនវត្ថុអនុស្សាវរីយ៍ និងថតរូបជុំគ្នាជាមួយគូដណ្តប់។',
    location: 'ក្លោងទ្វារមង្គល',
    badge: 'បញ្ចប់ពិធី',
  },
];

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#0a6699] flex items-center justify-center shadow-xs">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-khmer tracking-wider text-[#0a6699] font-bold uppercase">
                  កាលវិភាគនៃពិធី
                </span>
                <h3 className="font-moul text-lg text-slate-800 leading-normal mt-0.5">
                  កម្មវិធីពិធីភ្ជាប់ពាក្យ
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
          <div className="p-6 overflow-y-auto space-y-6 font-khmer">
            {/* Timeline */}
            <div className="relative border-l-2 border-sky-200 ml-3 space-y-6 pl-5 py-1">
              {scheduleEvents.map((evt, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="relative group"
                >
                  {/* Node dot */}
                  <div className="absolute -left-[27px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#1289dc] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1289dc]" />
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#0d7bb8] tracking-wider">
                      {evt.time}
                    </span>
                    {evt.badge && (
                      <span className="text-[10px] font-khmer px-2.5 py-0.5 rounded-full bg-sky-100 text-[#096e9f] font-semibold">
                        {evt.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-moul text-sm sm:text-base text-slate-800 mt-1 leading-normal">
                    {evt.title}
                  </h4>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-khmer">
                    {evt.description}
                  </p>

                  <p className="text-[11px] text-slate-400 mt-1 italic font-khmer">
                    📍 {evt.location}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Dress Code Section */}
            <div className="p-4 rounded-2xl bg-[#f0f8fd] border border-[#bfe3f7] space-y-3 font-khmer">
              <div className="flex items-center gap-2">
                <Shirt className="w-4 h-4 text-[#0a6699]" />
                <h4 className="text-xs font-bold font-khmer text-slate-800 uppercase tracking-wider">
                  សម្លៀកបំពាក់ &amp; ពណ៌ដែលបានណែនាំ
                </h4>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-khmer">
                យើងខ្ញុំសូមគោរពអញ្ជើញភ្ញៀវកិត្តិយសស្លៀកពាក់បែប៖{' '}
                <strong className="text-slate-800 font-bold">សម្លៀកបំពាក់ប្រពៃណីខ្មែរ ឬឈុតសមរម្យបែបសម័យទំនើប</strong>។
              </p>

              <div className="pt-1">
                <span className="text-[11px] font-semibold text-slate-500 block mb-2 font-khmer">
                  កូដពណ៌ដែលបានណែនាំ (Color Palette):
                </span>
                <div className="grid grid-cols-4 gap-2 text-center font-khmer">
                  <div>
                    <div className="w-full h-8 rounded-lg bg-[#d9effa] border border-[#bce4f8] shadow-2xs mb-1 hover:scale-105 transition-transform" />
                    <span className="text-[10px] text-slate-600 font-khmer">ផ្ទៃមេឃស្រាល</span>
                  </div>
                  <div>
                    <div className="w-full h-8 rounded-lg bg-[#ffffff] border border-slate-200 shadow-2xs mb-1 hover:scale-105 transition-transform" />
                    <span className="text-[10px] text-slate-600 font-khmer">ស / ភ្លុកដំរី</span>
                  </div>
                  <div>
                    <div className="w-full h-8 rounded-lg bg-[#276f9d] border border-sky-800 shadow-2xs mb-1 hover:scale-105 transition-transform" />
                    <span className="text-[10px] text-slate-600 font-khmer">ផ្ទៃមេឃចាស់</span>
                  </div>
                  <div>
                    <div className="w-full h-8 rounded-lg bg-[#f0e6cf] border border-[#ded0b1] shadow-2xs mb-1 hover:scale-105 transition-transform" />
                    <span className="text-[10px] text-slate-600 font-khmer">មាសស្រាល</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
