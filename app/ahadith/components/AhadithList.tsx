import Link from "next/link";
import Card from "@/app/components/ui/Card";
import ahadithData from "@/app/data/ahadith.json";
import { useEffect } from "react";
import Aos from "aos";

interface Props {
  ahadith: typeof ahadithData;
}

export default function AhadithList({ ahadith }: Props) {
  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
      once: true,
    });
  }, []);

  return (
    <ul className="flex gap-8 flex-wrap w-full justify-center items-center p-8">
      {ahadith.map(({ name, id, available, arabic }) => (
        <Card
          data-aos="zoom-in"
          key={id}
          className="p-4 rounded-lg text-center w-48"
        >
          <Link
            href={`/ahadith/${id}`}
            className="link link-secondary transition decoration-transparent mb-2 text-xl"
          >
            {arabic}
          </Link>
          <small>English: {name}</small>
          <small>Available: {available}</small>
        </Card>
      ))}
    </ul>
  );
}
