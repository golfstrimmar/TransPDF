"use client";
import React from "react";

interface ItemButtonProps {
  isActive: string;
  setisActive: (value: string) => void;
  isMarker: string;
  setisMarker: (value: string) => void;
  item: {
    name: string;
    marker: string;
  };
  color: string;
  m: string;
}

export default function ItemButton({
  isActive,
  setisActive,
  isMarker,
  setisMarker,
  item,
  color,
  m,
}: ItemButtonProps) {
  const mr = isMarker === m;
  return (
    <button
      key={item.name}
      className={`btn btn-empty !py-1 bg-[color-mix(in_srgb,var(--${color}-400)_40%,transparent)] !text-[var(--${color}-100)] ${
        isActive === item.name && mr
          ? `bg-[color-mix(in_srgb,var(--teal-400)_40%,transparent)] !text-[var(--teal-400)]`
          : ""
      }`}
      onClick={() => {
        setisActive(item.name);
        setisMarker(item.marker);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {item.name}
    </button>
  );
}
