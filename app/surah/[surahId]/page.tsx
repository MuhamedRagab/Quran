"use client";

import { useCallback, Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { getSurah } from "@/app/utils/quranDb";
import Ayah, { VerseSymbol } from "./Ayah";
import Loader from "@/app/components/Loader";
import { FaPause, FaPlay } from "react-icons/fa";
import { getAudioURLByVerse } from "quran-db";
import Basmala, { basmalaText } from "./Basmala";

type ISurah = {
  ayahs: {
    hizbQuarter: number;
    juz: number;
    manzil: number;
    number: number;
    numberInSurah: number;
    page: number;
    ruku: number;
    sajda: boolean;
    text: string;
  }[];
  edition: {
    direction: string;
    englishName: string;
    format: string;
    identifier: string;
    language: string;
    name: string;
    type: string;
  };
  englishName: string;
  englishNameTranslation: string;
  name: string;
  number: number;
  numberOfAyahs: number;
  revelationType: string;
};

export default function Surah() {
  const { surahId } = useParams() as { surahId: string };
  const [surah, setSurah] = useState<ISurah>({} as ISurah);
  const ayahRef = useRef<HTMLLIElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [ayahNumberPlaying, setAyahNumberPlaying] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isScrollButtonVisible, setIsScrollButtonVisible] =
    useState<boolean>(false);

  const verseAudioURL = useCallback(
    (surahNumber: number, ayahNumber: number) => {
      if (!audioRef || !audioRef.current)
        throw new Error("Audio ref is not defined");
      audioRef.current.src = getAudioURLByVerse(surahNumber, ayahNumber);
      setAyahNumberPlaying(ayahNumber);

      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsAudioPlaying(true);
      } else {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }
    },
    []
  );

  const surahPlayPauseHandler = () => {
    if (audioRef.current.src === "") {
      verseAudioURL(parseInt(surahId), 1);
      setIsAudioPlaying(true);
    } else if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsAudioPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsAudioPlaying(false);
    }
  };

  useEffect(() => {
    (async () => {
      const surahData = (await getSurah(parseInt(surahId))) as ISurah;
      setSurah(surahData);
    })();
  }, [surahId]);

  useEffect(() => {
    if (!ayahRef?.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsScrollButtonVisible(false);
          } else {
            setIsScrollButtonVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(ayahRef.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ayahRef?.current]);

  if (!surah || Object.keys(surah?.ayahs ?? {}).length === 0) return <Loader />;

  return (
    <div className="container p-4" dir="rtl">
      <h3>رقم السوره: {surah.number}</h3>
      <h3>عدد الايات: {surah.numberOfAyahs}</h3>
      <h3>نوع الوحي: {surah.revelationType}</h3>

      <div className="flex items-center gap-8 justify-center sticky top-0 bg-[#1d232a] z-20">
        <button className="text-3xl" onClick={surahPlayPauseHandler}>
          {isAudioPlaying ? (
            <FaPause className="text-2xl cursor-pointer" />
          ) : (
            <FaPlay className="text-2xl cursor-pointer" />
          )}
        </button>
        <h2 className="text-center text-3xl my-6">
          {surah.name} - {surah.englishName}
        </h2>
      </div>
      <audio
        ref={audioRef}
        onEnded={() => {
          setAyahNumberPlaying(0);
        }}
      />

      {surah.ayahs[0].number !== 1 && surah.ayahs[0].number !== 1236 ? (
        <Basmala key={basmalaText} />
      ) : null}

      <ul className="flex items-baseline gap-x-6 flex-wrap justify-center select-none">
        {surah.ayahs.slice(0)?.map(({ text, numberInSurah, number }) => (
          <Suspense key={number} fallback={<Loader />}>
            <Ayah
              {...{
                audioRef,
                ayahRef,
                surahId,
                ayahNumberPlaying,
                text:
                  numberInSurah === 1 && number !== 1 && number !== 1236
                    ? text.slice(40)
                    : text,
                numberInSurah,
                numberOfAyahs: surah.numberOfAyahs,
                verseAudioURL,
              }}
            />
          </Suspense>
        ))}
      </ul>
      {isScrollButtonVisible && (
        <button
          className="fixed bottom-10 right-14 z-30 bg-slate-800 hover:bg-slate-700 duration-200 text-white rounded-full p-2"
          onClick={() => {
            if (!ayahRef || !ayahRef.current) return;
            window.scrollTo({
              top: ayahRef.current.offsetTop - 100,
              behavior: "smooth",
            });
          }}
        >
          <VerseSymbol
            numberInSurah={ayahNumberPlaying}
            baseClassName="bottom-3"
          />
        </button>
      )}
    </div>
  );
}
