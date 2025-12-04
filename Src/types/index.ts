export type AgeGroup = 'kids' | 'teens';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  ageGroup: AgeGroup;
  avatar: string;
  videosWatched: string[];
  quizzesCompleted: string[];
  badges: string[];
  createdAt: Date;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnail: string;
  embedUrl: string;
  ageGroup: AgeGroup[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Quiz {
  id: string;
  videoId: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
}
