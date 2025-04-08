import {
    ANNOUNCEMENT_REQUEST,
    ANNOUNCEMENT_FAIL,
    ANNOUNCEMENT_SUCCESS,
    CLEAR_ERRORS,
  } from "../constantStore/announcementContstans";

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case ANNOUNCEMENT_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };
      case ANNOUNCEMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };

      case ANNOUNCEMENT_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };