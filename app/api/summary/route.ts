import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Ты — Агент-Сумматор. Выдели главную идею, 3-5 ключевых концептов и приведи одну неожиданную аналогию из реальной жизни для следующего текста:\n\n${text}`;

    const result = await model.generateContent(prompt);
    return NextResponse.json({ reply: (await result.response).text() });
  } catch (error) { return NextResponse.json({ error: "Agent failed" }, { status: 500 }); }
}
