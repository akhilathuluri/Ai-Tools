import React from 'react';
import { getHistory, clearHistory } from '../utils/storage';
import ToolLayout from '../components/shared/ToolLayout';
import OutputBox from '../components/shared/OutputBox';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function History() {
  const [history, setHistory] = React.useState(getHistory());

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      setHistory([]);
      toast.success('History cleared');
    }
  };

  return (
    <ToolLayout
      title="Generated Content History"
      description="View and manage your previously generated content"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {history.length} items
          </p>
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
            >
              <Trash2 className="h-4 w-4" />
              Clear History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No history yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    Generated with: {item.toolId.charAt(0).toUpperCase() + item.toolId.slice(1)}
                  </span>
                  <span>{new Date(item.timestamp).toLocaleString()}</span>
                </div>
                <OutputBox content={item.content} />
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}