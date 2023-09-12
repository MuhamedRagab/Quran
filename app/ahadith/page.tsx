"use client";
import { useState } from "react";
import Container from "../components/Container";
import AhadithList from "./components/AhadithList";
import AhadithSearch from "./components/AhadithSearch";
import ahadithData from "@/app/data/ahadith.json";

export default function AhadithPage() {
  const [ahadith, setAhadith] = useState(ahadithData);

  return (
    <Container
      className="prose flex flex-col justify-center items-center"
      isRtl={true}
    >
      <h1>أحاديث نبويه</h1>
      <AhadithSearch setAhadith={setAhadith} />
      <AhadithList ahadith={ahadith} />
    </Container>
  );
}
