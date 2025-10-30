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
          ? 'bg-secondary border-accent-primary shadow-lg shadow-accent-primary/20' 
          : 'bg-tertiary border-primary hover:bg-secondary hover:border-secondary'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded ${isActive ? 'bg-accent-primary/20' : 'bg-tertiary'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-primary mb-1">{title}</h3>
          <p className="text-secondary text-xs leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  );
}
