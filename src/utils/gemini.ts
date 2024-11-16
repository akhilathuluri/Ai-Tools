import { GoogleGenerativeAI } from '@google/generative-ai';

export const initializeGemini = (apiKey: string) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
};

export const generateContent = async (
  model: any,
  prompt: string,
  temperature = 0.7
) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to generate content');
  }
};
