"use client";
import { Suspense, useState, lazy } from "react";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import surahData from "@/app/data/surahs.json";

const Loader = lazy(() => import("../components/Loader"));
const SurahList = dynamic(() => import("./components/SurahList"), {
  loading: () => <Loader />,
});
const Container = dynamic(() => import("../components/Container"), {
  loading: () => <Loader />,
});
const SearchSurah = dynamic(() => import("./components/SearchSurah"), {
  loading: () => <Loader />,
});

export interface ISurahListProps {
  id: number;
  name: string;
  arabic: string;
  english: string;
  aya: number;
  place: string;
  turkish: string;
}

export default function Surahs() {
  const [surah, setSurah] = useState<ISurahListProps[]>(surahData);

  return (
    <Container className="prose flex flex-col" isRtl={true}>
      <h1 className={twMerge("text-center", "text-4xl", "font-bold")}>
        القرآن الكريم
      </h1>
      <section className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-6">
          <SearchSurah setSurah={setSurah} />
        </div>
        <Suspense fallback={<Loader />}>
          <SurahList surah={surah} />
        </Suspense>
      </section>
    </Container>
  );
}
