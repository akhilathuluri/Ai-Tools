import React, { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { initializeGemini, generateContent } from '../utils/gemini';
import { saveToHistory } from '../utils/storage';
import ToolLayout from '../components/shared/ToolLayout';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import OutputBox from '../components/shared/OutputBox';
import toast from 'react-hot-toast';

export default function SqlBuilder() {
  const { apiKey } = useApiKey();
  const [description, setDescription] = useState('');
  const [schema, setSchema] = useState('');
  const [queryType, setQueryType] = useState('select');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;

    setLoading(true);
    try {
      const model = initializeGemini(apiKey.key!);
      const prompt = `Generate a SQL ${queryType.toUpperCase()} query based on the following description:

Description: ${description}
${schema ? `Schema Information:\n${schema}` : ''}

Please provide:
1. The SQL query
2. Explanation of the query
3. Any relevant notes or considerations`;
      
      const content = await generateContent(model, prompt);
      setOutput(content);
      
      saveToHistory({
        id: Date.now().toString(),
        toolId: 'sql',
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
      title="SQL Query Builder"
      description="Generate SQL queries from natural language descriptions"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Query Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-32"
            placeholder="Describe what you want to achieve with your SQL query..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Schema Information (Optional)
          </label>
          <textarea
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-32"
            placeholder="Provide table schemas, relationships, etc..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Query Type
          </label>
          <select
            value={queryType}
            onChange={(e) => setQueryType(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="select">SELECT</option>
            <option value="insert">INSERT</option>
            <option value="update">UPDATE</option>
            <option value="delete">DELETE</option>
            <option value="create">CREATE</option>
            <option value="alter">ALTER</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate SQL Query'}
        </button>
      </form>

      {loading && <LoadingSpinner />}
      {output && <OutputBox content={output} />}
    </ToolLayout>
  );
}