import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  isRtl?: boolean;
  className?: string;
}

export default function Container({ children, className, isRtl }: Props) {
  return (
    <main
      className={twMerge(
        "container mx-auto p-2 sm:p-4",
        "max-w-full",
        className
      )}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {children}
    </main>
  );
}
