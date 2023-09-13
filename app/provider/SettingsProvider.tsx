"use client";
import React, { createContext, useEffect } from "react";
import { useImmer } from "use-immer";

interface Settings {
  audioSpeed: {
    value: number;
    min: number;
    max: number;
    step: number;
  };
  [key: string]: any;
}

interface SettingsContext {
  settings: Settings;
  updateSettings: (fn: (draft: Settings) => void) => void;
}

export const initSettings: Settings = {
  audioSpeed: {
    value: 1,
    min: 0.5,
    max: 2,
    step: 0.25,
  },
};

export const SettingsContext = createContext<SettingsContext>({
  settings: initSettings,
  updateSettings: () => {},
});

export default function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, updateSettings] = useImmer<Settings>(
    JSON.parse(localStorage.getItem("settings")) || initSettings
  );

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
