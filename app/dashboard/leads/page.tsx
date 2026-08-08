'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Search,
  Filter,
  Eye,
  Phone,
  Mail,
  MoreVertical
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function LeadsPage() {
  const { leads } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.leadReference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? lead.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Lead Management</h2>
          <p className="text-slate-400 text-sm">View, track, and manage all incoming enquiries.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <div className="relative flex-1 sm:w-64 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-navy-800 border border-copper-500/20 text-white text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-copper-500/50 transition-colors"
            />
          </div>
          <div className="relative">
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="bg-navy-800 border border-copper-500/20 text-white text-sm rounded-full pl-4 pr-8 py-2.5 appearance-none focus:outline-none focus:border-copper-500/50 transition-colors"
             >
               <option value="">All Statuses</option>
               <option value="NEW">New</option>
               <option value="CONTACTED">Contacted</option>
               <option value="QUALIFIED">Qualified</option>
               <option value="PROPOSAL SENT">Proposal Sent</option>
               <option value="NEGOTIATION">Negotiation</option>
               <option value="WON">Won</option>
               <option value="LOST">Lost</option>
             </select>
             <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-copper-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-navy-800/80 border-b border-copper-500/20">
              <tr>
                <th className="px-6 py-4 font-medium">Ref ID</th>
                <th className="px-6 py-4 font-medium">Customer Details</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No leads found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((row, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={row.id} 
                    className="border-b border-copper-500/10 hover:bg-navy-800/40 transition-colors group"
                  >
                    <td className="px-6 py-4 font-medium text-copper-400 whitespace-nowrap">
                      {row.leadReference}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium mb-0.5">{row.fullName}</div>
                      <div className="text-xs text-slate-400">{row.companyName}</div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {row.mobile}</span>
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {row.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{row.service}</td>
                    <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                        row.status === 'WON' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        row.status === 'LOST' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        row.status === 'NEW' ? 'bg-copper-500/20 text-copper-400 border border-copper-500/30' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/dashboard/leads/${row.id}`}>
                        <button className="p-2 text-slate-400 hover:text-copper-400 hover:bg-navy-800 rounded-lg transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                      </Link>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
