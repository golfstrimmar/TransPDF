"use client";

import { useState } from "react";
import Trans from "@/app/Trans";

import ExportToDropbox from "./ExportToDropbox";
import Pdf from "./Pdf";
import ImageOcr from "./ImageOcr";

type PageItem = {
  pageNumber: number;
  original: string;
  translated: string;
};

export default function HomePage() {
  const [pages, setPages] = useState<PageItem[]>([]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <div className="grid grid-cols-2 mb-4">
        {/*------------------------------------*/}
        <div className="mx-auto  space-y-6">
          <Pdf pages={pages} setPages={setPages} />
        </div>
        {/*------------------------------------*/}
        <div className="mx-auto  space-y-6">
          <ImageOcr setPages={setPages} />
        </div>
      </div>
      {/*------------------------------------*/}
      {pages.length > 0 && <ExportToDropbox pages={pages} />}
      <Trans pages={pages} setPages={setPages} />
    </main>
  );
}
