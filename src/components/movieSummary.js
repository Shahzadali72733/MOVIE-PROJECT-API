    const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
    
    function WatchedSummary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const totalRuntime = watched
      .filter((movie) => typeof movie.runtime === "number" && !isNaN(movie.runtime))
      .reduce((acc, movie) => acc + movie.runtime, 0);
    
      return (
        <div className="summary">
          <h2>Movies you watched</h2>
          <div>
            <p>
              <span>📃</span>
              <span>{watched.length} movies</span>
            </p>
            <p>
              <span>⭐️</span>
              <span>{avgImdbRating.toFixed(2)}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{avgUserRating.toFixed(2)}</span>
            </p>
            <p>
              <span>🕑</span>
              <span>{totalRuntime} Total Runtime</span>
            </p>
          </div>
        </div>
      );
    }
    export default  WatchedSummary;