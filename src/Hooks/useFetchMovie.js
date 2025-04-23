import { useEffect } from "react";

const API_KEY = "27e2797c"; 
export function useFetchMovies({ query, currentPage, itemsPerPage , setMovies, setTotalPages, setIsLoading, setError, }) 
{
  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const searchTerm = query.length >= 3 ? query : "mere";
        const pagesToFetch = Math.ceil(itemsPerPage / 10);

        const fetchPromises = Array.from({ length: pagesToFetch }, (_, i) =>
          fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${i + 1}`
          ).then((res) => res.json())
        );

        const results = await Promise.all(fetchPromises);

        const allMovies = results
          .filter((r) => r.Response !== "False")
          .flatMap((r) => r.Search);

        setMovies(allMovies.slice(0, itemsPerPage));

        const totalResults = Number(results[0]?.totalResults || 0);
        setTotalPages(Math.ceil(totalResults / itemsPerPage));
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query, currentPage, itemsPerPage]);
}
