import React, { createContext, useReducer } from 'react';
import { initialState } from './store/AuthStore';
import { AuthReducer } from './reducer/AuthReducer';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
