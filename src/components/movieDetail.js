import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import Loader from "./loader";


const KEY = "27e2797c";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");
  
    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(
      (movie) => movie.imdbID === selectedId
    )?.userRating;
  
    const {
      Title: title,
      Year: year,
      Poster: poster,
      Runtime: runtime,
      imdbRating,
      Plot: plot,
      Released: released,
      Actors: actors,
      Director: director,
      Genre: genre,
    } = movie;
  
    function handleAdd() {
      const newWatchedMovie = {
        imdbID: selectedId,
        title,
        year,
        poster,
        imdbRating: Number(imdbRating),
        runtime: Number(runtime.split(" ").at(0)),
        userRating,
      };
  
      onAddWatched(newWatchedMovie);
      onCloseMovie();
    }
  
    useEffect(() => {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovie(data);
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    }, [selectedId]);
    
    useEffect(
      function () {
        if (!title) return;
        document.title = `Movie | ${title}`;
  
        return function () {
          document.title = "usePopcorn";
        };
      },
      [title]
    );
  
    return (
      <div className="details">
        {isLoading ? (
          <Loader />
         
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${movie} movie`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span>
                  {imdbRating} IMDb rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setUserRating}
                    />
                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        Add to Favorite List
                      </button>
                    )}
                  </>
                ) : (
                  <p>
                    You rated with movie {watchedUserRating} <span>⭐️</span>
                  </p>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    );
  }
  export default MovieDetails;