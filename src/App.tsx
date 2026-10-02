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
import { GiftRegistryModal } from './components/GiftRegistryModal';
import { RsvpSubmission, GuestWish } from './types';

const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'wish-1',
    name: 'Dara & Sreypov',
    relationship: "Bride's Family",
    message: 'សូមអបអរសាទរពិធីភ្ជាប់ពាក្យរបស់ប្អូនទាំងពីរ! សូមឱ្យមានសុភមង្គល សុខភាពល្អ និងសេចក្តីស្រឡាញ់ជារៀងរហូត។',
    createdAt: '2026-09-28T10:00:00Z',
    likes: 12,
  },
  {
    id: 'wish-2',
    name: 'Sopheap Kem',
    relationship: 'Friend of Ponleu',
    message: 'Congratulations Ponleu & Meyjing! From our university days to this beautiful milestone, so proud of you brother. See you on the 17th!',
    createdAt: '2026-09-29T14:30:00Z',
    likes: 8,
  },
  {
    id: 'wish-3',
    name: 'Chantha Nuon',
    relationship: 'Colleague',
    message: 'Wishing you both a lifetime of boundless joy, mutual respect, and prosperity. You make such a wonderful pair!',
    createdAt: '2026-09-30T09:15:00Z',
    likes: 5,
  },
  {
    id: 'wish-4',
    name: 'Vicheka & Vanna',
    relationship: "Bride's Cousin",
    message: 'Can’t wait to celebrate with the whole family at the bride’s house! Counting down the days with excitement.',
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
  const [isGiftRegistryOpen, setIsGiftRegistryOpen] = useState(false);

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
        bride_family: "Bride's Family",
        groom_family: "Groom's Family",
        bride_friend: "Friend of Meyjing",
        groom_friend: "Friend of Ponleu",
        colleague: "Colleague",
        other: "Guest",
      };

      const newWish: GuestWish = {
        id: 'wish-' + Date.now(),
        name: newRsvp.name,
        relationship: relationLabels[newRsvp.relationship] || 'Honored Guest',
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
    <div className="min-h-screen bg-[#dcecf7] text-slate-800 antialiased flex flex-col justify-between selection:bg-sky-200 selection:text-sky-900">
      {/* Top Banner on Desktop with Quick Actions & Stats */}
      <header className="hidden lg:flex items-center justify-between px-8 py-3.5 bg-white/70 backdrop-blur-md border-b border-sky-100 shadow-2xs sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1289dc]/10 text-[#1289dc] flex items-center justify-center font-script text-xl">
            P&amp;M
          </div>
          <div>
            <h1 className="font-serif-elegant font-semibold text-slate-800 text-base leading-tight">
              Ponleu &amp; Meyjing's Engagement Ceremony
            </h1>
            <p className="text-[11px] text-slate-500 font-sans-clean">
              Tuesday, August 17, 2027 · Phnom Penh City
            </p>
          </div>
        </div>

        {/* Central Navigation Pills */}
        <nav className="flex items-center gap-1.5 p-1 bg-sky-100/60 rounded-full border border-sky-200/60 text-xs font-sans-clean">
          <button
            onClick={() => setViewMode('card')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-medium ${
              viewMode === 'card'
                ? 'bg-white text-[#096e9f] shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Invitation Card</span>
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
            <span>Ceremony Details</span>
          </button>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsGiftRegistryOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-sky-50 text-slate-700 text-xs font-sans-clean border border-sky-200 transition-all shadow-2xs"
          >
            <Gift className="w-3.5 h-3.5 text-amber-500" />
            <span>Gift Registry</span>
          </button>

          <button
            onClick={() => setIsGuestbookOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-sky-50 text-slate-700 text-xs font-sans-clean border border-sky-200 transition-all shadow-2xs"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Guestbook ({wishes.length})</span>
          </button>

          <button
            onClick={() => setIsRsvpOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs font-sans-clean font-bold tracking-wide shadow-xs transition-all active:scale-95"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>RSVP Now</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-0 sm:p-6 lg:p-8">
        {viewMode === 'card' ? (
          /* Exact recreation of Image 1.png */
          <div className="w-full flex justify-center">
            <InvitationCard
              onOpenRsvp={() => setIsRsvpOpen(true)}
              onOpenDirections={() => setIsDirectionsOpen(true)}
              onOpenCalendar={() => setIsCalendarOpen(true)}
              onOpenSchedule={() => setIsScheduleOpen(true)}
              onOpenStory={() => setIsStoryOpen(true)}
              onOpenGuestbook={() => setIsGuestbookOpen(true)}
              onOpenShare={() => setIsShareOpen(true)}
              onOpenGiftRegistry={() => setIsGiftRegistryOpen(true)}
              guestCount={totalGuestsAttending}
            />
          </div>
        ) : (
          /* Multi-screen Desktop Layout showcasing all screens together */
          <div className="w-full max-w-6xl mx-auto space-y-8 py-4 animate-in fade-in duration-300">
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
                  onOpenGiftRegistry={() => setIsGiftRegistryOpen(true)}
                  guestCount={totalGuestsAttending}
                />
              </div>

              {/* Side Panels: Overview, Schedule, Venue & Guestbook */}
              <div className="lg:col-span-7 space-y-6">
                {/* Event Overview Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-sans-clean font-bold uppercase tracking-[0.2em] text-[#0a6699]">
                        Engagement Ceremony
                      </span>
                      <h2 className="font-serif-elegant italic text-3xl text-slate-800">
                        Ponleu &amp; Meyjing
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-[#0d7bb8] block">
                        August 17, 2027
                      </span>
                      <span className="text-[11px] text-slate-500 font-sans-clean">
                        8:00 PM Onwards
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans-clean">
                    We invite our esteemed guests, relatives, and close friends to honor us with your gracious presence as we pledge our devotion and exchange our engagement rings.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <button
                      onClick={() => setIsRsvpOpen(true)}
                      className="p-3 rounded-2xl bg-[#ebf7fd] border border-[#bfe3f7] hover:bg-[#d8effb] transition-all text-center group"
                    >
                      <CheckCircle className="w-5 h-5 text-[#0d7bb8] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-[#0a6699] block font-sans-clean">
                        RSVP Attendance
                      </span>
                      <span className="text-[10px] text-slate-500">Respond by Aug 1</span>
                    </button>

                    <button
                      onClick={() => setIsDirectionsOpen(true)}
                      className="p-3 rounded-2xl bg-[#ebf7fd] border border-[#bfe3f7] hover:bg-[#d8effb] transition-all text-center group"
                    >
                      <MapPin className="w-5 h-5 text-[#0d7bb8] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-[#0a6699] block font-sans-clean">
                        Directions
                      </span>
                      <span className="text-[10px] text-slate-500">GR4H+89W Phnom Penh</span>
                    </button>

                    <button
                      onClick={() => setIsCalendarOpen(true)}
                      className="p-3 rounded-2xl bg-[#ebf7fd] border border-[#bfe3f7] hover:bg-[#d8effb] transition-all text-center group"
                    >
                      <Calendar className="w-5 h-5 text-[#0d7bb8] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-[#0a6699] block font-sans-clean">
                        Add to Calendar
                      </span>
                      <span className="text-[10px] text-slate-500">Google / Apple</span>
                    </button>
                  </div>
                </div>

                {/* Evening Schedule Timeline Preview */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0a6699]" />
                      <h3 className="font-serif-elegant font-semibold text-xl text-slate-800">
                        Ceremony Timeline
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsScheduleOpen(true)}
                      className="text-xs text-[#0d7bb8] hover:underline font-semibold font-sans-clean"
                    >
                      View Details &amp; Dress Code →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-mono text-sky-700 font-bold block">7:30 PM</span>
                      <strong className="text-slate-800 font-serif-elegant text-sm block">
                        Welcome Tea &amp; Guest Arrival
                      </strong>
                      <span className="text-[11px] text-slate-500">Jasmine tea and photo booth</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-mono text-sky-700 font-bold block">8:00 PM</span>
                      <strong className="text-slate-800 font-serif-elegant text-sm block">
                        Formal Ceremony Commences
                      </strong>
                      <span className="text-[11px] text-slate-500">Fruit trays &amp; family blessings</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-mono text-sky-700 font-bold block">8:45 PM</span>
                      <strong className="text-slate-800 font-serif-elegant text-sm block">
                        Exchange of Rings
                      </strong>
                      <span className="text-[11px] text-slate-500">Betrothal vows &amp; speeches</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-mono text-sky-700 font-bold block">9:15 PM</span>
                      <strong className="text-slate-800 font-serif-elegant text-sm block">
                        Celebration Banquet
                      </strong>
                      <span className="text-[11px] text-slate-500">Dinner, toasts &amp; music</span>
                    </div>
                  </div>
                </div>

                {/* Love Story & Guestbook Snippet */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white/80 space-y-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#0a6699]" />
                      <h4 className="font-serif-elegant font-semibold text-lg text-slate-800">
                        Our Story
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans-clean">
                      From riverside conversations in Phnom Penh to an unforgettable sunset in Siem Reap, explore the memories that brought us here.
                    </p>
                    <button
                      onClick={() => setIsStoryOpen(true)}
                      className="text-xs font-semibold text-[#0d7bb8] hover:underline font-sans-clean"
                    >
                      Read Our Journey &amp; Gallery →
                    </button>
                  </div>

                  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white/80 space-y-3">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-100" />
                      <h4 className="font-serif-elegant font-semibold text-lg text-slate-800">
                        Guestbook Wishes ({wishes.length})
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans-clean">
                      Read loving messages from our family and friends, or leave your own blessing for the celebration board.
                    </p>
                    <button
                      onClick={() => setIsGuestbookOpen(true)}
                      className="text-xs font-semibold text-[#0d7bb8] hover:underline font-sans-clean"
                    >
                      Open Blessings Board →
                    </button>
                  </div>
                </div>

                {/* Gift Registry Showcase Banner in Desktop View */}
                <div className="bg-gradient-to-r from-[#eaf5fc] via-[#dcedf8] to-[#e4f1fa] rounded-3xl p-5 shadow-sm border border-sky-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-white text-[#0a6699] flex items-center justify-center shadow-xs shrink-0">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-sans-clean font-bold uppercase tracking-[0.2em] text-[#0a6699]">
                        Wedding Blessings &amp; Registry
                      </span>
                      <h4 className="font-serif-elegant font-semibold text-lg text-slate-800">
                        Gift Registry &amp; Bank Transfer (KHQR)
                      </h4>
                      <p className="text-xs text-slate-600 font-sans-clean">
                        ABA Bank, ACLEDA, Universal KHQR, and couple honeymoon wishlist.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsGiftRegistryOpen(true)}
                    className="px-4 py-2 rounded-full bg-[#1289dc] hover:bg-[#0c7ac6] text-white text-xs font-sans-clean font-bold tracking-wider shadow-xs transition-all shrink-0 flex items-center gap-1.5 active:scale-95"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>View Registry</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Quick Bar on Mobile */}
      <footer className="lg:hidden sticky bottom-0 z-30 bg-white/90 backdrop-blur-md border-t border-sky-100 px-3 py-2.5 shadow-lg flex items-center justify-between">
        <button
          onClick={() => setIsDirectionsOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-sans-clean text-slate-600 hover:text-[#0d7bb8]"
        >
          <MapPin className="w-4 h-4" />
          <span>Venue</span>
        </button>

        <button
          onClick={() => setIsScheduleOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-sans-clean text-slate-600 hover:text-[#0d7bb8]"
        >
          <Clock className="w-4 h-4" />
          <span>Program</span>
        </button>

        <button
          onClick={() => setIsRsvpOpen(true)}
          className="px-4 py-2 rounded-full bg-[#1289dc] text-white text-xs font-sans-clean font-bold tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95"
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>RSVP</span>
        </button>

        <button
          onClick={() => setIsStoryOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-sans-clean text-slate-600 hover:text-[#0d7bb8]"
        >
          <BookOpen className="w-4 h-4" />
          <span>Story</span>
        </button>

        <button
          onClick={() => setIsGuestbookOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-sans-clean text-slate-600 hover:text-[#0d7bb8]"
        >
          <Heart className="w-4 h-4" />
          <span>Wishes</span>
        </button>
      </footer>

      {/* Modals */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onSubmitRsvp={handleRsvpSubmit}
        onViewGuestbook={() => {
          setIsRsvpOpen(false);
          setIsGuestbookOpen(true);
        }}
      />

      <GiftRegistryModal
        isOpen={isGiftRegistryOpen}
        onClose={() => setIsGiftRegistryOpen(false)}
        onOpenGuestbook={() => {
          setIsGiftRegistryOpen(false);
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
