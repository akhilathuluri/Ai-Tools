import React, { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { initializeGemini, generateContent } from '../utils/gemini';
import { saveToHistory } from '../utils/storage';
import ToolLayout from '../components/shared/ToolLayout';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import OutputBox from '../components/shared/OutputBox';
import toast from 'react-hot-toast';

export default function HashtagGenerator() {
  const { apiKey } = useApiKey();
  const [description, setDescription] = useState('');
  const [niche, setNiche] = useState('general');
  const [count, setCount] = useState('15');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;

    setLoading(true);
    try {
      const model = initializeGemini(apiKey.key!);
      const prompt = `Generate ${count} Instagram hashtags for the following content:

Content Description: ${description}
Niche: ${niche}

Please provide:
1. A curated list of relevant hashtags
2. Mix of popular and niche-specific hashtags
3. Brief explanation of hashtag selection
4. Potential reach estimates`;
      
      const content = await generateContent(model, prompt);
      setOutput(content);
      
      saveToHistory({
        id: Date.now().toString(),
        toolId: 'hashtags',
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
      title="Instagram Hashtag Generator"
      description="Generate relevant hashtags for your Instagram posts"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Content Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-32"
            placeholder="Describe your post content..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content Niche
            </label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="general">General</option>
              <option value="fashion">Fashion</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="fitness">Fitness</option>
              <option value="technology">Technology</option>
              <option value="art">Art</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Hashtags
            </label>
            <select
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="10">10 hashtags</option>
              <option value="15">15 hashtags</option>
              <option value="20">20 hashtags</option>
              <option value="30">30 hashtags</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Hashtags'}
        </button>
      </form>

      {loading && <LoadingSpinner />}
      {output && <OutputBox content={output} />}
    </ToolLayout>
  );
}