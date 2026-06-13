import React from "react";
import AdtvContent from "@/app/adtv/components/AdtvContent";
import { Tanz } from "@/app/praxis/components/Stat";
import tanzenData from "@/public/data/tanzen.json";

export default function ADTF() {
  return (
    <section className="bg-[var(--slate)] w-[100vw] min-h-[100vh] pt-[60px] pb-12 text-[var(--slate-300)] overflow-x-hidden">
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="text-center !text-[24px] mb-8 tracking-wide !whitespace-normal">
          Tänzen (ADTV)
        </h2>

        <AdtvContent initialTanzen={tanzenData as Tanz[]} />
      </div>
    </section>
  );
}
