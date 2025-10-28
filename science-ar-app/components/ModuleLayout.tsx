'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Beaker } from 'lucide-react';
import { ReactNode } from 'react';

interface ModuleLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  accentColor: string;
}

export default function ModuleLayout({ 
  title, 
  subtitle, 
  children,
  accentColor
}: ModuleLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Beaker className="w-6 h-6" style={{ color: accentColor }} />
            <span className="text-xl font-bold text-white">{title}</span>
          </div>
          
          <Link 
            href="/"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6 pb-4 border-b border-slate-800">
          <h1 className="text-3xl font-bold text-white mb-2">
            {title}
          </h1>
          <p className="text-slate-400">{subtitle}</p>
        </div>
        
        {children}
      </div>
    </div>
  );
}
