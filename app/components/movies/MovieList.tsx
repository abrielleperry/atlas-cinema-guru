"use client";

import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import PaginationButtons from "./Pagination";
import Filters from "../filters/Filters";

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

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const moviesPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allMovies = [];
        let currentPage = 1;
        let keepFetching = true;

        while (keepFetching) {
          const res = await fetch(`/api/titles?page=${currentPage}`);
          if (!res.ok) throw new Error("Failed to fetch movies");

          const data = await res.json();
          const moviesPage = data.title;

          allMovies.push(...moviesPage);
          if (moviesPage.length < moviesPerPage) keepFetching = false;
          else currentPage++;
        }

        setMovies(allMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const searchMatch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const minYearMatch = minYear !== null ? movie.released >= minYear : true;
    const maxYearMatch = maxYear !== null ? movie.released <= maxYear : true;

    const genreMatch =
      selectedGenres.length > 0 ? selectedGenres.includes(movie.genre) : true;

    return searchMatch && minYearMatch && maxYearMatch && genreMatch;
  });

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const paginatedMovies = filteredMovies.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleMinYearChange = (year: number | null) => {
    setMinYear(year);
    setPage(1);
  };

  const handleMaxYearChange = (year: number | null) => {
    setMaxYear(year);
    setPage(1);
  };

  const handleGenreToggle = (genre: string) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(updatedGenres);
    setPage(1);
  };

  return (
    <div className="max-w-screen-8xl mx-auto px-4">
      <Filters
        genres={[...new Set(movies.map((m) => m.genre))]}
        searchTerm={searchTerm}
        minYear={minYear}
        maxYear={maxYear}
        selectedGenres={selectedGenres}
        onSearchChange={handleSearchChange}
        onMinYearChange={handleMinYearChange}
        onMaxYearChange={handleMaxYearChange}
        onGenreToggle={handleGenreToggle}
      />

      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-3 gap-4">
        {paginatedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <PaginationButtons
        page={page}
        totalPages={totalPages}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </div>
  );
}
