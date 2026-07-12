"use client";
import React, { useState } from "react";

export type MusikElementData = {
  name: string;
  content: string;
  marker: string;
};

interface MusikElementStatProps {
  initialMusikElements: MusikElementData[];
}

// ====>====>====>====>====>====>====>====>====>====>====>====>====>====>====>
// ====>====>====>====>====>====>====>====>====>====>====>====>====>====>====>
// ====>====>====>====>====>====>====>====>====>====>====>====>====>====>====>
export default function MusikElementStat({
  initialMusikElements,
}: MusikElementStatProps) {
  const [fooOpen, setFooOpen] = useState<string>("");
  function renderContentWithLines(content: string) {
    if (!content) return null;

    return (
      <div className="flex flex-col gap-1">
        {content.split("&").map((line, index) => {
          const trimmedLine = line.trim();

          // Если между &&& ничего не было, пропускаем пустые строки
          if (!trimmedLine) return null;

          return (
            <div key={index} className="leading-normal">
              {trimmedLine}
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="mt-8 w-full flex flex-col gap-6">
      {initialMusikElements.map((foo) => {
        return (
          <div
            key={foo.name}
            className="text-[16px] border border-stone-200 w-full p-2 bg-[#1e293b]/10 rounded-xl"
          >
            <div
              onMouseEnter={() => setFooOpen(foo.name)}
              onMouseLeave={() => setFooOpen("")}
              className="group flex  text-[20px] cursor-pointer gap-4 items-start"
            >
              <div className="flex items-center gap-2">
                <span className="!min-w-4 !h-4 rounded-full bg-[var(--teal-500)]  inline-block" />
                <div
                  className={`transition-opacity duration-500  flex flex-col gap-1 text-slate-200`}
                >
                  {foo.name}
                </div>
                <div
                  className={`ml-20 transition-all duration-200 ${fooOpen === foo.name ? "opacity-100" : "opacity-0"}`}
                >
                  {renderContentWithLines(foo.content)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
