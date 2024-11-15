import React, { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { initializeGemini, generateContent } from '../utils/gemini';
import { saveToHistory } from '../utils/storage';
import ToolLayout from '../components/shared/ToolLayout';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import OutputBox from '../components/shared/OutputBox';
import { Github, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GithubAnalyzer() {
  const { apiKey } = useApiKey();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [userData, setUserData] = useState<any>(null);

  const fetchGithubData = async (username: string) => {
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();

      if (userResponse.status === 404) {
        throw new Error('User not found');
      }

      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`);
      const reposData = await reposResponse.json();

      return { user: userData, repos: reposData };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch GitHub data');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    try {
      const githubData = await fetchGithubData(username);
      setUserData(githubData);

      const model = initializeGemini(apiKey.key!);
      const prompt = `Analyze this GitHub profile and provide a professional summary:

User Information:
- Username: ${githubData.user.login}
- Name: ${githubData.user.name || 'N/A'}
- Bio: ${githubData.user.bio || 'N/A'}
- Followers: ${githubData.user.followers}
- Following: ${githubData.user.following}
- Public Repos: ${githubData.user.public_repos}

Top Repositories:
${githubData.repos.map((repo: any) => `
- ${repo.name}:
  Stars: ${repo.stargazers_count}
  Description: ${repo.description || 'N/A'}
  Language: ${repo.language || 'N/A'}
`).join('\n')}

Please provide:
1. A professional summary of the developer's profile
2. Analysis of their main areas of expertise based on repositories
3. Key metrics and achievements
4. Notable projects and contributions`;

      const content = await generateContent(model, prompt);
      setOutput(content);

      saveToHistory({
        id: Date.now().toString(),
        toolId: 'github',
        content: `GitHub Analysis for @${username}\n\n${content}`,
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
      title="GitHub Profile Analyzer"
      description="Analyze GitHub profiles and get detailed insights"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GitHub Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Github className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter GitHub username"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            'Analyzing...'
          ) : (
            <>
              <Search className="h-5 w-5" />
              Analyze Profile
            </>
          )}
        </button>
      </form>

      {loading && <LoadingSpinner />}
      
      {userData && !loading && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={userData.user.avatar_url}
              alt={`${username}'s avatar`}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {userData.user.name || username}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">@{username}</p>
              {userData.user.bio && (
                <p className="text-gray-700 dark:text-gray-200 mt-2">{userData.user.bio}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {userData.user.public_repos}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {userData.user.followers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {userData.user.following}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
            </div>
          </div>
        </div>
      )}

      {output && <OutputBox content={output} />}
    </ToolLayout>
  );
}
