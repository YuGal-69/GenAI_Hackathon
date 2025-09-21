import React from 'react';
import CompassIcon from './CompassIcon';

const ResultsSection = ({ results, onStartOver }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <CompassIcon size={40} className="text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">
              Your Career Analysis
            </h1>
          </div>
          <p className="text-gray-600">
            AI-powered insights tailored just for you
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 mb-8">
          {/* Top 3 Career Matches */}
          <div className="lg:col-span-1">
            <div className="card h-full animate-slide-up">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Top 3 Career Matches
                </h2>
              </div>
              <div className="space-y-3">
                {results.careers.map((career, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-800">{career}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill Gap Analysis */}
          <div className="lg:col-span-1">
            <div className="card h-full animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Skill Gap Analysis
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-700 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Skills You Likely Have
                  </h3>
                  <div className="space-y-2">
                    {results.likelySkills.map((skill, index) => (
                      <div key={index} className="bg-green-50 px-3 py-2 rounded-lg text-sm text-green-800">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-orange-700 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Skills You Need
                  </h3>
                  <div className="space-y-2">
                    {results.neededSkills.map((skill, index) => (
                      <div key={index} className="bg-orange-50 px-3 py-2 rounded-lg text-sm text-orange-800">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Path */}
          <div className="lg:col-span-1">
            <div className="card h-full animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Learning Path
                </h2>
              </div>
              
              <div className="space-y-3">
                {results.learningPath.map((step, index) => (
                  <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
          <button
            onClick={onStartOver}
            className="btn-primary mr-4"
          >
            Explore Another Path
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
          >
            Save Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;