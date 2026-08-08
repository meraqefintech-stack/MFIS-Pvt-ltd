'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Logo } from '@/components/logo';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Heart,
  Globe,
  Zap,
  Coffee,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';
import { jobs } from '@/lib/jobs';

const benefits = [
  { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive medical coverage and wellness programs.' },
  { icon: Globe, title: 'Remote-Friendly', desc: 'Flexible work arrangements to suit your lifestyle.' },
  { icon: Zap, title: 'Growth Opportunities', desc: 'Continuous learning budgets and clear career paths.' },
  { icon: Coffee, title: 'Vibrant Culture', desc: 'Collaborative environment with regular team events.' },
];

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const departments = ['All', ...Array.from(new Set(jobs.map(j => j.department)))];
  const locations = ['All', ...Array.from(new Set(jobs.map(j => j.location)))];
  const types = ['All', ...Array.from(new Set(jobs.map(j => j.type)))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDept = departmentFilter === 'All' || job.department === departmentFilter;
    const matchesLoc = locationFilter === 'All' || job.location === locationFilter;
    const matchesType = typeFilter === 'All' || job.type === typeFilter;

    return matchesSearch && matchesDept && matchesLoc && matchesType;
  });

  return (
    <div className="min-h-screen bg-navy-900 text-slate-200 overflow-hidden selection:bg-copper-500/30 selection:text-copper-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-copper-500/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-sm font-medium hover:text-copper-400 transition-colors">Services</Link>
            <Link href="/#about" className="text-sm font-medium hover:text-copper-400 transition-colors">About</Link>
            <Link href="/careers" className="text-sm font-medium hover:text-copper-400 transition-colors">Careers</Link>
            <Link href="/dashboard" className="px-5 py-2.5 rounded-full copper-gradient text-navy-900 font-semibold text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(184,115,51,0.3)]">
              Client Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-navy-700/50 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto mt-12 mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
            >
              Shape the Future of <br/>
              <span className="copper-text-gradient">Fintech & Services</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Join MERAQE and be part of a dynamic team driving innovation in business outsourcing, big data, and corporate solutions.
            </motion.p>
          </div>
        </div>
      </main>

      {/* Benefits Section */}
      <section className="py-24 bg-navy-800/50 relative border-y border-copper-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join <span className="copper-text-gradient">Us</span>?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We invest in our people. Experience a culture that fosters growth, creativity, and excellence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 rounded-2xl border border-copper-500/10 hover:border-copper-500/30 transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-copper-500/10 flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-copper-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 relative" id="open-positions">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Open <span className="copper-text-gradient">Positions</span></h2>
            <p className="text-slate-400 text-center">Find a role that suits your skills and passions.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-copper-500/20 mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search job title, department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-copper-500/50 transition-colors"
              />
            </div>
            <div className="flex gap-4">
              <select 
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-copper-500/50 transition-colors"
              >
                {departments.map(d => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
              </select>
              <select 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-copper-500/50 transition-colors hidden sm:block"
              >
                {locations.map(l => <option key={l} value={l}>{l === 'All' ? 'All Locations' : l}</option>)}
              </select>
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-copper-500/50 transition-colors hidden md:block"
              >
                {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, i) => (
                <motion.div 
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/careers/${job.id}`} className="block">
                    <div className="glass-panel p-6 rounded-2xl border border-copper-500/20 hover:border-copper-500/50 hover:bg-navy-800/80 transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-lg">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-copper-400 transition-colors">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <div className="px-6 py-2.5 rounded-full border border-copper-500 text-copper-400 font-medium group-hover:bg-copper-500 group-hover:text-navy-900 transition-colors w-full sm:w-auto text-center shrink-0 flex items-center justify-center gap-2">
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 glass-panel rounded-2xl border border-copper-500/20">
                <p className="text-slate-400 text-lg">No open positions available matching your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setDepartmentFilter('All'); setLocationFilter('All'); }}
                  className="mt-4 text-copper-400 hover:text-copper-300 underline underline-offset-4"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-slate-400 mb-4">Don&apos;t see a role that fits?</p>
            <Link 
              href="/careers/apply?jobId=general" 
              className="text-copper-400 hover:text-copper-300 font-medium underline underline-offset-4 flex items-center justify-center gap-2 mx-auto"
            >
              Send us your resume
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 py-16 border-t border-copper-500/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <Logo className="mb-6" />
            </Link>
            <p className="text-slate-500 max-w-sm mb-6">
              MERAQE FINTECH AND INFO SERVICES PRIVATE LIMITED. Empowering solutions driving growth.
            </p>
            <p className="text-slate-400 text-sm">
              Nandan vatika, chandrashekhar ward,<br/>
              Bina, MP, India 470113<br/>
              +91 77709 60457
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/#services" className="text-slate-400 hover:text-copper-400 transition-colors">Business Outsourcing</Link></li>
              <li><Link href="/#services" className="text-slate-400 hover:text-copper-400 transition-colors">Digital Marketing</Link></li>
              <li><Link href="/#services" className="text-slate-400 hover:text-copper-400 transition-colors">Big Data Service</Link></li>
              <li><Link href="/#services" className="text-slate-400 hover:text-copper-400 transition-colors">Corporate Solutions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/#about" className="text-slate-400 hover:text-copper-400 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-slate-400 hover:text-copper-400 transition-colors">Careers</Link></li>
              <li><Link href="/#contact" className="text-slate-400 hover:text-copper-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Portal</h4>
            <ul className="space-y-3">
              <li><Link href="/dashboard" className="text-slate-400 hover:text-copper-400 transition-colors">Client Login</Link></li>
              <li><Link href="/dashboard" className="text-slate-400 hover:text-copper-400 transition-colors">Project Dashboard</Link></li>
              <li><Link href="/dashboard/reports" className="text-slate-400 hover:text-copper-400 transition-colors">Reports</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} MERAQE Fintech & Info Services Pvt Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
