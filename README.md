# NexusAI Studio 🤖

A powerful AI-powered content generation toolkit that helps you create, enhance, and manage various types of content using Google's Gemini AI technology.

## 📑 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setting up Google Gemini API](#setting-up-google-gemini-api)
- [Available Tools](#available-tools)
- [Project Structure](#project-structure)
- [Technical Details](#technical-details)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🎯 Overview

NexusAI Studio is a web-based application that provides various AI-powered tools to help you create and manage content. Whether you're a writer, marketer, developer, or content creator, our suite of tools can help streamline your workflow.

## ✨ Features

- **Multiple AI Tools**: Access various content generation and enhancement tools
- **User-Friendly Interface**: Clean and intuitive design for easy navigation
- **History Tracking**: Save and review your previously generated content
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Fast Performance**: Built with React and Vite for optimal speed
- **Google Gemini Integration**: Powered by Google's advanced AI technology

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm (Node Package Manager)
- A Google Cloud account for Gemini API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/akhilathuluri/Ai-Tools.git
cd Ai-Tools
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Setting up Google Gemini API

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Gemini API for your project
4. Create an API key from the Credentials page
5. Copy your API key - you'll need this when using the application

## 🛠 Available Tools

1. **Blog Generator**
   - Create engaging blog posts
   - Customize tone and style
   - Generate multiple variations

2. **Prompt Engineer**
   - Design effective AI prompts
   - Test and refine prompts
   - Save successful prompts

3. **Email Composer**
   - Draft professional emails
   - Multiple email styles
   - Quick editing options

4. **ChatBot**
   - Interactive conversation
   - Context-aware responses
   - Natural language processing

5. **Text Summarizer**
   - Condense long content
   - Maintain key points
   - Adjustable summary length

6. **SQL Builder**
   - Generate SQL queries
   - Multiple database support
   - Query optimization

7. **Text Enhancer**
   - Improve writing style
   - Grammar correction
   - Vocabulary enhancement

8. **Hashtag Generator**
   - Create relevant hashtags
   - Trending tag suggestions
   - Platform-specific options

## 📁 Project Structure

```
nexusai-studio/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── tools/          # Individual tool components
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── App.tsx         # Main application component
├── public/            # Static assets
└── config files       # Various configuration files
```

## 🔧 Technical Details

### Build & Configuration
- **Vite**: Fast build tool and development server
- **TypeScript**: Type-safe JavaScript
- **ESLint**: Code quality and consistency
- **Tailwind CSS**: Utility-first styling
- **PostCSS**: CSS processing and optimization

### UI Components
- **React**: UI library
- **React Router**: Navigation and routing
- **Lucide React**: Icon components
- **React Hot Toast**: Notification system

### Utilities
- **Local Storage**: History management
- **Google Generative AI**: AI content generation
- **Type-safe APIs**: Comprehensive TypeScript support

## ❗ Troubleshooting

Common issues and solutions:

1. **API Key Issues**
   - Ensure your Google Gemini API key is valid
   - Check if you have billing enabled
   - Verify API quotas and limits

2. **Build Errors**
   - Run `npm install` to update dependencies
   - Clear npm cache: `npm cache clean --force`
   - Check Node.js version compatibility

3. **Performance Issues**
   - Enable lazy loading for large content
   - Clear browser cache and local storage
   - Check network connection speed

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your code follows our style guidelines and includes appropriate tests.

---

📝 **Note**: This project uses Google's Gemini AI API, which may have usage limits and costs associated with it. Please review Google's pricing and terms before deployment.

💡 **Tip**: For the best experience, we recommend using modern browsers like Chrome, Firefox, or Edge.

For additional support or questions, please open an issue in the GitHub repository.
