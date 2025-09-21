import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ResultsSection from './components/ResultsSection';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import {generateCareerAdvice } from './services/geminiService';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'loading', 'results', 'error'
  const [results, setResults] = useState(null); // store structured results
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // New handleSubmit expecting structured userData from HomePage form
  const handleSubmit = async (userData) => {
    setIsLoading(true);
    setCurrentView('loading');
    setError('');

    try {
      // Call Gemini API with structured user data
      const advice = await generateCareerAdvice(userData);
      setResults(advice);
      setCurrentView('results');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
      setCurrentView('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setCurrentView('home');
    setResults(null);
    setError('');
  };

  const handleRetry = () => {
    setCurrentView('home');
    setError('');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'loading':
        return <LoadingSpinner />;
      case 'results':
        return <ResultsSection results={results} onStartOver={handleStartOver} />;
      case 'error':
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
          </div>
        );
      default:
        return <HomePage onSubmit={handleSubmit} isLoading={isLoading} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentView()}
    </div>
  );
}

export default App;
