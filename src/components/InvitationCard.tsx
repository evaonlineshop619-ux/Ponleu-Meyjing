import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Copy,
  Check,
  ArrowRight,
  Share2,
  Heart,
  Volume2,
  VolumeX,
  BookOpen,
  Clock,
  Sparkles,
  Gift,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BotanicalCorner,
  IntertwinedRings,
  BokehParticles,
} from './DecorativeOrnaments';
import { calculateTimeLeft, TimeLeft } from '../utils/invitation';
import { ceremonyAudio } from '../utils/audio';

interface InvitationCardProps {
  onOpenRsvp: () => void;
  onOpenDirections: () => void;
  onOpenCalendar: () => void;
  onOpenSchedule: () => void;
  onOpenStory: () => void;
  onOpenGuestbook: () => void;
  onOpenShare: () => void;
  onOpenGiftRegistry: () => void;
  guestCount?: number;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  onOpenRsvp,
  onOpenDirections,
  onOpenCalendar,
  onOpenSchedule,
  onOpenStory,
  onOpenGuestbook,
  onOpenShare,
  onOpenGiftRegistry,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [copiedCode, setCopiedCode] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(ceremonyAudio.getIsPlaying());
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const unsub = ceremonyAudio.subscribe((playing: boolean) => {
      setIsPlayingMusic(playing);
    });
    return unsub;
  }, []);

  const handleCopyMapCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText('GR4H+89W Phnom Penh');
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    } catch {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    }
  };

  const toggleMusic = () => {
    ceremonyAudio.toggle();
  };

  // Interactive celebratory heart float on tap/click
  const handleSpawnHeart = (e: React.MouseEvent<HTMLDivElement>) => {
    // Start music on first tap if not playing yet
    if (!ceremonyAudio.getIsPlaying()) {
      ceremonyAudio.play();
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newHeart = { id: Date.now() + Math.random(), x, y };

    setFloatingHearts((prev) => [...prev.slice(-6), newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleSpawnHeart}
      className="relative w-full max-w-[440px] mx-auto min-h-screen sm:min-h-0 sm:my-8 bg-gradient-to-b from-[#eaf5fc] via-[#dcedf8] to-[#d3e8f6] rounded-none sm:rounded-[36px] shadow-[0_20px_60px_rgba(30,115,175,0.18)] border-0 sm:border sm:border-white/80 overflow-hidden flex flex-col justify-between p-5 sm:p-7 select-none"
    >
      {/* Background Subtle Watermark Calligraphy with slow breathing animation */}
      <motion.div
        animate={{ scale: [1.2, 1.25, 1.2], opacity: [0.06, 0.09, 0.06] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-script text-[92px] sm:text-[110px] text-sky-400 rotate-[-12deg] whitespace-nowrap">
          Engagement Ceremony
        </span>
      </motion.div>

      {/* Floating Bokeh Glows & Falling Petals */}
      <BokehParticles />

      {/* Floating Hearts spawned on tap */}
      <AnimatePresence>
        {floatingHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, scale: 0.6, x: h.x - 12, y: h.y - 12 }}
            animate={{ opacity: 0, scale: 1.5, y: h.y - 80 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute pointer-events-none z-30 text-rose-400 select-none text-lg"
          >
            💍
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Quick Action Controls (Sound, Share, View Details) */}
      <div className="relative z-20 flex items-center justify-between w-full mb-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleMusic();
          }}
          aria-label={isPlayingMusic ? 'Pause song: All3rgy - បើគ្មាននិស្ស័យ' : 'Play song: All3rgy - បើគ្មាននិស្ស័យ'}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-medium shadow-xs border transition-all ${
            isPlayingMusic
              ? 'bg-white/95 border-[#9fd3f2] text-[#0a6ca1] shadow-sky-500/20'
              : 'bg-white/70 hover:bg-white/95 border-white/80 text-slate-600'
          }`}
          title="All3rgy - បើគ្មាននិស្ស័យ"
        >
          {isPlayingMusic ? (
            <>
              {/* Mini animated equalizer waves */}
              <div className="flex items-end gap-[2px] h-3 w-3">
                <span className="w-[2px] bg-[#1289dc] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
                <span className="w-[2px] bg-[#1289dc] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.15s] h-3" />
                <span className="w-[2px] bg-[#1289dc] rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.3s] h-1.5" />
              </div>
              <span className="text-[11px] font-sans-clean font-semibold tracking-tight text-[#0a6ca1]">
                បើគ្មាននិស្ស័យ ♫
              </span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px] font-sans-clean text-slate-600">Play Music</span>
            </>
          )}
        </motion.button>

        <div className="flex items-center gap-1.5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onOpenGiftRegistry();
            }}
            aria-label="Wedding Gift Registry"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/70 hover:bg-white/95 backdrop-blur-md text-[#0d7bb8] text-xs font-medium shadow-xs border border-white/80 transition-colors"
            title="Gift Registry & Blessings"
          >
            <Gift className="w-3.5 h-3.5 text-[#0d7bb8]" />
            <span className="text-[11px] font-sans-clean font-semibold">Registry</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onOpenShare();
            }}
            aria-label="Share invitation"
            className="w-8 h-8 rounded-full bg-white/70 hover:bg-white/95 backdrop-blur-md text-[#157cb8] flex items-center justify-center shadow-xs border border-white/80 transition-colors"
            title="Share with friends"
          >
            <Share2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      {/* Botanical Corner Ornaments: Top Corners with breeze animation */}
      <div className="absolute top-0 left-0 pointer-events-none z-10">
        <BotanicalCorner position="top-left" />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none z-10">
        <BotanicalCorner position="top-right" />
      </div>

      {/* Header Invitation Text */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="relative z-10 text-center pt-2 sm:pt-3"
      >
        <p className="font-serif-elegant uppercase tracking-[0.28em] text-[11px] sm:text-[12px] text-slate-600 font-semibold mb-1">
          YOU'RE INVITED TO THE
        </p>
        <h2 className="font-serif-elegant italic text-2xl sm:text-[30px] text-slate-800 tracking-wide font-normal">
          Engagement Ceremony
        </h2>

        {/* Central Intertwined Rings Symbol with sparkling diamond glint */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="my-2 sm:my-3 cursor-pointer"
        >
          <IntertwinedRings />
        </motion.div>

        {/* Couple Names in Flowing Romantic Script */}
        <motion.h1
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="font-script text-[34px] sm:text-[40px] text-[#1c2e3d] leading-[1.1] tracking-wide my-1 cursor-default"
        >
          Ponleu &amp; Meyjing
        </motion.h1>

        {/* Subtitle with decorative divider lines */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[1px] w-10 sm:w-16 bg-sky-300/80 origin-right"
          />
          <span className="text-[10px] sm:text-[11px] font-sans-clean tracking-[0.24em] text-slate-600 font-semibold uppercase">
            TOGETHER WITH FAMILIES
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[1px] w-10 sm:w-16 bg-sky-300/80 origin-left"
          />
        </div>
      </motion.div>

      {/* Central Event Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="relative z-10 my-4 sm:my-5"
      >
        <div className="glass-card rounded-[26px] p-6 sm:p-7 shadow-[0_12px_36px_rgba(40,120,180,0.12)] border border-white/90 text-center transition-shadow duration-300 hover:shadow-[0_16px_44px_rgba(40,120,180,0.18)]">
          {/* Ceremony Date */}
          <h3 className="font-serif-elegant italic text-[23px] sm:text-[25px] text-slate-800 leading-snug font-normal">
            Tuesday, August 17, 2027
          </h3>

          {/* Time & Onwards */}
          <div className="font-sans-clean font-bold tracking-[0.22em] text-[13px] sm:text-[14px] text-[#056fae] mt-1.5 uppercase">
            8:00 PM ONWARDS
          </div>

          {/* Numerical Date Format */}
          <div className="text-[11px] tracking-[0.15em] text-slate-400 font-sans-clean mt-1 font-medium">
            17.08.2027
          </div>

          {/* Fine Sky Divider */}
          <div className="w-20 h-[1.5px] bg-[#9fd0ef]/80 mx-auto my-3" />

          {/* Venue Location */}
          <p className="font-serif-elegant text-[19px] sm:text-[21px] text-slate-800 font-normal leading-tight">
            The bride's house
          </p>
          <p className="text-xs sm:text-[13px] font-sans-clean text-slate-500 tracking-wide mt-1">
            Phnom Penh City
          </p>

          {/* Map Code Box with Animated Copy Feedback */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleCopyMapCode}
            type="button"
            className="mt-3.5 mx-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ebf7fd] border border-[#bce4f8] text-[#0b7cb8] text-xs font-sans-clean transition-colors hover:bg-[#ddf1fc] group"
            title="Click to copy map code"
          >
            {copiedCode ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#0b7cb8] opacity-80 group-hover:opacity-100 transition-opacity" />
            )}
            <span className="font-normal text-slate-600">Map Code:</span>
            <span className="font-bold tracking-tight text-[#086b9f]">GR4H+89W Phnom Penh</span>
            {copiedCode && (
              <span className="text-[10px] text-emerald-600 font-semibold ml-1">Copied!</span>
            )}
          </motion.button>

          {/* Action Buttons: DIRECTIONS and CALENDAR */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenDirections();
              }}
              type="button"
              className="glass-pill flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full border border-[#bee4f7] text-[#0d7bb8] text-xs font-sans-clean font-bold tracking-wider hover:bg-[#d9effa] hover:border-[#96d1f3] transition-all shadow-2xs"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0d7bb8]" />
              <span>DIRECTIONS</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenCalendar();
              }}
              type="button"
              className="glass-pill flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full border border-[#bee4f7] text-[#0d7bb8] text-xs font-sans-clean font-bold tracking-wider hover:bg-[#d9effa] hover:border-[#96d1f3] transition-all shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0d7bb8]" />
              <span>CALENDAR</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Countdown Section with Pop-on-Tick Digit Animations */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="relative z-10 text-center mb-4"
      >
        <p className="font-sans-clean text-[10px] sm:text-[11px] tracking-[0.25em] text-[#3d7092] font-semibold uppercase mb-2.5">
          COUNTING DOWN TO THE MOMENT
        </p>

        {/* 4 Countdown Blocks with keyframe animation on tick */}
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5 max-w-[360px] mx-auto">
          {/* Days */}
          <div className="glass-card rounded-2xl py-3 px-1 text-center shadow-xs border border-white/90">
            <span
              key={`days-${timeLeft.days}`}
              className="block font-serif-elegant text-2xl sm:text-[28px] text-slate-800 leading-none font-normal animate-digit-change"
            >
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="block text-[9px] font-sans-clean tracking-[0.2em] text-slate-400 font-semibold uppercase mt-1">
              DAYS
            </span>
          </div>

          {/* Hours */}
          <div className="glass-card rounded-2xl py-3 px-1 text-center shadow-xs border border-white/90">
            <span
              key={`hours-${timeLeft.hours}`}
              className="block font-serif-elegant text-2xl sm:text-[28px] text-slate-800 leading-none font-normal animate-digit-change"
            >
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="block text-[9px] font-sans-clean tracking-[0.2em] text-slate-400 font-semibold uppercase mt-1">
              HOURS
            </span>
          </div>

          {/* Minutes */}
          <div className="glass-card rounded-2xl py-3 px-1 text-center shadow-xs border border-white/90">
            <span
              key={`minutes-${timeLeft.minutes}`}
              className="block font-serif-elegant text-2xl sm:text-[28px] text-slate-800 leading-none font-normal animate-digit-change"
            >
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="block text-[9px] font-sans-clean tracking-[0.2em] text-slate-400 font-semibold uppercase mt-1">
              MINS
            </span>
          </div>

          {/* Seconds */}
          <div className="glass-card rounded-2xl py-3 px-1 text-center shadow-xs border border-white/90">
            <span
              key={`seconds-${timeLeft.seconds}`}
              className="block font-serif-elegant text-2xl sm:text-[28px] text-slate-800 leading-none font-normal animate-digit-change"
            >
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="block text-[9px] font-sans-clean tracking-[0.2em] text-slate-400 font-semibold uppercase mt-1">
              SECS
            </span>
          </div>
        </div>
      </motion.div>

      {/* Primary RSVP Call-to-Action Button with Shimmer Sweep and Ring Glow */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="relative z-10 text-center pb-2"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.stopPropagation();
            onOpenRsvp();
          }}
          type="button"
          className="relative overflow-hidden w-full max-w-[360px] mx-auto py-3.5 sm:py-4 px-6 rounded-full bg-[#1289dc] hover:bg-[#0c7ac6] text-white font-sans-clean font-bold text-xs sm:text-[13px] tracking-[0.22em] shadow-[0_8px_24px_rgba(18,137,220,0.38)] flex items-center justify-center gap-2.5 transition-all cursor-pointer group animate-shimmer-btn animate-ring-glow"
        >
          <span>RSVP ATTENDANCE</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </motion.button>

        <p className="font-serif-elegant italic text-xs sm:text-[13px] text-slate-600 mt-2.5 tracking-wide">
          Kindly respond by August 1st, 2027
        </p>

        {/* Supplementary Navigation links with subtle underline animations */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 mt-3 text-xs font-sans-clean text-[#157cb8]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenSchedule();
            }}
            className="flex items-center gap-1 hover:underline hover:text-[#0b6395] transition-colors"
          >
            <Clock className="w-3 h-3" />
            <span>Program Schedule</span>
          </button>
          <span className="text-sky-300">·</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenStory();
            }}
            className="flex items-center gap-1 hover:underline hover:text-[#0b6395] transition-colors"
          >
            <BookOpen className="w-3 h-3" />
            <span>Our Story</span>
          </button>
          <span className="text-sky-300">·</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenGuestbook();
            }}
            className="flex items-center gap-1 hover:underline hover:text-[#0b6395] transition-colors"
          >
            <Heart className="w-3 h-3" />
            <span>Guestbook</span>
          </button>
        </div>
      </motion.div>

      {/* Botanical Corner Ornaments: Bottom Corners with breeze animation */}
      <div className="absolute bottom-0 left-0 pointer-events-none z-10">
        <BotanicalCorner position="bottom-left" />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none z-10">
        <BotanicalCorner position="bottom-right" />
      </div>
    </motion.div>
  );
};
