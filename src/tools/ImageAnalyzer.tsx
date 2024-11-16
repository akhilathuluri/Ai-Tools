import React, { useState, useCallback } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { initializeGemini } from '../utils/gemini';
import { saveToHistory } from '../utils/storage';
import ToolLayout from '../components/shared/ToolLayout';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import OutputBox from '../components/shared/OutputBox';
import { Image, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ImageAnalyzer() {
  const { apiKey } = useApiKey();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    } else {
      toast.error('Please upload an image file');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreview(null);
    setOutput('');
  };

  const analyzeImage = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const model = initializeGemini(apiKey.key!);
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1];
          const prompt = `Analyze this image and provide:
1. Detailed description of what's in the image
2. Key elements and objects identified
3. Colors, composition, and style analysis
4. Any text or writing visible in the image
5. Overall mood or atmosphere
6. Technical aspects (if relevant)`;

          const result = await model.generateContent([
            {
              inlineData: {
                data: base64Data,
                mimeType: file.type
              }
            },
            { text: prompt }
          ]);
          
          const response = await result.response;
          const content = response.text();
          setOutput(content);
          
          saveToHistory({
            id: Date.now().toString(),
            toolId: 'image',
            content: `Image Analysis:\n\n${content}`,
            timestamp: Date.now(),
          });
        } catch (error: any) {
          toast.error(error.message || 'Failed to analyze image');
        } finally {
          setLoading(false);
        }
      };

      reader.readAsDataURL(file);
    } catch (error: any) {
      toast.error(error.message || 'Failed to analyze image');
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Image Analyzer"
      description="Upload an image to get AI-powered analysis and insights"
    >
      <div className="space-y-6">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            preview ? 'border-indigo-600' : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-h-96 mx-auto rounded-lg"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Image className="h-12 w-12 text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  Drag and drop an image, or click to select
                </p>
                <label className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {preview && (
          <button
            onClick={analyzeImage}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        )}

        {loading && <LoadingSpinner />}
        {output && <OutputBox content={output} />}
      </div>
    </ToolLayout>
  );
}
