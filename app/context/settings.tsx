"use client";
import { useContext } from "react";
import { SettingsContext } from "@/app/provider/SettingsProvider";

export const useSettings = () => useContext(SettingsContext);
