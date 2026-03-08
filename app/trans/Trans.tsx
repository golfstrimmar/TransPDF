"use client";
import React, { useEffect, useState } from "react";
import "./Trans.css";
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
export default function Trans({ pages, setPages }) {
  const [copiedPage, setCopiedPage] = useState<number | null>(null);

  const [translating, setTranslating] = useState(false);
  const [progress, setProgress] = useState({
    done: 0,
    total: 0,
  });

  useEffect(() => {
    if (!pages.length || translating) return;

    const pagesToTranslate = pages.filter((p) => p.original && !p.translated);

    if (!pagesToTranslate.length) return;

    const translateAll = async () => {
      setTranslating(true);
      setProgress({
        done: 0,
        total: pagesToTranslate.length,
      });

      try {
        let doneCount = 0;

        for (const p of pagesToTranslate) {
          const res = await fetch("/api/ai-ranslater", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: p.original }),
          });
          if (!res.ok) {
            console.error("Translate API error", res.status, await res.text());
            continue;
          }
          const data = await res.json();

          doneCount++;

          setPages((prev) =>
            prev.map((page) =>
              page.pageNumber === p.pageNumber
                ? { ...page, translated: data.text }
                : page,
            ),
          );

          setProgress((prev) => ({
            ...prev,
            done: doneCount,
          }));
        }
      } catch (err) {
        console.error("Translate error:", err);
      } finally {
        setTranslating(false);
      }
    };

    translateAll();
  }, [pages, setPages, translating]);

  const changeHandler = (e, p) => {
    const value = e.target.value;

    setPages((prev) =>
      prev.map((page) =>
        page.pageNumber === p.pageNumber
          ? { ...page, translated: value }
          : page,
      ),
    );
  };

  return (
    <div>
      {/* ПРОГРЕСС */}
      {translating && (
        <div className="mb-4 text-sm text-amber-400">
          Перевод: {progress.done} / {progress.total} страниц
        </div>
      )}

      {pages.length > 0 && (
        <div className="space-y-6">
          {pages.map((p) => (
            <div
              key={p.pageNumber}
              className="grid gap-4 border border-slate-800 rounded-lg p-4 bg-slate-900 md:grid-cols-2"
            >
              {/* ORIGINAL */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-200">
                  Страница {p.pageNumber}
                </h3>

                <pre
                  className={`cursor-pointer whitespace-pre-wrap text-sm text-slate-100 ${
                    copiedPage === p.pageNumber ? "bg-green-500" : ""
                  }`}
                  onClick={async () => {
                    await navigator.clipboard.writeText(p.original);
                    setCopiedPage(p.pageNumber);
                    setTimeout(() => setCopiedPage(null), 1000);
                  }}
                >
                  {p.original}
                </pre>
              </div>

              {/* TRANSLATED */}
              <div
                className="space-y-2 border-l border-slate-700 pl-4 text-[14px] lh-0"
                style={{ lineHeight: "1" }}
              >
                <textarea
                  value={p.translated || ""}
                  onChange={(e) => changeHandler(e, p)}
                  className="w-full min-h-[150px] bg-slate-500 text-black p-2 rounded"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
