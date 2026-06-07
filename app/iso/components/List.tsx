"use client";
import React, { useState, useEffect } from "react";
import { IsoElemente } from "@/app/iso/helpers/el";
import { AnimatePresence, motion } from "framer-motion";
import ItemButton from "@/app/iso/components/ItemButton";
import { line } from "framer-motion/client";

export default function List() {
  const [isActive, setisActive] = useState<string>("");
  const [isMarker, setisMarker] = useState<string>("");

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
  const areas: Record<string> = [
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
    "schrittkombinationen",
  ];
  // ====>====>====>====>====>====>====>====>====>====>====>====>====>====>====>
  return (
    <div className="pt-4 grid grid-cols-[250px_1fr]">
      <div className="buttons-iso flex flex-col gap-1">
        {areas.map((i, idx) => (
          // 1. Обернули всё в React.Fragment, чтобы вернуть один корневой элемент
          <React.Fragment key={i}>
            <h3 className="!text-[var(--sky-400)] !text-[18px] uppercase font-semibold mt-4 ">
              {i.replace(/_/g, " ")}
            </h3>

            {IsoElemente.filter((it) => it.marker === i).map(
              (item, itemIdx) => (
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
          </React.Fragment>
        ))}
      </div>

      <div className="p-1 border  bg-[color-mix(in_srgb,var(--teal-200)_10%,transparent)]">
        <AnimatePresence initial={false} mode="wait">
          {IsoElemente.map((item) => {
            const isCurrentActive =
              isActive === item.name && isMarker === item.marker;

            if (!isCurrentActive) return null;

            return (
              <motion.p
                key={`${item.marker}-${item.name}`} // уникальный ключ
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-[18px]  whitespace-pre-line text-slate-200"
                style={{ lineHeight: "25px" }}
              >
                <h4 className={`mb-4 !text-[20px] !text-[var(--sky-400)]`}>
                  {item.name}
                </h4>
                {formatContent(item.content)}
              </motion.p>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
