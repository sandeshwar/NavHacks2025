'use client';

import { useState } from 'react';
import ModuleLayout from '@/components/ModuleLayout';
import InteractiveCard from '@/components/InteractiveCard';
import Scene3D from '@/components/Scene3D';
import { Dna, Heart, Microscope, Leaf } from 'lucide-react';
import DNAHelixDemo from './demos/DNAHelixDemo';
import CellStructureDemo from './demos/CellStructureDemo';
import HeartDemo from './demos/HeartDemo';
import PhotosynthesisDemo from './demos/PhotosynthesisDemo';

type DemoType = 'dna' | 'cell' | 'heart' | 'photosynthesis' | null;

export default function BiologyPage() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('dna');

  const demos = [
    {
      id: 'dna' as DemoType,
      title: 'DNA Double Helix',
      description: 'Explore genetic code structure',
      icon: <Dna className="w-6 h-6 text-green-400" />,
      component: DNAHelixDemo
    },
    {
      id: 'cell' as DemoType,
      title: 'Cell Structure',
      description: 'Discover organelles and their functions',
      icon: <Microscope className="w-6 h-6 text-emerald-400" />,
      component: CellStructureDemo
    },
    {
      id: 'heart' as DemoType,
      title: 'Human Heart',
      description: 'Understand cardiovascular system',
      icon: <Heart className="w-6 h-6 text-red-400" />,
      component: HeartDemo
    },
    {
      id: 'photosynthesis' as DemoType,
      title: 'Photosynthesis',
      description: 'See how plants convert light to energy',
      icon: <Leaf className="w-6 h-6 text-lime-400" />,
      component: PhotosynthesisDemo
    }
  ];

  const ActiveComponent = demos.find(d => d.id === activeDemo)?.component;

  return (
    <ModuleLayout
      title="Biology Lab"
      subtitle="Explore life sciences in 3D"
      accentColor="#22c55e"
    >
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - 1 column */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-lg font-semibold text-white mb-3">Experiments</h2>
          {demos.map((demo) => (
            <InteractiveCard
              key={demo.id}
              title={demo.title}
              description={demo.description}
              icon={demo.icon}
              onClick={() => setActiveDemo(demo.id)}
              isActive={activeDemo === demo.id}
            />
          ))}
        </div>

        {/* 3D Viewer - 3 columns */}
        <div className="lg:col-span-3">
          <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden" style={{ height: '700px' }}>
            <Scene3D cameraPosition={[0, 0, 8]}>
              {ActiveComponent && <ActiveComponent />}
            </Scene3D>
          </div>
          
          {/* Controls Info */}
          <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-800">
            <p className="text-slate-400 text-sm">
              <strong className="text-white">Controls:</strong> Left-click + drag to rotate • Right-click + drag to pan • Scroll to zoom
            </p>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
