"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
export type Tanz = {
  name: string;
  [key: string]: string;
};

interface AdtvContentProps {
  initialTanzen: Tanz[];
}

export default function AdtvContent({ initialTanzen }: AdtvContentProps) {
  const [tieIem, settieIem] = useState<string>("Blues");
  const [tanzen] = useState<Tanz[]>(initialTanzen);
  const [isModalOpen, setIsModalOpen] = useState(false);
  function formatContent(raw: string): string {
    return raw.replace(/\s*\&\s*/g, "\n");
  }

  // Scroll to details on mobile when a dance is selected
  useEffect(() => {
    if (tieIem && window.innerWidth < 768) {
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
  }, [tieIem]);

  useEffect(() => {
    if (tanzen.length > 0 && !tanzen.find((t) => t.name === tieIem)) {
      settieIem(tanzen[0].name);
    }
  }, [tanzen, tieIem]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 items-start">
      {/* MOBILE VIEW: Horizontal scrollable navigation */}
      <div className="md:hidden w-full overflow-hidden mb-2">
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none scrollbar-thin scrollbar-thumb-slate-800">
          {tanzen.map((item, index) => {
            const name = String(item["name" as keyof typeof item]);
            const isActive = tieIem === name;
            return (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[color-mix(in_srgb,var(--sky-400)_80%,white)] text-slate-950 border border-[var(--sky-400)] shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                    : "bg-slate-900/40 text-slate-400 border border-slate-800 hover:border-slate-700"
                }`}
                onClick={() => settieIem(name)}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* DESKTOP VIEW: Sidebar navigation */}
      <div className="hidden md:flex flex-col gap-1.5 ] pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {tanzen.map((item, index) => {
          const name = String(item["name" as keyof typeof item]);
          const isActive = tieIem === name;
          return (
            <button
              key={index}
              className={`btn text-left justify-start !py-1.5 px-4 rounded-xl border !text-lg transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[color-mix(in_srgb,var(--teal-400)_30%,transparent)] !text-[var(--teal-400)] border-teal-500/50 font-bold"
                  : "bg-[#1e293b]/40 border-slate-800 text-slate-300 hover:bg-[#1e293b]/70 hover:border-slate-700"
              }`}
              onClick={() => settieIem(name)}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* DETAIL PANEL: Displays chosen dance properties */}
      <div
        id="details-panel"
        className="p-2 md:p-6 border border-slate-800 rounded-2xl bg-[#1e293b]/20 min-h-[300px] flex flex-col scroll-mt-24"
      >
        <AnimatePresence initial={false} mode="wait">
          {tieIem ? (
            tanzen.map((item) => {
              const name = String(item["name" as keyof typeof item]);
              const isActive = tieIem === name;

              if (!isActive) return null;

              const hasImages = item.images && item.images.trim() !== "";

              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-4"
                >
                  {/* Tab Header */}
                  <h5 className="text-xl md:text-2xl font-bold text-teal-400 border-b border-slate-800/80 pb-3 mb-1 uppercase tracking-wider !whitespace-normal">
                    {name}
                  </h5>

                  {/* Dance Properties Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.keys(item)
                      .filter((key) => key !== "name" && key !== "images")
                      .map((key) => {
                        const val = String(item[key as keyof typeof item]);
                        if (!val) return null; // Don't show empty fields

                        const isFiguren = key === "figuren";
                        const clickable = isFiguren && hasImages;

                        return (
                          <div
                            key={key}
                            onClick={() => {
                              if (clickable) {
                                setIsModalOpen(true);
                              }
                            }}
                            className={`flex flex-col gap-1 p-3 bg-slate-900/30 rounded-xl border border-slate-800/50 transition-all duration-200 ${
                              clickable
                                ? "cursor-pointer hover:bg-slate-900/60 hover:border-teal-500/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] group"
                                : "hover:border-slate-700/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-teal-400/60 font-bold uppercase tracking-wider">
                                {key.replace(/_/g, " ")}
                              </span>
                              {clickable && (
                                <span className="text-[9px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 group-hover:bg-teal-500/30 transition-all">
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    ></path>
                                  </svg>
                                  Diagramm
                                </span>
                              )}
                            </div>
                            <span className="text-base md:text-lg text-slate-200 whitespace-pre-line inline-block leading-relaxed">
                              {formatContent(val)}
                            </span>
                          </div>
                        );
                      })}
                  </div>

                  {/* Full-screen Modal for Images */}
                  <AnimatePresence>
                    {isModalOpen && hasImages && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsModalOpen(false)}
                        className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-start items-center overflow-y-auto p-4 md:p-8"
                      >
                        {/* Modal container */}
                        <motion.div
                          initial={{ scale: 0.95, y: 15 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0.95, y: 15 }}
                          transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 250,
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full max-w-4xl flex flex-col items-center gap-6 my-auto py-8"
                        >
                          {/* Header */}
                          <div className="w-full flex items-center gap-4 border-b border-slate-800 pb-4">
                            <button
                              className="btn btn-empty"
                              onClick={() => setIsModalOpen(false)}
                            >
                              <ArrowUturnLeftIcon className="w-6 h-6" />
                            </button>
                            <h3 className="!text-[12px] md:!text-2xl font-bold text-teal-400 uppercase tracking-wider">
                              {name}
                            </h3>
                          </div>

                          {/* Images List (Large, one under another) */}
                          <div className="w-full flex flex-col items-center gap-6">
                            {item.images
                              .split(/\s*\&\s*/)
                              .map((imgUrl, idx) => {
                                const cleanUrl = imgUrl.trim();
                                if (!cleanUrl) return null;
                                return (
                                  <img
                                    key={idx}
                                    src={cleanUrl}
                                    alt={`${name} diagram ${idx + 1}`}
                                    className="w-full rounded-2xl shadow-2xl object-contain border border-slate-850 bg-slate-900/10 max-h-[85vh]"
                                  />
                                );
                              })}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="flex items-center justify-center flex-grow text-slate-500 text-sm md:text-base italic py-12">
              Select a dance to view description...
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
