import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 text-center max-w-md">
          <div className="text-6xl mb-4">🤔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Data Found
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you need to complete the career assessment first.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold"
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  let data = result.data || result;

  if (typeof data.raw_response === "string") {
    try {
      const cleanStr = data.raw_response.replace(/```json|```/g, "").trim();
      data = JSON.parse(cleanStr);
    } catch (err) {
      console.error("Failed to parse raw_response:", err);
    }
  }

  const renderCareerMatch = (match, index) => (
    <div
      key={index}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-6 transform hover:scale-[1.02] transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-4">
            {index + 1}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
              {match.title}
            </h3>
            <p className="text-gray-500 font-medium">
              Perfect career match for you
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
            {match.score}%
          </span>
          <p className="text-sm text-gray-500 mt-1">Match Score</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
        <h4 className="font-bold text-gray-800 mb-2 flex items-center">
          <span className="text-xl mr-2">💡</span>
          Why This Matches You
        </h4>
        <p className="text-gray-700 leading-relaxed">{match.reason}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-indigo-50 rounded-xl p-5">
          <h4 className="font-bold text-indigo-800 mb-3 flex items-center">
            <span className="text-lg mr-2">🎯</span>
            Entry Level Role
          </h4>
          <p className="text-indigo-700 font-medium">
            {match.entry_level_role}
          </p>
        </div>
        <div className="bg-purple-50 rounded-xl p-5">
          <h4 className="font-bold text-purple-800 mb-3 flex items-center">
            <span className="text-lg mr-2">🔧</span>
            Required Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {match.required_skills?.map((skill, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {match.recommended_learning_steps && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-xl mr-2">📚</span>
            Your Learning Journey
          </h4>
          <div className="space-y-4">
            {match.recommended_learning_steps.map((step, i) => (
              <div key={i} className="flex items-start space-x-4 group">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                    step.priority === "high"
                      ? "bg-gradient-to-r from-red-500 to-pink-500"
                      : step.priority === "medium"
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                      : "bg-gradient-to-r from-blue-500 to-indigo-500"
                  }`}
                >
                  {step.step}
                </div>
                <div className="flex-1 bg-white rounded-lg p-4 shadow-md group-hover:shadow-lg transition-shadow">
                  <p className="text-gray-800 font-semibold mb-2">
                    {step.task}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                      {step.duration_weeks} weeks
                    </span>
                    <span
                      className={`px-2 py-1 rounded font-medium ${
                        step.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : step.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {step.priority} priority
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderRoadmap = (dataObj) => {
    if (!dataObj.learning_roadmap) return null;
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="text-2xl mr-3">🗺️</span>
          Your Learning Roadmap
        </h3>
        <div className="space-y-6">
          {dataObj.learning_roadmap.map((phase, index) => (
            <div key={index} className="relative">
              <div className="flex items-start space-x-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                  {index < dataObj.learning_roadmap.length - 1 && (
                    <div className="w-1 h-16 bg-gradient-to-b from-indigo-500 to-purple-500 mt-2 rounded"></div>
                  )}
                </div>
                <div className="flex-1 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-gray-800">
                      Weeks {phase.week_range}
                    </h4>
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                      {phase.effort_hours_per_week}h/week
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold mb-2">
                    {phase.objective}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Deliverable:</span>{" "}
                    {phase.deliverable}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white text-3xl font-bold shadow-2xl mb-6">
              🎯
            </div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Your Career Path
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-powered recommendations tailored specifically for your unique
              profile and aspirations
            </p>
          </div>

          {/* Summary */}
          {data.summary && (
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl p-8 text-white mb-12 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4 flex items-center">
                    <span className="text-2xl mr-3">✨</span>
                    Executive Summary
                  </h2>
                  <p className="text-xl leading-relaxed mb-6">{data.summary}</p>
                </div>
                {data.confidence && (
                  <div className="text-center ml-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <div className="text-4xl font-black mb-2">
                        {data.confidence}%
                      </div>
                      <div className="text-sm font-semibold opacity-90">
                        Confidence Score
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Career Matches */}
          {data.career_matches?.length > 0 && (
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                🚀 Your Perfect Career Matches
              </h2>
              {data.career_matches.map(renderCareerMatch)}
            </div>
          )}

          {/* Skill Gap Analysis */}
          {data.skill_gap_summary && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">📊</span>
                Skill Gap Analysis
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="font-bold text-green-800 mb-4 flex items-center">
                    <span className="text-lg mr-2">✅</span>
                    Skills You Have
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.skill_gap_summary.have?.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-red-50 rounded-xl p-6">
                  <h4 className="font-bold text-red-800 mb-4 flex items-center">
                    <span className="text-lg mr-2">📈</span>
                    Skills to Develop
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.skill_gap_summary.missing?.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {data.skill_gap_summary.top_3_missing && (
                  <div className="bg-orange-50 rounded-xl p-6">
                    <h4 className="font-bold text-orange-800 mb-4 flex items-center">
                      <span className="text-lg mr-2">🎯</span>
                      Priority Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data.skill_gap_summary.top_3_missing.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Learning Roadmap */}
          {renderRoadmap(data)}

          {/* Priority Actions */}
          {data.priority_actions?.length > 0 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">⚡</span>
                Priority Actions
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {data.priority_actions.map((action, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-gray-800 font-medium leading-relaxed">
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assumptions */}
          {data.assumptions?.length > 0 && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
                <span className="text-xl mr-3">⚠️</span>
                Assumptions Made
              </h3>
              <ul className="space-y-2">
                {data.assumptions.map((assumption, i) => (
                  <li key={i} className="text-yellow-700 flex items-start">
                    <span className="text-yellow-600 mr-3 font-bold">•</span>
                    {assumption}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation */}
          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span className="mr-3">🔄</span>
              Generate Another Path
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
