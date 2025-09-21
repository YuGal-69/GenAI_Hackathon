# CareerCompass AI

**CareerCompass AI** is a web application that provides **personalized career guidance using AI**. Users can input their subjects, skills, hobbies, learning style, and goals, and the AI generates **recommended career paths, skill gap analysis, and a learning roadmap** to help them achieve their dream jobs.

---

## 🌟 Features

- User-friendly **interactive form** to input profile details.
- AI-powered **career path recommendations**.
- Displays:

  - Recommended careers with **match score**.
  - Required skills for each career.
  - **Learning roadmap** and priority actions.
  - Skill gap analysis (what you have vs. missing skills).

- Responsive **frontend** built with React and Tailwind CSS.
- **Loading spinner** while processing AI responses.
- Clean and modern **card-based UI**.
- Supports **navigation between form and result pages**.

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express
- **AI Integration:** Google Generative AI (Gemini API)
- **State Management:** React `useState` & `useEffect`
- **Deployment Ready:** Can be hosted on Vercel / Netlify (frontend) and Render

---

## 📂 Project Structure

```
careercompass-ai/
├─ backend/
│  ├─ controllers/
│  ├─ routes/
│  ├─ models/
│  ├─ services/
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ services/
│  │  └─ App.jsx
├─ .env.example
├─ package.json
└─ README.md
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YuGal-69/GenAI_Hackathon.git
cd GenAI_Hackathon
```

### 2. Setup Backend

```bash
cd backend
npm install
```

- Create a `.env` file:

```env
PORT=3000
GEMINI_API_KEY=your_google_generative_api_key
```

- Start the backend server:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
```

- Start the React app:

```bash
npm run dev
```

- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🖥️ Usage

1. Fill in your **profile details** (subjects, skills, hobbies, etc.) in the form.
2. Click **Generate My Career Path**.
3. Wait for the AI to process your inputs.
4. View your **personalized career suggestions** and skill gap analysis on the **Result page**.
5. Repeat as needed to explore multiple scenarios.

---

## 🔧 Customization

- **Add/modify work types, education levels, or learning styles** in `HomePage.jsx`.
- **Adjust AI prompt or parameters** in `services/api.js`.
- **Styling** can be updated via Tailwind CSS classes in components.

---

## 📈 Future Enhancements

- Enable **Google authentication** for saving user profiles.
- Allow **exporting roadmap and recommendations** as PDF.
- Add **interactive charts** for skill gaps.
- Multi-language support.
- Deploy on **Vercel + Render** for full-stack hosting.

---

## 📝 License

MIT License © 2025 \YUgal
