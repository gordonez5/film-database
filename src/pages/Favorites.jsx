import { useMovieContext } from "../contexts/MovieContext";
import { useSettings } from "../contexts/SettingsContext";
import MovieListView from "../components/MovieListView";
import "../css/Favorites.css";

function Favorites() {
  const { favorites } = useMovieContext();
  const { settings } = useSettings();

  if (favorites.length) {
    console.log(favorites);
    return (
      <div
        className="content"
        data-page="favorites"
        data-sort={`${settings.sort}-sort`}
        data-view={`${settings.view}-view`}
      >
        <h2>Your Favourites ({favorites.length})</h2>
        <MovieListView
          items={favorites}
          pageview="favorites"
        />
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;
