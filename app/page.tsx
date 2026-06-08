"use client";

import { useState } from "react";
import Trans from "@/app/trans/Trans";
import ExportToDropbox from "./trans/ExportToDropbox";
import Pdf from "./trans/Pdf";
import ImageOcr from "./trans/ImageOcr";

type PageItem = {
  pageNumber: number;
  original: string;
  translated: string;
};

export default function HomePage() {
  const [pages, setPages] = useState<PageItem[]>([]);

  return (
    <div className="pt-[60px] !max-w-[100vw]  bg-slate-950 text-slate-50 p-2">
      <div className="flex flex-col lg:flex-row justify-center mb-4 gap-4">
        {/*------------------------------------*/}
        <Pdf pages={pages} setPages={setPages} />
        {/*------------------------------------*/}
        <ImageOcr setPages={setPages} />
      </div>
      {/*------------------------------------*/}
      {pages.length > 0 && <ExportToDropbox pages={pages} />}
      <Trans pages={pages} setPages={setPages} />
    </div>
  );
}
