'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative flex items-center justify-center w-16 h-16 shrink-0">
        <Image 
          src="/logo.png"
          alt="MERAQE Logo"
          fill
          className="object-contain"
          referrerPolicy="no-referrer"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-wider text-white leading-tight">
          MERAQE
        </span>
        <span className="text-[0.65rem] tracking-[0.2em] copper-text-gradient uppercase font-medium leading-none whitespace-nowrap">
          Fintech & Info
        </span>
      </div>
    </motion.div>
  );
}
