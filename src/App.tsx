/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  BookOpen,
  Share2,
  Users,
  Sparkles,
  Smartphone,
  Monitor,
  CheckCircle,
  Music,
  ExternalLink,
  Camera,
  Gift,
} from 'lucide-react';
import { InvitationCard } from './components/InvitationCard';
import { RsvpModal } from './components/RsvpModal';
import { DirectionsModal } from './components/DirectionsModal';
import { CalendarModal } from './components/CalendarModal';
import { ScheduleModal } from './components/ScheduleModal';
import { StoryGalleryModal } from './components/StoryGalleryModal';
import { GuestbookModal } from './components/GuestbookModal';
import { ShareModal } from './components/ShareModal';
import { PhotoSlideshow } from './components/PhotoSlideshow';
import { PhotoSlideshowModal } from './components/PhotoSlideshowModal';
import { BankGiftModal } from './components/BankGiftModal';
import { RsvpSubmission, GuestWish } from './types';

const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'wish-1',
    name: 'តារា & ស្រីពៅ',
    relationship: 'សាច់ញាតិខាងស្រី',
    message: 'សូមអបអរសាទរពិធីភ្ជាប់ពាក្យរបស់ប្អូនទាំងពីរ! សូមឱ្យមានសុភមង្គល សុខភាពល្អ និងសេចក្តីស្រឡាញ់ជារៀងរហូត។',
    createdAt: '2026-09-28T10:00:00Z',
    likes: 12,
  },
  {
    id: 'wish-2',
    name: 'សុភ័ក្រ កែម',
    relationship: 'មិត្តភក្តិកូនកំលោះ',
    message: 'អបអរសាទរ ពន្លឺ & ម៉ីជីង! ពីមិត្តភក្តិកាលនៅសាកលវិទ្យាល័យ រហូតមកដល់ថ្ងៃដ៏មានសិរីមង្គលនេះ ពិតជារំភើប និងត្រេកអរជំនួសណាស់។ ជួបគ្នានៅថ្ងៃទី១៧!',
    createdAt: '2026-09-29T14:30:00Z',
    likes: 8,
  },
  {
    id: 'wish-3',
    name: 'ចន្ថា នួន',
    relationship: 'មិត្តរួមការងារ',
    message: 'សូមជូនពរប្អូនទាំងពីរទទួលបានសុភមង្គលពេញមួយជីវិត ចេះយោគយល់អធ្យាស្រ័យគ្នា និងចម្រុងចម្រើនរុងរឿង។ អ្នកទាំងពីរពិតជាស័ក្តិសមគ្នាខ្លាំងណាស់!',
    createdAt: '2026-09-30T09:15:00Z',
    likes: 5,
  },
  {
    id: 'wish-4',
    name: 'វិច្ឆិកា & វណ្ណា',
    relationship: 'បងប្អូនជីដូនមួយ',
    message: 'ទន្ទឹងរង់ចាំជួបជុំបងប្អូនទាំងអស់គ្នានៅគេហដ្ឋានខាងស្រី! រាប់ថយក្រោយឆ្ពោះទៅកាន់ថ្ងៃពិសេសដោយក្តីរំភើប។',
    createdAt: '2026-10-01T08:00:00Z',
    likes: 7,
  },
];

