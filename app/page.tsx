'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Logo } from '@/components/logo';
import { 
  BarChart3, 
  Briefcase, 
  Megaphone, 
  Network, 
  Database, 
  Users, 
  Building2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';
import { seedServices } from '@/lib/seed';

const IconMap: Record<string, any> = {
  Briefcase, Network, Globe2, Megaphone, Database, Users, Building2
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-slate-200 overflow-hidden selection:bg-copper-500/30 selection:text-copper-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-copper-500/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm font-medium hover:text-copper-400 transition-colors">Services</Link>
            <Link href="#about" className="text-sm font-medium hover:text-copper-400 transition-colors">About</Link>
            <Link href="/careers" className="text-sm font-medium hover:text-copper-400 transition-colors">Careers</Link>
            <Link href="/dashboard" className="px-5 py-2.5 rounded-full copper-gradient text-navy-900 font-semibold text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(184,115,51,0.3)]">
              Client Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 relative">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-navy-700/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mt-20">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Professional Excellence in <br/>
              <span className="copper-text-gradient">Fintech & Services</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Empowering businesses through cutting-edge outsourcing, big data intelligence, and innovative corporate solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full copper-gradient text-navy-900 font-bold text-lg hover:shadow-[0_0_30px_rgba(184,115,51,0.5)] transition-all flex items-center justify-center gap-2">
                Access Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#services" className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel font-medium text-lg hover:bg-navy-800 transition-all flex items-center justify-center gap-2 border border-copper-500/30">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Services Section */}
      <section id="services" className="py-24 bg-navy-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core <span className="copper-text-gradient">Services</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Comprehensive solutions designed to accelerate your business growth and operational efficiency.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seedServices.map((service, i) => {
              const Icon = IconMap[service.iconName];
              return (
                <Link href={`/services/${service.slug}`} key={service.id}>
                  <div className="glass-panel p-8 rounded-2xl hover:bg-navy-800/80 transition-all group border border-copper-500/10 hover:border-copper-500/40 transform hover:-translate-y-1 h-full flex flex-col cursor-pointer">
                    <div className="w-14 h-14 rounded-xl bg-navy-800 flex items-center justify-center mb-6 group-hover:bg-copper-500/10 transition-colors">
                      {Icon && <Icon className="w-7 h-7 text-copper-400" />}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{service.name}</h3>
                    <p className="text-slate-400 leading-relaxed flex-1">{service.shortDescription}</p>
                    <div className="mt-6 flex items-center gap-2 text-copper-400 font-medium group-hover:text-copper-300 transition-colors">
                      Explore Service <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust/Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-800/50 skew-y-3 transform origin-bottom-left" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose <span className="copper-text-gradient">MERAQE</span>?</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We integrate advanced analytics, secure infrastructure, and industry expertise to deliver unparalleled results for our corporate partners.
            </p>
            <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: 'Secure & Compliant', desc: 'Enterprise-grade security and role-based access control.' },
                { icon: BarChart3, title: 'Real-time Analytics', desc: 'Interactive dashboards and automated reporting.' },
                { icon: Zap, title: 'Seamless Integration', desc: 'Connects effortlessly with popular CRM platforms.' },
              ].map((feat, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full glass-panel flex flex-shrink-0 items-center justify-center border-copper-500/20">
                    <feat.icon className="w-6 h-6 text-copper-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{feat.title}</h4>
                    <p className="text-slate-400">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="glass-panel p-8 rounded-3xl border border-copper-500/30 shadow-[0_0_50px_rgba(184,115,51,0.1)] relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-copper-500/20 rounded-full blur-xl" />
              <div className="space-y-4">
                <div className="h-2 w-1/3 bg-copper-500/40 rounded-full mb-8" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-navy-900/50">
                    <div className="w-10 h-10 rounded-full bg-copper-500/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-copper-400" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-3/4 bg-slate-700 rounded-full" />
                      <div className="h-2 w-1/2 bg-slate-800 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 py-16 border-t border-copper-500/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-6" />
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
              <li><Link href="#" className="text-slate-400 hover:text-copper-400 transition-colors">Business Outsourcing</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-copper-400 transition-colors">Digital Marketing</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-copper-400 transition-colors">Big Data Service</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-copper-400 transition-colors">Corporate Solutions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#about" className="text-slate-400 hover:text-copper-400 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-slate-400 hover:text-copper-400 transition-colors">Careers</Link></li>
              <li><Link href="#contact" className="text-slate-400 hover:text-copper-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Portal</h4>
            <ul className="space-y-3">
              <li><Link href="/dashboard" className="text-slate-400 hover:text-copper-400 transition-colors">Client Login</Link></li>
              <li><Link href="/dashboard" className="text-slate-400 hover:text-copper-400 transition-colors">Project Dashboard</Link></li>
              <li><Link href="/dashboard" className="text-slate-400 hover:text-copper-400 transition-colors">Reports</Link></li>
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
