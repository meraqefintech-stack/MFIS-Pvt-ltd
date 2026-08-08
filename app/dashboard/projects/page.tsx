'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Search,
  MoreVertical,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const projects = [
  { id: 'PRJ-1029', name: 'Global Merchant Deployment', client: 'Acme Corp', status: 'In Progress', progress: 65, deadline: 'Oct 24, 2026', type: 'Merchant' },
  { id: 'PRJ-1030', name: 'Q4 Digital Marketing', client: 'Stark Ind.', status: 'Completed', progress: 100, deadline: 'Sep 30, 2026', type: 'Marketing' },
  { id: 'PRJ-1031', name: 'Fintech Data Migration', client: 'Wayne Ent.', status: 'At Risk', progress: 32, deadline: 'Nov 15, 2026', type: 'Big Data' },
  { id: 'PRJ-1032', name: 'BTL Campaign Activation', client: 'Oscorp', status: 'In Progress', progress: 78, deadline: 'Oct 10, 2026', type: 'BTL' },
  { id: 'PRJ-1033', name: 'Corporate Compliance Audit', client: 'LexCorp', status: 'In Progress', progress: 45, deadline: 'Dec 01, 2026', type: 'Corporate' },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Active Projects</h2>
          <p className="text-slate-400 text-sm">Monitor ongoing client engagements and operational deployments.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full bg-navy-800 border border-copper-500/20 text-white text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-copper-500/50 transition-colors"
            />
          </div>
          <button className="px-5 py-2 rounded-full copper-gradient text-navy-900 font-semibold text-sm whitespace-nowrap">
            New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project, i) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-5 rounded-2xl border border-copper-500/10 hover:border-copper-500/30 transition-all flex flex-col md:flex-row gap-6 md:items-center justify-between"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${
                project.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                project.status === 'At Risk' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                'bg-copper-500/10 border-copper-500/20 text-copper-400'
              }`}>
                {project.status === 'Completed' ? <CheckCircle2 className="w-6 h-6" /> :
                 project.status === 'At Risk' ? <AlertCircle className="w-6 h-6" /> :
                 <Clock className="w-6 h-6" />}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">{project.name}</h4>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span className="font-medium text-slate-300">{project.client}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span>{project.id}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="px-2 py-0.5 rounded-md bg-navy-800 text-xs">{project.type}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full md:w-auto">
              <div className="w-full md:w-48">
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-navy-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      project.status === 'Completed' ? 'bg-emerald-500' :
                      project.status === 'At Risk' ? 'bg-rose-500' :
                      'copper-gradient'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full md:w-auto gap-6">
                <div className="text-sm">
                  <p className="text-slate-500 mb-0.5">Deadline</p>
                  <p className="text-slate-300 font-medium">{project.deadline}</p>
                </div>
                
                <button className="p-2 text-slate-400 hover:text-white hover:bg-navy-800 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
