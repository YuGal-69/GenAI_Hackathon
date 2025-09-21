import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { sendUserInfo } from "./services/api";
import "./App.css";

function AppContent() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      // Add defaults if not provided
      const payload = {
        ...formData,
        question: formData.question || "Generate my personalized career path based on my profile",
        weeklyHours: formData.weeklyHours || 10, // default value
      };

      const result = await sendUserInfo(payload);
      navigate("/result", { state: { result } });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage onSubmit={handleFormSubmit} isLoading={isLoading} />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
};

export default App;
