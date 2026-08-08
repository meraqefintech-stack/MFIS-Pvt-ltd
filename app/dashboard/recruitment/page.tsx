'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter,
  CheckCircle,
  Download,
  Calendar,
  UserPlus,
  Eye,
  X,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const statusColors: Record<string, string> = {
  'NEW': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'SCREENING': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'SHORTLISTED': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'INTERVIEW': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'SELECTED': 'bg-green-500/10 text-green-400 border-green-500/20',
  'OFFERED': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'JOINED': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  'REJECTED': 'bg-red-500/10 text-red-400 border-red-500/20',
  'ON HOLD': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

export default function RecruitmentDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      const data = JSON.parse(localStorage.getItem('meraqe_applications') || '[]');
      setApplications(data);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.positionAppliedFor?.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Applications', value: applications.length, icon: Users, color: 'text-blue-400' },
    { label: 'New', value: applications.filter(a => a.status === 'NEW').length, icon: UserPlus, color: 'text-copper-400' },
    { label: 'Shortlisted', value: applications.filter(a => a.status === 'SHORTLISTED').length, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Interviews', value: applications.filter(a => a.status === 'INTERVIEW').length, icon: Calendar, color: 'text-purple-400' }
  ];

  const handleStatusChange = (id: string, newStatus: string) => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status: newStatus, updatedAt: new Date().toISOString() } : app
    );
    setApplications(updated);
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    localStorage.setItem('meraqe_applications', JSON.stringify(updated));
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedApp) return;
    const updatedApp = { ...selectedApp, notes: e.target.value };
    setSelectedApp(updatedApp);
    
    const updated = applications.map(app => app.id === updatedApp.id ? updatedApp : app);
    setApplications(updated);
    localStorage.setItem('meraqe_applications', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 relative">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Recruitment Dashboard</h1>
        <p className="text-slate-400">Manage job applications and candidates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-2xl border border-copper-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel rounded-2xl border border-copper-500/20 overflow-hidden">
        <div className="p-6 border-b border-copper-500/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by ID, name, position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-copper-500/50"
            />
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-navy-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-copper-500/50 w-full sm:w-auto"
            >
              <option value="ALL">All Status</option>
              {Object.keys(statusColors).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-copper-500/20 bg-navy-800/50">
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Application</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Position</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Experience</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Status</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-copper-500/10">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No applications found.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-navy-800/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="font-medium text-white">{app.fullName}</div>
                      <div className="text-sm text-slate-400 font-mono">{app.id}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-200">{app.positionAppliedFor}</div>
                      <div className="text-sm text-slate-400">{app.department} • {app.location}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-300">
                      {app.totalExperience} yrs
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-sm">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[app.status] || statusColors['NEW']} bg-navy-900 focus:outline-none appearance-none cursor-pointer pr-6`}
                      >
                        {Object.keys(statusColors).map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setSelectedApp(app)} className="p-2 text-slate-400 hover:text-copper-400 transition-colors" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-copper-400 transition-colors" title="Download Resume">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedApp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-navy-900 border border-copper-500/20 rounded-2xl w-full max-w-4xl max-h-full overflow-y-auto flex flex-col"
            >
              <div className="p-6 border-b border-copper-500/20 flex justify-between items-center sticky top-0 bg-navy-900 z-10">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedApp.fullName}</h2>
                  <p className="text-sm text-slate-400 font-mono">{selectedApp.id}</p>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-2 text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-sm font-semibold text-copper-400 uppercase tracking-wider mb-4">Application Details</h3>
                    <div className="grid grid-cols-2 gap-4 bg-navy-800/50 p-4 rounded-xl border border-copper-500/10">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Position</p>
                        <p className="font-medium text-white">{selectedApp.positionAppliedFor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Department</p>
                        <p className="font-medium text-white">{selectedApp.department}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Location</p>
                        <p className="font-medium text-white">{selectedApp.location || selectedApp.city}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Applied On</p>
                        <p className="font-medium text-white">{new Date(selectedApp.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-semibold text-copper-400 uppercase tracking-wider mb-4">Candidate Profile</h3>
                    <div className="grid grid-cols-2 gap-y-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Email</p>
                        <p className="font-medium text-white">{selectedApp.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Mobile</p>
                        <p className="font-medium text-white">{selectedApp.mobile}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Qualification</p>
                        <p className="font-medium text-white">{selectedApp.qualification}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Experience</p>
                        <p className="font-medium text-white">{selectedApp.totalExperience} years total, {selectedApp.relevantExperience || 0} relevant</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Current Company</p>
                        <p className="font-medium text-white">{selectedApp.previousCompany || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Current Designation</p>
                        <p className="font-medium text-white">{selectedApp.currentDesignation || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Expected Salary</p>
                        <p className="font-medium text-white">{selectedApp.expectedSalary || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Notice Period</p>
                        <p className="font-medium text-white">{selectedApp.noticePeriod || 'N/A'}</p>
                      </div>
                    </div>
                  </section>

                  {(selectedApp.linkedin || selectedApp.portfolio) && (
                    <section>
                      <h3 className="text-sm font-semibold text-copper-400 uppercase tracking-wider mb-4">Links</h3>
                      <div className="flex flex-col gap-2">
                        {selectedApp.linkedin && (
                          <a href={selectedApp.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{selectedApp.linkedin}</a>
                        )}
                        {selectedApp.portfolio && (
                          <a href={selectedApp.portfolio} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{selectedApp.portfolio}</a>
                        )}
                      </div>
                    </section>
                  )}
                  
                  {selectedApp.coverLetter && (
                    <section>
                      <h3 className="text-sm font-semibold text-copper-400 uppercase tracking-wider mb-4">Cover Letter / Message</h3>
                      <p className="text-slate-300 text-sm whitespace-pre-wrap bg-navy-800/50 p-4 rounded-xl border border-copper-500/10">
                        {selectedApp.coverLetter}
                      </p>
                    </section>
                  )}
                </div>

                <div className="space-y-6">
                  <section>
                    <h3 className="text-sm font-semibold text-copper-400 uppercase tracking-wider mb-4">Actions</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Update Status</label>
                        <select
                          value={selectedApp.status}
                          onChange={(e) => handleStatusChange(selectedApp.id, e.target.value)}
                          className={`w-full text-sm px-3 py-2 rounded-xl border ${statusColors[selectedApp.status] || statusColors['NEW']} bg-navy-900 focus:outline-none`}
                        >
                          {Object.keys(statusColors).map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>

                      <button className="w-full flex items-center justify-center gap-2 py-3 bg-navy-800 border border-copper-500/30 rounded-xl hover:bg-copper-500/10 transition-colors text-slate-200">
                        <Download className="w-4 h-4" />
                        Download Resume
                        <span className="text-xs text-slate-400 ml-1">({selectedApp.resumeName || 'Resume.pdf'})</span>
                      </button>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-semibold text-copper-400 uppercase tracking-wider mb-4">Recruiter Notes</h3>
                    <textarea 
                      placeholder="Add private notes about this candidate..."
                      value={selectedApp.notes || ''}
                      onChange={handleNoteChange}
                      rows={5}
                      className="w-full bg-navy-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-copper-500/50 text-sm resize-none"
                    />
                  </section>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
