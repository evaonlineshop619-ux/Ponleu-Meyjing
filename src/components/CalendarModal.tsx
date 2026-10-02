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
                <span className="text-[10px] font-sans-clean tracking-[0.2em] text-[#0a6699] font-bold uppercase">
                  Save The Date
                </span>
                <h3 className="font-serif-elegant italic text-2xl text-slate-800 leading-none">
                  Engagement Ceremony
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
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Date Highlight Card */}
            <div className="p-5 rounded-2xl bg-[#f0f8fd] border border-[#bfe3f7] text-center">
              <span className="text-xs font-sans-clean font-bold tracking-[0.2em] text-[#0a6699] uppercase">
                TUESDAY
              </span>
              <div className="font-serif-elegant text-3xl sm:text-4xl text-slate-800 my-1 font-normal">
                August 17, 2027
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-sans-clean text-[#0c78b4] font-semibold tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>8:00 PM ONWARDS (ICT / GMT+7)</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                The bride's house · Phnom Penh City (GR4H+89W)
              </p>
            </div>

            {/* Direct Calendar Actions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold font-sans-clean text-slate-800 uppercase tracking-wider">
                Add to Your Calendar
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 rounded-xl bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs font-sans-clean font-bold tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Google Calendar</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                <button
                  onClick={downloadIcsFile}
                  className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-sans-clean font-bold tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4" />
                  <span>Apple / Outlook (.ICS)</span>
                </button>
              </div>
            </div>

            {/* Quick Schedule Preview */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-sans-clean text-slate-700 uppercase tracking-wider">
                  Evening Flow
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenSchedule();
                  }}
                  className="text-xs font-sans-clean text-[#0d7bb8] hover:underline font-semibold"
                >
                  View Full Program →
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-slate-400 font-semibold w-16">7:30 PM</span>
                  <span>Welcome Tea &amp; Guest Reception</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-sky-700 font-bold w-16">8:00 PM</span>
                  <span className="font-medium text-slate-800">Formal Engagement Ceremony</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-slate-400 font-semibold w-16">8:45 PM</span>
                  <span>Ring Exchange &amp; Family Blessings</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-slate-400 font-semibold w-16">9:15 PM</span>
                  <span>Celebration Dinner &amp; Music</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-sky-50/60 p-3 rounded-xl border border-sky-100">
              <Bell className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>
                We recommend setting a reminder 1 week and 1 day prior (August 10 &amp; 16).
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
