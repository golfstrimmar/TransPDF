"use client";
import React, { useState } from "react";
import { ElementeMitEinemSchrit } from "@/app/elemente/helpers/el";
import { AnimatePresence, motion } from "framer-motion";

export default function List() {
  const [isActive, setisActive] = useState<string>("");

  function formatContent(raw: string): string {
    return raw.replace(/\s*\&\s*/g, "\n\n");
  }

  return (
    <div className="pt-4 grid grid-cols-[250px_1fr]">
      <div className="flex flex-col gap-1">
        {ElementeMitEinemSchrit.map((item) => (
          <button
            key={item.name}
            className={`btn btn-empty ${
              isActive === item.name
                ? "bg-[color-mix(in_srgb,var(--teal-400)_40%,transparent)] !text-[var(--teal-400)]"
                : ""
            }`}
            onClick={() => setisActive(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="p-1 border  bg-[color-mix(in_srgb,var(--teal-200)_10%,transparent)]">
        <AnimatePresence initial={false} mode="wait">
          {ElementeMitEinemSchrit.map(
            (item) =>
              isActive === item.name && (
                <motion.p
                  key={item.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[20px] whitespace-pre-line"
                >
                  {formatContent(item.content)}
                </motion.p>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
