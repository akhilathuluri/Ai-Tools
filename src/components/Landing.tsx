import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Sparkles,
  PenLine,
  MessageSquare,
  Mail,
  FileText,
  Database,
  Type,
  Hash,
  ArrowRight,
  Zap,
  Shield,
  Cpu
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PenLine className="h-6 w-6 text-indigo-500" />,
      title: 'Blog Content Generator',
      description: 'Create engaging blog posts with AI assistance'
    },
    {
      icon: <Sparkles className="h-6 w-6 text-indigo-500" />,
      title: 'Prompt Engineer',
      description: 'Optimize your prompts for better results'
    },
    {
      icon: <Mail className="h-6 w-6 text-indigo-500" />,
      title: 'Email Composer',
      description: 'Write professional emails effortlessly'
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-indigo-500" />,
      title: 'Interactive Chat',
      description: 'Natural conversations with AI'
    },
    {
      icon: <FileText className="h-6 w-6 text-indigo-500" />,
      title: 'Text Summarizer',
      description: 'Condense long texts instantly'
    },
    {
      icon: <Database className="h-6 w-6 text-indigo-500" />,
      title: 'SQL Builder',
      description: 'Generate SQL queries from plain English'
    },
    {
      icon: <Type className="h-6 w-6 text-indigo-500" />,
      title: 'Text Enhancement',
      description: 'Polish and improve your writing'
    },
    {
      icon: <Hash className="h-6 w-6 text-indigo-500" />,
      title: 'Hashtag Generator',
      description: 'Create engaging Instagram hashtags'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Bot className="h-20 w-20 text-indigo-600 animate-pulse-slow" />
                <Sparkles className="absolute -right-2 -top-2 h-6 w-6 text-indigo-400" />
              </div>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl">
              NexusAI Studio
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 sm:mt-4">
              Unleash the power of AI with our comprehensive suite of tools designed to enhance your productivity
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => navigate('/tools/blog')}
                className="px-8 py-3 text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Get Started
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Powerful AI Tools at Your Fingertips
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Everything you need to streamline your workflow and boost productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="relative">
                {feature.icon}
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white/50 dark:bg-gray-800/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Zap className="h-10 w-10 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Lightning Fast
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Get instant results powered by cutting-edge AI technology
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-10 w-10 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Secure & Private
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Your data is encrypted and never stored without permission
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Cpu className="h-10 w-10 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Advanced AI
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Powered by Google's Gemini AI for superior results
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}