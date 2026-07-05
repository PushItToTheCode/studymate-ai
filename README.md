# StudyMate AI
**Track:** Agents for Good / Concierge Agents

StudyMate AI is an intelligent learning concierge that helps students master complex materials. Powered by a multi-agent architecture using Google's Gemini models, it processes study notes to generate concise summaries, interactive quizzes, and provides a chat interface for answering questions.

## Problem Statement
Students are often overwhelmed by dense academic texts. StudyMate AI solves cognitive overload by acting as a personal AI tutor that instantly digests content and tests understanding.

## Architecture & Agent Design
The application utilizes a **Skill-Based Multi-Agent System** pattern:
1. **The Tutor Agent (Chat):** Maintains conversational context and guides the student.
2. **The Summarizer Agent:** Specialized in information extraction and formatting data into digestable chunks.
3. **The Examiner Agent (Quiz):** Generates varied question types to evaluate comprehension.

### Security Features
- **Zero API Keys in Code:** The application strictly uses `.env.local`.
- **Server-Side Execution:** All API calls happen on Next.js API Routes, ensuring the API key is never exposed to the client browser.

## Setup Instructions
1. Clone the repository and run `npm install`.
2. Create a `.env.local` file and add your `GOOGLE_API_KEY` from Google AI Studio.
3. Run `npm run dev` and open `http://localhost:3000`.

## Course Concepts Demonstrated
- **Agent System:** Skill-based routing to specialized LLM personas.
- **Security:** Server-side environment variable masking.
- **Antigravity (Easter Egg):** Click the main title in the UI to trigger the Antigravity animation, demonstrating state-driven UI manipulation.
- **Deployability:** Built on Next.js for instant Vercel deployment.
