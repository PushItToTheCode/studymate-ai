"use client";
import { useState, useRef } from "react";
import { BookOpen, MessageSquare, BrainCircuit, Loader2, AlertCircle, Sparkles, Upload, ArrowRight, Lightbulb } from "lucide-react";

const EXAMPLES = {
  chat: {
    text: "Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity in a way such that the quantum state of each particle cannot be described independently of the state of the others, even when separated by large distances. Einstein famously referred to this as 'spooky action at a distance'.",
    label: "Quantum Entanglement"
  },
  summary: {
    text: "The James Webb Space Telescope (JWST) is a space telescope designed primarily to conduct infrared astronomy. As the largest optical telescope in space, its high resolution and sensitivity allow it to view objects too old, distant, or faint for the Hubble Space Telescope. This enables investigations across many fields of astronomy and cosmology, such as observation of the first stars and the formation of the first galaxies.",
    label: "James Webb Telescope"
  },
  quiz: {
    text: "Black holes are regions of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from inside it. The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole. The boundary of no escape is called the event horizon. Although it has a great effect on the fate and circumstances of an object crossing it, it has no locally detectable features according to general relativity.",
    label: "Black Hole Physics"
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"chat" | "summary" | "quiz">("chat");
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [antigravity, setAntigravity] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadExample = () => {
    setInputText(EXAMPLES[activeTab].text);
    setResult("");
    setError("");
    if (activeTab === "chat") setChatHistory([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setInputText(event.target?.result as string);
      setError("");
    };
    reader.onerror = () => setError("Failed to read file.");
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAgentAction = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setResult("");
    setError("");
    try {
      const endpoint = activeTab === "chat" ? "chat" : activeTab;
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, history: activeTab === "chat" ? chatHistory : [] }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Server error ${response.status}`);
      
      if (activeTab === "chat") {
        setChatHistory(prev => [...prev, { role: "user", text: inputText }, { role: "agent", text: data.reply }]);
        setInputText("");
      } else {
        setResult(data.reply);
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect.");
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "chat", label: "Tutor Chat", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "summary", label: "Summarizer", icon: <BookOpen className="w-4 h-4" /> },
    { id: "quiz", label: "Quiz Generator", icon: <BrainCircuit className="w-4 h-4" /> },
  ];

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-[#09090B] p-4 md:p-8">
      
      {/* ТОЛЬКО ЧИСТАЯ СЕТКА. БЕЗ ШУМА. БЕЗ ЦЕНТРАЛЬНОГО СВЕЧЕНИЯ. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #52525B 1px, transparent 1px),
              linear-gradient(to bottom, #52525B 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(25deg) scale(1.3)',
            transformOrigin: 'center top',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)'
          }}
        />
      </div>

      <main
        className={`relative z-10 w-full max-w-3xl origin-center transition-all duration-700 ease-out ${
          antigravity ? "animate-antigravity" : ""
        }`}
      >
        {/* Header */}
        <div className="mb-12 text-center animate-float">
          <h1
            className="mb-3 cursor-pointer select-none text-5xl font-bold tracking-tight text-white transition-all hover:text-indigo-200 md:text-6xl drop-shadow-[0_0_30px_rgba(99,102,241,0.2)] outline-none"
            onClick={() => setAntigravity(true)}
            title="Click for Antigravity!"
          >
            StudyMate AI
          </h1>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
            Intelligent Learning Concierge
          </p>
        </div>

        {/* Card */}
        <div className="w-full rounded-2xl bg-zinc-900/70 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl md:p-8">
          
          {/* Tabs + Example */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 space-x-1 rounded-xl bg-black/30 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setResult("");
                    setError("");
                  }}
                  className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-200 outline-none sm:text-sm ${
                    activeTab === tab.id
                      ? "bg-zinc-800 text-white shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            
            <button
              onClick={loadExample}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-indigo-500/10 px-3 py-2 text-xs font-medium text-indigo-300 transition-all outline-none hover:bg-indigo-500/20 hover:text-indigo-200"
            >
              <Lightbulb className="h-3.5 w-3.5" />
              Try: {EXAMPLES[activeTab].label}
            </button>
          </div>

          {/* Textarea */}
          <div className="group relative mb-6">
            <textarea
              className="custom-scrollbar h-44 w-full resize-none rounded-xl bg-black/30 p-5 pr-14 text-[15px] leading-relaxed text-zinc-200 placeholder-zinc-600 transition-all duration-200 outline-none focus:bg-black/40"
              placeholder="Paste your study notes, article, or upload a .txt file..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-4 right-4 rounded-lg p-2 text-zinc-500 transition-all duration-200 outline-none hover:bg-white/10 hover:text-zinc-300"
              title="Upload .txt or .md"
            >
              <Upload className="h-4 w-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Action Area */}
          <div className="flex items-center justify-between gap-4">
            <span className="hidden text-xs text-zinc-600 md:block font-mono">
              {inputText.length > 0 ? `${inputText.length} chars loaded` : "AWAITING_INPUT..."}
            </span>
            <button
              onClick={handleAgentAction}
              disabled={isLoading || !inputText.trim()}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-200 outline-none hover:bg-indigo-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none md:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Run Agent
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-red-500/10 p-4 animate-fadeIn">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <p className="text-sm font-medium text-red-300">{error}</p>
            </div>
          )}

          {/* Chat History */}
          {activeTab === "chat" && chatHistory.length > 0 && (
            <div className="custom-scrollbar mt-8 max-h-96 space-y-4 overflow-y-auto pr-2 animate-fadeIn">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md bg-indigo-600 text-white"
                        : "rounded-bl-md bg-zinc-800/60 text-zinc-200"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Result */}
          {result && activeTab !== "chat" && (
            <div className="mt-8 rounded-xl bg-indigo-500/[0.06] p-6 animate-fadeIn">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300">Agent Output</h3>
              </div>
              <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-zinc-300">{result}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
