'use client';

import { useState, useEffect } from 'react';
import { Sphere, Cylinder, Torus } from '@react-three/drei';
import { Info, Lightbulb } from 'lucide-react';

export default function BiochemistryDemo() {
  const [selectedStructure, setSelectedStructure] = useState<'dna' | 'protein' | 'glucose'>('dna');

  // DNA Double Helix Structure
  const DNAHelix = () => {
    const helixPoints: Array<{ pos1: [number, number, number]; pos2: [number, number, number] }> = [];
    const segments = 40;
    const radius = 1.5;
    const height = 6;

    for (let i = 0; i < segments; i++) {
      const angle1 = (i / segments) * Math.PI * 4;
      const angle2 = angle1 + Math.PI;
      const y = (i / segments) * height - height / 2;

      helixPoints.push({
        pos1: [Math.cos(angle1) * radius, y, Math.sin(angle1) * radius] as [number, number, number],
        pos2: [Math.cos(angle2) * radius, y, Math.sin(angle2) * radius] as [number, number, number],
      });
    }

    return (
      <group>
        {helixPoints.map((point, i) => (
          <group key={i}>
            {/* Backbone sphere 1 */}
            <Sphere args={[0.15, 16, 16]} position={point.pos1}>
              <meshStandardMaterial color="#3b82f6" metalness={0.4} roughness={0.3} />
            </Sphere>
            {/* Backbone sphere 2 */}
            <Sphere args={[0.15, 16, 16]} position={point.pos2}>
              <meshStandardMaterial color="#3b82f6" metalness={0.4} roughness={0.3} />
            </Sphere>
            
            {/* Base pairs (every 3rd segment) */}
            {i % 3 === 0 && (
              <>
                <Cylinder
                  args={[0.08, 0.08, radius * 2, 8]}
                  position={[0, point.pos1[1], 0]}
                  rotation={[0, 0, Math.PI / 2]}
                >
                  <meshStandardMaterial color="#ec4899" />
                </Cylinder>
                
                {/* Base pair atoms */}
                <Sphere args={[0.2, 16, 16]} position={[0, point.pos1[1], 0]}>
                  <meshStandardMaterial color="#f59e0b" metalness={0.5} roughness={0.2} />
                </Sphere>
              </>
            )}

            {/* Connecting backbone */}
            {i < helixPoints.length - 1 && (
              <>
                <Cylinder
                  args={[0.06, 0.06, 0.3, 8]}
                  position={[
                    (point.pos1[0] + helixPoints[i + 1].pos1[0]) / 2,
                    (point.pos1[1] + helixPoints[i + 1].pos1[1]) / 2,
                    (point.pos1[2] + helixPoints[i + 1].pos1[2]) / 2,
                  ]}
                  rotation={[Math.PI / 2, 0, (i / segments) * Math.PI * 4]}
                >
                  <meshStandardMaterial color="#60a5fa" />
                </Cylinder>
              </>
            )}
          </group>
        ))}
      </group>
    );
  };

  // Protein Structure (Alpha Helix)
  const ProteinHelix = () => {
    const points: [number, number, number][] = [];
    const segments = 30;
    const radius = 1;
    const height = 5;

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 3;
      const y = (i / segments) * height - height / 2;
      points.push([Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number]);
    }

    return (
      <group>
        {points.map((point, i) => (
          <group key={i}>
            <Sphere args={[0.25, 16, 16]} position={point}>
              <meshStandardMaterial 
                color={i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#ec4899' : '#10b981'} 
                metalness={0.5} 
                roughness={0.3} 
              />
            </Sphere>
            
            {i < points.length - 1 && (
              <Cylinder
                args={[0.1, 0.1, 0.4, 8]}
                position={[
                  (point[0] + points[i + 1][0]) / 2,
                  (point[1] + points[i + 1][1]) / 2,
                  (point[2] + points[i + 1][2]) / 2,
                ]}
              >
                <meshStandardMaterial color="#64748b" />
              </Cylinder>
            )}
          </group>
        ))}
        
        {/* Torus to show circular structure */}
        <Torus args={[radius, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#475569" transparent opacity={0.2} />
        </Torus>
      </group>
    );
  };

  // Glucose Molecule (C6H12O6)
  const GlucoseMolecule = () => {
    // Ring structure positions
    const ringRadius = 1.2;
    const carbonPositions: [number, number, number][] = [
      [ringRadius, 0, 0],
      [ringRadius * Math.cos(Math.PI / 3), ringRadius * Math.sin(Math.PI / 3), 0],
      [ringRadius * Math.cos(2 * Math.PI / 3), ringRadius * Math.sin(2 * Math.PI / 3), 0],
      [-ringRadius * Math.cos(Math.PI / 3), ringRadius * Math.sin(2 * Math.PI / 3), 0],
      [-ringRadius, 0, 0],
      [-ringRadius * Math.cos(Math.PI / 3), -ringRadius * Math.sin(Math.PI / 3), 0],
    ];

    return (
      <group>
        {/* Carbon atoms in ring */}
        {carbonPositions.map((pos, i) => (
          <group key={`carbon-${i}`}>
            <Sphere args={[0.3, 16, 16]} position={pos}>
              <meshStandardMaterial color="#1f2937" metalness={0.4} roughness={0.3} />
            </Sphere>
            
            {/* Bonds */}
            {i < carbonPositions.length - 1 && (
              <Cylinder
                args={[0.08, 0.08, 1.2, 8]}
                position={[
                  (pos[0] + carbonPositions[i + 1][0]) / 2,
                  (pos[1] + carbonPositions[i + 1][1]) / 2,
                  0,
                ]}
                rotation={[0, 0, Math.atan2(
                  carbonPositions[i + 1][1] - pos[1],
                  carbonPositions[i + 1][0] - pos[0]
                )]}
              >
                <meshStandardMaterial color="#94a3b8" />
              </Cylinder>
            )}
            
            {/* Hydrogen atoms */}
            <Sphere args={[0.15, 16, 16]} position={[pos[0] * 1.5, pos[1] * 1.5, 0]}>
              <meshStandardMaterial color="#f8fafc" metalness={0.3} roughness={0.4} />
            </Sphere>
            
            {/* Hydroxyl groups (OH) */}
            {i !== 4 && (
              <Sphere args={[0.2, 16, 16]} position={[pos[0] * 1.3, pos[1] * 1.3, 0.8]}>
                <meshStandardMaterial color="#ef4444" metalness={0.5} roughness={0.3} />
              </Sphere>
            )}
          </group>
        ))}
        
        {/* Close the ring */}
        <Cylinder
          args={[0.08, 0.08, 1.2, 8]}
          position={[
            (carbonPositions[5][0] + carbonPositions[0][0]) / 2,
            (carbonPositions[5][1] + carbonPositions[0][1]) / 2,
            0,
          ]}
          rotation={[0, 0, Math.atan2(
            carbonPositions[0][1] - carbonPositions[5][1],
            carbonPositions[0][0] - carbonPositions[5][0]
          )]}
        >
          <meshStandardMaterial color="#94a3b8" />
        </Cylinder>
      </group>
    );
  };

  return (
    <group>
      {selectedStructure === 'dna' && <DNAHelix />}
      {selectedStructure === 'protein' && <ProteinHelix />}
      {selectedStructure === 'glucose' && <GlucoseMolecule />}
      
      {/* Info Panel - This would be overlaid in the actual UI */}
      <group position={[0, -4, 0]}>
        <mesh>
          <planeGeometry args={[8, 1.5]} />
          <meshBasicMaterial color="#0f172a" opacity={0.9} transparent />
        </mesh>
      </group>
    </group>
  );
}

// Export info component to be used alongside the 3D viewer
export function BiochemistryInfo() {
  const [selectedStructure, setSelectedStructure] = useState<'dna' | 'protein' | 'glucose'>('dna');

  const structureInfo = {
    dna: {
      name: 'DNA Double Helix',
      description: 'Deoxyribonucleic acid stores genetic information in a double helix structure with complementary base pairs.',
      realWorld: [
        'Genetic testing and personalized medicine',
        'Crime scene forensics and paternity tests',
        'CRISPR gene editing technology',
        'Development of mRNA vaccines',
      ],
      funFact: 'If you unraveled all the DNA in your body, it would stretch about 10 billion miles - enough to go from Earth to Pluto and back!',
    },
    protein: {
      name: 'Protein Alpha Helix',
      description: 'Proteins are made of amino acids folded into specific 3D structures. The alpha helix is one of the most common structural motifs.',
      realWorld: [
        'Enzyme catalysis in drug metabolism',
        'Antibody production for immune response',
        'Muscle contraction (actin and myosin)',
        'Hemoglobin oxygen transport',
      ],
      funFact: 'Your body contains about 100,000 different types of proteins, and they make up about 20% of your body weight!',
    },
    glucose: {
      name: 'Glucose Molecule',
      description: 'Glucose (C₆H₁₂O₆) is a simple sugar and the primary energy source for cells. It exists in a ring structure in solution.',
      realWorld: [
        'Blood sugar monitoring in diabetes management',
        'Sports drinks for rapid energy delivery',
        'IV glucose solutions in hospitals',
        'Cellular respiration and ATP production',
      ],
      funFact: 'Your brain uses about 20% of your body\'s glucose, even though it only makes up 2% of your body weight!',
    },
  };

  const current = structureInfo[selectedStructure];

  return (
    <div className="mt-6 space-y-4">
      {/* Structure Selector */}
      <div className="flex gap-2">
        {Object.keys(structureInfo).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedStructure(key as 'dna' | 'protein' | 'glucose')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedStructure === key
                ? 'bg-accent-primary text-white'
                : 'bg-tertiary text-primary hover:bg-secondary'
            }`}
          >
            {structureInfo[key as keyof typeof structureInfo].name}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="bg-secondary rounded-lg p-4 border border-primary">
        <div className="flex items-start gap-3 mb-3">
          <Info className="w-5 h-5 text-accent-secondary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-primary mb-2">{current.name}</h3>
            <p className="text-secondary text-sm leading-relaxed">
              {current.description}
            </p>
          </div>
        </div>
      </div>

      {/* Real-World Applications */}
      <div className="bg-secondary rounded-lg p-4 border border-primary">
        <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-warning" />
          Real-World Applications
        </h4>
        <ul className="space-y-2">
          {current.realWorld.map((app, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-secondary">
              <span className="text-success flex-shrink-0">✓</span>
              <span>{app}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Fun Fact */}
      <div className="bg-accent-primary/20 rounded-lg p-4 border border-accent-primary/30">
        <p className="text-sm text-accent-secondary">
          <span className="font-semibold">💡 Did You Know?</span> {current.funFact}
        </p>
      </div>
    </div>
  );
}
