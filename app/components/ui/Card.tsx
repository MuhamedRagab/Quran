import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  children: React.ReactNode;
  [x: string]: any;
}

export default function Card({ className, children, ...props }: Props) {
  return (
    <div
      className={twMerge(
        "border border-slate-700 p-4 card hover:bg-slate-700 hover:text-slate-200 duration-300 w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
