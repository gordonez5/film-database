import LazyLoad from 'react-lazyload';

import { useSettings } from "../contexts/SettingsContext";
import MovieCard from "./MovieCard";

const MovieListView = ({ items, pageview = 'search' }) => {
  const { settings } = useSettings();
  const view = settings.view;

  if (!items || items.length === 0) {
    return <p>No movies to show.</p>;
  }

  const cleanTitle = (title) => title.replace(/^(The|A|An)\s+/i, '').trim();
  const extractLeadingNumber = (title) => {
    const match = title.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  };

  const sortedItems = [...items].sort((a, b) => {
    if (settings.sort === "rating") {
      return b.vote_average - a.vote_average;
    }
    if (settings.sort === "alphabetical") {
      const titleA = cleanTitle(a.title);
      const titleB = cleanTitle(b.title);

      const numA = extractLeadingNumber(titleA);
      const numB = extractLeadingNumber(titleB);

      if (numA !== null && numB !== null) {
        return numA - numB;
      }
      if (numA !== null) {
        return -1;
      }
      if (numB !== null) {
        return 1;
      }
      return titleA.localeCompare(titleB);
    }
    return 0; // Default: no sorting
  });

  return (
    <div className={'movie-cards-container'}>
      {sortedItems.map((movie, index) =>
        <LazyLoad key={`lazy_${movie.id}`} height={800} offset={100}>
          {/* <span>{index + 1}</span> */}
          <MovieCard key={movie.id} movie={movie} pageview={pageview} view={view} />
        </LazyLoad>
      )}
    </div>
  );
};

export default MovieListView;
