import { supabase } from '../supabaseClient';
import { UserProgress } from '../types';
import { CURRICULUM } from '../constants';

// Fallback Constants
const STORAGE_PROGRESS_KEY = 'js_master_progress';

export const dbService = {
  getUserProgress: async (userId: string): Promise<UserProgress> => {
    // --- Fallback Mode ---
    if (!supabase) {
      const allProgressStr = localStorage.getItem(STORAGE_PROGRESS_KEY);
      const allProgress = allProgressStr ? JSON.parse(allProgressStr) : {};
      return allProgress[userId] || { completedTopicIds: [], quizScores: {} };
    }

    // --- Supabase Mode ---
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
      console.error("Error fetching progress:", error);
      return { completedTopicIds: [], quizScores: {} };
    }

    if (!data) {
      return { completedTopicIds: [], quizScores: {} };
    }

    return {
      completedTopicIds: data.completed_topic_ids || [],
      quizScores: data.quiz_scores || {}
    };
  },

  _saveProgress: async (userId: string, completedTopicIds: string[], quizScores: Record<string, number>) => {
    // --- Fallback Mode ---
    if (!supabase) {
      const allProgressStr = localStorage.getItem(STORAGE_PROGRESS_KEY);
      const allProgress = allProgressStr ? JSON.parse(allProgressStr) : {};
      
      allProgress[userId] = { completedTopicIds, quizScores };
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(allProgress));
      return;
    }

    // --- Supabase Mode ---
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        completed_topic_ids: completedTopicIds,
        quiz_scores: quizScores,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) {
      console.error("Error saving progress:", error);
      throw error;
    }
  },

  markTopicComplete: async (userId: string, topicId: string) => {
    const current = await dbService.getUserProgress(userId);
    
    if (!current.completedTopicIds.includes(topicId)) {
      const newTopics = [...current.completedTopicIds, topicId];
      await dbService._saveProgress(userId, newTopics, current.quizScores);
      return { ...current, completedTopicIds: newTopics };
    }
    return current;
  },

  saveQuizScore: async (userId: string, topicId: string, score: number) => {
    const current = await dbService.getUserProgress(userId);
    
    const newScores = { ...current.quizScores, [topicId]: score };
    
    let newTopics = [...current.completedTopicIds];
    if (!newTopics.includes(topicId)) {
      newTopics.push(topicId);
    }
    
    await dbService._saveProgress(userId, newTopics, newScores);
    
    return { completedTopicIds: newTopics, quizScores: newScores };
  },

  toggleTopicComplete: async (userId: string, topicId: string) => {
    const current = await dbService.getUserProgress(userId);
    
    let newTopics = [];
    if (current.completedTopicIds.includes(topicId)) {
      newTopics = current.completedTopicIds.filter(id => id !== topicId);
    } else {
      newTopics = [...current.completedTopicIds, topicId];
    }
    
    await dbService._saveProgress(userId, newTopics, current.quizScores);
    return { ...current, completedTopicIds: newTopics };
  },

  getUserStats: async (userId: string) => {
    const progress = await dbService.getUserProgress(userId);
    
    let totalTopics = 0;
    CURRICULUM.forEach(module => {
      module.subModules.forEach(sub => {
        totalTopics += sub.topics.length;
      });
    });

    const completedCount = progress.completedTopicIds.length;
    const percentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

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