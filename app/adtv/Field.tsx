"use client";
import { div } from "framer-motion/client";
import React, { useState, useEffect } from "react";

export default function Field({ foo, was, checket, setCountR, setCountF }) {
  const [tempVal, setTempVal] = useState<string>("");
  const res = was.toLowerCase();
  const resFoo = foo[res]; // правильный ответ
  const fooName = foo.name.split(" ")[0];
  // useEffect(() => {
  //   if (!was) return;
  //   console.log("<===res===>", res);
  //   console.log("<===resFoo===>", resFoo);
  // }, [was, res, resFoo]);

  useEffect(() => {
    if (!tempVal) return;
    console.log("<===tempVal===>", tempVal);
  }, [tempVal]);

  return (
    <fieldset
      className="field-radio"
      style={{
        borderRight: "1px solid var(--slate-300)",
        paddingRight: "8px",
      }}
    >
      {was && <h3 className="mb-1 ">{was}</h3>}

      {checket &&
        checket.map((hero, idx) => {
          const isSelected = tempVal === hero;
          const isCorrect = tempVal === resFoo;

          return (
            <div key={hero}>
              <div className="f-radio">
                <input
                  id={`dance-${fooName}-${was}-${idx}`} // уникальный id
                  name={`danceGrup-${res}`} // группа по вопросу
                  type="radio"
                  value={hero}
                  checked={isSelected} // делаем контролируемым
                  onChange={() => {
                    setTempVal(hero);

                    if (hero === resFoo) {
                      setCountR((prev) => prev + 1);
                    } else {
                      setCountF((prev) => prev + 1);
                    }
                  }}
                />
                <label
                  htmlFor={`dance-${fooName}-${was}-${idx}`}
                  className={
                    !isSelected
                      ? ""
                      : isCorrect
                        ? "text-green-500!"
                        : "text-red-500!"
                  }
                >
                  {hero}
                </label>
              </div>
            </div>
          );
        })}
    </fieldset>
  );
}
