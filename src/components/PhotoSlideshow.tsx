import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Plus,
  Upload,
  Trash2,
  Image as ImageIcon,
  Check,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import heroEngagementImg from '../assets/images/hero_engagement_ceremony_1790854646265.jpg';
import khmerPortraitImg from '../assets/images/khmer_engagement_portrait_1790932067653.jpg';
import ringsJasmineImg from '../assets/images/rings_jasmine_tray_1790854677694.jpg';
import storyAngkorImg from '../assets/images/story_angkor_sunrise_1790854665750.jpg';

export interface SlideItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
  isCustom?: boolean;
}

export const SLIDESHOW_PHOTOS: SlideItem[] = [
  {
    id: 'slide-1',
    src: heroEngagementImg,
    title: 'អនុស្សាវរីយ៍ថ្ងៃភ្ជាប់ពាក្យ',
    caption: 'ស្នាមញញឹម និងភាពកក់ក្តៅរបស់គូដណ្តប់ ពន្លឺ & ម៉ីជីង ក្នុងថ្ងៃដ៏មានសិរីមង្គល',
    tag: 'ពិធីមង្គល',
  },
  {
    id: 'slide-2',
    src: khmerPortraitImg,
    title: 'ស្នេហ៍ស្មោះ និងសម្លៀកបំពាក់ប្រពៃណី',
    caption: 'រៀបចំឈុតប្រពៃណីខ្មែរពណ៌ផ្ទៃមេឃស្រាល និងប៉ាក់ខ្សែសូត្រមាសយ៉ាងប្រណីត',
    tag: 'ឈុតប្រពៃណី',
  },
  {
    id: 'slide-3',
    src: ringsJasmineImg,
    title: 'ចិញ្ចៀនសច្ចាលើជើងពានផ្កាម្លិះ',
    caption: 'ចិញ្ចៀនពេជ្រតំណាងសេចក្តីស្រឡាញ់ដ៏បរិសុទ្ធ អមដោយកម្រងផ្កាម្លិះក្រអូបសាយ',
    tag: 'ចិញ្ចៀនភ្ជាប់ពាក្យ',
  },
  {
    id: 'slide-4',
    src: storyAngkorImg,
    title: 'ថ្ងៃរះលើទឹកដីអង្គរវត្ត',
    caption: 'ដំណើរកម្សាន្តទៅកាន់ខេត្តសៀមរាប និងការសន្យារួមដំណើរកសាងអនាគតជាមួយគ្នា',
    tag: 'ដំណើរកម្សាន្ត',
  },
];

const LOCAL_STORAGE_KEY = 'ponleu_meyjing_custom_slides';

function getStoredCustomSlides(): SlideItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCustomSlides(slides: SlideItem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(slides));
  } catch (err) {
    console.error('Failed to save slides to localStorage', err);
  }
}

/**
 * Resizes and compresses uploaded images so they store safely in browser localStorage
 */
