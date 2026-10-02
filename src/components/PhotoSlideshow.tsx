import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Sparkles,
  Camera,
  Heart,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface SlideItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
}

export const SLIDESHOW_PHOTOS: SlideItem[] = [
  {
    id: 'slide-1',
    src: '/src/assets/images/hero_engagement_ceremony_1790854646265.jpg',
    title: 'អនុស្សាវរីយ៍ថ្ងៃភ្ជាប់ពាក្យ',
    caption: 'ស្នាមញញឹម និងភាពកក់ក្តៅរបស់គូដណ្តប់ ពន្លឺ & ម៉ីជីង ក្នុងថ្ងៃដ៏មានសិរីមង្គល',
    tag: 'ពិធីមង្គល',
  },
  {
    id: 'slide-2',
    src: '/src/assets/images/khmer_engagement_portrait_1790932067653.jpg',
    title: 'ស្នេហ៍ស្មោះ និងសម្លៀកបំពាក់ប្រពៃណី',
    caption: 'រៀបចំឈុតប្រពៃណីខ្មែរពណ៌ផ្ទៃមេឃស្រាល និងប៉ាក់ខ្សែសូត្រមាសយ៉ាងប្រណីត',
    tag: 'ឈុតប្រពៃណី',
  },
  {
    id: 'slide-3',
    src: '/src/assets/images/rings_jasmine_tray_1790854677694.jpg',
    title: 'ចិញ្ចៀនសច្ចាលើជើងពានផ្កាម្លិះ',
    caption: 'ចិញ្ចៀនពេជ្រតំណាងសេចក្តីស្រឡាញ់ដ៏បរិសុទ្ធ អមដោយកម្រងផ្កាម្លិះក្រអូបសាយ',
    tag: 'ចិញ្ចៀនភ្ជាប់ពាក្យ',
  },
  {
    id: 'slide-4',
    src: '/src/assets/images/story_angkor_sunrise_1790854665750.jpg',
    title: 'ថ្ងៃរះលើទឹកដីអង្គរវត្ត',
    caption: 'ដំណើរកម្សាន្តទៅកាន់ខេត្តសៀមរាប និងការសន្យារួមដំណើរកសាងអនាគតជាមួយគ្នា',
    tag: 'ដំណើរកម្សាន្ត',
  },
];

interface PhotoSlideshowProps {
  compact?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
  onOpenFullscreen?: () => void;
  className?: string;
}

