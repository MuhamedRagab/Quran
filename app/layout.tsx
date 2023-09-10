import "./globals.css";
import type { Metadata } from "next";
import { Inter, Amiri_Quran } from "next/font/google";
import Navbar from "./components/layout/Navbar";
import ScrollYProgress from "./components/layout/ScrollYProgress";

export const amiri_quran = Amiri_Quran({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Quran App",
  description: "Quran App for listening and reading Quran",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={amiri_quran.className}>
        <ScrollYProgress />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
