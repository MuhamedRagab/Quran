"use client";
import React, { useState } from "react";

export default function ScrollYProgress() {
  const [scrollYProgress, setScrollYProgress] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      const scrollYProgress = parseFloat(scroll) * 100;
      setScrollYProgress(scrollYProgress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="progress progress-primary fixed top-0 left-0 w-screen z-50 h-1">
      <div
        className="bg-cyan-500 h-full"
        style={{ width: `${scrollYProgress}%` }}
      ></div>
    </div>
  );
}
