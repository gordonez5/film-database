import fuzzyFilterFactory from "react-fuzzy-filter";

import { useMovieContext } from "../contexts/MovieContext";
import { useSettings } from "../contexts/SettingsContext";
import MovieListView from "../components/MovieListView";

function Library() {
  const { library } = useMovieContext();
  const { settings } = useSettings();
  // these components share state and can even live in different components
  const { InputFilter, FilterResults, changeInputValue } = fuzzyFilterFactory();
  const fuseConfig = {
    keys: [
      "title",
      // "overview"
    ],
  };

  if (library && library.length) {
    console.log(library);
    return (
      <div
        className="content"
        data-page="library"
        data-sort={`${settings.sort}-sort`}
        data-view={`${settings.view}-view`}
      >
        <h2>Your Library ({library.length})</h2>
        <InputFilter debounceTime={200} />
        <FilterResults defaultAllItems={true} items={library} fuseConfig={fuseConfig}>
          {filteredItems => {
            return (
              <MovieListView
                items={filteredItems}
                pageview="library"
              />
            );
          }}
        </FilterResults>
        {/* <MovieListView
          items={library}
          pageview="library"
        /> */}
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
