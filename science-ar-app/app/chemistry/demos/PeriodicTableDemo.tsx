'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { elements as allElements, Element as ChemElement } from '../data/elements';

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
  const groupRef = useRef<THREE.Group | null>(null);
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [rotationEnabled, setRotationEnabled] = useState(true);

  useFrame((state) => {
    if (groupRef.current && rotationEnabled) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Complete periodic table (first 36 elements for visibility)
  
  const elements: ChemElement[] = allElements;

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
      'post-transition': '#9ca3af',
      'lanthanide': '#a855f7',
      'actinide': '#f43f5e',
    };
    return colors[category] || '#64748b';
  };

  const rows = elements.map(e => e.row);
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const centerRow = (minRow + maxRow) / 2;

  return (
    <group ref={groupRef}>
      {elements.map((element, index) => {
        const isHovered = hoveredElement === index;
        const scale = isHovered ? 1.15 : 1;
        const spacing = 0.7;
        const posX = (element.col - 8.5) * spacing;
        const posY = (centerRow - element.row) * spacing;
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
                if (selectedElement === null) setRotationEnabled(true);
              }}
              onClick={() => {
                setSelectedElement(index);
                setRotationEnabled(false);
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

            {selectedElement === index && (
              <Html position={[0, 0, 0.6]} center transform>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl min-w-[220px]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-bold text-lg">{element.symbol}</div>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedElement(null); setRotationEnabled(true); }} className="text-slate-400 hover:text-white">×</button>
                  </div>
                  <div className="text-slate-300 text-sm">{element.name}</div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-400">
                    <div><span className="text-slate-500">No.</span> {element.atomicNumber}</div>
                    <div><span className="text-slate-500">Mass</span> {element.atomicMass}</div>
                    <div className="col-span-2"><span className="text-slate-500">Category</span> {element.category}</div>
                  </div>
                </div>
              </Html>
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
