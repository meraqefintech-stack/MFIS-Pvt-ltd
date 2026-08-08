'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '@/components/logo';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  Bell, 
  Menu, 
  X,
  LogOut,
  WifiOff,
  UserCircle,
  Users,
  Briefcase
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/dashboard/leads', icon: Users },
  { name: 'Pipeline', href: '/dashboard/pipeline', icon: FolderKanban },
  { name: 'Recruitment', href: '/dashboard/recruitment', icon: Briefcase },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const pathname = usePathname();
  const notifications = useAppStore(state => state.notifications);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    const timer = setTimeout(() => setIsOffline(!navigator.onLine), 0);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-navy-900 text-slate-200 flex flex-col md:flex-row selection:bg-copper-500/30 selection:text-copper-100">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 glass-panel border-r border-copper-500/20 sticky top-0 h-screen shrink-0">
        <div className="p-6 border-b border-copper-500/10">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-copper-500/10 text-copper-400 border border-copper-500/20 shadow-[inset_0_0_20px_rgba(184,115,51,0.05)]' 
                    : 'text-slate-400 hover:bg-navy-800 hover:text-slate-200'
                }`}>
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-copper-500/10">
          <Link href="/">
            <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 cursor-pointer rounded-xl hover:bg-navy-800 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Exit to Website</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 glass-panel border-b border-copper-500/20 sticky top-0 z-50">
        <Logo />
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-300">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-navy-900 md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-copper-500/20">
              <Logo />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-300">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 py-6 px-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-copper-500/10 text-copper-400 border border-copper-500/20' 
                        : 'text-slate-400'
                    }`}>
                      <item.icon className="w-6 h-6" />
                      <span className="font-medium text-lg">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 hidden md:flex items-center justify-between px-8 glass-panel border-b border-copper-500/10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold capitalize">
              {pathname.split('/').pop() || 'Overview'}
            </h1>
            {isOffline && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                <WifiOff className="w-3 h-3" />
                Offline Mode - Syncing Paused
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-full hover:bg-navy-800 transition-colors text-slate-400 hover:text-copper-400"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-copper-500 border-2 border-navy-900"></span>
                )}
              </button>
              
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 glass-panel border border-copper-500/20 rounded-2xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-copper-500/10 flex justify-between items-center bg-navy-900">
                      <h3 className="font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto bg-navy-900/90">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-slate-400 text-sm text-center">No notifications</div>
                      ) : (
                        notifications.map((n, i) => (
                          <div key={i} className="p-4 border-b border-copper-500/5 hover:bg-navy-800/50 cursor-pointer transition-colors">
                            <h4 className="text-sm font-medium text-slate-200">{n.title}</h4>
                            <p className="text-xs text-slate-400 mt-1">{n.customer} - {n.service}</p>
                            <span className="text-[10px] text-copper-500 mt-2 block">{new Date(n.time).toLocaleString()}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 pl-6 border-l border-copper-500/20">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-medium text-slate-200">Admin User</p>
                <p className="text-xs text-copper-400">SUPER ADMIN</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-copper-500/20 flex items-center justify-center border border-copper-500/30">
                <UserCircle className="w-6 h-6 text-copper-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
