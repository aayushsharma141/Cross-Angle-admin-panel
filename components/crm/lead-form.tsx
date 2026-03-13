import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lead } from './lead-list';

interface LeadFormProps {
  lead: Partial<Lead>;
  onChange: (lead: Partial<Lead>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function LeadForm({ lead, onChange, onSave, onCancel }: LeadFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Contact Name *"
          value={lead.name || ''}
          onChange={(e) => onChange({ ...lead, name: e.target.value })}
          placeholder="John Doe"
        />
        <Input
          label="Company"
          value={lead.company || ''}
          onChange={(e) => onChange({ ...lead, company: e.target.value })}
          placeholder="Acme Corp"
        />
        <Input
          label="Email Address"
          type="email"
          value={lead.email || ''}
          onChange={(e) => onChange({ ...lead, email: e.target.value })}
          placeholder="john@example.com"
        />
        <Input
          label="Phone Number"
          type="tel"
          value={lead.phone || ''}
          onChange={(e) => onChange({ ...lead, phone: e.target.value })}
          placeholder="+1 (555) 000-0000"
        />
        <Input
          label="Estimated Value ($)"
          type="number"
          value={lead.value || 0}
          onChange={(e) => onChange({ ...lead, value: Number(e.target.value) })}
          placeholder="5000"
          min="0"
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pipeline Status *</label>
          <select
            value={lead.status || 'new'}
            onChange={(e) => onChange({ ...lead, status: e.target.value as Lead['status'] })}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition-all"
          >
            <option value="new">New Lead</option>
            <option value="contacted">Contacted</option>
            <option value="proposal">Proposal Sent</option>
            <option value="won">Closed Won</option>
            <option value="lost">Closed Lost</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
        <textarea
          value={lead.notes || ''}
          onChange={(e) => onChange({ ...lead, notes: e.target.value })}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition-all resize-y min-h-[120px]"
          placeholder="Add any relevant notes, requirements, or history here..."
        />
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-white/10">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          Save Lead
        </Button>
      </div>
    </div>
  );
}
