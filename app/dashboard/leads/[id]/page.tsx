'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Building2,
  Calendar,
  Clock,
  Briefcase,
  MessageSquare,
  Plus,
  Save,
  CheckCircle2,
  UserCircle
} from 'lucide-react';
import { useAppStore, LeadStatus } from '@/lib/store';

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const { leads, updateLeadStatus, addNote, assignLead, employees, addFollowUp } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);
  const [newNote, setNewNote] = useState('');
  
  const lead = leads.find(l => l.id === resolvedParams.id);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;
  
  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-slate-400">
        <h2 className="text-2xl font-bold text-white mb-2">Lead Not Found</h2>
        <p>The lead you are looking for does not exist or has been removed.</p>
        <button onClick={() => router.back()} className="mt-6 px-6 py-2 rounded-full border border-copper-500/30 text-copper-400 hover:bg-copper-500/10">
          Go Back
        </button>
      </div>
    );
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateLeadStatus(lead.id, e.target.value as LeadStatus);
  };

  const handleAssign = (e: React.ChangeEvent<HTMLSelectElement>) => {
    assignLead(lead.id, e.target.value);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addNote(lead.id, newNote, 'Admin User'); // Current user
    setNewNote('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 text-slate-400 hover:text-white hover:bg-navy-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">{lead.fullName}</h2>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
              lead.status === 'WON' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
              lead.status === 'LOST' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
              lead.status === 'NEW' ? 'bg-copper-500/20 text-copper-400 border border-copper-500/30' :
              'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {lead.status}
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">Ref: {lead.leadReference} • Created: {new Date(lead.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-copper-500/20">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-copper-400" /> Customer Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Company</p>
                <div className="flex items-center gap-2 text-slate-200">
                  <Building2 className="w-4 h-4 text-slate-400" /> {lead.companyName}
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Business Type</p>
                <div className="flex items-center gap-2 text-slate-200">
                  <Briefcase className="w-4 h-4 text-slate-400" /> {lead.businessType || 'N/A'}
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Email</p>
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-4 h-4 text-slate-400" /> {lead.email}
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Mobile</p>
                <div className="flex items-center gap-2 text-slate-200">
                  <Phone className="w-4 h-4 text-slate-400" /> {lead.mobile}
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Location</p>
                <div className="flex items-center gap-2 text-slate-200">
                  <MapPin className="w-4 h-4 text-slate-400" /> {lead.city || 'N/A'}
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Preferred Contact</p>
                <div className="text-slate-200">{lead.preferredContact}</div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-copper-500/10">
              <p className="text-sm text-slate-500 mb-2">Service Required</p>
              <div className="inline-block px-4 py-2 rounded-lg bg-navy-800 text-copper-400 font-medium border border-copper-500/20">
                {lead.service}
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-slate-500 mb-2">Estimated Requirement</p>
              <p className="text-slate-300">{lead.estimatedRequirement || 'Not specified'}</p>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-slate-500 mb-2">Initial Message</p>
              <div className="bg-navy-900/50 p-4 rounded-xl border border-copper-500/10 text-slate-300 whitespace-pre-wrap">
                {lead.message || 'No message provided.'}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-copper-500/10 flex flex-wrap gap-4">
              <a href={`tel:${lead.mobile}`} className="flex-1 min-w-[140px] py-2.5 rounded-xl border border-copper-500 text-copper-400 font-medium hover:bg-copper-500 hover:text-navy-900 transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Call
              </a>
              <a href={`https://wa.me/${lead.mobile.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[140px] py-2.5 rounded-xl border border-emerald-500 text-emerald-400 font-medium hover:bg-emerald-500 hover:text-navy-900 transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </a>
              <a href={`mailto:${lead.email}`} className="flex-1 min-w-[140px] py-2.5 rounded-xl border border-blue-500 text-blue-400 font-medium hover:bg-blue-500 hover:text-navy-900 transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </div>
          
          {/* Notes Section */}
          <div className="glass-panel p-6 rounded-2xl border border-copper-500/20">
            <h3 className="text-lg font-semibold text-white mb-6">Notes & Activity</h3>
            
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
              {lead.notes.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-4">No notes added yet.</p>
              ) : (
                lead.notes.map(note => (
                  <div key={note.id} className="bg-navy-800/50 p-4 rounded-xl border border-copper-500/5">
                    <p className="text-slate-300 text-sm mb-2">{note.content}</p>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>{note.createdBy}</span>
                      <span>{new Date(note.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <form onSubmit={handleAddNote} className="relative">
              <textarea 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="w-full bg-navy-900 border border-copper-500/20 rounded-xl pl-4 pr-12 py-3 text-white text-sm focus:outline-none focus:border-copper-500/50 resize-none h-24"
              />
              <button 
                type="submit"
                disabled={!newNote.trim()}
                className="absolute bottom-3 right-3 p-2 bg-copper-500 text-navy-900 rounded-lg hover:bg-copper-400 disabled:opacity-50 disabled:hover:bg-copper-500 transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-copper-500/20">
            <h3 className="text-lg font-semibold text-white mb-6">Status & Assignment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Lead Status</label>
                <select 
                  value={lead.status}
                  onChange={handleStatusChange}
                  className="w-full bg-navy-900 border border-copper-500/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-copper-500/50 appearance-none"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="PROPOSAL SENT">PROPOSAL SENT</option>
                  <option value="NEGOTIATION">NEGOTIATION</option>
                  <option value="WON">WON</option>
                  <option value="LOST">LOST</option>
                  <option value="FOLLOW-UP">FOLLOW-UP</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Assigned To</label>
                <select 
                  value={lead.assignedTo || ''}
                  onChange={handleAssign}
                  className="w-full bg-navy-900 border border-copper-500/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-copper-500/50 appearance-none"
                >
                  <option value="" disabled>Unassigned</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border border-copper-500/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Next Action</h3>
              <button className="text-copper-400 hover:text-copper-300 text-sm flex items-center gap-1 font-medium">
                <Plus className="w-4 h-4" /> Schedule
              </button>
            </div>
            
            {lead.nextFollowUp ? (
              <div className="bg-navy-800/80 p-4 rounded-xl border border-copper-500/10">
                <div className="flex items-center gap-3 text-copper-400 mb-2 font-medium">
                  <Calendar className="w-4 h-4" /> {new Date(lead.nextFollowUp).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm mb-4">
                  <Clock className="w-4 h-4 text-slate-400" /> {new Date(lead.nextFollowUp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <button className="w-full py-2 rounded-lg border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 transition-colors flex justify-center items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Mark Complete
                </button>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-500 text-sm">
                No follow-up scheduled.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
