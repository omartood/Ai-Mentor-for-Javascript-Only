
# JS Master: AI Mentor 🎓⚡

**JS Master** is a sophisticated, interactive educational platform designed to guide users from JavaScript beginners to advanced developers. Powered by **Google Gemini 2.5**, it features a "Code First" mentorship approach, real-time feedback, integrated practice environments, and a structured curriculum.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-3.8-sky)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange)

---

## 🌟 Key Features

### 🧠 AI-Powered Mentorship
- **Contextual Chat**: A persistent chat interface that understands the specific topic you are studying.
- **Streaming Responses**: Real-time text generation for a fluid conversation experience.
- **Markdown Support**: Renders code blocks, bold text, lists, and headers beautifully.

### 📚 Structured Curriculum
- **20 Comprehensive Modules**: Covers History, DOM, OOP, Async/Await, Security, Performance, and more.
- **Progress Locking**: Ensures mastery by locking future modules until previous ones are completed.
- **96+ Topics**: Detailed lessons with prompts tailored to teach "Why" and "How".

### 💻 Integrated Code Playground
- **Sandboxed Execution**: Write and run JavaScript directly in the browser.
- **Custom Console**: Captures `console.log`, `warn`, and `error` outputs within the UI.
- **Auto-Preloading**: Loads practice code snippets relevant to the active lesson.

### 🎯 Assessment System
- **Dynamic Quizzes**: Generates unique 10-question quizzes for every topic on the fly using AI.
- **Mixed Logic**: Questions cover Conceptual Understanding, Code Output Prediction, and Debugging.
- **Passing Threshold**: Requires a 50% score to mark a topic as "Mastered" and unlock progress.

### 👤 User System (Simulated Backend)
- **Authentication**: Full Login/Register flow.
- **User Profiles**: Tracks join date, total progress %, and average quiz scores.
- **Persistence**: Uses `localStorage` to persist user sessions and progress database without an external server.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini (@google/genai SDK)
- **Syntax Highlighting**: PrismJS
- **Icons**: Custom SVG Icons
- **State Management**: React Hooks + LocalStorage

---

## 🚀 Getting Started

### Prerequisites
1. **Node.js** (v18 or higher)
2. **Google AI Studio API Key** (Get one [here](https://aistudio.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/js-master-ai.git
   cd js-master-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your API key.
   *Note: In the provided code, `process.env.API_KEY` is used. If using Vite, use `VITE_API_KEY`.*

   ```env
   API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the Application**
   ```bash
   npm start
   # or
   npm run dev
   ```

---

## 📂 Project Structure

```
/
├── components/
│   ├── App.tsx              # Main Application Controller
│   ├── AuthModal.tsx        # Login/Register Forms
│   ├── CodeEditor.tsx       # Javascript Playground & Console
│   ├── Icons.tsx            # SVG Icon Collection
│   ├── LandingPage.tsx      # Marketing/Welcome Page
│   ├── MessageBubble.tsx    # Chat Message Renderer (Markdown/Code)
│   ├── QuizModal.tsx        # AI Quiz Interface
│   ├── Sidebar.tsx          # Navigation & Module Progress
│   └── UserProfileModal.tsx # Stats & Logout
├── services/
│   ├── auth.ts              # Mock Auth Service (LocalStorage)
│   ├── db.ts                # Mock Database Service (Progress Tracking)
│   └── gemini.ts            # Google GenAI Integration
├── constants.ts             # Curriculum Data & Prompts
├── types.ts                 # TypeScript Interfaces
├── index.html               # Entry HTML (PrismJS CDN included here)
└── index.tsx                # React Entry Point
```

---

## 🧩 Architecture Details

### The "Simulated Backend"
Since this is a frontend-only application, we simulate a backend environment to demonstrate full-stack concepts:
1. **Auth Service (`services/auth.ts`)**: Manages user registration and login by storing hashed-like credentials in `localStorage`.
2. **Database Service (`services/db.ts`)**: links progress (completed topics, quiz scores) to specific User IDs. This allows multiple users to use the same browser and have separate progress.

### AI Integration
The app uses the `gemini-2.5-flash` model for low-latency responses.
- **Lesson Generation**: The AI acts as "JS Sensei", using the context provided in `constants.ts` to teach specific topics.
- **Quiz Generation**: A specialized prompt instructs the AI to return a purely JSON array of questions, mixed between logic puzzles and coding problems.

---

## 🎨 Customization

### Changing the Curriculum
Modify `constants.ts`. You can add modules, change prompts, or update the `practiceCode` snippet that appears in the editor for specific topics.

### Theming
The app uses a custom color palette defined in Tailwind classes:
- **Primary**: `#f7df1e` (JavaScript Yellow)
- **Background**: `slate-950` / `#1e1e1e` (Dark Code Editor Theme)

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
