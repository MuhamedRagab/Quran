"use client";

import { useState } from "react";
import SurahList from "./home/SurahList";
import surahData from "quran-db/utils/surah_data";
import SearchSurah from "./home/SearchSurah";
import { twMerge } from "tailwind-merge";

export interface ISurahListProps {
  id: number;
  arabic: string;
  aya: number;
  name: string;
  english: string;
  place: string;
  turkish: string;
}

export default function Home() {
  const [surah, setSurah] = useState(surahData);

  return (
    <main
      className={twMerge(
        "prose flex flex-col items-center mx-auto p-4",
        "max-w-screen-lg"
      )}
    >
      <section className="container flex flex-col items-center justify-center">
        <SearchSurah setSurah={setSurah} />
        <SurahList surah={surah} />
      </section>
    </main>
  );
}
