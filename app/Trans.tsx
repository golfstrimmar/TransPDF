"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  useRef,
} from "react";

import "./Trans.css";

// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
export default function Trans({ pages, setPages }) {
  const [copiedPage, setCopiedPage] = useState<number | null>(null);
  const changeHandler = (e, p) => {
    p.translated = e.target.value;
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.pageNumber === p.pageNumber
          ? { ...page, translated: e.target.value }
          : page,
      ),
    );

    return;
  };
  return (
    <div>
      {pages.length > 0 && (
        <div className="space-y-6">
          {pages.map((p) => (
            <div
              key={p.pageNumber}
              className="grid gap-4 border border-slate-800 rounded-lg p-4 bg-slate-900 md:grid-cols-2"
            >
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-200">
                  Страница {p.pageNumber}
                </h3>
                <pre
                  className={`cursor-pointer whitespace-pre-wrap text-sm text-slate-100 ${
                    copiedPage === p.pageNumber ? "bg-green-500" : ""
                  }`}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(p.original);
                      setCopiedPage(p.pageNumber);
                      setTimeout(() => setCopiedPage(null), 1000);
                    } catch (err) {
                      console.error("Clipboard error:", err);
                    }
                  }}
                >
                  {p.original}
                </pre>
              </div>
              <div className="space-y-2 border-l-amber-100 border">
                {/*<pre className="whitespace-pre-wrap text-sm text-slate-400">
                  {p.translated}
                </pre>*/}
                <textarea
                  name="translated"
                  id="translated"
                  defaultValue={p.translated}
                  onChange={(e) => {
                    changeHandler(e, p);
                  }}
                  className="bg-slate-500 text-black"
                />
              </div>
            </div>
          ))}
        </div>
      )}{" "}
    </div>
  );
}
