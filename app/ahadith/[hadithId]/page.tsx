"use client";
import Container from "@/app/components/Container";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback, lazy } from "react";

const Loader = lazy(() => import("@/app/components/Loader"));

const Card = dynamic(() => import("@/app/components/ui/Card"), {
  loading: () => <Loader />,
});
const HadithModel = dynamic(
  () => import("@/app/ahadith/[hadithId]/models/HadithModel"), {
    loading: () => <Loader />,
  }
);

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

const maxHadith = 300;

export default function Hadith() {
  const { hadithId } = useParams() as { hadithId: string };
  const [hadith, setHadith] = useState<IHadith>({} as IHadith);
  const [count, setCount] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  const [hadithTarget, setHadithTarget] = useState<
    IHadith["hadiths"][0] | null
  >(null);

  const loadMore = useCallback(async () => {
    if (count >= maxHadith) return;
    setCount((prevCount) => prevCount + 10);
  }, [count]);

  const showHadithModal = useCallback((hadithInfo: IHadithInfo) => {
    const dialog = document.getElementById("hadith_model") as HTMLDialogElement;
    dialog.showModal();
    setHadithTarget(hadithInfo);
  }, []);

  useEffect(() => {
    if (!hadithId || count >= maxHadith) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_AHADith_API}/${hadithId}?range=1-${count}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setHadith(data);
      })
      .catch((err) => {
        console.error(err);
        setHadith({ hadiths: [] } as IHadith);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [count, hadithId]);

  if (!hadith.hadiths?.length) return <Loader />;

  return (
    <Container
      className="prose flex flex-col items-center justify-center"
      isRtl={true}
    >
      <h1 className="capitalize tracking-widest">{hadith.name}</h1>

      <div>
        <span className="text-xl font-bold">{maxHadith}</span>
        <span className="text-xl"> / </span>
        <span className="text-xl">{count}</span>
      </div>

      <ul className="columns-xs xxl:columns-md">
        {hadith.hadiths?.map(({ arab, id, number }, i) => (
          <Card
            key={id}
            className="m-4 overflow-auto cursor-pointer select-none"
            onClick={() => showHadithModal({ arab, id, number })}
          >
            <span className="text-xl font-bold">{i + 1}</span>
            <p className="text-lg leading-8">{arab}</p>
          </Card>
        ))}
      </ul>

      <HadithModel {...hadithTarget} />

      {count < maxHadith && (
        <button className="btn btn-accent" onClick={loadMore}>
          {loading ? <span className="loading"></span> : "تحميل المزيد"}
        </button>
      )}
    </Container>
  );
}
