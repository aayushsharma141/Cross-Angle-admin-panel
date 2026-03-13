'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', visitors: 120, pageviews: 240 },
  { time: '04:00', visitors: 80, pageviews: 150 },
  { time: '08:00', visitors: 450, pageviews: 900 },
  { time: '12:00', visitors: 800, pageviews: 1800 },
  { time: '16:00', visitors: 950, pageviews: 2100 },
  { time: '20:00', visitors: 600, pageviews: 1300 },
  { time: '24:00', visitors: 200, pageviews: 400 },
];

export function WebsiteActivityChart() {
  return (
    <div className="bg-[#161628]/90 border border-white/10 rounded-[13px] p-[18px] hover:border-purple-500/20 transition-colors mb-[18px]">
      <div className="flex flex-row items-center justify-between mb-[14px]">
        <h3 className="text-[13px] font-bold text-[#e2e8f0]">Website Activity</h3>
        <div className="flex items-center gap-4 text-[11px] font-medium">
          <div className="flex items-center gap-1.5 text-slate-400/60">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            Visitors
          </div>
          <div className="flex items-center gap-1.5 text-slate-400/60">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Pageviews
          </div>
        </div>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#ffffff50" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#ffffff50" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #ffffff10', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Area 
              type="monotone" 
              dataKey="pageviews" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorPageviews)" 
            />
            <Area 
              type="monotone" 
              dataKey="visitors" 
              stroke="#8b5cf6" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorVisitors)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
