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
import tanzenData from "@/public/data/tanzen.json";
import Stat from "@/app/praxis/components/Stat";

import elData from "@/public/data/el.json";
import ElementStat, { ElementData } from "@/app/praxis/components/ElementStat";

export default function Praxis() {
  return (
    <div
      className="container mx-auto px-4 pb-12"
      style={{ paddingTop: "60px" }}
    >
      <Stat initialTanzen={tanzenData as Tanz[]} />
      <hr className="my-8 border-slate-700/50" />
      <ElementStat initialElements={elData as ElementData[]} />
    </div>
  );
}
