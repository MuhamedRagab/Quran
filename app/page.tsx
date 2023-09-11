"use client";
import { Suspense, useState } from "react";
import SurahList from "./home/SurahList";
import surahData from "quran-db/utils/surah_data";
import SearchSurah from "./home/SearchSurah";
import { twMerge } from "tailwind-merge";
import Loader from "./components/Loader";

export interface ISurahListProps {
  id: number;
  name: string;
  arabic: string;
  english: string;
  aya: number;
  place: string;
  turkish: string;
}

export default function Home() {
  const [surah, setSurah] = useState<ISurahListProps[]>(surahData);

  return (
    <main
      className={twMerge(
        "prose flex flex-col items-center mx-auto p-2 sm:p-4",
        "max-w-full"
      )}
    >
      <section className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-6">
          <SearchSurah setSurah={setSurah} />
        </div>
        <Suspense fallback={<Loader />}>
          <SurahList surah={surah} />
        </Suspense>
      </section>
    </main>
  );
}
