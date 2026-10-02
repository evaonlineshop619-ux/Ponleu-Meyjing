import React, { useMemo } from 'react';

/**
 * Botanical leaf ornament matching the corners in the user's invitation image,
 * with subtle natural breeze sway animation.
 */
export const BotanicalCorner: React.FC<{
  className?: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}> = ({ className = '', position }) => {
  const rotationMap = {
    'top-left': 'scale-x-100 scale-y-100 animate-breeze-left',
    'top-right': '-scale-x-100 scale-y-100 animate-breeze-right',
    'bottom-left': 'scale-x-100 -scale-y-100 animate-breeze-left',
    'bottom-right': '-scale-x-100 -scale-y-100 animate-breeze-right',
  };

  return (
    <div
      className={`pointer-events-none select-none transition-transform duration-1000 ${rotationMap[position]} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-28 sm:w-32 sm:h-36 text-[#5b9ecc] opacity-75"
      >
        {/* Main outer leaf curves */}
        <path
          d="M 30 150 C 35 110, 65 40, 135 15 C 95 65, 45 115, 30 150 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner secondary leaf arc */}
        <path
          d="M 30 150 C 50 110, 95 60, 135 15"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.7"
        />
        {/* Outer petal contour left */}
        <path
          d="M 30 150 C 15 115, 35 60, 95 35"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Connecting delicate vein ribs */}
        <path
          d="M 30 150 C 60 135, 110 90, 135 15"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 50 108 C 68 114, 88 106, 105 85"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M 68 85 C 84 90, 102 80, 118 56"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M 40 128 C 50 132, 65 125, 76 110"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M 88 60 C 100 64, 115 50, 128 32"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
        />

        {/* Vertex joint nodes */}
        <circle cx="30" cy="150" r="3.5" fill="#3b82f6" fillOpacity="0.8" />
        <circle cx="30" cy="150" r="1.5" fill="#ffffff" />
        <circle cx="135" cy="15" r="2" fill="currentColor" opacity="0.8" />
        <circle cx="95" cy="35" r="1.5" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  );
};

/**
 * Intertwined wedding rings motif with diamond top and radiant glint animation
 */
export const IntertwinedRings: React.FC<{
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement | HTMLDivElement>) => void;
}> = ({ className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group ${className}`}
      title="ចុចដើម្បីទស្សនាស្លាយរូបថត (Click to view Photo Slideshow)"
    >
      {/* Soft atmospheric glow circle behind with interactive pulse */}
      <div className="absolute -top-3 right-2 w-8 h-8 rounded-full bg-sky-200/60 blur-[3px] animate-pulse-gentle group-hover:bg-sky-300/80 group-hover:scale-125 transition-all" />

      <svg
        viewBox="0 0 120 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label="ទស្សនាស្លាយរូបថត (Open Photo Slideshow)"
        className="w-16 h-10 sm:w-20 sm:h-12 text-[#1b7ec0] group-hover:text-[#0b6aa8] cursor-pointer transition-all duration-300 drop-shadow-[0_4px_12px_rgba(27,126,192,0.22)] group-hover:drop-shadow-[0_6px_16px_rgba(27,126,192,0.35)]"
      >
        {/* Left ring */}
        <circle
          cx="48"
          cy="42"
          r="20"
          stroke="currentColor"
          strokeWidth="2.2"
          className="drop-shadow-xs"
        />
        <circle
          cx="48"
          cy="42"
          r="16.5"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />

        {/* Diamond on left ring */}
        <g transform="translate(48, 22)">
          {/* Diamond gem outline */}
          <path
            d="M 0 -13 L 5 -7 L 0 -1 L -5 -7 Z"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="#e0f2fe"
          />
          {/* Facets */}
          <path
            d="M -5 -7 L 5 -7 M 0 -13 L 0 -1"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.7"
          />

          {/* Diamond Sparkle Glint flare */}
          <g className="animate-diamond-glint origin-center">
            <line x1="0" y1="-17" x2="0" y2="3" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="-10" y1="-7" x2="10" y2="-7" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="0" cy="-7" r="2" fill="#ffffff" />
          </g>
        </g>

        {/* Right ring interlocking */}
        <circle
          cx="72"
          cy="42"
          r="20"
          stroke="currentColor"
          strokeWidth="2.2"
          className="drop-shadow-xs"
        />
        <circle
          cx="72"
          cy="42"
          r="16.5"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />

        {/* Interlocking overlap illusion */}
        <path
          d="M 60 26 C 63 30, 65 36, 65 42 C 65 47, 63 53, 60 57"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

/**
 * Atmospheric floating bokeh particles & romantic flower petals
 */
export const BokehParticles: React.FC = () => {
  // Pre-calculate randomized positions for soft floating flower petals
  const petals = useMemo(
    () => [
      { id: 1, left: '10%', delay: '0s', duration: '9s', size: 10, drift: '45px', rot: '180deg' },
      { id: 2, left: '28%', delay: '2.5s', duration: '11s', size: 12, drift: '-35px', rot: '260deg' },
      { id: 3, left: '55%', delay: '1s', duration: '8.5s', size: 9, drift: '50px', rot: '140deg' },
      { id: 4, left: '76%', delay: '4s', duration: '12s', size: 11, drift: '-40px', rot: '220deg' },
      { id: 5, left: '88%', delay: '1.8s', duration: '10s', size: 8, drift: '30px', rot: '190deg' },
      { id: 6, left: '42%', delay: '5s', duration: '9.5s', size: 10, drift: '-25px', rot: '210deg' },
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Drifting Flower Petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 opacity-0 pointer-events-none"
          style={{
            left: p.left,
            animation: `petal-fall ${p.duration} linear infinite`,
            animationDelay: p.delay,
            // Custom properties for keyframe drift
            ['--petal-x' as string]: p.drift,
            ['--petal-rot' as string]: p.rot,
          }}
        >
          {/* Petal SVG */}
          <svg
            width={p.size}
            height={p.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white/60 drop-shadow-xs"
          >
            <path
              d="M 10 0 C 18 8, 20 18, 10 26 C 0 18, 2 8, 10 0 Z"
              fill="rgba(255, 255, 255, 0.65)"
              stroke="rgba(186, 230, 253, 0.5)"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      ))}

      {/* Soft blue glowing orbs */}
      <div className="absolute top-[8%] left-[22%] w-6 h-6 rounded-full bg-sky-200/50 blur-[2px] animate-float" />
      <div className="absolute top-[14%] right-[28%] w-5 h-5 rounded-full bg-sky-200/40 blur-[1px] animate-float-reverse" />
      <div className="absolute top-[22%] left-[48%] w-4 h-4 rounded-full bg-sky-300/50 blur-[1px] animate-pulse-gentle" />
      <div className="absolute top-[32%] right-[12%] w-8 h-8 rounded-full bg-sky-100/60 blur-[3px] animate-float" />
      <div className="absolute top-[65%] left-[8%] w-7 h-7 rounded-full bg-sky-200/35 blur-[2px] animate-float-reverse" />
      <div className="absolute top-[78%] right-[18%] w-6 h-6 rounded-full bg-sky-100/50 blur-[2px] animate-float" />
      <div className="absolute top-[90%] left-[30%] w-5 h-5 rounded-full bg-sky-200/40 blur-[1px] animate-pulse-gentle" />

      {/* Tiny shimmering stars with animated twinkle */}
      <div className="absolute top-[18%] left-[16%] text-sky-400/50 text-xs select-none animate-pulse">✦</div>
      <div className="absolute top-[28%] right-[20%] text-sky-400/40 text-xs select-none animate-pulse-gentle">✦</div>
      <div className="absolute top-[48%] left-[8%] text-sky-300/50 text-[10px] select-none animate-float">✦</div>
      <div className="absolute top-[82%] right-[10%] text-sky-400/45 text-xs select-none animate-pulse">✦</div>
    </div>
  );
};
