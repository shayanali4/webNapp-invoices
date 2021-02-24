import Axios from "axios";
import { useSelector } from "react-redux";
import { serverAddress } from "../constants/dbConstants";
import { CLIENT_LIST_FAIL, CLIENT_LIST_REQUEST, CLIENT_LIST_SUCCESS, CLIENT_SAVE_FAIL, CLIENT_SAVE_REQUEST, CLIENT_SAVE_SUCCESS, SERVICE_LIST_FAIL, SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_SAVE_FAIL, SERVICE_SAVE_REQUEST, SERVICE_SAVE_SUCCESS } from "../constants/invoiceConstants";


// Client Actions
 
// Get Existing Clients List
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

// Old Client
export const oldclient = (data) => async (dispatch) => {
    dispatch({
        type: CLIENT_SAVE_SUCCESS,
        payload: data,
    });
};

// New Client
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
        dispatch({
            type: CLIENT_SAVE_SUCCESS,
            payload: data.createdClient[0],
        });
     } catch (err) {
        dispatch({
            type: CLIENT_SAVE_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
};

// Services

// Get Existing Services List
export const serviceList = (userName, password) => async (dispatch) => {
    dispatch({
        type: SERVICE_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get(`${serverAddress}/api/services`);
        dispatch({
            type: SERVICE_LIST_SUCCESS,
            payload: data,
        });
     } catch (err) {
        dispatch({
            type: SERVICE_LIST_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
};

//New Service
export const newservice = (shortDescription, longDescription, price) => async (dispatch) => {

    dispatch({
        type: SERVICE_SAVE_REQUEST,
        payload: {
            shortDescription,
            longDescription,
            price
        }
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/services/create`, { shortDescription, longDescription, price });

            dispatch({
        type: SERVICE_LIST_REQUEST,
    });
        try {
            const { data } = await Axios.get(`${serverAddress}/api/services`);
            dispatch({
                type: SERVICE_LIST_SUCCESS,
                payload: data,
            });
        } catch (err) {
            dispatch({
                type: SERVICE_LIST_FAIL,
                payload: err.response && err.response.data.message ?
                    err.response.data.message : err.message,
            });
        }

     } catch (err) {
        dispatch({
            type: SERVICE_SAVE_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
};