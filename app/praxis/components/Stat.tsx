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
  const [isActive, setisActive] = useState<string>("");

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

  useEffect(() => {
    if (!isActive) return;
    console.log("<===isActive===>", isActive);
  }, [isActive]);

  return (
    <div className=" mt-4 w-full">
      {re &&
        re.map((item, idx) => {
          return (
            // <button
            //   key={idx}
            //   className="btn btn-empty max-w-[300px] !text-[16px] !flex !justify-between"
            //   onMouseEnter={() => setisActive(item.name)}
            //   onMouseLeave={() => setisActive("")}
            // >
            <div
              key={idx}
              className=" text-[16px]  border border-stone-200 w-full p-2"
            >
              <span>{item.name}</span>
              <div className="group flex items-center !text-[var(--teal-500)] text-[20px] cursor-pointer">
                {/* Точка-маркер — всегда видна */}
                <span className="w-4 h-4 rounded-full bg-current mr-2 inline-block shrink-0 align-middle" />

                {/* Текст — скрыт по умолчанию, плавно проявляется при наведении на строку */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.temp}
                </span>
              </div>

              <div className="group flex items-center !text-[var(--teal-500)] text-[20px] cursor-pointer">
                {/* Точка-маркер — всегда видна */}
                <span className="w-4 h-4 rounded-full bg-current mr-2 inline-block shrink-0 align-middle" />

                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {formatContent(item.elemente)}
                </span>
              </div>

              <div className="group flex items-center !text-[var(--teal-500)] text-[20px] cursor-pointer">
                {/* Точка-маркер — всегда видна */}
                <span className="w-4 h-4 rounded-full bg-current mr-2 inline-block shrink-0 align-middle" />

                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {formatContent(item.figuren)}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
