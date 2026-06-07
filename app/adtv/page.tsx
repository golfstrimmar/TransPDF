"use client";
import React, { useState, useEffect } from "react";
import TanzenDef from "./halpers/Tanzen";
import { AnimatePresence, motion } from "framer-motion";

const Tanzen = TanzenDef.Tanzen;

export default function ADTF() {
  const [tieIem, settieIem] = useState<string>("Blues");

  function formatContent(raw: string): string {
    return raw.replace(/\s*\&\s*/g, "\n");
  }

  // Scroll to details on mobile when a dance is selected
  useEffect(() => {
    if (tieIem && window.innerWidth < 768) {
      const detailsElement = document.getElementById("details-panel");
      if (detailsElement) {
        setTimeout(() => {
          detailsElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }
    }
  }, [tieIem]);

  return (
    <section className="bg-[var(--slate)] w-[100vw] min-h-[100vh] pt-[100px] pb-12 text-[var(--slate-300)] overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl mb-8 tracking-wide !whitespace-normal">
          Tänzen (ADTV)
        </h2>

        {/* Tab-grid: left column (desktop sidebar) / top scroll (mobile), right column (details) */}
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 items-start">
          
          {/* MOBILE VIEW: Horizontal scrollable navigation */}
          <div className="md:hidden w-full overflow-hidden mb-2">
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none scrollbar-thin scrollbar-thumb-slate-800">
              {Tanzen.map((item, index) => {
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
          <div className="hidden md:flex flex-col gap-1.5 max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {Tanzen.map((item, index) => {
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
            className="p-4 md:p-6 border border-slate-800 rounded-2xl bg-[#1e293b]/20 min-h-[300px] flex flex-col scroll-mt-24"
          >
            <AnimatePresence initial={false} mode="wait">
              {tieIem ? (
                Tanzen.map((item) => {
                  const name = String(item["name" as keyof typeof item]);
                  const isActive = tieIem === name;

                  if (!isActive) return null;

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
                          .filter((key) => key !== "name")
                          .map((key) => {
                            const val = String(item[key as keyof typeof item]);
                            if (!val) return null; // Don't show empty fields

                            return (
                              <div
                                key={key}
                                className="flex flex-col gap-1 p-3 bg-slate-900/30 rounded-xl border border-slate-800/50 hover:border-slate-700/50 transition-colors"
                              >
                                <span className="text-[10px] text-teal-400/60 font-bold uppercase tracking-wider">
                                  {key.replace(/_/g, " ")}
                                </span>
                                <span className="text-base md:text-lg text-slate-200 whitespace-pre-line inline-block leading-relaxed">
                                  {formatContent(val)}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center flex-grow text-slate-500 text-sm md:text-base italic py-12">
                  Выберите танец для просмотра описания...
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
