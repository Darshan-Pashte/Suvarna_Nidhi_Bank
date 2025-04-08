import Swal from 'sweetalert2';
// import {
//     LOGIN_REQUEST,
//     LOGIN_FAIL,
//     LOGIN_SUCCESS,
//     CLEAR_ERRORS,
// } from "../constantStore/userConstants";
import axios from "axios";
import { postApiData } from "../components/utilities/nodeApiServices";
import { apiList } from "../components/utilities/nodeApiList";
import { clearError, loginFailure, loginStart, loginStartCorporate, loginSuccess, loginSuccessCorporate } from "./authSlice";
import SweetAlertPopup from '../components/common/sweetAlertPopup';

// Login
export const login = (payload) => async (dispatch) => {
    try {
        dispatch(loginStart());

        const config = { headers: { "Content-Type": "application/json" } };

        const response = await postApiData(apiList.LOGIN, payload);

        if (response.status) {
            dispatch(loginSuccess(response.data));
            // sessionStorage.setItem("TOKEN", JSON.stringify(response.data.sessionId));
            sessionStorage.setItem("menu", "011111111001111111111111111111111111111111111111");
            //     sessionStorage.setItem("lastLogin", response?.data?.lastLoginDate);
            //     sessionStorage.setItem("username", JSON.stringify(data.email));
            // Redirect to dashboard
            // navigate('/dashboard');
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Login Successful',
            //     text: 'Welcome!',
            //   });
        } else {
            dispatch(loginFailure(response.message));
            // popupAlert(response.message, 'Error', 'error');
            SweetAlertPopup(response.message,"Login Failed","error")
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Login Failed',
            //     text: response.message,
            //   });
           
        }
    } catch (error) {
        dispatch(loginFailure('An error occurred'));
        // popupAlert('An error occurred', 'Error', 'error');
       
    }
};

export const loginCorporate = (payload) => async (dispatch) => {
    try {
        dispatch(loginStartCorporate());

        const config = { headers: { "Content-Type": "application/json" } };

        const response = await postApiData(apiList.LOGIN, payload);

        if (response.status) {
            dispatch(loginSuccessCorporate(response.data));
            // sessionStorage.setItem("TOKEN", JSON.stringify(response.data.sessionId));
                sessionStorage.setItem("menu", "10000000011000000000000000000000000");
            //     sessionStorage.setItem("lastLogin", response?.data?.lastLoginDate);
            //     sessionStorage.setItem("username", JSON.stringify(data.email));
            // Redirect to dashboard
            // navigate('/dashboard');
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Login Successful',
            //     text: 'Welcome!',
            //   });
        } else {
            dispatch(loginFailure(response.message));
            // popupAlert(response.message, 'Error', 'error');
            SweetAlertPopup(response.message,"Login Failed","error")
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Login Failed',
            //     text: response.message,
            //   });
           
        }
    } catch (error) {
        dispatch(loginFailure('An error occurred'));
        // popupAlert('An error occurred', 'Error', 'error');
       
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clearError);
};