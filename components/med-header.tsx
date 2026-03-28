'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
}

export function MedHeader({ title }: HeaderProps) {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center font-bold text-white">MR+</div>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          
        </div>

        
      </div>
    </header>
  );
}
