'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Star, Trophy, Zap, Lock } from 'lucide-react';
import { getProgressTracker } from '@/utils/progressTracker';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  steps: string[];
  hint: string;
  solution: string;
  points: number;
}

const challenges: Challenge[] = [
  {
    id: 'balance_equation',
    title: 'Balance the Equation',
    description: 'Balance this chemical equation: H₂ + O₂ → H₂O',
    difficulty: 'easy',
    steps: [
      'Count atoms on each side',
      'Identify which elements are unbalanced',
      'Add coefficients to balance oxygen first',
      'Check if hydrogen is balanced',
      'Verify all elements are balanced'
    ],
    hint: 'You need 2 H₂O on the product side to balance 2 H₂ and 1 O₂',
    solution: '2H₂ + O₂ → 2H₂O',
    points: 10
  },
  {
    id: 'identify_functional_group',
    title: 'Identify the Functional Group',
    description: 'What functional group does ethanol (C₂H₅OH) contain?',
    difficulty: 'easy',
    steps: [
      'Look at the molecular formula',
      'Identify the -OH group attached to carbon',
      'Recognize this as a hydroxyl group',
      'Classify as an alcohol functional group'
    ],
    hint: 'Look for the -OH group, which is characteristic of alcohols',
    solution: 'Hydroxyl group (-OH), making it an alcohol',
    points: 10
  },
  {
    id: 'calculate_molar_mass',
    title: 'Calculate Molar Mass',
    description: 'Calculate the molar mass of glucose (C₆H₁₂O₆)',
    difficulty: 'medium',
    steps: [
      'Identify the number of each atom: 6C, 12H, 6O',
      'Find atomic masses: C=12, H=1, O=16',
      'Multiply: (6×12) + (12×1) + (6×16)',
      'Calculate: 72 + 12 + 96',
      'Final answer: 180 g/mol'
    ],
    hint: 'Remember: atomic mass of C=12, H=1, O=16',
    solution: '180 g/mol',
    points: 15
  },
  {
    id: 'predict_reaction',
    title: 'Predict the Reaction',
    description: 'What happens when sodium (Na) reacts with water (H₂O)?',
    difficulty: 'medium',
    steps: [
      'Sodium is a highly reactive metal',
      'It displaces hydrogen from water',
      'Forms sodium hydroxide and hydrogen gas',
      'Write equation: 2Na + 2H₂O → 2NaOH + H₂',
      'Note: This is an exothermic reaction'
    ],
    hint: 'Alkali metals react vigorously with water to form metal hydroxide and hydrogen gas',
    solution: '2Na + 2H₂O → 2NaOH + H₂ (produces NaOH and H₂ gas)',
    points: 20
  },
  {
    id: 'isomer_challenge',
    title: 'Identify Isomers',
    description: 'Draw two structural isomers of C₄H₁₀',
    difficulty: 'hard',
    steps: [
      'Understand that isomers have the same formula but different structures',
      'Draw straight chain: CH₃-CH₂-CH₂-CH₃ (butane)',
      'Draw branched chain: CH₃-CH(CH₃)-CH₃ (isobutane)',
      'Verify both have 4 carbons and 10 hydrogens',
      'Confirm they are different structures'
    ],
    hint: 'One isomer is a straight chain, the other has a branch',
    solution: 'n-butane (straight chain) and isobutane (branched)',
    points: 25
  },
  {
    id: 'ph_calculation',
    title: 'pH Challenge',
    description: 'Calculate pH of 0.01M HCl solution',
    difficulty: 'medium',
    steps: [
      'HCl is a strong acid, fully dissociates',
      '[H⁺] = 0.01M = 10⁻² M',
      'pH = -log[H⁺]',
      'pH = -log(10⁻²)',
      'pH = 2'
    ],
    hint: 'Use the formula: pH = -log[H⁺]',
    solution: 'pH = 2',
    points: 20
  },
  {
    id: 'electron_configuration',
    title: 'Electron Configuration',
    description: 'Write the electron configuration for Carbon (atomic number 6)',
    difficulty: 'medium',
    steps: [
      'Carbon has 6 electrons',
      'Fill 1s orbital: 1s²',
      'Fill 2s orbital: 2s²',
      'Fill 2p orbital: 2p²',
      'Complete configuration: 1s² 2s² 2p²'
    ],
    hint: 'Remember the order: 1s, 2s, 2p, 3s, 3p...',
    solution: '1s² 2s² 2p²',
    points: 15
  },
  {
    id: 'redox_reaction',
    title: 'Redox Reaction',
    description: 'Identify which element is oxidized in: Zn + Cu²⁺ → Zn²⁺ + Cu',
    difficulty: 'hard',
    steps: [
      'Identify oxidation states: Zn (0) → Zn²⁺ (+2)',
      'Zn loses 2 electrons (oxidation)',
      'Cu²⁺ (+2) → Cu (0)',
      'Cu²⁺ gains 2 electrons (reduction)',
      'Zinc is oxidized, Copper is reduced'
    ],
    hint: 'Oxidation is loss of electrons (OIL), Reduction is gain of electrons (RIG)',
    solution: 'Zinc (Zn) is oxidized',
    points: 25
  },
  {
    id: 'bond_angles',
    title: 'Molecular Geometry',
    description: 'What is the bond angle in methane (CH₄)?',
    difficulty: 'medium',
    steps: [
      'Methane has tetrahedral geometry',
      'Central carbon with 4 bonds',
      'No lone pairs on carbon',
      'Tetrahedral angle is 109.5°',
      'All H-C-H angles are equal'
    ],
    hint: 'Methane has a tetrahedral structure',
    solution: '109.5° (tetrahedral angle)',
    points: 15
  },
  {
    id: 'stoichiometry_advanced',
    title: 'Advanced Stoichiometry',
    description: 'How many grams of H₂O form when 4g of H₂ reacts with excess O₂?',
    difficulty: 'hard',
    steps: [
      'Write balanced equation: 2H₂ + O₂ → 2H₂O',
      'Calculate moles of H₂: 4g ÷ 2g/mol = 2 mol',
      'From equation: 2 mol H₂ produces 2 mol H₂O',
      'Molar mass of H₂O = 18g/mol',
      'Mass of H₂O: 2 mol × 18g/mol = 36g'
    ],
    hint: 'Convert mass to moles, use mole ratio, then convert back to mass',
    solution: '36 grams of H₂O',
    points: 30
  }
];

