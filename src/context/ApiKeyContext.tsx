import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApiKeyState } from '../types';

interface ApiKeyContextType {
  apiKey: ApiKeyState;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKeyState] = useState<ApiKeyState>(() => {
    const stored = localStorage.getItem('nexusai_api_key');
    return stored ? { key: stored, isValid: true } : { key: null, isValid: false };
  });

  const setApiKey = (key: string) => {
    localStorage.setItem('nexusai_api_key', key);
    setApiKeyState({ key, isValid: true });
  };

  const clearApiKey = () => {
    localStorage.removeItem('nexusai_api_key');
    setApiKeyState({ key: null, isValid: false });
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey, clearApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};