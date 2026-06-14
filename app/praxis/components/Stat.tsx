"use client";
import { div } from "framer-motion/m";
import React, {
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  useRef,
} from "react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
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

  const [dances, setDances] = useState(() =>
    initialTanzen.map((item) => ({
      name: item.name,
      temp: item.temp,
      elemente: item.elemente,
      figuren: item.figuren,
      takt: item.takt,
      zahl: item.zahl,
    })),
  );

  useEffect(() => {
    setDances(
      initialTanzen.map((item) => ({
        name: item.name,
        temp: item.temp,
        elemente: item.elemente,
        figuren: item.figuren,
        takt: item.takt,
        zahl: item.zahl,
      })),
    );
  }, [initialTanzen]);

  const shuffleDances = () => {
    setDances((prev) => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  const re = dances;

  function formatContent(raw: string): React.ReactNode {
    if (!raw) return "";

    return raw.split("&").map((part, index, array) => (
      <React.Fragment key={index}>
        {part.trim()}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
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
    <div className=" mt-4 w-full flex flex-col gap-4">
      <div className="flex">
        <button
          onClick={shuffleDances}
          className="flex items-center justify-center px-4 py-2.5 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 hover:border-teal-500/50 rounded-xl text-slate-300 hover:text-teal-400 font-semibold text-sm transition-all duration-200 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_0_15px_rgba(20,184,166,0.15)] cursor-pointer group"
        >
          <ArrowsUpDownIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(600px,1fr))] gap-3">
        {re &&
          re.map((item) => {
            // Формируем уникальные ключи для каждого подпункта этой строки
            const tempKey = `${item.name}-temp`;
            const elemKey = `${item.name}-elem`;
            const figKey = `${item.name}-fig`;

            // Проверяем, открыт ли конкретный пункт кликом
            const isTempOpen = !!openSubItems[tempKey];
            const isElemOpen = !!openSubItems[elemKey];
            const isFigOpen = !!openSubItems[figKey];

            return (
              <div
                key={item.name}
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
                    {formatContent(item.takt)}
                  </span>
                </div>
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
                    {formatContent(item.zahl)}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
