'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { seedServices } from '@/lib/seed';
import { LeadForm } from '@/components/lead-form';
import { Logo } from '@/components/logo';
import { 
  Briefcase, Network, Globe2, Megaphone, Database, Users, Building2,
  CheckCircle2, ArrowRight, ChevronDown, ChevronUp
} from 'lucide-react';

const IconMap: Record<string, any> = {
  Briefcase, Network, Globe2, Megaphone, Database, Users, Building2
};

export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const service = seedServices.find(s => s.slug === resolvedParams.slug);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!service) {
    return notFound();
  }

  const Icon = IconMap[service.iconName];

  return (
    <div className="min-h-screen bg-navy-900 text-slate-200 selection:bg-copper-500/30 selection:text-copper-100">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-copper-500/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-sm font-medium hover:text-copper-400 transition-colors">Services</Link>
            <button onClick={() => setIsFormOpen(true)} className="px-5 py-2.5 rounded-full copper-gradient text-navy-900 font-semibold text-sm hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 relative border-b border-copper-500/10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="w-16 h-16 rounded-2xl bg-copper-500/10 flex items-center justify-center mb-6 border border-copper-500/20">
              {Icon && <Icon className="w-8 h-8 text-copper-400" />}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              {service.name}
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="px-8 py-4 rounded-full copper-gradient text-navy-900 font-bold text-lg hover:shadow-[0_0_30px_rgba(184,115,51,0.5)] transition-all flex items-center justify-center"
              >
                Request a Consultation
              </button>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="px-8 py-4 rounded-full glass-panel border border-copper-500/30 text-white font-medium text-lg hover:bg-navy-800 transition-all flex items-center justify-center"
              >
                Talk to Our Team
              </button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md hidden md:block">
             <div className="glass-panel p-8 rounded-3xl border border-copper-500/30 relative aspect-square flex flex-col items-center justify-center text-center">
                <div className="absolute inset-0 bg-copper-500/5 rounded-3xl" />
                {Icon && <Icon className="w-32 h-32 text-copper-400/50 mb-6" />}
                <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-slate-400">Enterprise Grade Solution</p>
             </div>
          </div>
        </div>
      </main>

      {/* Key Functions */}
      <section className="py-24 bg-navy-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Key <span className="copper-text-gradient">Functions</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.functions.map((func, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl border border-copper-500/10">
                <h4 className="text-xl font-semibold text-white mb-3">{func.title}</h4>
                <p className="text-slate-400">{func.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow & Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-white">How It <span className="copper-text-gradient">Works</span></h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-copper-500/30 before:to-transparent">
              {service.workflow.map((step, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border border-copper-500/30 bg-navy-900 text-copper-400 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(184,115,51,0.2)] z-10 ml-0 md:ml-auto">
                    {i + 1}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-panel p-5 rounded-xl border border-copper-500/10">
                    <h4 className="text-lg font-medium text-white">{step}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-8 text-white">Core <span className="copper-text-gradient">Benefits</span></h2>
            <div className="space-y-4">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-4 p-5 glass-panel rounded-xl border border-copper-500/10">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-lg text-slate-300">{benefit}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
               <h3 className="text-xl font-bold mb-4 text-white">Target Industries</h3>
               <div className="flex flex-wrap gap-3">
                 {service.industries.map((ind, i) => (
                   <span key={i} className="px-4 py-2 rounded-full border border-copper-500/20 text-copper-400 bg-copper-500/5 text-sm font-medium">
                     {ind}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-navy-800/30 border-y border-copper-500/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Frequently Asked <span className="copper-text-gradient">Questions</span></h2>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div key={i} className="glass-panel border border-copper-500/20 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-semibold text-lg text-white">{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-copper-400" /> : <ChevronDown className="w-5 h-5 text-copper-400" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-slate-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative text-center">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to accelerate your business?</h2>
          <p className="text-xl text-slate-400 mb-10">Get in touch with our experts to discuss your requirements and discover how our solutions can drive your growth.</p>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="px-10 py-5 rounded-full copper-gradient text-navy-900 font-bold text-xl hover:shadow-[0_0_40px_rgba(184,115,51,0.6)] transition-all inline-flex items-center gap-3"
          >
            Request a Consultation <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-2xl my-8 relative"
            >
              <LeadForm initialService={service.name} onClose={() => setIsFormOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
