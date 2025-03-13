import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";



const movies = [
  "Eclipse of Fate",
  "Stardust Road",
  "Galactic Outlaws",
  "Beyond the Mist",
  "Cursed Crown",
  "Last Summer's Promise",
  "Code Breaker",
  "Whispering Pines",
  "Parallel Hearts",
  "The Alchemist's Apprentice",
  "Silent Serenade",
  "Quantum Descent",
  "Fragments of Hope",
  "Midnight Call",
  "Beneath the Surface",
  "Wanderlust",
  "Shadow of the Pharaoh",
  "Digital Ghosts",
  "Harbor Lights",
  "Beyond the Veil",
  "Threads of Destiny",
  "Vortex",
  "Phoenix Rising",
  "Ghosts of Eden",
  "Forgotten Fields",
  "The Silent Storm",
  "The Mechanic's Son",
  "Aurora's Light",
  "Gravity's Edge",
  "Windswept",
  "Crimson Lotus",
  "Lost in Lisbon",
  "Frostbite",
  "City of Dreams",
  "Operation Nightfall",
  "The Mirage",
  "Distant Shores",
  "Echo Chamber",
  "The Wild Ones",
  "Harmonic Convergence",
  "The Oracle's Gift",
  "Hidden in the Shadows",
  "Severed Ties",
  "Broken Silence",
  "The Last Paradiso",
  "The Architect",
  "Ghostwriter",
  "Midnight Masquerade",
  "The Enigma Code",
  "Starship Exodus",
  "The Perfect Illusion",
  "Summer of '88",
  "The Last Run",
  "Before the Dawn",
  "Falling Stars",
  "Night Shift",
  "Dawn of Legends",
  "Breach Protocol",
  "The Last Frontier",
  "Shattered Reflections",
  "Veil of Deception",
  "Steel and Stone",
  "After the Rain",
  "Uncharted Waters",
  "The Revenant Code",
  "The Carnival of Shadows",
  "Serpent's Kiss",
  "The Harbinger",
  "The Sapphire Key",
  "Rising Storm",
  "Whispers in the Dark",
  "Echo Valley",
  "The Icebound Conspiracy",
  "Dark Horizons",
  "Tales of the Forgotten",
  "Flicker",
];

const fetchPosterUrl = async (title: string) => {
  const apiUrl = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(
    title
  )}&api_key=${TMDB_API_KEY}`;

  console.log(`Fetching poster for: "${title}"`);

  try {
    const res = await fetch(apiUrl);
    console.log(`Status for "${title}": ${res.status}`);

    if (!res.ok) {
      console.error(`Error fetching "${title}": ${res.statusText}`);
      return "https://via.placeholder.com/300x450?text=No+Poster";
    }

    const data = await res.json();
    console.log(`Response for "${title}":`, JSON.stringify(data, null, 2));

    if (data.results && data.results.length > 0) {
      const posterPath = data.results[0].poster_path;
      if (posterPath) {
        const fullPosterUrl = `${TMDB_IMAGE_BASE_URL}${posterPath}`;
        console.log(`Found poster for "${title}": ${fullPosterUrl}`);
        return fullPosterUrl;
      } else {
        console.warn(`No poster path for "${title}"`);
      }
    } else {
      console.warn(`No results for "${title}"`);
    }
  } catch (error) {
    console.error(`Fetch failed for "${title}":`, error);
  }

  return "https://via.placeholder.com/300x450?text=No+Poster";
};

const run = async () => {
  const posterData = [];

  for (const title of movies) {
    const posterUrl = await fetchPosterUrl(title);
    posterData.push({ title, posterUrl });
  }

  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }

  fs.writeFileSync("data/posters.json", JSON.stringify(posterData, null, 2));
  console.log("Posters saved to data/posters.json");
};

run();