export default function App() {
  // Modal states
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  // Desktop view toggle: phone frame preview vs expanded full view
  const [viewMode, setViewMode] = useState<'card' | 'expanded'>('card');

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

  useEffect(() => {
    try {
      localStorage.setItem('ponleu_meyjing_rsvps', JSON.stringify(rsvps));
    } catch {
      // storage quota or disabled
    }
  }, [rsvps]);

  useEffect(() => {
    try {
      localStorage.setItem('ponleu_meyjing_wishes', JSON.stringify(wishes));
    } catch {
      // storage quota or disabled
    }
  }, [wishes]);

  // Handle RSVP submission
  const handleRsvpSubmit = (newRsvp: RsvpSubmission) => {
    setRsvps((prev) => [newRsvp, ...prev]);

    // If guest included a message, also add to guestbook wishes
    if (newRsvp.message && newRsvp.message.trim()) {
      const relationLabels: Record<string, string> = {
        bride_family: "សាច់ញាតិខាងស្រី",
        groom_family: "សាច់ញាតិខាងប្រុស",
        bride_friend: "មិត្តភក្តិកូនក្រមុំ",
        groom_friend: "មិត្តភក្តិកូនកំលោះ",
        colleague: "មិត្តរួមការងារ",
        other: "ភ្ញៀវកិត្តិយស",
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

  // Add wish directly from Guestbook
  const handleAddWish = (wishData: Omit<GuestWish, 'id' | 'createdAt' | 'likes'>) => {
    const newWish: GuestWish = {
      ...wishData,
      id: 'wish-' + Date.now(),
      createdAt: new Date().toISOString(),
      likes: 1,
    };
    setWishes((prev) => [newWish, ...prev]);
  };

  // Like a wish
  const handleLikeWish = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  const totalGuestsAttending = rsvps
    .filter((r) => r.attendance === 'attending')
    .reduce((sum, r) => sum + (r.guestsCount || 1), 28); // 28 base confirmed family attendees

  return (
    <div className="min-h-screen bg-[#dcecf7] text-slate-800 antialiased flex flex-col justify-between selection:bg-sky-200 selection:text-sky-900 font-khmer">
      {/* Top Banner on Desktop with Quick Actions & Stats */}
      <header className="hidden lg:flex items-center justify-between px-8 py-3.5 bg-white/70 backdrop-blur-md border-b border-sky-100 shadow-2xs sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1289dc]/10 text-[#1289dc] flex items-center justify-center font-moul text-sm">
            ព&amp;ម
          </div>
          <div>
            <h1 className="font-moul font-normal text-slate-800 text-sm leading-tight">
              ពិធីភ្ជាប់ពាក្យ ពន្លឺ &amp; ម៉ីជីង
            </h1>
            <p className="text-[11px] text-slate-500 font-khmer">
              ថ្ងៃអង្គារ ទី១៧ ខែសីហា ឆ្នាំ២០២៧ · រាជធានីភ្នំពេញ
            </p>
          </div>
        </div>

        {/* Central Navigation Pills */}
        <nav className="flex items-center gap-1.5 p-1 bg-sky-100/60 rounded-full border border-sky-200/60 text-xs font-khmer">
          <button
            onClick={() => setViewMode('card')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-medium ${
              viewMode === 'card'
                ? 'bg-white text-[#096e9f] shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>លិខិតអញ្ជើញ</span>
          </button>

          <button
            onClick={() => setViewMode('expanded')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-medium ${
              viewMode === 'expanded'
                ? 'bg-white text-[#096e9f] shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>ព័ត៌មានលម្អិត</span>
          </button>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSlideshowOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-sky-50 text-slate-700 text-xs font-khmer border border-sky-200 transition-all shadow-2xs"
          >
            <Camera className="w-3.5 h-3.5 text-[#0d7bb8]" />
            <span>ស្លាយរូបថត</span>
          </button>

          <button
            onClick={() => setIsGiftOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-sky-50 text-slate-700 text-xs font-khmer border border-sky-200 transition-all shadow-2xs"
            title="QR Code & លេខកុងធនាគារ"
          >
            <Gift className="w-3.5 h-3.5 text-[#0d7bb8]" />
            <span>កាដូ</span>
          </button>

          <button
            onClick={() => setIsGuestbookOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-sky-50 text-slate-700 text-xs font-khmer border border-sky-200 transition-all shadow-2xs"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>សៀវភៅជូនពរ ({wishes.length})</span>
          </button>

          <button
            onClick={() => setIsRsvpOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs font-khmer font-bold tracking-wide shadow-xs transition-all active:scale-95"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>ឆ្លើយតបចូលរួម</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-0 sm:p-6 lg:p-8">
        {viewMode === 'card' ? (
          /* Exact recreation of Image 1.png in Khmer */
          <div className="w-full flex justify-center">
            <InvitationCard
              onOpenRsvp={() => setIsRsvpOpen(true)}
              onOpenDirections={() => setIsDirectionsOpen(true)}
              onOpenCalendar={() => setIsCalendarOpen(true)}
              onOpenSchedule={() => setIsScheduleOpen(true)}
              onOpenStory={() => setIsStoryOpen(true)}
              onOpenGuestbook={() => setIsGuestbookOpen(true)}
              onOpenShare={() => setIsShareOpen(true)}
              onOpenSlideshow={() => setIsSlideshowOpen(true)}
              onOpenGift={() => setIsGiftOpen(true)}
              guestCount={totalGuestsAttending}
            />
          </div>
        ) : (
          /* Multi-screen Desktop Layout showcasing all screens together */
          <div className="w-full max-w-6xl mx-auto space-y-8 py-4 animate-in fade-in duration-300 font-khmer">
            {/* Top Showcase Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Primary Invitation Card */}
              <div className="lg:col-span-5 flex justify-center">
                <InvitationCard
                  onOpenRsvp={() => setIsRsvpOpen(true)}
                  onOpenDirections={() => setIsDirectionsOpen(true)}
                  onOpenCalendar={() => setIsCalendarOpen(true)}
                  onOpenSchedule={() => setIsScheduleOpen(true)}
                  onOpenStory={() => setIsStoryOpen(true)}
                  onOpenGuestbook={() => setIsGuestbookOpen(true)}
                  onOpenShare={() => setIsShareOpen(true)}
                  onOpenSlideshow={() => setIsSlideshowOpen(true)}
                  onOpenGift={() => setIsGiftOpen(true)}
                  guestCount={totalGuestsAttending}
                />
              </div>

              {/* Side Panels: Overview, Schedule, Venue & Guestbook */}
              <div className="lg:col-span-7 space-y-6">
                {/* Event Overview Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-khmer font-bold uppercase tracking-wider text-[#0a6699]">
                        ពិធីពិសាស្លាភ្ជាប់ពាក្យ
                      </span>
                      <h2 className="font-moul text-2xl text-slate-800 mt-1 leading-normal">
                        ពន្លឺ &amp; ម៉ីជីង
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-khmer font-bold text-[#0d7bb8] block">
                        ១៧ សីហា ២០២៧
                      </span>
                      <span className="text-[11px] text-slate-500 font-khmer">
                        ម៉ោង ៨:០០ យប់តទៅ
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-khmer">
                    យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីពិសាស្លាភ្ជាប់ពាក្យ និងផ្លាស់ប្តូរចិញ្ចៀនអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំទាំងពីរ។
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <button
                      onClick={() => setIsRsvpOpen(true)}
                      className="p-3 rounded-2xl bg-[#ebf7fd] border border-[#bfe3f7] hover:bg-[#d8effb] transition-all text-center group"
                    >
                      <CheckCircle className="w-5 h-5 text-[#0d7bb8] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-[#0a6699] block font-khmer">
                        ឆ្លើយតបចូលរួម
                      </span>
                      <span className="text-[10px] text-slate-500 font-khmer">មុនថ្ងៃទី០១ សីហា</span>
                    </button>

                    <button
                      onClick={() => setIsDirectionsOpen(true)}
                      className="p-3 rounded-2xl bg-[#ebf7fd] border border-[#bfe3f7] hover:bg-[#d8effb] transition-all text-center group"
                    >
                      <MapPin className="w-5 h-5 text-[#0d7bb8] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-[#0a6699] block font-khmer">
                        បង្ហាញផ្លូវ
                      </span>
                      <span className="text-[10px] text-slate-500 font-khmer">GR4H+89W ភ្នំពេញ</span>
                    </button>

                    <button
                      onClick={() => setIsCalendarOpen(true)}
                      className="p-3 rounded-2xl bg-[#ebf7fd] border border-[#bfe3f7] hover:bg-[#d8effb] transition-all text-center group"
                    >
                      <Calendar className="w-5 h-5 text-[#0d7bb8] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-[#0a6699] block font-khmer">
                        ដាក់ចូលប្រតិទិន
                      </span>
                      <span className="text-[10px] text-slate-500 font-khmer">Google / Apple</span>
                    </button>
                  </div>
                </div>

                {/* Photo Slideshow Showcase Panel */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#0a6699]" />
                      <h3 className="font-moul text-base text-slate-800">
                        កម្រងស្លាយរូបថតអនុស្សាវរីយ៍
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsSlideshowOpen(true)}
                      className="text-xs text-[#0d7bb8] hover:underline font-semibold font-khmer flex items-center gap-1"
                    >
                      <span>បើកមើលពេញអេក្រង់</span>
                      <span>→</span>
                    </button>
                  </div>
                  <PhotoSlideshow autoPlayInterval={4500} showThumbnails={true} />
                </div>

                {/* Evening Schedule Timeline Preview */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0a6699]" />
                      <h3 className="font-moul text-base text-slate-800">
                        កាលវិភាគនៃកម្មវិធី
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsScheduleOpen(true)}
                      className="text-xs text-[#0d7bb8] hover:underline font-semibold font-khmer"
                    >
                      ព័ត៌មានលម្អិត &amp; សម្លៀកបំពាក់ →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-mono text-sky-700 font-bold block">7:30 PM (យប់)</span>
                      <strong className="text-slate-800 font-khmer font-bold text-sm block mt-0.5">
                        ទទួលភ្ញៀវកិត្តិយស &amp; ពិសាតែ
                      </strong>
                      <span className="text-[11px] text-slate-500 font-khmer">ពិសាតែផ្កាម្លិះ និងថតរូបអនុស្សាវរីយ៍</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-mono text-sky-700 font-bold block">8:00 PM (យប់)</span>
                      <strong className="text-slate-800 font-khmer font-bold text-sm block mt-0.5">
                        ពិធីផ្លូវការចាប់ផ្តើម
                      </strong>
                      <span className="text-[11px] text-slate-500 font-khmer">ក្បួនផ្លែឈើ និងពរជ័យមាតាបិតា</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-mono text-sky-700 font-bold block">8:45 PM (យប់)</span>
                      <strong className="text-slate-800 font-khmer font-bold text-sm block mt-0.5">
                        ពិធីបំពាក់ចិញ្ចៀនភ្ជាប់ពាក្យ
                      </strong>
                      <span className="text-[11px] text-slate-500 font-khmer">សច្ចាប្រណិធាន និងការជូនពរ</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-mono text-sky-700 font-bold block">9:15 PM (យប់)</span>
                      <strong className="text-slate-800 font-khmer font-bold text-sm block mt-0.5">
                        ពិធីពិសាភោជនាហារ
                      </strong>
                      <span className="text-[11px] text-slate-500 font-khmer">ពិសាបាយសាមគ្គី ជល់កែវ និងតន្ត្រី</span>
                    </div>
                  </div>
                </div>

                {/* Love Story & Guestbook Snippet */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white/80 space-y-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#0a6699]" />
                      <h4 className="font-moul text-sm text-slate-800">
                        ដំណើររឿងរបស់យើង
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-khmer">
                      ពីការជួបគ្នានៅមាត់ទន្លេភ្នំពេញ រហូតដល់ថ្ងៃលិចដ៏រ៉ូមែនទិកនៅសៀមរាប ស្វែងយល់ពីពេលវេលាដ៏មានអត្ថន័យ។
                    </p>
                    <button
                      onClick={() => setIsStoryOpen(true)}
                      className="text-xs font-semibold text-[#0d7bb8] hover:underline font-khmer"
                    >
                      អានដំណើររឿង និងរូបថត →
                    </button>
                  </div>

                  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white/80 space-y-3">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-100" />
                      <h4 className="font-moul text-sm text-slate-800">
                        សៀវភៅជូនពរ ({wishes.length})
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-khmer">
                      អានសារជូនពរដ៏កក់ក្តៅពីក្រុមគ្រួសារ និងមិត្តភក្តិ ឬសរសេរពាក្យជូនពរផ្ទាល់ខ្លួន។
                    </p>
                    <button
                      onClick={() => setIsGuestbookOpen(true)}
                      className="text-xs font-semibold text-[#0d7bb8] hover:underline font-khmer"
                    >
                      បើកផ្ទាំងជូនពរ →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Quick Bar on Mobile */}
      <footer className="lg:hidden sticky bottom-0 z-30 bg-white/90 backdrop-blur-md border-t border-sky-100 px-3 py-2.5 shadow-lg flex items-center justify-between font-khmer">
        <button
          onClick={() => setIsDirectionsOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-khmer text-slate-600 hover:text-[#0d7bb8]"
        >
          <MapPin className="w-4 h-4" />
          <span>ទីតាំង</span>
        </button>

        <button
          onClick={() => setIsScheduleOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-khmer text-slate-600 hover:text-[#0d7bb8]"
        >
          <Clock className="w-4 h-4" />
          <span>កម្មវិធី</span>
        </button>

        <button
          onClick={() => setIsRsvpOpen(true)}
          className="px-4 py-2 rounded-full bg-[#1289dc] text-white text-xs font-khmer font-bold tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95"
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>ចូលរួម</span>
        </button>

        <button
          onClick={() => setIsSlideshowOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-khmer text-slate-600 hover:text-[#0d7bb8]"
        >
          <Camera className="w-4 h-4 text-[#0d7bb8]" />
          <span>រូបថត</span>
        </button>

        <button
          onClick={() => setIsStoryOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-khmer text-slate-600 hover:text-[#0d7bb8]"
        >
          <BookOpen className="w-4 h-4" />
          <span>ដំណើររឿង</span>
        </button>

        <button
          onClick={() => setIsGuestbookOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-khmer text-slate-600 hover:text-[#0d7bb8]"
        >
          <Heart className="w-4 h-4" />
          <span>ពរជ័យ</span>
        </button>
      </footer>

      {/* Modals */}
      <BankGiftModal
        isOpen={isGiftOpen}
        onClose={() => setIsGiftOpen(false)}
      />

      <PhotoSlideshowModal
        isOpen={isSlideshowOpen}
        onClose={() => setIsSlideshowOpen(false)}
      />

      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onSubmitRsvp={handleRsvpSubmit}
        onViewGuestbook={() => {
          setIsRsvpOpen(false);
          setIsGuestbookOpen(true);
        }}
      />

      <DirectionsModal
        isOpen={isDirectionsOpen}
        onClose={() => setIsDirectionsOpen(false)}
      />

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onOpenSchedule={() => {
          setIsCalendarOpen(false);
          setIsScheduleOpen(true);
        }}
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />

      <StoryGalleryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      <GuestbookModal
        isOpen={isGuestbookOpen}
        onClose={() => setIsGuestbookOpen(false)}
        wishes={wishes}
        onAddWish={handleAddWish}
        onLikeWish={handleLikeWish}
        onOpenRsvp={() => {
          setIsGuestbookOpen(false);
          setIsRsvpOpen(true);
        }}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}
