'use client';

import { Sphere, Cylinder } from '@react-three/drei';

export default function WaterMoleculeDemo() {
  // Water molecule geometry: H-O-H with 104.5° angle
  const bondLength = 1.2;
  const angle = (104.5 * Math.PI) / 180 / 2;

  const h1Position: [number, number, number] = [
    Math.sin(angle) * bondLength,
    Math.cos(angle) * bondLength,
    0
  ];
  
  const h2Position: [number, number, number] = [
    -Math.sin(angle) * bondLength,
    Math.cos(angle) * bondLength,
    0
  ];

  return (
    <group>
      {/* Oxygen atom (red) */}
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#ef4444" 
          metalness={0.3}
          roughness={0.4}
        />
      </Sphere>

      {/* Hydrogen atom 1 (white) */}
      <Sphere args={[0.3, 32, 32]} position={h1Position}>
        <meshStandardMaterial 
          color="#f8fafc" 
          metalness={0.3}
          roughness={0.4}
        />
      </Sphere>

      {/* Hydrogen atom 2 (white) */}
      <Sphere args={[0.3, 32, 32]} position={h2Position}>
        <meshStandardMaterial 
          color="#f8fafc" 
          metalness={0.3}
          roughness={0.4}
        />
      </Sphere>

      {/* Bond 1 */}
      <Cylinder
        args={[0.08, 0.08, bondLength, 8]}
        position={[h1Position[0] / 2, h1Position[1] / 2, 0]}
        rotation={[0, 0, -angle]}
      >
        <meshStandardMaterial color="#94a3b8" />
      </Cylinder>

      {/* Bond 2 */}
      <Cylinder
        args={[0.08, 0.08, bondLength, 8]}
        position={[h2Position[0] / 2, h2Position[1] / 2, 0]}
        rotation={[0, 0, angle]}
      >
        <meshStandardMaterial color="#94a3b8" />
      </Cylinder>

      {/* Electron cloud visualization */}
      <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#a855f7" 
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>

      {/* Labels */}
      <group position={[0, -2.5, 0]}>
        <mesh>
          <planeGeometry args={[4, 0.8]} />
          <meshBasicMaterial color="#1e293b" opacity={0.8} transparent />
        </mesh>
      </group>
    </group>
  );
}
