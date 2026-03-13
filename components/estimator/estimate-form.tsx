import React from 'react';
import { Plus, Trash2, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Estimate, EstimateItem } from './estimate-list';

interface EstimateFormProps {
  estimate: Partial<Estimate>;
  onChange: (estimate: Partial<Estimate>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function EstimateForm({ estimate, onChange, onSave, onCancel }: EstimateFormProps) {
  const addItem = () => {
    onChange({
      ...estimate,
      items: [...(estimate.items || []), { description: '', quantity: 1, price: 0 }]
    });
  };

  const updateItem = (index: number, field: keyof EstimateItem, value: string | number) => {
    const newItems = [...(estimate.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Recalculate total
    const newTotal = newItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    onChange({ ...estimate, items: newItems, totalAmount: newTotal });
  };

  const removeItem = (index: number) => {
    const newItems = [...(estimate.items || [])];
    newItems.splice(index, 1);
    
    // Recalculate total
    const newTotal = newItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    onChange({ ...estimate, items: newItems, totalAmount: newTotal });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Client Name *"
          value={estimate.clientName || ''}
          onChange={(e) => onChange({ ...estimate, clientName: e.target.value })}
          placeholder="e.g., Acme Corp"
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select
            value={estimate.status || 'draft'}
            onChange={(e) => onChange({ ...estimate, status: e.target.value as Estimate['status'] })}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition-all"
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Line Items</label>
          <Button
            variant="ghost"
            size="sm"
            onClick={addItem}
            className="text-purple-600 dark:text-purple-400"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Item
          </Button>
        </div>

        <div className="space-y-3">
          {estimate.items?.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <div className="flex-1 w-full">
                <Input
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  placeholder="Item description"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <div className="w-24">
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                    min="1"
                    placeholder="Qty"
                  />
                </div>
                <div className="w-32">
                  <Input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                    min="0"
                    placeholder="Price"
                    icon={<DollarSign className="w-4 h-4" />}
                  />
                </div>
                <div className="w-32 flex items-center justify-end font-medium text-gray-900 dark:text-white px-4">
                  ${(item.quantity * item.price).toLocaleString()}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {(!estimate.items || estimate.items.length === 0) && (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl text-gray-500 dark:text-gray-400 text-sm">
              No items added. Click &quot;+ Add Item&quot; to build your estimate.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end items-center gap-6 pt-6 border-t border-gray-200 dark:border-white/10">
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Amount</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ${(estimate.totalAmount || 0).toLocaleString()}
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Estimate
          </Button>
        </div>
      </div>
    </div>
  );
}
