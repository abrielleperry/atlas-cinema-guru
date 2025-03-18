"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import MovieList from "app/components/movies/MovieList";
import Loader from "./components/icons/Loader";

export default function Page() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="">
      <MovieList />
    </div>
  );
}