export const PhotoSlideshow: React.FC<PhotoSlideshowProps> = ({
  compact = false,
  autoPlayInterval = 4500,
  showThumbnails = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const timerRef = useRef<number | null>(null);

  // Auto-play cycle
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_PHOTOS.length);
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, autoPlayInterval, currentIndex]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = SLIDESHOW_PHOTOS.length - 1;
      if (nextIndex >= SLIDESHOW_PHOTOS.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const handleSelectSlide = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const currentSlide = SLIDESHOW_PHOTOS[currentIndex];

  const renderSlideshowContent = (full: boolean) => (
    <div
      className={`relative w-full overflow-hidden select-none font-khmer ${
        full
          ? 'h-full flex flex-col justify-between p-4 sm:p-8 bg-black/95 text-white'
          : 'rounded-2xl sm:rounded-3xl border border-sky-200/80 bg-gradient-to-b from-sky-50 to-white shadow-sm'
      }`}
    >
      {/* Top Bar with Tag and Play/Fullscreen Controls */}
      <div className="relative z-20 flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-khmer font-bold shadow-xs ${
              full
                ? 'bg-sky-500/80 text-white backdrop-blur-md'
                : 'bg-white/90 backdrop-blur-md text-[#096e9f] border border-sky-100'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{currentSlide.tag}</span>
          </span>
          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
              full ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-800'
            }`}
          >
            {currentIndex + 1} / {SLIDESHOW_PHOTOS.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${
              full
                ? 'bg-white/20 hover:bg-white/30 text-white'
                : 'bg-white/90 hover:bg-white text-slate-600 border border-sky-100'
            }`}
            title={isPlaying ? 'ផ្អាកការបញ្ចាំង' : 'បន្តការបញ្ចាំង'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {!compact && (
            <button
              onClick={() => setIsFullscreen(!full)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${
                full
                  ? 'bg-white/20 hover:bg-white/30 text-white'
                  : 'bg-white/90 hover:bg-white text-slate-600 border border-sky-100'
              }`}
              title={full ? 'បិទអេក្រង់ពេញ' : 'ពង្រីកពេញអេក្រង់'}
            >
              {full ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {full && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        className={`relative w-full overflow-hidden flex items-center justify-center ${
          full ? 'flex-1 my-2 max-h-[75vh]' : compact ? 'aspect-16/10' : 'aspect-16/10 sm:aspect-16/9'
        }`}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center"
          >
            {!imageErrorMap[currentSlide.id] ? (
              <img
                src={currentSlide.src}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                onError={() =>
                  setImageErrorMap((prev) => ({ ...prev, [currentSlide.id]: true }))
                }
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  full ? 'object-contain max-h-[70vh]' : ''
                }`}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-[#9fd0ef] to-[#dcedf8] flex flex-col items-center justify-center p-6 text-center">
                <Heart className="w-12 h-12 text-[#0d7bb8] mb-2 fill-sky-200" />
                <h4 className="font-moul text-slate-800 text-base">{currentSlide.title}</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-xs">{currentSlide.caption}</p>
              </div>
            )}

            {/* Gradient shadow for text readability when not fullscreen */}
            {!full && (
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent pointer-events-none" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Previous & Next Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
            full
              ? 'bg-white/20 hover:bg-white/40 text-white backdrop-blur-md'
              : 'bg-white/80 hover:bg-white text-slate-700 shadow-md backdrop-blur-md hover:scale-110 active:scale-95'
          }`}
          aria-label="រូបថតមុន"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => paginate(1)}
          className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
            full
              ? 'bg-white/20 hover:bg-white/40 text-white backdrop-blur-md'
              : 'bg-white/80 hover:bg-white text-slate-700 shadow-md backdrop-blur-md hover:scale-110 active:scale-95'
          }`}
          aria-label="រូបថតបន្ទាប់"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Floating caption on non-fullscreen */}
        {!full && (
          <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
            <h4 className="font-moul text-sm sm:text-base drop-shadow-md leading-normal text-white">
              {currentSlide.title}
            </h4>
            <p className="text-[11px] sm:text-xs text-white/90 drop-shadow-sm line-clamp-2 mt-0.5 font-khmer">
              {currentSlide.caption}
            </p>
          </div>
        )}
      </div>

      {/* Fullscreen caption bar */}
      {full && (
        <div className="text-center my-3 max-w-xl mx-auto">
          <h4 className="font-moul text-lg sm:text-xl text-white">{currentSlide.title}</h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{currentSlide.caption}</p>
        </div>
      )}

      {/* Progress line */}
      {isPlaying && (
        <div className="w-full bg-sky-100/50 h-[3px] overflow-hidden">
          <motion.div
            key={currentIndex}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
            className="h-full bg-[#1289dc]"
          />
        </div>
      )}

      {/* Bottom Thumbnail Strip & Indicator Dots */}
      <div className="p-3 bg-white/95 backdrop-blur-md flex items-center justify-between gap-3">
        {/* Indicators */}
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          {SLIDESHOW_PHOTOS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-6 bg-[#1289dc]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`ទៅកាន់រូបទី ${idx + 1}`}
            />
          ))}
        </div>

        {/* Thumbnails on larger screen if enabled */}
        {showThumbnails && !compact && (
          <div className="hidden sm:flex items-center gap-2">
            {SLIDESHOW_PHOTOS.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => handleSelectSlide(idx)}
                className={`relative w-12 h-9 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  idx === currentIndex
                    ? 'border-[#1289dc] scale-105 shadow-xs'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      {renderSlideshowContent(false)}

      {/* Lightbox / Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-2 sm:p-6 backdrop-blur-md"
            onClick={() => setIsFullscreen(false)}
          >
            <div
              className="w-full max-w-4xl max-h-[95vh] h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {renderSlideshowContent(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
