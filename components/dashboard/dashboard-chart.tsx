'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 4000 },
  { name: 'Sep', value: 4500 },
  { name: 'Oct', value: 5000 },
  { name: 'Nov', value: 5500 },
  { name: 'Dec', value: 6000 },
];

export function DashboardChart() {
  return (
    <div className="bg-[#161628]/92 border border-white/10 rounded-2xl p-6 mb-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#e2e8f0]">Revenue Trends</h3>
        <p className="text-[13px] text-slate-400/50 mt-1">Monthly revenue overview for the current year</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#ffffff50" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#ffffff50" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #ffffff10', borderRadius: '8px', color: '#e2e8f0' }}
              itemStyle={{ color: '#e2e8f0' }}
              formatter={(value: any) => [`$${value}`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#8b5cf6" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
