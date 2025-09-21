import React from "react";

const LoadingSpinner = ({ message = "Analyzing your profile with AI..." }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 text-center max-w-md w-full">
        {/* Simple Spinner */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>

        {/* Message */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">Processing...</h3>
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Simple Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
