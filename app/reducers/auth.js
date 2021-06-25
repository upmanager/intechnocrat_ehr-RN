import {
    GETUSERFAILED, GETUSERSUCCESS, UPDATEUSER, LOGOUT, SETWEIGHT
} from "@constants";
const initialState = {
    user: {},
    health_profile: {},
    login: false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GETUSERSUCCESS:
            return { ...state, ...action.data };
        case GETUSERFAILED:
        case LOGOUT:
            return { ...state, user: [], login: false };
        case UPDATEUSER:
            return { ...state, user: { ...state.user, ...action.data } };
        case SETWEIGHT:
            return { ...state, health_profile: { ...state.health_profile, ...action.data } };
        default:
            return state;
    }
};
