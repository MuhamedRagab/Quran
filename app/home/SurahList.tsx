import { ISurahListProps } from "../page";
import Link from "next/link";
import Aos from "aos";
import { useEffect } from "react";

export default function SurahList({ surah }: { surah: ISurahListProps[] }) {
  useEffect(() => {
    Aos.init({
      duration: 500,
      once: true,
    });
  }, []);

  return (
    <ul
      className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full place-items-center pl-0"
      dir="rtl"
    >
      {surah.length > 0 &&
        surah.map(
          ({ name, number, numberOfAyahs, englishName, revelationType }) => (
            <li
              data-aos="zoom-in"
              key={number}
              className="flex flex-col p-3 rounded text-center border border-slate-700 w-full hover:bg-slate-700 hover:text-white transition duration-200"
            >
              <Link
                href={`/surah/${number}`}
                className="link link-secondary transition decoration-transparent mb-2 text-xl"
              >
                {name}
              </Link>
              <small>English: {englishName}</small>
              <small>Place: {revelationType}</small>
              <small>{numberOfAyahs} Ayahs</small>
            </li>
          )
        )}
    </ul>
  );
}
