'use client';

import { useState } from 'react';
import { Sphere, Cylinder } from '@react-three/drei';
import { Info, Lightbulb } from 'lucide-react';

export default function OrganicChemistryDemo() {
  const [selectedMolecule, setSelectedMolecule] = useState<'methane' | 'ethanol' | 'benzene'>('methane');

  // Methane (CH4) - Tetrahedral structure
  const MethaneMolecule = () => {
    const tetrahedralAngle = Math.acos(-1/3); // ~109.47 degrees
    const bondLength = 1.2;

    const hydrogenPositions: [number, number, number][] = [
      [0, bondLength, 0],
      [
        bondLength * Math.sin(tetrahedralAngle),
        -bondLength * Math.cos(tetrahedralAngle) / 3,
        0
      ],
      [
        -bondLength * Math.sin(tetrahedralAngle) * Math.cos(Math.PI / 6),
        -bondLength * Math.cos(tetrahedralAngle) / 3,
        bondLength * Math.sin(tetrahedralAngle) * Math.sin(Math.PI / 6)
      ],
      [
        -bondLength * Math.sin(tetrahedralAngle) * Math.cos(Math.PI / 6),
        -bondLength * Math.cos(tetrahedralAngle) / 3,
        -bondLength * Math.sin(tetrahedralAngle) * Math.sin(Math.PI / 6)
      ]
    ];

    return (
      <group>
        {/* Carbon atom (black) */}
        <Sphere args={[0.4, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1f2937" metalness={0.4} roughness={0.3} />
        </Sphere>

        {/* Hydrogen atoms and bonds */}
        {hydrogenPositions.map((pos, i) => (
          <group key={i}>
            <Sphere args={[0.25, 32, 32]} position={pos}>
              <meshStandardMaterial color="#f8fafc" metalness={0.3} roughness={0.4} />
            </Sphere>
            <Cylinder
              args={[0.08, 0.08, bondLength, 8]}
              position={[pos[0] / 2, pos[1] / 2, pos[2] / 2]}
              rotation={[
                Math.atan2(Math.sqrt(pos[0] ** 2 + pos[2] ** 2), pos[1]),
                0,
                Math.atan2(pos[2], pos[0])
              ]}
            >
              <meshStandardMaterial color="#94a3b8" />
            </Cylinder>
          </group>
        ))}
      </group>
    );
  };

  // Ethanol (C2H5OH) - Alcohol functional group
  const EthanolMolecule = () => {
    const bondLength = 1.2;
    
    return (
      <group>
        {/* Carbon 1 */}
        <Sphere args={[0.35, 32, 32]} position={[-1.2, 0, 0]}>
          <meshStandardMaterial color="#1f2937" metalness={0.4} roughness={0.3} />
        </Sphere>

        {/* Carbon 2 */}
        <Sphere args={[0.35, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1f2937" metalness={0.4} roughness={0.3} />
        </Sphere>

        {/* Oxygen (OH group) */}
        <Sphere args={[0.3, 32, 32]} position={[1.2, 0, 0]}>
          <meshStandardMaterial color="#ef4444" metalness={0.5} roughness={0.3} />
        </Sphere>

        {/* Hydrogen on OH */}
        <Sphere args={[0.2, 32, 32]} position={[2.0, 0.5, 0]}>
          <meshStandardMaterial color="#f8fafc" metalness={0.3} roughness={0.4} />
        </Sphere>

        {/* Hydrogen atoms on Carbon 1 (3H) */}
        {[
          [-2.0, 0.8, 0],
          [-1.8, -0.4, 0.7],
          [-1.8, -0.4, -0.7]
        ].map((pos, i) => (
          <Sphere key={`h1-${i}`} args={[0.2, 32, 32]} position={pos as [number, number, number]}>
            <meshStandardMaterial color="#f8fafc" metalness={0.3} roughness={0.4} />
          </Sphere>
        ))}

        {/* Hydrogen atoms on Carbon 2 (2H) */}
        {[
          [0, 0.8, 0.8],
          [0, 0.8, -0.8]
        ].map((pos, i) => (
          <Sphere key={`h2-${i}`} args={[0.2, 32, 32]} position={pos as [number, number, number]}>
            <meshStandardMaterial color="#f8fafc" metalness={0.3} roughness={0.4} />
          </Sphere>
        ))}

        {/* Bonds */}
        {/* C-C bond */}
        <Cylinder
          args={[0.08, 0.08, 1.2, 8]}
          position={[-0.6, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial color="#94a3b8" />
        </Cylinder>

        {/* C-O bond */}
        <Cylinder
          args={[0.08, 0.08, 1.2, 8]}
          position={[0.6, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial color="#94a3b8" />
        </Cylinder>

        {/* O-H bond */}
        <Cylinder
          args={[0.06, 0.06, 0.9, 8]}
          position={[1.6, 0.25, 0]}
          rotation={[0, 0, -Math.PI / 6]}
        >
          <meshStandardMaterial color="#94a3b8" />
        </Cylinder>

        {/* Highlight OH functional group */}
        <mesh position={[1.6, 0, 0]}>
          <ringGeometry args={[0.6, 0.8, 32]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.2} />
        </mesh>
      </group>
    );
  };

  // Benzene (C6H6) - Aromatic ring
  const BenzeneMolecule = () => {
    const ringRadius = 1.4;
    const positions: [number, number, number][] = [];

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      positions.push([
        Math.cos(angle) * ringRadius,
        Math.sin(angle) * ringRadius,
        0
      ]);
    }

    return (
      <group>
        {/* Carbon atoms in ring */}
        {positions.map((pos, i) => (
          <group key={`carbon-${i}`}>
            <Sphere args={[0.35, 32, 32]} position={pos}>
              <meshStandardMaterial color="#1f2937" metalness={0.4} roughness={0.3} />
            </Sphere>

            {/* Hydrogen atoms */}
            <Sphere 
              args={[0.2, 32, 32]} 
              position={[pos[0] * 1.5, pos[1] * 1.5, 0] as [number, number, number]}
            >
              <meshStandardMaterial color="#f8fafc" metalness={0.3} roughness={0.4} />
            </Sphere>

            {/* Single bonds */}
            {i < positions.length - 1 && (
              <Cylinder
                args={[0.08, 0.08, 1.4, 8]}
                position={[
                  (pos[0] + positions[i + 1][0]) / 2,
                  (pos[1] + positions[i + 1][1]) / 2,
                  i % 2 === 0 ? 0.05 : -0.05
                ]}
                rotation={[0, 0, Math.atan2(
                  positions[i + 1][1] - pos[1],
                  positions[i + 1][0] - pos[0]
                )]}
              >
                <meshStandardMaterial color={i % 2 === 0 ? '#94a3b8' : '#64748b'} />
              </Cylinder>
            )}

            {/* Double bonds (alternating) */}
            {i % 2 === 0 && i < positions.length - 1 && (
              <Cylinder
                args={[0.06, 0.06, 1.4, 8]}
                position={[
                  (pos[0] + positions[i + 1][0]) / 2,
                  (pos[1] + positions[i + 1][1]) / 2,
                  -0.15
                ]}
                rotation={[0, 0, Math.atan2(
                  positions[i + 1][1] - pos[1],
                  positions[i + 1][0] - pos[0]
                )]}
              >
                <meshStandardMaterial color="#64748b" />
              </Cylinder>
            )}
          </group>
        ))}

        {/* Close the ring */}
        <Cylinder
          args={[0.08, 0.08, 1.4, 8]}
          position={[
            (positions[5][0] + positions[0][0]) / 2,
            (positions[5][1] + positions[0][1]) / 2,
            0.05
          ]}
          rotation={[0, 0, Math.atan2(
            positions[0][1] - positions[5][1],
            positions[0][0] - positions[5][0]
          )]}
        >
          <meshStandardMaterial color="#64748b" />
        </Cylinder>

        {/* Aromatic ring indicator */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ringRadius * 0.6, ringRadius * 0.8, 64]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.1} />
        </mesh>
      </group>
    );
  };

  return (
    <group>
      {selectedMolecule === 'methane' && <MethaneMolecule />}
      {selectedMolecule === 'ethanol' && <EthanolMolecule />}
      {selectedMolecule === 'benzene' && <BenzeneMolecule />}
    </group>
  );
}

// Export info component
export function OrganicChemistryInfo() {
  const [selectedMolecule, setSelectedMolecule] = useState<'methane' | 'ethanol' | 'benzene'>('methane');

  const moleculeInfo = {
    methane: {
      name: 'Methane (CH₄)',
      description: 'The simplest organic molecule with a tetrahedral structure. Carbon forms four single bonds with hydrogen atoms at 109.5° angles.',
      realWorld: [
        'Natural gas for heating and cooking',
        'Fuel for electricity generation',
        'Production of hydrogen for fuel cells',
        'Chemical feedstock for plastics and fertilizers',
      ],
      funFact: 'Methane is 25 times more potent as a greenhouse gas than CO₂, making it important to monitor emissions from natural gas operations and agriculture!',
    },
    ethanol: {
      name: 'Ethanol (C₂H₅OH)',
      description: 'An alcohol with a hydroxyl (-OH) functional group attached to a carbon chain. This functional group determines its chemical properties.',
      realWorld: [
        'Alcoholic beverages and spirits',
        'Hand sanitizers and disinfectants',
        'Biofuel and fuel additive (E85, E10)',
        'Solvent in pharmaceuticals and cosmetics',
      ],
      funFact: 'The same enzyme (alcohol dehydrogenase) that breaks down drinking alcohol in your liver can also metabolize methanol - this is why ethanol is used as an antidote for methanol poisoning!',
    },
    benzene: {
      name: 'Benzene (C₆H₆)',
      description: 'A fundamental aromatic compound with a planar hexagonal ring. The delocalized electrons create resonance stability, making it less reactive than expected.',
      realWorld: [
        'Production of plastics (polystyrene, nylon)',
        'Synthesis of drugs and dyes',
        'Manufacture of detergents and pesticides',
        'Gasoline additive for octane rating',
      ],
      funFact: 'German chemist August Kekulé discovered benzene\'s ring structure in 1865 after having a dream about a snake eating its own tail (ouroboros)!',
    },
  };

  const current = moleculeInfo[selectedMolecule];

  return (
    <div className="mt-6 space-y-4">
      {/* Molecule Selector */}
      <div className="flex gap-2">
        {Object.keys(moleculeInfo).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedMolecule(key as 'methane' | 'ethanol' | 'benzene')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedMolecule === key
                ? 'bg-[#27ae60] text-white'
                : 'bg-[#f0f0f0] text-[#2d2d2d] hover:bg-[#e0e0e0] dark:bg-[#2a2a2a] dark:text-[#f0f0f0] dark:hover:bg-[#374151]'
            }`}
          >
            {moleculeInfo[key as keyof typeof moleculeInfo].name}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="bg-[#f8f8f8] rounded-lg p-4 border border-[#e0e0e0] dark:bg-[#1e1e1e] dark:border-[#374151]">
        <div className="flex items-start gap-3 mb-3">
          <Info className="w-5 h-5 text-[#34495e] flex-shrink-0 mt-0.5 dark:text-[#cbd5e0]" />
          <div>
            <h3 className="font-semibold text-[#2d2d2d] mb-2 dark:text-[#f0f0f0]">{current.name}</h3>
            <p className="text-[#555555] text-sm leading-relaxed dark:text-[#cccccc]">
              {current.description}
            </p>
          </div>
        </div>
      </div>

      {/* Real-World Applications */}
      <div className="bg-[#f8f8f8] rounded-lg p-4 border border-[#e0e0e0] dark:bg-[#1e1e1e] dark:border-[#374151]">
        <h4 className="font-semibold text-[#2d2d2d] mb-3 flex items-center gap-2 dark:text-[#f0f0f0]">
          <Lightbulb className="w-5 h-5 text-[#f39c12]" />
          Real-World Applications
        </h4>
        <ul className="space-y-2">
          {current.realWorld.map((app, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-[#555555] dark:text-[#cccccc]">
              <span className="text-[#27ae60] flex-shrink-0">✓</span>
              <span>{app}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Fun Fact */}
      <div className="bg-[#27ae60]/20 rounded-lg p-4 border border-[#27ae60]/30 dark:bg-[#10b981]/20 dark:border-[#10b981]/30">
        <p className="text-sm text-[#27ae60] dark:text-[#10b981]">
          <span className="font-semibold">💡 Did You Know?</span> {current.funFact}
        </p>
      </div>
    </div>
  );
}
