// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  userType:"",
  loading: false,
  error: null,
  menu:""
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.menu=""
      state.userType="personel"
    },
    loginStartCorporate: (state) => {
      state.loading = true;
      state.error = null;
      state.menu=""
      state.userType="corporate"
    },
    otpSuccess : (state,action)=>{
      // console.log("action",action)
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      // console.log("action",action)
      state.isAuthenticated = true;
      state.menu=action.payload.menu;
      state.userType="personel";
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      sessionStorage.setItem("TOKEN", JSON.stringify(action.payload.sessionId));
      sessionStorage.setItem("jwtToken", JSON.stringify(action.payload.sessionId));
      sessionStorage.setItem("updatedToken", action.payload.token);

      // sessionStorage.setItem("menu", action.payload.menu);
      // sessionStorage.setItem("menu", "11111111111111111111111111111111111111111111111111111111111111111111");
      sessionStorage.setItem("lastLogin", action.payload.lastLoginDate);
      sessionStorage.setItem("customerName", JSON.stringify(action.payload.customerName));
      sessionStorage.setItem("userId", JSON.stringify(action.payload.userId));

    },
    loginSuccessCorporate: (state, action) => {
      // console.log("actioncorporate",action)
      state.isAuthenticated = true;
      state.menu= action.payload.menu;
      state.userType="corporate";
      state.user = action.payload;
      state.userRole = "checker";
      state.loading = false;
      state.error = null;
      sessionStorage.setItem("TOKEN", JSON.stringify(action.payload.sessionId));
      sessionStorage.setItem("jwtToken", JSON.stringify(action.payload.sessionId));
      sessionStorage.setItem("updatedToken", action.payload.token);

      // sessionStorage.setItem("menu", action.payload.menu);
      // sessionStorage.setItem("menu", "11111111111111111111111111111111111111111111111111111111111111111111");
      sessionStorage.setItem("lastLogin", action.payload.lastLoginDate);
      sessionStorage.setItem("customerName", JSON.stringify(action.payload.customerName));
      sessionStorage.setItem("userId", JSON.stringify(action.payload.userId));

    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.menu=""
      state.userType=""
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      sessionStorage.clear();
      state.menu=""
      state.userType=""
    },
    clearError:(state)=>{
      state.error = null;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout,clearError, otpSuccess,loginStartCorporate,loginSuccessCorporate } = authSlice.actions;
export default authSlice.reducer;
