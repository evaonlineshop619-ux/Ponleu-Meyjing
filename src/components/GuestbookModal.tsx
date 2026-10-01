import React, { useState } from 'react';
import { X, Heart, MessageSquare, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GuestWish } from '../types';

interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishes: GuestWish[];
  onAddWish: (wish: Omit<GuestWish, 'id' | 'createdAt' | 'likes'>) => void;
  onLikeWish: (id: string) => void;
  onOpenRsvp: () => void;
}

export const GuestbookModal: React.FC<GuestbookModalProps> = ({
  isOpen,
  onClose,
  wishes,
  onAddWish,
  onLikeWish,
  onOpenRsvp,
}) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('មិត្តភក្តិ');
  const [message, setMessage] = useState('');
  const [hasPosted, setHasPosted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onAddWish({
      name: name.trim(),
      relationship,
      message: message.trim(),
    });

    setMessage('');
    setHasPosted(true);
    setTimeout(() => setHasPosted(false), 3000);
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
          <div className="bg-gradient-to-r from-[#eaf5fc] via-[#dcedf8] to-[#e4f1fa] px-6 py-4 flex items-center justify-between border-b border-sky-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#0a6699] flex items-center justify-center shadow-xs">
                <Heart className="w-4 h-4 fill-sky-200 text-[#0a6699]" />
              </div>
              <div>
                <span className="text-[11px] font-khmer-sans text-[#0a6699] font-bold">
                  សៀវភៅពាក្យប្រសិទ្ធពរ
                </span>
                <h3 className="font-khmer-moul text-lg text-slate-800 leading-normal">
                  ពាក្យជូនពរពីភ្ញៀវកិត្តិយស
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
            {/* Quick Post Box */}
            <form onSubmit={handleSubmit} className="p-4 rounded-2xl bg-[#f0f8fd] border border-[#bfe3f7] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-khmer-sans text-[#096e9f]">
                  ផ្ញើពាក្យជូនពរដល់គូដណ្តឹង
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenRsvp();
                  }}
                  className="text-[11px] font-khmer-sans text-[#0d7bb8] hover:underline font-semibold cursor-pointer"
                >
                  ឆ្លើយតបចូលរួម (RSVP) →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="ឈ្មោះរបស់លោកអ្នក"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-sky-200 text-xs font-khmer-sans outline-none focus:ring-2 focus:ring-sky-200"
                />
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-sky-200 text-xs font-khmer-sans outline-none focus:ring-2 focus:ring-sky-200"
                >
                  <option value="មិត្តភក្តិ">មិត្តភក្តិ</option>
                  <option value="សាច់ញាតិខាងស្រី">សាច់ញាតិខាងស្រី</option>
                  <option value="សាច់ញាតិខាងប្រុស">សាច់ញាតិខាងប្រុស</option>
                  <option value="មិត្តរួមការងារ">មិត្តរួមការងារ</option>
                  <option value="ភ្ញៀវកិត្តិយស">ភ្ញៀវកិត្តិយស</option>
                </select>
              </div>

              <textarea
                required
                rows={2}
                placeholder="សរសេរពាក្យជូនពរ ឬអបអរសាទរនៅទីនេះ..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-sky-200 text-xs font-khmer-sans outline-none focus:ring-2 focus:ring-sky-200 resize-none"
              />

              <div className="flex items-center justify-between">
                {hasPosted ? (
                  <span className="text-xs font-khmer-sans text-emerald-600 font-semibold animate-pulse">
                    ✓ ពាក្យជូនពរត្រូវបានបង្ហោះដោយជោគជ័យ!
                  </span>
                ) : (
                  <span className="text-[11px] font-khmer-sans text-slate-400">
                    ចែករំលែកលើផ្ទាំងជូនពរ ពន្លឺ &amp; ម៉ីជីង
                  </span>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs font-khmer-sans font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>ផ្ញើពរជ័យ</span>
                </motion.button>
              </div>
            </form>

            {/* Wishes List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold font-khmer-sans text-slate-700">
                ពាក្យជូនពរថ្មីៗ ({wishes.length})
              </h4>

              {wishes.map((w, index) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:border-sky-100 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-khmer-sans font-bold text-slate-800 text-sm">
                        {w.name}
                      </span>
                      <span className="text-[10px] font-khmer-sans px-2 py-0.5 rounded-full bg-sky-50 text-[#096e9f] font-medium border border-sky-100">
                        {w.relationship}
                      </span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 1.3 }}
                      onClick={() => onLikeWish(w.id)}
                      className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors text-xs cursor-pointer"
                      title="ចូលចិត្តពាក្យជូនពរនេះ"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          w.likes > 0 ? 'text-rose-500 fill-rose-500' : ''
                        }`}
                      />
                      <span className="text-[11px] font-mono">{w.likes}</span>
                    </motion.button>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-khmer-sans">
                    «{w.message}»
                  </p>

                  <span className="text-[10px] text-slate-400 block pt-1 font-mono">
                    {new Date(w.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
