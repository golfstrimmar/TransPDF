"use client";
import React, { useState, useRef } from "react";
import Spinner from "@/components/icons/Spinner";
import RemoveIcon from "@/components/icons/RemoveIcon";

// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
export default function Pdf({ pages, setPages }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setPages([]);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/parse-pdf", {
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
      <h1 className="text-2xl font-semibold">PDF → текст (DE → RU)</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 border border-slate-800 rounded-lg p-4 bg-slate-900"
      >
        <input
          ref={fileInputRef}
          type="file"
          name="file"
          accept="application/pdf"
          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-slate-700 file:text-slate-50 hover:file:bg-slate-600 transition-all duration-200  cursor-pointer"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-50 cursor-pointer transition-all duration-200"
        >
          {loading ? <Spinner /> : "Загрузить"}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-red-700 disabled:opacity-50   cursor-pointer transition-all duration-200"
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
