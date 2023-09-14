import React from "react";
import { AyahEndSymbol } from "./Ayah";

interface Props {
  ayahRef: React.MutableRefObject<HTMLLIElement | null>;
  ayahNumberPlaying: number;
}

export default function ButtonScroll({ ayahRef, ayahNumberPlaying }: Props) {
  return (
    <button
      className="fixed bottom-8 right-8 z-30 bg-slate-800 hover:bg-slate-700 duration-200 text-white rounded-full p-2"
      onClick={() => {
        if (!ayahRef || !ayahRef.current) return;
        window.scrollTo({
          top: ayahRef.current.offsetTop - 100,
          behavior: "smooth",
        });
      }}
    >
      <AyahEndSymbol
        numberInSurah={ayahNumberPlaying}
        className="-translate-y-1/3"
      />
    </button>
  );
}
