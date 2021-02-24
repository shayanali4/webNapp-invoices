import { CLIENT_LIST_FAIL, CLIENT_LIST_REQUEST, CLIENT_LIST_SUCCESS, CLIENT_SAVE_FAIL, CLIENT_SAVE_REQUEST, CLIENT_SAVE_SUCCESS, SERVICE_LIST_FAIL, SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_SAVE_FAIL, SERVICE_SAVE_REQUEST, SERVICE_SAVE_SUCCESS } from "../constants/invoiceConstants";

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