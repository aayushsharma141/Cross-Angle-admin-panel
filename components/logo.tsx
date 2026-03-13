import React from 'react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Simulated CA Logo */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="100%" stopColor="#8b0000" />
            </linearGradient>
          </defs>
          <path d="M 50 10 A 40 40 0 1 0 90 50" fill="none" stroke="url(#grad1)" strokeWidth="12" strokeLinecap="round" />
          <path d="M 40 80 L 70 20 L 80 20 L 50 80 Z" fill="url(#grad1)" />
          <path d="M 30 60 L 90 60" fill="none" stroke="url(#grad1)" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
