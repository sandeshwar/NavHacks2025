'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WaveDemo() {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8, 4, 80, 40);
    return geo;
  }, []);

  useFrame((state, delta) => {
    time.current += delta;
    
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Create wave pattern
        const wave1 = Math.sin(x * 1.5 + time.current * 2) * 0.3;
        const wave2 = Math.sin(y * 2 + time.current * 1.5) * 0.2;
        const z = wave1 + wave2;
        
        positions.setZ(i, z);
      }
      
      positions.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 4, 0, 0]}>
        <meshStandardMaterial 
          color="#06b6d4"
          wireframe={false}
          side={THREE.DoubleSide}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh geometry={geometry} rotation={[-Math.PI / 4, 0, 0]}>
        <meshBasicMaterial 
          color="#22d3ee"
          wireframe={true}
          opacity={0.3}
          transparent
        />
      </mesh>

      {/* Reference grid */}
      <gridHelper args={[10, 20, '#334155', '#1e293b']} position={[0, -2, 0]} />
    </group>
  );
}
