import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Card from "./components/ui/Card";
import Container from "./components/Container";

export default function Home() {
  return (
    <Container
      isRtl={true}
      className="h-screen flex items-center justify-center flex-col sm:flex-row gap-8"
    >
      <Link href="/surahs" className={twMerge("decoration-transparent")}>
        <Card className="flex items-center justify-center p-8 w-48">
          <h3 className="text-2xl">سور قرأنيه</h3>
        </Card>
      </Link>
      <Link href="/ahadith" className={twMerge("decoration-transparent")}>
        <Card className="flex items-center justify-center p-8 w-48">
          <h3 className="text-2xl">أحاديث نبويه</h3>
        </Card>
      </Link>
    </Container>
  );
}
