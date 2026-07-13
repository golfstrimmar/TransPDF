"use client";
import React, { useState } from "react";

export type AllgemeinElementData = {
  name: string;
  content: string;
  marker: string;
};

interface AllgemeinElementStatProps {
  initialAllgemeinElements: AllgemeinElementData[];
}

// ====>====>====>====>====>====>====>====>====>====>====>====>====>====>====>
// ====>====>====>====>====>====>====>====>====>====>====>====>====>====>====>
// ====>====>====>====>====>====>====>====>====>====>====>====>====>====>====>
export default function AllgemeinElementStat({
  initialAllgemeinElements,
}: AllgemeinElementStatProps) {
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
      {initialAllgemeinElements.map((foo) => {
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
              <div className="flex flex-col gap-2 max-w-full w-full">
                {/* Заголовок-контейнер. Добавлен min-w-0, чтобы флекс умел сжиматься */}
                <h3 className="flex items-start gap-2 text-slate-200 w-full min-w-0 text-[20px]">
                  {/* Точка-маркер. shrink-0 жестко фиксирует её размер, не давая тексту её сжать */}
                  <span className="w-4 h-4 rounded-full bg-teal-500 inline-block shrink-0 mt-[6px]" />

                  {/* Сам текст. break-words спасет, даже если там будет одно супер-длинное слово без пробелов */}
                  <span className="block whitespace-normal break-words min-w-0 text-left">
                    {foo.name}
                  </span>
                </h3>

                {/* Контент */}
                {fooOpen === foo.name && (
                  <div className="w-full pl-6 overflow-hidden">
                    {renderContentWithLines(foo.content)}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
