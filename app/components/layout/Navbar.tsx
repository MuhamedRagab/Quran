"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import logo from "@/app/assets/images/logo.jpg";
import { usePathname } from "next/navigation";
import ScrollYProgress from "./ScrollYProgress";
import Drawer from "../ui/Drawer";
import InputRange from "../ui/InputRange";
import { useSettings } from "@/app/context/settings";
import { FiSettings } from "react-icons/fi";

export default function Navbar() {
  const { settings, updateSettings } = useSettings();
  const drawerToggleRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <nav className="navbar bg-base-100 py-4">
      <ScrollYProgress />
      <div className="flex-1">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="logo"
            className="rounded-lg object-contain object-center w-10 h-10 cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="rounded-full">
              <FaUserCircle size={32} />
            </div>
          </label>
          <Drawer drawerToggleRef={drawerToggleRef}>
            <InputRange
              label="سرعة الصوت"
              className="range-xs"
              min={settings.audioSpeed.min}
              max={settings.audioSpeed.max}
              value={settings.audioSpeed.value}
              step={settings.audioSpeed.step}
              onChange={(e) => {
                updateSettings((draft) => {
                  draft.audioSpeed.value = Number(e.target.value);
                });
              }}
            />
          </Drawer>
          <ul
            className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            dir="rtl"
          >
            <li>
              <button
                className="flex justify-between items-center p-2"
                onClick={() => drawerToggleRef.current?.click()}
              >
                <span>الإعدادات</span>
                <FiSettings size={16} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
