import { CLIENT_LIST_FAIL, CLIENT_LIST_REQUEST, CLIENT_LIST_SUCCESS, CLIENT_SAVE_FAIL, CLIENT_SAVE_REQUEST, CLIENT_SAVE_SUCCESS, INVOICE_LIST_FAIL, INVOICE_LIST_REQUEST, INVOICE_LIST_SUCCESS, INVOICE_SAVE_FAIL, INVOICE_SAVE_REQUEST, INVOICE_SAVE_SUCCESS, SERVICE_LIST_FAIL, SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_SAVE_FAIL, SERVICE_SAVE_REQUEST, SERVICE_SAVE_SUCCESS, SETTINGS_INFO_FAIL, SETTINGS_INFO_REQUEST, SETTINGS_INFO_SUCCESS, SETTINGS_SAVE_FAIL, SETTINGS_SAVE_REQUEST, SETTINGS_SAVE_SUCCESS, UPDATE_PAYMENT_SUCCESS } from "../constants/invoiceConstants";

// Client Reducers

//Client List
export const clientListReducer = (state = {}, action) => {
    switch (action.type) {
        case CLIENT_LIST_REQUEST:
            return { loading: true };
        case CLIENT_LIST_SUCCESS:
            return {
                loading: false,
                clientsList: action.payload
            };
        case CLIENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

//New Client
export const saveClient = (state = {}, action) => {

    switch (action.type) {
        case CLIENT_SAVE_REQUEST:
            return { loading: true };
        case CLIENT_SAVE_SUCCESS:
            return {
                loading: false,
                choosenClient: action.payload
            };
        case CLIENT_SAVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

//Service Reducers

export const serviceListReducer = (state = {}, action) => {
    switch (action.type) {
        case SERVICE_LIST_REQUEST:
            return { loading: true };
        case SERVICE_LIST_SUCCESS:
            return {
                loading: false,
                servicesList: action.payload.services
            };
        case SERVICE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Select Invoice Reducer
export const selectedInvoiceReducer = (state = {}, action) => {
    // console.log("selected ib=v reducer==>",action.payload)
    switch (action.type) {
        case INVOICE_SAVE_REQUEST:
            return { loading: true };
        case INVOICE_SAVE_SUCCESS:
            return {
                loading: false,
                selectedInvoice: action.payload
            };
        case INVOICE_SAVE_FAIL:
            return { loading: false, error: action.payload };
        case UPDATE_PAYMENT_SUCCESS:
            return {
                loading: false,
                selectedInvoice: {
                    ...state.invoiceInfo.selectedInvoice,
                    paymentList: action.payload
                }
            }
        default:

            return state;
    }
};

//Invoice List
export const invoiceListReducer = (state = {}, action) => {

    switch (action.type) {
        case INVOICE_LIST_REQUEST:
            return { loading: true };
            
        case INVOICE_LIST_SUCCESS:
            return {
                loading: false,
                invoicesList: action.payload
            };
        case INVOICE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

//Settings Reducers

export const settingsReducer = (state = {}, action) => {
    switch (action.type) {
        case SETTINGS_INFO_REQUEST:
            return {
                loading: true,
                settings: {
                    stripeKey: '',
                    invoiceFooter: '',
                    emailTTemplate: '',
                    smsTemplate: ''
                }
            };
        case SETTINGS_INFO_SUCCESS:
            return {
                loading: false,
                settings: action.payload
            };
        case SETTINGS_INFO_FAIL:
            return { loading: false, error: action.payload };
        case SETTINGS_SAVE_REQUEST:
            return {
                loading: true,
                settings: {
                    stripeKey: '',
                    invoiceFooter: '',
                    emailTTemplate: '',
                    smsTemplate: ''
                }
            };
        
        case SETTINGS_SAVE_SUCCESS:
            return {
                loading: false,
                choosenClient: action.payload
            };
        case SETTINGS_SAVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
// Save Service
// export const saveService = (state = {}, action) => {
//     switch (action.type) {
//         case SERVICE_SAVE_REQUEST:
//             return { loading: true };
//         case SERVICE_SAVE_SUCCESS:
//             return {
//                 loading: false,
//                 newService: action.payload
//             };
//         case SERVICE_SAVE_FAIL:
//             return { loading: false, error: action.payload };
//         default:
//             return state;
//     }
// };