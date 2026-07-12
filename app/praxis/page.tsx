"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  useRef,
} from "react";

// 1. Все импорты данных
import tanzenData from "@/public/data/tanzen.json";
import elData from "@/public/data/el.json";
import elDataMusik from "@/public/data/elMusik.json";

// 2. Все импорты компонентов и их типов
import Stat from "@/app/praxis/components/Stat";
import MusikElementStat, {
  type MusikElementData,
} from "@/app/praxis/components/Musik";
import ElementStat, { ElementData } from "@/app/praxis/components/ElementStat";

// 3. Объявление локальных типов
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

export default function Praxis() {
  return (
    <div
      className="container mx-auto px-4 pb-12"
      style={{ paddingTop: "60px" }}
    >
      <Stat initialTanzen={tanzenData as Tanz[]} />
      <hr className="my-8 border-slate-500" />
      <ElementStat initialElements={elData as ElementData[]} />
      <hr className="my-8 border-slate-500" />
      <MusikElementStat
        initialMusikElements={elDataMusik as MusikElementData[]}
      />
    </div>
  );
}
