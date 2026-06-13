"use client";
import { div } from "framer-motion/m";
import React, {
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  useRef,
} from "react";
export type Tanz = {
  name: string;
  musikrichtung: string;
  takt: string;
  temp: string;
  bpm: string;
  zahl: string;
  schlagwerte: string;
  elemente: string;
  figuren: string;
  images: string;
};
interface AdtvContentProps {
  initialTanzen: Tanz[];
}
export default function Stat({ initialTanzen }: AdtvContentProps) {
  // const [isActive, setisActive] = useState<string>("");

  const re = initialTanzen.map((item) => ({
    name: item.name,
    temp: item.temp,
    elemente: item.elemente,
    figuren: item.figuren,
  }));
  function formatContent(raw: string): string {
    return raw.replace(/\s*\&\s*/g, "-----");
  }
  console.log("<🛑🛑🛑=re=🛑🛑🛑>", re);

  const [openSubItems, setOpenSubItems] = useState<Record<string, boolean>>({});

  const toggleSubItem = (key: string) => {
    setOpenSubItems((prev) => ({
      ...prev,
      [key]: !prev[key], // инвертируем значение (true/false)
    }));
  };

  return (
    <div className=" mt-4 w-full">
      {re &&
        re.map((item, idx) => {
          // Формируем уникальные ключи для каждого подпункта этой строки
          const tempKey = `${idx}-temp`;
          const elemKey = `${idx}-elem`;
          const figKey = `${idx}-fig`;

          // Проверяем, открыт ли конкретный пункт кликом
          const isTempOpen = !!openSubItems[tempKey];
          const isElemOpen = !!openSubItems[elemKey];
          const isFigOpen = !!openSubItems[figKey];

          return (
            <div
              key={idx}
              className="text-[16px] border border-stone-200 w-full p-2 bg-[#1e293b]/10 rounded-xl"
            >
              <span className="font-bold text-slate-200 block mb-1">
                {item.name}
              </span>

              {/* 1. Блок Temp */}
              <div
                onClick={() => toggleSubItem(tempKey)} // клик переключает видимость
                className="group   !text-[var(--teal-500)] text-[20px] cursor-pointer mb-2"
              >
                {/* Точка-маркер — всегда видна */}
                <span className="w-4 h-4 rounded-full bg-current mr-2 inline-block shrink-0 align-middle" />

                {/* Текст — если открыт кликом, то горит всегда. Если нет — плавно проявляется по ховеру на ПК */}
                <span
                  className={`transition-opacity duration-500 ${
                    isTempOpen
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {item.temp}
                </span>
              </div>

              {/* 2. Блок Elemente */}
              <div
                onClick={() => toggleSubItem(elemKey)}
                className="group flex  !text-[var(--teal-500)] text-[20px] cursor-pointer gap-2  mb-2"
              >
                <span
                  className="w-4 h-4 rounded-full bg-current  inline-block shrink-0 align-middle"
                  style={{ lineHeight: 1 }}
                />

                <span
                  className={`transition-opacity duration-500 ${
                    isElemOpen
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{ lineHeight: 1 }}
                >
                  {formatContent(item.elemente)}
                </span>
              </div>

              {/* 3. Блок Figuren */}
              <div
                onClick={() => toggleSubItem(figKey)}
                className="group flex  !text-[var(--teal-500)] text-[20px] "
              >
                <span
                  className="w-4 h-4 rounded-full bg-current mr-2 inline-block shrink-0 align-middle cursor-pointer"
                  style={{ lineHeight: 1 }}
                />

                <span
                  className={`transition-opacity duration-500  ${
                    isFigOpen
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{ lineHeight: 1 }}
                >
                  {formatContent(item.figuren)}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
