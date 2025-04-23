import { useEffect, useRef } from "react";
import { fetchMoviesFromAPI } from "./getMovieData";

function useFetchMovies({
  query,
  currentPage,
  itemsPerPage,
  setMovies,
  setTotalPages,
  setIsLoading,
  setError,
}) 
{
  const cache = useRef({});

  useEffect(() => {
    async function fetchMovies() {
      const searchTerm = query.length >= 3 ? query : "money";
      const cacheKey = `${searchTerm}-${currentPage}-${itemsPerPage}`;

      if (cache.current[cacheKey]) {
        const cached = cache.current[cacheKey];
        setMovies(cached.movies);
        setTotalPages(cached.totalPages);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const { movies, totalResults } = await fetchMoviesFromAPI(searchTerm, currentPage, itemsPerPage);

        const totalPagesCalc = Math.ceil(totalResults / itemsPerPage);
        const slicedMovies = movies.slice(0, itemsPerPage); 
        setMovies(slicedMovies);
        setTotalPages(totalPagesCalc);

        cache.current[cacheKey] = {
          movies: slicedMovies,
          totalPages: totalPagesCalc,
        };
      } catch (err) {
        setError(err.message || "Failed to fetch movies.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query, currentPage, itemsPerPage]);
}

export default useFetchMovies;
