import Axios from "axios";
import { useSelector } from "react-redux";
import { serverAddress } from "../constants/dbConstants";
import { CLIENT_LIST_FAIL, CLIENT_LIST_REQUEST, CLIENT_LIST_SUCCESS, CLIENT_SAVE_FAIL, CLIENT_SAVE_REQUEST, CLIENT_SAVE_SUCCESS, INVOICE_LIST_FAIL, INVOICE_LIST_REQUEST, INVOICE_LIST_SUCCESS, INVOICE_SAVE_FAIL, INVOICE_SAVE_REQUEST, INVOICE_SAVE_SUCCESS, SERVICE_LIST_FAIL, SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_SAVE_FAIL, SERVICE_SAVE_REQUEST, SETTINGS_INFO_REQUEST, SETTINGS_INFO_SUCCESS, SETTINGS_INFO_FAIL, SETTINGS_SAVE_SUCCESS, SETTINGS_SAVE_FAIL, SETTINGS_SAVE_REQUEST } from "../constants/invoiceConstants";


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
    const user = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo'))
        : null;
    const companyId = user.companyId;
    // console.log("invoice action", invoice)
    dispatch({
        type: INVOICE_SAVE_REQUEST,
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/invoices/new`, {
            companyId: companyId,
            clientName: invoice.clientName,
            email: invoice.email,
            phone: invoice.phone,
            address: invoice.address,
            ABN: invoice.ABN,
            listItems: invoice.listItems
        });
        console.log("new invoice action",invoice)
        console.log('created Innvoice abc received ',data)
        dispatch({
            type: INVOICE_SAVE_SUCCESS,
            payload: data,
        });
    } catch (err) {
        console.log("error",err)
        dispatch({
            type: INVOICE_SAVE_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
};

// Get Invoices List
export const invoiceList = () => async (dispatch) => {
    const user = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo'))
        : null;
    const companyId = user.companyId;
    dispatch({
        type: INVOICE_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/invoices`, { companyId });
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

// Select Invoice
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

// Get Settings Info
export const getSettingsInfo = () => async (dispatch) => {
    const user = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo'))
        : null;
    const companyId = user.companyId;
    dispatch({
        type: SETTINGS_INFO_REQUEST,
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/settings`, { companyId });
        dispatch({
            type: SETTINGS_INFO_SUCCESS,
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

// // Update Settings
export const updateSettings = (stripeKey, invoiceFooter, emailTemplate, smsTemplate) => async (dispatch) => {
    const user = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo'))
        : null;
    const companyId = user.companyId;
    // console.log("invoice action", invoice)
    dispatch({
        type: SETTINGS_SAVE_REQUEST,
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/settings/update`, { companyId,stripeKey,invoiceFooter,emailTemplate,smsTemplate });
        dispatch({
            type: SETTINGS_INFO_SUCCESS,
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