'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { seedServices } from '@/lib/seed';

export function LeadForm({ initialService = '', onClose }: { initialService?: string, onClose?: () => void }) {
  const addLead = useAppStore(state => state.addLead);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [leadRef, setLeadRef] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    mobile: '',
    email: '',
    service: initialService,
    city: '',
    businessType: '',
    estimatedRequirement: '',
    preferredContact: 'Phone',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required.';
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile Number is required.';
    } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.service) newErrors.service = 'Service is required.';
    
    if (formData.message && formData.message.length < 10) {
      newErrors.message = 'Please provide a slightly more detailed message.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const ref = addLead({
      ...formData,
      source: 'Website Form'
    });
    
    setLeadRef(ref);
    setIsSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="glass-panel p-8 rounded-2xl border border-copper-500/20 text-center max-w-lg w-full mx-auto relative overflow-hidden">
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full" />
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-slate-300 mb-6">Your enquiry has been successfully submitted.<br/>Our team will contact you shortly.</p>
        
        <div className="bg-navy-900/50 rounded-xl p-4 mb-8 border border-copper-500/10">
          <p className="text-sm text-slate-400 mb-1">Lead Reference ID</p>
          <p className="text-xl font-mono text-copper-400 font-bold">{leadRef}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onClose && (
            <button onClick={onClose} className="px-6 py-3 rounded-full border border-copper-500 text-copper-400 font-medium hover:bg-copper-500 hover:text-navy-900 transition-colors">
              Back to Services
            </button>
          )}
          <button className="px-6 py-3 rounded-full copper-gradient text-navy-900 font-bold hover:shadow-[0_0_20px_rgba(184,115,51,0.4)] transition-all">
            Talk to Our Team
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-copper-500/20 max-w-2xl w-full mx-auto relative">
      {onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-navy-900/50 rounded-full transition-colors z-10">
          <X className="w-5 h-5" />
        </button>
      )}
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Request a Consultation</h3>
        <p className="text-slate-400">Fill out the form below and our fintech experts will get back to you.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full bg-navy-900/50 border ${errors.fullName ? 'border-rose-500/50' : 'border-copper-500/20'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-copper-500/50 transition-colors`}
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-rose-400 text-xs mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Company Name *</label>
            <input 
              type="text" 
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full bg-navy-900/50 border ${errors.companyName ? 'border-rose-500/50' : 'border-copper-500/20'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-copper-500/50 transition-colors`}
              placeholder="Acme Corp"
            />
            {errors.companyName && <p className="text-rose-400 text-xs mt-1">{errors.companyName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Mobile Number *</label>
            <input 
              type="tel" 
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full bg-navy-900/50 border ${errors.mobile ? 'border-rose-500/50' : 'border-copper-500/20'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-copper-500/50 transition-colors`}
              placeholder="+91 98765 43210"
            />
            {errors.mobile && <p className="text-rose-400 text-xs mt-1">{errors.mobile}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-navy-900/50 border ${errors.email ? 'border-rose-500/50' : 'border-copper-500/20'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-copper-500/50 transition-colors`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">Service Required *</label>
            <select 
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full bg-navy-900/50 border ${errors.service ? 'border-rose-500/50' : 'border-copper-500/20'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-copper-500/50 transition-colors appearance-none`}
            >
              <option value="" disabled>Select a service</option>
              {seedServices.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
            {errors.service && <p className="text-rose-400 text-xs mt-1">{errors.service}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">City / Location</label>
            <input 
              type="text" 
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-navy-900/50 border border-copper-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-copper-500/50 transition-colors"
              placeholder="Mumbai"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Business Type</label>
            <input 
              type="text" 
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full bg-navy-900/50 border border-copper-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-copper-500/50 transition-colors"
              placeholder="e.g. Fintech Startup"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Estimated Requirement</label>
            <input 
              type="text" 
              name="estimatedRequirement"
              value={formData.estimatedRequirement}
              onChange={handleChange}
              className="w-full bg-navy-900/50 border border-copper-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-copper-500/50 transition-colors"
              placeholder="e.g. 50 Seats / SEO Campaign"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Contact Method</label>
            <select 
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handleChange}
              className="w-full bg-navy-900/50 border border-copper-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-copper-500/50 transition-colors appearance-none"
            >
              <option value="Phone">Phone Call</option>
              <option value="Email">Email</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`w-full bg-navy-900/50 border ${errors.message ? 'border-rose-500/50' : 'border-copper-500/20'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-copper-500/50 transition-colors`}
              placeholder="Tell us a bit more about your requirements..."
            />
            {errors.message && <p className="text-rose-400 text-xs mt-1">{errors.message}</p>}
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl copper-gradient text-navy-900 font-bold text-lg hover:shadow-[0_0_20px_rgba(184,115,51,0.3)] transition-all flex items-center justify-center disabled:opacity-70"
        >
          {isSubmitting ? (
            <><Loader2 className="w-6 h-6 animate-spin mr-2" /> Processing...</>
          ) : (
            'Submit Request'
          )}
        </button>
      </form>
    </div>
  );
}
