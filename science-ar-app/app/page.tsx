'use client';

import Link from 'next/link';
import { Atom, Dna, Zap, ArrowRight, Beaker } from 'lucide-react';

export default function Home() {
  const subjects = [
    {
      title: 'Physics',
      description: 'Explore forces, motion, electricity, and quantum mechanics in 3D',
      icon: Zap,
      color: '#3b82f6',
      href: '/physics'
    },
    {
      title: 'Chemistry',
      description: 'Visualize molecular structures, reactions, and periodic table in AR',
      icon: Atom,
      color: '#ef4444',
      href: '/chemistry'
    },
    {
      title: 'Biology',
      description: 'Discover cells, DNA, organs, and ecosystems interactively',
      icon: Dna,
      color: '#22c55e',
      href: '/biology'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header Bar */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Beaker className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-white">ScienceAR Lab</h1>
          </div>
          <div className="text-sm text-slate-400">Interactive Science Simulations</div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-6">
            Advanced Scientific Visualization Platform
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            Explore complex scientific concepts through interactive 3D simulations and augmented reality. 
            Built for students, educators, and researchers.
          </p>
        </div>

        {/* Subject Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Link
                key={subject.title}
                href={subject.href}
                className="group relative overflow-hidden rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300"
              >
                <div className="p-8">
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${subject.color}15` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: subject.color }} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {subject.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {subject.description}
                  </p>
                  
                  <div className="flex items-center text-slate-300 font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Launch Module
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
                
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: subject.color }}
                />
              </Link>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">12+</div>
            <div className="text-slate-400">Interactive Simulations</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">3D/AR</div>
            <div className="text-slate-400">Real-time Rendering</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">WebGL</div>
            <div className="text-slate-400">Hardware Accelerated</div>
          </div>
        </div>
      </div>
    </div>
  );
}
