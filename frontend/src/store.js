import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { clientListReducer, invoiceListReducer, saveClient, selectedInvoiceReducer, serviceListReducer, settingsReducer } from "./reducers/invoiceReducers";
import { userSigninReducer } from "./reducers/userReducer";

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem('userInfo'))
            :null,
    },
    serviceInfo: {
        servicesLIst: [{}]
    },
    settingsInfo: {
        settings: {
            stripeKey: '',
            invoiceFooter: '',
            emailTTemplate: '',
            smsTemplate: ''
        }
    }

};
const reducer = combineReducers({
    userSignin: userSigninReducer,
    clientInfo: clientListReducer,
    choosenClientInfo: saveClient,
    serviceInfo: serviceListReducer,
    invoiceInfo: selectedInvoiceReducer,
    invoicesListInfo: invoiceListReducer,
    settingsInfo: settingsReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;