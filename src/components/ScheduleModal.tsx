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
    title: 'Guest Reception & Welcome Tea',
    khmerTitle: 'ពិធីទទួលភ្ញៀវកិត្តិយស',
    description: 'Guests arrive at the bride’s home. Enjoy traditional jasmine welcome tea, sweet refreshments, and photo booth moments.',
    location: "Bride's Courtyard",
    badge: 'Arrival',
  },
  {
    time: '8:00 PM',
    title: 'Formal Engagement Ceremony Commences',
    khmerTitle: 'ពិធីភ្ជាប់ពាក្យផ្លូវការ',
    description: 'Entry of Ponleu and Meyjing together with parents, presentation of fruit offering trays and traditional betrothal blessing.',
    location: 'Main Ceremonial Hall',
    badge: 'Main Ritual',
  },
  {
    time: '8:45 PM',
    title: 'Exchange of Engagement Rings',
    khmerTitle: 'ពិធីបំពាក់ចិញ្ចៀនភ្ជាប់ពាក្យ',
    description: 'Ponleu and Meyjing exchange their rings in the presence of parents, elders, and cherished guests, accompanied by family blessing speeches.',
    location: 'Main Ceremonial Stage',
    badge: 'Milestone',
  },
  {
    time: '9:15 PM',
    title: 'Celebration Banquet & Music',
    khmerTitle: 'ពិធីជប់លៀងអបអរសាទរ',
    description: 'An evening of Cambodian and international delicacies, champagne toast, live acoustic melodies, and heartfelt camaraderie.',
    location: 'Garden Pavilion',
    badge: 'Dinner & Toast',
  },
  {
    time: '11:00 PM',
    title: 'Warm Farewell & Keepsake Gifts',
    khmerTitle: 'ជូនដំណើរភ្ញៀវកិត្តិយស',
    description: 'Expressing gratitude to all guests with customized celebration favors and group photos with the couple.',
    location: 'Courtyard Archway',
    badge: 'Farewell',
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
                <span className="text-[10px] font-sans-clean tracking-[0.2em] text-[#0a6699] font-bold uppercase">
                  Ceremony Itinerary
                </span>
                <h3 className="font-serif-elegant italic text-2xl text-slate-800 leading-none">
                  Evening Program
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
                      <span className="text-[10px] font-sans-clean px-2 py-0.5 rounded-full bg-sky-100 text-[#096e9f] font-semibold">
                        {evt.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif-elegant text-lg text-slate-800 mt-0.5 leading-snug">
                    {evt.title}
                  </h4>
                  {evt.khmerTitle && (
                    <p className="text-[11px] text-slate-500 font-sans-clean -mt-0.5">
                      {evt.khmerTitle}
                    </p>
                  )}

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {evt.description}
                  </p>

                  <p className="text-[11px] text-slate-400 mt-1 italic">
                    📍 {evt.location}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Dress Code Section */}
            <div className="p-4 rounded-2xl bg-[#f0f8fd] border border-[#bfe3f7] space-y-3">
              <div className="flex items-center gap-2">
                <Shirt className="w-4 h-4 text-[#0a6699]" />
                <h4 className="text-xs font-bold font-sans-clean text-slate-800 uppercase tracking-wider">
                  Dress Code &amp; Palette
                </h4>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                We invite our cherished guests to dress in{' '}
                <strong className="text-slate-800">Smart Formal, Elegant Cocktail, or Traditional Khmer Attire</strong>.
              </p>

              <div className="pt-1">
                <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                  Recommended Color Palette:
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="w-full h-8 rounded-lg bg-[#d9effa] border border-[#bce4f8] shadow-2xs mb-1 hover:scale-105 transition-transform" />
                    <span className="text-[10px] text-slate-600 font-sans-clean">Pastel Sky</span>
                  </div>
                  <div>
                    <div className="w-full h-8 rounded-lg bg-[#ffffff] border border-slate-200 shadow-2xs mb-1 hover:scale-105 transition-transform" />
                    <span className="text-[10px] text-slate-600 font-sans-clean">Soft Ivory</span>
                  </div>
                  <div>
                    <div className="w-full h-8 rounded-lg bg-[#276f9d] border border-sky-800 shadow-2xs mb-1 hover:scale-105 transition-transform" />
                    <span className="text-[10px] text-slate-600 font-sans-clean">Cerulean</span>
                  </div>
                  <div>
                    <div className="w-full h-8 rounded-lg bg-[#f0e6cf] border border-[#ded0b1] shadow-2xs mb-1 hover:scale-105 transition-transform" />
                    <span className="text-[10px] text-slate-600 font-sans-clean">Champagne</span>
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
