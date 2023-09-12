import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Card from "./components/ui/Card";
import Container from "./components/Container";

export const HomeTextLink = ({
  text,
  href,
  className,
}: {
  text: string;
  href: string;
  className?: string;
}) => (
  <Link href={href} className={twMerge("decoration-transparent", className)}>
    <Card className="flex items-center justify-center p-8 w-48">
      <h3 className="text-2xl">{text}</h3>
    </Card>
  </Link>
);

export default function Home() {
  return (
    <Container
      isRtl={true}
      className="h-screen flex items-center justify-center flex-col sm:flex-row gap-8"
    >
      <HomeTextLink text="سور قرأنيه" href="/surahs" />
      <HomeTextLink text="أحاديث نبويه" href="/ahadith" />
    </Container>
  );
}
