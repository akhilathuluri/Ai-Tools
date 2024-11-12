import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  PenLine,
  MessageSquare,
  Mail,
  Bot,
  FileText,
  Database,
  Type,
  Hash,
  Sparkles,
  History
} from 'lucide-react';
import { Tool } from '../types';

const tools: Tool[] = [
  {
    id: 'blog',
    name: 'Blog Content Generator',
    description: 'Create engaging blog posts with AI',
    icon: 'PenLine',
    path: '/tools/blog'
  },
  {
    id: 'prompt',
    name: 'Prompt Engineer',
    description: 'Enhance and optimize your prompts',
    icon: 'Sparkles',
    path: '/tools/prompt'
  },
  {
    id: 'email',
    name: 'Email Composer',
    description: 'Write professional emails',
    icon: 'Mail',
    path: '/tools/email'
  },
  {
    id: 'chat',
    name: 'Interactive Chat',
    description: 'Chat with AI assistant',
    icon: 'MessageSquare',
    path: '/tools/chat'
  },
  {
    id: 'summarize',
    name: 'Text Summarizer',
    description: 'Summarize long texts',
    icon: 'FileText',
    path: '/tools/summarize'
  },
  {
    id: 'sql',
    name: 'SQL Builder',
    description: 'Generate SQL queries',
    icon: 'Database',
    path: '/tools/sql'
  },
  {
    id: 'enhance',
    name: 'Text Enhancement',
    description: 'Improve your writing',
    icon: 'Type',
    path: '/tools/enhance'
  },
  {
    id: 'hashtags',
    name: 'Hashtag Generator',
    description: 'Generate Instagram hashtags',
    icon: 'Hash',
    path: '/tools/hashtags'
  },
  {
    id: 'history',
    name: 'History',
    description: 'View saved content',
    icon: 'History',
    path: '/history'
  }
];

const iconComponents = {
  PenLine,
  MessageSquare,
  Mail,
  Bot,
  FileText,
  Database,
  Type,
  Hash,
  Sparkles,
  History
};

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <nav className="space-y-1">
          {tools.map((tool) => {
            const IconComponent = iconComponents[tool.icon as keyof typeof iconComponents];
            return (
              <NavLink
                key={tool.id}
                to={tool.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`
                }
              >
                <IconComponent className="h-5 w-5 mr-3" />
                <span>{tool.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}