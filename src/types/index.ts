export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
}

export interface ApiKeyState {
  key: string | null;
  isValid: boolean;
}

export interface GeneratedContent {
  id: string;
  toolId: string;
  content: string;
  timestamp: number;
}