'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function CrystalStructureDemo() {
  const crystalRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      crystalRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // Create cubic crystal lattice (NaCl structure)
  const latticeSize = 3;
  const spacing = 1.2;
  const atoms: Array<{ pos: [number, number, number]; type: 'Na' | 'Cl' }> = [];

  for (let x = 0; x < latticeSize; x++) {
    for (let y = 0; y < latticeSize; y++) {
      for (let z = 0; z < latticeSize; z++) {
        const position: [number, number, number] = [
          (x - latticeSize / 2 + 0.5) * spacing,
          (y - latticeSize / 2 + 0.5) * spacing,
          (z - latticeSize / 2 + 0.5) * spacing
        ];
        
        // Alternate Na and Cl atoms
        const isNa = (x + y + z) % 2 === 0;
        atoms.push({ pos: position, type: isNa ? 'Na' : 'Cl' });
      }
    }
  }

  // Create bonds between adjacent atoms
  const bonds: Array<[[number, number, number], [number, number, number]]> = [];
  atoms.forEach((atom1, i) => {
    atoms.forEach((atom2, j) => {
      if (i < j) {
        const dist = Math.sqrt(
          Math.pow(atom1.pos[0] - atom2.pos[0], 2) +
          Math.pow(atom1.pos[1] - atom2.pos[1], 2) +
          Math.pow(atom1.pos[2] - atom2.pos[2], 2)
        );
        if (dist < spacing * 1.1) {
          bonds.push([atom1.pos, atom2.pos]);
        }
      }
    });
  });

  return (
    <group ref={crystalRef}>
      {/* Atoms */}
      {atoms.map((atom, index) => (
        <Sphere 
          key={index} 
          args={[0.3, 32, 32]} 
          position={atom.pos}
        >
          <meshStandardMaterial 
            color={atom.type === 'Na' ? '#a855f7' : '#22c55e'}
            metalness={0.5}
            roughness={0.3}
          />
        </Sphere>
      ))}

      {/* Bonds */}
      {bonds.map((bond, index) => (
        <Line
          key={index}
          points={bond}
          color="#64748b"
          lineWidth={2}
          opacity={0.5}
          transparent
        />
      ))}

      {/* Unit cell outline */}
      <Line
        points={[
          [-spacing * 1.5, -spacing * 1.5, -spacing * 1.5],
          [spacing * 1.5, -spacing * 1.5, -spacing * 1.5],
          [spacing * 1.5, spacing * 1.5, -spacing * 1.5],
          [-spacing * 1.5, spacing * 1.5, -spacing * 1.5],
          [-spacing * 1.5, -spacing * 1.5, -spacing * 1.5],
          [-spacing * 1.5, -spacing * 1.5, spacing * 1.5],
          [spacing * 1.5, -spacing * 1.5, spacing * 1.5],
          [spacing * 1.5, spacing * 1.5, spacing * 1.5],
          [-spacing * 1.5, spacing * 1.5, spacing * 1.5],
          [-spacing * 1.5, -spacing * 1.5, spacing * 1.5]
        ]}
        color="#fbbf24"
        lineWidth={3}
        opacity={0.6}
        transparent
      />
    </group>
  );
}
