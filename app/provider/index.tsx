import React from "react";
import SettingsProvider from "./SettingsProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}
