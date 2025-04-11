import "../css/Library.css";
import { useMovieContext } from "../contexts/MovieContext/MovieProvider";
import MovieCard from "../components/MovieCard";

function Library() {
  const { library } = useMovieContext();

  if (library && library.length) {
    console.log(library);
    return (
      <div className="library">
        <h2>Your Library</h2>
        <div className="movies-grid">
          {library.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="library-empty">
      <h2>No movies in your library yet</h2>
      <p>Start adding movies to your library and they will appear here!</p>
    </div>
  );
}

export default Library;
