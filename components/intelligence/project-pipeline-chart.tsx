'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Project', value: 44, color: 'rgba(124,58,237,0.3)' },
  { name: 'Stage 1', value: 96, color: 'rgba(124,58,237,0.42)' },
  { name: 'Stage 2', value: 76, color: 'rgba(124,58,237,0.54)' },
  { name: 'API', value: 92, color: '#7c3aed' },
];

export function ProjectPipelineChart() {
  return (
    <div className="bg-[#161628]/90 border border-white/10 rounded-[13px] p-[18px] hover:border-purple-500/20 transition-colors h-full flex flex-col">
      <div className="text-[13px] font-bold text-[#e2e8f0] mb-[14px]">Project Pipeline</div>
      <div className="flex-1 min-h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#ffffff50" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              dy={5}
            />
            <YAxis 
              stroke="#ffffff50" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              cursor={{ fill: '#ffffff05' }}
              contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #ffffff10', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }}
              itemStyle={{ color: '#e2e8f0' }}
              formatter={(value: any) => [`${value}%`, 'Completion']}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
