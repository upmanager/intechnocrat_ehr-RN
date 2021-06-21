import {
    SETGLOBAL
} from "@constants";
const initialState = {
    weight: 0,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SETGLOBAL:
            return { ...state, ...action.data };
        default:
            return state;
    }
};
