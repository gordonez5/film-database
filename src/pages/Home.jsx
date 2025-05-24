import { useState, useEffect } from "react";

import { searchMovies, getPopularMovies } from "../services/api";
import { useSettings } from "../contexts/SettingsContext";
import MovieListView from "../components/MovieListView";

import "../css/Home.css";

function Home() {
  const { settings } = useSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    // loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="content" data-page="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn btn--secondary">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading
        ? (
          <div className="loading">Loading...</div>
          )
        : movies.length
          ? (
            <div className="search" data-view={settings.view === "grid" ? "grid-view" : "list-view"}>
              <h3>Results</h3>
              <MovieListView
                items={movies}
              />
            </div>
            )
          : (
            <div className="loading">Nothing here</div>
            )
      }
    </div>
  );
}

export default Home;
