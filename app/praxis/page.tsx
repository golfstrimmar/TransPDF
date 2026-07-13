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
import elDataAllgemein from "@/public/data/allgemeinerteil.json";

import Stat from "@/app/praxis/components/Stat";
import MusikElementStat, {
  type MusikElementData,
} from "@/app/praxis/components/Musik";
import AllgemeinElementStat, {
  type AllgemeinElementData,
} from "@/app/praxis/components/Allgemein";
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
      <div className="relative flex items-center justify-center my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-500"></div>
        </div>
        <span className="relative bg-[#0f172a] px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">
          Allgemein
        </span>
      </div>
      <AllgemeinElementStat
        initialAllgemeinElements={elDataAllgemein as AllgemeinElementData[]}
      />
      <div className="relative flex items-center justify-center my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-500"></div>
        </div>
        <span className="relative bg-[#0f172a] px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">
          Elements
        </span>
      </div>
      <ElementStat initialElements={elData as ElementData[]} />
      <div className="relative flex items-center justify-center my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-500"></div>
        </div>
        <span className="relative bg-[#0f172a] px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">
          Musik
        </span>
      </div>
      <MusikElementStat
        initialMusikElements={elDataMusik as MusikElementData[]}
      />
    </div>
  );
}
