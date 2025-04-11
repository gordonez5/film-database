import { createContext, useReducer, useContext, useEffect } from "react";
import { movieReducer, initialState } from "./movieReducer";
import { actionTypes } from "./actionTypes";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const storedOwned = JSON.parse(localStorage.getItem("owned")) || [];

      dispatch({ type: actionTypes.SET_FAVORITES, payload: storedFavorites });
      dispatch({ type: actionTypes.SET_OWNED, payload: storedOwned });
    } catch (e) {
      console.error("Error loading from localStorage:", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
      localStorage.setItem("owned", JSON.stringify(state.owned));
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  }, [state]);

  const addToFavorites = (movie) =>
    dispatch({ type: actionTypes.ADD_FAVORITE, payload: movie });

  const removeFromFavorites = (id) =>
    dispatch({ type: actionTypes.REMOVE_FAVORITE, payload: id });

  const isFavorite = (id) => state.favorites.some(m => m.id === id);

  const addToOwned = (movie) =>
    dispatch({ type: actionTypes.ADD_OWNED, payload: movie });

  const removeFromOwned = (id) =>
    dispatch({ type: actionTypes.REMOVE_OWNED, payload: id });

  const isOwned = (id) => state.owned.some(m => m.id === id);

  return (
    <MovieContext.Provider
      value={{
        favorites: state.favorites,
        library: state.owned,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addToOwned,
        removeFromOwned,
        isOwned,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
