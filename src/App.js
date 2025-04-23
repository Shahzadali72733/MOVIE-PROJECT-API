import { useState } from 'react';
import useFetchMovies from './Api/AxiosApi';
import { Logo, NavBar, NumResults, Search } from './components/header';
import { useLocalStorageState } from './Hooks/useLocalStorageState';
import Loader from './components/loader';
import Box from './components/toggleReuseable';
import Main from './components/Main';
import MovieList from './components/movieListLeft'; 
import WatchedSummary from './components/movieSummary';
import WatchedMoviesList from './components/watchmovieList'
import MovieDetails from './components/movieDetail';
import Pagination from './components/pagination'
import Dropdown from './components/dropdown';

export default function App() {
const [query, setQuery] = useState('');
const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');
const [selectedId, setSelectedId] = useState(null);
const [isDetailsOpen, setIsDetailsOpen] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);
const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleSelectMovie(id) {
    setSelectedId((prevId) => (id === prevId ? null : id));
    setIsDetailsOpen(true);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie, newMovie) {
    const updated = [...watched, movie];
    setWatched(updated);
    localStorage.setItem('watched', JSON.stringify([...watched, newMovie]));
  }

  function handleDeleteWatched(id) {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleNext() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  function handlePrevious() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  useFetchMovies({
    query,
    currentPage,
    itemsPerPage,
    setMovies,
    setTotalPages,
    setIsLoading,
    setError,
  });

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <>
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
                <Dropdown
                  itemsPerPage={itemsPerPage}
                  onChangeItemsPerPage={(num) => {
                    setItemsPerPage(num);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </>
          )}
        </Box>

        <Box isOpen={isDetailsOpen} setIsOpen={setIsDetailsOpen}>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}