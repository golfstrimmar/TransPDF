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
  const RenderFields = [
    { checket: Musikrichtung },
    { checket: Takt },
    { checket: Temp },
    { checket: bpm },
    { checket: zahl },
    { checket: schlagwerte },
  ];
  // ====>====>====>====>====>====>====>====>====>====>
  return (
    <section className="mt-4">
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
