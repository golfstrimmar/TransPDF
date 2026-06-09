"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Element = {
  name: string;
  [key: string]: any;
};

interface ListProps {
  initialElements: Element[];
}

export default function List({ initialElements }: ListProps) {
  const [isActive, setisActive] = useState<string>(
    initialElements.find((t) => t.name === "Achsendrehung (paarweise getanzt)")
      ? "Achsendrehung (paarweise getanzt)"
      : (initialElements[0]?.name || "")
  );
  const [selectedMobileArea, setSelectedMobileArea] = useState<string>("einz");
  const [elements] = useState<Element[]>(initialElements);
  
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


  const categories = [
    { key: "einz", label: "1 Schritt" },
    { key: "zwei", label: "2 Schritte" },
    { key: "drei", label: "3 Schritte" },
  ];

  return (
    <div className="pt-4 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
      {/* Mobile view: Horizontal scrollable categories */}
      <div className="md:hidden w-full overflow-hidden">
        <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedMobileArea === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedMobileArea(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[color-mix(in_srgb,var(--sky-400)_80%,white)] text-slate-950 border border-[var(--sky-400)] shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                    : "bg-slate-900/40 text-slate-400 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Mobile buttons list */}
        <div className="flex flex-wrap gap-2 mt-4 mb-2">
          {elements
            .filter((it) => it.marker === selectedMobileArea)
            .map((item) => (
              <button
                key={item.name}
                className={`btn btn-empty !py-1.5 px-4 rounded-xl border text-sm transition-all duration-200 cursor-pointer ${
                  isActive === item.name
                    ? "bg-[color-mix(in_srgb,var(--teal-400)_40%,transparent)] !text-[var(--teal-400)] border-teal-500/50"
                    : item.marker === "einz"
                      ? "bg-[color-mix(in_srgb,var(--purple-500)_40%,transparent)] !text-[var(--purple-200)] border-purple-900/30"
                      : item.marker === "zwei"
                        ? "bg-[color-mix(in_srgb,var(--lime-500)_40%,transparent)] !text-[var(--lime-200)] border-lime-900/30"
                        : "bg-[color-mix(in_srgb,var(--rose-500)_40%,transparent)] !text-[var(--rose-200)] border-rose-900/30"
                }`}
                onClick={() => setisActive(item.name)}
              >
                {item.name}
              </button>
            ))}
        </div>
      </div>

      {/* Desktop view: Sidebar */}
      <div className="hidden md:flex flex-col gap-1.5 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {elements.map((item) => (
          <button
            key={item.name}
            className={`btn btn-empty !py-1.5 px-4 rounded-xl border text-left text-sm transition-all duration-200 cursor-pointer ${
              isActive === item.name
                ? "bg-[color-mix(in_srgb,var(--teal-400)_40%,transparent)] !text-[var(--teal-400)] border-teal-500/50 font-semibold"
                : item.marker === "einz"
                  ? "bg-[color-mix(in_srgb,var(--purple-500)_40%,transparent)] !text-[var(--purple-200)] border-purple-900/30 hover:border-purple-500/50"
                  : item.marker === "zwei"
                    ? "bg-[color-mix(in_srgb,var(--lime-500)_40%,transparent)] !text-[var(--lime-200)] border-lime-900/30 hover:border-lime-500/50"
                    : "bg-[color-mix(in_srgb,var(--rose-500)_40%,transparent)] !text-[var(--rose-200)] border-rose-900/30 hover:border-rose-500/50"
            }`}
            onClick={() => setisActive(item.name)}
          >
            {item.name}
          </button>
        ))}
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
