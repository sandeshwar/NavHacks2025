'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

export default function CellStructureDemo() {
  const cellRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cellRef.current) {
      cellRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={cellRef}>
      {/* Cell membrane */}
      <Sphere args={[3, 64, 64]}>
        <meshStandardMaterial 
          color="#a855f7"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Nucleus */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#3b82f6"
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Nucleolus */}
      <Sphere args={[0.4, 32, 32]} position={[0.3, 0.2, 0]}>
        <meshStandardMaterial 
          color="#1e40af"
          metalness={0.4}
          roughness={0.3}
        />
      </Sphere>

      {/* Mitochondria */}
      {[
        [1.5, 0.5, 1],
        [-1.5, -0.5, -1],
        [1, -1, 0.5]
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <Sphere args={[0.4, 32, 32]} scale={[1.5, 0.8, 0.8]}>
            <meshStandardMaterial 
              color="#ef4444"
              metalness={0.4}
              roughness={0.3}
            />
          </Sphere>
          {/* Inner membrane folds */}
          {[0, 1, 2].map((j) => (
            <mesh 
              key={j} 
              position={[-0.3 + j * 0.3, 0, 0]} 
              rotation={[0, 0, Math.PI / 2]}
            >
              <planeGeometry args={[0.3, 0.1]} />
              <meshStandardMaterial color="#7f1d1d" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Endoplasmic Reticulum */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 1.8;
        return (
          <Torus
            key={i}
            args={[0.3, 0.08, 16, 32]}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.5,
              Math.sin(angle) * radius
            ]}
            rotation={[angle, angle * 0.5, 0]}
          >
            <meshStandardMaterial 
              color="#22c55e"
              metalness={0.3}
              roughness={0.4}
            />
          </Torus>
        );
      })}

      {/* Ribosomes (small dots) */}
      {Array.from({ length: 30 }, (_, i) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 2.5 + Math.random() * 0.3;
        
        return (
          <Sphere
            key={i}
            args={[0.08, 8, 8]}
            position={[
              r * Math.sin(phi) * Math.cos(theta),
              r * Math.sin(phi) * Math.sin(theta),
              r * Math.cos(phi)
            ]}
          >
            <meshStandardMaterial 
              color="#fbbf24"
              metalness={0.5}
              roughness={0.3}
            />
          </Sphere>
        );
      })}

      {/* Golgi Apparatus */}
      <group position={[-1.2, 0.8, 0]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0, i * 0.15, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.8, 0.05, 0.6]} />
            <meshStandardMaterial 
              color="#ec4899"
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
