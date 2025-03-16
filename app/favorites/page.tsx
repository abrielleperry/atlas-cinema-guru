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

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const favoritesPerPage = 6;

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
        const res = await fetch(`/api/favorites?page=${currentPage}`);
        if (!res.ok) throw new Error("Failed to fetch favorites movies");

        const data = await res.json();
        const moviesPage = data.favorites;

        allMovies.push(...moviesPage);

        if (moviesPage.length < favoritesPerPage) {
          keepFetching = false;
        } else {
          currentPage++;
        }
      }
      setFavorites(allMovies);
    } catch (error) {
      console.error("Error fetching favorites movies:", error);
    }
  };

  const totalPages = Math.ceil(favorites.length / favoritesPerPage);

  const paginatedMovies = favorites.slice(
    (page - 1) * favoritesPerPage,
    page * favoritesPerPage
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
        Favorites
      </p>
      {paginatedMovies.length === 0 ? (
        <p className="text-white">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-3 gap-4">
          {paginatedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onUnfavorite={(id) => {
                setFavorites((prevFavorites) =>
                  prevFavorites.filter((favMovie) => favMovie.id !== id)
                );
              }}
            />
          ))}
        </div>
      )}
      {favorites.length > 0 && (
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
