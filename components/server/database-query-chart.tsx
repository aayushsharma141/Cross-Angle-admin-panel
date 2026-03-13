import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DbQueryData {
  time: string;
  db: number;
  op: number;
  sum: number;
}

interface DatabaseQueryChartProps {
  data: DbQueryData[];
}

export function DatabaseQueryChart({ data }: DatabaseQueryChartProps) {
  return (
    <div className="bg-[#161628]/92 border border-white/10 rounded-2xl p-6">
      <div className="flex flex-row items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#e2e8f0]">Database Query Distribution</h3>
        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] text-slate-200 outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer">
          <option className="bg-[#1a1a2e]">Supabase</option>
          <option className="bg-[#1a1a2e]">Postgres</option>
        </select>
      </div>
      <div>
        <div className="flex items-center space-x-4 mb-4 text-[11px] font-semibold tracking-[0.03em] uppercase text-slate-400/60">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Database</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>Oppire</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Summage</span>
          </div>
        </div>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="time" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: '#ffffff05'}}
                contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #ffffff10', borderRadius: '8px', color: '#e2e8f0' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="db" stackId="a" fill="#8b5cf6" radius={[0, 0, 4, 4]} />
              <Bar dataKey="op" stackId="a" fill="#6366f1" />
              <Bar dataKey="sum" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
