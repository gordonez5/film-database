import { actionTypes } from "./actionTypes";

export const initialState = {
  favorites: [],
  owned: [],
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_FAVORITES:
      return { ...state, favorites: action.payload };

    case actionTypes.ADD_FAVORITE:
      return state.favorites.some(m => m.id === action.payload.id)
        ? state
        : { ...state, favorites: [...state.favorites, action.payload] };

    case actionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(m => m.id !== action.payload),
      };

    case actionTypes.SET_OWNED:
      return { ...state, owned: action.payload };

    case actionTypes.ADD_OWNED:
      return state.owned.some(m => m.id === action.payload.id)
        ? state
        : { ...state, owned: [...state.owned, action.payload] };

    case actionTypes.REMOVE_OWNED:
      return {
        ...state,
        owned: state.owned.filter(m => m.id !== action.payload),
      };

      case actionTypes.RESET:
        return initialState;

    default:
      return state;
  }
};
