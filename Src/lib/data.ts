import { Video, Quiz } from '@/types';

export const categories = [
  { id: 'physics', name: 'Physics', icon: 'Zap' },
  { id: 'chemistry', name: 'Chemistry', icon: 'Flask' },
  { id: 'biology', name: 'Biology', icon: 'Leaf' },
  { id: 'tech', name: 'Technology', icon: 'Laptop' },
  { id: 'earth', name: 'Earth Science', icon: 'Globe' },
  { id: 'space', name: 'Space', icon: 'Rocket' }
];

export const badges = [
  { id: 'curious', name: 'Curious Learner', icon: 'Eye', requirement: 5 },
  { id: 'explorer', name: 'Science Explorer', icon: 'Compass', requirement: 10 },
  { id: 'genius', name: 'Young Genius', icon: 'Brain', requirement: 20 },
  { id: 'master', name: 'Quiz Master', icon: 'Award', requirement: 15 }
];

export const videos: Video[] = [
  {
    id: '1',
    title: 'How Stars Are Born',
    description: 'Journey through space to discover how stars form from cosmic clouds!',
    duration: '3:42',
    category: 'space',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=250&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/07sMjGQasJM',
    ageGroup: ['kids', 'teens'],
    difficulty: 'easy'
  },
  {
    id: '2',
    title: 'The Water Cycle Explained',
    description: 'Learn how water moves through Earth in this colorful journey!',
    duration: '4:02',
    category: 'earth',
    thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/zBnKgwnn7i4',
    ageGroup: ['kids'],
    difficulty: 'easy'
  },
  {
    id: '3',
    title: 'Electricity and Circuits',
    description: 'What makes your lights turn on? Explore the power of electricity!',
    duration: '6:15',
    category: 'physics',
    thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/ru032Mfsfig',
    ageGroup: ['kids', 'teens'],
    difficulty: 'medium'
  },
  {
    id: '4',
    title: 'Plant Life Cycle',
    description: 'From seed to flower - watch plants grow in amazing detail!',
    duration: '3:45',
    category: 'biology',
    thumbnail: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=250&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/tkFPyue5X3Q',
    ageGroup: ['kids'],
    difficulty: 'easy'
  },
  {
    id: '5',
    title: 'States of Matter',
    description: 'Solid, liquid, gas - explore the different forms of matter!',
    duration: '4:30',
    category: 'chemistry',
    thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&h=250&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/btdN4jthYAQ',
    ageGroup: ['kids', 'teens'],
    difficulty: 'easy'
  },
  {
    id: '6',
    title: 'How Computers Think',
    description: 'Dive into the world of coding and computer logic!',
    duration: '5:12',
    category: 'tech',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
    ageGroup: ['teens'],
    difficulty: 'medium'
  }
];

export const quizzes: Quiz[] = [
  {
    id: 'q1',
    videoId: '1',
    questions: [
      {
        id: 'q1-1',
        question: 'What makes rockets fly into space?',
        options: ['Wings', 'Rocket fuel', 'Magic', 'Solar power'],
        correctAnswer: 1
      },
      {
        id: 'q1-2',
        question: 'Which force pulls rockets down to Earth?',
        options: ['Magnetism', 'Wind', 'Gravity', 'Electricity'],
        correctAnswer: 2
      },
      {
        id: 'q1-3',
        question: 'What does a rocket need to escape Earth?',
        options: ['Very fast speed', 'Lots of wings', 'Cold temperature', 'Extra weight'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'q2',
    videoId: '2',
    questions: [
      {
        id: 'q2-1',
        question: 'What happens when water heats up?',
        options: ['It freezes', 'It evaporates', 'It disappears forever', 'It turns to ice'],
        correctAnswer: 1
      },
      {
        id: 'q2-2',
        question: 'What do we call water vapor turning back into liquid?',
        options: ['Evaporation', 'Condensation', 'Precipitation', 'Filtration'],
        correctAnswer: 1
      },
      {
        id: 'q2-3',
        question: 'Where does rain come from?',
        options: ['The ocean', 'Clouds', 'Rivers', 'Mountains'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'q3',
    videoId: '3',
    questions: [
      {
        id: 'q3-1',
        question: 'What do you need to make a complete circuit?',
        options: ['Just a battery', 'A closed loop', 'Only wires', 'A switch'],
        correctAnswer: 1
      },
      {
        id: 'q3-2',
        question: 'What does a switch do in a circuit?',
        options: ['Makes electricity', 'Opens or closes the path', 'Stores energy', 'Creates light'],
        correctAnswer: 1
      },
      {
        id: 'q3-3',
        question: 'Which material conducts electricity best?',
        options: ['Plastic', 'Wood', 'Copper', 'Rubber'],
        correctAnswer: 2
      }
    ]
  }
];

export const avatars = [
  '👨‍🔬',
  '👩‍🔬',
  '🧑‍🚀',
  '👨‍🚀',
  '👩‍🚀',
  '🤓',
  '🧠',
  '🔬',
  '🚀',
  '🌟'
];
