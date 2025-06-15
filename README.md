# QuizWhiz - An AI-Powered Quiz Generator 🧠⚡

**QuizWhiz** is an AI-powered quiz application that dynamically generates personalized quizzes based on user-selected topics and preferences. It also tracks performance over time and provides smart insights into areas of improvement — all wrapped in a sleek, responsive UI.

With real-time feedback and deep analysis, QuizWhiz ensures learning is both fun and focused.

---

## ✨ Features

- 🤖 AI-powered quiz generation (Gemini API)
- 🧠 Topic-based and customizable quizzes
- 📊 Progress tracking with performance analytics
- 📈 Smart insights and suggestions for improvement
- ⏱️ Global and per-question timers
- 🔐 Secure user authentication
- 🌙 Dark mode support
- 📱 Fully responsive and mobile-friendly UI

---

## 🛠️ Tech Stack

**Frontend:** React + Vite, TailwindCSS  
**Backend:** Node.js, Express  
**Database:** MongoDB Atlas  
**Deployment:** Vercel (Frontend), Render (Backend)  
**AI Integration:** Gemini API

---

## 🚀 Installation

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local instance)
- Vite (for running frontend)

---

## 📦 Clone the Repository

```bash
git clone https://github.com/NirmaNP/QuizWhiz-Ai-Quiz-Generator.git
cd QuizWhiz-Ai-Quiz-Generator
```
**Setup**

Backend :-
```bash
  cd Server
  npm install
```
Create a .env file:
```bash
  PORT=4000
  MONGO_URI=<your-mongodb-uri>
  JWT_SECRET=<your-secret>
```
Run the backend:
```bash
  node new.js
  or
  nodemon new.js
  or
  npm start
```

Frontend:-
```bash
  cd Client
  npm install
```
Create a .env file in client/:
```bash
  VITE_REACT_APP_BACKEND_URL=http://localhost:4000
  GEMINI_API_KEY=<your-gemini-api-key>
```
Run the frontend:
```bash
  npm run dev
```

Can directly run both frontend and backend:
```bash
  npm run dev
```
while in Parent directory 
## Contributing

Contributions are always welcomed!

1. Fork the repo  
2. Create your feature branch: git checkout -b feature/FeatureName  
3. Commit your changes: git commit -m 'Add FeatureName'  
4. Push to the branch: git push origin feature/FeatureName  
5. Open a pull request
