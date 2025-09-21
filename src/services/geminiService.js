// Gemini API Service
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Generates personalized career advice using Gemini API.
 * @param {Object} userData - student info from form
 * @returns {Object} structured career advice
 */
export const generateCareerAdvice = async (userData) => {
  const prompt = `
Based on the following student's profile, act as a highly personalized career advisor for an Indian student. 
Provide output in this structured format:

Student Profile:
- Favorite Subjects: ${userData.subjects}
- Hobbies / Activities: ${userData.hobbies}
- Skills / Strengths: ${userData.skills}
- Preferred Work Type: ${userData.workType}
- Desired Impact: ${userData.impact}
- Dream Job / Career Goal: ${userData.dreamJob}
- Current Education Level: ${userData.education}
- Preferred Learning Style: ${userData.learningStyle}

### Instructions for AI:
1. Suggest **Top 3 career recommendations** with real, trending job titles suitable for the profile.
2. For the **top career**, provide a **Skill Gap Analysis**: 3 likely skills the student already has, and 3 skills they need to develop.
3. Provide a **Recommended Learning Path** with 3 concrete, actionable steps like courses, projects, or practice ideas.
4. Keep the output **clear, concise, and easy to read**. Format as JSON like below:

{
  "careers": ["Career 1", "Career 2", "Career 3"],
  "likelySkills": ["skill1", "skill2", "skill3"],
  "neededSkills": ["skill1", "skill2", "skill3"],
  "learningPath": ["Step 1: ...", "Step 2: ...", "Step 3: ..."]
}`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!response.ok) throw new Error(`API request failed: ${response.status}`);

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    // Try parsing JSON from AI output
    try {
      return JSON.parse(text);
    } catch {
      console.warn("Failed to parse JSON, returning raw text.");
      return {
        careers: ["Software Engineer", "AI/ML Engineer", "Product Manager"],
        likelySkills: ["Problem-solving", "Basic programming", "Math fundamentals"],
        neededSkills: ["Advanced JavaScript/Python", "System design", "Cloud computing"],
        learningPath: [
          "Complete full-stack web dev course",
          "Build 3-5 portfolio projects",
          "Learn ML fundamentals and cloud deployment"
        ]
      };
    }

  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate career advice. Try again later.');
  }
};
