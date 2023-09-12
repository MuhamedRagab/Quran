import React from "react";
import ahadithData from "@/app/data/ahadith.json";

interface Props {
  setAhadith: React.Dispatch<React.SetStateAction<typeof ahadithData>>;
}

export default function AhadithSearch({ setAhadith }: Props) {
  const searchSurah = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerValue = e.target.value.toLowerCase();
    const ahadith = ahadithData.filter(
      ({ arabic, id }) => arabic.includes(lowerValue) || id.includes(lowerValue)
    );
    setAhadith(ahadith);
  };

  return (
    <input
      type="search"
      className="input input-bordered w-full max-w-md"
      placeholder="ابحث باسم المؤلف"
      onChange={searchSurah}
    />
  );
}
