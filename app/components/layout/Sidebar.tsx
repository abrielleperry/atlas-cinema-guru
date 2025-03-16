"use client";

import Link from "next/link";
import { FaFolderClosed } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import { useState, useEffect } from "react";
import ActivityFeed from "./ActivityFeed";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-atlasTeal h-full transition-all duration-300 p-5 ${
        isExpanded ? "w-[375px]" : "w-16"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`flex flex-col h-full font-poppins text-white  ${
          isExpanded ? "items-start pl-1" : "items-center"
        }`}
      >
        <div className="link py-4 w-full ">
          <Link href="/" className="flex items-center space-x-2">
            <FaFolderClosed size={20} />
            {isExpanded && <span>Home</span>}
          </Link>
        </div>
        <div className="link py-4 w-full">
          <Link href="/favorites" className="flex items-center space-x-2">
            <FaStar size={20} />
            {isExpanded && <span>Favorites</span>}
          </Link>
        </div>
        <div className="link py-4 w-full">
          <Link href="/watch-later" className="flex items-center space-x-2">
            <GoClockFill size={20} />
            {isExpanded && <span>Watch Later</span>}
          </Link>
        </div>

        {isExpanded && (
          <div>
            <ActivityFeed />
          </div>
        )}
      </div>
    </div>
  );
}
