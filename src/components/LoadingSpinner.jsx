import React from 'react';

const LoadingSpinner = ({ message = "Analyzing your profile with AI..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="loading-spinner mb-4"></div>
      <p className="text-gray-600 text-center max-w-md">
        {message}
      </p>
      <div className="flex space-x-1 mt-4">
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;