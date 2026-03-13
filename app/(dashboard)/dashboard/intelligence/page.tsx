'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectPipeline } from '@/components/intelligence/project-pipeline';
import { LeadFunnel } from '@/components/intelligence/lead-funnel';
import { RecentActivity } from '@/components/intelligence/recent-activity';
import { Download, Calendar, Mail, Plus, CheckSquare, Image as ImageIcon, ChevronRight, Briefcase, Users, FileText, TrendingUp, RotateCcw, BarChart2, User, Star } from 'lucide-react';
import { ProjectPipelineChart } from '@/components/intelligence/project-pipeline-chart';
import { WebsiteActivityChart } from '@/components/intelligence/website-activity-chart';

export default function IntelligenceHubPage() {
  const [tab, setTab] = useState('website');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-[1080px]">
      <div className="flex items-center gap-1.5 text-[12px] text-slate-400/40 mb-[18px]">
        <span>Admin</span>
        <ChevronRight size={11} />
        <span className="text-slate-200/60">Intelligence Hub</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-[18px]">
        <div>
          <h1 className="font-[family-name:--font-syne] text-[24px] font-extrabold text-[#e2e8f0] tracking-[-0.02em]">Intelligence Hub</h1>
          <p className="text-[13px] text-slate-400/45 mt-[3px]">Real-time business performance overview</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="bg-transparent text-slate-400/70 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] font-medium hover:bg-white/5 hover:text-slate-200 hover:border-white/20 transition-all flex items-center gap-1.5">
            <Calendar size={12} />Last 30 Days
          </button>
          <button className="bg-transparent text-slate-400/70 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] font-medium hover:bg-white/5 hover:text-slate-200 hover:border-white/20 transition-all flex items-center gap-1.5">
            <RotateCcw size={11} />Export
          </button>
          <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] text-slate-400/45 flex items-center gap-1.5">
            <Mail size={11} />Cost Dmage
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-[3px] bg-white/5 border border-white/10 rounded-[10px] p-1 w-full sm:w-fit mb-[18px] overflow-x-auto">
        {[["website","Website Activity"],["websiteB","Websit Activity"],["products","Product Insights"],["business","Business Overview"]].map(([id, lbl]) => (
          <div 
            key={id} 
            className={`px-[15px] py-[7px] rounded-[7px] font-medium text-[12px] cursor-pointer transition-all border border-transparent whitespace-nowrap ${tab === id ? 'bg-purple-600/20 text-purple-400 border-purple-500/30' : 'text-slate-400/55 hover:text-slate-200'}`}
            onClick={() => setTab(id)}
          >
            {lbl}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-[13px]">
        <div className="flex-1">
          {/* KPI row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[11px] mb-[18px]">
            {[["Portfolio Projects","26","26","#7c3aed"],["Total Leads","8,033","18","#0891b2"],["Estimate Enquiries","8,183","18","#059669"],["Product Insights","$7,400","26","#d97706"],["Prostem Insights","1,406","35","#be185d"]].map(([l, v, c, col]) => (
              <div key={l} className="bg-[#121224]/90 border border-white/10 rounded-[13px] p-[18px] relative overflow-hidden cursor-pointer hover:border-purple-500/30 transition-colors group">
                <div className="absolute -top-[25px] -right-[25px] w-[70px] h-[70px] rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors" />
                <div className="text-[11px] text-slate-400/45 mb-[7px]">{l}</div>
                <div className="font-[family-name:--font-syne] text-[22px] font-extrabold text-[#e2e8f0]">{v}</div>
                <div className="text-[12px] text-emerald-400 mt-[3px]">↑{c}%</div>
                <div className="absolute bottom-2.5 right-2.5 w-[22px] h-[22px] rounded-md flex items-center justify-center" style={{ backgroundColor: `${col}20` }}>
                  <BarChart2 size={11} color={col} />
                </div>
              </div>
            ))}
          </div>

          <WebsiteActivityChart />

          {/* 3-column chart row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[13px]">
            {/* Project Pipeline */}
            <ProjectPipelineChart />

            {/* Lead Funnel */}
            <div className="bg-[#161628]/90 border border-white/10 rounded-[13px] p-[18px] hover:border-purple-500/20 transition-colors">
              <div className="text-[13px] font-bold text-[#e2e8f0] mb-[12px]">Lead Funnel</div>
              <div className="flex justify-center">
                <svg width="155" height="115" viewBox="0 0 155 115">
                  <path d="M8,8 L147,8 L117,38 L38,38 Z" fill="rgba(124,58,237,.38)" />
                  <path d="M38,40 L117,40 L102,62 L53,62 Z" fill="rgba(124,58,237,.52)" />
                  <path d="M53,64 L102,64 L92,84 L63,84 Z" fill="rgba(124,58,237,.66)" />
                  <path d="M63,86 L92,86 L85,102 L70,102 Z" fill="rgba(124,58,237,.8)" />
                  <text x="78" y="28" textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize="9.5">100%</text>
                  <text x="78" y="54" textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize="9.5">75%</text>
                  <text x="78" y="76" textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize="9.5">46%</text>
                  <text x="78" y="97" textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize="9.5">36%</text>
                  <text x="150" y="23" textAnchor="end" fill="rgba(148,163,184,.45)" fontSize="8.5">55%</text>
                  <text x="150" y="54" textAnchor="end" fill="rgba(148,163,184,.45)" fontSize="8.5">28%</text>
                </svg>
              </div>
              <div className="text-[10.5px] text-slate-400/40 text-center mt-1">Conversion rates overview</div>
              <div className="flex flex-wrap gap-2.5 justify-center mt-[7px]">
                {[["#7c3aed","Project Lead"],["#a78bfa","Lead Cmlatss"],["#be185d","Sesial Medit"],["#6d28d9","Referral"]].map(([c, l]) => (
                  <div key={l} className="flex items-center gap-[3px] text-[9.5px] text-slate-400/40">
                    <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: c }} />{l}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#161628]/90 border border-white/10 rounded-[13px] p-[18px] hover:border-purple-500/20 transition-colors">
              <div className="text-[13px] font-bold text-[#e2e8f0] mb-[12px]">Recent Activity</div>
              <div className="flex items-center gap-3 mb-3">
                <svg width="66" height="66" viewBox="0 0 66 66" className="shrink-0">
                  <circle cx="33" cy="33" r="26" fill="none" stroke="rgba(124,58,237,.14)" strokeWidth="9" />
                  <circle cx="33" cy="33" r="26" fill="none" stroke="#7c3aed" strokeWidth="9" strokeDasharray="98 65" strokeDashoffset="0" transform="rotate(-90 33 33)" />
                  <circle cx="33" cy="33" r="26" fill="none" stroke="#a78bfa" strokeWidth="9" strokeDasharray="45 118" strokeDashoffset="-98" transform="rotate(-90 33 33)" />
                </svg>
                <div>
                  <div className="flex items-center gap-[5px] mb-1.5"><div className="w-[7px] h-[7px] rounded-full bg-purple-400 shadow-[0_0_6px_#a78bfa]" /><span className="text-[11px] text-slate-400/50">Lead Contlacted</span></div>
                  <div className="flex items-center gap-[5px]"><div className="w-[7px] h-[7px] rounded-full bg-purple-400" /><span className="text-[11px] text-slate-400/50">Social Won</span></div>
                </div>
              </div>
              <div className="h-[1px] bg-white/5 my-2.5" />
              {[{ n: "User Sharma contacted…", t: "13 hrons ago" }, { n: "Aayer Sharma succ….", t: "13 hours ago" }].map((a, i) => (
                <div key={i} className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-[7px]">
                    <div className="w-[23px] h-[23px] rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] text-purple-400 font-bold">U</div>
                    <div><div className="text-[12px] text-[#e2e8f0]">{a.n}</div><div className="text-[10px] text-slate-400/40">{a.t}</div></div>
                  </div>
                  <div className="w-[19px] h-[19px] rounded-full bg-purple-500/20 flex items-center justify-center"><ChevronRight size={9} className="text-purple-400" /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions panel */}
        <div className="w-full lg:w-[210px] shrink-0 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-[18px] lg:pl-[14px]">
          <div className="font-[family-name:--font-syne] text-[13px] font-bold text-[#e2e8f0] mb-[13px]">Quick Actions</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 mb-[7px]">
            {[{ icon: Plus, label: "+ New Project" }, { icon: CheckSquare, label: "+ Testimonials" }, { icon: ImageIcon, label: "Media" }].map(a => (
              <button key={a.label} className="w-full flex items-center justify-center lg:justify-start gap-1.5 bg-transparent text-slate-400/70 border border-white/10 rounded-lg px-[11px] py-[9px] text-[12px] font-medium hover:bg-white/5 hover:text-slate-200 hover:border-white/20 transition-all">
                <a.icon size={12} />{a.label}
              </button>
            ))}
          </div>
          <div className="h-[1px] bg-white/5 my-[15px]" />
          <div className="font-[family-name:--font-syne] text-[13px] font-bold text-[#e2e8f0] mb-[13px]">Conversion Snapshot</div>
          <div className="text-[12px] text-slate-400/45 mb-2">Lead Conversion</div>
          <div className="flex justify-between mb-3">
            <div><div className="text-[9.5px] text-slate-400/40">Avg Estimate</div><div className="text-[13px] font-bold text-[#e2e8f0]">$30 /ratio</div></div>
            <div><div className="text-[9.5px] text-slate-400/40">Avg Rating</div><div className="flex gap-[1px]">{[1,2,3,4,5].map(s => <Star key={s} size={11} fill={s > 2 ? "#fbbf24" : "none"} color={s > 2 ? "#fbbf24" : "rgba(148,163,184,.28)"} />)}</div></div>
          </div>
          <div className="h-[1px] bg-white/5 my-2.5" />
          {[["Database Healthy","bg-emerald-400 shadow-[0_0_6px_#4ade80]"],["API Operational","bg-emerald-400 shadow-[0_0_6px_#4ade80]"]].map(([l, d]) => (
            <div key={l} className="flex items-center gap-2 mb-2 text-[12px] text-slate-400/55">
              <div className={`w-[7px] h-[7px] rounded-full ${d}`} />{l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
