"use client";

type FiltersProps = {
  searchTerm: string;
  minYear: number | null;
  maxYear: number | null;
  selectedGenres: string[];
  genres: string[];
  onSearchChange: (value: string) => void;
  onMinYearChange: (year: number | null) => void;
  onMaxYearChange: (year: number | null) => void;
  onGenreToggle: (genre: string) => void;
};

export default function Filters({
  searchTerm,
  minYear,
  maxYear,
  selectedGenres,
  genres,
  onSearchChange,
  onMinYearChange,
  onMaxYearChange,
  onGenreToggle,
}: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between pt-2 gap-2 mb-8">
      {/* Left Column */}
      <div className="flex flex-col gap-4 w-full sm:w-1/3 ">
        {/* Search Bar */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-white font-poppins">Search</label>
          <input
            type="text"
            placeholder="Search Movies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="rounded-full w-full border-atlasTeal border-2 bg-accentBlue text-white px-4 py-2"
          />
        </div>

        {/* Min and Max Year */}
        <div className="flex flex-wrap gap-4 w-full">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-white font-poppins">Min Year</label>
            <input
              type="number"
              value={minYear ?? ""}
              onChange={(e) =>
                onMinYearChange(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="rounded-full border-atlasTeal border-2 bg-accentBlue text-white px-4 py-2 w-full"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1 ">
            <label className="text-white font-poppins">Max Year</label>
            <input
              type="number"
              value={maxYear ?? ""}
              onChange={(e) =>
                onMaxYearChange(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="rounded-full border-atlasTeal border-2 bg-accentBlue text-white px-4 py-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col w-full sm:w-2/5">
        <label className="text-white font-poppins">Genres</label>
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {genres.slice(0, 5).map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreToggle(genre)}
              className={`px-1.5 py-2 font-poppins rounded-full text-xs sm:text-base sm:px-3 border-2 transition duration-200 whitespace-nowrap ${
                selectedGenres.includes(genre)
                  ? "bg-atlasTeal text-[#00003c] "
                  : "bg-navyBlue text-white border-atlasTeal"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="mt-2 space-x-0.5 sm:space-x-2">
          {genres.slice(5).map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreToggle(genre)}
              className={`px-1.5 py-2 font-poppins rounded-full text-xs sm:text-base sm:px-3 border-2 transition duration-200 whitespace-nowrap ${
                selectedGenres.includes(genre)
                  ? "bg-atlasTeal text-[#00003c]"
                  : "bg-navyBlue text-white border-atlasTeal"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
