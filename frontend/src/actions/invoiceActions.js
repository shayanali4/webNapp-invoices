import Axios from "axios";
import { serverAddress } from "../constants/dbConstants";
import { CLIENT_LIST_FAIL, CLIENT_LIST_REQUEST, CLIENT_LIST_SUCCESS, CLIENT_SAVE_FAIL, CLIENT_SAVE_REQUEST, CLIENT_SAVE_SUCCESS } from "../constants/invoiceConstants";

export const clientList = (userName, password) => async (dispatch) => {
    dispatch({
        type: CLIENT_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get(`${serverAddress}/api/clients`);
        dispatch({
            type: CLIENT_LIST_SUCCESS,
            payload: data,
        });
        localStorage.setItem('clientsInfo', JSON.stringify(data));
     } catch (err) {
        dispatch({
            type: CLIENT_LIST_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
};

export const oldclient = (data) => async (dispatch) => {
    // dispatch({
    //     type: CLIENT_SAVE_REQUEST,
    //     payload: data,
    // });
    dispatch({
        type: CLIENT_SAVE_SUCCESS,
        payload: data,
    });
};

export const newclient = (clientName, companyName, email, address, phone, ABN ) => async (dispatch) => {
    dispatch({
        type: CLIENT_SAVE_REQUEST,
        payload: {
            clientName,
            companyName,
            email,
            address,
            phone,
            ABN 
        }
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/clients/create`, { clientName, companyName, email, address, phone, ABN });
        // console.log(data.createdClient[0])
        dispatch({
            type: CLIENT_SAVE_SUCCESS,
            payload: data.createdClient[0],
        });
        // localStorage.setItem('userInfo', JSON.stringify(data));
     } catch (err) {
        dispatch({
            type: CLIENT_SAVE_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
};