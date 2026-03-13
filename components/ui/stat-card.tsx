import React from 'react';
import { Card, CardContent } from './card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
}

export function StatCard({ title, value, icon: Icon, trend, trendDirection }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{title}</p>
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">{value}</h3>
            {trend && (
              <p className={`text-sm mt-2 ${
                trendDirection === 'up' ? 'text-emerald-600 dark:text-emerald-400' :
                trendDirection === 'down' ? 'text-red-600 dark:text-red-400' :
                'text-gray-500 dark:text-gray-400'
              }`}>
                {trend}
              </p>
            )}
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl">
            <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
