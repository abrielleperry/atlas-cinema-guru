"use client";

import { useSession, signIn } from "next-auth/react";
import { use, useEffect } from "react";
import { Filters } from "/components/filters/Filters"
import { MovieList } from "/components/movies/MovieList"

export default function Page() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <div className="">
    <Filters/>
    <MovieList />
  </div>;
}
