'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Download,
  FileText,
  Calendar,
  Filter
} from 'lucide-react';

const reports = [
  { name: 'Monthly Executive Summary', date: 'Oct 01, 2026', type: 'PDF', size: '2.4 MB' },
  { name: 'Q3 Financial Performance', date: 'Sep 30, 2026', type: 'XLSX', size: '5.1 MB' },
  { name: 'Merchant Deployment Logs', date: 'Sep 28, 2026', type: 'CSV', size: '12.8 MB' },
  { name: 'BTL Campaign Analytics', date: 'Sep 25, 2026', type: 'PDF', size: '3.6 MB' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Automated Reports</h2>
          <p className="text-slate-400 text-sm">Access, generate, and download automated system reports.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="px-4 py-2 rounded-full glass-panel text-slate-300 font-medium text-sm flex items-center gap-2 hover:bg-navy-800 border-copper-500/20">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="px-5 py-2 rounded-full copper-gradient text-navy-900 font-semibold text-sm whitespace-nowrap">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 rounded-2xl border border-copper-500/20 col-span-1 md:col-span-2 lg:col-span-3 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-copper-500/10 flex items-center justify-center shrink-0 border border-copper-500/20">
            <FileText className="w-8 h-8 text-copper-400" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-semibold text-white mb-2">Automated Monthly Overview</h3>
            <p className="text-slate-400 text-sm max-w-2xl">
              Your comprehensive monthly digest covering business outsourcing metrics, digital marketing KPIs, and big data analysis is currently being generated.
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <div className="text-xs text-slate-400 mb-2 flex justify-between">
              <span>Generating...</span>
              <span>75%</span>
            </div>
            <div className="h-1.5 w-full sm:w-48 bg-navy-800 rounded-full overflow-hidden">
              <div className="h-full w-3/4 copper-gradient rounded-full" />
            </div>
          </div>
        </motion.div>

        {reports.map((report, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="glass-panel p-6 rounded-2xl border border-copper-500/10 hover:border-copper-500/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center">
                <FileText className="w-5 h-5 text-copper-400" />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-navy-800 text-slate-300 rounded">
                {report.type}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-copper-400 transition-colors">
              {report.name}
            </h4>
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {report.date}
              </span>
              <span>{report.size}</span>
            </div>
            <button className="w-full py-2.5 rounded-xl border border-copper-500/20 text-slate-300 font-medium text-sm flex items-center justify-center gap-2 hover:bg-copper-500/10 hover:text-white transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
