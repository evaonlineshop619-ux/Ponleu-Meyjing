/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Heart,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  BookOpen,
  Share2,
  Users,
  Sparkles,
  Smartphone,
  CheckCircle,
  Music,
  ExternalLink,
  Gift,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Navigation,
  Download,
  Shirt,
  MessageCircleHeart,
  Phone,
  ArrowRight,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { InvitationCard } from './components/InvitationCard';
import { RsvpModal } from './components/RsvpModal';
import { DirectionsModal } from './components/DirectionsModal';
import { CalendarModal } from './components/CalendarModal';
import { ScheduleModal } from './components/ScheduleModal';
import { StoryGalleryModal } from './components/StoryGalleryModal';
import { GuestbookModal } from './components/GuestbookModal';
import { ShareModal } from './components/ShareModal';
import { GiftRegistryModal } from './components/GiftRegistryModal';
import { RsvpSubmission, GuestWish } from './types';
import { ceremonyAudio } from './utils/audio';
import { calculateTimeLeft, TimeLeft, getGoogleCalendarUrl, downloadIcsFile } from './utils/invitation';
import { BokehParticles } from './components/DecorativeOrnaments';

import heroImg from './assets/images/hero_engagement_ceremony_1790854646265.jpg';
import storyAngkorImg from './assets/images/story_angkor_sunrise_1790854665750.jpg';
import ringsTrayImg from './assets/images/rings_jasmine_tray_1790854677694.jpg';

const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'wish-1',
    name: 'តារា & ស្រីពៅ',
    relationship: 'សាច់ញាតិខាងស្រី',
    message: 'សូមអបអរសាទរពិធីភ្ជាប់ពាក្យរបស់ប្អូនទាំងពីរ! សូមឱ្យមានសុភមង្គល សុខភាពល្អ និងសេចក្តីស្រឡាញ់ស្មោះត្រង់ជារៀងរហូត។',
    createdAt: '2026-09-28T10:00:00Z',
    likes: 18,
  },
  {
    id: 'wish-2',
    name: 'សុភាព ខេម',
    relationship: 'មិត្តភក្តិកូនកំលោះ',
    message: 'អបអរសាទរ ពន្លឺ & ម៉ីជីង! តាំងពីសម័យរៀនសាកលវិទ្យាល័យនៅភ្នំពេញ រហូតដល់ថ្ងៃមង្គលនេះ ពិតជារំភើប និងមានមោទនភាពចំពោះអ្នកទាំងពីរណាស់។ ជួបគ្នានៅថ្ងៃទី១៧ ខែសីហា!',
    createdAt: '2026-09-29T14:30:00Z',
    likes: 12,
  },
  {
    id: 'wish-3',
    name: 'ចន្ថា & សុខា',
    relationship: 'មិត្តភក្តិគ្រួសារ',
    message: 'សូមជូនពរឱ្យគូដណ្តឹងទាំងពីរទទួលបានសុភមង្គល រកស៊ីទទួលទានមានបាន និងស្រឡាញ់យល់ចិត្តគ្នាអស់មួយជីវិត!',
    createdAt: '2026-09-30T09:15:00Z',
    likes: 9,
  },
  {
    id: 'wish-4',
    name: 'វិច្ឆិកា & វណ្ណា',
    relationship: 'បងប្អូនជីដូនមួយ',
    message: 'ទន្ទឹងរង់ចាំចូលរួមពិធីមង្គលនៅគេហដ្ឋានខាងស្រីណាស់! ត្រៀមឈុតប្រពៃណីរួចរាល់ហើយ។ អបអរសាទរប្អូនទាំងពីរ!',
    createdAt: '2026-10-01T08:00:00Z',
    likes: 11,
  },
];

