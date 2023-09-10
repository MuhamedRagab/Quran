import "./globals.css";
import type { Metadata } from "next";
import { Amiri_Quran } from "next/font/google";
import Navbar from "./components/layout/Navbar";
import ScrollYProgress from "./components/layout/ScrollYProgress";

export const amiri_quran = Amiri_Quran({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Quran App",
  icons: [
    {
      href: "/favicon.ico",
      sizes: "32x32",
      type: "image/png",
      url: "/favicon.ico",
    },
  ],
  authors: [
    {
      name: "Mohamed Ragab",
      url: "https://quran-mr.vercel.app",
    },
  ],
  applicationName: "Quran App",
  keywords: ["Quran", "Quran App", "Quran App for listening and reading Quran"],
  creator: "Mohamed Ragab",
  description: "Quran App for listening and reading Quran",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={amiri_quran.className}>
        <ScrollYProgress />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