export default function ChallengesDemo() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const tracker = getProgressTracker();
    const progress = tracker.getModuleProgress('challenges');
    if (progress) {
      setCompletedChallenges(progress.challengesCompleted);
    }
  }, []);

  const handleCompleteChallenge = (challengeId: string) => {
    if (!completedChallenges.includes(challengeId)) {
      const tracker = getProgressTracker();
      tracker.completeChallenge('challenges', challengeId);
      setCompletedChallenges([...completedChallenges, challengeId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'hard': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400';
    }
  };

  const totalPoints = completedChallenges.reduce((sum: number, id: string) => {
    const challenge = challenges.find((c: Challenge) => c.id === id);
    return sum + (challenge?.points || 0);
  }, 0);

  const maxPoints = challenges.reduce((sum: number, challenge: Challenge) => sum + challenge.points, 0);

  return (
    <div className="h-full overflow-y-auto bg-secondary p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Chemistry Challenges</h2>
              <p className="text-secondary">Test your knowledge with guided experiments</p>
            </div>
            <div className="bg-accent-primary/20 rounded-lg p-4 border border-accent-primary/30">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-warning" />
                <div>
                  <div className="text-2xl font-bold text-primary">{totalPoints}</div>
                  <div className="text-sm text-secondary">/ {maxPoints} points</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-tertiary rounded-lg p-4 border border-primary">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-secondary">Overall Progress</span>
              <span className="text-sm text-secondary">
                {completedChallenges.length}/{challenges.length} completed
              </span>
            </div>
            <div className="h-2 bg-tertiary rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-primary transition-all duration-500"
                style={{ width: `${(completedChallenges.length / challenges.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {selectedChallenge ? (
          /* Challenge Detail View */
          <div className="bg-secondary rounded-lg border border-primary overflow-hidden">
            {/* Challenge Header */}
            <div className="bg-accent-primary/20 p-6 border-b border-primary">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-primary">{selectedChallenge.title}</h3>
                    {completedChallenges.includes(selectedChallenge.id) && (
                      <CheckCircle className="w-6 h-6 text-success" />
                    )}
                  </div>
                  <p className="text-secondary mb-3">{selectedChallenge.description}</p>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                      {selectedChallenge.difficulty.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1 text-warning">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">{selectedChallenge.points} points</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedChallenge(null);
                    setCurrentStep(0);
                    setShowHint(false);
                    setShowSolution(false);
                  }}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Steps */}
            <div className="p-6">
              <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent-secondary" />
                Step-by-Step Guide
              </h4>
              <div className="space-y-3 mb-6">
                {selectedChallenge.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                      index <= currentStep
                        ? 'bg-tertiary border border-accent-primary/30'
                        : 'bg-tertiary/50 border border-primary'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      index < currentStep
                        ? 'bg-success text-white'
                        : index === currentStep
                        ? 'bg-accent-primary text-white'
                        : 'bg-tertiary text-secondary'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <p className="text-secondary text-sm flex-1">{step}</p>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-4 py-2 bg-tertiary text-primary rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous Step
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(selectedChallenge.steps.length - 1, currentStep + 1))}
                  disabled={currentStep === selectedChallenge.steps.length - 1}
                  className="px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next Step
                </button>
              </div>

              {/* Hint and Solution */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="w-full p-3 bg-tertiary hover:bg-secondary text-left rounded-lg border border-primary transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-warning">💡 Need a hint?</span>
                    <span className="text-secondary">{showHint ? '▼' : '▶'}</span>
                  </div>
                  {showHint && (
                    <p className="mt-2 text-sm text-secondary">{selectedChallenge.hint}</p>
                  )}
                </button>

                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="w-full p-3 bg-tertiary hover:bg-secondary text-left rounded-lg border border-primary transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-success">✓ View Solution</span>
                    <span className="text-secondary">{showSolution ? '▼' : '▶'}</span>
                  </div>
                  {showSolution && (
                    <p className="mt-2 text-sm text-secondary font-mono bg-secondary p-3 rounded">
                      {selectedChallenge.solution}
                    </p>
                  )}
                </button>
              </div>

              {/* Complete Button */}
              <button
                onClick={() => handleCompleteChallenge(selectedChallenge.id)}
                disabled={completedChallenges.includes(selectedChallenge.id)}
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all ${
                  completedChallenges.includes(selectedChallenge.id)
                    ? 'bg-success/30 text-success border border-success/30 cursor-not-allowed'
                    : 'bg-accent-primary text-white hover:bg-accent-secondary'
                }`}
              >
                {completedChallenges.includes(selectedChallenge.id) ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Challenge Completed!
                  </span>
                ) : (
                  'Mark as Complete'
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Challenge List */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map((challenge) => {
              const isCompleted = completedChallenges.includes(challenge.id);
              
              return (
                <div
                  key={challenge.id}
                  onClick={() => setSelectedChallenge(challenge)}
                  className={`p-5 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                    isCompleted
                      ? 'bg-slate-800 border-green-500/30 hover:border-green-500/50'
                      : 'bg-slate-900 border-slate-700 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${getDifficultyColor(challenge.difficulty)}`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">{challenge.points}</span>
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-white mb-2">{challenge.title}</h3>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">{challenge.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    {isCompleted && (
                      <span className="text-xs text-green-400 font-medium">✓ Completed</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
