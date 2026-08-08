'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Logo } from '@/components/logo';
import { ArrowLeft, CheckCircle2, Upload, File, X, Loader2 } from 'lucide-react';
import { jobs } from '@/lib/jobs';

function ApplyForm() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
  
  const isGeneral = jobId === 'general' || !jobId;
  const targetJob = isGeneral ? null : jobs.find(j => j.id === jobId);

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    qualification: '',
    totalExperience: '',
    relevantExperience: '',
    previousCompany: '',
    currentDesignation: '',
    expectedSalary: '',
    noticePeriod: '',
    positionAppliedFor: targetJob?.title || '',
    department: targetJob?.department || '',
    location: targetJob?.location || '',
    coverLetter: '',
    linkedin: '',
    portfolio: ''
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  useEffect(() => {
    if (targetJob) {
      setFormData(prev => ({
        ...prev,
        positionAppliedFor: targetJob.title,
        department: targetJob.department,
        location: targetJob.location
      }));
    }
  }, [targetJob]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setResumeError('Please upload a valid PDF, DOC, or DOCX file.');
      setResumeFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setResumeError('File size must be less than 10MB.');
      setResumeFile(null);
      return;
    }

    setResumeError('');
    setResumeFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setResumeError('Please upload your resume.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate App ID
    const prefix = isGeneral ? 'GEN' : 'APP';
    const year = new Date().getFullYear();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newAppId = `${prefix}-${year}-${randomNum}`;
    
    setApplicationId(newAppId);
    
    // Save to localStorage as a mock DB for HR dashboard
    const applications = JSON.parse(localStorage.getItem('meraqe_applications') || '[]');
    applications.push({
      id: newAppId,
      ...formData,
      resumeName: resumeFile.name,
      status: 'NEW',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('meraqe_applications', JSON.stringify(applications));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="glass-panel p-8 md:p-12 rounded-3xl border border-copper-500/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-copper-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      {isSuccess ? (
        <div className="text-center py-12 relative z-10">
          <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Application Submitted Successfully!</h1>
          <p className="text-slate-300 text-lg mb-8">Thank you for your interest in joining our team.</p>
          
          <div className="bg-navy-800 border border-copper-500/20 p-6 rounded-xl inline-block mb-12">
            <p className="text-sm text-slate-400 mb-1">Your Application ID is:</p>
            <p className="text-2xl font-mono font-bold text-copper-400">{applicationId}</p>
          </div>
          
          <p className="text-slate-400 mb-8">Please keep this ID for future reference.</p>
          
          <Link 
            href="/careers"
            className="inline-block px-8 py-3 rounded-full border border-copper-500 text-copper-400 font-medium hover:bg-copper-500 hover:text-navy-900 transition-colors"
          >
            Return to Careers
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
          <div className="mb-10 border-b border-copper-500/20 pb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isGeneral ? "General Application" : `Apply for ${targetJob?.title}`}
            </h1>
            <p className="text-slate-400">Please fill out the form below to submit your application.</p>
          </div>

          {/* Personal Details */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Mobile Number *</label>
                <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Current City *</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
              </div>
            </div>
          </section>

          {/* Professional Details */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6">Professional Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Highest Qualification *</label>
                <input required type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Total Experience (Years) *</label>
                <input required type="number" step="0.5" min="0" name="totalExperience" value={formData.totalExperience} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Relevant Experience (Years)</label>
                <input type="number" step="0.5" min="0" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Current/Previous Company</label>
                <input type="text" name="previousCompany" value={formData.previousCompany} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Current Designation</label>
                <input type="text" name="currentDesignation" value={formData.currentDesignation} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Expected Salary</label>
                <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Notice Period</label>
                <select name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none">
                  <option value="">Select Notice Period</option>
                  <option value="Immediate">Immediate</option>
                  <option value="15 Days">15 Days</option>
                  <option value="1 Month">1 Month</option>
                  <option value="2 Months">2 Months</option>
                  <option value="3 Months">3 Months</option>
                </select>
              </div>
            </div>
          </section>

          {/* Role Details */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6">Application Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isGeneral ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Role *</label>
                    <input required type="text" name="positionAppliedFor" value={formData.positionAppliedFor} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Department *</label>
                    <input required type="text" name="department" value={formData.department} onChange={handleChange} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Position Applied For</label>
                    <input type="text" readOnly value={formData.positionAppliedFor} className="w-full bg-navy-800 border border-slate-700 rounded-xl py-3 px-4 text-slate-400 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Department</label>
                    <input type="text" readOnly value={formData.department} className="w-full bg-navy-800 border border-slate-700 rounded-xl py-3 px-4 text-slate-400 cursor-not-allowed" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                    <input type="text" readOnly value={formData.location} className="w-full bg-navy-800 border border-slate-700 rounded-xl py-3 px-4 text-slate-400 cursor-not-allowed" />
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Resume & Links */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6">Documents & Links</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Resume Upload * (PDF, DOC, DOCX up to 10MB)</label>
              {!resumeFile ? (
                <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center hover:border-copper-500/50 transition-colors bg-navy-900/50">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300 font-medium mb-2">Click or drag file to upload</p>
                  <input 
                    type="file" 
                    required 
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between bg-navy-800 border border-copper-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <File className="w-6 h-6 text-copper-400 shrink-0" />
                    <span className="text-white truncate">{resumeFile.name}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setResumeFile(null)}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              {resumeError && <p className="text-red-400 text-sm mt-2">{resumeError}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn Profile (Optional)</label>
                <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Portfolio/Other Link (Optional)</label>
                <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="https://..." className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Cover Letter / Message (Optional)</label>
              <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows={4} className="w-full bg-navy-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-copper-500/50 outline-none resize-none" />
            </div>
          </section>

          <div className="pt-8 border-t border-copper-500/20 text-center">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full copper-gradient text-navy-900 font-bold text-lg hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(184,115,51,0.4)] disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-slate-200">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-copper-500/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/careers" className="text-sm font-medium hover:text-copper-400 transition-colors">Careers</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <Link href="/careers" className="inline-flex items-center gap-2 text-copper-400 hover:text-copper-300 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-copper-400" /></div>}>
          <ApplyForm />
        </Suspense>
      </main>
    </div>
  );
}
