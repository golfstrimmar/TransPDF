import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse-new";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const data = await pdf(buffer); // data.text — весь текст[web:24]

    const pages = data.text
      .split("\n\n")
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((text, index) => ({
        pageNumber: index + 1,
        original: text,
        translated: "",
      }));

    return NextResponse.json({ pages });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}
