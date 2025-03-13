"use client";

import { useState, useEffect } from "react";
import posters from "@/data/posters.json";
import { FaRegStar, FaStar, FaRegClock, FaClock } from "react-icons/fa6";

type Movie = {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  favorited?: boolean;
  watchLater?: boolean;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const [isFavorite, setIsFavorite] = useState(movie.favorited ?? false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [hover, setHover] = useState(false);

  const posterMatch = posters.find(
    (p) => p.title.toLowerCase().trim() === movie.title.toLowerCase().trim()
  );

  const posterUrl =
    posterMatch?.posterUrl ||
    "https://via.placeholder.com/300x450?text=No+Poster";

  const toggleFavorite = async () => {
    try {
      if (!isFavorite) {
        const res = await fetch(`/api/favorites/${movie.id}`, {
          method: "POST",
        });
        if (!res.ok) throw new Error("Failed to add to users favorites");
        setIsFavorite(true);
      } else {
        const res = await fetch(`/api/favorites/${movie.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to remove from users favorites");
        setIsFavorite(false);
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
        if (!res.ok) throw new Error("Failed to add to users watch later");
        setIsWatchLater(true);
      } else {
        const res = await fetch(`/api/watch-later/${movie.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to remove from users watch later");
        setIsWatchLater(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="relative w-[400px] h-[400px] border-[2.5px] border-atlasTeal rounded-xl overflow-hidden shadow-lg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* movie image */}
      <img
        src={posterUrl || "https://via.placeholder.com/300x450?text=No+Poster"}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
      />
      {/* movie info when hovered */}
      {hover && (
        /* favorite and watch later icons */
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
        className={`font-neulis absolute bottom-0 left-0 w-full bg-navyBlue text-white p-4 transition-all duration-300 ${
          hover ? "h-[150px] opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col overflow-hidden ">
          <div className="flex flex-row gap-2">
            <p className="text-xl">{movie.title}</p>
            <p className="text-lg">({movie.released})</p>
          </div>
          <div>
            <p className="text-sm my-2">{movie.synopsis}</p>
          </div>
          <div className="w-1/4 p-2 bg-atlasTeal rounded-full ">
            <p className="text-sm text-center">{movie.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
