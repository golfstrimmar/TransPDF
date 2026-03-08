"use client";
import React, { useState, useRef } from "react";
import Spinner from "@/components/icons/Spinner";
import RemoveIcon from "@/components/icons/RemoveIcon";

// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
export default function Word({ pages, setPages }) {
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

    let endpoint = "/api/parse-pdf";

    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      endpoint = "/api/parse-docx";
    } else if (file.type === "application/pdf") {
      endpoint = "/api/parse-pdf";
    } else {
      setError("Поддерживаются только PDF и DOCX");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }

      const data = await res.json();
      setPages(data.pages || []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      <h2 className="text-2xl font-semibold">Word → текст (DE → RU)</h2>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 border border-slate-800 rounded-lg p-4 bg-slate-900"
      >
        <input
          ref={fileInputRef}
          type="file"
          name="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-slate-700 file:text-slate-50 hover:file:bg-slate-600 transition-all duration-200  cursor-pointer"
        />
        <button type="button" disabled={loading} className="btn btn-emerald">
          {loading ? <Spinner /> : "Загрузить"}
        </button>
        <button
          type="button"
          disabled={loading}
          className="btn btn-red"
          onClick={(e) => {
            e.preventDefault();
            setPages([]);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
        >
          <RemoveIcon width={16} height={16} />
        </button>
      </form>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
