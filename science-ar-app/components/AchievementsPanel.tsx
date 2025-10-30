'use client';

import { useState, useEffect } from 'react';
import { Trophy, Lock, CheckCircle, Star, Clock } from 'lucide-react';
import { getProgressTracker, Achievement } from '@/utils/progressTracker';

export default function AchievementsPanel() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalTime, setTotalTime] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const tracker = getProgressTracker();
    const progress = tracker.getProgress();
    setAchievements(progress.achievements);
    setTotalTime(progress.totalTimeSpent);
  }, []);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercentage = (unlockedCount / achievements.length) * 100;

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  return (
    <>
      {/* Floating Achievement Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-accent-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50"
        aria-label="View Achievements"
      >
        <Trophy className="w-6 h-6" />
        {unlockedCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {unlockedCount}
          </span>
        )}
      </button>

      {/* Achievements Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background-secondary rounded-xl border border-border max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-warning" />
                  <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-tertiary rounded-lg p-3">
                  <div className="flex items-center gap-2 text-accent-primary mb-1">
                    <Star className="w-4 h-4" />
                    <span className="text-xs font-medium">Unlocked</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {unlockedCount}/{achievements.length}
                  </p>
                </div>

                <div className="bg-tertiary rounded-lg p-3">
                  <div className="flex items-center gap-2 text-accent-secondary mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Progress</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {Math.round(progressPercentage)}%
                  </p>
                </div>

                <div className="bg-tertiary rounded-lg p-3">
                  <div className="flex items-center gap-2 text-success mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium">Time</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {formatTime(totalTime)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-2 bg-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-primary transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Achievement List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border transition-all ${
                      achievement.unlocked
                        ? 'bg-[#f0f0f0] border-[#2c3e50]/30 hover:border-[#2c3e50]/50 dark:bg-[#2a2a2a] dark:border-[#a0aec0]/30 dark:hover:border-[#a0aec0]/50'
                        : 'bg-[#f8f8f8]/50 border-[#e0e0e0] opacity-60 dark:bg-[#1e1e1e]/50 dark:border-[#374151]'
                    }`}
                    style={{backgroundColor: achievement.unlocked ? 'var(--background-tertiary)' : 'var(--background-secondary)', borderColor: achievement.unlocked ? 'var(--accent-primary)' : 'var(--border)'}}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`text-4xl p-3 rounded-lg ${
                          achievement.unlocked
                            ? 'bg-accent-primary/20'
                            : 'bg-tertiary/50'
                        }`}
                      >
                        {achievement.unlocked ? achievement.icon : <Lock className="w-8 h-8 text-tertiary" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-primary">
                            {achievement.title}
                          </h3>
                          {achievement.unlocked && (
                            <CheckCircle className="w-4 h-4 text-success" />
                          )}
                        </div>
                        <p className="text-sm text-secondary mb-2">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.unlockedAt && (
                          <p className="text-xs text-accent-primary">
                            Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-primary bg-secondary/50">
              <p className="text-sm text-secondary text-center">
                Keep exploring to unlock more achievements! 🚀
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
