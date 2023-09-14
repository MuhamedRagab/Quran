"use client";
import React, { createContext, useEffect } from "react";
import { useImmer } from "use-immer";
import { Settings, initSettings } from "../utils/settings";

interface SettingsContext {
  settings: Settings;
  updateSettings: (fn: (draft: Settings) => void) => void;
}

export const SettingsContext = createContext<SettingsContext>({
  settings: initSettings,
  updateSettings: () => {},
});

export default function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, updateSettings] = useImmer<Settings>(initSettings);

  useEffect(() => {
    const localSettings = localStorage.getItem("settings");
    if (localSettings) {
      updateSettings((draft) => {
        Object.assign(draft, JSON.parse(localSettings));
      });
    }
  }, [updateSettings]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
    document.documentElement.setAttribute("data-theme", settings.theme);
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
