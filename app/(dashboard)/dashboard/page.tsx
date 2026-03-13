'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { BarChart3, FileText, Users, Lightbulb, Calculator, Settings, Activity, CheckCircle2, DollarSign, Zap, ChevronRight } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import { DashboardChart } from '@/components/dashboard/dashboard-chart';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const modules = [
  {
    title: 'Main Dashboard',
    description: 'View key metrics, recent activity and business overview',
    icon: BarChart3,
    href: '/dashboard/intelligence',
    color: '#7c3aed',
  },
  {
    title: 'CMS',
    description: 'Create, edit and publish webpages, blogs, and portfolio items',
    icon: FileText,
    href: '/dashboard/cms',
    color: '#0891b2',
  },
  {
    title: 'CRM',
    description: 'Track incoming leads and manage client pipelines',
    icon: Users,
    href: '/dashboard/crm',
    color: '#059669',
  },
  {
    title: 'Discovery Engine',
    description: 'Configure style quiz logic and discover user insights',
    icon: Zap,
    href: '/dashboard/discovery',
    color: '#d97706',
  },
  {
    title: 'Estimator Engine',
    description: 'Generate project estimates and automate quotation workflows',
    icon: DollarSign,
    href: '/dashboard/estimator',
    color: '#be185d',
  },
  {
    title: 'System Settings',
    description: 'Manage security settings, logs and system configuration',
    icon: Settings,
    href: '/dashboard/server',
    color: '#4f46e5',
    hi: true,
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-[1080px]">
      <div className="flex items-center gap-1.5 text-[12px] text-slate-400/40 mb-[18px]">
        <span>Admin</span>
        <ChevronRight size={11} />
        <span className="text-slate-200/60">Dashboard</span>
      </div>

      <div className="mb-7">
        <h1 className="font-[family-name:--font-syne] text-[26px] font-extrabold text-[#e2e8f0] tracking-[-0.02em]">Welcome back, {user?.displayName || 'Admin'}</h1>
        <p className="text-[13px] text-slate-400/50 mt-1.5">Select a module to continue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[13px] mb-6">
        {modules.map((module, index) => (
          <Link href={module.href} key={module.title}>
            <div 
              className={`bg-[#161628]/90 border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-250 relative overflow-hidden hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(124,58,237,0.18)] hover:border-purple-500/40 ${module.hi ? 'border-purple-500/50 bg-purple-600/10' : ''}`}
            >
              <div 
                className="w-[37px] h-[37px] rounded-[10px] flex items-center justify-center mb-[13px]"
                style={{ backgroundColor: `${module.color}1e`, border: `1px solid ${module.color}3a` }}
              >
                <module.icon size={17} color={module.color} />
              </div>
              <h2 className="font-[family-name:--font-syne] text-[14px] font-bold text-[#e2e8f0] mb-1.5">{module.title}</h2>
              <p className="text-[11.5px] text-slate-400/50 leading-[1.6]">
                {module.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <DashboardChart />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[13px]">
        {/* Recent Activity */}
        <div className="bg-[#121220]/85 border border-white/10 rounded-[13px] p-[18px] hover:border-purple-500/20 transition-colors">
          <h3 className="font-[family-name:--font-syne] text-[13px] font-bold text-[#e2e8f0] mb-[13px]">Recent Activity</h3>
          <div className="space-y-[7px]">
            {["New blog post published", "Portfolio update", "Estimate request submitted", "Discovery engine completion"].map((a, i) => (
              <div key={i} className="flex items-start gap-[7px] text-[13px] text-slate-400/55">
                <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Lead Notifications */}
        <div className="bg-[#121220]/85 border border-white/10 rounded-[13px] p-[18px] hover:border-purple-500/20 transition-colors">
          <h3 className="font-[family-name:--font-syne] text-[13px] font-bold text-[#e2e8f0] mb-[13px]">Lead Notifications</h3>
          <div className="flex flex-wrap gap-[7px]">
            <span className="inline-flex items-center px-[9px] py-[2px] rounded-full text-[11px] font-semibold tracking-[0.03em] bg-blue-500/15 text-blue-400">New Lead</span>
            <span className="inline-flex items-center px-[9px] py-[2px] rounded-full text-[11px] font-semibold tracking-[0.03em] bg-purple-500/20 text-purple-400">Contacted</span>
            <span className="inline-flex items-center px-[9px] py-[2px] rounded-full text-[11px] font-semibold tracking-[0.03em] bg-amber-500/15 text-amber-400">Proposal Sent</span>
          </div>
          <div className="mt-[14px] text-[12px] text-slate-400/40">6 new leads this week</div>
        </div>

        {/* System Health */}
        <div className="bg-[#121220]/85 border border-white/10 rounded-[13px] p-[18px] hover:border-purple-500/20 transition-colors">
          <h3 className="font-[family-name:--font-syne] text-[13px] font-bold text-[#e2e8f0] mb-[13px]">System Health</h3>
          <div className="space-y-[7px]">
            {[["Server Status", "Operational"], ["CMS Publishing", "Healthy"], ["API Response", "200ms"], ["Database Activity", "Normal"]].map(([l, s]) => (
              <div key={l} className="flex justify-between items-center text-[12px]">
                <span className="text-slate-400/50">{l}</span>
                <span className="text-emerald-400 flex items-center gap-[5px]">
                  <div className="w-[7px] h-[7px] rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-slate-400/30 border-t border-white/5 pt-[14px]">
        <span>CrossAngle Intelligence — v2.1.4</span>
        <div className="flex flex-wrap justify-center gap-[18px]">
          {["Documentation", "System Status", "Support"].map(l => (
            <span key={l} className="cursor-pointer hover:text-slate-400 transition-colors">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
