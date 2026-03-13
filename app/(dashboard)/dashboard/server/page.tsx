'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ApiActivityChart } from '@/components/server/api-activity-chart';
import { DatabaseQueryChart } from '@/components/server/database-query-chart';
import { SystemHealthSidebar } from '@/components/server/system-health-sidebar';
import { Database, Activity, Key, Zap, ChevronRight } from 'lucide-react';

const apiActivityData = [
  { time: '00', value: 10 },
  { time: '10', value: 30 },
  { time: '20', value: 50 },
  { time: '30', value: 150 },
  { time: '40', value: 250 },
  { time: '50', value: 180 },
  { time: '60', value: 300 },
  { time: '70', value: 450 },
  { time: '80', value: 380 },
  { time: '90', value: 500 },
  { time: '100', value: 550 },
];

const dbQueryData = [
  { time: '00', db: 10, op: 20, sum: 30 },
  { time: '10', db: 40, op: 10, sum: 50 },
  { time: '20', db: 20, op: 30, sum: 50 },
  { time: '30', db: 60, op: 20, sum: 80 },
  { time: '40', db: 30, op: 40, sum: 70 },
  { time: '50', db: 50, op: 10, sum: 60 },
  { time: '60', db: 20, op: 50, sum: 70 },
  { time: '70', db: 40, op: 30, sum: 70 },
  { time: '80', db: 10, op: 20, sum: 30 },
  { time: '90', db: 30, op: 10, sum: 40 },
  { time: '100', db: 20, op: 40, sum: 60 },
];

function StatCard({ title, value, icon: Icon, trend, trendDirection }: any) {
  return (
    <div className="bg-[#161628]/92 border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">{title}</p>
          <h3 className="text-3xl font-bold text-slate-200 tracking-tight">{value}</h3>
          {trend && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`text-[12px] font-medium ${
                trendDirection === 'up' ? 'text-emerald-400' :
                trendDirection === 'down' ? 'text-red-400' :
                'text-slate-400'
              }`}>
                {trend}
              </span>
              <span className="text-[11px] text-slate-400/40">vs last week</span>
            </div>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
      </div>
    </div>
  );
}

export default function ServerActivityPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-[1080px]">
      <div className="flex items-center gap-1.5 text-[12px] text-slate-400/40 mb-[18px]">
        <span>Admin</span>
        <ChevronRight size={11} />
        <span className="text-slate-200/60">Server Activity</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-[20px]">
        <div>
          <h1 className="font-[family-name:--font-syne] text-[24px] font-extrabold text-[#e2e8f0] tracking-[-0.02em]">Server Activity</h1>
          <p className="text-[13px] text-slate-400/45 mt-[3px]">Backend health and performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="API Requests" value="5,385" icon={Activity} trend="+12%" trendDirection="up" />
            <StatCard title="Database Queries" value="2,249" icon={Database} trend="-5%" trendDirection="down" />
            <StatCard title="Auth Logins" value="4,960" icon={Key} trend="+8%" trendDirection="up" />
            <StatCard title="Edge Functions" value="780" icon={Zap} trend="+15%" trendDirection="up" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* API Activity */}
            <ApiActivityChart data={apiActivityData} />

            {/* Database Query Distribution */}
            <DatabaseQueryChart data={dbQueryData} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <SystemHealthSidebar />
        </div>
      </div>
    </div>
  );
}


