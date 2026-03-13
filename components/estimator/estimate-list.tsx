import React from 'react';
import { Edit2, Trash2, FileText, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface EstimateItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Estimate {
  id: string;
  leadId?: string;
  clientName: string;
  totalAmount: number;
  items: EstimateItem[];
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface EstimateListProps {
  estimates: Estimate[];
  onEdit: (estimate: Estimate) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Estimate['status']) => void;
}

export function EstimateList({ estimates, onEdit, onDelete, onStatusChange }: EstimateListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client / Estimate</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-white/10">
          {estimates.length > 0 ? (
            estimates.map((est) => (
              <tr key={est.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{est.clientName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{est.items?.length || 0} items</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={est.status}
                    onChange={(e) => onStatusChange(est.id, e.target.value as Estimate['status'])}
                    className={`text-xs font-medium rounded-full px-2.5 py-1 border-none outline-none cursor-pointer ${
                      est.status === 'draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-400' :
                      est.status === 'sent' ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400' :
                      est.status === 'accepted' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400' :
                      'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'
                    }`}
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center font-medium text-gray-900 dark:text-white">
                    <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                    {est.totalAmount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 opacity-50" />
                    {new Date(est.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(est)}
                      className="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(est.id)}
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
                No estimates found. Create a new estimate to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
