"use client";
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
    // bpm: item.bpm,
  }));

  console.log("<🛑🛑🛑=re=🛑🛑🛑>", re);

  useEffect(() => {
    if (!isActive) return;
    console.log("<===isActive===>", isActive);
  }, [isActive]);

  return (
    <div className="flex flex-col gap-1 mt-4">
      {re &&
        re.map((item, idx) => {
          return (
            <button
              key={idx}
              className="btn btn-empty max-w-[300px] !text-[16px] !flex !justify-between"
              onMouseEnter={() => setisActive(item.name)}
              onMouseLeave={() => setisActive("")}
            >
              <span>{item.name}</span>
              <span
                className={`!text-[var(--red-500)]  transition-all duration-200  ${item.name.trim() === isActive.trim() ? "opacity-100" : "opacity-0"}`}
              >
                {item.temp}
              </span>
            </button>
          );
        })}
    </div>
  );
}
