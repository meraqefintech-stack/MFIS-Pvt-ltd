import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Briefcase, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/logo';
import { jobs } from '@/lib/jobs';

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const job = jobs.find((j) => j.id === resolvedParams.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-navy-900 text-slate-200 selection:bg-copper-500/30 selection:text-copper-100">
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

      <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <Link href="/careers" className="inline-flex items-center gap-2 text-copper-400 hover:text-copper-300 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Careers
        </Link>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-copper-500/20 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-copper-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">{job.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-300 mb-8 relative z-10">
            <span className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-copper-400" />
              {job.department}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-copper-400" />
              {job.location}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-copper-400" />
              {job.type}
            </span>
          </div>

          <Link 
            href={`/careers/apply?jobId=${job.id}`}
            className="inline-block px-8 py-3 rounded-full copper-gradient text-navy-900 font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(184,115,51,0.3)] relative z-10"
          >
            Apply for this Position
          </Link>
        </div>

        <div className="space-y-12 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <p>{job.description}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Key Responsibilities</h2>
            <ul className="space-y-3">
              {job.responsibilities.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-copper-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Key Skills</h2>
            <div className="flex flex-wrap gap-3">
              {job.skills.map((skill, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-navy-800 border border-copper-500/20 text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
            <ul className="space-y-3">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-copper-400 shrink-0 mt-2.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Benefits</h2>
            <ul className="space-y-3">
              {job.benefits.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-copper-400 shrink-0 mt-2.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Career Growth</h2>
            <p>{job.careerGrowth}</p>
          </section>
        </div>

        <div className="mt-16 text-center border-t border-copper-500/20 pt-12">
          <Link 
            href={`/careers/apply?jobId=${job.id}`}
            className="inline-block px-10 py-4 rounded-full copper-gradient text-navy-900 font-bold text-lg hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(184,115,51,0.4)]"
          >
            Apply Now &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
