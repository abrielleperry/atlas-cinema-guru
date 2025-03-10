"use client";

import Link from "next/link";
import { FaFolderClosed } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import { useState } from "react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-[#54F4D0] h-full fixed top-0 left-0 transition-all duration-300 p-4 ${
        isExpanded ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`flex flex-col h-full font-neulis text-white ${
          isExpanded ? "items-start pl-4" : "items-center"
        }`}
      >
        <div className="link py-4 w-full">
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
          <div className="mt-6 w-full text-navyBlue">
            <h3 className="font-bold mb-2">Latest Activities</h3>
            <ul className="text-sm space-y-1">
              <li>Activity 1</li>
              <li>Activity 2</li>
              <li>Activity 3</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
