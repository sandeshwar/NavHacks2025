'use client';

import { useState, useEffect } from 'react';
import ModuleLayout from '@/components/ModuleLayout';
import InteractiveCard from '@/components/InteractiveCard';
import Scene3D from '@/components/Scene3D';
import AchievementsPanel from '@/components/AchievementsPanel';
import { Atom, FlaskConical, Sparkles, Grid3x3, Leaf, Dna, Beaker, Target } from 'lucide-react';
import WaterMoleculeDemo from './demos/WaterMoleculeDemo';
import ChemicalReactionDemo from './demos/ChemicalReactionDemo';
import CrystalStructureDemo from './demos/CrystalStructureDemo';
import PeriodicTableDemo from './demos/PeriodicTableDemo';
import PhotosynthesisDemo from './demos/PhotosynthesisDemo';
import BiochemistryDemo, { BiochemistryInfo } from './demos/BiochemistryDemo';
import OrganicChemistryDemo, { OrganicChemistryInfo } from './demos/OrganicChemistryDemo';
import ChallengesDemo from './demos/ChallengesDemo';
import { getProgressTracker } from '@/utils/progressTracker';

type DemoType = 'water' | 'reaction' | 'crystal' | 'periodic' | 'photosynthesis' | 'biochemistry' | 'organic' | 'challenges' | null;

export default function ChemistryPage() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('water');

  // Track module visits and time spent
  useEffect(() => {
    if (activeDemo) {
      const tracker = getProgressTracker();
      tracker.visitModule(activeDemo);

      const startTime = Date.now();
      return () => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        tracker.addTimeSpent(activeDemo, timeSpent);
      };
    }
  }, [activeDemo]);

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
    },
    {
      id: 'photosynthesis' as DemoType,
      title: 'Photosynthesis Process',
      description: 'Animated cause-effect infographic',
      icon: <Leaf className="w-6 h-6 text-green-400" />,
      component: PhotosynthesisDemo
    },
    {
      id: 'biochemistry' as DemoType,
      title: 'Biochemistry',
      description: 'DNA, proteins, and biological molecules',
      icon: <Dna className="w-6 h-6 text-blue-400" />,
      component: BiochemistryDemo
    },
    {
      id: 'organic' as DemoType,
      title: 'Organic Chemistry',
      description: 'Functional groups and organic structures',
      icon: <Beaker className="w-6 h-6 text-emerald-400" />,
      component: OrganicChemistryDemo
    },
    {
      id: 'challenges' as DemoType,
      title: 'Challenges',
      description: 'Test your chemistry knowledge',
      icon: <Target className="w-6 h-6 text-orange-400" />,
      component: ChallengesDemo
    }
  ];

  const ActiveComponent = demos.find(d => d.id === activeDemo)?.component;
  const cameraPosition: [number, number, number] = activeDemo === 'periodic' ? [0, 0, 9] : [0, 0, 8];
  
  // Check if current demo is 2D (no 3D viewer needed)
  const is2DDemo = activeDemo === 'photosynthesis' || activeDemo === 'challenges';
  
  // Check if current demo has info component
  const hasInfoComponent = activeDemo === 'biochemistry' || activeDemo === 'organic';

  return (
    <ModuleLayout
      title="Chemistry Lab"
      subtitle="Visualize molecules and reactions in 3D"
      accentColor="#ef4444"
    >
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - 1 column */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-lg font-semibold text-primary mb-3">Experiments</h2>
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
          <div className="bg-secondary rounded-lg border border-primary overflow-hidden" style={{ height: '800px' }}>
            {is2DDemo ? (
              ActiveComponent && <ActiveComponent />
            ) : (
              <Scene3D cameraPosition={cameraPosition}>
                {ActiveComponent && <ActiveComponent />}
              </Scene3D>
            )}
          </div>
          
          {/* Controls Info */}
          {!is2DDemo && (
            <div className="mt-4 p-3 bg-secondary rounded-lg border border-primary">
              <p className="text-secondary text-sm">
                <strong className="text-primary">Controls:</strong> Left-click + drag to rotate • Right-click + drag to pan • Scroll to zoom
              </p>
            </div>
          )}

          {/* Real-World Applications Info */}
          {hasInfoComponent && activeDemo === 'biochemistry' && <BiochemistryInfo />}
          {hasInfoComponent && activeDemo === 'organic' && <OrganicChemistryInfo />}
        </div>
      </div>
      
      {/* Achievements Panel */}
      <AchievementsPanel />
    </ModuleLayout>
  );
}
