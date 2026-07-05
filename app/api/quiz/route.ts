import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Ты — Агент-Экзаменатор. Создай 3 вопроса по тексту: 1 на факты, 1 на глубокое понимание, 1 сценарный. В конце напиши правильные ответы. Текст:\n\n${text}`;

    const result = await model.generateContent(prompt);
    return NextResponse.json({ reply: (await result.response).text() });
  } catch (error) { return NextResponse.json({ error: "Agent failed" }, { status: 500 }); }
}
