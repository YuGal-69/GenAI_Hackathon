// server.js
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors()); // Enable CORS for frontend
app.use(express.json());
// to parse JSON body

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Health check endpoint
app.get("/api/ping", (req, res) => {
  res.status(200).send("pong");
});

// API endpoint
app.post("/api/generate-career-path", async (req, res) => {
  try {
    // Data coming from frontend / Postman
    const {
      subjects,
      hobbies,
      skills,
      workType,
      impact,
      dreamJob,
      education,
      learningStyle,
      question,
    } = req.body;

    // Create prompt dynamically
    // Create prompt dynamically (replace your existing prompt with this)
    const prompt = `
SYSTEM: You are "Pathfinder AI" — a concise, actionable career-advisor assistant for Indian students. 
Be empathetic, practical, and concise. Do not use long paragraphs: prefer short bullets and numbered steps.

USER PROFILE:
- Subjects: ${subjects}
- Hobbies: ${hobbies}
- Skills (current): ${skills}
- Preferred work style: ${workType}
- Desired impact: ${impact}
- Dream job or roles: ${dreamJob}
- Education level: ${education}
- Learning style: ${learningStyle}
- Weekly learning time: ${req.body.weeklyHours || "unspecified"}
- Specific question: ${question}

TASK:
Analyze the profile and return a JSON object (ONLY JSON) matching the exact schema below. Use Indian context when recommending roles, entry points, or internships. Keep text short and actionable. If any field is missing in the profile, make a conservative assumption and note it under "assumptions".

REQUIRED OUTPUT SCHEMA (exact keys):
{
  "summary": "<1-line summary of best-fit career direction>",
  "career_matches": [
    {
      "title": "<job title>",
      "score": <0-100 relevance score>,
      "reason": "<one-sentence reason>",
      "entry_level_role": "<example entry-level job / internship>",
      "required_skills": ["skill1","skill2"],
      "recommended_learning_steps": [
        {"step": 1, "task": "Learn X", "duration_weeks": 4, "resource_type": "course/project/certification", "priority": "high/medium/low"}
      ]
    }
  ],
  "skill_gap_summary": {
    "have": ["skillA","skillB"],
    "missing": ["skillX","skillY"],
    "top_3_missing": ["skillX","skillY","skillZ"]
  },
  "learning_roadmap": [
    {"week_range": "1-4", "objective": "Do X", "deliverable": "e.g., GitHub project link or certificate", "effort_hours_per_week": 10}
  ],
  "priority_actions": ["Action 1", "Action 2"],
  "confidence": <0-100 integer>,
  "assumptions": ["If any assumptions made"]
}

ADDITIONAL RULES:
1. Use short bullet reasoning. No long essays.
2. Provide at most 3 career_matches.
3. Prioritize steps based on weekly learning hours (if provided).
4. If a course name is suggested, use generic platform placeholders (e.g., "Intro Python (Coursera/ NPTEL/ Udemy)").
5. Return ONLY the JSON object; do not add extra commentary outside JSON.
6. Do NOT wrap the JSON in markdown code blocks or any other formatting.
7. Start your response directly with { and end with }.
`;

    // Call Gemini API
    const result = await model.generateContent(prompt);

    // Parse the JSON response from Gemini
    const aiResponse = result.response.text();
    let parsedResponse;

    try {
      // Clean the response - remove markdown code blocks and extra text
      let cleanResponse = aiResponse.trim();

      // Remove markdown code blocks if present
      if (cleanResponse.includes("```json")) {
        cleanResponse = cleanResponse
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "");
      } else if (cleanResponse.includes("```")) {
        cleanResponse = cleanResponse.replace(/```\n?/g, "");
      }

      // Remove any leading/trailing text that's not JSON
      const jsonStart = cleanResponse.indexOf("{");
      const jsonEnd = cleanResponse.lastIndexOf("}") + 1;

      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        cleanResponse = cleanResponse.substring(jsonStart, jsonEnd);
      }

      // Try to parse as JSON
      parsedResponse = JSON.parse(cleanResponse);

      // Validate that we have the expected structure
      if (!parsedResponse.summary || !parsedResponse.career_matches) {
        throw new Error("Invalid JSON structure from AI");
      }
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw AI Response:", aiResponse);

      // If parsing fails, create a fallback structure
      parsedResponse = {
        summary: "AI-generated career guidance based on your profile",
        career_matches: [
          {
            title: "General Career Path",
            score: 75,
            reason: "Based on your profile and interests",
            entry_level_role: "Entry-level position in your field of interest",
            required_skills: [
              "Communication",
              "Problem-solving",
              "Adaptability",
            ],
            recommended_learning_steps: [
              {
                step: 1,
                task: "Develop core skills in your area of interest",
                duration_weeks: 4,
                resource_type: "course",
                priority: "high",
              },
            ],
          },
        ],
        skill_gap_summary: {
          have: ["Basic skills from your profile"],
          missing: ["Industry-specific skills"],
          top_3_missing: [
            "Technical skills",
            "Industry knowledge",
            "Professional experience",
          ],
        },
        learning_roadmap: [
          {
            week_range: "1-4",
            objective: "Foundation building",
            deliverable: "Basic understanding of the field",
            effort_hours_per_week: 10,
          },
        ],
        priority_actions: [
          "Research your target industry",
          "Start building relevant skills",
          "Network with professionals in the field",
        ],
        confidence: 70,
        assumptions: ["Based on limited profile information"],
        raw_response: aiResponse,
        parsed_successfully: false,
      };
    }

    // Send back result to frontend
    res.json({ success: true, data: parsedResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
