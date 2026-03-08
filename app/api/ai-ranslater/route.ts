import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.warn("GROQ_API_KEY is not set in environment variables");
}

export const maxDuration = 30;

type TranslateRequest = {
  text: string;
};
// -------------
export async function POST(req: NextRequest) {
  try {
    const { text } = (await req.json()) as TranslateRequest;

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const translatedText = await translateToRussian(text);

    return NextResponse.json({ text: translatedText }, { status: 200 });
  } catch (error) {
    console.error("translate error", error);
    return NextResponse.json(
      { error: "Failed to translate text" },
      { status: 500 },
    );
  }
}

// -------------
async function translateToRussian(text: string): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing");
  }

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "Ты профессиональный переводчик. Переводи любой текст строго на русский язык, максимально точно, без пояснений и лишних слов.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0,
      }),
    },
  );

  const data = await response.json();

  return data.choices?.[0]?.message?.content?.trim() ?? "";
}
