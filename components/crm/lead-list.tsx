import React from 'react';
import { Edit2, Trash2, Building, Mail, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'proposal' | 'won' | 'lost';
  value: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface LeadListProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Lead['status']) => void;
}

export function LeadList({ leads, onEdit, onDelete, onStatusChange }: LeadListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Info</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Added</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-white/10">
          {leads.length > 0 ? (
            leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-600 dark:text-purple-400 font-bold">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{lead.name}</div>
                      {lead.company && (
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <Building className="w-3 h-3 mr-1" /> {lead.company}
                        </div>
                      )}
                      {lead.email && (
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <Mail className="w-3 h-3 mr-1" /> {lead.email}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={lead.status}
                    onChange={(e) => onStatusChange(lead.id, e.target.value as Lead['status'])}
                    className={`text-xs font-medium rounded-full px-2.5 py-1 border-none outline-none cursor-pointer ${
                      lead.status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400' :
                      lead.status === 'contacted' ? 'bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-400' :
                      lead.status === 'proposal' ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400' :
                      lead.status === 'won' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400' :
                      'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="proposal">Proposal</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center font-medium text-gray-900 dark:text-white">
                    <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                    {lead.value.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 opacity-50" />
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(lead)}
                      className="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(lead.id)}
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
                No leads found. Add a new lead to start tracking.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
