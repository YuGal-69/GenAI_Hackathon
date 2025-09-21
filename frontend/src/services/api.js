import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
});

// Send user info
export const sendUserInfo = async (data) => {
  try {
    const res = await API.post("/api/generate-career-path", data);
    return res.data;
  } catch (err) {
    console.error("API Error:", err);
    console.error("Error response:", err.response?.data);
    console.error("Error status:", err.response?.status);

    // More specific error handling
    if (err.code === "ECONNREFUSED") {
      throw new Error(
        "Cannot connect to server. Please make sure the backend is running on port 3000."
      );
    } else if (err.response?.status === 500) {
      throw new Error("Server error. Please try again later.");
    } else if (err.response?.status === 404) {
      throw new Error(
        "API endpoint not found. Please check the server configuration."
      );
    } else {
      throw new Error(
        err.response?.data?.error ||
          err.message ||
          "An unexpected error occurred."
      );
    }
  }
};
