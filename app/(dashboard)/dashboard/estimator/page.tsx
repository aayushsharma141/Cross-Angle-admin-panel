'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, FileText, DollarSign, Search, Calendar, Send, CheckCircle, XCircle, Settings, ChevronRight } from 'lucide-react';
import { db, auth } from '@/lib/firebase';
import { collection, onSnapshot, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/lib/firestore-utils';
import { ErrorBoundary } from '@/components/error-boundary';

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

function EstimatorContent() {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEstimate, setCurrentEstimate] = useState<Partial<Estimate>>({ items: [] });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = onSnapshot(
      collection(db, 'estimates'),
      (snapshot) => {
        const fetchedEstimates = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Estimate[];
        setEstimates(fetchedEstimates);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'estimates');
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    try {
      if (!currentEstimate.clientName || !currentEstimate.items || currentEstimate.items.length === 0) {
        alert("Client Name and at least one item are required");
        return;
      }

      const totalAmount = currentEstimate.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

      const estimateData = {
        clientName: currentEstimate.clientName,
        leadId: currentEstimate.leadId || '',
        totalAmount: totalAmount,
        items: currentEstimate.items,
        status: currentEstimate.status || 'draft',
        updatedAt: new Date().toISOString()
      };

      if (currentEstimate.id) {
        await updateDoc(doc(db, 'estimates', currentEstimate.id), estimateData);
      } else {
        await addDoc(collection(db, 'estimates'), {
          ...estimateData,
          createdAt: new Date().toISOString()
        });
      }
      setIsEditing(false);
      setCurrentEstimate({ items: [] });
    } catch (error) {
      handleFirestoreError(error, currentEstimate.id ? OperationType.UPDATE : OperationType.CREATE, 'estimates');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this estimate?')) {
      try {
        await deleteDoc(doc(db, 'estimates', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `estimates/${id}`);
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: Estimate['status']) => {
    try {
      await updateDoc(doc(db, 'estimates', id), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `estimates/${id}`);
    }
  };

  const filteredEstimates = estimates.filter(est => 
    est.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const M: Record<string, [string, string]> = {
      draft: ["bg-slate-500/10 text-slate-400/60", "Draft"],
      sent: ["bg-blue-500/15 text-blue-400", "Sent"],
      accepted: ["bg-emerald-500/15 text-emerald-400", "Accepted"],
      rejected: ["bg-red-500/15 text-red-400", "Rejected"]
    };
    const [c, l] = M[status] || ["bg-slate-500/10 text-slate-400/60", status];
    return <span className={`inline-flex items-center px-[9px] py-[2px] rounded-full text-[11px] font-semibold tracking-[0.03em] ${c}`}>{l}</span>;
  };

  const addItem = () => {
    setCurrentEstimate({
      ...currentEstimate,
      items: [...(currentEstimate.items || []), { description: '', quantity: 1, price: 0 }]
    });
  };

  const updateItem = (index: number, field: keyof EstimateItem, value: string | number) => {
    const newItems = [...(currentEstimate.items || [])];
    newItems[index] = { ...newItems[index], [field]: value as never };
    
    const newTotal = newItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    setCurrentEstimate({ ...currentEstimate, items: newItems, totalAmount: newTotal });
  };

  const removeItem = (index: number) => {
    const newItems = [...(currentEstimate.items || [])];
    newItems.splice(index, 1);
    
    const newTotal = newItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    setCurrentEstimate({ ...currentEstimate, items: newItems, totalAmount: newTotal });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-[1080px]">
      <div className="flex items-center gap-1.5 text-[12px] text-slate-400/40 mb-[18px]">
        <span>Admin</span>
        <ChevronRight size={11} />
        <span className="text-slate-200/60">Estimator Engine</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-[20px]">
        <div>
          <h1 className="font-[family-name:--font-syne] text-[24px] font-extrabold text-[#e2e8f0] tracking-[-0.02em]">Estimator Engine</h1>
          <p className="text-[13px] text-slate-400/45 mt-[3px]">Create, send, and track project quotes and estimates.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentEstimate({ status: 'draft', items: [] });
            setIsEditing(true);
          }}
          className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none rounded-[9px] px-[18px] py-[9px] text-[13px] font-semibold cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all flex items-center gap-1.5"
        >
          <Plus size={13} />New Estimate
        </button>
      </div>

      {isEditing ? (
        <div className="bg-[#161628]/92 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#e2e8f0]">
              {currentEstimate.id ? 'Edit Estimate' : 'Create New Estimate'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="bg-transparent text-slate-400/70 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] font-medium hover:bg-white/5 hover:text-slate-200 hover:border-white/20 transition-all">
              Cancel
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Client Name *</label>
                <input
                  value={currentEstimate.clientName || ''}
                  onChange={(e) => setCurrentEstimate({ ...currentEstimate, clientName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                  placeholder="e.g., Acme Corp"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Status</label>
                <select
                  value={currentEstimate.status || 'draft'}
                  onChange={(e) => setCurrentEstimate({ ...currentEstimate, status: e.target.value as Estimate['status'] })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all appearance-none"
                >
                  <option value="draft" className="bg-[#1a1a2e]">Draft</option>
                  <option value="sent" className="bg-[#1a1a2e]">Sent</option>
                  <option value="accepted" className="bg-[#1a1a2e]">Accepted</option>
                  <option value="rejected" className="bg-[#1a1a2e]">Rejected</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45">Line Items</label>
                <button
                  onClick={addItem}
                  className="text-purple-400 hover:text-purple-300 text-[12px] font-medium flex items-center gap-1 transition-colors"
                >
                  <Plus size={12} /> Add Item
                </button>
              </div>

              <div className="space-y-3">
                {currentEstimate.items?.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <div className="flex-1 w-full">
                      <input
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        placeholder="Item description"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                      />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto items-center">
                      <div className="w-24">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                          min="1"
                          placeholder="Qty"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                        />
                      </div>
                      <div className="w-32 relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400/50" />
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                          min="0"
                          placeholder="Price"
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                        />
                      </div>
                      <div className="w-32 flex items-center justify-end font-medium text-slate-200 px-4 text-[13px]">
                        ${(item.quantity * item.price).toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="p-2 text-slate-400/50 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {(!currentEstimate.items || currentEstimate.items.length === 0) && (
                  <div className="text-center py-8 border-2 border-dashed border-white/10 rounded-xl text-slate-400/50 text-[13px]">
                    No items added. Click &quot;+ Add Item&quot; to build your estimate.
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end items-center gap-6 pt-6 border-t border-white/5">
              <div className="text-right">
                <div className="text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45">Total Amount</div>
                <div className="text-2xl font-bold text-slate-200">
                  ${(currentEstimate.totalAmount || 0).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleSave} className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none rounded-[9px] px-[18px] py-[9px] text-[13px] font-semibold cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all">
                  Save Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#161628]/92 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400/50" />
              <input
                placeholder="Search estimates by client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider">Client / Estimate</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEstimates.length > 0 ? (
                  filteredEstimates.map((est) => (
                    <tr key={est.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-200 text-[13px]">{est.clientName}</div>
                            <div className="text-[11px] text-slate-400/60 mt-0.5">{est.items?.length || 0} items</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={est.status}
                          onChange={(e) => handleStatusChange(est.id, e.target.value as Estimate['status'])}
                          className="bg-transparent border-none outline-none cursor-pointer text-[13px] text-slate-200"
                        >
                          <option value="draft" className="bg-[#1a1a2e]">Draft</option>
                          <option value="sent" className="bg-[#1a1a2e]">Sent</option>
                          <option value="accepted" className="bg-[#1a1a2e]">Accepted</option>
                          <option value="rejected" className="bg-[#1a1a2e]">Rejected</option>
                        </select>
                        <div className="mt-1">
                          <StatusBadge status={est.status} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center font-medium text-slate-200 text-[13px]">
                          <DollarSign className="w-3.5 h-3.5 text-slate-400/50 mr-1" />
                          {est.totalAmount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[12px] text-slate-400/60">
                        <div className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-50" />
                          {new Date(est.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              setCurrentEstimate(est);
                              setIsEditing(true);
                            }}
                            className="p-1.5 text-slate-400/50 hover:text-purple-400 transition-colors rounded-md hover:bg-purple-500/10"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(est.id)}
                            className="p-1.5 text-slate-400/50 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[13px] text-slate-400/50">
                      No estimates found. Create a new estimate to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EstimatorPage() {
  return (
    <ErrorBoundary>
      <EstimatorContent />
    </ErrorBoundary>
  );
}
