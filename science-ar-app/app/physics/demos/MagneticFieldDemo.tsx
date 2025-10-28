'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function MagneticFieldDemo() {
  const fieldLinesRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    if (fieldLinesRef.current) {
      fieldLinesRef.current.rotation.y = time.current * 0.3;
    }
  });

  // Generate magnetic field lines
  const fieldLines = [];
  const numLines = 12;
  
  for (let i = 0; i < numLines; i++) {
    const angle = (i / numLines) * Math.PI * 2;
    const radius = 1.5;
    
    const points: [number, number, number][] = [];
    for (let t = 0; t <= 1; t += 0.05) {
      const x = Math.cos(angle) * (radius + t * 2);
      const y = Math.sin(t * Math.PI - Math.PI / 2) * 2;
      const z = Math.sin(angle) * (radius + t * 2);
      points.push([x, y, z]);
    }
    
    fieldLines.push(points);
  }

  return (
    <group>
      {/* North pole magnet */}
      <group position={[0, 1, 0]}>
        <Cylinder args={[0.4, 0.4, 0.8, 32]}>
          <meshStandardMaterial color="#ef4444" metalness={0.6} roughness={0.2} />
        </Cylinder>
        <Sphere args={[0.15, 16, 16]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="white" />
        </Sphere>
      </group>

      {/* South pole magnet */}
      <group position={[0, -1, 0]}>
        <Cylinder args={[0.4, 0.4, 0.8, 32]}>
          <meshStandardMaterial color="#3b82f6" metalness={0.6} roughness={0.2} />
        </Cylinder>
        <Sphere args={[0.15, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="white" />
        </Sphere>
      </group>

      {/* Magnetic field lines */}
      <group ref={fieldLinesRef}>
        {fieldLines.map((points, index) => (
          <Line
            key={index}
            points={points}
            color="#a855f7"
            lineWidth={2}
            opacity={0.6}
            transparent
          />
        ))}
      </group>

      {/* Compass needles showing field direction */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 2.5;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        
        return (
          <group key={i} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <Cylinder args={[0.05, 0.05, 0.5, 8]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial color="#c084fc" />
            </Cylinder>
            <Sphere args={[0.08, 16, 16]} position={[0.25, 0, 0]}>
              <meshStandardMaterial color="#ef4444" />
            </Sphere>
          </group>
        );
      })}
    </group>
  );
}
