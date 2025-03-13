"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import MovieCard from "../components/movies/MovieCard";
import PaginationButtons from "../components/movies/Pagination";

type Movie = {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  favorited?: boolean;
  watchLater?: boolean;
  image?: string;
};

export default function WatchLaterPage() {
  const { data: session, status } = useSession();
  const [watchLaters, setWatchLaters] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const watchLatersPerPage = 6;

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
    if (status === "authenticated") {
      fetchMovies();
    }
  }, [status]);

  const fetchMovies = async () => {
    try {
      const allMovies: Movie[] = [];
      let currentPage = 1;
      let keepFetching = true;

      while (keepFetching) {
        const res = await fetch(`/api/watch-later?page=${currentPage}`);
        if (!res.ok) throw new Error("Failed to fetch watch later movies");

        const data = await res.json();
        const moviesPage = data.watchLater;

        allMovies.push(...moviesPage);

        if (moviesPage.length < watchLatersPerPage) {
          keepFetching = false;
        } else {
          currentPage++;
        }
      }
      setWatchLaters(allMovies);
    } catch (error) {
      console.error("Error fetching watch later movies:", error);
    }
  };

  const totalPages = Math.ceil(watchLaters.length / watchLatersPerPage);

  const paginatedMovies = watchLaters.slice(
    (page - 1) * watchLatersPerPage,
    page * watchLatersPerPage
  );

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col text-center p-4">
      <p className="text-5xl font-bold font-poppins text-white pb-4">
        Watch Later
      </p>
      {paginatedMovies.length === 0 ? (
        <p className="text-white">
          You haven't added any movies to watch later yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginatedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onUnwatchLater={(id) => {
                setWatchLaters((prevWatchLaters) =>
                  prevWatchLaters.filter(
                    (watchLaterMovie) => watchLaterMovie.id !== id
                  )
                );
              }}
            />
          ))}
        </div>
      )}
      {watchLaters.length > 0 && (
        <PaginationButtons
          page={page}
          totalPages={totalPages}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      )}
    </div>
  );
}
