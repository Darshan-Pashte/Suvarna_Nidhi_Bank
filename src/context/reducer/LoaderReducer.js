import { START_LOADER, STOP_LOADER } from '../../constants';

export const LoaderReducer = (state, action) => {
  switch (action.type) {
    case START_LOADER:
      return {
        ...state,
        loading: [...state.loading, action.payload],
      };
    case STOP_LOADER:
      return {
        ...state,
        loading: state.loading.filter((x) => x !== action.payload),
      };
    default:
      return state;
  }
};
