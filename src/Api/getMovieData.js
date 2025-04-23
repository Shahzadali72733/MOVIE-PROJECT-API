import axios from "axios";

const API_KEY = "27e2797c";

export async function fetchMoviesFromAPI(searchTerm, currentPage = 1, itemsPerPage = 10) {
  const pagesToFetch = Math.ceil(itemsPerPage / 10);
  const startPage = currentPage;
  
  try {
    const promises = Array.from({ length: pagesToFetch }, (_, i) =>
      axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: API_KEY,
          s: searchTerm,
          page: startPage + i,
        },
      })
    );

    const responses = await Promise.all(promises);
    const results = responses.map((res) => res.data);

    const allMovies = results
    .filter((r) => r.Response !== "False")
    .flatMap((r) => r.Search || []);

    const totalResults = Number(results[0]?.totalResults || 0);

    return {
      movies: allMovies,
      totalResults,
    };
  } catch (err) {
    throw new Error("Failed to fetch movies from OMDb.");
  }
}
