import React, { useState } from 'react';
import { X, CheckCircle, Heart, Send, Sparkles, AlertCircle, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fireGrandCelebrationConfetti } from '../utils/confetti';
import { RsvpSubmission } from '../types';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRsvp: (rsvp: RsvpSubmission) => void;
  onViewGuestbook: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  onClose,
  onSubmitRsvp,
  onViewGuestbook,
}) => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'declined'>('attending');
  const [guestsCount, setGuestsCount] = useState(1);
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState<RsvpSubmission['relationship']>('bride_friend');
  const [dietary, setDietary] = useState('none');
  const [customDietary, setCustomDietary] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }

    const newRsvp: RsvpSubmission = {
      id: 'rsvp-' + Date.now(),
      name: name.trim(),
      attendance,
      guestsCount: attendance === 'attending' ? guestsCount : 0,
      phone: phone.trim() || undefined,
      relationship,
      dietary: dietary === 'other' ? customDietary.trim() : dietary,
      message: message.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    onSubmitRsvp(newRsvp);
    setIsSubmitted(true);
    setError('');

    // Trigger grand multi-stage confetti explosion
    fireGrandCelebrationConfetti();
  };

  const handleReplayConfetti = () => {
    fireGrandCelebrationConfetti();
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setMessage('');
    setPhone('');
    onClose();
  };

  // Pre-calculated particle burst offsets for in-modal celebratory explosion
  const burstParticles = [
    { icon: '💍', x: -85, y: -70, rot: -25, delay: 0.1 },
    { icon: '🎉', x: 85, y: -75, rot: 20, delay: 0.15 },
    { icon: '✨', x: -115, y: -10, rot: -15, delay: 0.2 },
    { icon: '💙', x: 115, y: -15, rot: 15, delay: 0.25 },
    { icon: '🥂', x: -80, y: 55, rot: -30, delay: 0.3 },
    { icon: '🎊', x: 80, y: 50, rot: 25, delay: 0.35 },
    { icon: '⭐', x: 0, y: -95, rot: 0, delay: 0.12 },
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
                RSVP Confirmation
              </span>
              <h3 className="font-serif-elegant italic text-2xl text-slate-800">
                Ponleu &amp; Meyjing
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 relative"
              >
                {/* In-modal Animated Particle Burst */}
                <div className="relative w-24 h-24 mx-auto mb-5 flex items-center justify-center">
                  {/* Expanding radial glow ring */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0.8 }}
                    animate={{ scale: [1, 1.4, 1.2], opacity: [0.8, 0.2, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400/30 to-amber-300/30 blur-md"
                  />

                  {/* Radiating Confetti Emojis */}
                  {burstParticles.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.3, 1],
                        x: p.x,
                        y: p.y,
                        rotate: [0, p.rot],
                        opacity: 1,
                      }}
                      transition={{
                        delay: p.delay,
                        type: 'spring',
                        stiffness: 280,
                        damping: 18,
                      }}
                      className="absolute text-xl pointer-events-none select-none drop-shadow-sm"
                    >
                      {p.icon}
                    </motion.div>
                  ))}

                  {/* Central Success Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="w-20 h-20 bg-gradient-to-tr from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] rounded-full flex items-center justify-center text-white shadow-lg shadow-sky-500/30 relative z-10"
                  >
                    <PartyPopper className="w-10 h-10 drop-shadow-xs" />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-[11px] font-sans-clean font-bold tracking-[0.2em] text-[#0a6699] uppercase block mb-1">
                    🎉 Celebration Confirmed
                  </span>
                  <h4 className="font-serif-elegant text-3xl text-slate-800 mb-2">
                    Thank You, {name}!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto mb-6 leading-relaxed">
                    {attendance === 'attending'
                      ? `Your RSVP for ${guestsCount} guest${guestsCount > 1 ? 's' : ''} has been joyfully recorded. Ponleu and Meyjing eagerly look forward to welcoming you on Tuesday, August 17, 2027!`
                      : `Your response has been noted. Ponleu and Meyjing deeply appreciate your warm wishes and blessings from afar!`}
                  </p>
                </motion.div>

                {/* Celebration Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReplayConfetti}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 text-xs font-sans-clean font-bold tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Replay Confetti 🎊</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onViewGuestbook}
                    className="px-5 py-2.5 rounded-full bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs font-sans-clean font-bold tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>View Guestbook Wishes</span>
                  </motion.button>

                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-sans-clean font-medium transition-all"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed font-sans-clean">
                  Kindly respond by <strong className="text-slate-700">August 1st, 2027</strong> to
                  help us prepare seating and celebratory refreshments for this joyful evening.
                </p>

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl flex items-center gap-2 border border-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Attendance Choice */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2 font-sans-clean uppercase tracking-wider">
                    Will you be attending? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttendance('attending')}
                      className={`py-3 px-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        attendance === 'attending'
                          ? 'border-[#1289dc] bg-[#ebf7fd] text-[#0d7bb8] font-bold shadow-xs scale-[1.01]'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-sm font-sans-clean">✨ Joyfully Accepts</span>
                      <span className="text-[10px] text-slate-500">I will celebrate in person</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance('declined')}
                      className={`py-3 px-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        attendance === 'declined'
                          ? 'border-slate-500 bg-slate-100 text-slate-800 font-bold shadow-xs scale-[1.01]'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-sm font-sans-clean">💌 Regretfully Declines</span>
                      <span className="text-[10px] text-slate-500">Sending love from afar</span>
                    </button>
                  </div>
                </div>

                {/* Guest Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans-clean">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sothea Chan / Sokha &amp; Family"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1289dc] focus:ring-2 focus:ring-sky-100 text-sm outline-none transition-all"
                  />
                </div>

                {/* Attendance Details (if Attending) */}
                {attendance === 'attending' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans-clean">
                          Number of Attending Guests
                        </label>
                        <select
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1289dc] focus:ring-2 focus:ring-sky-100 text-sm outline-none bg-white"
                        >
                          <option value={1}>1 Guest (Just me)</option>
                          <option value={2}>2 Guests (Me + Plus one)</option>
                          <option value={3}>3 Guests</option>
                          <option value={4}>4 Guests (Family table)</option>
                          <option value={5}>5+ Guests</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans-clean">
                          Phone or Telegram
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 012 345 678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1289dc] focus:ring-2 focus:ring-sky-100 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Relationship */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans-clean">
                        Relation to the Couple
                      </label>
                      <select
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value as RsvpSubmission['relationship'])}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1289dc] focus:ring-2 focus:ring-sky-100 text-sm outline-none bg-white"
                      >
                        <option value="bride_friend">Friend of Meyjing (Bride)</option>
                        <option value="groom_friend">Friend of Ponleu (Groom)</option>
                        <option value="bride_family">Family of Bride</option>
                        <option value="groom_family">Family of Groom</option>
                        <option value="colleague">Colleague / Work Partner</option>
                        <option value="other">Mutual Friend / Honored Guest</option>
                      </select>
                    </div>

                    {/* Dietary Requirements */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans-clean">
                        Dietary Preferences
                      </label>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {[
                          { id: 'none', label: 'No Restriction' },
                          { id: 'vegetarian', label: 'Vegetarian' },
                          { id: 'halal', label: 'Halal' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setDietary(item.id)}
                            className={`py-2 px-2 rounded-lg border text-center transition-all ${
                              dietary === item.id
                                ? 'border-[#1289dc] bg-[#ebf7fd] text-[#0d7bb8] font-bold'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Congratulatory Message / Blessing */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans-clean flex items-center justify-between">
                    <span>Blessing &amp; Message for Ponleu &amp; Meyjing</span>
                    <span className="text-[10px] text-slate-400 font-normal">Will appear in guestbook</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Share your warm congratulations, wishes, or blessings for the couple..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1289dc] focus:ring-2 focus:ring-sky-100 text-sm outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-[#1289dc] hover:bg-[#0c7ac6] text-white font-sans-clean font-bold text-xs tracking-[0.2em] shadow-md shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer animate-shimmer-btn"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>SUBMIT RSVP</span>
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
