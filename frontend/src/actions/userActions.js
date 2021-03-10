import Axios from "axios";
import { serverAddress } from "../constants/dbConstants";
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants"

export const signin = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: {
            email,
            password
        }
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/users/signin`, { email, password });
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
     } catch (err) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
};

// export const register = (name, email, password) => async (dispatch) => {
//     dispatch({
//         type: USER_REGISTER_REQUEST,
//         payload: {
//             name,
//             email,
//             password
//         }
//     });
//     try {
//         const { data } = await Axios.post('/api/users/register', { name, email, password });
//         dispatch({
//             type: USER_REGISTER_SUCCESS,
//             payload: data,
//         });
//         dispatch({
//             type: USER_SIGNIN_SUCCESS,
//             payload: data,
//         });
//         localStorage.setItem('userInfo', JSON.stringify(data));
//      } catch (err) {
//         dispatch({
//             type: USER_REGISTER_FAIL,
//             payload: err.response && err.response.data.message ?
//                 err.response.data.message : err.message,
//         });
//     }
// };

export const signout = () => (dispatch) => {
    console.log("sign out action");
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_SIGNOUT });
};