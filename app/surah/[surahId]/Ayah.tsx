import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export interface IAyahProps {
  text: string;
  numberInSurah: number;
  audioRef: React.MutableRefObject<HTMLAudioElement> | null;
  ayahRef: React.MutableRefObject<HTMLLIElement> | null;
  surahId: string;
  ayahNumberPlaying: number;
  numberOfAyahs: number;
  verseAudioURL: (surahNumber: number, ayahNumber: number) => void;
}

export const VerseSymbol = ({
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
  surahId,
  ayahNumberPlaying,
  numberOfAyahs,
  verseAudioURL,
}: IAyahProps) {
  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.onended = () => {
        if (ayahNumberPlaying < numberOfAyahs) {
          verseAudioURL(parseInt(surahId), ayahNumberPlaying + 1);
        }
      };
    }
  }, [audioRef, ayahNumberPlaying, numberOfAyahs, surahId, verseAudioURL]);

  return (
    <li
      key={text}
      className="py-2 text-2xl leading-10"
      ref={ayahNumberPlaying === numberInSurah ? ayahRef : null}
    >
      <button
        className={twMerge(
          `hover:bg-amber-100 hover:text-black cursor-pointer rounded duration-200 pb-4 px-1 ${
            ayahNumberPlaying === numberInSurah ? "text-black bg-amber-100" : ""
          }`,
          "inline-block"
        )}
        onClick={() => verseAudioURL(parseInt(surahId), numberInSurah)}
      >
        {text}
        <VerseSymbol numberInSurah={numberInSurah} />
      </button>
    </li>
  );
}
