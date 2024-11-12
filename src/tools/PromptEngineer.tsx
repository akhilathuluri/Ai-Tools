import React, { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { initializeGemini, generateContent } from '../utils/gemini';
import { saveToHistory } from '../utils/storage';
import ToolLayout from '../components/shared/ToolLayout';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import OutputBox from '../components/shared/OutputBox';
import toast from 'react-hot-toast';

export default function PromptEngineer() {
  const { apiKey } = useApiKey();
  const [prompt, setPrompt] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || !goal) return;

    setLoading(true);
    try {
      const model = initializeGemini(apiKey.key!);
      const engineeringPrompt = `Enhance and optimize the following prompt to better achieve its goal:

Original Prompt: "${prompt}"
Goal: ${goal}

Please provide:
1. An enhanced version of the prompt
2. Explanation of improvements
3. Additional variations for different use cases`;
      
      const content = await generateContent(model, engineeringPrompt);
      setOutput(content);
      
      saveToHistory({
        id: Date.now().toString(),
        toolId: 'prompt',
        content,
        timestamp: Date.now(),
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Prompt Engineer"
      description="Enhance and optimize your prompts for better results"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Original Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-32"
            placeholder="Enter your prompt"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Goal
          </label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="What do you want to achieve with this prompt?"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {loading ? 'Enhancing...' : 'Enhance Prompt'}
        </button>
      </form>

      {loading && <LoadingSpinner />}
      {output && <OutputBox content={output} />}
    </ToolLayout>
  );
}