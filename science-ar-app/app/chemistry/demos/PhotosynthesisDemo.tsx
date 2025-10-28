'use client';

import { useState, useEffect } from 'react';
import Infographic2D from '@/components/Infographic2D';
import { Sun, Droplet, Wind, Leaf } from 'lucide-react';

export default function PhotosynthesisDemo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Calculate animation phases
  const phase1 = Math.min(progress / 20, 1); // Sunlight absorption
  const phase2 = Math.max(0, Math.min((progress - 20) / 20, 1)); // Water uptake
  const phase3 = Math.max(0, Math.min((progress - 40) / 20, 1)); // CO2 absorption
  const phase4 = Math.max(0, Math.min((progress - 60) / 20, 1)); // Glucose production
  const phase5 = Math.max(0, Math.min((progress - 80) / 20, 1)); // Oxygen release

  return (
    <Infographic2D
      title="Photosynthesis Process"
      description="6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂"
    >
      <svg viewBox="0 0 800 600" className="w-full max-w-4xl h-auto">
        {/* Background gradient */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <rect width="800" height="600" fill="url(#skyGradient)" />

        {/* Sun */}
        <g transform="translate(100, 80)">
          <circle 
            cx="0" 
            cy="0" 
            r="40" 
            fill="#fbbf24" 
            opacity={0.3 + phase1 * 0.7}
            filter="url(#glow)"
          />
          <circle cx="0" cy="0" r="30" fill="#fbbf24" opacity={0.8} />
          {/* Sun rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const length = 20 + Math.sin(progress / 10 + i) * 5;
            return (
              <line
                key={angle}
                x1={Math.cos(rad) * 35}
                y1={Math.sin(rad) * 35}
                x2={Math.cos(rad) * (35 + length)}
                y2={Math.sin(rad) * (35 + length)}
                stroke="#fbbf24"
                strokeWidth="3"
                opacity={0.6}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* Sunlight rays to leaf */}
        {phase1 > 0 && (
          <g opacity={phase1}>
            {[0, 1, 2].map((i) => (
              <line
                key={i}
                x1="100"
                y1="80"
                x2="400"
                y2="300"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity={0.6}
                transform={`translate(${i * 10 - 10}, ${i * 10 - 10})`}
                style={{
                  strokeDashoffset: -progress * 2,
                }}
              />
            ))}
          </g>
        )}

        {/* Leaf (Chloroplast) */}
        <g transform="translate(400, 300)">
          <ellipse
            cx="0"
            cy="0"
            rx="120"
            ry="80"
            fill="#10b981"
            opacity="0.9"
            stroke="#059669"
            strokeWidth="3"
          />
          <path
            d="M -120,0 Q 0,-20 120,0"
            stroke="#059669"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Chloroplast detail */}
          <ellipse
            cx="0"
            cy="0"
            rx="80"
            ry="50"
            fill="#34d399"
            opacity={0.3 + phase1 * 0.4}
          />
          
          {/* Energy indicator */}
          <circle
            cx="0"
            cy="0"
            r="15"
            fill="#fbbf24"
            opacity={phase1 * 0.8}
            filter="url(#glow)"
          />
        </g>

        {/* Water molecules (H2O) from bottom */}
        {phase2 > 0 && (
          <g opacity={phase2}>
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${350 + i * 30}, ${550 - phase2 * 250})`}>
                <circle cx="0" cy="0" r="8" fill="#3b82f6" opacity="0.8" />
                <text
                  x="0"
                  y="5"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  H₂O
                </text>
              </g>
            ))}
            <path
              d="M 400,550 L 400,380"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.4"
              style={{
                strokeDashoffset: -progress,
              }}
            />
          </g>
        )}

        {/* CO2 molecules from air */}
        {phase3 > 0 && (
          <g opacity={phase3}>
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${650 - phase3 * 250}, ${200 + i * 40})`}>
                <circle cx="0" cy="0" r="8" fill="#64748b" opacity="0.8" />
                <text
                  x="0"
                  y="5"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  CO₂
                </text>
              </g>
            ))}
            <path
              d="M 650,260 L 520,300"
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.4"
              style={{
                strokeDashoffset: -progress,
              }}
            />
          </g>
        )}

        {/* Glucose (C6H12O6) production */}
        {phase4 > 0 && (
          <g transform={`translate(400, ${300 + phase4 * 150})`} opacity={phase4}>
            <rect
              x="-40"
              y="-20"
              width="80"
              height="40"
              rx="10"
              fill="#a855f7"
              opacity="0.9"
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="bold"
            >
              C₆H₁₂O₆
            </text>
            <text
              x="0"
              y="20"
              textAnchor="middle"
              fill="white"
              fontSize="10"
            >
              Glucose
            </text>
          </g>
        )}

        {/* Oxygen (O2) release */}
        {phase5 > 0 && (
          <g opacity={phase5}>
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${450 + i * 30}, ${200 - phase5 * 150})`}>
                <circle cx="0" cy="0" r="10" fill="#ef4444" opacity="0.8" />
                <text
                  x="0"
                  y="5"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  O₂
                </text>
              </g>
            ))}
            <path
              d="M 480,200 L 480,50"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.4"
              style={{
                strokeDashoffset: -progress,
              }}
            />
          </g>
        )}

        {/* Labels */}
        <text x="100" y="150" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">
          Light Energy
        </text>
        
        {phase2 > 0.5 && (
          <text x="400" y="560" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">
            Water
          </text>
        )}
        
        {phase3 > 0.5 && (
          <text x="680" y="260" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="bold">
            Carbon Dioxide
          </text>
        )}
        
        {phase5 > 0.5 && (
          <text x="480" y="30" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">
            Oxygen
          </text>
        )}

        {/* Process stages indicator */}
        <g transform="translate(50, 500)">
          <text x="0" y="0" fill="white" fontSize="12" fontWeight="bold">
            Process Stages:
          </text>
          <circle cx="0" cy="20" r="5" fill={phase1 > 0.5 ? '#10b981' : '#334155'} />
          <text x="15" y="25" fill="white" fontSize="11">1. Light Absorption</text>
          
          <circle cx="0" cy="40" r="5" fill={phase2 > 0.5 ? '#10b981' : '#334155'} />
          <text x="15" y="45" fill="white" fontSize="11">2. Water Uptake</text>
          
          <circle cx="0" cy="60" r="5" fill={phase3 > 0.5 ? '#10b981' : '#334155'} />
          <text x="15" y="65" fill="white" fontSize="11">3. CO₂ Absorption</text>
          
          <circle cx="200" cy="20" r="5" fill={phase4 > 0.5 ? '#10b981' : '#334155'} />
          <text x="215" y="25" fill="white" fontSize="11">4. Glucose Production</text>
          
          <circle cx="200" cy="40" r="5" fill={phase5 > 0.5 ? '#10b981' : '#334155'} />
          <text x="215" y="45" fill="white" fontSize="11">5. Oxygen Release</text>
        </g>
      </svg>
    </Infographic2D>
  );
}
