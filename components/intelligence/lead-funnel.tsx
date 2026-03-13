import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export function LeadFunnel() {
  return (
    <Card className="flex flex-col items-center">
      <CardHeader className="w-full">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors">Lead Funnel</h3>
      </CardHeader>
      <CardContent className="flex-1 w-full flex flex-col items-center justify-center space-y-2">
        <div className="w-full bg-purple-500/20 border border-purple-500/30 rounded-t-xl h-12 flex items-center justify-center relative">
          <span className="text-sm font-medium">100%</span>
          <span className="absolute left-2 text-xs text-gray-400">75%</span>
          <span className="absolute right-2 text-xs text-gray-400">55%</span>
        </div>
        <div className="w-4/5 bg-purple-500/40 border border-purple-500/50 h-12 flex items-center justify-center relative">
          <span className="text-sm font-medium">75%</span>
          <span className="absolute left-2 text-xs text-gray-400">43%</span>
          <span className="absolute right-2 text-xs text-gray-400">28%</span>
        </div>
        <div className="w-3/5 bg-purple-500/60 border border-purple-500/70 h-12 flex items-center justify-center">
          <span className="text-sm font-medium">26%</span>
        </div>
        <div className="w-2/5 bg-purple-500/80 border border-purple-500/90 rounded-b-xl h-12 flex items-center justify-center">
          <span className="text-sm font-medium">12%</span>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center w-full">Conversion rates overview</p>
      </CardContent>
    </Card>
  );
}
