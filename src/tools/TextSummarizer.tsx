import React, { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { initializeGemini, generateContent } from '../utils/gemini';
import { saveToHistory } from '../utils/storage';
import ToolLayout from '../components/shared/ToolLayout';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import OutputBox from '../components/shared/OutputBox';
import toast from 'react-hot-toast';

export default function TextSummarizer() {
  const { apiKey } = useApiKey();
  const [text, setText] = useState('');
  const [length, setLength] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;

    setLoading(true);
    try {
      const model = initializeGemini(apiKey.key!);
      const prompt = `Please provide a ${length} summary of the following text. Focus on the key points and main ideas:

${text}

Please ensure the summary is:
- Clear and concise
- Captures the main ideas
- Well-structured
- Easy to understand`;
      
      const content = await generateContent(model, prompt);
      setOutput(content);
      
      saveToHistory({
        id: Date.now().toString(),
        toolId: 'summarize',
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
      title="Text Summarizer"
      description="Generate concise summaries of long texts"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text to Summarize
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-64"
            placeholder="Paste your text here..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Summary Length
          </label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="brief">Brief (1-2 sentences)</option>
            <option value="medium">Medium (1 paragraph)</option>
            <option value="detailed">Detailed (2-3 paragraphs)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {loading ? 'Summarizing...' : 'Generate Summary'}
        </button>
      </form>

      {loading && <LoadingSpinner />}
      {output && <OutputBox content={output} />}
    </ToolLayout>
  );
}