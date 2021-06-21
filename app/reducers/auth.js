import {
    GETUSERFAILED, GETUSERSUCCESS, UPDATEUSER
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
            return { ...state, user: [] };
        case UPDATEUSER:
            return { ...state, user: { ...state.user, ...action.data } };
        default:
            return state;
    }
};
