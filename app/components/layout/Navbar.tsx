import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import logo from "@/app/assets/images/logo.png";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 py-4">
      <div className="flex-1">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="logo"
            className="rounded-lg object-contain object-center w-16 cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex-none gap-2">
        {/* <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div> */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="rounded-full">
              <FaUserCircle size={32} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
