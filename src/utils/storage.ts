import { GeneratedContent } from '../types';

const STORAGE_KEY = 'nexusai_history';

export const saveToHistory = (content: GeneratedContent) => {
  const history = getHistory();
  const updatedHistory = [content, ...history].slice(0, 100); // Keep last 100 items
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
};

export const getHistory = (): GeneratedContent[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};