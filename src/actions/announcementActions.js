import {
    ANOUNCEMENT_REQUEST,
    ANOUNCEMENT_FAIL,
    ANOUNCEMENT_SUCCESS,
    CLEAR_ERRORS,
} from "../constantStore/announcementContstans";
import axios from "axios";
import { postApiData } from "../components/utilities/nodeApiServices";
import { apiList } from "../components/utilities/nodeApiList";


export const createAnnouncement = (payload) => async (dispatch) => {
    try {
        dispatch({ type: ANOUNCEMENT_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await postApiData(apiList.ANNOUNCEMENT_CREATE, payload, config);

        dispatch({ type: ANOUNCEMENT_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: ANOUNCEMENT_FAIL, payload: error.response.data.message });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};