"use client";

import { useState, useRef } from "react";
import Spinner from "@/components/icons/Spinner";
import RemoveIcon from "@/components/icons/RemoveIcon";
import imageCompression from "browser-image-compression";
type PageItem = {
  pageNumber: number;
  original: string;
  translated: string;
};

export default function ImageOcr({
  setPages,
}: {
  setPages: (p: PageItem[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setPages([]);

    const formData = new FormData(e.currentTarget);
    const file = (formData.get("file") as File) || null;

    if (!file) {
      setError("Файл не выбран");
      setLoading(false);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Поддерживаются только изображения (PNG/JPEG)");
      setLoading(false);
      return;
    }

    try {
      // 🔹 сжимаем до < 1 МБ
      const options = {
        maxSizeMB: 0.9, // < 1 MB с запасом[web:256][web:259]
        maxWidthOrHeight: 2000, // опционально ограничим по пикселям
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      console.log(
        "original",
        file.size / 1024,
        "KB; compressed",
        compressedFile.size / 1024,
        "KB",
      );

      const ocrForm = new FormData();
      ocrForm.append("file", compressedFile);
      // остальные поля: apikey, language, OCREngine и т.п. — как у тебя сейчас

      const res = await fetch("/api/ocr-image", {
        method: "POST",
        body: ocrForm,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      setPages(data.pages || []);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      <h2 className="text-2xl font-semibold">Изображение → текст (DE/RU)</h2>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 border border-slate-800 rounded-lg p-4 bg-slate-900"
      >
        <input
          ref={fileInputRef}
          type="file"
          name="file"
          accept="image/*"
          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-slate-700 file:text-slate-50 hover:file:bg-slate-600 transition-all duration-200 cursor-pointer"
        />
        <button type="submit" disabled={loading} className="btn btn-emerald">
          {loading ? <Spinner /> : "Загрузить"}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-red"
          onClick={(e) => {
            e.preventDefault();
            setPages([]);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
        >
          <RemoveIcon width={16} height={16} />
        </button>{" "}
      </form>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
