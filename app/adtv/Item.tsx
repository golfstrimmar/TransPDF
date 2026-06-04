"use client";
import React, { useState, useEffect } from "react";
import "./item.scss";
import ClearIcon from "@/components/icons/ClearIcon";
import Field from "./Field";

// --- 🔹🟢🔹🟢🔹🟢🔹🟢🔹🟢🔹🟢🔹🟢🔹🟢
export default function Item({
  setCountR,
  setCountF,
  currentFrage,
  Musikrichtung,
  Takt,
  Temp,
  bpm,
  zahl,
  schlagwerte,
  headers,
}) {
  // ====>====>====>====>====>====>====>====>====>====>
  // ====>====>====>====>====>====>====>====>====>====>
  const RenderFields = [
    { checket: Musikrichtung },
    { checket: Takt },
    { checket: Temp },
    { checket: bpm },
    { checket: zahl },
    { checket: schlagwerte },
  ];

  const getGroupKey = (val: number) => {
    if (val >= 20 && val <= 30) return "20-30";
    if (val > 30 && val <= 40) return "30-40";
    if (val > 40 && val <= 50) return "40-50";
    if (val > 50 && val <= 60) return "50-60";
    if (val > 60 && val <= 70) return "60-70";
    return null;
  };

  const getTextClass = (group: string) => {
    switch (group) {
      case "20-30":
        return "text-[var(--grey-100)]";
      case "30-40":
        return "text-[var(--grey-100)]";
      case "40-50":
        return "text-[var(--grey-100)]";
      case "50-60":
        return "text-[var(--grey-100)]";

      default:
        return "";
    }
  };

  // группировка
  const grouped: Record<string, { name: string; raw: string }[]> = {
    "20-30": [],
    "30-40": [],
    "40-50": [],
    "50-60": [],
  };
  const res = headers[2].toLowerCase();

  const allValues = currentFrage
    .sort((a, b) => a[res].split("-")[0].trim() - b[res].split("-")[0].trim())
    .map((foo) => {
      return { resName: foo.name, resRes: foo[res] };
    });
  allValues.forEach((foo) => {
    const raw = foo.resRes.split("-")[0].trim();
    const rrr = Number(raw);
    if (!Number.isFinite(rrr)) return;

    const key = getGroupKey(rrr);
    if (!key) return;

    grouped[key].push({ name: foo.resName, raw: foo.resRes });
  });

  // рендер
  const groupOrder = ["20-30", "30-40", "40-50", "50-60"] as const;

  // ====>====>====>====>====>====>====>====>====>====>
  return (
    <section className="mt-4">
      <div className="grid grid-cols-4 gap-4">
        {groupOrder.map((groupKey) => (
          <div key={groupKey} className="p-2 bg-[var(--grey-20)]">
            <h4 className="mb-2 !text-blue-600">{groupKey}</h4>
            {grouped[groupKey] &&
              grouped[groupKey].map((foo) => (
                <div
                  key={foo.name}
                  className={`flex justify-between gap-2    ${getTextClass(groupKey)}`}
                >
                  <p>{foo.name}</p>
                  <p>{foo.raw}</p>
                </div>
              ))}
          </div>
        ))}
      </div>

      {currentFrage &&
        currentFrage.map((foo) => {
          return (
            <div key={foo.name}>
              <button
                onClick={(e) => {
                  const next = (e.currentTarget as HTMLButtonElement)
                    .nextElementSibling;
                  [...document.querySelectorAll(".unit")].forEach((foo) => {
                    if (foo !== next) foo.classList.remove("_active");
                  });
                  if (next && !next.classList.contains("_active")) {
                    next.classList.add("_active");
                  } else {
                    next.classList.remove("_active");
                  }
                }}
                className="flex rounded items-center  bg-amber-100 gap-2 mt-2 cursor-pointer hover:bg-amber-300 transition"
              >
                <h2 className=" text-center px-2 !text-green-900">
                  {foo.name}
                </h2>
              </button>

              <div className="unit transition" key={foo.name}>
                {RenderFields &&
                  RenderFields.map((el, index) => {
                    return (
                      <Field
                        key={index}
                        foo={foo}
                        was={headers[index]}
                        checket={el.checket}
                        setCountR={setCountR}
                        setCountF={setCountF}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
    </section>
  );
}
