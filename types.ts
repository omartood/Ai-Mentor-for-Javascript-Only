export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
  timestamp: number;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  promptContext: string;
  practiceCode?: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  topics: Topic[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  explanation: string;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  CHATTING = 'CHATTING',
  ERROR = 'ERROR'
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: number;
}

export interface UserProgress {
  completedTopicIds: string[];
  quizScores: Record<string, number>; // topicId -> score
}
