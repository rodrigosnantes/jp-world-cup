import React from 'react';

interface JpffsLogoProps {
  className?: string;
  size?: number;
}

export default function JpffsLogo({ className = '', size = 36 }: JpffsLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <defs>
        {/* Gold gradient for the border and text */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="50%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#B78103" />
        </linearGradient>

        {/* Shiny golden highlight */}
        <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="100%" stopColor="#F57F17" />
        </linearGradient>

        {/* Shield dark inner gradient */}
        <linearGradient id="shieldBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B0E14" />
          <stop offset="50%" stopColor="#05070A" />
          <stop offset="100%" stopColor="#0F1420" />
        </linearGradient>

        {/* Outer drop shadow */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Shield Main Shape with shadow */}
      <path
        d="M 50 5 C 75 5, 90 10, 95 25 C 95 65, 75 92, 50 105 C 25 92, 5 65, 5 25 C 10 10, 25 5, 50 5 Z"
        fill="url(#shieldBg)"
        stroke="url(#goldGradient)"
        strokeWidth="4.5"
        strokeLinejoin="round"
        filter="url(#logoShadow)"
      />

      {/* Inner thin golden border line */}
      <path
        d="M 50 10 C 71 10, 84 14, 89 27 C 89 61, 71 86, 50 97 C 29 86, 11 61, 11 27 C 16 14, 29 10, 50 10 Z"
        stroke="url(#goldGradient)"
        strokeWidth="1.2"
        strokeOpacity="0.5"
        strokeLinejoin="round"
      />

      {/* Top Gold Star */}
      <polygon
        points="50,16 53.5,23.5 61.5,23.5 55,28 57.5,35.5 50,31 42.5,35.5 45,28 38.5,23.5 46.5,23.5"
        fill="url(#goldHighlight)"
      />

      {/* "JPFFS" Bold Text */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fill="url(#goldHighlight)"
        fontWeight="900"
        fontSize="17"
        fontFamily="sans-serif"
        letterSpacing="0.5"
      >
        JPFFS
      </text>

      {/* "2008" Year Text */}
      <text
        x="50"
        y="72"
        textAnchor="middle"
        fill="url(#goldGradient)"
        fontWeight="700"
        fontSize="7.5"
        fontFamily="sans-serif"
        letterSpacing="1"
        opacity="0.9"
      >
        2008
      </text>

      {/* White circle at the bottom */}
      <circle cx="50" cy="88" r="9" fill="#FFFFFF" />

      {/* Red cross inside the white circle */}
      {/* Horizontal bar */}
      <rect x="44.5" y="86" width="11" height="4" rx="0.5" fill="#DC2626" />
      {/* Vertical bar */}
      <rect x="48" y="82.5" width="4" height="11" rx="0.5" fill="#DC2626" />
    </svg>
  );
}
