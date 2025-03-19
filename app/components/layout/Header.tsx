"use client";

import { signOut, useSession } from "next-auth/react";
import FilmIcon from "../icons/FilmIcon";
import LogOutIcon from "../icons/LogOutIcon";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-accentTeal">
      <div className="flex items-center space-x-2">
        <FilmIcon />
        <span className="text-xl font-poppins font-bold text-navyBlue">
          Cinema Guru
        </span>
      </div>
      <div className="hidden sm:flex items-center space-x-4">
        {session?.user?.email && (
          <span className="text-sm font-poppins text-navyBlue">
            Welcome, {session.user.email}
          </span>
        )}
        <button
          onClick={() => signOut()}
          className="flex items-center rounded-lg space-x-2 text-navyBlue text-sm font-poppins py-2 px-4 hover:bg-navyBlue hover:text-white transition"
        >
          <LogOutIcon />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
