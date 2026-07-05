"use client";
import { useState } from "react";
import { BookOpen, MessageSquare, BrainCircuit, Sparkles, Loader2, Rocket } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"chat" | "summary" | "quiz">("chat");
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string, text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  
  const [antigravity, setAntigravity] = useState(false);

  const handleAgentAction = async (actionType: string) => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setResult("");
    try {
      const response = await fetch(`/api/${actionType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, history: chatHistory }),
      });
      const data = await response.json();
      if (actionType === "chat") {
        setChatHistory([...chatHistory, { role: "user", text: inputText }, { role: "agent", text: data.reply }]);
        setInputText("");
      } else {
        setResult(data.reply);
      }
    } catch (error) {
      setResult("Ошибка связи с агентом.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 md:p-8 max-w-6xl mx-auto transition-all duration-1000 ${antigravity ? 'animate-antigravity' : ''}`}>
      <div className="text-center mb-8 animate-float">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 cursor-pointer select-none flex items-center justify-center gap-3" onClick={() => setAntigravity(!antigravity)}>
          StudyMate AI <Rocket className="w-10 h-10 text-pink-500 hover:animate-spin" />
        </h1>
        <p className="text-slate-400 text-lg">Ваш ИИ-консьерж для глубокого обучения (Kaggle Capstone 2026)</p>
      </div>

      <div className="w-full glass rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="flex space-x-2 mb-6 border-b border-slate-700 pb-4 overflow-x-auto">
          {[
            { id: "chat", label: "Чат с Ассистентом", icon: <MessageSquare className="w-4 h-4 mr-2" />, color: "indigo" },
            { id: "summary", label: "Суммаризация", icon: <BookOpen className="w-4 h-4 mr-2" />, color: "purple" },
            { id: "quiz", label: "Генерация Квиза", icon: <BrainCircuit className="w-4 h-4 mr-2" />, color: "pink" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all ${activeTab === tab.id ? `bg-${tab.color}-600 text-white` : "text-slate-400 hover:bg-slate-800"}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <textarea className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
            placeholder="Вставьте сложный текст, конспект или статью..."
            value={inputText} onChange={(e) => setInputText(e.target.value)} />
        </div>

        <button onClick={() => handleAgentAction(activeTab)} disabled={isLoading || !inputText.trim()}
          className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Агент обрабатывает...</>) : (<><Sparkles className="w-5 h-5 mr-2" /> Запустить Агента</>)}
        </button>

        {activeTab === "chat" && (
          <div className="mt-6 space-y-4 max-h-96 overflow-y-auto pr-2">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === "user" ? "bg-indigo-600 text-white rounded-br-none" : "glass text-slate-200 rounded-bl-none"}`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {result && activeTab !== "chat" && (
          <div className="mt-6 glass p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-400" /> Результат работы Агента
            </h3>
            <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}
