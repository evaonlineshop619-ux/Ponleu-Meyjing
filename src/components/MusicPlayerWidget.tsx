import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  Disc3,
  Sparkles,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ceremonyAudio } from '../utils/audio';

export const MusicPlayerWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(ceremonyAudio.getIsPlaying());
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(180);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const unsubscribe = ceremonyAudio.subscribe((playing, prog, dur) => {
      setIsPlaying(playing);
      setProgress(prog);
      if (dur > 0) setDuration(dur);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    ceremonyAudio.toggle();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      ceremonyAudio.setVolume(volume);
      setIsMuted(false);
    } else {
      ceremonyAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    ceremonyAudio.setVolume(val);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    ceremonyAudio.seek(val);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 select-none">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-2 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-sky-100 w-64 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-sans-clean font-bold tracking-widest text-[#0a6699] uppercase">
                Ceremony Soundtrack
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Song info */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-tr from-[#1289dc] to-[#7dd3fc] flex items-center justify-center text-white shadow-sm shrink-0 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '6s' }}
              >
                <Disc3 className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 truncate font-sans-clean">
                  {ceremonyAudio.trackName}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {ceremonyAudio.trackSubtext}
                </p>
              </div>
            </div>

            {/* Seek Bar */}
            <div className="space-y-1 mb-2">
              <input
                type="range"
                min={0}
                max={duration || 180}
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-[#1289dc]"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-400">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1.5 flex-1 mr-2">
                <button
                  onClick={handleToggleMute}
                  className="text-slate-500 hover:text-slate-800"
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-[#1289dc]"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handleTogglePlay}
                className="w-8 h-8 rounded-full bg-[#1289dc] hover:bg-[#0c7ac6] text-white flex items-center justify-center shadow-xs transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (!isPlaying && !isExpanded) {
            ceremonyAudio.play();
          } else {
            setIsExpanded(!isExpanded);
          }
        }}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border shadow-lg transition-all ${
          isPlaying
            ? 'bg-white/95 border-[#9fd3f2] text-[#0b7cb8] shadow-sky-500/20'
            : 'bg-white/90 border-slate-200 text-slate-600 shadow-slate-400/10'
        }`}
        title="Toggle Music Player"
      >
        {/* Animated Sound Wave Equalizer Bars */}
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-3.5 w-3.5">
            <span className="w-[2px] bg-[#1289dc] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
            <span className="w-[2px] bg-[#1289dc] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.15s] h-3.5" />
            <span className="w-[2px] bg-[#1289dc] rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.3s] h-1.5" />
            <span className="w-[2px] bg-[#1289dc] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.1s] h-3" />
          </div>
        ) : (
          <Music className="w-3.5 h-3.5 text-slate-500" />
        )}

        <div className="flex flex-col text-left">
          <span className="text-[11px] font-sans-clean font-bold tracking-tight leading-none text-[#076a9e]">
            {isPlaying ? 'All3rgy' : 'Play Music'}
          </span>
          {isPlaying && (
            <span className="text-[9px] text-slate-400 truncate max-w-[85px] leading-tight">
              បើគ្មាននិស្ស័យ
            </span>
          )}
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            handleTogglePlay(e);
          }}
          className="w-5 h-5 rounded-full bg-sky-100 hover:bg-sky-200 text-[#0d7bb8] flex items-center justify-center ml-0.5 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-2.5 h-2.5" />
          ) : (
            <Play className="w-2.5 h-2.5 ml-0.5" />
          )}
        </div>
      </motion.button>
    </div>
  );
};
