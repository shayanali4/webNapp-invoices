import { CLIENT_LIST_FAIL, CLIENT_LIST_REQUEST, CLIENT_LIST_SUCCESS, CLIENT_SAVE_FAIL, CLIENT_SAVE_REQUEST, CLIENT_SAVE_SUCCESS } from "../constants/invoiceConstants";

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
