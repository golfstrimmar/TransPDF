"use client";
import { useState } from "react";
import Spinner from "@/components/icons/Spinner";
type PageItem = {
  pageNumber: number;
  original: string;
  translated: string;
};

export default function ExportToDropbox({ pages }: { pages: PageItem[] }) {
  const [exporting, setExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  async function handleExportToDropbox() {
    setExportMessage(null);
    setExporting(true);
    try {
      const res = await fetch("/api/export-dropbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages, fileName }),
      });

      const data = await res.json(); // читаем тело один раз

      if (!res.ok) {
        console.error("Dropbox error:", data);
        setExportMessage(
          typeof data.error === "string"
            ? data.error
            : "Ошибка при загрузке в Dropbox",
        );
        return;
      }

      setExportMessage("Файл отправлен в Dropbox");
    } catch (err: any) {
      console.error("Export error:", err);
      setExportMessage("Ошибка экспорта");
    } finally {
      setExporting(false);
      setTimeout(() => {
        setExportMessage(null);
      }, 3000);
    }
  }

  return (
    <div className="mb-4 flex items-center gap-4">
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-slate-50"
        placeholder="Имя файла в Dropbox"
      />
      <button
        type="button"
        onClick={handleExportToDropbox}
        disabled={exporting}
        className="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 disabled:opacity-50 cursor-pointer transition-all duration-200"
      >
        {exporting ? <Spinner /> : "Сохранить в Dropbox"}
      </button>

      {exportMessage && (
        <span className="text-sm text-red-500">{exportMessage}</span>
      )}
    </div>
  );
}
