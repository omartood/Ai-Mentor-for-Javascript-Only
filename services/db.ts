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
      const userProg = allProgress[userId];
      
      return userProg || { 
        completedTopicIds: [], 
        quizScores: {},
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null
      };
    }

    // --- Supabase Mode ---
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
      console.error("Error fetching progress:", error);
      return { 
        completedTopicIds: [], 
        quizScores: {},
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null
      };
    }

    if (!data) {
      return { 
        completedTopicIds: [], 
        quizScores: {},
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null
      };
    }

    return {
      completedTopicIds: data.completed_topic_ids || [],
      quizScores: data.quiz_scores || {},
      currentStreak: data.current_streak || 0,
      longestStreak: data.longest_streak || 0,
      lastActivityDate: data.last_activity_date ? new Date(data.last_activity_date).getTime() : null
    };
  },

  _saveProgress: async (userId: string, completedTopicIds: string[], quizScores: Record<string, number>, streakData?: { currentStreak: number, longestStreak: number, lastActivityDate: number }) => {
    // --- Fallback Mode ---
    if (!supabase) {
      const allProgressStr = localStorage.getItem(STORAGE_PROGRESS_KEY);
      const allProgress = allProgressStr ? JSON.parse(allProgressStr) : {};
      
      const prevData = allProgress[userId] || { currentStreak: 0, longestStreak: 0, lastActivityDate: null };

      allProgress[userId] = { 
        completedTopicIds, 
        quizScores,
        currentStreak: streakData?.currentStreak ?? prevData.currentStreak,
        longestStreak: streakData?.longestStreak ?? prevData.longestStreak,
        lastActivityDate: streakData?.lastActivityDate ?? prevData.lastActivityDate
      };
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(allProgress));
      return;
    }

    // --- Supabase Mode ---
    // Note: For Supabase, we assume snake_case columns exist or we store loosely. 
    // If strict schema, columns need to be added: current_streak, longest_streak, last_activity_date
    const payload: any = {
      user_id: userId,
      completed_topic_ids: completedTopicIds,
      quiz_scores: quizScores,
      updated_at: new Date().toISOString()
    };

    if (streakData) {
      payload.current_streak = streakData.currentStreak;
      payload.longest_streak = streakData.longestStreak;
      payload.last_activity_date = new Date(streakData.lastActivityDate).toISOString();
    }

    const { error } = await supabase
      .from('user_progress')
      .upsert(payload, { onConflict: 'user_id' });

    if (error) {
      console.error("Error saving progress:", error);
      throw error;
    }
  },

  checkAndUpdateStreak: async (userId: string) => {
    const current = await dbService.getUserProgress(userId);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    
    let lastActivity = 0;
    if (current.lastActivityDate) {
      const d = new Date(current.lastActivityDate);
      lastActivity = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const diff = today - lastActivity;

    let newCurrentStreak = current.currentStreak;
    let newLongestStreak = current.longestStreak;
    let shouldUpdate = false;

    if (!current.lastActivityDate) {
      // First time
      newCurrentStreak = 1;
      newLongestStreak = 1;
      shouldUpdate = true;
    } else if (diff === 0) {
      // Already active today, do nothing
      return current;
    } else if (diff === oneDay) {
      // Consecutive day
      newCurrentStreak += 1;
      if (newCurrentStreak > newLongestStreak) {
        newLongestStreak = newCurrentStreak;
      }
      shouldUpdate = true;
    } else if (diff > oneDay) {
      // Broken streak
      newCurrentStreak = 1;
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      await dbService._saveProgress(
        userId, 
        current.completedTopicIds, 
        current.quizScores, 
        { 
          currentStreak: newCurrentStreak, 
          longestStreak: newLongestStreak, 
          lastActivityDate: Date.now() 
        }
      );
      return {
        ...current,
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastActivityDate: Date.now()
      };
    }

    return current;
  },

  markTopicComplete: async (userId: string, topicId: string) => {
    const current = await dbService.getUserProgress(userId);
    
    if (!current.completedTopicIds.includes(topicId)) {
      const newTopics = [...current.completedTopicIds, topicId];
      // Also update streak on activity
      const streakUpdate = await dbService.checkAndUpdateStreak(userId);
      
      await dbService._saveProgress(userId, newTopics, current.quizScores, {
         currentStreak: streakUpdate.currentStreak,
         longestStreak: streakUpdate.longestStreak,
         lastActivityDate: Date.now()
      });
      return { ...current, completedTopicIds: newTopics, currentStreak: streakUpdate.currentStreak };
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
    
    // Update Streak
    const streakUpdate = await dbService.checkAndUpdateStreak(userId);

    await dbService._saveProgress(userId, newTopics, newScores, {
        currentStreak: streakUpdate.currentStreak,
        longestStreak: streakUpdate.longestStreak,
        lastActivityDate: Date.now()
    });
    
    return { completedTopicIds: newTopics, quizScores: newScores };
  },

  toggleTopicComplete: async (userId: string, topicId: string) => {
    const current = await dbService.getUserProgress(userId);
    
    let newTopics = [];
    if (current.completedTopicIds.includes(topicId)) {
      newTopics = current.completedTopicIds.filter(id => id !== topicId);
    } else {
      newTopics = [...current.completedTopicIds, topicId];
      // Only update streak on completion
      await dbService.checkAndUpdateStreak(userId);
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
      totalQuizzesTaken: scores.length,
      currentStreak: progress.currentStreak || 0,
      longestStreak: progress.longestStreak || 0
    };
  }
};