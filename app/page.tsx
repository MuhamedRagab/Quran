"use client";

import { Suspense, useEffect, useState } from "react";
import SurahList from "./home/SurahList";
import surahData from "quran-db/utils/surah_data";
import SearchSurah from "./home/SearchSurah";
import { twMerge } from "tailwind-merge";
import Loader from "./components/Loader";

export interface ISurahListProps {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export default function Home() {
  const [surah, setSurah] = useState<ISurahListProps[] | []>([]);

  useEffect(() => {
    (async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_QURAN_API}/meta`)
          .then((res) => res.json())
          .then(({ data }) => {
            setSurah(data.surahs.references);
          });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <main
      className={twMerge(
        "prose flex flex-col items-center mx-auto p-2 sm:p-4",
        "max-w-screen-lg"
      )}
    >
      <section className="container flex flex-col items-center justify-center">
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
