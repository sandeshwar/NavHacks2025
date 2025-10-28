'use client';

import { useState, useEffect } from 'react';
import Infographic2D from '@/components/Infographic2D';

export default function NewtonLawsDemo() {
  const [activeLaw, setActiveLaw] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          setActiveLaw((law) => (law % 3) + 1);
          return 0;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const renderFirstLaw = () => {
    const ballX = 200 + (progress / 100) * 400;
    
    return (
      <g>
        <text x="400" y="50" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
          Newton's First Law: Inertia
        </text>
        <text x="400" y="80" textAnchor="middle" fill="#94a3b8" fontSize="14">
          An object at rest stays at rest, an object in motion stays in motion
        </text>

        {/* Track */}
        <line x1="150" y1="300" x2="650" y2="300" stroke="#475569" strokeWidth="4" />
        
        {/* Moving ball */}
        <circle cx={ballX} cy="280" r="20" fill="#3b82f6" opacity="0.9">
          <animate
            attributeName="cy"
            values="280;275;280"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Velocity arrow */}
        <g opacity={progress > 10 ? 1 : 0}>
          <line
            x1={ballX}
            y1="250"
            x2={ballX + 60}
            y2="250"
            stroke="#10b981"
            strokeWidth="3"
            markerEnd="url(#arrowhead)"
          />
          <text x={ballX + 30} y="240" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">
            v = constant
          </text>
        </g>

        {/* No force indicator */}
        <g transform="translate(400, 400)">
          <rect x="-100" y="-30" width="200" height="60" rx="10" fill="#1e293b" opacity="0.8" />
          <text x="0" y="-5" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">
            ΣF = 0
          </text>
          <text x="0" y="15" textAnchor="middle" fill="#94a3b8" fontSize="12">
            No net force applied
          </text>
        </g>

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
          </marker>
        </defs>
      </g>
    );
  };

  const renderSecondLaw = () => {
    const force = Math.sin((progress / 100) * Math.PI * 2) * 50 + 50;
    const acceleration = force / 10;
    const boxX = 300 + Math.sin((progress / 100) * Math.PI * 2) * 100;
    
    return (
      <g>
        <text x="400" y="50" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
          Newton's Second Law: F = ma
        </text>
        <text x="400" y="80" textAnchor="middle" fill="#94a3b8" fontSize="14">
          Force equals mass times acceleration
        </text>

        {/* Ground */}
        <line x1="100" y1="350" x2="700" y2="350" stroke="#475569" strokeWidth="4" />
        
        {/* Box */}
        <rect
          x={boxX - 40}
          y="290"
          width="80"
          height="60"
          fill="#8b5cf6"
          stroke="#7c3aed"
          strokeWidth="3"
          rx="5"
        />
        <text x={boxX} y="325" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          m = 10kg
        </text>

        {/* Force arrow */}
        <g>
          <line
            x1={boxX + 40}
            y1="320"
            x2={boxX + 40 + force}
            y2="320"
            stroke="#ef4444"
            strokeWidth="4"
            markerEnd="url(#arrowhead2)"
          />
          <text
            x={boxX + 40 + force / 2}
            y="310"
            textAnchor="middle"
            fill="#ef4444"
            fontSize="12"
            fontWeight="bold"
          >
            F = {force.toFixed(0)}N
          </text>
        </g>

        {/* Acceleration arrow */}
        <g>
          <line
            x1={boxX}
            y1="260"
            x2={boxX + acceleration}
            y2="260"
            stroke="#10b981"
            strokeWidth="3"
            markerEnd="url(#arrowhead3)"
          />
          <text
            x={boxX + acceleration / 2}
            y="250"
            textAnchor="middle"
            fill="#10b981"
            fontSize="12"
            fontWeight="bold"
          >
            a = {acceleration.toFixed(1)}m/s²
          </text>
        </g>

        {/* Equation display */}
        <g transform="translate(400, 450)">
          <rect x="-120" y="-35" width="240" height="70" rx="10" fill="#1e293b" opacity="0.9" />
          <text x="0" y="-10" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
            F = m × a
          </text>
          <text x="0" y="10" textAnchor="middle" fill="#94a3b8" fontSize="13">
            {force.toFixed(0)}N = 10kg × {acceleration.toFixed(1)}m/s²
          </text>
        </g>

        <defs>
          <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
          </marker>
          <marker id="arrowhead3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
          </marker>
        </defs>
      </g>
    );
  };

  const renderThirdLaw = () => {
    const compression = Math.sin((progress / 100) * Math.PI) * 20;
    
    return (
      <g>
        <text x="400" y="50" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
          Newton's Third Law: Action-Reaction
        </text>
        <text x="400" y="80" textAnchor="middle" fill="#94a3b8" fontSize="14">
          For every action, there is an equal and opposite reaction
        </text>

        {/* Ground */}
        <rect x="100" y="350" width="600" height="20" fill="#475569" />
        
        {/* Wall */}
        <rect x="520" y="200" width="30" height="150" fill="#64748b" stroke="#475569" strokeWidth="3" />
        
        {/* Ball 1 (moving) */}
        <circle
          cx={300 - compression}
          cy="300"
          r="30"
          fill="#3b82f6"
          stroke="#2563eb"
          strokeWidth="3"
        />
        <text x={300 - compression} y="305" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
          A
        </text>

        {/* Ball 2 (stationary) */}
        <circle
          cx={400 + compression}
          cy="300"
          r="30"
          fill="#ef4444"
          stroke="#dc2626"
          strokeWidth="3"
        />
        <text x={400 + compression} y="305" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
          B
        </text>

        {/* Action force arrow */}
        {compression > 5 && (
          <g>
            <line
              x1={330 - compression}
              y1="300"
              x2={370 + compression}
              y2="300"
              stroke="#fbbf24"
              strokeWidth="4"
              markerEnd="url(#arrowhead4)"
            />
            <text
              x={350}
              y="285"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="12"
              fontWeight="bold"
            >
              Action Force
            </text>
          </g>
        )}

        {/* Reaction force arrow */}
        {compression > 5 && (
          <g>
            <line
              x1={370 + compression}
              y1="320"
              x2={330 - compression}
              y2="320"
              stroke="#a855f7"
              strokeWidth="4"
              markerEnd="url(#arrowhead5)"
            />
            <text
              x={350}
              y="340"
              textAnchor="middle"
              fill="#a855f7"
              fontSize="12"
              fontWeight="bold"
            >
              Reaction Force
            </text>
          </g>
        )}

        {/* Equation display */}
        <g transform="translate(400, 450)">
          <rect x="-100" y="-35" width="200" height="70" rx="10" fill="#1e293b" opacity="0.9" />
          <text x="0" y="-10" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
            F₁ = -F₂
          </text>
          <text x="0" y="10" textAnchor="middle" fill="#94a3b8" fontSize="12">
            Equal magnitude
          </text>
          <text x="0" y="25" textAnchor="middle" fill="#94a3b8" fontSize="12">
            Opposite direction
          </text>
        </g>

        <defs>
          <marker id="arrowhead4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#fbbf24" />
          </marker>
          <marker id="arrowhead5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#a855f7" />
          </marker>
        </defs>
      </g>
    );
  };

  return (
    <Infographic2D>
      <svg viewBox="0 0 800 600" className="w-full max-w-4xl h-auto">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <rect width="800" height="600" fill="url(#bgGradient)" />

        {activeLaw === 1 && renderFirstLaw()}
        {activeLaw === 2 && renderSecondLaw()}
        {activeLaw === 3 && renderThirdLaw()}

        {/* Law selector */}
        <g transform="translate(400, 560)">
          {[1, 2, 3].map((law) => (
            <circle
              key={law}
              cx={(law - 2) * 30}
              cy="0"
              r="8"
              fill={activeLaw === law ? '#3b82f6' : '#475569'}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setActiveLaw(law);
                setProgress(0);
              }}
            />
          ))}
        </g>
      </svg>
    </Infographic2D>
  );
}
