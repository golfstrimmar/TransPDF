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
              <div className="flex items-center gap-2 mb-1 mt-4">
                <h2 className="text-green-900! bg-amber-100 text-center ">
                  {foo.name}
                </h2>
              </div>
              <div className="unit" key={foo.name}>
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
