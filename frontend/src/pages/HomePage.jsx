import React, { useState, useEffect } from "react";

// CompassIcon component
const CompassIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke="url(#gradient1)"
      strokeWidth="3"
      fill="url(#gradient2)"
    />
    <circle
      cx="50"
      cy="50"
      r="35"
      stroke="url(#gradient3)"
      strokeWidth="2"
      fill="none"
    />
    <path d="M50 20 L55 45 L50 50 L45 45 Z" fill="#3B82F6" />
    <path d="M50 80 L45 55 L50 50 L55 55 Z" fill="#EF4444" />
    <circle cx="50" cy="50" r="3" fill="#1F2937" />
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EBF4FF" />
        <stop offset="100%" stopColor="#F3E8FF" />
      </linearGradient>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
    </defs>
  </svg>
);

const HomePage = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    subjects: "",
    hobbies: "",
    skills: "",
    workType: "",
    impact: "",
    dreamJob: "",
    education: "",
    learningStyle: "",
  });

  const [error, setError] = useState("");

  const educationOptions = [
    "High School",
    "Undergraduate",
    "Postgraduate",
    "Other",
  ];
  const workTypeOptions = [
    "Building things / Hands-on projects",
    "Helping people / Social impact",
    "Research & analysis",
    "Managing teams / Leadership",
    "Creative design / Arts",
    "Working with technology / Innovation",
    "Business / Entrepreneurship",
  ];
  const learningStyleOptions = [
    "Hands-on projects / practice",
    "Videos / lectures",
    "Reading / books",
    "Online courses / structured programs",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setError("");

    const requiredFields = [
      "subjects",
      "hobbies",
      "skills",
      "workType",
      "impact",
      "dreamJob",
      "education",
      "learningStyle",
    ];
    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        setError("Please fill in all the fields to generate accurate results.");
        return;
      }
    }

    onSubmit(formData);
  };

  const formFields = [
    {
      name: "subjects",
      label: "Favorite Subjects",
      placeholder: "e.g., Math, Computer Science, Physics",
      type: "input",
      icon: "📚",
    },
    {
      name: "hobbies",
      label: "Hobbies & Activities",
      placeholder: "e.g., Coding, Gaming, Drawing, Sports",
      type: "input",
      icon: "🎯",
    },
    {
      name: "skills",
      label: "Skills & Strengths",
      placeholder: "e.g., Problem-solving, Creativity, Leadership",
      type: "input",
      icon: "⭐",
    },
    {
      name: "workType",
      label: "Preferred Work Type",
      type: "select",
      options: workTypeOptions,
      icon: "💼",
    },
    {
      name: "impact",
      label: "Desired Impact",
      placeholder: "e.g., Innovate in tech, Solve environmental problems",
      type: "input",
      icon: "🌟",
    },
    {
      name: "dreamJob",
      label: "Dream Job / Career Goal",
      placeholder: "e.g., Game Developer, Data Scientist, CEO",
      type: "input",
      icon: "🚀",
    },
    {
      name: "education",
      label: "Current Education Level",
      type: "select",
      options: educationOptions,
      icon: "🎓",
    },
    {
      name: "learningStyle",
      label: "Preferred Learning Style",
      type: "select",
      options: learningStyleOptions,
      icon: "📖",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div
          className="absolute top-32 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6 group">
              <div className="transform group-hover:rotate-12 transition-transform duration-300">
                <CompassIcon className="w-16 h-16 mr-4 drop-shadow-lg" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                CareerCompass
              </h1>
            </div>
            <div className="space-y-3">
              <p className="text-2xl md:text-3xl font-bold text-gray-700">
                Your AI-Powered Career Navigator
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover your perfect career path with our advanced AI that
                analyzes your interests, skills, and goals to provide
                personalized recommendations
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500 font-medium">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  ✨ AI-Powered
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  🎯 Personalized
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  ⚡ Instant Results
                </span>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10 transform hover:scale-[1.01] transition-all duration-300">
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {formFields.map((field, index) => (
                  <div
                    key={field.name}
                    className="group transform hover:scale-105 transition-all duration-200"
                  >
                    <label className="flex items-center text-lg font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                      <span className="text-2xl mr-3">{field.icon}</span>
                      {field.label}
                    </label>

                    {field.type === "input" ? (
                      <input
                        type="text"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 focus:bg-white transition-all duration-300 placeholder-gray-400 text-gray-800 font-medium group-hover:border-indigo-300 outline-none"
                        disabled={isLoading}
                      />
                    ) : (
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 focus:bg-white transition-all duration-300 text-gray-800 font-medium group-hover:border-indigo-300 outline-none"
                        disabled={isLoading}
                      >
                        <option value="" className="text-gray-500">
                          Choose an option
                        </option>
                        {field.options.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="text-gray-800"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-xl flex items-center animate-bounce">
                  <span className="text-xl mr-3">⚠️</span>
                  <span className="font-semibold">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none min-w-[280px]"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-4 h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-lg">Analyzing Your Profile...</span>
                    </span>
                  ) : (
                    <>
                      <span>🚀 Generate My Career Path</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 space-y-4">
            <p className="text-gray-600 flex items-center justify-center text-lg font-semibold">
              <span className="text-2xl mr-3">🤖</span>
              Powered by Advanced AI & Machine Learning
              <span className="text-2xl ml-3">✨</span>
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Smart Analysis
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></span>
                Real-time Processing
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.7s" }}
                ></span>
                Personalized Results
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
