"use client";
export const dynamic = "force-dynamic";

import { useCallback, Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/app/components/Loader";
import { FaPause, FaPlay } from "react-icons/fa";
import Aos from "aos";
import Ayah, { AyahEndSymbol } from "./components/Ayah";
import Basmala, { basmalaText } from "./components/Basmala";
import { twMerge } from "tailwind-merge";
import Container from "@/app/components/Container";
import { useSettings } from "@/app/context/settings";

type ISurah = {
  ayahs: {
    audio: string;
    audioSecondary: string[];
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
  const { settings } = useSettings();
  const { surahId } = useParams() as { surahId: string };
  const [surah, setSurah] = useState<ISurah>({} as ISurah);
  const ayahRef = useRef<HTMLLIElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [ayahNumberPlaying, setAyahNumberPlaying] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isScrollButtonVisible, setIsScrollButtonVisible] =
    useState<boolean>(false);

  const setupAudio = useCallback(() => {
    if (!audioRef || !audioRef.current) return;
    audioRef.current.playbackRate = settings.audioSpeed.value;
  }, [settings.audioSpeed.value]);

  // Play/Pause verse audio
  const verseAudioURL = useCallback(
    (ayahNumber: number) => {
      if (!audioRef || !audioRef.current)
        throw new Error("Audio ref is not defined");

      const audio = surah.ayahs[ayahNumber - 1].audio;
      audioRef.current.src = audio;
      setupAudio();
      setAyahNumberPlaying(ayahNumber);

      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsAudioPlaying(true);
      } else {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }
    },
    [setupAudio, surah.ayahs]
  );

  // Play/Pause surah audio
  const surahPlayPauseHandler = () => {
    if (audioRef.current.src === "" || ayahNumberPlaying === 0) {
      verseAudioURL(1);
      setIsAudioPlaying(true);
    } else if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsAudioPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsAudioPlaying(false);
    }
  };

  // Fetch surah data
  useEffect(() => {
    (async () => {
      try {
        const { data } = (await (
          await fetch(
            `${process.env.NEXT_PUBLIC_QURAN_API}/surah/${parseInt(
              surahId
            )}/ar.alafasy`
          )
        ).json()) as { data: ISurah };

        setSurah(data);
      } catch (error) {
        console.error(error);
      }
    })();
    // Enable AOS
    Aos.init({
      duration: 500,
      once: true,
    });
  }, [surahId]);

  // Setup audio
  useEffect(() => {
    setupAudio();
  }, [setupAudio]);

  // Detect if the ayah is visible in the viewport
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
    <Container isRtl={true}>
      <div className="p-2">
        <h3>رقم السوره: {surah.number}</h3>
        <h3>عدد الايات: {surah.numberOfAyahs}</h3>
        <h3>نوع الوحي: {surah.revelationType}</h3>
      </div>

      <div className="flex items-baseline justify-center gap-4 sticky top-0 bg-[#1d232a] z-20 p-2 mb-10">
        <button
          className="text-xl cursor-pointer"
          onClick={surahPlayPauseHandler}
        >
          {isAudioPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <h2 className="text-center text-2xl p-2">
          {surah.name} - {surah.englishName}
        </h2>
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        hidden
        onEnded={() => {
          setAyahNumberPlaying(0);
          setIsAudioPlaying(false);
        }}
      />

      {surah.ayahs[0].number !== 1 && surah.ayahs[0].number !== 1236 ? (
        <Basmala key={basmalaText} />
      ) : null}

      <ul className="flex items-baseline gap-x-6 flex-wrap justify-center select-none mt-6">
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
                    ? text.slice(39)
                    : text,
                numberInSurah,
                numberOfAyahs: surah.numberOfAyahs,
                playAudio: (ayahNumber?: number) =>
                  verseAudioURL(ayahNumber || numberInSurah),
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
          <AyahEndSymbol
            numberInSurah={ayahNumberPlaying}
            baseClassName="bottom-3"
          />
        </button>
      )}
    </Container>
  );
}
