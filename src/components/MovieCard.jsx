import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faCompactDisc
} from '@fortawesome/free-solid-svg-icons'

import { useMovieContext } from "../contexts/MovieContext/MovieProvider";
// import "../css/MovieCard.css";
// import { useFavorites } from "../contexts/FavoritesContext";

function MovieCard({ movie, pageview, view }) {
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

  // function onFavoriteClick(e) {
  //   e.preventDefault()
  //   if (favorite) {
  //     removeFromFavorites(movie.id);
  //   } else {
  //     addToFavorites(movie);
  //   }
  // }

  return (
    <div className="movie-card" data-view={view}>

      {view !== 'list' &&
        <div className="movie-poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
        </div>
      }

      <div className="movie-info">
        <h3>{movie.title}</h3>
        {view !== 'list' &&
          <p>{movie.release_date?.split("-")[0]}</p>
        }
      </div>

      <div className="movie-overlay">
        <div className="button-container">

          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={() => favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>

          {pageview !== 'favorites' &&
            <button
              className={`owned-btn ${owned ? "active" : ""}`}
              onClick={() => owned ? removeFromOwned(movie.id) : addToOwned(movie)}
            >
              <FontAwesomeIcon icon={faCompactDisc} />
            </button>
          }

        </div>
      </div>
    </div>
  );
};

export default MovieCard