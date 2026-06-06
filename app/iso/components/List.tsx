"use client";
import React, { useState } from "react";
import { IsoElemente } from "@/app/iso/helpers/el";
import { AnimatePresence, motion } from "framer-motion";
import ItemButton from "@/app/iso/components/ItemButton";

export default function List() {
  const [isActive, setisActive] = useState<string>("");
  const [isMarker, setisMarker] = useState<string>("");

  function formatContent(raw: string): string {
    return raw.replace(/\s*\&\s*/g, "\n");
  }


  // ====>====>====>====>====>====>====>====>====>====>====>====>====>====>====>
  return (
    <div className="pt-4 grid grid-cols-[250px_1fr]">
      <div className="flex flex-col gap-1">
        {IsoElemente.filter((item) => item.marker === "fuss").map((item) => (
          <ItemButton key={item?.name} isActive={isActive} setisActive={setisActive} isMarker={isMarker}
          setisMarker={setisMarker}
          item={item}
          color={"purple"}
          m={"fuss"}
          />
        ))}
        {IsoElemente.filter((item) => item.marker === "bein").map((item) => (
          <ItemButton key={item?.name} isActive={isActive} setisActive={setisActive} isMarker={isMarker}
          setisMarker={setisMarker}
          item={item}
          color={"lime"}
          m={"bein"}
          />
        ))}
        {IsoElemente.filter((item) => item.marker === "positionen").map((item) => (
          <ItemButton key={item?.name} isActive={isActive} setisActive={setisActive} isMarker={isMarker}
          setisMarker={setisMarker}
          item={item}
          color={"blue"}
          m={"positionen"}
          />
        ))}
        {/*{IsoElemente.filter((item) => item.marker === "positionen").map((item) => (
          <button
            key={item.name}
            className={`btn btn-empty  !py-1 bg-[color-mix(in_srgb,var(--lime-400)_40%,transparent)] !text-[var(--lime-100)] ${
            (isActive === item.name && isMarker === "positionen")
                ? "bg-[color-mix(in_srgb,var(--teal-400)_40%,transparent)] !text-[var(--teal-400)]"
                : ""
                } `}
            onClick={() => {
              setisActive(item.name);
              setisMarker(item.marker);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {item.name}
          </button>
        ))}*/}
      </div>

      <div className="p-1 border  bg-[color-mix(in_srgb,var(--teal-200)_10%,transparent)]">
        <AnimatePresence initial={false} mode="wait">
          {IsoElemente.map(
            (item) =>
             ( isActive === item.name &&
              isMarker === item.marker) &&(
                  <motion.p
                    key={item.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[18px] whitespace-pre-line"
                  >
                    {formatContent(item.content)}
                  </motion.p>,
                ),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
