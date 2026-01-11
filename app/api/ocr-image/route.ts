import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are supported" },
        { status: 400 },
      );
    }

    const apiKey = process.env.OCR_SPACE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OCR API key is not configured" },
        { status: 500 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Определяем расширение и filetype для ocr.space
    const mime = file.type || "image/jpeg";
    let ext = "jpg";
    let filetype = "JPG";

    if (mime === "image/png") {
      ext = "png";
      filetype = "PNG";
    } else if (mime === "image/gif") {
      ext = "gif";
      filetype = "GIF";
    } else if (mime === "image/bmp") {
      ext = "bmp";
      filetype = "BMP";
    } // jpeg/jpg по умолчанию — JPG [web:270]

    const originalName = file.name || `upload.${ext}`;
    const finalName = originalName.includes(".")
      ? originalName
      : `${originalName}.${ext}`;

    const ocrForm = new FormData();
    ocrForm.append("apikey", apiKey);
    ocrForm.append("language", "auto");
    ocrForm.append("isOverlayRequired", "false");
    ocrForm.append("OCREngine", "2");
    // 🔹 явно указываем тип файла, как советует дока
    ocrForm.append("filetype", filetype); // PDF, GIF, PNG, JPG, TIF, BMP [web:270]

    const blob = new Blob([buffer], { type: mime });
    ocrForm.append("file", blob, finalName);

    const res = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: ocrForm as any,
    });

    const data = await res.json();

    if (!res.ok || data.IsErroredOnProcessing) {
      console.error("OCR error:", data);
      return NextResponse.json(
        {
          error: data.ErrorMessage?.[0] || data.ErrorMessage || "OCR failed",
        },
        { status: 500 },
      );
    }

    const parsedText =
      data.ParsedResults?.map((r: any) => r.ParsedText).join("\n\n") || "";

    const chunks = parsedText
      .split(/\n{2,}/)
      .map((chunk: string) => chunk.trim())
      .filter(Boolean);

    const pages = chunks.map((chunk, index) => ({
      pageNumber: index + 1,
      original: chunk,
      translated: "",
    }));

    return NextResponse.json({ pages });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to OCR image" }, { status: 500 });
  }
}
