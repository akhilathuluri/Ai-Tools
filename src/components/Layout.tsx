import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useApiKey } from '../context/ApiKeyContext';
import ApiKeySetup from './ApiKeySetup';

export default function Layout() {
  const { apiKey } = useApiKey();

  if (!apiKey.isValid) {
    return <ApiKeySetup />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}