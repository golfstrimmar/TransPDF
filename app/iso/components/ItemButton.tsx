"use client";
import React, { useEffect } from "react";

interface ItemButtonProps {
  isActive: string;
  setisActive: (value: string) => void;
  isMarker: string;
  setisMarker: (value: string) => void;
  item: {
    name: string;
    marker: string;
  };
}

// Статический словарь цветов для беспрепятственной компиляции Tailwind
const colorClasses: Record<string, string> = {
  purple:
    "bg-[color-mix(in_srgb,var(--purple-400)_40%,transparent)] !text-[var(--purple-100)] hover:border-purple-500",
  lime: "bg-[color-mix(in_srgb,var(--lime-400)_40%,transparent)] !text-[var(--lime-100)] hover:border-lime-500",
  pink: "bg-[color-mix(in_srgb,var(--pink-400)_40%,transparent)] !text-[var(--pink-100)] hover:border-pink-500",
  sky: "bg-[color-mix(in_srgb,var(--sky-400)_40%,transparent)] !text-[var(--sky-100)] hover:border-sky-500",
  amber:
    "bg-[color-mix(in_srgb,var(--amber-400)_40%,transparent)] !text-[var(--amber-100)] hover:border-amber-500",
  indigo:
    "bg-[color-mix(in_srgb,var(--indigo-400)_40%,transparent)] !text-[var(--indigo-100)] hover:border-amber-500",
  orange:
    "bg-[color-mix(in_srgb,var(--orange-400)_40%,transparent)] !text-[var(--orange-100)] hover:border-orange-500",
  navy: "bg-[color-mix(in_srgb,var(--navy-400)_40%,transparent)] !text-[var(--navy-100)] hover:border-orange-500",
  slate:
    "bg-[color-mix(in_srgb,var(--slate-400)_40%,transparent)] !text-[var(--slate-100)] hover:border-orange-500",
  red: "bg-[color-mix(in_srgb,var(--red-400)_40%,transparent)] !text-[var(--red-100)] hover:border-orange-500",
  yellow:
    "bg-[color-mix(in_srgb,var(--yellow-400)_40%,transparent)] !text-[var(--yellow-100)] hover:border-orange-500",
  grey: "bg-slate-800 !text-slate-300 hover:border-slate-700",
};

export default function ItemButton({
  isActive,
  setisActive,
  isMarker,
  setisMarker,
  item,
}: ItemButtonProps) {
  useEffect(() => {
    if (!item) return;
  }, [item]);

  let colorKey = "grey";

  switch (item.marker) {
    case "fuss":
      colorKey = "purple";
      break;
    case "bein":
      colorKey = "lime";
      break;
    case "positionen":
      colorKey = "pink";
      break;
    case "becken":
      colorKey = "sky";
      break;
    case "hüften":
      colorKey = "orange";
      break;
    case "oberkörper":
      colorKey = "amber";
      break;
    case "schultern":
      colorKey = "indigo";
      break;
    case "hand":
      colorKey = "navy";
      break;
    case "arm":
      colorKey = "slate";
      break;
    case "kopf":
      colorKey = "red";
      break;
    case "drehungen":
      colorKey = "yellow";
      break;
    default:
      colorKey = "grey";
      break;
  }

  const baseColorClass = colorClasses[colorKey] || colorClasses.grey;

  // Проверяем активность кнопки строго по имени и по маркеру
  const isButtonActive = isActive === item.name && isMarker === item.marker;
  useEffect(() => {
    if (!item) return;
    console.log("<===item===>", item.name, item.marker, isActive, isMarker);
  }, [item]);
  return (
    <button
      key={item.name}
      className={`button-iso btn btn-empty !py-1 px-4 rounded-xl border text-left text-sm transition-all duration-200 cursor-pointer ${
        isButtonActive
          ? `bg-[color-mix(in_srgb,var(--teal-400)_40%,transparent)] !text-[var(--teal-400)] border-teal-500/50`
          : `${baseColorClass} border-slate-800`
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
