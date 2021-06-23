import {
    GETUSERFAILED, GETUSERSUCCESS, UPDATEUSER, LOGOUT
} from "@constants";
const initialState = {
    user: {},
    token: null,
    login: false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GETUSERSUCCESS:
            return { ...state, ...action.data };
        case GETUSERFAILED:
        case LOGOUT:
            return { ...state, user: [], token: null, login: false };
        case UPDATEUSER:
            return { ...state, user: { ...state.user, ...action.data } };
        default:
            return state;
    }
};
