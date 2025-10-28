'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: string;
  category: string;
  row: number;
  col: number;
}

export default function PeriodicTableDemo() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);
  const [rotationEnabled, setRotationEnabled] = useState(true);

  useFrame((state) => {
    if (groupRef.current && rotationEnabled) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Complete periodic table (first 36 elements for visibility)
  const elements: Element[] = [
    // Period 1
    { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: '1.008', category: 'nonmetal', row: 0, col: 0 },
    { symbol: 'He', name: 'Helium', atomicNumber: 2, atomicMass: '4.003', category: 'noble', row: 0, col: 17 },
    
    // Period 2
    { symbol: 'Li', name: 'Lithium', atomicNumber: 3, atomicMass: '6.941', category: 'alkali', row: 1, col: 0 },
    { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, atomicMass: '9.012', category: 'alkaline', row: 1, col: 1 },
    { symbol: 'B', name: 'Boron', atomicNumber: 5, atomicMass: '10.81', category: 'metalloid', row: 1, col: 12 },
    { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: '12.01', category: 'nonmetal', row: 1, col: 13 },
    { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, atomicMass: '14.01', category: 'nonmetal', row: 1, col: 14 },
    { symbol: 'O', name: 'Oxygen', atomicNumber: 8, atomicMass: '16.00', category: 'nonmetal', row: 1, col: 15 },
    { symbol: 'F', name: 'Fluorine', atomicNumber: 9, atomicMass: '19.00', category: 'halogen', row: 1, col: 16 },
    { symbol: 'Ne', name: 'Neon', atomicNumber: 10, atomicMass: '20.18', category: 'noble', row: 1, col: 17 },
    
    // Period 3
    { symbol: 'Na', name: 'Sodium', atomicNumber: 11, atomicMass: '22.99', category: 'alkali', row: 2, col: 0 },
    { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, atomicMass: '24.31', category: 'alkaline', row: 2, col: 1 },
    { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, atomicMass: '26.98', category: 'metal', row: 2, col: 12 },
    { symbol: 'Si', name: 'Silicon', atomicNumber: 14, atomicMass: '28.09', category: 'metalloid', row: 2, col: 13 },
    { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, atomicMass: '30.97', category: 'nonmetal', row: 2, col: 14 },
    { symbol: 'S', name: 'Sulfur', atomicNumber: 16, atomicMass: '32.07', category: 'nonmetal', row: 2, col: 15 },
    { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, atomicMass: '35.45', category: 'halogen', row: 2, col: 16 },
    { symbol: 'Ar', name: 'Argon', atomicNumber: 18, atomicMass: '39.95', category: 'noble', row: 2, col: 17 },
    
    // Period 4 (partial)
    { symbol: 'K', name: 'Potassium', atomicNumber: 19, atomicMass: '39.10', category: 'alkali', row: 3, col: 0 },
    { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, atomicMass: '40.08', category: 'alkaline', row: 3, col: 1 },
    { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, atomicMass: '44.96', category: 'transition', row: 3, col: 2 },
    { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, atomicMass: '47.87', category: 'transition', row: 3, col: 3 },
    { symbol: 'V', name: 'Vanadium', atomicNumber: 23, atomicMass: '50.94', category: 'transition', row: 3, col: 4 },
    { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, atomicMass: '52.00', category: 'transition', row: 3, col: 5 },
    { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, atomicMass: '54.94', category: 'transition', row: 3, col: 6 },
    { symbol: 'Fe', name: 'Iron', atomicNumber: 26, atomicMass: '55.85', category: 'transition', row: 3, col: 7 },
    { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, atomicMass: '58.93', category: 'transition', row: 3, col: 8 },
    { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, atomicMass: '58.69', category: 'transition', row: 3, col: 9 },
    { symbol: 'Cu', name: 'Copper', atomicNumber: 29, atomicMass: '63.55', category: 'transition', row: 3, col: 10 },
    { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, atomicMass: '65.38', category: 'transition', row: 3, col: 11 },
    { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, atomicMass: '69.72', category: 'metal', row: 3, col: 12 },
    { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, atomicMass: '72.63', category: 'metalloid', row: 3, col: 13 },
    { symbol: 'As', name: 'Arsenic', atomicNumber: 33, atomicMass: '74.92', category: 'metalloid', row: 3, col: 14 },
    { symbol: 'Se', name: 'Selenium', atomicNumber: 34, atomicMass: '78.97', category: 'nonmetal', row: 3, col: 15 },
    { symbol: 'Br', name: 'Bromine', atomicNumber: 35, atomicMass: '79.90', category: 'halogen', row: 3, col: 16 },
    { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, atomicMass: '83.80', category: 'noble', row: 3, col: 17 },
  ];

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'nonmetal': '#fbbf24',
      'noble': '#06b6d4',
      'alkali': '#ef4444',
      'alkaline': '#f97316',
      'metalloid': '#22c55e',
      'metal': '#94a3b8',
      'halogen': '#10b981',
      'transition': '#3b82f6',
    };
    return colors[category] || '#64748b';
  };

  return (
    <group ref={groupRef}>
      {elements.map((element, index) => {
        const isHovered = hoveredElement === index;
        const scale = isHovered ? 1.15 : 1;
        const spacing = 0.7;
        const posX = (element.col - 8.5) * spacing;
        const posY = (2 - element.row) * spacing;
        const color = getCategoryColor(element.category);

        return (
          <group key={index} position={[posX, posY, 0]}>
            {/* Element box */}
            <Box 
              args={[0.6, 0.6, 0.15]} 
              scale={scale}
              onPointerOver={() => {
                setHoveredElement(index);
                setRotationEnabled(false);
              }}
              onPointerOut={() => {
                setHoveredElement(null);
                setRotationEnabled(true);
              }}
            >
              <meshStandardMaterial 
                color={color}
                metalness={0.3}
                roughness={0.4}
                emissive={color}
                emissiveIntensity={isHovered ? 0.4 : 0.1}
              />
            </Box>

            {/* Atomic number */}
            <Text
              position={[-0.2, 0.2, 0.08]}
              fontSize={0.08}
              color="white"
              anchorX="left"
              anchorY="middle"
            >
              {element.atomicNumber}
            </Text>

            {/* Symbol */}
            <Text
              position={[0, 0.05, 0.08]}
              fontSize={0.18}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Bold.woff"
            >
              {element.symbol}
            </Text>

            {/* Atomic mass */}
            <Text
              position={[0, -0.18, 0.08]}
              fontSize={0.07}
              color="#cbd5e1"
              anchorX="center"
              anchorY="middle"
            >
              {element.atomicMass}
            </Text>

            {/* Hover info */}
            {isHovered && (
              <group position={[0, 0, 0.5]}>
                <Box args={[1.5, 0.4, 0.05]}>
                  <meshStandardMaterial color="#1e293b" />
                </Box>
                <Text
                  position={[0, 0.1, 0.03]}
                  fontSize={0.12}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  {element.name}
                </Text>
                <Text
                  position={[0, -0.05, 0.03]}
                  fontSize={0.08}
                  color="#94a3b8"
                  anchorX="center"
                  anchorY="middle"
                >
                  {element.category}
                </Text>
              </group>
            )}
          </group>
        );
      })}

      {/* Legend */}
      <group position={[0, -2.5, 0]}>
        {[
          { label: 'Alkali Metal', color: '#ef4444', x: -5 },
          { label: 'Transition Metal', color: '#3b82f6', x: -2.5 },
          { label: 'Nonmetal', color: '#fbbf24', x: 0 },
          { label: 'Halogen', color: '#10b981', x: 2.5 },
          { label: 'Noble Gas', color: '#06b6d4', x: 5 },
        ].map((item, i) => (
          <group key={i} position={[item.x, 0, 0]}>
            <Box args={[0.3, 0.3, 0.1]}>
              <meshStandardMaterial color={item.color} />
            </Box>
            <Text
              position={[0, -0.3, 0]}
              fontSize={0.1}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              {item.label}
            </Text>
          </group>
        ))}
      </group>
    </group>
  );
}
