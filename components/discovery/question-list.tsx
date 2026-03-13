import React from 'react';
import { Edit2, Trash2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'text';
  options: string[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface QuestionListProps {
  questions: QuizQuestion[];
  onEdit: (question: QuizQuestion) => void;
  onDelete: (id: string) => void;
}

export function QuestionList({ questions, onEdit, onDelete }: QuestionListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">Order</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Question</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-white/10">
          {questions.length > 0 ? (
            questions.map((q) => (
              <tr key={q.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    {q.order}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{q.question}</div>
                      {q.type !== 'text' && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {q.options?.length || 0} options available
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="default" className="capitalize">
                    {q.type}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={q.isActive ? 'success' : 'default'}>
                    {q.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(q)}
                      className="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(q.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                No questions found. Create your first quiz question to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
