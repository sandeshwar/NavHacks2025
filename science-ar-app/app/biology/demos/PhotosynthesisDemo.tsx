'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Cone } from '@react-three/drei';
import * as THREE from 'three';

export default function PhotosynthesisDemo() {
  const leafRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((prev) => prev + delta);
    
    if (leafRef.current) {
      leafRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  // Photosynthesis: CO2 + H2O + Light -> Glucose + O2
  const flowPhase = (time * 0.5) % 1;

  return (
    <group ref={leafRef}>
      {/* Leaf structure */}
      <mesh rotation={[-Math.PI / 6, 0, 0]}>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial 
          color="#22c55e"
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>

      {/* Leaf veins */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <Cylinder
          key={i}
          args={[0.02, 0.02, 2, 8]}
          position={[x, 0, 0]}
          rotation={[Math.PI / 3, 0, 0]}
        >
          <meshStandardMaterial color="#15803d" />
        </Cylinder>
      ))}

      {/* Sun (light source) */}
      <group position={[0, 3, 0]}>
        <Sphere args={[0.5, 32, 32]}>
          <meshStandardMaterial 
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={1}
          />
        </Sphere>
        
        {/* Light rays */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <Cylinder
              key={i}
              args={[0.05, 0.02, 1, 8]}
              position={[
                Math.cos(angle) * 0.8,
                0,
                Math.sin(angle) * 0.8
              ]}
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <meshStandardMaterial 
                color="#fef08a"
                emissive="#fef08a"
                emissiveIntensity={0.5}
                transparent
                opacity={0.6}
              />
            </Cylinder>
          );
        })}
      </group>

      {/* CO2 molecules (input - top left) */}
      <group position={[-2, 2, 0]}>
        {[0, 1, 2].map((i) => (
          <group 
            key={i} 
            position={[
              0,
              2 - flowPhase * 2 - i * 0.5,
              0
            ]}
          >
            {/* Carbon (gray) */}
            <Sphere args={[0.15, 16, 16]}>
              <meshStandardMaterial 
                color="#64748b"
                transparent
                opacity={1 - flowPhase}
              />
            </Sphere>
            {/* Oxygen atoms (red) */}
            <Sphere args={[0.12, 16, 16]} position={[0.3, 0, 0]}>
              <meshStandardMaterial 
                color="#ef4444"
                transparent
                opacity={1 - flowPhase}
              />
            </Sphere>
            <Sphere args={[0.12, 16, 16]} position={[-0.3, 0, 0]}>
              <meshStandardMaterial 
                color="#ef4444"
                transparent
                opacity={1 - flowPhase}
              />
            </Sphere>
          </group>
        ))}
      </group>

      {/* H2O molecules (input - bottom) */}
      <group position={[0, -2, 0]}>
        {[0, 1, 2].map((i) => (
          <group 
            key={i} 
            position={[
              -1 + i * 0.8,
              -1 + flowPhase * 1,
              0
            ]}
          >
            {/* Oxygen (red) */}
            <Sphere args={[0.15, 16, 16]}>
              <meshStandardMaterial 
                color="#ef4444"
                transparent
                opacity={1 - flowPhase}
              />
            </Sphere>
            {/* Hydrogen atoms (white) */}
            <Sphere args={[0.1, 16, 16]} position={[0.25, 0.15, 0]}>
              <meshStandardMaterial 
                color="#f8fafc"
                transparent
                opacity={1 - flowPhase}
              />
            </Sphere>
            <Sphere args={[0.1, 16, 16]} position={[-0.25, 0.15, 0]}>
              <meshStandardMaterial 
                color="#f8fafc"
                transparent
                opacity={1 - flowPhase}
              />
            </Sphere>
          </group>
        ))}
      </group>

      {/* Glucose (output - right) */}
      <group position={[2.5, 0, 0]}>
        {flowPhase > 0.5 && (
          <group>
            {/* Simplified glucose ring */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i / 6) * Math.PI * 2;
              const radius = 0.4;
              return (
                <Sphere
                  key={i}
                  args={[0.12, 16, 16]}
                  position={[
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    0
                  ]}
                >
                  <meshStandardMaterial 
                    color={i === 0 ? '#ef4444' : '#64748b'}
                    transparent
                    opacity={(flowPhase - 0.5) * 2}
                  />
                </Sphere>
              );
            })}
          </group>
        )}
      </group>

      {/* O2 molecules (output - top right) */}
      <group position={[2, 2, 0]}>
        {flowPhase > 0.6 && [0, 1].map((i) => (
          <group 
            key={i} 
            position={[
              0,
              (flowPhase - 0.6) * 3 + i * 0.5,
              0
            ]}
          >
            <Sphere args={[0.15, 16, 16]} position={[0.2, 0, 0]}>
              <meshStandardMaterial 
                color="#ef4444"
                transparent
                opacity={(flowPhase - 0.6) * 2.5}
              />
            </Sphere>
            <Sphere args={[0.15, 16, 16]} position={[-0.2, 0, 0]}>
              <meshStandardMaterial 
                color="#ef4444"
                transparent
                opacity={(flowPhase - 0.6) * 2.5}
              />
            </Sphere>
          </group>
        ))}
      </group>

      {/* Chloroplast (inside leaf) */}
      <Sphere args={[0.3, 32, 32]} position={[0, 0.2, 0]}>
        <meshStandardMaterial 
          color="#16a34a"
          metalness={0.4}
          roughness={0.3}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </group>
  );
}
