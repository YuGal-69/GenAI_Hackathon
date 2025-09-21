import React, { useState } from 'react';
import CompassIcon from './CompassIcon';

const HomePage = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    subjects: '',
    hobbies: '',
    skills: '',
    workType: '',
    impact: '',
    dreamJob: '',
    education: '',
    learningStyle: '',
  });

  const [error, setError] = useState('');

  const educationOptions = ['High School', 'Undergraduate', 'Postgraduate', 'Other'];
  const workTypeOptions = [
    'Building things / Hands-on projects',
    'Helping people / Social impact',
    'Research & analysis',
    'Managing teams / Leadership',
    'Creative design / Arts',
    'Working with technology / Innovation',
    'Business / Entrepreneurship',
  ];
  const learningStyleOptions = [
    'Hands-on projects / practice',
    'Videos / lectures',
    'Reading / books',
    'Online courses / structured programs',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation: all required fields must be filled
    const requiredFields = ['subjects', 'hobbies', 'skills', 'workType', 'impact', 'dreamJob', 'education', 'learningStyle'];
    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        setError('Please fill in all the fields to generate accurate results.');
        return;
      }
    }

    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <CompassIcon className="w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              CareerCompass AI
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 mb-1">
            Your Personalized Career Path Advisor
          </p>
          <p className="text-lg text-gray-500 italic">
            "Discover your future with AI-driven guidance."
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 card-hover">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Subjects */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Favorite Subjects
              </label>
              <input
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                placeholder="e.g., Math, Computer Science"
                className="input-field w-full"
                disabled={isLoading}
              />
            </div>

            {/* Hobbies */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Hobbies / Activities
              </label>
              <input
                type="text"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                placeholder="e.g., Coding, Gaming, Drawing"
                className="input-field w-full"
                disabled={isLoading}
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Skills / Strengths
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., Problem-solving, Creativity, Teamwork"
                className="input-field w-full"
                disabled={isLoading}
              />
            </div>

            {/* Work Type */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Preferred Work Type
              </label>
              <select
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                className="input-field w-full"
                disabled={isLoading}
              >
                <option value="">Select one</option>
                {workTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Desired Impact */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Desired Impact
              </label>
              <input
                type="text"
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                placeholder="e.g., Innovate in tech, Solve environmental problems"
                className="input-field w-full"
                disabled={isLoading}
              />
            </div>

            {/* Dream Job */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Dream Job / Career Goal
              </label>
              <input
                type="text"
                name="dreamJob"
                value={formData.dreamJob}
                onChange={handleChange}
                placeholder="e.g., Game Developer, Data Scientist"
                className="input-field w-full"
                disabled={isLoading}
              />
            </div>

            {/* Education */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Current Education Level
              </label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="input-field w-full"
                disabled={isLoading}
              >
                <option value="">Select one</option>
                {educationOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Learning Style */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Preferred Learning Style
              </label>
              <select
                name="learningStyle"
                value={formData.learningStyle}
                onChange={handleChange}
                className="input-field w-full"
                disabled={isLoading}
              >
                <option value="">Select one</option>
                {learningStyleOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Thinking...
                  </span>
                ) : (
                  "Generate My Career Path"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 flex items-center justify-center">
            <span className="mr-2">✨</span>
            Powered by Adaptive Skill Blueprinting
            <span className="ml-2">✨</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
