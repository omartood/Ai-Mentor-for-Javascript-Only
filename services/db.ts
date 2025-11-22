import { UserProgress } from '../types';
import { CURRICULUM } from '../constants';

const PROGRESS_KEY_PREFIX = 'js-master-progress-';

export const dbService = {
  // Load progress specific to a user ID
  getUserProgress: (userId: string): UserProgress => {
    const key = `${PROGRESS_KEY_PREFIX}${userId}`;
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return {
      completedTopicIds: [],
      quizScores: {}
    };
  },

  // Save topic completion
  markTopicComplete: (userId: string, topicId: string) => {
    const progress = dbService.getUserProgress(userId);
    if (!progress.completedTopicIds.includes(topicId)) {
      progress.completedTopicIds.push(topicId);
      const key = `${PROGRESS_KEY_PREFIX}${userId}`;
      localStorage.setItem(key, JSON.stringify(progress));
    }
    return progress;
  },

  // Save quiz score
  saveQuizScore: (userId: string, topicId: string, score: number) => {
    const progress = dbService.getUserProgress(userId);
    
    // Update completion status if not already there
    if (!progress.completedTopicIds.includes(topicId)) {
      progress.completedTopicIds.push(topicId);
    }
    
    // Save the score (keep the highest if already exists? For now just overwrite with latest attempt)
    progress.quizScores[topicId] = score;
    
    const key = `${PROGRESS_KEY_PREFIX}${userId}`;
    localStorage.setItem(key, JSON.stringify(progress));
    return progress;
  },

  // Toggle completion (for manual override)
  toggleTopicComplete: (userId: string, topicId: string) => {
    const progress = dbService.getUserProgress(userId);
    if (progress.completedTopicIds.includes(topicId)) {
      progress.completedTopicIds = progress.completedTopicIds.filter(id => id !== topicId);
    } else {
      progress.completedTopicIds.push(topicId);
    }
    const key = `${PROGRESS_KEY_PREFIX}${userId}`;
    localStorage.setItem(key, JSON.stringify(progress));
    return progress;
  },

  // Get Aggregated User Statistics
  getUserStats: (userId: string) => {
    const progress = dbService.getUserProgress(userId);
    
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