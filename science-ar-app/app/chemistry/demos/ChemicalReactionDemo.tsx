'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function ChemicalReactionDemo() {
  const [reactionProgress, setReactionProgress] = useState(0);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Animate reaction progress
    setReactionProgress((prev) => {
      const next = prev + delta * 0.3;
      return next > 2 ? 0 : next;
    });

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  // H2 + O2 -> H2O reaction visualization
  const phase = reactionProgress < 1 ? reactionProgress : 2 - reactionProgress;
  
  // Reactants positions (left side)
  const h2_1_pos: [number, number, number] = [
    -3 + phase * 1.5,
    0.5,
    0
  ];
  const h2_2_pos: [number, number, number] = [
    -3 + phase * 1.5,
    -0.5,
    0
  ];
  const o2_pos: [number, number, number] = [
    -2 + phase * 1.5,
    0,
    0
  ];

  // Product position (right side)
  const productOpacity = phase > 0.7 ? (phase - 0.7) / 0.3 : 0;

  return (
    <group ref={groupRef}>
      {/* Reactants - becoming transparent as reaction progresses */}
      <group>
        {/* H2 molecule 1 */}
        <Sphere args={[0.3, 32, 32]} position={h2_1_pos}>
          <meshStandardMaterial 
            color="#f8fafc" 
            transparent
            opacity={1 - phase}
          />
        </Sphere>
        <Sphere args={[0.3, 32, 32]} position={[h2_1_pos[0] + 0.5, h2_1_pos[1], 0]}>
          <meshStandardMaterial 
            color="#f8fafc" 
            transparent
            opacity={1 - phase}
          />
        </Sphere>

        {/* H2 molecule 2 */}
        <Sphere args={[0.3, 32, 32]} position={h2_2_pos}>
          <meshStandardMaterial 
            color="#f8fafc" 
            transparent
            opacity={1 - phase}
          />
        </Sphere>
        <Sphere args={[0.3, 32, 32]} position={[h2_2_pos[0] + 0.5, h2_2_pos[1], 0]}>
          <meshStandardMaterial 
            color="#f8fafc" 
            transparent
            opacity={1 - phase}
          />
        </Sphere>

        {/* O2 molecule */}
        <Sphere args={[0.4, 32, 32]} position={o2_pos}>
          <meshStandardMaterial 
            color="#ef4444" 
            transparent
            opacity={1 - phase}
          />
        </Sphere>
        <Sphere args={[0.4, 32, 32]} position={[o2_pos[0] + 0.6, o2_pos[1], 0]}>
          <meshStandardMaterial 
            color="#ef4444" 
            transparent
            opacity={1 - phase}
          />
        </Sphere>
      </group>

      {/* Products - H2O molecules appearing */}
      <group>
        {/* Water molecule 1 */}
        <group position={[1, 0.6, 0]}>
          <Sphere args={[0.4, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color="#ef4444" 
              transparent
              opacity={productOpacity}
            />
          </Sphere>
          <Sphere args={[0.25, 32, 32]} position={[0.5, 0.3, 0]}>
            <meshStandardMaterial 
              color="#f8fafc" 
              transparent
              opacity={productOpacity}
            />
          </Sphere>
          <Sphere args={[0.25, 32, 32]} position={[-0.5, 0.3, 0]}>
            <meshStandardMaterial 
              color="#f8fafc" 
              transparent
              opacity={productOpacity}
            />
          </Sphere>
        </group>

        {/* Water molecule 2 */}
        <group position={[1, -0.6, 0]}>
          <Sphere args={[0.4, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color="#ef4444" 
              transparent
              opacity={productOpacity}
            />
          </Sphere>
          <Sphere args={[0.25, 32, 32]} position={[0.5, 0.3, 0]}>
            <meshStandardMaterial 
              color="#f8fafc" 
              transparent
              opacity={productOpacity}
            />
          </Sphere>
          <Sphere args={[0.25, 32, 32]} position={[-0.5, 0.3, 0]}>
            <meshStandardMaterial 
              color="#f8fafc" 
              transparent
              opacity={productOpacity}
            />
          </Sphere>
        </group>
      </group>

      {/* Energy visualization */}
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#fbbf24" 
          emissive="#fbbf24"
          emissiveIntensity={phase}
          transparent
          opacity={phase * 0.5}
        />
      </Sphere>
    </group>
  );
}
