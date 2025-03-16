"use client";

import Link from "next/link";
import { FaFolderClosed } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";

export default function MobileSidebar() {
  return (
    <div className="flex w-full justify-around items-start bg-atlasTeal py-4 font-poppins text-white sm:hidden">
      <Link href="/" className="flex flex-row gap-2 items-center space-y-1">
        <FaFolderClosed size={20} />
        <span className="text-sm">Home</span>
      </Link>

      <Link href="/favorites" className="flex flex-row gap-2 items-center space-y-1">
        <FaStar size={20} />
        <span className="text-sm">Favorites</span>
      </Link>

      <Link
        href="/watch-later"
        className="flex flex-row gap-2 items-center space-y-1"
      >
        <GoClockFill size={20} />
        <span className="text-sm">Watch Later</span>
      </Link>
    </div>
  );
}
