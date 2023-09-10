import { ISurahListProps } from "../page";
import surahData from "quran-db/utils/surah_data";

export default function SearchSurah({
  setSurah,
}: {
  setSurah: React.Dispatch<React.SetStateAction<ISurahListProps[]>>;
}) {
  const searchSurah = (e: React.ChangeEvent<HTMLInputElement>) => {
    const surah: ISurahListProps[] = surahData.filter(
      ({ arabic, name, id }) =>
        arabic.toLowerCase().includes(e.target.value.toLowerCase()) ||
        name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        id === +e.target.value
    );
    setSurah(surah);
  };

  return (
    <input
      type="search"
      className="input input-bordered w-full max-w-md pb-2"
      placeholder="ابحث باسم السورة او رقمها"
      dir="rtl"
      onChange={searchSurah}
    />
  );
}
