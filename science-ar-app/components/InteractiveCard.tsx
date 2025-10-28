'use client';

import { ReactNode } from 'react';

interface InteractiveCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

export default function InteractiveCard({ 
  title, 
  description, 
  icon, 
  onClick,
  isActive = false 
}: InteractiveCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
        isActive 
          ? 'bg-slate-800 border-blue-500 shadow-lg shadow-blue-500/20' 
          : 'bg-slate-900 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded ${isActive ? 'bg-blue-500/20' : 'bg-slate-800'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
          <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  );
}
