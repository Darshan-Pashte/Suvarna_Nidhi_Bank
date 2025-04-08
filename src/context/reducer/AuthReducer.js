import { SET_USER, REMOVE_USER, TOKEN, SET_ACTIVE_ROUTE } from '../../constants';

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      if (action.payload.token) {
        sessionStorage.setItem(TOKEN, action.payload.token);
        sessionStorage.setItem("username",action.payload.username)
        sessionStorage.setItem("TOKEN",action.payload.token)
      }
      return {
        ...state,
        ...action.payload,
        isAuthorized: true,
      };
    case REMOVE_USER:
      sessionStorage.clear();
      return {
        ...state,
        user: {},
        dropdownValues: {},
        isAuthorized: false,
      };
    case SET_ACTIVE_ROUTE:
      return {
        ...state,
        activeRoute: action.payload,
      };
    default:
      return state;
  }
};
