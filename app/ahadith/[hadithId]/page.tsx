"use client";
import Container from "@/app/components/Container";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback, lazy } from "react";
import hadithData from "@/app/data/hadith.json";
import Card from "@/app/components/ui/Card";
import Loader from "@/app/components/Loader";
import HadithModel from "@/app/ahadith/[hadithId]/models/HadithModel";

export interface IHadithInfo {
  number: number;
  arab: string;
  id: string;
}

export interface IHadith {
  name: string;
  id: string;
  available: number;
  requested: number;
  hadiths: IHadithInfo[];
}

export default function Hadith() {
  const { hadithId } = useParams() as { hadithId: string };
  const [hadith, setHadith] = useState<IHadith>({} as IHadith);
  const [count, setCount] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(false);
  const [hadithTarget, setHadithTarget] = useState<
    IHadith["hadiths"][0] | null
  >(null);

  const loadMore = useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    if (count >= hadith.requested) return;
    setCount((prevCount) => prevCount + 10);
  }, [count, hadith.requested]);

  const showHadithModal = useCallback((hadithInfo: IHadithInfo) => {
    const dialog = document.getElementById("hadith_model") as HTMLDialogElement;
    dialog.showModal();
    setHadithTarget(hadithInfo);
  }, []);

  useEffect(() => {
    const hadith: IHadith = (hadithData as IHadith[]).find(
      (hadith: IHadith) => hadith.id === hadithId
    );
    if (hadith) setHadith(hadith);
  }, [hadithId]);

  if (!hadith.hadiths?.length) return <Loader />;

  return (
    <Container
      className="prose flex flex-col items-center justify-center"
      isRtl={true}
    >
      <h1 className="capitalize tracking-widest">{hadith.name}</h1>

      <div>
        <span className="text-xl font-bold">{hadith.requested}</span>
        <span className="text-xl"> / </span>
        <span className="text-xl">{count}</span>
      </div>

      <ul className="columns-xs xxl:columns-lg">
        {hadith.hadiths?.slice(0, count).map(({ arab, id, number }) => (
          <Card
            key={id}
            className="m-4 overflow-auto cursor-pointer select-none"
            onClick={() => showHadithModal({ arab, id, number })}
          >
            <span className="text-xl font-bold">{number}</span>
            <p className="text-lg leading-8">{arab}</p>
          </Card>
        ))}
      </ul>

      <HadithModel {...hadithTarget} />

      {count < hadith.requested && (
        <button className="btn btn-accent" onClick={loadMore}>
          {loading ? <span className="loading"></span> : "تحميل المزيد"}
        </button>
      )}
    </Container>
  );
}
