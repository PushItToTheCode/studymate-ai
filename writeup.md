# StudyMate AI: Empowering Students with a Multi-Agent Learning Concierge

### 1. Core Concept & Value
Education is becoming increasingly complex. StudyMate AI solves **cognitive overload**. It is not just a chatbot; it is a **Learning Concierge**. By delegating tasks to specialized sub-agents, it provides a structured learning path: Understand (Summary), Test (Quiz), and Clarify (Chat). 

**Why Agents?** A single LLM prompt fails to provide pedagogically sound responses. By using an Agent framework, we separate concerns: the "Examiner Agent" evaluates, while the "Tutor Agent" shows empathy.

### 2. Architecture & The Build
Built with Next.js and Google's Gemini API.
- **Agent Architecture:** Implemented a Skill-Based Multi-Agent Pattern via API Routes.
- **Security:** API keys are strictly isolated in `.env.local` and executed server-side. No secrets reach the client.
- **Deployability:** Next.js architecture allows for zero-config deployment to Vercel.

### 3. Course Concepts Demonstrated
1. **Agent System (ADK Concepts):** Specialized tool-calling agents with distinct personas.
2. **Security Features:** Server-side environment variable handling.
3. **Antigravity:** Implemented a state-driven "Antigravity" easter egg in the UI (click the logo to see the interface float away).
4. **Deployability:** Cloud-ready architecture.
