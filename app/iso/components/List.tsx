"use client";
import React, { useState, useEffect } from "react";
import { IsoElemente } from "@/app/iso/helpers/el";
import { AnimatePresence, motion } from "framer-motion";
import ItemButton from "@/app/iso/components/ItemButton";

export default function List() {
  const [isActive, setisActive] = useState<string>("");
  const [isMarker, setisMarker] = useState<string>("");
  const [selectedMobileArea, setSelectedMobileArea] = useState<string>("fuss");

  function formatContent(raw: string): string {
    return raw.replace(/\s*\&\s*/g, "\n");
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".btn-empty")) {
        setisActive("");
        setisMarker("");
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Scroll to details on mobile when an item is selected
  useEffect(() => {
    if (isActive && window.innerWidth < 768) {
      const detailsElement = document.getElementById("details-panel");
      if (detailsElement) {
        setTimeout(() => {
          detailsElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }
    }
  }, [isActive]);

  const areas: string[] = [
    "fuss",
    "bein",
    "positionen",
    "becken",
    "hüften",
    "oberkörper",
    "schultern",
    "hand",
    "arm",
    "kopf",
    "drehungen",
  ];

  return (
    <div className="pt-4 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
      {/* Mobile view: Horizontal scrollable categories */}
      <div className="md:hidden w-full overflow-hidden">
        <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none scrollbar-thin scrollbar-thumb-slate-800">
          {areas.map((area) => {
            const isSelected = selectedMobileArea === area;
            return (
              <button
                key={area}
                onClick={() => setSelectedMobileArea(area)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[color-mix(in_srgb,var(--sky-400)_80%,white)] text-slate-950 border border-[var(--sky-400)] shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                    : "bg-slate-900/40 text-slate-400 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {area.replace(/_/g, " ")}
              </button>
            );
          })}
        </div>

        {/* Mobile buttons list */}
        <div className="flex flex-wrap gap-2 mt-4 mb-2">
          {IsoElemente.filter((it) => it.marker === selectedMobileArea).map(
            (item) => (
              <ItemButton
                key={`${item.marker}-${item.name}`}
                isActive={isActive}
                setisActive={setisActive}
                isMarker={isMarker}
                setisMarker={setisMarker}
                item={item}
              />
            ),
          )}
        </div>
      </div>

      {/* Desktop view: Sidebar */}
      <div className="hidden md:flex flex-col gap-1 buttons-iso">
        {areas.map((i, idx) => (
          <React.Fragment key={i}>
            <h3 className="!text-[var(--sky-400)] uppercase font-semibold mt-4 ">
              {i.replace(/_/g, " ")}
            </h3>

            <div className="flex flex-wrap gap-1.5 mt-1">
              {IsoElemente.filter((it) => it.marker === i).map((item) => (
                <ItemButton
                  key={`${item.marker}-${item.name}`}
                  isActive={isActive}
                  setisActive={setisActive}
                  isMarker={isMarker}
                  setisMarker={setisMarker}
                  item={item}
                />
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Detail panel */}
      <div
        id="details-panel"
        className="p-4 md:p-6 border border-slate-800/80 rounded-2xl bg-[color-mix(in_srgb,var(--teal-200)_5%,transparent)] backdrop-blur-md h-fit min-h-[200px] shadow-lg md:sticky md:top-24 scroll-mt-24"
      >
        <AnimatePresence initial={false} mode="wait">
          {isActive ? (
            IsoElemente.map((item) => {
              const isCurrentActive =
                isActive === item.name && isMarker === item.marker;

              if (!isCurrentActive) return null;

              return (
                <motion.div
                  key={`${item.marker}-${item.name}`}
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
              );
            })
          ) : (
            <div className="flex items-center justify-center h-[150px] text-slate-500 text-sm md:text-base italic">
              Выберите элемент для просмотра описания...
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
