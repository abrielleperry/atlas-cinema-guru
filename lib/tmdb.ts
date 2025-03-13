const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const fetchPosterUrl = async (title: string) => {
  if (!TMDB_API_KEY) {
    console.error("TMDB_API_KEY is missing!");
    return "https://via.placeholder.com/300x450?text=No+Poster";
  }

  const apiUrl = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(
    title
  )}&api_key=${TMDB_API_KEY}`;

  try {
    const res = await fetch(apiUrl);

    console.log("TMDb API URL:", apiUrl);
    console.log("TMDb Response Status:", res.status, res.statusText);

    if (!res.ok) {
      console.error("TMDb API Error:", res.status, res.statusText);
      return "https://via.placeholder.com/300x450?text=No+Poster";
    }

    const data = await res.json();
    console.log("TMDb Response JSON:", data);

    if (data.results && data.results.length > 0) {
      const posterPath = data.results[0].poster_path;

      if (posterPath) {
        const fullPosterUrl = `${TMDB_IMAGE_BASE_URL}${posterPath}`;
        console.log("Poster Found:", fullPosterUrl);
        return fullPosterUrl;
      }
    }

    return "https://via.placeholder.com/300x450?text=No+Poster";
  } catch (error) {
    console.error("Error fetching poster:", error);
    return "https://via.placeholder.com/300x450?text=No+Poster";
  }
};
