import Axios from "axios";
import { useSelector } from "react-redux";
import { serverAddress } from "../constants/dbConstants";
import { CLIENT_LIST_FAIL, CLIENT_LIST_REQUEST, CLIENT_LIST_SUCCESS, CLIENT_SAVE_FAIL, CLIENT_SAVE_REQUEST, CLIENT_SAVE_SUCCESS, INVOICE_LIST_FAIL, INVOICE_LIST_REQUEST, INVOICE_LIST_SUCCESS, INVOICE_SAVE_FAIL, INVOICE_SAVE_REQUEST, INVOICE_SAVE_SUCCESS, SERVICE_LIST_FAIL, SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_SAVE_FAIL, SERVICE_SAVE_REQUEST, SERVICE_SAVE_SUCCESS } from "../constants/invoiceConstants";


// Client Actions
 
// Get Existing Clients List
export const clientList = (userName, password) => async (dispatch) => {
    const user = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo'))
        : null;
    const companyId = user.companyId;
    dispatch({
        type: CLIENT_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/clients`, { companyId });
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
    const user = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo'))
        : null;
    const companyId = user.companyId;
    dispatch({
        type: CLIENT_SAVE_REQUEST,
        payload: {
            companyId,
            clientName,
            companyName,
            email,
            address,
            phone,
            ABN 
        }
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/clients/create`, { companyId, clientName, companyName, email, address, phone, ABN });
        console.log("client received==>",data)
        dispatch({
            type: CLIENT_SAVE_SUCCESS,
            payload: data.selectedClient[0],
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
export const serviceList = () => async (dispatch) => {
    const user = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo'))
        : null;
    const companyId = user.companyId;
    dispatch({
        type: SERVICE_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/services`, { companyId });
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
    const user = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo'))
        : null;
    const companyId = user.companyId;
    dispatch({
        type: SERVICE_SAVE_REQUEST,
        payload: {
            shortDescription,
            longDescription,
            price
        }
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/services/create`, { companyId, shortDescription, longDescription, price });

        dispatch({
            type: SERVICE_LIST_REQUEST,
    });
        try {
            const { data } = await Axios.post(`${serverAddress}/api/services`, { companyId });
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

// New Invoice
export const newInvoice = (invoice) => async (dispatch) => {
    dispatch({
        type: INVOICE_SAVE_REQUEST,
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/invoices/new`, invoice);
        console.log('createdInnvoice',data)
        dispatch({
            type: INVOICE_SAVE_SUCCESS,
            payload: data.createdInvoice,
        });
     } catch (err) {
        dispatch({
            type: INVOICE_SAVE_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
};

// Get Invoices List
export const invoiceList = () => async (dispatch) => {
    dispatch({
        type: INVOICE_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get(`${serverAddress}/api/invoices`);
        dispatch({
            type: INVOICE_LIST_SUCCESS,
            payload: data,
        });
     } catch (err) {
        dispatch({
            type: INVOICE_LIST_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
};

// New Invoice
export const selectInvoice = (invoice) => async (dispatch) => {
    console.log("select iv action==>",invoice)
    dispatch({
        type: INVOICE_SAVE_REQUEST,
    });
    try {
        dispatch({
            type: INVOICE_SAVE_SUCCESS,
            payload: invoice,
        });
     } catch (err) {
        dispatch({
            type: INVOICE_SAVE_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
};