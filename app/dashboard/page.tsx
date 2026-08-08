'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { Activity, Users, Target, ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function DashboardOverview() {
  const { leads, services } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'NEW').length;
  const wonLeads = leads.filter(l => l.status === 'WON').length;
  const conversionRate = totalLeads ? Math.round((wonLeads / totalLeads) * 100) : 0;

  const stats = [
    { title: 'Total Leads', value: totalLeads.toString(), change: '+12%', icon: Users, up: true },
    { title: 'New Enquiries', value: newLeads.toString(), change: '+5.4%', icon: Activity, up: true },
    { title: 'Conversion Rate', value: `${conversionRate}%`, change: '-2.1%', icon: Target, up: false },
  ];

  // Group leads by service for chart
  const serviceData = services.map(s => ({
    name: s.name.split(' ')[0], 
    value: leads.filter(l => l.service === s.name).length
  }));

  // Dummy revenue data for the area chart
  const revenueData = [
    { name: 'Jan', value: 4000, target: 2400 },
    { name: 'Feb', value: 3000, target: 1398 },
    { name: 'Mar', value: 2000, target: 9800 },
    { name: 'Apr', value: 2780, target: 3908 },
    { name: 'May', value: 1890, target: 4800 },
    { name: 'Jun', value: 2390, target: 3800 },
    { name: 'Jul', value: totalLeads * 1000, target: 4300 }, // Make it slightly dynamic based on leads
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-copper-500/5 rounded-bl-full transition-transform group-hover:scale-110" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center border border-copper-500/10">
                <stat.icon className="w-6 h-6 text-copper-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm relative z-10">
              <span className={`flex items-center ${stat.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.up ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {stat.change}
              </span>
              <span className="text-slate-500">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Area Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 rounded-2xl border border-copper-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white">Estimated Revenue</h3>
            <p className="text-sm text-slate-400">Comparing actual revenue vs target.</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b87333" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#b87333" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#101c42', borderColor: 'rgba(184,115,51,0.3)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="value" stroke="#b87333" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                <Area type="monotone" dataKey="target" stroke="#475569" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 rounded-2xl border border-copper-500/20"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white">Leads by Service</h3>
            <p className="text-sm text-slate-400">Distribution of enquiries across core services.</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(184,115,51,0.1)' }}
                  contentStyle={{ backgroundColor: '#101c42', borderColor: 'rgba(184,115,51,0.3)', borderRadius: '12px' }}
                />
                <Bar dataKey="value" fill="#b87333" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-6 rounded-2xl border border-copper-500/20"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Recent Enquiries</h3>
            <p className="text-sm text-slate-400">Latest leads captured by the system.</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-navy-800/50">
              <tr>
                <th className="px-4 py-3 rounded-tl-xl font-medium">Ref ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 rounded-tr-xl font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map((row, i) => (
                <tr key={i} className="border-b border-copper-500/10 hover:bg-navy-800/30 transition-colors">
                  <td className="px-4 py-4 font-medium text-white">{row.leadReference}</td>
                  <td className="px-4 py-4 text-slate-300">
                    <div>{row.fullName}</div>
                    <div className="text-xs text-slate-500">{row.companyName}</div>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{row.service}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      row.status === 'WON' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      row.status === 'LOST' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      row.status === 'NEW' ? 'bg-copper-500/20 text-copper-400 border border-copper-500/30' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-400">{new Date(row.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

