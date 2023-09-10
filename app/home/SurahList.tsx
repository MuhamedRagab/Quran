import React from "react";
import { ISurahListProps } from "../page";
import Link from "next/link";

export default function SurahList({ surah }: { surah: ISurahListProps[] }) {
  return (
    <ul className="flex flex-wrap gap-4 justify-center w-full" dir="rtl">
      {surah.map(({ id, arabic, aya, name, place }) => (
        <li
          key={id}
          className="flex flex-col p-3 rounded text-center border border-slate-700 w-36 hover:bg-slate-700 hover:text-white transition duration-200"
        >
          <Link
            href={`/surah/${id}`}
            className="link link-secondary transition decoration-transparent mb-2 text-xl"
          >
            {arabic}
          </Link>
          <small>English: {name}</small>
          <small>Place: {place}</small>
          <small>{aya} Ayahs</small>
        </li>
      ))}
    </ul>
  );
}
