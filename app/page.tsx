"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import MovieList from "app/components/movies/MovieList";

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
