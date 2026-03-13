import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, Tooltip, Bar } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface PipelineData {
  name: string;
  value: number;
}

interface ProjectPipelineProps {
  data: PipelineData[];
}

export function ProjectPipeline({ data }: ProjectPipelineProps) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors">Project Pipeline</h3>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: '#ffffff05'}}
                contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #ffffff10', borderRadius: '8px' }}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
