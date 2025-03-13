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
    <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-12 mb-8">
      {/* left col */}
      <div className="flex flex-col gap-6 w-full md:w-1/2 lg:w-[40%]">
        {/* search bar */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-neulis">Search</label>
          <input
            type="text"
            placeholder="Search Movies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="rounded-full w-full border-atlasTeal border-2 bg-navyBlue text-white px-4 py-2"
          />
        </div>

        {/* min and max year */}
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-white font-neulis">Min Year</label>
            <input
              type="number"
              placeholder="e.g. 2000"
              value={minYear ?? ""}
              onChange={(e) =>
                onMinYearChange(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="rounded-full border-atlasTeal border-2 bg-navyBlue text-white px-4 py-2 w-[120px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white font-neulis">Max Year</label>
            <input
              type="number"
              placeholder="e.g. 2023"
              value={maxYear ?? ""}
              onChange={(e) =>
                onMaxYearChange(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="rounded-full border-atlasTeal border-2 bg-navyBlue text-white px-4 py-2 w-[120px]"
            />
          </div>
        </div>
      </div>

      {/* right col */}
      <div className="flex flex-col gap-4 w-full sm:w-1/2 md:w-[35%]">
        <label className="text-white font-neulis">Genres</label>
        <div className="flex flex-wrap gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreToggle(genre)}
              className={`font-neulis px-4 py-2 rounded-full border-2 transition duration-200 ${
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
