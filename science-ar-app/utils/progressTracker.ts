// Progress tracking and achievements system

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface ModuleProgress {
  moduleId: string;
  visited: boolean;
  timeSpent: number; // in seconds
  lastVisited?: Date;
  challengesCompleted: string[];
}

export interface UserProgress {
  modules: Record<string, ModuleProgress>;
  achievements: Achievement[];
  totalTimeSpent: number;
}

const STORAGE_KEY = 'sciencear_progress';

// Default achievements
const defaultAchievements: Achievement[] = [
  {
    id: 'first_visit',
    title: 'First Steps',
    description: 'Explore your first chemistry demo',
    icon: '🎯',
    unlocked: false,
  },
  {
    id: 'explorer',
    title: 'Chemistry Explorer',
    description: 'Visit all chemistry modules',
    icon: '🔬',
    unlocked: false,
  },
  {
    id: 'challenge_master',
    title: 'Challenge Master',
    description: 'Complete all chemistry challenges',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'time_traveler',
    title: 'Time Traveler',
    description: 'Spend 30 minutes exploring chemistry',
    icon: '⏰',
    unlocked: false,
  },
  {
    id: 'organic_expert',
    title: 'Organic Expert',
    description: 'Master organic chemistry concepts',
    icon: '🧪',
    unlocked: false,
  },
  {
    id: 'bio_genius',
    title: 'Biochemistry Genius',
    description: 'Complete all biochemistry modules',
    icon: '🧬',
    unlocked: false,
  },
];

class ProgressTracker {
  private progress: UserProgress;

  constructor() {
    this.progress = this.loadProgress();
  }

  private loadProgress(): UserProgress {
    if (typeof window === 'undefined') {
      return this.getDefaultProgress();
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge with default achievements to ensure new ones are added
        return {
          ...parsed,
          achievements: this.mergeAchievements(parsed.achievements || []),
        };
      } catch (e) {
        console.error('Error loading progress:', e);
      }
    }
    return this.getDefaultProgress();
  }

  private mergeAchievements(stored: Achievement[]): Achievement[] {
    const storedMap = new Map(stored.map(a => [a.id, a]));
    return defaultAchievements.map(defaultAch => {
      const storedAch = storedMap.get(defaultAch.id);
      return storedAch || defaultAch;
    });
  }

  private getDefaultProgress(): UserProgress {
    return {
      modules: {},
      achievements: defaultAchievements,
      totalTimeSpent: 0,
    };
  }

  private saveProgress(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    }
  }

  // Track module visit
  visitModule(moduleId: string): void {
    if (!this.progress.modules[moduleId]) {
      this.progress.modules[moduleId] = {
        moduleId,
        visited: true,
        timeSpent: 0,
        lastVisited: new Date(),
        challengesCompleted: [],
      };
      
      // Unlock first visit achievement
      this.unlockAchievement('first_visit');
    } else {
      this.progress.modules[moduleId].lastVisited = new Date();
    }

    // Check for explorer achievement
    this.checkExplorerAchievement();
    this.saveProgress();
  }

  // Add time spent in a module
  addTimeSpent(moduleId: string, seconds: number): void {
    if (this.progress.modules[moduleId]) {
      this.progress.modules[moduleId].timeSpent += seconds;
      this.progress.totalTimeSpent += seconds;

      // Check time traveler achievement
      if (this.progress.totalTimeSpent >= 1800) { // 30 minutes
        this.unlockAchievement('time_traveler');
      }

      this.saveProgress();
    }
  }

  // Complete a challenge
  completeChallenge(moduleId: string, challengeId: string): void {
    if (!this.progress.modules[moduleId]) {
      this.visitModule(moduleId);
    }

    if (!this.progress.modules[moduleId].challengesCompleted.includes(challengeId)) {
      this.progress.modules[moduleId].challengesCompleted.push(challengeId);
      
      // Check for specific achievements
      if (moduleId === 'organic') {
        this.checkOrganicExpertAchievement();
      } else if (moduleId === 'biochemistry') {
        this.checkBioGeniusAchievement();
      }

      this.checkChallengeMasterAchievement();
      this.saveProgress();
    }
  }

  // Unlock achievement
  private unlockAchievement(achievementId: string): void {
    const achievement = this.progress.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date();
      
      // Trigger notification (can be enhanced with a toast system)
      if (typeof window !== 'undefined') {
        console.log(`🎉 Achievement unlocked: ${achievement.title}`);
      }
    }
  }

  // Check if all modules visited
  private checkExplorerAchievement(): void {
    const requiredModules = ['water', 'reaction', 'crystal', 'periodic', 'photosynthesis', 'organic', 'biochemistry'];
    const visitedCount = requiredModules.filter(id => this.progress.modules[id]?.visited).length;
    
    if (visitedCount >= requiredModules.length) {
      this.unlockAchievement('explorer');
    }
  }

  // Check challenge master achievement
  private checkChallengeMasterAchievement(): void {
    const totalChallenges = Object.values(this.progress.modules)
      .reduce((sum, module) => sum + module.challengesCompleted.length, 0);
    
    if (totalChallenges >= 10) { // Assuming 10+ challenges total
      this.unlockAchievement('challenge_master');
    }
  }

  // Check organic expert achievement
  private checkOrganicExpertAchievement(): void {
    const organicModule = this.progress.modules['organic'];
    if (organicModule && organicModule.challengesCompleted.length >= 3) {
      this.unlockAchievement('organic_expert');
    }
  }

  // Check biochemistry genius achievement
  private checkBioGeniusAchievement(): void {
    const bioModule = this.progress.modules['biochemistry'];
    if (bioModule && bioModule.challengesCompleted.length >= 3) {
      this.unlockAchievement('bio_genius');
    }
  }

  // Get progress data
  getProgress(): UserProgress {
    return this.progress;
  }

  // Get module progress
  getModuleProgress(moduleId: string): ModuleProgress | undefined {
    return this.progress.modules[moduleId];
  }

  // Get achievements
  getAchievements(): Achievement[] {
    return this.progress.achievements;
  }

  // Get unlocked achievements
  getUnlockedAchievements(): Achievement[] {
    return this.progress.achievements.filter(a => a.unlocked);
  }

  // Reset progress (for testing)
  resetProgress(): void {
    this.progress = this.getDefaultProgress();
    this.saveProgress();
  }
}

// Singleton instance
let trackerInstance: ProgressTracker | null = null;

export function getProgressTracker(): ProgressTracker {
  if (!trackerInstance) {
    trackerInstance = new ProgressTracker();
  }
  return trackerInstance;
}

export default ProgressTracker;
