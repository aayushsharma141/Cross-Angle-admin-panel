import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface ActivityData {
  name: string;
  value: number;
  color: string;
}

interface RecentActivityProps {
  data: ActivityData[];
}

export function RecentActivity({ data }: RecentActivityProps) {
  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors">Recent Activity</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 text-xs mt-4">
              {data.map((entry, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-gray-400">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-sm font-medium text-purple-400">US</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">User Sharma contacted...</p>
                <p className="text-xs text-gray-500">19 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                <span className="text-sm font-medium text-pink-400">AS</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Aayus Sharma succe...</p>
                <p className="text-xs text-gray-500">13 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
