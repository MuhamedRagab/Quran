import { ISurahListProps } from "../page";
import surahData from "@/app/data/surahs.json";

export default function SearchSurah({
  setSurah,
}: {
  setSurah: React.Dispatch<React.SetStateAction<ISurahListProps[]>>;
}) {
  const searchSurah = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerValue = e.target.value.toLowerCase();
    const surah: ISurahListProps[] = surahData.filter(
      ({ name, arabic, id }: ISurahListProps) =>
        arabic.includes(lowerValue) ||
        id === +e.target.value ||
        name.toLowerCase().includes(lowerValue)
    );
    setSurah(surah);
  };

  return (
    <input
      type="search"
      className="input input-bordered w-full max-w-md"
      placeholder="ابحث باسم السورة او رقمها"
      onChange={searchSurah}
    />
  );
}
