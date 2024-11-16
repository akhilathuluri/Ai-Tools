import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Landing from './components/Landing';
import { ApiKeyProvider } from './context/ApiKeyContext';

// Lazy load tool components
const BlogGenerator = React.lazy(() => import('./tools/BlogGenerator'));
const PromptEngineer = React.lazy(() => import('./tools/PromptEngineer'));
const EmailComposer = React.lazy(() => import('./tools/EmailComposer'));
const ChatBot = React.lazy(() => import('./tools/ChatBot'));
const TextSummarizer = React.lazy(() => import('./tools/TextSummarizer'));
const SqlBuilder = React.lazy(() => import('./tools/SqlBuilder'));
const TextEnhancer = React.lazy(() => import('./tools/TextEnhancer'));
const HashtagGenerator = React.lazy(() => import('./tools/HashtagGenerator'));
const GithubAnalyzer = React.lazy(() => import('./tools/GithubAnalyzer'));
const ImageAnalyzer = React.lazy(() => import('./tools/ImageAnalyzer'));
const History = React.lazy(() => import('./tools/History'));

function App() {
  return (
    <ApiKeyProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/" element={<Layout />}>
            <Route path="tools/blog" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <BlogGenerator />
              </React.Suspense>
            } />
            <Route path="tools/prompt" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <PromptEngineer />
              </React.Suspense>
            } />
            <Route path="tools/email" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <EmailComposer />
              </React.Suspense>
            } />
            <Route path="tools/chat" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <ChatBot />
              </React.Suspense>
            } />
            <Route path="tools/summarize" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <TextSummarizer />
              </React.Suspense>
            } />
            <Route path="tools/sql" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <SqlBuilder />
              </React.Suspense>
            } />
            <Route path="tools/enhance" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <TextEnhancer />
              </React.Suspense>
            } />
            <Route path="tools/hashtags" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <HashtagGenerator />
              </React.Suspense>
            } />
            <Route path="tools/github" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <GithubAnalyzer />
              </React.Suspense>
            } />
            <Route path="tools/image" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <ImageAnalyzer />
              </React.Suspense>
            } />
            <Route path="history" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <History />
              </React.Suspense>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiKeyProvider>
  );
}

export default App;
