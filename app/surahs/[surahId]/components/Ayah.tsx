import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Amiri_Quran } from "next/font/google";

export interface IAyahProps {
  text: string;
  numberInSurah: number;
  audioRef: React.MutableRefObject<HTMLAudioElement> | null;
  ayahRef: React.MutableRefObject<HTMLLIElement> | null;
  ayahNumberPlaying: number;
  number: number;
  numberOfAyahs: number;
  playAudio: (numberInSurah?: number) => void;
}

export const amiri_quran = Amiri_Quran({
  subsets: ["latin"],
  weight: "400",
});

export const AyahEndSymbol = ({
  numberInSurah,
  className,
  baseClassName,
}: {
  numberInSurah: number;
  className?: string;
  baseClassName?: string;
}) => (
  <div className={twMerge("relative text-4xl inline-block", baseClassName)}>
    ۝
    <span
      className={twMerge(
        `absolute top-1/2 left-1/2 -translate-x-1/2 text-base`,
        className
      )}
    >
      {numberInSurah}
    </span>
  </div>
);

export default function Ayah({
  text,
  numberInSurah,
  audioRef,
  ayahRef,
  ayahNumberPlaying,
  numberOfAyahs,
  number,
  playAudio,
}: IAyahProps) {
  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.onended = () => {
        if (ayahNumberPlaying < numberOfAyahs) {
          playAudio(ayahNumberPlaying + 1);
        }
      };
    }
  }, [audioRef, ayahNumberPlaying, numberOfAyahs, playAudio]);

  return (
    <li
      key={text}
      className={`${amiri_quran.className} py-2 text-2xl`}
      ref={ayahNumberPlaying === numberInSurah ? ayahRef : null}
      data-aos="zoom-in"
    >
      <button
        className={twMerge(
          `hover:bg-amber-100 hover:text-black cursor-pointer rounded duration-200 pb-4 px-1 ${
            ayahNumberPlaying === numberInSurah ? "text-black bg-amber-100" : ""
          }`,
          "inline-block"
        )}
        onClick={() => playAudio()}
      >
        {numberInSurah === 1 && number !== 1 && number !== 1236
          ? text.slice(39)
          : text}{" "}
        <AyahEndSymbol numberInSurah={numberInSurah} />
      </button>
    </li>
  );
}
