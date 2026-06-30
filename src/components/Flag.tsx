import React from 'react';

interface FlagProps {
  countryId: 'brasil' | 'espanha' | 'inglaterra' | 'italia' | string;
  className?: string;
}

export default function Flag({ countryId, className = "w-8 h-6" }: FlagProps) {
  const normId = countryId.toLowerCase();

  return (
    <div className={`inline-flex items-center justify-center overflow-hidden rounded shadow-sm border border-slate-800/60 shrink-0 ${className}`}>
      {normId === 'brasil' && (
        <svg viewBox="0 0 720 504" className="w-full h-full object-cover">
          <rect width="720" height="504" fill="#009c3b" />
          <polygon points="360,54 666,252 360,450 54,252" fill="#ffdf00" />
          <circle cx="360" cy="252" r="111" fill="#002776" />
          <path d="M249,252 Q360,190 471,252 Q360,205 249,252" fill="#ffffff" />
        </svg>
      )}

      {normId === 'espanha' && (
        <svg viewBox="0 0 750 500" className="w-full h-full object-cover">
          <rect width="750" height="500" fill="#c60b1e" />
          <rect y="125" width="750" height="250" fill="#ffc400" />
          {/* Simplified coat of arms representation */}
          <circle cx="200" cy="250" r="35" fill="#c60b1e" opacity="0.8" />
          <circle cx="200" cy="250" r="25" fill="#3b82f6" opacity="0.6" />
        </svg>
      )}

      {normId === 'inglaterra' && (
        <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
          <rect width="500" height="300" fill="#ffffff" />
          {/* St George's Cross */}
          <rect x="220" width="60" height="300" fill="#cf142b" />
          <rect y="120" width="500" height="60" fill="#cf142b" />
        </svg>
      )}

      {normId === 'italia' && (
        <svg viewBox="0 0 300 200" className="w-full h-full object-cover">
          <rect width="100" height="200" fill="#009246" />
          <rect x="100" width="100" height="200" fill="#f1f2f1" />
          <rect x="200" width="100" height="200" fill="#ce2b37" />
        </svg>
      )}

      {!['brasil', 'espanha', 'inglaterra', 'italia'].includes(normId) && (
        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-[10px]">
          ??
        </div>
      )}
    </div>
  );
}
