import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "GROQ_API_KEY is not set" }, { status: 500 });

    const { text } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a Summarizer Agent. Provide: 1. Executive summary (2-3 sentences). 2. 3-5 Key Concepts as bullet points. 3. One real-world analogy." },
          { role: "user", content: text }
        ],
        temperature: 0.5,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) throw new Error(`Groq error: ${response.status}`);
    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (error: any) {
    console.error("Summary Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
