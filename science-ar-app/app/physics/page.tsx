'use client';

import { useState } from 'react';
import ModuleLayout from '@/components/ModuleLayout';
import InteractiveCard from '@/components/InteractiveCard';
import Scene3D from '@/components/Scene3D';
import { Orbit, Waves, Magnet, Zap, Scale } from 'lucide-react';
import PendulumDemo from './demos/PendulumDemo';
import WaveDemo from './demos/WaveDemo';
import MagneticFieldDemo from './demos/MagneticFieldDemo';
import ElectricCircuitDemo from './demos/ElectricCircuitDemo';
import NewtonLawsDemo from './demos/NewtonLawsDemo';

type DemoType = 'pendulum' | 'wave' | 'magnetic' | 'circuit' | 'newton' | null;

export default function PhysicsPage() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('pendulum');

  const demos = [
    {
      id: 'pendulum' as DemoType,
      title: 'Pendulum Motion',
      description: 'Explore simple harmonic motion and energy conservation',
      icon: <Orbit className="w-6 h-6 text-blue-400" />,
      component: PendulumDemo
    },
    {
      id: 'wave' as DemoType,
      title: 'Wave Mechanics',
      description: 'Visualize wave propagation, frequency, and amplitude',
      icon: <Waves className="w-6 h-6 text-cyan-400" />,
      component: WaveDemo
    },
    {
      id: 'magnetic' as DemoType,
      title: 'Magnetic Fields',
      description: 'See magnetic field lines and force interactions',
      icon: <Magnet className="w-6 h-6 text-purple-400" />,
      component: MagneticFieldDemo
    },
    {
      id: 'circuit' as DemoType,
      title: 'Electric Circuit',
      description: 'Understand current flow and Ohm\'s law',
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      component: ElectricCircuitDemo
    },
    {
      id: 'newton' as DemoType,
      title: 'Newton\'s Laws',
      description: 'Animated cause-effect infographic',
      icon: <Scale className="w-6 h-6 text-orange-400" />,
      component: NewtonLawsDemo
    }
  ];

  const ActiveComponent = demos.find(d => d.id === activeDemo)?.component;

  return (
    <ModuleLayout
      title="Physics Lab"
      subtitle="Interactive 3D physics simulations"
      accentColor="#3b82f6"
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

        {/* 3D Viewer / 2D Infographic - 3 columns */}
        <div className="lg:col-span-3">
          <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden" style={{ height: '700px' }}>
            {activeDemo === 'newton' ? (
              ActiveComponent && <ActiveComponent />
            ) : (
              <Scene3D cameraPosition={[0, 2, 8]}>
                {ActiveComponent && <ActiveComponent />}
              </Scene3D>
            )}
          </div>
          
          {/* Controls Info */}
          {activeDemo !== 'newton' && (
            <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-800">
              <p className="text-slate-400 text-sm">
                <strong className="text-white">Controls:</strong> Left-click + drag to rotate • Right-click + drag to pan • Scroll to zoom
              </p>
            </div>
          )}
        </div>
      </div>
    </ModuleLayout>
  );
}
