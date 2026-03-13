'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Phone, Mail, Building, DollarSign, Search, Calendar, MoreVertical, ChevronRight, User } from 'lucide-react';
import { db, auth } from '@/lib/firebase';
import { collection, onSnapshot, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/lib/firestore-utils';
import { ErrorBoundary } from '@/components/error-boundary';

interface Lead {
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

const STATUSES = ['new', 'contacted', 'proposal', 'won', 'lost'] as const;

function CRMContent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLead, setCurrentLead] = useState<Partial<Lead>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = onSnapshot(
      collection(db, 'leads'),
      (snapshot) => {
        const fetchedLeads = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Lead[];
        setLeads(fetchedLeads);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'leads');
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    try {
      if (!currentLead.name || !currentLead.status) {
        alert("Name and Status are required");
        return;
      }

      const leadData = {
        name: currentLead.name,
        email: currentLead.email || '',
        phone: currentLead.phone || '',
        company: currentLead.company || '',
        status: currentLead.status || 'new',
        value: Number(currentLead.value) || 0,
        notes: currentLead.notes || '',
        updatedAt: new Date().toISOString()
      };

      if (currentLead.id) {
        await updateDoc(doc(db, 'leads', currentLead.id), leadData);
      } else {
        await addDoc(collection(db, 'leads'), {
          ...leadData,
          createdAt: new Date().toISOString()
        });
      }
      setIsEditing(false);
      setCurrentLead({});
    } catch (error) {
      handleFirestoreError(error, currentLead.id ? OperationType.UPDATE : OperationType.CREATE, 'leads');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteDoc(doc(db, 'leads', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `leads/${id}`);
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    try {
      await updateDoc(doc(db, 'leads', id), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `leads/${id}`);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatusBadge = ({ s }: { s: string }) => {
    const M: Record<string, [string, string]> = { 
      new: ["bg-blue-500/15 text-blue-400", "New Lead"], 
      contacted: ["bg-slate-500/10 text-slate-400/60", "Contacted"], 
      proposal: ["bg-purple-500/20 text-purple-400", "Proposal"], 
      won: ["bg-emerald-500/15 text-emerald-400", "Won"], 
      lost: ["bg-red-500/15 text-red-400", "Lost"]
    };
    const [c, l] = M[s] || ["bg-slate-500/10 text-slate-400/60", s];
    return <span className={`inline-flex items-center px-[9px] py-[2px] rounded-full text-[11px] font-semibold tracking-[0.03em] ${c}`}>{l}</span>;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-[1080px]">
      <div className="flex items-center gap-1.5 text-[12px] text-slate-400/40 mb-[18px]">
        <span>Admin</span>
        <ChevronRight size={11} />
        <span className="text-slate-200/60">CRM</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-[20px]">
        <div>
          <h1 className="font-[family-name:--font-syne] text-[24px] font-extrabold text-[#e2e8f0] tracking-[-0.02em]">CRM Pipeline</h1>
          <p className="text-[13px] text-slate-400/45 mt-[3px]">Manage leads, track deals, and monitor your sales pipeline.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentLead({ status: 'new', value: 0 });
            setIsEditing(true);
          }}
          className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none rounded-[9px] px-[18px] py-[9px] text-[13px] font-semibold cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all flex items-center gap-1.5"
        >
          <Plus size={13} />Add Lead
        </button>
      </div>

      {isEditing ? (
        <div className="bg-[#161628]/92 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#e2e8f0]">
              {currentLead.id ? 'Edit Lead' : 'Add New Lead'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="bg-transparent text-slate-400/70 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] font-medium hover:bg-white/5 hover:text-slate-200 hover:border-white/20 transition-all">
              Cancel
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Contact Name *</label>
                <input
                  value={currentLead.name || ''}
                  onChange={(e) => setCurrentLead({ ...currentLead, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Company</label>
                <input
                  value={currentLead.company || ''}
                  onChange={(e) => setCurrentLead({ ...currentLead, company: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={currentLead.email || ''}
                  onChange={(e) => setCurrentLead({ ...currentLead, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={currentLead.phone || ''}
                  onChange={(e) => setCurrentLead({ ...currentLead, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Estimated Value ($)</label>
                <input
                  type="number"
                  value={currentLead.value || 0}
                  onChange={(e) => setCurrentLead({ ...currentLead, value: Number(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                  placeholder="5000"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Pipeline Status *</label>
                <select
                  value={currentLead.status || 'new'}
                  onChange={(e) => setCurrentLead({ ...currentLead, status: e.target.value as Lead['status'] })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all appearance-none"
                >
                  <option value="new" className="bg-[#1a1a2e]">New Lead</option>
                  <option value="contacted" className="bg-[#1a1a2e]">Contacted</option>
                  <option value="proposal" className="bg-[#1a1a2e]">Proposal Sent</option>
                  <option value="won" className="bg-[#1a1a2e]">Closed Won</option>
                  <option value="lost" className="bg-[#1a1a2e]">Closed Lost</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Notes</label>
              <textarea
                value={currentLead.notes || ''}
                onChange={(e) => setCurrentLead({ ...currentLead, notes: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all resize-y min-h-[120px]"
                placeholder="Add any relevant notes, requirements, or history here..."
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button onClick={handleSave} className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none rounded-[9px] px-[18px] py-[9px] text-[13px] font-semibold cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all">
              Save Lead
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#161628]/92 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400/50" />
              <input
                placeholder="Search leads by name, company, or email..."
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
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider">Added</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400 font-bold">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-slate-200 text-[13px]">{lead.name}</div>
                            {lead.company && (
                              <div className="flex items-center text-[11px] text-slate-400/60 mt-1">
                                <Building className="w-3 h-3 mr-1" /> {lead.company}
                              </div>
                            )}
                            {lead.email && (
                              <div className="flex items-center text-[11px] text-slate-400/60 mt-1">
                                <Mail className="w-3 h-3 mr-1" /> {lead.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative inline-block">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="proposal">Proposal</option>
                            <option value="won">Won</option>
                            <option value="lost">Lost</option>
                          </select>
                          <StatusBadge s={lead.status} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center font-medium text-slate-200 text-[13px]">
                          <DollarSign className="w-3.5 h-3.5 text-slate-400/50 mr-1" />
                          {lead.value.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[12px] text-slate-400/60">
                        <div className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-2 opacity-50" />
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              setCurrentLead(lead);
                              setIsEditing(true);
                            }}
                            className="p-1.5 text-slate-400/50 hover:text-purple-400 transition-colors rounded-md hover:bg-purple-500/10"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(lead.id)}
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
                      No leads found. Add a new lead to start tracking.
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

export default function CRMPage() {
  return (
    <ErrorBoundary>
      <CRMContent />
    </ErrorBoundary>
  );
}
