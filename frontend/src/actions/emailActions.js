import Axios from "axios";
import { serverAddress } from "../constants/dbConstants";
import { EMAIL_SEND_FAIL, EMAIL_SEND_REQUEST, EMAIL_SEND_SUCCESS } from "../constants/emailConstants";

export const sendEmailBackend = (receiver, message) => async (dispatch) => {
    try {
        const { data } = await Axios.post(`${serverAddress}/api/email`, { receiver, message });
        // dispatch({
        //     type: EMAIL_SEND_REQUEST,
        //     payload: data,
        // });
        // dispatch({
        //     type: EMAIL_SEND_SUCCESS,
        //     payload: data,
        // });
     } catch (err) {
        // dispatch({
        //     type: EMAIL_SEND_FAIL,
        //     payload: err.response && err.response.data.message ?
        //         err.response.data.message : err.message,
        // });
    }
};

