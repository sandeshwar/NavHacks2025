'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export default function DNAHelixDemo() {
  const dnaRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (dnaRef.current) {
      dnaRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  // DNA helix parameters
  const height = 6;
  const radius = 1;
  const turns = 3;
  const basePairs = 20;

  interface Base {
    pos1: [number, number, number];
    pos2: [number, number, number];
    color1: string;
    color2: string;
    angle: number;
  }

  const bases: Base[] = [] as Base[];

  for (let i = 0; i < basePairs; i++) {
    const t = i / basePairs;
    const angle = t * turns * Math.PI * 2;
    const y = (t - 0.5) * height;
    
    // Backbone strand 1
    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    
    // Backbone strand 2 (opposite side)
    const x2 = Math.cos(angle + Math.PI) * radius;
    const z2 = Math.sin(angle + Math.PI) * radius;
    
    // Base pair colors (alternating A-T and G-C)
    const isAT = i % 2 === 0;
    const color1 = isAT ? '#22c55e' : '#3b82f6';
    const color2 = isAT ? '#ef4444' : '#fbbf24';
    
    bases.push({
      pos1: [x1, y, z1] as [number, number, number],
      pos2: [x2, y, z2] as [number, number, number],
      color1,
      color2,
      angle
    });
  }

  return (
    <group ref={dnaRef}>
      {/* Base pairs and connections */}
      {bases.map((base, i) => (
        <group key={i}>
          {/* Base 1 */}
          <Sphere args={[0.15, 16, 16]} position={base.pos1}>
            <meshStandardMaterial 
              color={base.color1}
              metalness={0.3}
              roughness={0.4}
            />
          </Sphere>
          
          {/* Base 2 */}
          <Sphere args={[0.15, 16, 16]} position={base.pos2}>
            <meshStandardMaterial 
              color={base.color2}
              metalness={0.3}
              roughness={0.4}
            />
          </Sphere>
          
          {/* Connecting rung */}
          <Cylinder
            args={[0.05, 0.05, radius * 2, 8]}
            position={[0, base.pos1[1], 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <meshStandardMaterial color="#94a3b8" />
          </Cylinder>
          
          {/* Backbone connections */}
          {i < bases.length - 1 && (
            <>
              <Cylinder
                args={[0.08, 0.08, 0.3, 8]}
                position={[
                  (base.pos1[0] + bases[i + 1].pos1[0]) / 2,
                  (base.pos1[1] + bases[i + 1].pos1[1]) / 2,
                  (base.pos1[2] + bases[i + 1].pos1[2]) / 2
                ]}
                rotation={[
                  0,
                  0,
                  Math.atan2(
                    bases[i + 1].pos1[1] - base.pos1[1],
                    bases[i + 1].pos1[0] - base.pos1[0]
                  )
                ]}
              >
                <meshStandardMaterial color="#8b5cf6" />
              </Cylinder>
              
              <Cylinder
                args={[0.08, 0.08, 0.3, 8]}
                position={[
                  (base.pos2[0] + bases[i + 1].pos2[0]) / 2,
                  (base.pos2[1] + bases[i + 1].pos2[1]) / 2,
                  (base.pos2[2] + bases[i + 1].pos2[2]) / 2
                ]}
                rotation={[
                  0,
                  0,
                  Math.atan2(
                    bases[i + 1].pos2[1] - base.pos2[1],
                    bases[i + 1].pos2[0] - base.pos2[0]
                  )
                ]}
              >
                <meshStandardMaterial color="#8b5cf6" />
              </Cylinder>
            </>
          )}
        </group>
      ))}
    </group>
  );
}
