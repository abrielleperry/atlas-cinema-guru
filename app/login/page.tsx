"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Filters from "../components/filters/Filters";
import MovieList from "../components/movies/MovieList"

export default function Page() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);



  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);



  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleMinYearChange = (year: number | null) => {
    setMinYear(year);
  };

  const handleMaxYearChange = (year: number | null) => {
    setMaxYear(year);
  };

  const handleGenreToggle = (genre: string) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(updatedGenres);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <div className="">
    <Filters     genres={[]}
        searchTerm={searchTerm}
        minYear={minYear}
        maxYear={maxYear}
        selectedGenres={selectedGenres}
        onSearchChange={handleSearchChange}
        onMinYearChange={handleMinYearChange}
        onMaxYearChange={handleMaxYearChange}
        onGenreToggle={handleGenreToggle}/>
    <MovieList />
  </div>;
}
