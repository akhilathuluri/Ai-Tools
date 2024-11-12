import React from 'react';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface OutputBoxProps {
  content: string;
  onSave?: () => void;
}

export default function OutputBox({ content, onSave }: OutputBoxProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4">
        <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-mono text-sm">
          {content}
        </pre>
      </div>
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={handleCopy}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
}