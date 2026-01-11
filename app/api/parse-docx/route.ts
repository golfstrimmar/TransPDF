import { NextRequest, NextResponse } from "next/server";
import { getTextExtractor } from "office-text-extractor";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Проверяем MIME docx
    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return NextResponse.json(
        { error: "Only .docx files are supported" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const extractor = getTextExtractor(); // с дефолтными методами: docx, pptx, xlsx, pdf[web:175][web:193]

    const text = await extractor.extractText({
      input: buffer,
      type: file.type,
    });

    // Разбиваем на блоки по двум переводам строки (абзацы)
    const chunks = text
      .split(/\n{2,}/)
      .map((chunk) => chunk.trim())
      .filter(Boolean);

    const pages = chunks.map((chunk, index) => ({
      pageNumber: index + 1,
      original: chunk,
      translated: "",
    }));

    return NextResponse.json({ pages });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to parse DOCX" },
      { status: 500 },
    );
  }
}
