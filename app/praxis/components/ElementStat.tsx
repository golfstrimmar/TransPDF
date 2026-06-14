"use client";
import React, { useState } from "react";

export type ElementData = {
  name: string;
  content: string;
  marker: string;
};

interface ElementStatProps {
  initialElements: ElementData[];
}

export default function ElementStat({ initialElements }: ElementStatProps) {
  // Filter for elements containing 'P' in prefix
  const pElements = initialElements.filter((item) => {
    const prefix = item.name.split("--")[0];
    return prefix.includes("P");
  });

  const [openSubItems, setOpenSubItems] = useState<Record<string, boolean>>({});

  const toggleSubItem = (key: string) => {
    setOpenSubItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  function renderItemName(name: string) {
    const index = name.indexOf("--");
    if (index !== -1) {
      const before = name.substring(0, index);
      const after = name.substring(index + 2);
      return (
        <React.Fragment>
          <span className="text-[0.8em] !text-teal-500">{before} </span>
          {after}
        </React.Fragment>
      );
    }
    return name;
  }

  const sections = [
    { key: "einz", label: "einz" },
    { key: "zwei", label: "zwei" },
    { key: "drei", label: "drei" },
  ];

  return (
    <div className="mt-8 w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 xl:grid-cols-[repeat(auto-fit,minmax(600px,1fr))] gap-x-6 gap-y-4">
        {sections.map((sec) => {
          const sectionElements = pElements.filter(
            (el) => el.marker === sec.key,
          );
          const isContentOpen = !!openSubItems[sec.key];

          return (
            <div
              key={sec.key}
              className="text-[16px] border border-stone-200 w-full p-2 bg-[#1e293b]/10 rounded-xl"
            >
              <div
                onClick={() => toggleSubItem(sec.key)}
                className="group flex !text-[var(--teal-500)] text-[20px] cursor-pointer gap-4 items-start"
              >
                <div className="flex items-center gap-2 mt-[2px] shrink-0">
                  <span className="w-4 h-4 rounded-full bg-current inline-block shrink-0" />
                  <span className="font-bold tracking-wider text-slate-200 uppercase w-[60px]">
                    {sec.label}
                  </span>
                </div>

                <div
                  className={`transition-opacity duration-500 ${
                    isContentOpen
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  } flex flex-col gap-1 text-slate-200`}
                >
                  {sectionElements.length > 0 ? (
                    sectionElements.map((item) => (
                      <div key={item.name} className="leading-snug">
                        {renderItemName(item.name)}
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-500 italic text-sm">
                      Нет элементов
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