export default function App() {
  // Navigation & Modal states
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isGuestbookModalOpen, setIsGuestbookModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isGiftRegistryModalOpen, setIsGiftRegistryModalOpen] = useState(false);

  // Audio player state
  const [isPlayingMusic, setIsPlayingMusic] = useState(ceremonyAudio.getIsPlaying());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Inline RSVP Form state
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttendance, setRsvpAttendance] = useState<'attending' | 'declined'>('attending');
  const [rsvpGuestsCount, setRsvpGuestsCount] = useState(2);
  const [rsvpRelationship, setRsvpRelationship] = useState<RsvpSubmission['relationship']>('groom_friend');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpDietary, setRsvpDietary] = useState('');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Inline Guestbook quick wish state
  const [inlineWishName, setInlineWishName] = useState('');
  const [inlineWishRelation, setInlineWishRelation] = useState('ភ្ញៀវកិត្តិយស');
  const [inlineWishMessage, setInlineWishMessage] = useState('');
  const [wishSuccess, setWishSuccess] = useState(false);

  // RSVP & Guestbook State with localStorage persistence
  const [rsvps, setRsvps] = useState<RsvpSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('ponleu_meyjing_rsvps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem('ponleu_meyjing_wishes');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch {
      return INITIAL_WISHES;
    }
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Audio listener
  useEffect(() => {
    const unsub = ceremonyAudio.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });
    return unsub;
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ponleu_meyjing_rsvps', JSON.stringify(rsvps));
    } catch {
      // Storage unavailable
    }
  }, [rsvps]);

  useEffect(() => {
    try {
      localStorage.setItem('ponleu_meyjing_wishes', JSON.stringify(wishes));
    } catch {
      // Storage unavailable
    }
  }, [wishes]);

  // Audio toggle
  const toggleMusic = () => {
    ceremonyAudio.toggle();
  };

  // Copy Plus Code handler
  const handleCopyPlusCode = async () => {
    try {
      await navigator.clipboard.writeText('GR4H+89W Phnom Penh');
      setCopiedPlusCode(true);
      setTimeout(() => setCopiedPlusCode(false), 2200);
    } catch {
      setCopiedPlusCode(true);
      setTimeout(() => setCopiedPlusCode(false), 2200);
    }
  };

  // Copy Bank Account handler
  const handleCopyAccount = async (accountNum: string, id: string) => {
    try {
      await navigator.clipboard.writeText(accountNum);
      setCopiedAccount(id);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch {
      setCopiedAccount(id);
      setTimeout(() => setCopiedAccount(null), 2000);
    }
  };

  // Handle RSVP submission
  const handleRsvpSubmit = (newRsvp: RsvpSubmission) => {
    setRsvps((prev) => [newRsvp, ...prev]);

    if (newRsvp.message && newRsvp.message.trim()) {
      const relationLabels: Record<string, string> = {
        bride_family: 'សាច់ញាតិខាងស្រី',
        groom_family: 'សាច់ញាតិខាងប្រុស',
        bride_friend: 'មិត្តភក្តិកូនក្រមុំ',
        groom_friend: 'មិត្តភក្តិកូនកំលោះ',
        colleague: 'មិត្តរួមការងារ',
        other: 'ភ្ញៀវកិត្តិយស',
      };

      const newWish: GuestWish = {
        id: 'wish-' + Date.now(),
        name: newRsvp.name,
        relationship: relationLabels[newRsvp.relationship] || 'ភ្ញៀវកិត្តិយស',
        message: newRsvp.message.trim(),
        createdAt: new Date().toISOString(),
        likes: 1,
      };

      setWishes((prev) => [newWish, ...prev]);
    }
  };

  // Inline RSVP Form Submission
  const handleInlineRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    const newRsvp: RsvpSubmission = {
      id: 'rsvp-' + Date.now(),
      name: rsvpName.trim(),
      attendance: rsvpAttendance,
      guestsCount: rsvpAttendance === 'attending' ? rsvpGuestsCount : 0,
      relationship: rsvpRelationship,
      phone: rsvpPhone.trim() || undefined,
      dietary: rsvpDietary.trim() || undefined,
      message: rsvpMessage.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    handleRsvpSubmit(newRsvp);
    setRsvpSuccess(true);

    if (rsvpAttendance === 'attending') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#0d7bb8', '#38bdf8', '#fbbf24', '#f43f5e', '#ffffff'],
      });
    }
  };

  // Inline Wish Submission
  const handleInlineWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineWishName.trim() || !inlineWishMessage.trim()) return;

    const newWish: GuestWish = {
      id: 'wish-' + Date.now(),
      name: inlineWishName.trim(),
      relationship: inlineWishRelation.trim() || 'ភ្ញៀវកិត្តិយស',
      message: inlineWishMessage.trim(),
      createdAt: new Date().toISOString(),
      likes: 1,
    };

    setWishes((prev) => [newWish, ...prev]);
    setInlineWishName('');
    setInlineWishMessage('');
    setWishSuccess(true);
    setTimeout(() => setWishSuccess(false), 3000);
  };

  // Like a wish
  const handleLikeWish = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  const totalGuestsAttending = rsvps
    .filter((r) => r.attendance === 'attending')
    .reduce((sum, r) => sum + (r.guestsCount || 1), 32);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbfe] text-slate-800 antialiased font-khmer-sans selection:bg-sky-200 selection:text-sky-900">
      {/* ======================================================== */}
      {/* 1. TOP BAR: Brand | Nav Links | Actions                  */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Brand title wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group"
          >
            <span className="w-8 h-8 rounded-full bg-[#1289dc]/10 text-[#0973b0] flex items-center justify-center font-khmer-moul text-sm group-hover:bg-[#1289dc]/20 transition-colors">
              ព&amp;ម
            </span>
            <span className="font-khmer-moul text-base sm:text-lg text-slate-900 tracking-tight">
              ពន្លឺ &amp; ម៉ីជីង
            </span>
          </a>

          {/* Zone 2: Navigation links in Khmer */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-bold text-slate-600">
            <button
              onClick={() => scrollToSection('ceremony')}
              className="hover:text-[#0973b0] transition-colors cursor-pointer"
            >
              ពិធីមង្គល
            </button>
            <button
              onClick={() => scrollToSection('schedule')}
              className="hover:text-[#0973b0] transition-colors cursor-pointer"
            >
              កម្មវិធី
            </button>
            <button
              onClick={() => scrollToSection('venue')}
              className="hover:text-[#0973b0] transition-colors cursor-pointer"
            >
              ទីតាំង &amp; ផែនទី
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="hover:text-[#0973b0] transition-colors cursor-pointer"
            >
              រឿងរ៉ាវស្នេហា
            </button>
            <button
              onClick={() => scrollToSection('rsvp')}
              className="hover:text-[#0973b0] transition-colors cursor-pointer"
            >
              ឆ្លើយតបចូលរួម
            </button>
            <button
              onClick={() => scrollToSection('blessings')}
              className="hover:text-[#0973b0] transition-colors cursor-pointer"
            >
              ពាក្យជូនពរ
            </button>
            <button
              onClick={() => scrollToSection('registry')}
              className="hover:text-[#0973b0] transition-colors cursor-pointer"
            >
              ចងដៃ &amp; KHQR
            </button>
          </nav>

          {/* Zone 3: Actions + Music Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Music Player Button */}
            <button
              onClick={toggleMusic}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                isPlayingMusic
                  ? 'bg-sky-50 border-sky-300 text-[#0a6ca1] shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title={isPlayingMusic ? 'ផ្អាក៖ All3rgy - បើគ្មាននិស្ស័យ' : 'ចាក់ចម្រៀងមង្គល'}
              aria-label={isPlayingMusic ? 'ផ្អាកចម្រៀង' : 'ចាក់ចម្រៀង'}
            >
              {isPlayingMusic ? (
                <>
                  <div className="flex items-end gap-[2px] h-3 w-3">
                    <span className="w-[2px] bg-[#1289dc] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
                    <span className="w-[2px] bg-[#1289dc] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.15s] h-3" />
                    <span className="w-[2px] bg-[#1289dc] rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.3s] h-1.5" />
                  </div>
                  <span className="hidden sm:inline">បើគ្មាននិស្ស័យ ♫</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">ចាក់ចម្រៀង</span>
                </>
              )}
            </button>

            {/* Digital Card Preview Modal trigger */}
            <button
              onClick={() => setIsCardModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-sky-50 text-slate-700 text-xs font-bold border border-sky-200 transition-all shadow-2xs cursor-pointer"
              title="បើកមើលកាតអញ្ជើញទូរស័ព្ទ"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#0d7bb8]" />
              <span className="hidden sm:inline">កាតទូរស័ព្ទ</span>
            </button>

            {/* Primary RSVP Action */}
            <button
              onClick={() => scrollToSection('rsvp')}
              className="px-4 py-2 rounded-full bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs font-bold tracking-wide shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              ឆ្លើយតបចូលរួម
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. HERO SECTION                                          */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-sky-100 bg-gradient-to-b from-[#eaf5fc] via-[#f1f8fc] to-[#f8fbfe]">
        <BokehParticles />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Titles & Countdown */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold tracking-widest text-[#0a6ca1]">
                <span>សិរីសួស្តី អាពាហ៍ពិពាហ៍</span>
                <span aria-hidden="true">·</span>
                <span>ពិធីភ្ជាប់ពាក្យប្រពៃណីខ្មែរ</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-khmer-moul text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.3] text-balance">
                  ពន្លឺ <span className="font-script text-4xl sm:text-5xl text-[#0d7bb8]">&amp;</span> ម៉ីជីង
                </h1>
                <p className="font-serif-elegant italic text-lg sm:text-xl text-slate-500">
                  Ponleu &amp; Meyjing's Engagement Ceremony
                </p>
                <p className="font-khmer-sans text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed pt-1">
                  ដោយមានការអនុញ្ញាត និងប្រសិទ្ធពរជ័យពីមាតាបិតាទាំងសងខាង យើងខ្ញុំសូមគោរពអញ្ជើញឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីភ្ជាប់ពាក្យរបស់យើងខ្ញុំ។
                </p>
              </div>

              {/* Date & Location */}
              <div className="py-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <CalendarIcon className="w-4 h-4 text-[#0d7bb8]" />
                  <span>ថ្ងៃអង្គារ ទី១៧ ខែសីហា ឆ្នាំ២០២៧</span>
                </div>
                <span className="hidden sm:inline text-slate-300" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Clock className="w-4 h-4 text-[#0d7bb8]" />
                  <span>វេលាម៉ោង ៨:០០ យប់ តទៅ</span>
                </div>
                <span className="hidden sm:inline text-slate-300" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <MapPin className="w-4 h-4 text-[#0d7bb8]" />
                  <span>គេហដ្ឋានខាងស្រី · រាជធានីភ្នំពេញ</span>
                </div>
              </div>

              {/* Countdown Clock */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 text-center lg:text-left">
                  រាប់ថយក្រោយឆ្ពោះទៅកាន់វេលាមង្គល
                </span>
                <div className="inline-grid grid-cols-4 gap-2 sm:gap-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-sky-100 shadow-xs">
                  <div className="text-center px-3 sm:px-5 py-2">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums block">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">ថ្ងៃ</span>
                  </div>
                  <div className="text-center px-3 sm:px-5 py-2 border-l border-slate-100">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums block">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">ម៉ោង</span>
                  </div>
                  <div className="text-center px-3 sm:px-5 py-2 border-l border-slate-100">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums block">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">នាទី</span>
                  </div>
                  <div className="text-center px-3 sm:px-5 py-2 border-l border-slate-100">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-[#0973b0] tabular-nums block">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">វិនាទី</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => scrollToSection('rsvp')}
                  className="px-6 py-3 rounded-full bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs sm:text-sm font-bold tracking-wide shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>ឆ្លើយតបចូលរួម</span>
                </button>

                <button
                  onClick={() => setIsCalendarModalOpen(true)}
                  className="px-5 py-3 rounded-full bg-white hover:bg-sky-50 text-slate-800 text-xs sm:text-sm font-bold border border-sky-200/80 shadow-2xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <CalendarIcon className="w-4 h-4 text-[#0d7bb8]" />
                  <span>រក្សាទុកកាលបរិច្ឆេទ</span>
                </button>

                <button
                  onClick={() => scrollToSection('venue')}
                  className="px-5 py-3 rounded-full bg-white hover:bg-sky-50 text-slate-800 text-xs sm:text-sm font-bold border border-sky-200/80 shadow-2xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#0d7bb8]" />
                  <span>ទីតាំង &amp; ផែនទី</span>
                </button>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="p-3 rounded-full bg-white hover:bg-sky-50 text-slate-700 border border-sky-200/80 shadow-2xs transition-all cursor-pointer"
                  title="ចែករំលែកលិខិតអញ្ជើញ"
                  aria-label="ចែករំលែកលិខិតអញ្ជើញ"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Hero Couple Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#9fd3f2]/40 via-white/50 to-[#dcecf7]/60 blur-xs -z-10" />

                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white bg-slate-100 aspect-16/10 lg:aspect-4/5">
                  <img
                    src={heroImg}
                    alt="រូបថតគូដណ្តឹង ពន្លឺ និង ម៉ីជីង ក្នុងពិធីភ្ជាប់ពាក្យប្រពៃណីខ្មែរ"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-5 text-white">
                    <div>
                      <span className="text-xs font-mono tracking-widest text-sky-200 font-semibold block">
                        ១៧.០៨.២០២៧
                      </span>
                      <p className="font-khmer-sans text-base font-bold leading-snug">
                        «បេះដូងពីរ មួយពាក្យសន្យា ស្រឡាញ់គ្នារហូតតទៅ»
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Attendee Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-md border border-sky-100 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-[#0a6ca1] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      ភ្ញៀវដែលបានបញ្ជាក់
                    </span>
                    <span className="text-sm font-bold text-slate-800 tabular-nums">
                      {totalGuestsAttending} នាក់
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. CEREMONY & SCHEDULE                                   */}
      {/* ======================================================== */}
      <section id="ceremony" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#0a6ca1]">
            ពិធីមង្គល &amp; ទំនៀមទម្លាប់ប្រពៃណីខ្មែរ
          </span>
          <h2 className="font-khmer-moul text-2xl sm:text-3xl text-slate-900 leading-normal">
            កម្មវិធីពិធីភ្ជាប់ពាក្យ
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-khmer-sans">
            ស្របតាមទំនៀមទម្លាប់ប្រពៃណីដូនតាខ្មែរ ពិធីភ្ជាប់ពាក្យជាការចងស្ពានមេត្រីភាពរវាងគ្រួសារទាំងសងខាង ដោយមានពរជ័យពីមាតាបិតា និងចាស់ទុំ។
          </p>
        </div>

        {/* 4-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-sm transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#0973b0] tabular-nums">7:30 PM</span>
              <span className="text-[11px] font-bold text-slate-500">ទទួលភ្ញៀវ</span>
            </div>
            <h3 className="font-khmer-sans font-bold text-base text-slate-900">
              ពិធីទទួលភ្ញៀវ និងតែផ្កាម្លិះ
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ភ្ញៀវកិត្តិយសអញ្ជើញមកដល់គេហដ្ឋានខាងស្រី ពិសាតែផ្កាម្លិះក្រអូប ភេសជ្ជៈត្រជាក់ និងថតរូបអនុស្សាវរីយ៍។
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-sm transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#0973b0] tabular-nums">8:00 PM</span>
              <span className="text-[11px] font-bold text-slate-500">ពិធីផ្លូវការ</span>
            </div>
            <h3 className="font-khmer-sans font-bold text-base text-slate-900">
              ពិធីរៀបផ្លែឈើ និងសែនជួបជុំ
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              កូនកំលោះ និងកូនក្រមុំ ចូលក្នុងពិធីជាមួយមាតាបិតាទាំងសងខាង ពិធីរៀបផ្លែឈើ៣៦មុខ និងសែនព្រេនជូនដំណឹងដល់ដូនតា។
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 border border-[#bfe3f7] bg-sky-50/40 shadow-xs hover:shadow-sm transition-all space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#0973b0] tabular-nums">8:45 PM</span>
              <span className="text-[11px] font-bold text-[#0973b0]">វេលាពិសិដ្ឋ</span>
            </div>
            <h3 className="font-khmer-sans font-bold text-base text-slate-900">
              ពិធីបំពាក់ចិញ្ចៀនភ្ជាប់ពាក្យ
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              កូនកំលោះ និងកូនក្រមុំ បំពាក់ចិញ្ចៀនភ្ជាប់ពាក្យជូនគ្នាទៅវិញទៅមក ចំពោះមុខមាតាបិតា ចាស់ទុំ និងភ្ញៀវកិត្តិយស។
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-sm transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#0973b0] tabular-nums">9:15 PM</span>
              <span className="text-[11px] font-bold text-slate-500">ភោជនាហារ</span>
            </div>
            <h3 className="font-khmer-sans font-bold text-base text-slate-900">
              ពិធីពិសាភោជនាហារ និងតន្ត្រី
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ពិសាភោជនាហារដ៏ឈ្ងុយឆ្ងាញ់ ចាក់ស្រាសំប៉ាញអបអរសាទរ និងស្តាប់បទភ្លេងប្រពៃណីដ៏រ៉ូមែនទិក។
            </p>
          </div>
        </div>

        {/* Dress Code Section */}
        <div id="schedule" className="mt-8 bg-white rounded-3xl p-6 lg:p-8 border border-sky-100 shadow-2xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#0973b0] flex items-center justify-center shrink-0">
              <Shirt className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0973b0]">
                <span>សំលៀកបំពាក់ &amp; ពណ៌ណែនាំ</span>
              </div>
              <h4 className="font-khmer-sans font-bold text-base text-slate-900">
                សំលៀកបំពាក់ប្រពៃណីខ្មែរ ឬឈុតសមរម្យ
              </h4>
              <p className="text-xs text-slate-600">
                យើងខ្ញុំសូមគោរពអញ្ជើញភ្ញៀវកិត្តិយសទាំងអស់ ស្លៀកពាក់សំលៀកបំពាក់ប្រពៃណីខ្មែរ (ហូល ផាមួង) ឬឈុតសមរម្យ ពណ៌ផ្ទៃមេឃស្រាល មាសស្រាល ឬពណ៌ស។
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60 text-xs">
              <span className="w-4 h-4 rounded-full bg-[#87ceeb] border border-white shadow-2xs" title="ផ្ទៃមេឃស្រាល" />
              <span className="w-4 h-4 rounded-full bg-[#fde68a] border border-white shadow-2xs" title="មាសស្រាល" />
              <span className="w-4 h-4 rounded-full bg-[#f8fafc] border border-slate-300 shadow-2xs" title="ពណ៌ស" />
              <span className="text-slate-500 font-bold ml-1">ពណ៌ណែនាំ</span>
            </div>

            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-sky-100 hover:bg-sky-200 text-[#0973b0] text-xs font-bold transition-colors cursor-pointer"
            >
              កម្មវិធីលម្អិត →
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. VENUE & DIRECTIONS                                     */}
      {/* ======================================================== */}
      <section id="venue" className="py-16 lg:py-24 bg-gradient-to-b from-[#f8fbfe] via-[#f0f8fd] to-[#f8fbfe] border-y border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Venue Details & Plus Code */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest text-[#0a6ca1]">
                  ទីតាំង &amp; ទិសដៅធ្វើដំណើរ
                </span>
                <h2 className="font-khmer-moul text-2xl sm:text-3xl text-slate-900 leading-normal">
                  គេហដ្ឋានខាងស្រី
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-khmer-sans">
                  ពិធីភ្ជាប់ពាក្យ និងពិធីពិសាភោជនាហារ នឹងត្រូវប្រារព្ធឡើងនៅគេហដ្ឋានរបស់មាតាបិតាខាងស្រី ក្នុងរាជធានីភ្នំពេញ។ មានបុគ្គលិកជួយសម្រួល និងទទួលរថយន្តជូនភ្ញៀវកិត្តិយស។
                </p>
              </div>

              {/* Plus Code Highlight Box */}
              <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    កូដផែនទី Google Maps Plus Code
                  </span>
                  <button
                    onClick={handleCopyPlusCode}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0973b0] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedPlusCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">បានចម្លង!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>ចម្លងកូដ</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl font-mono text-base font-bold text-slate-800 flex items-center justify-between">
                  <span>GR4H+89W Phnom Penh</span>
                  <span className="text-xs text-slate-400 font-khmer-sans font-normal">រាជធានីភ្នំពេញ</span>
                </div>

                <div className="text-xs text-slate-500 font-khmer-sans">
                  លោកអ្នកអាចចម្លងកូដនេះ ដាក់ចូលក្នុង Google Maps, Grab ឬ PassApp ដើម្បីធ្វើដំណើរដល់មុខគេហដ្ឋានយ៉ាងរហ័ស។
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('GR4H+89W Phnom Penh')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs font-bold tracking-wide flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>បើកមើលក្នុង Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                <button
                  onClick={() => setIsDirectionsModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-sky-50 text-slate-800 text-xs font-bold border border-sky-200 transition-colors shadow-2xs cursor-pointer flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#0d7bb8]" />
                  <span>ព័ត៌មានលម្អិតពីចំណតរថយន្ត</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Map / Venue Card */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-sky-100 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0973b0] flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-khmer-sans font-bold text-base text-slate-900">
                        រាជធានីភ្នំពេញ
                      </h4>
                      <p className="text-xs text-slate-500 font-khmer-sans">ខណ្ឌសែនសុខ ក្បែរមហាវិថីសហព័ន្ធរុស្ស៊ី</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    មានចំណតរថយន្ត
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-600 font-khmer-sans leading-relaxed">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="text-slate-800 block mb-0.5 font-bold">🚗 ការធ្វើដំណើរដោយរថយន្តផ្ទាល់ខ្លួន៖</strong>
                    ធ្វើដំណើរតាមមហាវិថីសហព័ន្ធរុស្ស៊ី ឬផ្លូវហាណូយ។ ពេលមកដល់ច្រកចូលផ្លូវលំ សូមមើលស្លាកសញ្ញារោងការ និងខ្លោងទ្វារផ្កា។
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="text-slate-800 block mb-0.5 font-bold">🛵 PassApp / Grab៖</strong>
                    វាយបញ្ចូលកូដ «GR4H+89W» ក្នុងប្រអប់គោលដៅ នោះអ្នកបើកបរនឹងជូនលោកអ្នកដល់មុខគេហដ្ឋានផ្ទាល់។
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="text-slate-800 block mb-0.5 font-bold">🌦️ បរិយាកាស និងម៉ាស៊ីនត្រជាក់៖</strong>
                    ពិធីទាំងមូលត្រូវបានរៀបចំក្នុងរោងមង្គលបំពាក់ម៉ាស៊ីនត្រជាក់ និងតុបតែងលម្អដោយផ្កាស្រស់យ៉ាងស្រស់ស្អាត។
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. OUR STORY & MEMORIES GALLERY                          */}
      {/* ======================================================== */}
      <section id="story" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#0a6ca1]">
            រឿងរ៉ាវស្នេហា &amp; អនុស្សាវរីយ៍
          </span>
          <h2 className="font-khmer-moul text-2xl sm:text-3xl text-slate-900 leading-normal">
            រឿងរ៉ាវស្នេហារបស់យើង
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-khmer-sans leading-relaxed">
            តាំងពីការជួបគ្នាដំបូងនៅមាត់ទន្លេមេគង្គ រហូតដល់ថ្ងៃរះនៅអង្គរវត្ត និងពាក្យសន្យានៃក្តីស្រឡាញ់ដ៏ស្មោះត្រង់។
          </p>
        </div>

        {/* Story Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Angkor Memory with Generated Image */}
          <div className="md:col-span-7 bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-2xs hover:shadow-sm transition-all flex flex-col">
            <div className="aspect-16/10 relative overflow-hidden bg-slate-100">
              <img
                src={storyAngkorImg}
                alt="ពន្លឺ និង ម៉ីជីង ដើរជាមួយគ្នានៅថ្ងៃរះមុខប្រាសាទអង្គរវត្ត"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#0973b0] font-khmer-sans">
                ខែមេសា ឆ្នាំ២០២៤ · សៀមរាប
              </div>
            </div>
            <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-khmer-sans font-bold text-lg text-slate-900">
                  ថ្ងៃរះនៅអង្គរវត្ត
                </h3>
                <p className="text-xs text-slate-600 mt-2 font-khmer-sans leading-relaxed">
                  ទស្សនាថ្ងៃរះដ៏ស្រស់បំព្រងមុខប្រាសាទអង្គរវត្ត និងទទួលពរជ័យបុណ្យចូលឆ្នាំខ្មែរ ធ្វើឱ្យយើងទាំងពីរដឹងច្បាស់ថា បេះដូងរបស់យើងត្រូវបានបង្កើតឡើងសម្រាប់គ្នាទៅវិញទៅមក។
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-khmer-sans">
                <span>អនុស្សាវរីយ៍ផ្អែមល្ហែម</span>
                <span className="text-[#0973b0] font-bold">ជំពូកទីពីរ</span>
              </div>
            </div>
          </div>

          {/* Card 2: Betrothal Rings & Jasmine Tray with Generated Image */}
          <div className="md:col-span-5 bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-2xs hover:shadow-sm transition-all flex flex-col">
            <div className="aspect-16/11 relative overflow-hidden bg-slate-100">
              <img
                src={ringsTrayImg}
                alt="ចិញ្ចៀនភ្ជាប់ពាក្យលើពានប្រាក់ជាមួយផ្កាម្លិះ"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#0973b0] font-khmer-sans">
                ខែធ្នូ ឆ្នាំ២០២៥ · ការសុំភ្ជាប់ពាក្យ
              </div>
            </div>
            <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-khmer-sans font-bold text-lg text-slate-900">
                  ចិញ្ចៀនភ្ជាប់ពាក្យ និងពាក្យសន្យា
                </h3>
                <p className="text-xs text-slate-600 mt-2 font-khmer-sans leading-relaxed">
                  ចិញ្ចៀនមាសបង្កប់ពេជ្រ រៀបចំយ៉ាងផ្ចិតផ្ចង់លើពានប្រាក់រចនាបែបខ្មែរ រួមជាមួយផ្កាម្លិះក្រអូប ជាសញ្ញាតំណាងនៃសេចក្តីស្រឡាញ់ដ៏បរិសុទ្ធ។
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-khmer-sans">
                <span>វេលាពិសិដ្ឋ</span>
                <button
                  onClick={() => setIsStoryModalOpen(true)}
                  className="text-[#0973b0] hover:underline font-bold cursor-pointer"
                >
                  មើលរឿងរ៉ាវទាំងអស់ →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. IN-PAGE INTERACTIVE RSVP FORM                         */}
      {/* ======================================================== */}
      <section id="rsvp" className="py-16 lg:py-24 bg-gradient-to-b from-[#f8fbfe] via-[#edf6fc] to-[#f8fbfe] border-y border-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#0a6ca1]">
              ការឆ្លើយតបចូលរួមតាមប្រព័ន្ធអនឡាញ
            </span>
            <h2 className="font-khmer-moul text-2xl sm:text-3xl text-slate-900 leading-normal">
              ឆ្លើយតបចូលរួមពិធីភ្ជាប់ពាក្យ
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-khmer-sans leading-relaxed">
              សូមមេត្តាឆ្លើយតបការចូលរួមមុនថ្ងៃទី០១ ខែសីហា ឆ្នាំ២០២៧ ដើម្បីជួយសម្រួលដល់យើងខ្ញុំក្នុងការរៀបចំកន្លែងអង្គុយ និងទទួលបដិសណ្ឋារកិច្ចឱ្យបានសមរម្យ។
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-sm">
            {rsvpSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-khmer-sans font-bold text-2xl text-slate-900">
                  សូមអរគុណ, {rsvpName}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-khmer-sans">
                  {rsvpAttendance === 'attending'
                    ? `ការឆ្លើយតបចូលរួមរបស់លោកអ្នកសម្រាប់ភ្ញៀវចំនួន ${rsvpGuestsCount} នាក់ ត្រូវបានកត់ត្រារួចរាល់។ ពន្លឺ និង ម៉ីជីង ទន្ទឹងរង់ចាំទទួលស្វាគមន៍លោកអ្នកយ៉ាងកក់ក្តៅ!`
                    : 'យើងខ្ញុំបានកត់ត្រាការឆ្លើយតបរបស់លោកអ្នករួចរាល់ហើយ។ សូមថ្លែងអំណរគុណចំពោះពរជ័យ និងក្តីស្រឡាញ់ពីចម្ងាយ!'}
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setIsCalendarModalOpen(true)}
                    className="px-5 py-2.5 rounded-full bg-[#1289dc] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    រក្សាទុកកាលបរិច្ឆេទ
                  </button>
                  <button
                    onClick={() => {
                      setRsvpSuccess(false);
                      setRsvpName('');
                      setRsvpMessage('');
                    }}
                    className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    ឆ្លើយតបម្តងទៀត
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInlineRsvpSubmit} className="space-y-6">
                {/* Attendance Toggle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 font-khmer-sans">
                    តើលោកអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRsvpAttendance('attending')}
                      className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        rsvpAttendance === 'attending'
                          ? 'bg-[#1289dc] text-white border-[#1289dc] shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>✨ រីករាយនឹងចូលរួម</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRsvpAttendance('declined')}
                      className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        rsvpAttendance === 'declined'
                          ? 'bg-slate-800 text-white border-slate-800 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <X className="w-4 h-4" />
                      <span>💌 សោកស្តាយមិនអាចចូលរួម</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 font-khmer-sans">
                      ឈ្មោះពេញរបស់លោកអ្នក *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ឧទាហរណ៍៖ សុគន្ធា និង សុវណ្ណ"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1289dc] text-sm font-khmer-sans"
                    />
                  </div>

                  {/* Relationship */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 font-khmer-sans">
                      ត្រូវជាអ្វីជាមួយគូដណ្តឹង?
                    </label>
                    <select
                      value={rsvpRelationship}
                      onChange={(e) => setRsvpRelationship(e.target.value as RsvpSubmission['relationship'])}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1289dc] text-sm bg-white font-khmer-sans"
                    >
                      <option value="groom_friend">មិត្តភក្តិកូនកំលោះ (ពន្លឺ)</option>
                      <option value="bride_friend">មិត្តភក្តិកូនក្រមុំ (ម៉ីជីង)</option>
                      <option value="groom_family">សាច់ញាតិខាងប្រុស</option>
                      <option value="bride_family">សាច់ញាតិខាងស្រី</option>
                      <option value="colleague">មិត្តរួមការងារ</option>
                      <option value="other">ភ្ញៀវកិត្តិយស</option>
                    </select>
                  </div>
                </div>

                {rsvpAttendance === 'attending' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Guests Count */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 font-khmer-sans">
                        ចំនួនភ្ញៀវអញ្ជើញចូលរួម
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setRsvpGuestsCount(num)}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              rsvpGuestsCount === num
                                ? 'bg-[#0973b0] text-white shadow-2xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {num} នាក់
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Phone / Telegram */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 font-khmer-sans">
                        លេខទូរស័ព្ទ ឬ Telegram
                      </label>
                      <input
                        type="tel"
                        placeholder="ឧទាហរណ៍៖ 012 345 678"
                        value={rsvpPhone}
                        onChange={(e) => setRsvpPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1289dc] text-sm font-khmer-sans"
                      />
                    </div>
                  </div>
                )}

                {/* Dietary Requirements */}
                {rsvpAttendance === 'attending' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 font-khmer-sans">
                      ចំណង់ចំណូលចិត្តម្ហូបអាហារ ឬអាលែកហ្ស៊ី
                    </label>
                    <input
                      type="text"
                      placeholder="ឧទាហរណ៍៖ ម្ហូបបួស, ហាឡាល់, អាលែកហ្ស៊ីគ្រឿងសមុទ្រ"
                      value={rsvpDietary}
                      onChange={(e) => setRsvpDietary(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1289dc] text-sm font-khmer-sans"
                    />
                  </div>
                )}

                {/* Heartfelt Blessing */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 font-khmer-sans">
                    ពាក្យជូនពរ និងសារប្រសិទ្ធពរសម្រាប់ ពន្លឺ &amp; ម៉ីជីង
                  </label>
                  <textarea
                    rows={3}
                    placeholder="សរសេរពាក្យជូនពរ ឬអបអរសាទរនៅទីនេះ (នឹងបង្ហាញលើផ្ទាំងជូនពរ)..."
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1289dc] text-sm font-khmer-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-sm font-bold tracking-wide shadow-sm hover:shadow transition-all active:scale-[0.99] cursor-pointer"
                >
                  បញ្ជាក់ការឆ្លើយតប &amp; ផ្ញើពាក្យជូនពរ
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. LIVE BLESSINGS WALL & GUESTBOOK                       */}
      {/* ======================================================== */}
      <section id="blessings" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold tracking-widest text-[#0a6ca1]">
              ពាក្យប្រសិទ្ធពរជ័យ
            </span>
            <h2 className="font-khmer-moul text-2xl sm:text-3xl text-slate-900 leading-normal">
              សៀវភៅពាក្យជូនពរ ({wishes.length})
            </h2>
            <p className="text-xs text-slate-500 font-khmer-sans">
              ពាក្យជូនពរដ៏កក់ក្តៅពីមាតាបិតា បងប្អូន ញាតិមិត្ត និងមិត្តភក្តិជិតដិត។
            </p>
          </div>

          <button
            onClick={() => setIsGuestbookModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-sky-100 hover:bg-sky-200 text-[#0973b0] text-xs font-bold transition-colors self-start sm:self-auto cursor-pointer"
          >
            មើលផ្ទាំងជូនពរទាំងអស់ →
          </button>
        </div>

        {/* Quick Add Blessing Inline Form */}
        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-2xs mb-8">
          <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5 font-khmer-sans">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-100" />
            <span>ផ្ញើពាក្យជូនពរដល់ ពន្លឺ &amp; ម៉ីជីង</span>
          </h4>

          {wishSuccess && (
            <div className="p-3 mb-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl border border-emerald-100 font-khmer-sans">
              ពាក្យជូនពររបស់លោកអ្នកត្រូវបានបង្ហោះដោយជោគជ័យ! សូមអរគុណ!
            </div>
          )}

          <form onSubmit={handleInlineWishSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="ឈ្មោះរបស់លោកអ្នក"
                required
                value={inlineWishName}
                onChange={(e) => setInlineWishName(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-khmer-sans focus:outline-none focus:ring-2 focus:ring-[#1289dc]"
              />
              <input
                type="text"
                placeholder="ត្រូវជាអ្វី (ឧទាហរណ៍៖ មិត្តភក្តិ / សាច់ញាតិ)"
                value={inlineWishRelation}
                onChange={(e) => setInlineWishRelation(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-khmer-sans focus:outline-none focus:ring-2 focus:ring-[#1289dc]"
              />
            </div>
            <textarea
              rows={2}
              placeholder="សរសេរពាក្យជូនពរ និងអបអរសាទរនៅទីនេះ..."
              required
              value={inlineWishMessage}
              onChange={(e) => setInlineWishMessage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-khmer-sans focus:outline-none focus:ring-2 focus:ring-[#1289dc]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                ផ្ញើពាក្យជូនពរ
              </button>
            </div>
          </form>
        </div>

        {/* Wishes Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishes.slice(0, 8).map((wish) => (
            <div
              key={wish.id}
              className="bg-white rounded-2xl p-5 border border-sky-100 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <strong className="text-sm font-bold text-slate-900 block font-khmer-sans">
                      {wish.name}
                    </strong>
                    <span className="text-[11px] text-slate-500 font-khmer-sans">
                      {wish.relationship}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(wish.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-khmer-sans leading-relaxed">
                  «{wish.message}»
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleLikeWish(wish.id)}
                  className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 transition-colors group cursor-pointer"
                  title="ចុចបេះដូង"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 group-hover:scale-125 transition-transform" />
                  <span className="font-mono font-bold tabular-nums">{wish.likes}</span>
                </button>
                <span className="text-[10px] text-slate-400 font-khmer-sans">ពរជ័យ</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. GIFT REGISTRY & KHQR                                   */}
      {/* ======================================================== */}
      <section id="registry" className="py-16 lg:py-24 bg-gradient-to-b from-[#f8fbfe] via-[#edf6fc] to-[#f8fbfe] border-t border-sky-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#0a6ca1]">
              ទំនៀមទម្លាប់ចងដៃ &amp; អាំងប៉ាវប្រពៃណី
            </span>
            <h2 className="font-khmer-moul text-2xl sm:text-3xl text-slate-900 leading-normal">
              គណនីចងដៃ &amp; KHQR
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-khmer-sans">
              វត្តមានដ៏ខ្ពង់ខ្ពស់របស់លោកអ្នក គឺជាកិត្តិយសដ៏ធំធេងបំផុតសម្រាប់ពួកយើង។ សម្រាប់ភ្ញៀវកិត្តិយសដែលមានបំណងចងដៃតាមប្រពៃណី លោកអ្នកអាចស្កេន KHQR ឬផ្ទេរតាមគណនីធនាគារខាងក្រោម។
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* ABA Bank USD */}
            <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-2xs hover:shadow-xs transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#004f71] tracking-wider uppercase font-khmer-sans">
                    ធនាគារ ABA · ដុល្លារ (USD)
                  </span>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                    ស្កេន KHQR
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#004f71] to-[#01354c] text-white space-y-2 shadow-xs">
                  <span className="text-[10px] font-bold tracking-wider text-sky-200">ឈ្មោះគណនី</span>
                  <div className="font-mono text-base font-bold tracking-wide">PONLEU &amp; MEYJING</div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-lg font-bold text-sky-100">001 829 402</span>
                    <button
                      onClick={() => handleCopyAccount('001829402', 'aba-usd')}
                      className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      {copiedAccount === 'aba-usd' ? 'បានចម្លង!' : 'ចម្លង'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 font-khmer-sans leading-relaxed">
                អាចស្កេនបានជាមួយកម្មវិធី បាគង (Bakong), ABA Mobile ឬគ្រប់ធនាគារជាសមាជិក KHQR នៅកម្ពុជា។
              </div>
            </div>

            {/* ACLEDA Bank KHR */}
            <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-2xs hover:shadow-xs transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#083b66] tracking-wider uppercase font-khmer-sans">
                    ធនាគារ អេស៊ីលីដា · ប្រាក់រៀល (KHR)
                  </span>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                    ស្កេន KHQR
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0b3c65] to-[#1c5585] text-white space-y-2 shadow-xs">
                  <span className="text-[10px] font-bold tracking-wider text-sky-200">ឈ្មោះគណនី</span>
                  <div className="font-mono text-base font-bold tracking-wide">PONLEU &amp; MEYJING</div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-lg font-bold text-sky-100">2900 1029 4810</span>
                    <button
                      onClick={() => handleCopyAccount('290010294810', 'acleda')}
                      className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      {copiedAccount === 'acleda' ? 'បានចម្លង!' : 'ចម្លង'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 font-khmer-sans leading-relaxed">
                លោកអ្នកក៏អាចដាក់អាំងប៉ាវ ឬស្រោមសំបុត្រចងដៃ ក្នុងប្រអប់ចំណងដៃនៅមុខរោងមង្គលផងដែរ។
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. FOOTER                                                */}
      {/* ======================================================== */}
      <footer className="bg-white border-t border-sky-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-[#1289dc]/10 text-[#0973b0] flex items-center justify-center font-khmer-moul text-sm mx-auto">
            ព&amp;ម
          </div>
          <h3 className="font-khmer-moul text-lg text-slate-900">
            ពិធីភ្ជាប់ពាក្យ ពន្លឺ &amp; ម៉ីជីង
          </h3>
          <p className="text-xs text-slate-500 font-khmer-sans">
            ថ្ងៃអង្គារ ទី១៧ ខែសីហា ឆ្នាំ២០២៧ · គេហដ្ឋានខាងស្រី រាជធានីភ្នំពេញ
          </p>
          <div className="pt-2 text-xs text-slate-400 font-khmer-sans">
            សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះមាតាបិតា ញាតិមិត្ត និងភ្ញៀវកិត្តិយសទាំងអស់។
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* 10. MODALS                                               */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isCardModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-[460px] my-auto"
            >
              <button
                onClick={() => setIsCardModalOpen(false)}
                className="absolute -top-3 -right-3 z-50 w-9 h-9 rounded-full bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-md border border-slate-200 cursor-pointer"
                title="បិទកាត"
              >
                <X className="w-5 h-5" />
              </button>
              <InvitationCard
                onOpenRsvp={() => {
                  setIsCardModalOpen(false);
                  scrollToSection('rsvp');
                }}
                onOpenDirections={() => {
                  setIsCardModalOpen(false);
                  scrollToSection('venue');
                }}
                onOpenCalendar={() => setIsCalendarModalOpen(true)}
                onOpenSchedule={() => setIsScheduleModalOpen(true)}
                onOpenStory={() => setIsStoryModalOpen(true)}
                onOpenGuestbook={() => {
                  setIsCardModalOpen(false);
                  scrollToSection('blessings');
                }}
                onOpenShare={() => setIsShareModalOpen(true)}
                onOpenGiftRegistry={() => {
                  setIsCardModalOpen(false);
                  scrollToSection('registry');
                }}
                guestCount={totalGuestsAttending}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        onOpenSchedule={() => {
          setIsCalendarModalOpen(false);
          setIsScheduleModalOpen(true);
        }}
      />

      <DirectionsModal
        isOpen={isDirectionsModalOpen}
        onClose={() => setIsDirectionsModalOpen(false)}
      />

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      <StoryGalleryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />

      <GuestbookModal
        isOpen={isGuestbookModalOpen}
        onClose={() => setIsGuestbookModalOpen(false)}
        wishes={wishes}
        onAddWish={(wishData) => {
          const newWish: GuestWish = {
            ...wishData,
            id: 'wish-' + Date.now(),
            createdAt: new Date().toISOString(),
            likes: 1,
          };
          setWishes((prev) => [newWish, ...prev]);
        }}
        onLikeWish={handleLikeWish}
        onOpenRsvp={() => {
          setIsGuestbookModalOpen(false);
          scrollToSection('rsvp');
        }}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      <GiftRegistryModal
        isOpen={isGiftRegistryModalOpen}
        onClose={() => setIsGiftRegistryModalOpen(false)}
        onOpenGuestbook={() => {
          setIsGiftRegistryModalOpen(false);
          scrollToSection('blessings');
        }}
      />
    </div>
  );
}
