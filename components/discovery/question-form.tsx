import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from './question-list';

interface QuestionFormProps {
  question: Partial<QuizQuestion>;
  onChange: (question: Partial<QuizQuestion>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function QuestionForm({ question, onChange, onSave, onCancel }: QuestionFormProps) {
  const addOption = () => {
    onChange({
      ...question,
      options: [...(question.options || []), '']
    });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(question.options || [])];
    newOptions[index] = value;
    onChange({ ...question, options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = [...(question.options || [])];
    newOptions.splice(index, 1);
    onChange({ ...question, options: newOptions });
  };

  return (
    <div className="space-y-6">
      <Input
        label="Question Text *"
        value={question.question || ''}
        onChange={(e) => onChange({ ...question, question: e.target.value })}
        placeholder="e.g., What is your primary design style?"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Question Type</label>
          <select
            value={question.type || 'single'}
            onChange={(e) => onChange({ ...question, type: e.target.value as QuizQuestion['type'] })}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition-all"
          >
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
            <option value="text">Text Input</option>
          </select>
        </div>
        <Input
          label="Display Order"
          type="number"
          value={question.order || 1}
          onChange={(e) => onChange({ ...question, order: Number(e.target.value) })}
          min="1"
        />
        <div className="space-y-2 flex flex-col justify-center">
          <label className="flex items-center gap-3 cursor-pointer mt-6">
            <input
              type="checkbox"
              checked={question.isActive ?? true}
              onChange={(e) => onChange({ ...question, isActive: e.target.checked })}
              className="w-5 h-5 text-purple-600 bg-gray-50 dark:bg-white/5 border-gray-300 dark:border-white/10 rounded focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active (Visible to clients)</span>
          </label>
        </div>
      </div>

      {question.type !== 'text' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Answer Options *</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={addOption}
              className="text-purple-600 dark:text-purple-400"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Option
            </Button>
          </div>

          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex-1">
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(index)}
                  className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            {(!question.options || question.options.length === 0) && (
              <div className="text-center py-6 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl text-gray-500 dark:text-gray-400 text-sm">
                No options added. Click &quot;+ Add Option&quot; to create choices.
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-white/10">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          Save Question
        </Button>
      </div>
    </div>
  );
}
