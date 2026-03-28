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
            <img
              src="/favicon.png"
              alt="Logo"
              className="w-16 h-16 object-contain"
            />
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
