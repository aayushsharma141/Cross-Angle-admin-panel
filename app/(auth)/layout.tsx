import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#0a0c10] transition-colors">
      {/* Background blurred lines */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1 bg-cyan-500/30 blur-[2px] rounded-full transform -rotate-6" />
      <div className="absolute top-1/3 right-0 w-1/4 h-1 bg-purple-500/30 blur-[2px] rounded-full transform rotate-3" />
      <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1 bg-green-500/20 blur-[2px] rounded-full transform rotate-2" />
      <div className="absolute top-1/2 right-1/4 w-1/5 h-1 bg-pink-500/20 blur-[2px] rounded-full transform -rotate-12" />
      
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-md px-6">
        {children}
      </div>
    </div>
  );
}
