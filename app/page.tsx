"use client";

import { useSession, signIn } from "next-auth/react";
import { use, useEffect } from "react";
import MovieList from "./components/movies/MovieList";
import MovieCard from "./components/movies/MovieCard";

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

  return (
    <div className="">
      <MovieList />
    </div>
  );
}
