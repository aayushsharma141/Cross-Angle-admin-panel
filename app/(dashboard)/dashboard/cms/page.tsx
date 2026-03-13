'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Eye, FileText, Image as ImageIcon, Search, ChevronRight, Upload, Package } from 'lucide-react';
import { db, auth } from '@/lib/firebase';
import { collection, onSnapshot, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/lib/firestore-utils';
import { ErrorBoundary } from '@/components/error-boundary';

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  authorId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  type: 'blog' | 'portfolio';
  views?: number;
  category?: string;
}

function CMSContent() {
  const [sec, setSec] = useState('portfolio');
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<ContentItem>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const navs = [
    ["portfolio", "Portfolio Projects", 4],
    ["services", "Services", 6],
    ["testimonials", "Testimonials", 12],
    ["team", "Team", 3],
    ["blog", "Blog", 3],
    ["media", "Media Library", 47]
  ] as const;

  useEffect(() => {
    if (!auth.currentUser) return;
    if (sec !== 'blog' && sec !== 'portfolio') return;

    const collectionName = sec === 'blog' ? 'blogs' : 'portfolio';
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        const fetchedItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          type: sec,
          views: Math.floor(Math.random() * 3000), // Mock views
          category: sec === 'portfolio' ? ['Residential', 'Commercial', 'Hospitality'][Math.floor(Math.random() * 3)] : undefined
        })) as ContentItem[];
        setItems(fetchedItems);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, collectionName);
      }
    );

    return () => unsubscribe();
  }, [sec]);

  const handleSave = async () => {
    try {
      if (!currentItem.title || !currentItem.slug) {
        alert("Title and Slug are required");
        return;
      }

      const collectionName = sec === 'blog' ? 'blogs' : 'portfolio';
      const itemData = {
        title: currentItem.title,
        slug: currentItem.slug,
        content: currentItem.content || '',
        excerpt: currentItem.excerpt || '',
        status: currentItem.status || 'draft',
        authorId: auth.currentUser?.uid,
        imageUrl: currentItem.imageUrl || '',
        updatedAt: new Date().toISOString()
      };

      if (currentItem.id) {
        await updateDoc(doc(db, collectionName, currentItem.id), itemData);
      } else {
        await addDoc(collection(db, collectionName), {
          ...itemData,
          createdAt: new Date().toISOString()
        });
      }
      setIsEditing(false);
      setCurrentItem({});
    } catch (error) {
      handleFirestoreError(error, currentItem.id ? OperationType.UPDATE : OperationType.CREATE, sec === 'blog' ? 'blogs' : 'portfolio');
    }
  };

  const handleDelete = async (id: string) => {
    const collectionName = sec === 'blog' ? 'blogs' : 'portfolio';
    if (confirm(`Are you sure you want to delete this ${sec === 'blog' ? 'post' : 'item'}?`)) {
      try {
        await deleteDoc(doc(db, collectionName, id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
      }
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatusBadge = ({ s }: { s: string }) => {
    const M: Record<string, [string, string]> = { 
      new: ["bg-blue-500/15 text-blue-400", "New Lead"], 
      contacted: ["bg-slate-500/10 text-slate-400/60", "Contacted"], 
      consultation: ["bg-amber-500/15 text-amber-400", "Consultation"], 
      proposal: ["bg-purple-500/20 text-purple-400", "Proposal"], 
      won: ["bg-emerald-500/15 text-emerald-400", "Won"], 
      lost: ["bg-red-500/15 text-red-400", "Lost"], 
      published: ["bg-emerald-500/15 text-emerald-400", "Published"], 
      draft: ["bg-slate-500/10 text-slate-400/60", "Draft"] 
    };
    const [c, l] = M[s] || ["bg-slate-500/10 text-slate-400/60", s];
    return <span className={`inline-flex items-center px-[9px] py-[2px] rounded-full text-[11px] font-semibold tracking-[0.03em] ${c}`}>{l}</span>;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-[1080px]">
      <div className="flex items-center gap-1.5 text-[12px] text-slate-400/40 mb-[18px]">
        <span>Admin</span>
        <ChevronRight size={11} />
        <span className="text-slate-200/60">CMS</span>
      </div>

      <div className="flex justify-between items-start mb-[20px]">
        <div>
          <h1 className="font-[family-name:--font-syne] text-[19px] font-bold text-[#e2e8f0] tracking-[-0.01em]">Content Management</h1>
          <p className="text-[12px] text-slate-400/45 mt-[3px]">Manage all public-facing website content</p>
        </div>
        <button 
          onClick={() => {
            setCurrentItem({ status: 'draft' });
            setIsEditing(true);
          }}
          className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none rounded-[9px] px-[18px] py-[9px] text-[13px] font-semibold cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all flex items-center gap-1.5"
        >
          <Plus size={13} />New Content
        </button>
      </div>

      <div className="grid grid-cols-[155px_1fr] gap-4">
        <div>
          {navs.map(([id, lbl, cnt]) => (
            <div 
              key={id} 
              onClick={() => { setSec(id); setIsEditing(false); }} 
              className={`flex items-center gap-[7px] px-2.5 py-2 rounded-lg mb-0.5 cursor-pointer text-[12.5px] transition-all border ${sec === id ? 'bg-purple-600/15 border-purple-500/30 text-purple-400' : 'border-transparent text-slate-400/50 hover:text-slate-200'}`}
            >
              <span className="flex-1">{lbl}</span>
              <span className="text-[9.5px] opacity-60">{cnt}</span>
            </div>
          ))}
        </div>
        
        <div>
          {isEditing ? (
            <div className="bg-[#161628]/92 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#e2e8f0]">
                  {currentItem.id ? `Edit ${sec === 'blog' ? 'Post' : 'Item'}` : `Create New ${sec === 'blog' ? 'Post' : 'Item'}`}
                </h2>
                <button onClick={() => setIsEditing(false)} className="bg-transparent text-slate-400/70 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] font-medium hover:bg-white/5 hover:text-slate-200 hover:border-white/20 transition-all">
                  Cancel
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Title</label>
                    <input
                      value={currentItem.title || ''}
                      onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                      placeholder="Title"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Slug</label>
                    <input
                      value={currentItem.slug || ''}
                      onChange={(e) => setCurrentItem({ ...currentItem, slug: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                      placeholder="url-slug"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Excerpt</label>
                  <textarea
                    value={currentItem.excerpt || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, excerpt: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all resize-none h-24"
                    placeholder="Brief summary..."
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Content</label>
                  <textarea
                    value={currentItem.content || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, content: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all resize-y min-h-[300px]"
                    placeholder="Write your content here (Markdown supported)..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Cover Image URL</label>
                    <input
                      value={currentItem.imageUrl || ''}
                      onChange={(e) => setCurrentItem({ ...currentItem, imageUrl: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Status</label>
                    <select
                      value={currentItem.status || 'draft'}
                      onChange={(e) => setCurrentItem({ ...currentItem, status: e.target.value as 'draft' | 'published' })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all appearance-none"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button onClick={() => setIsEditing(false)} className="bg-transparent text-slate-400/70 border border-white/10 rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-white/5 hover:text-slate-200 hover:border-white/20 transition-all">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none rounded-lg px-4 py-2 text-[13px] font-semibold cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all">
                    Save {sec === 'blog' ? 'Post' : 'Item'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {sec === "portfolio" && (
                <div>
                  <div className="flex gap-2.5 mb-[14px]">
                    <div className="flex-1 relative">
                      <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400/35" />
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-[9px] pl-9 pr-3 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all" 
                        placeholder="Search projects…" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select className="bg-white/5 border border-white/10 rounded-lg px-[11px] py-2 text-[13px] text-slate-200 outline-none cursor-pointer appearance-none">
                      <option>All Status</option>
                      <option>Published</option>
                      <option>Draft</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-[11px]">
                    {filteredItems.map(p => (
                      <div key={p.id} className="bg-[#121220]/85 border border-white/10 rounded-[13px] p-0 overflow-hidden cursor-pointer hover:border-purple-500/20 transition-colors">
                        <div className="relative">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt="" className="w-full h-[96px] object-cover block" />
                          ) : (
                            <div className="w-full h-[96px] bg-white/5 flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-slate-400/30" />
                            </div>
                          )}
                          <div className="absolute top-2 right-2"><StatusBadge s={p.status} /></div>
                        </div>
                        <div className="p-[13px]">
                          <div className="text-[13px] font-semibold text-[#e2e8f0] mb-[3px]">{p.title}</div>
                          <div className="text-[11px] text-slate-400/45 mb-[9px]">{p.category || 'Uncategorized'}</div>
                          <div className="flex justify-between items-center">
                            <div className="text-[11px] text-slate-400/40 flex items-center gap-[3px]"><Eye size={10} />{(p.views || 0).toLocaleString()}</div>
                            <div className="flex gap-[3px]">
                              <button onClick={() => { setCurrentItem(p); setIsEditing(true); }} className="bg-transparent border-none text-slate-400/60 p-[5px] rounded-[7px] flex items-center justify-center hover:bg-purple-600/15 hover:text-purple-400 transition-all"><Edit2 size={12} /></button>
                              <button onClick={() => handleDelete(p.id)} className="bg-transparent border-none text-red-400/60 p-[5px] rounded-[7px] flex items-center justify-center hover:bg-red-500/15 hover:text-red-400 transition-all"><Trash2 size={12} /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {sec === "blog" && (
                <div>
                  <div className="flex justify-end mb-[13px]">
                    <button 
                      onClick={() => { setCurrentItem({ status: 'draft' }); setIsEditing(true); }}
                      className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none rounded-[9px] px-[18px] py-[9px] text-[13px] font-semibold cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all flex items-center gap-1.5"
                    >
                      <Plus size={13}/>New Post
                    </button>
                  </div>
                  <div className="bg-[#121220]/85 border border-white/10 rounded-[13px] overflow-hidden">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 px-[14px] py-[10px] border-b border-white/5 text-left">Title</th>
                          <th className="text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 px-[14px] py-[10px] border-b border-white/5 text-left">Status</th>
                          <th className="text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 px-[14px] py-[10px] border-b border-white/5 text-left">Views</th>
                          <th className="text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 px-[14px] py-[10px] border-b border-white/5 text-left">Date</th>
                          <th className="text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 px-[14px] py-[10px] border-b border-white/5 text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.map((b, i) => (
                          <tr key={b.id} className="hover:bg-purple-600/5 transition-colors group">
                            <td className="px-[14px] py-[11px] text-[13px] font-medium max-w-[280px] border-b border-white/5 truncate">{b.title}</td>
                            <td className="px-[14px] py-[11px] text-[13px] border-b border-white/5"><StatusBadge s={b.status}/></td>
                            <td className="px-[14px] py-[11px] text-[12px] text-slate-400/50 border-b border-white/5">{b.views || "—"}</td>
                            <td className="px-[14px] py-[11px] text-[12px] text-slate-400/40 border-b border-white/5">{new Date(b.createdAt).toLocaleDateString()}</td>
                            <td className="px-[14px] py-[11px] text-[13px] border-b border-white/5">
                              <div className="flex gap-[3px] opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setCurrentItem(b); setIsEditing(true); }} className="bg-transparent border-none text-slate-400/60 p-[5px] rounded-[7px] flex items-center justify-center hover:bg-purple-600/15 hover:text-purple-400 transition-all"><Edit2 size={12}/></button>
                                <button onClick={() => handleDelete(b.id)} className="bg-transparent border-none text-red-400/60 p-[5px] rounded-[7px] flex items-center justify-center hover:bg-red-500/15 hover:text-red-400 transition-all"><Trash2 size={12}/></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {sec === "media" && (
                <div>
                  <div className="flex gap-[9px] mb-[13px]">
                    <div className="flex-1 relative">
                      <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400/35" />
                      <input className="w-full bg-white/5 border border-white/10 rounded-lg py-[9px] pl-9 pr-3 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all" placeholder="Search media…" />
                    </div>
                    <button className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none rounded-[9px] px-[18px] py-[9px] text-[13px] font-semibold cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all flex items-center gap-1.5">
                      <Upload size={12}/>Upload
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-[9px]">
                    {["photo-1600585154526-990dced4db0d","photo-1497366216548-37526070297c","photo-1600607687920-4e2a09cf159d","photo-1582719478250-c89cae4dc85b","photo-1618221195710-dd6b41faaea6","photo-1586023492125-27b2c045efd7"].map((id,i)=>(
                      <div key={i} className="bg-[#121220]/85 border border-white/10 rounded-[13px] p-0 overflow-hidden">
                        <img src={`https://images.unsplash.com/${id}?w=200&h=110&fit=crop`} alt="" className="w-full h-[76px] object-cover block"/>
                        <div className="px-[9px] py-[5px] text-[10px] text-slate-400/40 truncate">interior-0{i+1}.jpg</div>
                      </div>
                    ))}
                    <div className="bg-[#121220]/85 border border-dashed border-white/10 rounded-[13px] flex flex-col items-center justify-center h-[108px] cursor-pointer hover:border-purple-500/30 hover:bg-purple-600/5 transition-all">
                      <Upload size={16} className="text-purple-400"/>
                      <div className="text-[10.5px] text-slate-400/40 mt-[5px]">Upload</div>
                    </div>
                  </div>
                </div>
              )}
              
              {!["portfolio","blog","media"].includes(sec) && (
                <div className="text-center py-[54px] px-[20px]">
                  <div className="w-[50px] h-[50px] mx-auto mb-[13px] bg-purple-600/10 rounded-[13px] flex items-center justify-center border border-purple-500/20">
                    <Package size={21} className="text-purple-400"/>
                  </div>
                  <div className="font-[family-name:--font-syne] text-[16px] text-[#e2e8f0] mb-[5px]">{navs.find(n=>n[0]===sec)?.[1]}</div>
                  <div className="text-[13px] text-slate-400/40 mb-[17px]">Ready to configure</div>
                  <button className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none rounded-[9px] px-[18px] py-[9px] text-[13px] font-semibold cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all inline-flex items-center gap-1.5">
                    <Plus size={13}/>Add First Item
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CMSPage() {
  return (
    <ErrorBoundary>
      <CMSContent />
    </ErrorBoundary>
  );
}
