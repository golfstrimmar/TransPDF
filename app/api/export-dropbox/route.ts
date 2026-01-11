import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type PageItem = {
  pageNumber: number;
  original: string;
  translated: string;
};

export async function POST(req: NextRequest) {
  try {
    const { pages, fileName } = await req.json();

    if (!Array.isArray(pages) || pages.length === 0) {
      return NextResponse.json({ error: "No pages provided" }, { status: 400 });
    }

    const safeName =
      typeof fileName === "string" && fileName.trim()
        ? fileName.trim()
        : `pdf_export_${Date.now()}.txt`;

    const normalizedName = safeName.endsWith(".txt")
      ? safeName
      : `${safeName}.txt`;

    const path = `/${normalizedName}`;

    // 🔹 Сборка содержимого файла
    const contentLines: string[] = [];

    for (const p of pages as PageItem[]) {
      contentLines.push("");
      contentLines.push("ORIGINAL:");
      contentLines.push(p.original || "");
      contentLines.push("");
      contentLines.push("TRANSLATED:");
      contentLines.push(p.translated || "");
      contentLines.push("");
      contentLines.push("");
    }

    const fileContent = contentLines.join("\n");

    const token = process.env.DROPBOX_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Dropbox token is not configured" },
        { status: 500 },
      );
    }

    const res = await fetch("https://content.dropboxapi.com/2/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/octet-stream",
        "Dropbox-API-Arg": JSON.stringify({
          path,
          mode: "add",
          autorename: true,
          mute: false,
        }),
      },
      body: Buffer.from(fileContent, "utf-8"),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Dropbox error:", text);
      return NextResponse.json(
        { error: `Dropbox upload failed: ${text}` },
        { status: 500 },
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, file: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to export to Dropbox" },
      { status: 500 },
    );
  }
}
