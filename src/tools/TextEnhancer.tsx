import React, { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { initializeGemini, generateContent } from '../utils/gemini';
import { saveToHistory } from '../utils/storage';
import ToolLayout from '../components/shared/ToolLayout';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import OutputBox from '../components/shared/OutputBox';
import toast from 'react-hot-toast';

export default function TextEnhancer() {
  const { apiKey } = useApiKey();
  const [text, setText] = useState('');
  const [goal, setGoal] = useState('improve');
  const [tone, setTone] = useState('professional');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;

    setLoading(true);
    try {
      const model = initializeGemini(apiKey.key!);
      const prompt = `Please ${goal} the following text and make it more ${tone}:

${text}

Please provide:
1. Enhanced version
2. List of improvements made
3. Suggestions for further enhancement`;
      
      const content = await generateContent(model, prompt);
      setOutput(content);
      
      saveToHistory({
        id: Date.now().toString(),
        toolId: 'enhance',
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
      title="Text Enhancement Suite"
      description="Improve and polish your writing"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text to Enhance
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-48"
            placeholder="Enter your text here..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enhancement Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="improve">General Improvement</option>
              <option value="simplify">Simplify</option>
              <option value="elaborate">Elaborate</option>
              <option value="correct">Grammar & Spelling</option>
              <option value="formalize">Make More Formal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Desired Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="professional">Professional</option>
              <option value="academic">Academic</option>
              <option value="conversational">Conversational</option>
              <option value="persuasive">Persuasive</option>
              <option value="friendly">Friendly</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {loading ? 'Enhancing...' : 'Enhance Text'}
        </button>
      </form>

      {loading && <LoadingSpinner />}
      {output && <OutputBox content={output} />}
    </ToolLayout>
  );
}