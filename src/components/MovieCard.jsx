import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext/MovieProvider";
// import { useFavorites } from "../contexts/FavoritesContext";

function MovieCard({movie}) {
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToOwned,
    removeFromOwned,
    isOwned,
  } = useMovieContext();

  const favorite = isFavorite(movie.id);
  const owned = isOwned(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault()
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
        <div className="movie-overlay">
          <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
            ♥
          </button>
          <button onClick={() => favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)}>
            {favorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
          </button>
          <br />
          <button onClick={() => owned ? removeFromOwned(movie.id) : addToOwned(movie)}>
            {owned ? "Remove from Library" : "Add to Library"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
};

export default MovieCard