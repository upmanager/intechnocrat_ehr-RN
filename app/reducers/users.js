import {
    GETUSERFAILED, GETUSERSUCCESS, LOADING
} from "@constants";
const initialState = {
    users: [],
    loading: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        // users
        case LOADING:
            return { ...state, loading: action.data };
        case GETUSERSUCCESS:
            return { ...state, users: action.data };
        case GETUSERFAILED:
            return { ...state, users: [] };
        default:
            return state;
    }
};
