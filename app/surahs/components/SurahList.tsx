import { ISurahListProps } from "../page";
import Link from "next/link";
import Aos from "aos";
import { useEffect } from "react";
import Loader from "@/app/components/Loader";
import Card from "@/app/components/ui/Card";

export default function SurahList({ surah }: { surah: ISurahListProps[] }) {
  useEffect(() => {
    Aos.init({
      duration: 500,
      once: true,
    });
  }, []);

  if (surah.length === 0) return <Loader />;

  return (
    <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 w-full place-items-center p-8">
      {surah.map(({ name, id, aya, arabic, place }) => (
        <Card
          data-aos="zoom-in"
          key={id}
          className="p-4 rounded-lg text-center"
        >
          <Link
            href={`/surahs/${id}`}
            className="link link-secondary transition decoration-transparent mb-2 text-xl"
          >
            {arabic}
          </Link>
          <small>English: {name}</small>
          <small>Place: {place}</small>
          <small>{aya} Ayahs</small>
        </Card>
      ))}
    </ul>
  );
}
