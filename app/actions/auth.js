
import {
    GETUSERFAILED, GETUSERSUCCESS, UPDATEUSER
} from "@constants";

export const login = (data, callback) => dispatch => {
    setTimeout(() => {
        dispatch({ type: GETUSERSUCCESS, data: { user: data, token: "asdf", login: true } });
        callback();
    }, 5000);
}
export const register = (data) => dispatch => {
}
export const updateUser = (user) => dispatch => {
    dispatch({ type: UPDATEUSER, data: user });
}