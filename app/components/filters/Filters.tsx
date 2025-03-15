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
    <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-2 mb-8">
      {/* left col */}
      <div className="flex flex-col gap-3 sm:gap-4 w-full md:w-1/2 lg:w-[30%]">
        {/* search bar */}
        <div className="flex flex-col gap-2 w-80">
          <label className="text-white font-poppins">Search</label>
          <input
            type="text"
            placeholder="Search Movies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="rounded-full w-full border-atlasTeal border-2 bg-accentBlue text-white px-4 py-2"
          />
        </div>

        {/* min and max year */}
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          <div className="flex flex-col gap-2 ">
            <label className="text-white font-poppins">Min Year</label>
            <input
              type="number"
              value={minYear ?? ""}
              onChange={(e) =>
                onMinYearChange(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="rounded-full border-atlasTeal border-2 bg-accentBlue text-white px-4 py-2 w-36"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white font-poppins">Max Year</label>
            <input
              type="number"
              value={maxYear ?? ""}
              onChange={(e) =>
                onMaxYearChange(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="rounded-full border-atlasTeal border-2 bg-accentBlue text-white px-4 py-2 w-36"
            />
          </div>
        </div>
      </div>

      {/* right col */}
      <div className="flex flex-col gap-2 w-full sm:w-1/2 md:w-[45%]">
        <label className="text-white font-poppins">Genres</label>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreToggle(genre)}
              className={`flex items-center justify-center font-poppins text-xs sm:text-base px-2 sm:px-4 py-2 rounded-full border-2 transition duration-200 min-w-[70px] whitespace-nowrap ${
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
