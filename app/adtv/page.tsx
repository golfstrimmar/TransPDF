"use client";
import React, { useState, useEffect } from "react";
import Item from "./Item";
import ClearIcon from "@/components/icons/ClearIcon";
import TanzenDef from "./halpers/Tanzen";
import { AnimatePresence, motion } from "framer-motion";

const Tanzen = TanzenDef.Tanzen;

export default function ADTF() {
  const [countR, setCountR] = useState<number>(0);
  const [countF, setCountF] = useState<number>(0);
  const [tieIem, settieIem] = useState<string>("");

  // Автоматически выбираем первый танец из списка на старте
  // useEffect(() => {
  //   if (Tanzen && Tanzen.length > 0 && !tieIem) {
  //     const firstDanceName = String(
  //       Tanzen[0]["name" as keyof (typeof Tanzen)[0]],
  //     );
  //     setTieIem("");
  //   }
  // }, []);
  function formatContent(raw: string): string {
    return raw.replace(/\s*\&\s*/g, "\n");
  }
  // ====>====>====>====>====>====>====>====>====>====>====>====>====>====>====>
  return (
    <section className="bg-[var(--slate)] w-[100vw] min-h-[100vh] pt-[60px] text-[var(--slate-300)]">
      <div className="container  mx-auto px-1">
        {/* Шапка со счетчиками */}
        {/*<div className="flex gap-2 items-center mb-6">
          <h4 className="text-2xl font-bold text-green-500">{countR}</h4>
          <h4 className="text-2xl font-bold text-red-500">{countF}</h4>
          <button
            className="btn btn-red center p-2 rounded-lg cursor-pointer transition-colors"
            onClick={() => {
              setCountR(0);
              setCountF(0);
            }}
          >
            <ClearIcon width={14} height={14} />
          </button>
        </div>*/}

        {/* Таб-сетка: левая колонка кнопок (250px), правая — контент (1fr) */}
        <div className="grid grid-cols-[250px_1fr] gap-1 items-start">
          {/* ЛЕВАЯ КОЛОНКА: Навигационные кнопки танцев */}
          <div className="flex flex-col gap-1.5  overflow-y-auto no-scrollbar p-2">
            {Tanzen.map((item, index) => {
              const name = String(item["name" as keyof typeof item]);
              const isActive = tieIem === name;
              return (
                <button
                  key={index}
                  className={`btn text-left justify-start !py-1 px-4 rounded-xl border !text-lg transition-all duration-200 cursor-pointer ${
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

          {/* ПРАВАЯ КОЛОНКА: Контентная панель деталей выбранного танца */}
          <div className="p-6 border border-slate-800 rounded-2xl bg-[#1e293b]/20 min-h-[300px] flex flex-col">
            <AnimatePresence initial={false} mode="wait">
              {Tanzen.map((item) => {
                const name = String(item["name" as keyof typeof item]);
                const isActive = tieIem === name;

                if (!isActive) return null;

                return (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col gap-4"
                  >
                    {/* Заголовок вкладки */}
                    <h5 className="text-xl font-bold text-teal-400 border-b border-slate-800/80 pb-3 mb-1 uppercase tracking-wider">
                      {name}
                    </h5>

                    {/* Свойства танца */}
                    <div className="grid grid-cols-2 gap-4">
                      {Object.keys(item)
                        .filter((key) => key !== "name")
                        .map((key) => (
                          <div
                            key={key}
                            className="flex flex-col gap-1 p-3 bg-slate-900/30 rounded-xl border border-slate-800/50 hover:border-slate-700/50 transition-colors"
                          >
                            <span className="text-[10px] text-teal-400/60 font-bold uppercase tracking-wider">
                              {key.replace(/_/g, " ")}
                            </span>
                            <span className="text-lg text-slate-200  whitespace-pre-line inline-block lh-1">
                              {/*{String(item[key as keyof typeof item])}*/}
                              {formatContent(
                                String(item[key as keyof typeof item]),
                              )}
                            </span>
                          </div>
                        ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
