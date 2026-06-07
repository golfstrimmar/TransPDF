"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
type Element = {
  name: string;
  [key: string]: string;
};

export default function List() {
  const [isActive, setisActive] = useState<string>(
    "Achsendrehung (paarweise getanzt)",
  );
  const [selectedMobileArea, setSelectedMobileArea] = useState<string>("einz");
  const [elements, setelements] = useState<Element[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  function formatContent(raw: string): string {
    return raw.replace(/\s*\&\s*/g, "\n\n");
  }

  // Scroll to details on mobile when an item is selected
  useEffect(() => {
    if (isActive && window.innerWidth < 768) {
      const detailsElement = document.getElementById("details-panel");
      if (detailsElement) {
        setTimeout(() => {
          detailsElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }, 100);
      }
    }
  }, [isActive]);

  useEffect(() => {
    let cancelled = false;

    async function loadTanzen() {
      try {
        const res = await fetch("/data/musik.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Element[] = await res.json();
        if (!cancelled) {
          setelements(data);
          // если текущий tieIem не валиден, можно сразу выбрать первый
          if (!data.find((t) => t.name === isActive) && data.length > 0) {
            setisActive(data[0].name);
          }
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? "Fehler beim Laden");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadTanzen();
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    if (!elements) return;
    console.log("<===elements===>", elements);
  }, [elements]);
  return (
    <div className="pt-4 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
      {/* Mobile view: Horizontal scrollable categories */}
      <div className=" w-full overflow-hidden">
        {/* Mobile buttons list */}
        <div className="flex flex-wrap gap-2 mt-4 mb-2">
          {elements &&
            elements.map((item) => {
              return (
                <button
                  key={item.name}
                  className={`btn btn-empty !py-1.5 px-4 rounded-xl border text-sm transition-all duration-200 cursor-pointer ${
                    isActive === item.name
                      ? "bg-[color-mix(in_srgb,var(--teal-400)_40%,transparent)] !text-[var(--teal-400)] border-teal-500/50"
                      : ""
                  }`}
                  onClick={() => setisActive(item.name)}
                >
                  {item.name}
                </button>
              );
            })}
        </div>
      </div>

      {/* Detail panel */}
      <div
        id="details-panel"
        className="p-4 md:p-6 border border-slate-800/80 rounded-2xl bg-[color-mix(in_srgb,var(--teal-200)_5%,transparent)] backdrop-blur-md h-fit min-h-[200px] shadow-lg md:sticky md:top-24 scroll-mt-24"
      >
        <AnimatePresence initial={false} mode="wait">
          {isActive ? (
            elements.map(
              (item) =>
                isActive === item.name && (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-[16px] md:text-[18px] whitespace-pre-line text-slate-200"
                    style={{ lineHeight: "26px" }}
                  >
                    <h3 className="mb-4 text-2xl md:text-3xl font-bold italic tracking-wide !text-[var(--sky-400)] !whitespace-normal">
                      {item.name}
                    </h3>
                    {formatContent(item.content)}
                    {item?.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full rounded-xl"
                      />
                    )}
                  </motion.div>
                ),
            )
          ) : (
            <div className="flex items-center justify-center h-[150px] text-slate-500 text-sm md:text-base italic">
              Select an item to view its description...
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
