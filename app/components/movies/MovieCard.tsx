"use client";

import { useState, useEffect } from "react";
import { FaRegStar, FaStar, FaRegClock, FaClock } from "react-icons/fa6";

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

type MovieCardProps = {
  movie: Movie;
  onUnfavorite?: (id: string) => void;
  onUnwatchLater?: (id: string) => void;
};

export default function MovieCard({
  movie,
  onUnfavorite,
  onUnwatchLater,
}: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(movie.favorited ?? false);
  const [isWatchLater, setIsWatchLater] = useState(movie.watchLater ?? false);
  const [hover, setHover] = useState(false);

  const movieImage = movie.image ? movie.image : `/image/${movie.id}.webp`;

  const toggleFavorite = async () => {
    try {
      if (!isFavorite) {
        const res = await fetch(`/api/favorites/${movie.id}`, {
          method: "POST",
        });
        if (!res.ok) throw new Error("Failed to add to favorites");
        setIsFavorite(true);
      } else {
        const res = await fetch(`/api/favorites/${movie.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to remove from favorites");

        setIsFavorite(false);

        if (onUnfavorite) {
          onUnfavorite(movie.id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleWatchLater = async () => {
    try {
      if (!isWatchLater) {
        const res = await fetch(`/api/watch-later/${movie.id}`, {
          method: "POST",
        });
        if (!res.ok) throw new Error("Failed to add movie to watch later");
        setIsWatchLater(true);
      } else {
        const res = await fetch(`/api/watch-later/${movie.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to remove movie from watch later");

        setIsWatchLater(false);

        if (onUnwatchLater) {
          onUnwatchLater(movie.id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="relative w-full max-w-[400px] aspect-square border-[2.5px] border-atlasTeal rounded-xl overflow-hidden shadow-lg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* movie image */}
      <img
        src={movieImage || "https://via.placeholder.com/300x450?text=No+Poster"}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
      />
      {/* movie info hovered */}
      {hover && (
        /* fav and watch later icons */
        <div className="absolute top-2 right-2 flex gap-2 transition-opacity duration-300 ">
          <button onClick={toggleFavorite} className="text-white">
            {isFavorite ? <FaStar /> : <FaRegStar />}
          </button>

          <button onClick={toggleWatchLater} className="text-white">
            {isWatchLater ? <FaClock /> : <FaRegClock />}
          </button>
        </div>
      )}
      {/* title, sypnosis, released, genre */}
      <div
        className={`font-poppins text-left absolute bottom-0 left-0 w-full bg-accentBlue text-white p-4 transition-all duration-300 ${
          hover ? "max-h-[170px] opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col overflow-hidden ">
          <div className="flex flex-row gap-2">
            <p className="text-xl">{movie.title}</p>
            <p className="text-lg">({movie.released})</p>
          </div>
          <div className="flex-row">
            <p className="text-sm my-2">{movie.synopsis}</p>
          </div>
          <div className="flex-row max-w-28 p-2 text-center bg-atlasTeal rounded-full ">
            <p className="">{movie.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
