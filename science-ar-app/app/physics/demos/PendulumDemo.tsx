'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function PendulumDemo() {
  const pendulumRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    if (pendulumRef.current) {
      // Simple harmonic motion
      const angle = Math.sin(time.current * 1.5) * 0.6;
      pendulumRef.current.rotation.z = angle;
    }
  });

  const ropeLength = 3;

  return (
    <group>
      {/* Pivot point */}
      <Sphere args={[0.1, 16, 16]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#888888" />
      </Sphere>

      {/* Pendulum group */}
      <group ref={pendulumRef} position={[0, 2, 0]}>
        {/* Rope */}
        <Cylinder 
          args={[0.02, 0.02, ropeLength, 8]} 
          position={[0, -ropeLength / 2, 0]}
        >
          <meshStandardMaterial color="#666666" />
        </Cylinder>

        {/* Bob */}
        <Sphere args={[0.3, 32, 32]} position={[0, -ropeLength, 0]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            metalness={0.5}
            roughness={0.2}
          />
        </Sphere>
      </group>

      {/* Ground reference */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1e293b" opacity={0.5} transparent />
      </mesh>

      {/* Arc path visualization */}
      <Line
        points={Array.from({ length: 50 }, (_, i) => {
          const angle = (i / 49) * Math.PI - Math.PI / 2;
          const x = Math.sin(angle) * ropeLength * 0.6;
          const y = 2 - Math.cos(angle) * ropeLength * 0.6;
          return [x, y, 0];
        })}
        color="#60a5fa"
        lineWidth={2}
        opacity={0.3}
        transparent
      />
    </group>
  );
}
