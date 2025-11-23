import { UserProgress } from '../types';
import { CURRICULUM } from '../constants';

const PROGRESS_KEY_PREFIX = 'js_master_progress_';

export const dbService = {
  // Load progress specific to a user ID from LocalStorage
  getUserProgress: async (userId: string): Promise<UserProgress> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network
    const key = PROGRESS_KEY_PREFIX + userId;
    const stored = localStorage.getItem(key);
    
    if (stored) {
      return JSON.parse(stored);
    }
    
    return { completedTopicIds: [], quizScores: {} };
  },

  // Helper to save
  _saveProgress: (userId: string, data: UserProgress) => {
    localStorage.setItem(PROGRESS_KEY_PREFIX + userId, JSON.stringify(data));
  },

  // Save topic completion
  markTopicComplete: async (userId: string, topicId: string) => {
    const progress = await dbService.getUserProgress(userId);
    if (!progress.completedTopicIds.includes(topicId)) {
      progress.completedTopicIds.push(topicId);
      dbService._saveProgress(userId, progress);
    }
    return progress;
  },

  // Save quiz score
  saveQuizScore: async (userId: string, topicId: string, score: number) => {
    const progress = await dbService.getUserProgress(userId);
    
    // Update score
    progress.quizScores[topicId] = score;
    
    // Auto complete if score > 0 (or some threshold, handled by UI logic mostly)
    if (!progress.completedTopicIds.includes(topicId)) {
      progress.completedTopicIds.push(topicId);
    }
    
    dbService._saveProgress(userId, progress);
    return progress;
  },

  // Toggle completion (for manual override)
  toggleTopicComplete: async (userId: string, topicId: string) => {
    const progress = await dbService.getUserProgress(userId);
    
    if (progress.completedTopicIds.includes(topicId)) {
      progress.completedTopicIds = progress.completedTopicIds.filter(id => id !== topicId);
    } else {
      progress.completedTopicIds.push(topicId);
    }
    
    dbService._saveProgress(userId, progress);
    return progress;
  },

  // Get Aggregated User Statistics
  getUserStats: async (userId: string) => {
    const progress = await dbService.getUserProgress(userId);
    
    // Flatten curriculum to get total topics count
    let totalTopics = 0;
    CURRICULUM.forEach(module => {
      totalTopics += module.topics.length;
    });

    const completedCount = progress.completedTopicIds.length;
    const percentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

    // Calculate Quiz Average
    const scores = Object.values(progress.quizScores);
    const averageScore = scores.length > 0 
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
      : 0;

    return {
      totalTopics,
      completedCount,
      percentage,
      averageScore,
      totalQuizzesTaken: scores.length
    };
  }
};