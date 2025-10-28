'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

export default function HeartDemo() {
  const heartRef = useRef<THREE.Group>(null);
  const [beatPhase, setBeatPhase] = useState(0);

  useFrame((state, delta) => {
    setBeatPhase((prev) => (prev + delta * 2) % (Math.PI * 2));
    
    if (heartRef.current) {
      // Heartbeat animation
      const scale = 1 + Math.sin(beatPhase) * 0.1;
      heartRef.current.scale.set(scale, scale, scale);
      heartRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  // Heart shape approximation using spheres
  const heartColor = '#ef4444';
  const bloodColor = '#dc2626';

  return (
    <group ref={heartRef}>
      {/* Main heart chambers */}
      
      {/* Left ventricle (larger, bottom left) */}
      <Sphere args={[0.8, 32, 32]} position={[-0.5, -0.5, 0]}>
        <meshStandardMaterial 
          color={heartColor}
          metalness={0.3}
          roughness={0.4}
        />
      </Sphere>

      {/* Right ventricle (smaller, bottom right) */}
      <Sphere args={[0.6, 32, 32]} position={[0.6, -0.4, 0.2]}>
        <meshStandardMaterial 
          color={heartColor}
          metalness={0.3}
          roughness={0.4}
        />
      </Sphere>

      {/* Left atrium (top left) */}
      <Sphere args={[0.5, 32, 32]} position={[-0.6, 0.6, 0]}>
        <meshStandardMaterial 
          color={heartColor}
          metalness={0.3}
          roughness={0.4}
        />
      </Sphere>

      {/* Right atrium (top right) */}
      <Sphere args={[0.5, 32, 32]} position={[0.5, 0.6, 0.2]}>
        <meshStandardMaterial 
          color={heartColor}
          metalness={0.3}
          roughness={0.4}
        />
      </Sphere>

      {/* Aorta (main artery) */}
      <group position={[-0.5, 1.2, 0]}>
        <Cylinder args={[0.25, 0.25, 1, 16]}>
          <meshStandardMaterial 
            color={bloodColor}
            metalness={0.4}
            roughness={0.3}
          />
        </Cylinder>
        <Torus 
          args={[0.4, 0.15, 16, 32, Math.PI]} 
          position={[0, 0.5, 0]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <meshStandardMaterial 
            color={bloodColor}
            metalness={0.4}
            roughness={0.3}
          />
        </Torus>
      </group>

      {/* Pulmonary artery */}
      <group position={[0.5, 1.1, 0.2]}>
        <Cylinder args={[0.2, 0.2, 0.8, 16]}>
          <meshStandardMaterial 
            color="#3b82f6"
            metalness={0.4}
            roughness={0.3}
          />
        </Cylinder>
      </group>

      {/* Valves (simplified) */}
      {[
        [-0.5, 0.1, 0],
        [0.5, 0.1, 0.2]
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <Torus args={[0.2, 0.05, 16, 32]}>
            <meshStandardMaterial 
              color="#fbbf24"
              metalness={0.5}
              roughness={0.2}
            />
          </Torus>
        </group>
      ))}

      {/* Blood flow particles */}
      {Array.from({ length: 20 }, (_, i) => {
        const t = (beatPhase + i * 0.3) % (Math.PI * 2);
        const y = -1 + (t / (Math.PI * 2)) * 3;
        const opacity = Math.sin(t) * 0.5 + 0.5;
        
        return (
          <Sphere
            key={i}
            args={[0.08, 16, 16]}
            position={[-0.5, y, 0]}
          >
            <meshStandardMaterial 
              color={bloodColor}
              transparent
              opacity={opacity}
              emissive={bloodColor}
              emissiveIntensity={0.3}
            />
          </Sphere>
        );
      })}

      {/* Coronary arteries (surface vessels) */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <Cylinder
            key={i}
            args={[0.05, 0.05, 1.5, 8]}
            position={[
              Math.cos(angle) * 0.4,
              -0.2,
              Math.sin(angle) * 0.4
            ]}
            rotation={[angle, 0, Math.PI / 4]}
          >
            <meshStandardMaterial 
              color="#7f1d1d"
              metalness={0.3}
              roughness={0.4}
            />
          </Cylinder>
        );
      })}
    </group>
  );
}
