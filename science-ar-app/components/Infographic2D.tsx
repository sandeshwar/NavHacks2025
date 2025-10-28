'use client';

import { ReactNode } from 'react';

interface Infographic2DProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Infographic2D({ children, title, description }: Infographic2DProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50 p-8">
      {title && (
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          {description && (
            <p className="text-slate-400 text-sm">{description}</p>
          )}
        </div>
      )}
      <div className="flex-1 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