function compressImage(file: File, maxWidth = 1400, maxHeight = 1000, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

interface PhotoSlideshowProps {
  compact?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
  allowAddPhoto?: boolean;
  onOpenFullscreen?: () => void;
  className?: string;
}

export const PhotoSlideshow: React.FC<PhotoSlideshowProps> = ({
  compact = false,
  autoPlayInterval = 4500,
  showThumbnails = true,
  allowAddPhoto = true,
  className = '',
}) => {
  const [customSlides, setCustomSlides] = useState<SlideItem[]>(() => getStoredCustomSlides());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  // Add Photo Dialog state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newTag, setNewTag] = useState('រូបថតអនុស្សាវរីយ៍');
  const [newImageSrc, setNewImageSrc] = useState('');
  const [newImageUrlInput, setNewImageUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // Combine default photos + user custom uploaded photos
  const allSlides = useMemo(() => [...SLIDESHOW_PHOTOS, ...customSlides], [customSlides]);

  // Ensure currentIndex stays within bounds if slides change
  useEffect(() => {
    if (currentIndex >= allSlides.length) {
      setCurrentIndex(Math.max(0, allSlides.length - 1));
    }
  }, [allSlides.length, currentIndex]);

  // Auto-play cycle
  useEffect(() => {
    if (!isPlaying || isAddModalOpen || isFullscreen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % allSlides.length);
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, autoPlayInterval, currentIndex, allSlides.length, isAddModalOpen, isFullscreen]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = allSlides.length - 1;
      if (nextIndex >= allSlides.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const handleSelectSlide = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Handle file select from device
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('សូមជ្រើសរើសឯកសារជារូបភាព (JPG, PNG, WebP)');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    try {
      const compressedDataUrl = await compressImage(file);
      setNewImageSrc(compressedDataUrl);
      if (!newTitle) {
        const baseName = file.name.replace(/\.[^/.]+$/, '').slice(0, 30);
        setNewTitle(baseName || 'រូបថតថ្មី');
      }
    } catch {
      setUploadError('មិនអាចដំណើរការរូបភាពនេះបានទេ។ សូមសាកល្បងរូបភាពផ្សេង។');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSrc = newImageSrc.trim() || newImageUrlInput.trim();

    if (!finalSrc) {
      setUploadError('សូមជ្រើសរើសរូបថតពីទូរស័ព្ទ ឬបញ្ចូលតំណភ្ជាប់រូបភាព (URL)។');
      return;
    }

    const newSlide: SlideItem = {
      id: `custom-slide-${Date.now()}`,
      src: finalSrc,
      title: newTitle.trim() || 'អនុស្សាវរីយ៍ថ្មី',
      caption: newCaption.trim() || 'រូបថតអនុស្សាវរីយ៍បន្ថែមដោយភ្ញៀវកិត្តិយស',
      tag: newTag || 'រូបថតបន្ថែម',
      isCustom: true,
    };

    const updated = [...customSlides, newSlide];
    setCustomSlides(updated);
    saveCustomSlides(updated);

    // Jump to the newly added slide
    setCurrentIndex(SLIDESHOW_PHOTOS.length + updated.length - 1);
    setDirection(1);

    // Reset form
    setNewTitle('');
    setNewCaption('');
    setNewImageSrc('');
    setNewImageUrlInput('');
    setAddSuccess(true);

    setTimeout(() => {
      setAddSuccess(false);
      setIsAddModalOpen(false);
    }, 1200);
  };

  // Delete custom added photo
  const handleDeleteCustomPhoto = (slideId: string) => {
    const updated = customSlides.filter((s) => s.id !== slideId);
    setCustomSlides(updated);
    saveCustomSlides(updated);
    setCurrentIndex(0);
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

  const currentSlide = allSlides[currentIndex] || SLIDESHOW_PHOTOS[0];

  const renderSlideshowContent = (full: boolean) => (
    <div
      className={`relative w-full overflow-hidden select-none font-khmer ${
        full
          ? 'h-full flex flex-col justify-between p-4 sm:p-8 bg-black/95 text-white'
          : 'rounded-2xl sm:rounded-3xl border border-sky-200/80 bg-gradient-to-b from-sky-50 to-white shadow-sm'
      }`}
    >
      {/* Top Bar with Tag, Photo Count, Add Photo and Controls */}
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
            {currentIndex + 1} / {allSlides.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Add Photo Button */}
          {allowAddPhoto && !full && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-8 h-8 rounded-full bg-[#1289dc] hover:bg-[#0c7ac6] text-white flex items-center justify-center transition-all shadow-xs active:scale-95"
              title="បន្ថែមរូបថតចូលក្នុងស្លាយ (+)"
              aria-label="បន្ថែមរូបថត"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}

          {/* Delete button if current slide is custom uploaded */}
          {currentSlide.isCustom && !full && (
            <button
              onClick={() => handleDeleteCustomPhoto(currentSlide.id)}
              className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-all shadow-xs border border-rose-200"
              title="លុបរូបថតនេះចេញពីស្លាយ"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

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
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0 flex-wrap">
          {allSlides.map((_, idx) => (
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
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto max-w-[55%] py-1">
            {allSlides.map((photo, idx) => (
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

            {/* Quick add thumbnail button */}
            {allowAddPhoto && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-12 h-9 rounded-lg border-2 border-dashed border-sky-300 hover:border-[#1289dc] hover:bg-sky-50 text-sky-600 flex items-center justify-center transition-all shrink-0"
                title="បន្ថែមរូបថតថ្មី"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
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

      {/* Add Photo In-App Modal / Dialog */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-khmer">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#eaf5fc] via-[#dcedf8] to-[#e4f1fa] px-6 py-4 flex items-center justify-between border-b border-sky-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white text-[#0a6699] flex items-center justify-center shadow-xs">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-khmer tracking-wider text-[#0a6699] font-bold uppercase">
                      កម្រងរូបថត
                    </span>
                    <h3 className="font-moul text-base sm:text-lg text-slate-800 leading-normal mt-0.5">
                      បន្ថែមរូបថតទៅក្នុងស្លាយ
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all shadow-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleAddPhotoSubmit} className="p-6 overflow-y-auto space-y-4">
                {uploadError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {addSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>បានបន្ថែមរូបថតទៅក្នុងស្លាយដោយជោគជ័យ!</span>
                  </div>
                )}

                {/* Upload Picker & Preview */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    ជ្រើសរើសរូបថត (ពីទូរស័ព្ទ ឬកុំព្យូទ័រ) *
                  </label>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {newImageSrc ? (
                    <div className="relative rounded-2xl overflow-hidden border-2 border-sky-300 aspect-16/10 bg-slate-100 group">
                      <img
                        src={newImageSrc}
                        alt="រូបភាពដែលបានជ្រើសរើស"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 bg-white text-slate-800 rounded-full text-xs font-semibold shadow-xs"
                        >
                          ប្តូររូបថត
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewImageSrc('')}
                          className="px-3 py-1.5 bg-rose-600 text-white rounded-full text-xs font-semibold shadow-xs"
                        >
                          លុប
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer border-2 border-dashed border-sky-300 hover:border-[#1289dc] hover:bg-sky-50/50 rounded-2xl p-6 text-center transition-all flex flex-col items-center justify-center gap-2 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-sky-100 text-[#0d7bb8] group-hover:bg-[#1289dc] group-hover:text-white transition-colors flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-800 block">
                          ចុចទីនេះដើម្បីជ្រើសរើសរូបថត
                        </strong>
                        <span className="text-[11px] text-slate-500">
                          គាំទ្ររូបភាព JPG, PNG, WebP
                        </span>
                      </div>
                      {isUploading && (
                        <span className="text-xs text-sky-600 font-semibold animate-pulse">
                          កំពុងដំណើរការរូបភាព...
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Option 2: Image URL input */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    ឬបញ្ចូលតំណភ្ជាប់រូបភាព (Image URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={newImageUrlInput}
                    onChange={(e) => {
                      setNewImageUrlInput(e.target.value);
                      if (e.target.value) setNewImageSrc(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#1289dc] focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ចំណងជើងរូបថត *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ឧ. ស្នាមញញឹមដ៏កក់ក្តៅ / ពិធីពិសាស្លា"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#1289dc] focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ការពិពណ៌នាសង្ខេប
                  </label>
                  <textarea
                    rows={2}
                    placeholder="ឧ. ការចងចាំដ៏ផ្អែមល្ហែមក្នុងថ្ងៃភ្ជាប់ពាក្យ..."
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#1289dc] focus:ring-2 focus:ring-sky-100 resize-none"
                  />
                </div>

                {/* Tag Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    ប្រភេទស្លាក (Tag)
                  </label>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {[
                      'ពិធីមង្គល',
                      'ឈុតប្រពៃណី',
                      'ចិញ្ចៀនភ្ជាប់ពាក្យ',
                      'ដំណើរកម្សាន្ត',
                      'អនុស្សាវរីយ៍',
                      'គ្រួសារ',
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setNewTag(tag)}
                        className={`px-3 py-1.5 rounded-full border transition-all ${
                          newTag === tag
                            ? 'bg-[#1289dc] text-white border-[#1289dc] font-bold shadow-xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    បោះបង់
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading || (!newImageSrc && !newImageUrlInput)}
                    className="px-5 py-2.5 rounded-xl bg-[#1289dc] hover:bg-[#0c7ac6] disabled:opacity-50 text-white text-xs font-khmer font-bold tracking-wide shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>បញ្ចូលទៅក្នុងស្លាយ</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
