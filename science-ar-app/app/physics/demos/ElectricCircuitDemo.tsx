'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function ElectricCircuitDemo() {
  const electronsRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
  });

  // Circuit path
  const circuitPath: [number, number, number][] = [
    [-2, 1, 0],
    [2, 1, 0],
    [2, -1, 0],
    [-2, -1, 0],
    [-2, 1, 0]
  ];

  // Electron positions along circuit
  const electrons = Array.from({ length: 12 }, (_, i) => {
    const progress = (i / 12 + time.current * 0.2) % 1;
    const segmentLength = 1 / 4;
    const segment = Math.floor(progress / segmentLength);
    const localProgress = (progress % segmentLength) / segmentLength;
    
    let pos: [number, number, number] = [0, 0, 0];
    
    if (segment === 0) {
      pos = [-2 + localProgress * 4, 1, 0];
    } else if (segment === 1) {
      pos = [2, 1 - localProgress * 2, 0];
    } else if (segment === 2) {
      pos = [2 - localProgress * 4, -1, 0];
    } else {
      pos = [-2, -1 + localProgress * 2, 0];
    }
    
    return pos;
  });

  return (
    <group>
      {/* Circuit wire */}
      <Line
        points={circuitPath}
        color="#fbbf24"
        lineWidth={4}
      />

      {/* Battery */}
      <group position={[-2, 0, 0]}>
        <Box args={[0.3, 0.8, 0.2]}>
          <meshStandardMaterial color="#1e293b" />
        </Box>
        <mesh position={[0, 0.5, 0.15]}>
          <planeGeometry args={[0.2, 0.1]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0, -0.5, 0.15]}>
          <planeGeometry args={[0.2, 0.1]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
      </group>

      {/* Resistor */}
      <group position={[0, 1, 0]}>
        <Box args={[0.6, 0.2, 0.2]}>
          <meshStandardMaterial color="#78716c" />
        </Box>
        {/* Resistor bands */}
        {[-0.15, 0, 0.15].map((x, i) => (
          <Box key={i} args={[0.05, 0.25, 0.21]} position={[x, 0, 0]}>
            <meshStandardMaterial color={['#ef4444', '#fbbf24', '#3b82f6'][i]} />
          </Box>
        ))}
      </group>

      {/* Light bulb */}
      <group position={[2, 0, 0]}>
        <Sphere args={[0.3, 32, 32]}>
          <meshStandardMaterial 
            color="#fef08a" 
            emissive="#fef08a"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </Sphere>
        <Cylinder args={[0.1, 0.15, 0.3, 16]} position={[0, -0.4, 0]}>
          <meshStandardMaterial color="#71717a" />
        </Cylinder>
      </group>

      {/* Flowing electrons */}
      <group ref={electronsRef}>
        {electrons.map((pos, i) => (
          <Sphere key={i} args={[0.08, 16, 16]} position={pos}>
            <meshStandardMaterial 
              color="#60a5fa" 
              emissive="#60a5fa"
              emissiveIntensity={0.5}
            />
          </Sphere>
        ))}
      </group>

      {/* Labels */}
      <mesh position={[0, 2, 0]}>
        <planeGeometry args={[3, 0.5]} />
        <meshBasicMaterial color="#1e293b" opacity={0.8} transparent />
      </mesh>

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0f172a" opacity={0.5} transparent />
      </mesh>
    </group>
  );
}
