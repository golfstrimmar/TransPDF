"use client";
import React, { useState, useEffect, useRef } from "react";
type FieldProps = {
  foo: Record<string, string> & { name: string };
  was: string;
  checket: string[];
  setCountR: React.Dispatch<React.SetStateAction<number>>;
  setCountF: React.Dispatch<React.SetStateAction<number>>;
};
export default function Field({ foo, was, checket, setCountR, setCountF }) {
  const [tempVal, setTempVal] = useState<string>("");
  const res = was.toLowerCase();
  const resFoo = foo[res]; // правильный ответ
  const fooName = foo.name.split(" ")[0];
  const tempRef = useRef(null);
  const holdChange = (hero) => {
    if (resFoo === hero) {
      setCountR((prev) => prev + 1);
    } else {
      setCountF((prev) => prev + 1);
    }
  };
  return (
    <fieldset className="field-radio">
      {was && <h3 className="mb-1 border-b-2">{was}</h3>}
      <div className="flex gap-2 justify-between border-sky-900 border rounded-2xl items-center p-2">
        <button
          className="btn-emerald btn px-4"
          onMouseEnter={() => {
            if (tempRef.current) tempRef.current.style.opacity = "1";
          }}
          onMouseLeave={() => {
            if (tempRef.current) tempRef.current.style.opacity = "0";
          }}
        >
          r
        </button>
        {resFoo && (
          <h6
            ref={tempRef}
            className={
              "!text-[var(--lime-300)]  transition-opacity duration-300"
            }
            style={{ opacity: "0" }}
          >
            {resFoo}
          </h6>
        )}
      </div>
      {checket &&
        checket.map((hero, idx) => {
          const isSelected = tempVal === hero;
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
                    holdChange(hero);
                  }}
                />
                <label
                  htmlFor={`dance-${fooName}-${was}-${idx}`}
                  className={
                    !isSelected
                      ? ""
                      : tempVal === resFoo
                        ? "!text-green-500"
                        : "!text-red-500"
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
