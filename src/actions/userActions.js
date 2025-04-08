import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
} from "../constantStore/userConstants";
import axios from "axios";
import { postApiData } from "../components/utilities/nodeApiServices";
import { apiList } from "../components/utilities/nodeApiList";

// Login
export const login = (payload) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        // const config = { headers: { "Content-Type": "application/json" } };

        const response  = await postApiData(apiList.LOGIN, payload);

        // console.log("data",response)

        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
        // console.log("error",error)
        dispatch({ type: LOGIN_FAIL, payload: error.response.message });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};