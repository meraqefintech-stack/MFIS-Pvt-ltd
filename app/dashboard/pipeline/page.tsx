'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { 
  Building2,
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import { useAppStore, LeadStatus, Lead } from '@/lib/store';

const COLUMNS: { id: LeadStatus; title: string; color: string }[] = [
  { id: 'NEW', title: 'New Enquiries', color: 'bg-copper-500' },
  { id: 'CONTACTED', title: 'Contacted', color: 'bg-blue-500' },
  { id: 'QUALIFIED', title: 'Qualified', color: 'bg-indigo-500' },
  { id: 'PROPOSAL SENT', title: 'Proposal Sent', color: 'bg-purple-500' },
  { id: 'NEGOTIATION', title: 'Negotiation', color: 'bg-amber-500' },
  { id: 'WON', title: 'Closed Won', color: 'bg-emerald-500' },
];

export default function PipelinePage() {
  const { leads, updateLeadStatus } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);
  
  // Minimal drag and drop state
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLeadId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Requires some data to be set for Firefox drag to work
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault();
    if (draggedLeadId) {
      updateLeadStatus(draggedLeadId, status);
      setDraggedLeadId(null);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-[1600px] mx-auto">
      <div className="mb-6 shrink-0">
        <h2 className="text-2xl font-bold text-white mb-1">Sales Pipeline</h2>
        <p className="text-slate-400 text-sm">Drag and drop leads to update their status.</p>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex gap-6 h-full min-w-max px-1">
          {COLUMNS.map((column) => {
            const columnLeads = leads.filter(l => l.status === column.id);
            
            return (
              <div 
                key={column.id} 
                className="w-80 flex flex-col glass-panel rounded-2xl border border-copper-500/10 overflow-hidden"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className="p-4 border-b border-copper-500/10 bg-navy-800/50 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${column.color}`} />
                    <h3 className="font-semibold text-white">{column.title}</h3>
                  </div>
                  <span className="bg-navy-900 text-slate-400 text-xs py-1 px-2.5 rounded-full border border-copper-500/20 font-medium">
                    {columnLeads.length}
                  </span>
                </div>
                
                {/* Column Body */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar bg-navy-900/20">
                  <AnimatePresence>
                    {columnLeads.map((lead) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        key={lead.id}
                        draggable
                        onDragStart={(e: any) => handleDragStart(e, lead.id)}
                        onDragEnd={() => setDraggedLeadId(null)}
                        className={`bg-navy-800 p-4 rounded-xl border border-copper-500/20 cursor-grab active:cursor-grabbing hover:border-copper-500/40 transition-colors shadow-sm ${draggedLeadId === lead.id ? 'opacity-50' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <Link href={`/dashboard/leads/${lead.id}`} className="text-white font-medium hover:text-copper-400 transition-colors">
                            {lead.fullName}
                          </Link>
                          <button className="text-slate-500 hover:text-slate-300">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-xs text-slate-400 mb-3 flex items-center gap-1.5 line-clamp-1">
                          <Building2 className="w-3 h-3" /> {lead.companyName}
                        </div>
                        
                        <div className="inline-block px-2 py-1 rounded bg-navy-900 text-copper-400 text-[10px] font-medium border border-copper-500/10 mb-3">
                          {lead.service}
                        </div>
                        
                        <div className="flex justify-between items-center pt-3 border-t border-copper-500/10 text-xs">
                          <span className="text-slate-500">{lead.leadReference}</span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {columnLeads.length === 0 && (
                    <div className="h-full flex items-center justify-center min-h-[100px] border-2 border-dashed border-copper-500/10 rounded-xl text-slate-500 text-sm">
                      Drop here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
