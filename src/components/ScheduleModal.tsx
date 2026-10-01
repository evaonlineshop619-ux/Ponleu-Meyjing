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
    time: '7:30 PM',
    title: 'ពិធីទទួលភ្ញៀវកិត្តិយស និងពិសាតែផ្កាម្លិះ',
    description: 'ភ្ញៀវកិត្តិយសអញ្ជើញមកដល់គេហដ្ឋានខាងស្រី។ ពិសាតែផ្កាម្លិះក្រអូប ភេសជ្ជៈត្រជាក់ និងថតរូបអនុស្សាវរីយ៍ជាមួយគូដណ្តឹង។',
    location: 'ទីធ្លាទទួលភ្ញៀវខាងមុខ',
    badge: 'ទទួលភ្ញៀវ',
  },
  {
    time: '8:00 PM',
    title: 'ពិធីរៀបផ្លែឈើ និងសែនជួបជុំសាច់ញាតិ',
    description: 'កូនកំលោះ ពន្លឺ និងកូនក្រមុំ ម៉ីជីង ចូលក្នុងពិធីជាមួយមាតាបិតាទាំងសងខាង ពិធីរៀបផ្លែឈើ៣៦មុខ និងសែនព្រេនជូនដំណឹងដល់ដូនតា។',
    location: 'សាលមង្គលធំ',
    badge: 'ពិធីផ្លូវការ',
  },
  {
    time: '8:45 PM',
    title: 'ពិធីបំពាក់ចិញ្ចៀនភ្ជាប់ពាក្យ និងពរជ័យមាតាបិតា',
    description: 'កូនកំលោះ និងកូនក្រមុំ បំពាក់ចិញ្ចៀនភ្ជាប់ពាក្យជូនគ្នាទៅវិញទៅមក ចំពោះមុខមាតាបិតា ចាស់ទុំ និងភ្ញៀវកិត្តិយស ព្រមទាំងទទួលពរជ័យ។',
    location: 'វេទិកាមង្គល',
    badge: 'វេលាពិសិដ្ឋ',
  },
  {
    time: '9:15 PM',
    title: 'ពិធីពិសាភោជនាហារ និងតន្ត្រីប្រពៃណី',
    description: 'ពិសាភោជនាហារដ៏ឈ្ងុយឆ្ងាញ់ ចាក់ស្រាសំប៉ាញអបអរសាទរ និងស្តាប់បទភ្លេងដ៏រ៉ូមែនទិក ជាមួយការជជែកសំណេះសំណាលរីករាយ។',
    location: 'បរិវេណសួនមង្គល',
    badge: 'ពិសាអាហារ',
  },
  {
    time: '11:00 PM',
    title: 'ជូនដំណើរភ្ញៀវកិត្តិយស និងវត្ថុអនុស្សាវរីយ៍',
    description: 'ថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅដល់ភ្ញៀវកិត្តិយសទាំងអស់ ព្រមទាំងជូនវត្ថុអនុស្សាវរីយ៍ជាចំណងដៃនៃពិធីភ្ជាប់ពាក្យ។',
    location: 'ខ្លោងទ្វារមង្គល',
    badge: 'លាគ្នា',
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
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#eaf5fc] via-[#dcedf8] to-[#e4f1fa] px-6 py-4 flex items-center justify-between border-b border-sky-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#0a6699] flex items-center justify-center shadow-xs">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-khmer-sans text-[#0a6699] font-bold">
                  កម្មវិធីលម្អិត
                </span>
                <h3 className="font-khmer-moul text-lg text-slate-800 leading-normal">
                  កម្មវិធីពិធីភ្ជាប់ពាក្យ
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

          {/* Content Body */}
          <div className="p-6 overflow-y-auto space-y-6">
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
                      <span className="text-[10px] font-khmer-sans px-2.5 py-0.5 rounded-full bg-sky-100 text-[#096e9f] font-semibold">
                        {evt.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-khmer-sans font-bold text-base text-slate-800 mt-1 leading-snug">
                    {evt.title}
                  </h4>

                  <p className="text-xs font-khmer-sans text-slate-600 mt-1 leading-relaxed">
                    {evt.description}
                  </p>

                  <p className="text-[11px] font-khmer-sans text-slate-400 mt-1 italic">
                    📍 {evt.location}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Dress Code Section */}
            <div className="p-4 rounded-2xl bg-[#f0f8fd] border border-[#bfe3f7] space-y-3">
              <div className="flex items-center gap-2">
                <Shirt className="w-4 h-4 text-[#0a6699]" />
                <h4 className="text-xs font-bold font-khmer-sans text-slate-800">
                  សំលៀកបំពាក់ &amp; ពណ៌ណែនាំ
                </h4>
              </div>

              <p className="text-xs font-khmer-sans text-slate-600 leading-relaxed">
                យើងខ្ញុំសូមគោរពអញ្ជើញភ្ញៀវកិត្តិយសទាំងអស់ ស្លៀកពាក់{' '}
                <strong className="text-slate-800">សំលៀកបំពាក់ប្រពៃណីខ្មែរ (ហូល ផាមួង) ឬឈុតសមរម្យ</strong> តាមការគួរ។
              </p>

              <div className="pt-1">
                <span className="text-[11px] font-khmer-sans font-semibold text-slate-500 block mb-2">
                  កាតាឡុកពណ៌ណែនាំ៖
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="w-full h-8 rounded-lg bg-[#d9effa] border border-[#bce4f8] shadow-2xs mb-1 hover:scale-105 transition-transform" />
                    <span className="text-[10px] text-slate-600 font-khmer-sans">ផ្ទៃមេឃស្រាល</span>
                  </div>
                  <div>
                    <div className="w-full h-8 rounded-lg bg-[#ffffff] border border-slate-200 shadow-2xs mb-1 hover:scale-105 transition-transform" />
                    <span className="text-[10px] text-slate-600 font-khmer-sans">ពណ៌ស</span>
                  </div>
                  <div>
                    <div className="w-full h-8 rounded-lg bg-[#276f9d] border border-sky-800 shadow-2xs mb-1 hover:scale-105 transition-transform" />
                    <span className="text-[10px] text-slate-600 font-khmer-sans">ខៀវស្រស់</span>
                  </div>
                  <div>
                    <div className="w-full h-8 rounded-lg bg-[#f0e6cf] border border-[#ded0b1] shadow-2xs mb-1 hover:scale-105 transition-transform" />
                    <span className="text-[10px] text-slate-600 font-khmer-sans">មាសស្រាល</span>
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
