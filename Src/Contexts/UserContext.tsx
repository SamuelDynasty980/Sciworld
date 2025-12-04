import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  updateProgress: (videoId: string) => void;
  completeQuiz: (quizId: string) => void;
  addBadge: (badge: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('sciworld-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sciworld-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sciworld-user');
    }
  }, [user]);

  const updateProgress = (videoId: string) => {
    if (user && !user.videosWatched.includes(videoId)) {
      setUser({
        ...user,
        videosWatched: [...user.videosWatched, videoId]
      });
    }
  };

  const completeQuiz = (quizId: string) => {
    if (user && !user.quizzesCompleted.includes(quizId)) {
      setUser({
        ...user,
        quizzesCompleted: [...user.quizzesCompleted, quizId]
      });
    }
  };

  const addBadge = (badge: string) => {
    if (user && !user.badges.includes(badge)) {
      setUser({
        ...user,
        badges: [...user.badges, badge]
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateProgress, completeQuiz, addBadge }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
