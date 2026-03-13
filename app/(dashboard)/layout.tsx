'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, LogOut, Home, ExternalLink, Moon, RotateCcw, User, Settings, Menu } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [notif, setNotif] = useState(false);
  const [usr, setUsr] = useState(false);
  const [srch, setSrch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e2e8f0] flex flex-col transition-colors">
      {/* Top Navigation */}
      <header className="h-14 bg-[#0a0a14]/90 backdrop-blur-xl border-b border-white/5 flex items-center px-4 sm:px-6 gap-2.5 sticky top-0 z-50 transition-colors">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-[27px] h-[27px] rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-extrabold text-white font-[family-name:--font-syne]">CA</span>
          </div>
          <span className="font-[family-name:--font-syne] font-bold text-sm text-[#e2e8f0] tracking-tight hidden sm:inline-block">CrossAngle Intelligence</span>
        </Link>
        
        <div className="flex-1" />

        {pathname !== '/dashboard' && (
          <Link href="/dashboard" className="hidden md:flex bg-transparent text-slate-400/70 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] font-medium hover:bg-white/5 hover:text-slate-200 hover:border-white/20 transition-all items-center gap-1.5">
            <Home size={12} />Hub
          </Link>
        )}
        
        <button className="hidden md:flex bg-transparent text-slate-400/70 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] font-medium hover:bg-white/5 hover:text-slate-200 hover:border-white/20 transition-all items-center gap-1.5">
          <ExternalLink size={12} />View Website
        </button>

        {srch ? (
          <div className="relative w-full max-w-[200px] absolute sm:relative left-4 right-4 sm:left-auto sm:right-auto z-50">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400/40" />
            <input
              type="text"
              placeholder="Search…"
              autoFocus
              onBlur={() => setSrch(false)}
              className="w-full bg-[#12121a] sm:bg-white/5 border border-white/10 rounded-lg py-1.5 pl-7 pr-3 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all shadow-lg sm:shadow-none"
            />
          </div>
        ) : (
          <button onClick={() => setSrch(true)} className="bg-transparent border-none text-slate-400/60 p-1.5 rounded-md flex items-center justify-center hover:bg-purple-600/15 hover:text-purple-400 transition-all gap-1.5">
            <Search size={15} />
            <span className="hidden sm:inline-block text-[11px] text-slate-400/35">Ctrl K</span>
          </button>
        )}

        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
        
        <button className="hidden sm:flex bg-transparent border-none text-slate-400/60 p-1.5 rounded-md items-center justify-center hover:bg-purple-600/15 hover:text-purple-400 transition-all">
          <RotateCcw size={14} />
        </button>

        <div className="relative">
          <button onClick={() => { setNotif(!notif); setUsr(false); }} className="bg-transparent border-none text-slate-400/60 p-1.5 rounded-md flex items-center justify-center hover:bg-purple-600/15 hover:text-purple-400 transition-all relative">
            <Bell size={15} />
            <div className="w-[7px] h-[7px] bg-pink-500 rounded-full absolute top-1 right-1 shadow-[0_0_6px_#ec4899]" />
          </button>
          
          {notif && (
            <div className="absolute top-[calc(100%+8px)] right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 md:translate-x-0 md:left-auto md:right-0 bg-[#0d0d18]/95 border border-white/10 rounded-xl p-2 w-[275px] max-w-[90vw] z-[100] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400/40 px-2 pt-1 pb-2 border-b border-white/5 mb-1">Notifications</div>
              {[
                { t: "New Estimator lead", s: "Rajesh Mehta · ₹45-60L", tm: "2m" },
                { t: "Discovery milestone", s: "100 sessions today", tm: "1h" },
                { t: "Blog published", s: "2025 Interior Trends", tm: "3h" }
              ].map((n, i) => (
                <div key={i} className="p-2.5 rounded-lg cursor-pointer hover:bg-purple-600/10 transition-colors">
                  <div className="text-[12px] text-slate-200">{n.t}</div>
                  <div className="text-[11px] text-slate-400/45 mt-0.5">{n.s} · {n.tm} ago</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div onClick={() => { setUsr(!usr); setNotif(false); }} className="flex items-center gap-2 cursor-pointer px-1.5 sm:px-2.5 py-1 rounded-lg border border-transparent sm:border-white/10 sm:bg-white/5 hover:bg-white/10 transition-colors">
            <div className="w-[27px] h-[27px] rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
              {user?.displayName?.[0]?.toUpperCase() || 'A'}
            </div>
            <span className="hidden sm:inline-block text-[13px] text-slate-200">{user?.displayName || 'Admin'}</span>
          </div>
          
          {usr && (
            <div className="absolute top-[calc(100%+8px)] right-0 bg-[#0d0d18]/95 border border-white/10 rounded-xl p-1.5 min-w-[155px] z-[100] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <Link href="/dashboard/profile" className="flex items-center gap-2 p-2.5 rounded-lg cursor-pointer text-[13px] text-slate-400/65 hover:bg-purple-600/10 transition-colors">
                <User size={13} />Profile
              </Link>
              <Link href="/dashboard/server" className="flex items-center gap-2 p-2.5 rounded-lg cursor-pointer text-[13px] text-slate-400/65 hover:bg-purple-600/10 transition-colors">
                <Settings size={13} />Settings
              </Link>
              <div className="h-[1px] bg-white/5 my-1" />
              <div onClick={logout} className="flex items-center gap-2 p-2.5 rounded-lg cursor-pointer text-[13px] text-red-400 hover:bg-red-500/10 transition-colors">
                <LogOut size={13} />Sign Out
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden bg-transparent border-none text-slate-400/60 p-1.5 rounded-md flex items-center justify-center hover:bg-purple-600/15 hover:text-purple-400 transition-all">
          <Menu size={18} />
        </button>

      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenu && (
        <div className="md:hidden bg-[#0a0a14] border-b border-white/5 px-4 py-3 space-y-2">
          {pathname !== '/dashboard' && (
            <Link href="/dashboard" className="flex items-center gap-2 text-slate-300 py-2 px-3 rounded-lg hover:bg-white/5">
              <Home size={16} /> Hub
            </Link>
          )}
          <button className="w-full flex items-center gap-2 text-slate-300 py-2 px-3 rounded-lg hover:bg-white/5 text-left">
            <ExternalLink size={16} /> View Website
          </button>
          <div className="flex items-center gap-2 text-slate-300 py-2 px-3 rounded-lg hover:bg-white/5">
            <ThemeToggle /> <span className="text-sm">Toggle Theme</span>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-2 text-red-400 py-2 px-3 rounded-lg hover:bg-red-500/10 text-left">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
