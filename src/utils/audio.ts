/**
 * Engagement Ceremony Audio Player
 * Plays the user's requested song: "All3rgy - បើគ្មាននិស្ស័យ" (/ceremony_music.mp3)
 * with romantic harp chime synthesizer fallback.
 */

type AudioListener = (isPlaying: boolean, progress: number, duration: number) => void;

class CeremonyAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners: Set<AudioListener> = new Set();
  private progressInterval: number | null = null;
  public readonly trackName = 'All3rgy - បើគ្មាននិស្ស័យ';
  public readonly trackSubtext = 'Engagement Theme Music';

  // Fallback Web Audio Synthesizer
  private synthCtx: AudioContext | null = null;
  private synthTimer: number | null = null;
  private synthNoteIndex = 0;
  private isUsingFallback = false;

  private readonly synthNotes = [
    293.66, 369.99, 440.0, 587.33, 440.0, 369.99,
    246.94, 329.63, 392.0, 493.88, 392.0, 329.63,
    261.63, 329.63, 392.0, 523.25, 392.0, 329.63,
    220.00, 277.18, 329.63, 440.0, 329.63, 277.18
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;

    try {
      this.audio = new Audio('/ceremony_music.mp3');
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = 0.75;

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.startProgressTracker();
        this.notifyListeners();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.stopProgressTracker();
        this.notifyListeners();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.stopProgressTracker();
        this.notifyListeners();
      });

      this.audio.addEventListener('error', () => {
        // Fallback to web audio synth if mp3 fails
        this.isUsingFallback = true;
      });
    } catch {
      this.isUsingFallback = true;
    }
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying, this.getProgress(), this.getDuration());
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    const progress = this.getProgress();
    const duration = this.getDuration();
    this.listeners.forEach((fn) => fn(this.isPlaying, progress, duration));
  }

  private startProgressTracker() {
    this.stopProgressTracker();
    this.progressInterval = window.setInterval(() => {
      this.notifyListeners();
    }, 500);
  }

  private stopProgressTracker() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  public async play(): Promise<boolean> {
    this.initAudio();

    if (this.audio && !this.isUsingFallback) {
      try {
        await this.audio.play();
        this.isPlaying = true;
        this.notifyListeners();
        return true;
      } catch {
        // Autoplay policy or error, fallback to synth
        return this.playFallback();
      }
    } else {
      return this.playFallback();
    }
  }

  public pause() {
    if (this.audio && !this.isUsingFallback) {
      this.audio.pause();
    }
    this.pauseFallback();
    this.isPlaying = false;
    this.notifyListeners();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setVolume(vol: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, vol));
    }
  }

  public seek(seconds: number) {
    if (this.audio && !this.isUsingFallback) {
      this.audio.currentTime = seconds;
      this.notifyListeners();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getProgress(): number {
    return this.audio ? this.audio.currentTime : 0;
  }

  public getDuration(): number {
    return this.audio && !isNaN(this.audio.duration) ? this.audio.duration : 180;
  }

  // --- Fallback Synth Implementation ---
  private playFallback(): boolean {
    try {
      if (!this.synthCtx && typeof window !== 'undefined') {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.synthCtx = new AudioCtx();
      }
      if (this.synthCtx && this.synthCtx.state === 'suspended') {
        this.synthCtx.resume();
      }
      this.isPlaying = true;
      this.stepSynth();
      this.notifyListeners();
      return true;
    } catch {
      return false;
    }
  }

  private stepSynth = () => {
    if (!this.isPlaying || !this.synthCtx) return;
    const freq = this.synthNotes[this.synthNoteIndex % this.synthNotes.length];
    this.playSynthNote(freq);
    this.synthNoteIndex++;
    this.synthTimer = window.setTimeout(this.stepSynth, 600);
  };

  private playSynthNote(freq: number) {
    if (!this.synthCtx) return;
    try {
      const now = this.synthCtx.currentTime;
      const osc = this.synthCtx.createOscillator();
      const gain = this.synthCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
      osc.connect(gain);
      gain.connect(this.synthCtx.destination);
      osc.start(now);
      osc.stop(now + 1.65);
    } catch {
      // Audio error
    }
  }

  private pauseFallback() {
    if (this.synthTimer) {
      clearTimeout(this.synthTimer);
      this.synthTimer = null;
    }
  }
}

export const ceremonyAudio = new CeremonyAudioPlayer();
export const romanticAudio = ceremonyAudio;
