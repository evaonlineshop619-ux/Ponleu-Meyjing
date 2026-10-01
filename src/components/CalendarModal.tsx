import React from 'react';
import { X, Calendar as CalendarIcon, Download, ExternalLink, Clock, Bell, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/invitation';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSchedule: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  onOpenSchedule,
}) => {
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
                <CalendarIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-khmer-sans text-[#0a6699] font-bold">
                  រក្សាទុកកាលបរិច្ឆេទ
                </span>
                <h3 className="font-khmer-moul text-lg text-slate-800 leading-normal">
                  ពិធីភ្ជាប់ពាក្យ
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
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Date Highlight Card */}
            <div className="p-5 rounded-2xl bg-[#f0f8fd] border border-[#bfe3f7] text-center">
              <span className="text-xs font-khmer-sans font-bold text-[#0a6699]">
                ថ្ងៃអង្គារ
              </span>
              <div className="font-khmer-sans font-bold text-2xl sm:text-3xl text-slate-800 my-1">
                ទី១៧ ខែសីហា ឆ្នាំ២០២៧
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-khmer-sans text-[#0c78b4] font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>វេលាម៉ោង ៨:០០ យប់ តទៅ</span>
              </div>
              <p className="text-xs font-khmer-sans text-slate-500 mt-2">
                គេហដ្ឋានខាងស្រី · រាជធានីភ្នំពេញ (GR4H+89W)
              </p>
            </div>

            {/* Direct Calendar Actions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold font-khmer-sans text-slate-800">
                បញ្ចូលទៅក្នុងប្រតិទិនរបស់អ្នក
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs font-khmer-sans font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Google Calendar</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                <button
                  onClick={downloadIcsFile}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-khmer-sans font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Apple / Outlook (.ICS)</span>
                </button>
              </div>
            </div>

            {/* Quick Schedule Preview */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-khmer-sans text-slate-700">
                  កម្មវិធីសង្ខេប
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenSchedule();
                  }}
                  className="text-xs font-khmer-sans text-[#0d7bb8] hover:underline font-semibold cursor-pointer"
                >
                  មើលកម្មវិធីទាំងមូល →
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-600 font-khmer-sans">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-slate-400 font-semibold w-16">7:30 PM</span>
                  <span>ពិធីទទួលភ្ញៀវ និងតែផ្កាម្លិះ</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-sky-700 font-bold w-16">8:00 PM</span>
                  <span className="font-medium text-slate-800">ពិធីរៀបផ្លែឈើ និងសែនជួបជុំសាច់ញាតិ</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-slate-400 font-semibold w-16">8:45 PM</span>
                  <span>ពិធីបំពាក់ចិញ្ចៀនភ្ជាប់ពាក្យ</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-slate-400 font-semibold w-16">9:15 PM</span>
                  <span>ពិធីពិសាភោជនាហារ និងតន្ត្រី</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-khmer-sans text-slate-500 bg-sky-50/60 p-3 rounded-xl border border-sky-100">
              <Bell className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>
                យើងខ្ញុំសូមណែនាំឱ្យកំណត់ការរំលឹកទុកជាមុន ១ សប្តាហ៍ និង ១ ថ្ងៃមុនពិធី (ថ្ងៃទី១០ និង ១៦ ខែសីហា)។
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
