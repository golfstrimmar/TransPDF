import React from "react";
import allgemeinerteil from "@/public/data/allgemeinerteil.json";

export default function Allgemein() {
  return (
    <section className="bg-[var(--slate)] w-[100vw] min-h-[100vh] pt-[60px] pb-12 text-[var(--slate-300)] overflow-x-hidden">
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="text-center !text-[24px] mb-8 tracking-wide !whitespace-normal">
          Allgemeine Teil
        </h2>
      </div>
    </section>
  );
}
