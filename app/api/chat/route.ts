import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { text, history } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Ты — StudyMate AI, эмпатичный ИИ-репетитор. Отвечай на вопросы студента по предоставленному тексту. Если вопрос не по теме, мягко верни его к учебе.
    Контекст: ${text || "Нет контекста"}
    Вопрос: ${history && history.length > 0 ? history[history.length - 1].text : text}`;

    const result = await model.generateContent(prompt);
    return NextResponse.json({ reply: (await result.response).text() });
  } catch (error) { return NextResponse.json({ error: "Agent failed" }, { status: 500 }); }
}
