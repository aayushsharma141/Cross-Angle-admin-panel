import React from 'react';
import { MoreHorizontal, Database, Activity, ChevronRight } from 'lucide-react';

export function SystemHealthSidebar() {
  return (
    <div className="bg-[#161628]/92 border border-white/10 rounded-2xl p-6">
      <div className="flex flex-row items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#e2e8f0]">System Health</h3>
        <button className="text-slate-400/50 hover:text-slate-200 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Database Status */}
        <div>
          <p className="text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-2">Database status</p>
          <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Database className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-[13px] font-medium text-slate-200">Vercel</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400/50 group-hover:text-slate-300 transition-colors" />
          </div>
        </div>

        {/* API Status */}
        <div>
          <p className="text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-2">API status</p>
          <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-[13px] font-medium text-slate-200">Auth service</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400/50 group-hover:text-slate-300 transition-colors" />
          </div>
        </div>

        {/* Edge Functions */}
        <div>
          <p className="text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-2">Edge functions</p>
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  className="text-white/10"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-emerald-400"
                  strokeDasharray="75, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[13px] font-semibold text-slate-200">490</span>
              </div>
            </div>
            <div className="flex-1">
              <span className="text-[13px] text-slate-300">Wripe Uaas</span>
            </div>
          </div>
        </div>

        {/* Storage Usage */}
        <div>
          <p className="text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-2">Storage Usage</p>
          <div className="space-y-3">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 w-3/4" />
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
