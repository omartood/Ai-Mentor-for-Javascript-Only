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
}

export interface CurriculumModule {
  id: string;
  title: string;
  topics: Topic[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  CHATTING = 'CHATTING',
  ERROR = 'ERROR'
}