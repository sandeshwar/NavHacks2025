'use client';

import { useState } from 'react';
import ModuleLayout from '@/components/ModuleLayout';
import InteractiveCard from '@/components/InteractiveCard';
import Scene3D from '@/components/Scene3D';
import { Atom, FlaskConical, Sparkles, Grid3x3 } from 'lucide-react';
import WaterMoleculeDemo from './demos/WaterMoleculeDemo';
import ChemicalReactionDemo from './demos/ChemicalReactionDemo';
import CrystalStructureDemo from './demos/CrystalStructureDemo';
import PeriodicTableDemo from './demos/PeriodicTableDemo';

type DemoType = 'water' | 'reaction' | 'crystal' | 'periodic' | null;

export default function ChemistryPage() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('water');

  const demos = [
    {
      id: 'water' as DemoType,
      title: 'Water Molecule (H₂O)',
      description: 'Explore molecular structure and bonds',
      icon: <Atom className="w-6 h-6 text-purple-400" />,
      component: WaterMoleculeDemo
    },
    {
      id: 'reaction' as DemoType,
      title: 'Chemical Reaction',
      description: 'Watch atoms rearrange in real-time',
      icon: <FlaskConical className="w-6 h-6 text-pink-400" />,
      component: ChemicalReactionDemo
    },
    {
      id: 'crystal' as DemoType,
      title: 'Crystal Structure',
      description: 'Visualize atomic lattice patterns',
      icon: <Grid3x3 className="w-6 h-6 text-violet-400" />,
      component: CrystalStructureDemo
    },
    {
      id: 'periodic' as DemoType,
      title: 'Periodic Table 3D',
      description: 'Interactive element visualization',
      icon: <Sparkles className="w-6 h-6 text-fuchsia-400" />,
      component: PeriodicTableDemo
    }
  ];

  const ActiveComponent = demos.find(d => d.id === activeDemo)?.component;

  return (
    <ModuleLayout
      title="Chemistry Lab"
      subtitle="Visualize molecules and reactions in 3D"
      accentColor="#ef4444"
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
