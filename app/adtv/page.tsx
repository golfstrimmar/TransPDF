"use client";
import { useState } from "react";
import Item from "./Item";
import ClearIcon from "@/components/icons/ClearIcon";
import TanzenDef from "./halpers/Tanzen";
const Tanzen = TanzenDef.Tanzen;
const Musikrichtung = TanzenDef.Musikrichtung;
const Takt = TanzenDef.Takt;
const Temp = TanzenDef.Temp;
const bpm = TanzenDef.bpm;
const zahl = TanzenDef.zahl;
const schlagwerte = TanzenDef.schlagwerte;
const headers = TanzenDef.headers;

export default function ADTF() {
  const [countR, setCountR] = useState<number>(0);
  const [countF, setCountF] = useState<number>(0);
  return (
    <section className="bg-[var(--slate)] w-[100vw] min-h-[100vh] pt-[60px] text-[var(--slate-300)]">
      <div className="container">
        {/*<h2 className="text-center">ADTF</h2>*/}
        <div className="flex gap-2 items-center">
          <h4 className="text-2xl! text-green-500!">{countR}</h4>
          <h4 className="text-2xl! text-red-500!">{countF}</h4>
          <button
            className="btn btn-red max-h-[20px] p-2!"
            onClick={() => {
              setCountR(0);
              setCountF(0);
            }}
          >
            <ClearIcon width={16} height={16} />
          </button>
        </div>
        <Item
          setCountR={setCountR}
          setCountF={setCountF}
          currentFrage={Tanzen}
          Musikrichtung={Musikrichtung}
          Takt={Takt}
          Temp={Temp}
          bpm={bpm}
          zahl={zahl}
          schlagwerte={schlagwerte}
          headers={headers}
        />
      </div>
    </section>
  );
}
